---
layout: default
title: CSC 466 - Update 1, A look at similar papers and ideas
---

The goal of these past two weeks has to look at current solutions to this problem and see how my ideas, differ, change, and stay the same based on the results from these other approaches.

Based on below I have updated my proposal [here](./proposal)

## MSocket Library / Technical Report

[link](https://web.cs.umass.edu/publication/details.php?id=2326)

The problem this paper addresses is that although current usage on the internet could benefit from seamless mobility, current internet architecture does not support it. Furthermore, previous attempts at providing mobility either cover a subset of situations or require large changes to the current internet architecture.

The main idea of the paper is to provide a userspace wrapper around TCP connections, then using a new packet format keep separate sequence numbers from TCP. Whenever a peer changes network locations they can reconnect 1 of 3 ways, wait for a timeout and use the global name service to reconnect, (client) reconnect to the server assuming the same address, (server) tell the peer you are moving and where. This handles the 3 peer mobility situations, connection time, individual, and simultaneous.

Further, the paper allows peers to create multiple flow paths per connection using ConnID to locally identify the connection and PathID to identify a path between two network interfaces, one connection can have many paths. This allows for multihomed situations and limited reconnection time when reconnecting as more paths could be used to transfer data. Due to the TCP independent sequence numbers and userspace, IO buffers the connection does not care which path the packets take and handles out of order transmission well.

### Strengths

* Very clearly defines what it handles and want it doesn't
* Provided very clear insights into ways to adapt this approach to be more general

### Issues with the paper

First off this paper is extremely interesting and solves many of the problems it sets out to. However, it does fall short quite a bit in one situation which it identifies as a problem it is trying to solve. For MSocket to be used it must have all other peers using MSocket as well as it fails to stay compatible with normal TCP or UDP. This fails on the problem of requiring large changes to current internet architecture. This is slightly mitigated when you consider it is a userspace library, however, this is more of an application-specific solution rather than a general. ie. Applications like Skype may want to use it but when the application but will require a rewrite and global update to the implementations. My proposal identifies that the protocol must stay compatible with current stacks making MSocket a non-starter.

Another reason this protocol is not suited to solve the problems outlined in my proposal is that it is strictly a replacement for TCP, not UDP.

## An end to end approach for host mobility

[paper link](https://people.cs.vt.edu/~hamid/Mobile_Computing/papers/snoeren00endtoendmobility.pdf)
[acm link](https://dl.acm.org/doi/10.1145/345910.345938)

This paper addresses the problem that at the time of publication there was not a solution for end-to-end peer mobility. Mobile IP existed but used a proxy to the mobile peer.

The proposed solution is very similar to the MSocket and MobilityFirst papers. In this case, peer mobility was done by updating the DNS A (address) record whenever a peer moved network locations. It also used the TCP option header to include a token that identifies the connection, which when used from another IP + Port allows the peer to reconnect to the original TCP connection including the maintained state. This is important because it changes the identification of a TCP connection from (Source Address, Source Port, Destination Address, Destination Port) to (Source Address, Source Port, Token). For this to work, it needs to modify the TCP state machine to handle new IP addresses using this token, which is a non-trivial change to both the state machine and implementations.

### Strengths

* Compatible with existing TCP connections
* Clear changes to TCP state machine and direct steps to implement

### Issues with the paper

* Not a general solution that can be used with any other protocol
* The security model isn't as clear as MobilityFirst's

## Project 

### Changes

With reference to the papers above and other papers I have read since starting the project I am aiming towards a general solution closer to MobilityFirst as outlined in the updated proposal. Originally I planned to wrap TCP however have found that many existing libraries and protocols such as MSocket have already done this. My belief now is that a approach must be taken closer to the end-to-end approach if the project ever wants to see use.

### Schedule

I am slightly behind schedule, approximately a week however given the new direction and clarity on the future of the project I feel I can make up the time.