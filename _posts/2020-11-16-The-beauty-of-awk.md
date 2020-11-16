---
layout: post
author: Alexander McRae
categories: [programming]
tags: [awk]
---

I am obsessed with [awk](https://www.gnu.org/software/gawk/) and if know awk you might know why. Awk does one
thing and does it well. Awk handles text streams and processes them by matching
on the columns of lines.

You may think that this is a small problem that is easily solved by python or
some other language with more flexibility on the problem space. You may be right
but I will try to convince you that awk's problem space is actually rather large
and that flexibility comes at a cost.

## History

Awk comes from the three people that make up its letters

```
Aho (Alfred)
Weinberger (Peter)
Kernighan (Brian)
```

Awk was created to make manipuating both number and strings easy based on 
patterns in the input.

## Awk programs

Awk programs follow a very simple set of rules.

```awk
condition { action }
condition { action }
condition { action }
...
```

Awk programs may also have a BEGIN and END statements which run at the beginning
and end of the program.

Consider the probelm.

Given a text output of

```
Beth  4.00 0
Dan   3.75 0
Kathy 4.00 10
Mark  5.00 20
Mary  5.50 22
Susie 4.25 18
```

Where the first column is the name, second hourly rate and third hours worked.

Calculate the amount to be paid for anyone who worked over 15 hours.

In python you might read the text stream into a list of lists or maybe a list of 
datastructures and then filter the hours and output the amount to be paided.
Awk because of the reduced problem space can do this by in one line without the 
datastructure and lists.

```awk
$3 > 15 { print $1, $2 * $3 }
```

Thats all you need to express the same thing in awk.

## Other use cases

You are probably underestimating the amount of columnized text streams you deal
with. If you have every tried to deal with looking at http logs for a busy 
server you know how difficult it can be to debug something when the data your looking at is crowded. Often times you 
want to reach for python to filter out the logs but writing the script could turn out more painful than doing it manually.
Awk's ability to match on the columns of the logs makes this problem trivial and the cost of implementing it is so low that there is no hesitation.

Awk also works beatifully in a command line environment allowing you to run awk programs without writing them in a file.

```bash
cat server.log | awk '$1 == "GET" && $2 == "/users"'
```

This is great for quick one liners that don't need to be run more than once (Debugging).

