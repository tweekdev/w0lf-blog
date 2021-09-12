---
title: Cap Machine HTB
excerpt: Cap is an active machine during the time of writing this post. So, unless
  you are about to die, I suggest not to proceed. The machine is fairly simple with
  very few steps to get root access.
coverImage: "/assets/blog/cap/cap.png"
date: '2021-09-12'
author:
  name: W0lf15
  picture: "/assets/blog/authors/w0lf15.png"
ogImage:
  url: "/assets/blog/cap/cap.png"
difficulty: easy
active: true

---
Note: To write public writeups for active machines is against the rules of HTB. Otherwise, I could protect this blog post using the root flag. Also, I couldn’t find a good content locker that allows custom message for WordPress. So, I couldn’t password protect this blog post using other methods like root hash, root-only readable file contents, etc.

```console
foo@bar:~$ nmap -T4 -sC -sV -p- --min-rate=1000 -oN nmap.log 10.10.10.245 -Pn
```

Nmap script scan shows we don’t have access to anonymous ftp. So, I opened the web server.

It is a nice dashboard that displays the result of monitoring of the network. On the left sidebar menu, we can see PCAP analysis. PCAP means “packet capture”. This means it contains the data of packets that are sent over network. Furthermore, we can store these files and analysis them later using tools like wireshark. Thus, I clicked the second options.

However, the application didn’t show any packets. So, I changed the path parameter from 28 to 0.

Fortunately, it worked. If it hadn’t worked, I would have started doing fuzzing rather than testing one by one. Next, I downloaded the pcap file and opened in wireshark.

```console
wireshark 0.pcap
```

I got the credentials for the FTP server.

```console
ftp 10.10.10.245
```

It looked like, the FTP server serves the home directory of the user. So, I tried to log in to SSH with the same credentials.

```console
ssh nathan@10.10.10.245
```

Luckily, I got the access and the user’s flag in the home directory.

```console
cat user.txt
```

Next, I searched for the sudo permissions, SUID binaries and capabilities that could escalate the privileges by giving us the root shell. Fortunately, I have cap_setuid available or the python3.8 binary on the target.

```console
getcap -r / 2>/dev/null
```

Then, a quick search on gtfobins led me to the root shell.

https://gtfobins.github.io/gtfobins/python/#capabilities

```console
python3.8 -c 'import os; os.setuid(0); os.system("/bin/bash")'
```

## Conclusion

I really liked this machine. Although the foothold was easy, the part to get to the root was a bit unheard of. Furthermore, in most of the machines, we get to see sudo abusing or SUID binaries. However, I really liked the idea of exploiting via capabilities of this machine.