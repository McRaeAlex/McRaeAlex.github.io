---
layout: post
author: Alexander McRae
categories: [programming]
tags: [debugging]
---

As I reach the end of my degree at the University of Victoria (UVic) I have been reflecting on my experiences with different aspects of building systems. More recently I have started a rather complex operating system project which caused me to reflect on how my views of debugging have changed from the start of my degree until now.

At the beginning of my programming life what I knew about programming was from movies. The character sat at some fantasy UI and typed faster than humanly possible and "BAM! WE'RE IN". This fantasy of becoming a programming god was quickly crushed in my first Java course loading up some brown editor (Netbeans) and clicking a green triangle to run my programs. Although programming wasn't what I thought it was I liked it quite a lot. Unfortunately, the movies never showed one aspect of programming that I hated, debugging. Debugging to me at the time was putting in a bunch of println's and trying to guess where the issue was. This was extremely boring and time-consuming for any non-trivial bugs, and for those non-trivial bugs, it almost certainly ended in frustration and anger. At this time debugging was a chore.

A little while later once I had finished a couple of courses at UVic I learned of gdb and debuggers. While C had been kicking my ass until then gdb brought a new sense of understanding my programs and computer. Watching it step through the execution of my program and being able to see the variables without explicitly printing them out was a world's better experience for non-trivial bugs. Many times during debugging as I would step through my programs I would find bugs that I wasn't looking for. A recent experience of this type has caused me to view debugging as exploring my system, gaining new insights into the flow of my programming, and gaining a new understanding of the languages I use.

Since my view of debugging has changed I have sought out a better and better debugging experience, I tend to avoid languages that don't have good debugging tools in favor of ones that do. My experience with the tools has only gotten better and my understanding of the systems I work on has too.

Anyone can write a program that doesn't work but it takes someone with an understanding of the system to know why. Debugging provides that insight.

TLDR: I used to view debugging as a pain that stopped me from getting to my goal but now I see it as a way of really understanding the systems I build.