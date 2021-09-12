---
date: 2021-09-12T13:00:17Z
title: 'Hack the Box: Money Flowz'
difficulty: easy
active: true
excerpt: "“Frank Vitalik is a hustler, can you figure out where the money flows?”\n"
coverImage: ''
author:
  name: W0lf15
  picture: "/assets/blog/authors/w0lf15.png"
ogImage:
  url: ''

---
So the first thing I did was Google Frank Vitalik. About three or four results down I saw this:

![](https://miro.medium.com/max/1362/1*Wd13EDv1iS2VA5b8xTyRSQ.png =681x135)

The @htb kinda gave it away that I was on the right trail. Looks like Frank might be on Reddit bragging about some crypto scams using his full name…

This link takes us to something he has crossposted from r/CryptoCurrency.

![](https://miro.medium.com/max/1380/1*zKw4E5lcmhRzNBpCtFioGw.png =690x447)

Viewing the address link in the post yields nothing much for now, so I leave it tabbed open and head back to the original post to click on Frank’s profile:

![](https://miro.medium.com/max/622/1*rb6NtHPyopBAEPlFN9J7kQ.png =311x347)

I checked out the Twitter account, but there is an actual real life Frank Vitalik connected to it that doesn’t appear to have anything to do with this.

If we go through his post history, we can see he is hosting a scam coin giveaway! Wow, Frank.

![](https://miro.medium.com/max/1400/1*ubtZ7XECHfL7T_pOCLdS5w.png =700x184)

If we click on the link in the post, we see his scam in action, along with what appears to be one of the hashes(?) from the first page we opened. I’m not really well-versed in cryptocurrency, but it appears this is his handle/address for trading.

![](https://miro.medium.com/max/1324/1*k0_EYod3c2M9stzibjgBFg.png =662x709)

Right away I went back to the original link and pasted that hash into the search bar, which, after some frustrated exploring, yielded nothing :

![](https://miro.medium.com/max/2000/1*kdLdrL5Bag9h8c1EpnKX9Q.png =1000x554)

So I backtracked back to the other link and saw that someone had made a comment at the bottom:

![](https://miro.medium.com/max/1400/1*bWQ9yspnq2EeCVESXolg5w.png =700x106)

I typed “ropsten.net” in Google, and found this:

![](https://miro.medium.com/max/1392/1*SmN-m6dGjTqgBB9be8hibw.png =696x295)

This is where I entered that same hash:

![](https://miro.medium.com/max/1400/1*JRMfjRFh1R5MYaAC3d5Yaw.png =700x172)

I dug around in a few of those transactions, and eventually saw two that looked a bit different:

![](https://miro.medium.com/max/2000/1*7_hvEOE_rJH3I_DzORVqnA.png =1000x105)

One of them had this hex code at the bottom:

![](https://miro.medium.com/max/2000/1*7ZMp5UT3wWbsM-Zj9vSNLQ.png =1000x622)

Use the “View Input As” drop down to decode it and grab the flag!

Happy Hacking! ❤