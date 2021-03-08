---
layout: default
title: CSC 466 - Update 1, A look at similar papers and ideas
---

The goal of these past two weeks has to look at current solutions to this problem and see how my ideas, differ, change, and stay the same based on the results from these other approaches.

## MSocket Library / Technical Report

[link](https://web.cs.umass.edu/publication/details.php?id=2326)

The problem this paper addresses is that although current usage on the internet could benefit from seamless mobility, current internet architecture does not support it. Furthermore, previous attempts at providing mobility either cover a subset of situations or require large changes to the current internet architecture.

The main idea of the paper is to provide a userspace wrapper around TCP connections, then using a new packet format keep separate sequence numbers from TCP. Whenever a peer changes network locations they can reconnect 1 of 3 ways, wait for a timeout and use the global name service to reconnect, (client) reconnect to the server assuming the same address, (server) tell the peer you are moving and where. This handles the 3 peer mobility situations, connection time, individual, and simultaneous.

Further, the paper allows peers to create multiple flow paths per connection using ConnID to locally identify the connection and PathID to identify a path between two network interfaces, one connection can have many paths. This allows for multihomed situations and limited reconnection time when reconnecting as more paths could be used to transfer data. Due to the TCP independent sequence numbers and userspace, IO buffers the connection does not care which path the packets take and handles out of order transmission well.

### Issues with the paper

First off this paper is extremely interesting and solves many of the problems it sets out to. However, it does fall short quite a bit in one situation which it identifies as a problem it is trying to solve. For MSocket to be used it must have all other peers using MSocket as well as it fails to stay compatible with normal TCP or UDP. This fails on the problem of requiring large changes to current internet architecture. This is slightly mitigated when you consider it is a userspace library, however, this is more of an application-specific solution rather than a general. ie. Applications like Skype may want to use it but when the application but will require a rewrite and global update to the implementations. My proposal identifies that the protocol must stay compatible with current stacks making MSocket a non-starter.

Another reason this protocol is not suited to solve the problems outlined in my proposal is that it is strictly a replacement for TCP, not UDP.