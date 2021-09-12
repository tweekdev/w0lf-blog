---
date: '2021-09-12'
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

The @htb kinda gave it away that I was on the right trail. Looks like Frank might be on Reddit bragging about some crypto scams using his full name…

This link takes us to something he has crossposted from r/CryptoCurrency.

Viewing the address link in the post yields nothing much for now, so I leave it tabbed open and head back to the original post to click on Frank’s profile:

I checked out the Twitter account, but there is an actual real life Frank Vitalik connected to it that doesn’t appear to have anything to do with this.

If we go through his post history, we can see he is hosting a scam coin giveaway! Wow, Frank.

If we click on the link in the post, we see his scam in action, along with what appears to be one of the hashes(?) from the first page we opened. I’m not really well-versed in cryptocurrency, but it appears this is his handle/address for trading.

Right away I went back to the original link and pasted that hash into the search bar, which, after some frustrated exploring, yielded nothing :

So I backtracked back to the other link and saw that someone had made a comment at the bottom:

I typed “ropsten.net” in Google, and found this

This is where I entered that same hash:

I dug around in a few of those transactions, and eventually saw two that looked a bit different:

One of them had this hex code at the bottom:

Use the “View Input As” drop down to decode it and grab the flag!

Happy Hacking! ❤