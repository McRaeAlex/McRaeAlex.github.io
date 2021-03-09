---
layout: default
title: MobilityFirst An Integration Approach
---

## Problem

Current internet technologies fail to handle some common situations which occur extremely often. In particular IP acts as both a network location and an identifier, this does not allow for end-to-end mobility which is necessary considering modern workloads.

Current solutions to this problem fail to maintain the end-to-end principle, fail to be compatible with current internet technologies, or require too large of a change to be viable.

In particular, a solution should have the following properties:

* The end-to-end principle is maintained
* Compatible with NAT
* Handles all forms of mobility
  * Connection time
  * Individual
  * Simultaneous
* Compatible with existing internet technologies
* Scale well
* Be a general solution useable from many protocols

## Related Research

This area has been studied quite extensively, both the set of Mobility first papers as well as the QUIC protocol drafts tackle this problem in different ways. Many other research papers also cover this in specific areas.

The QUIC protocol draft specifies a unique connection ID that is verified by the peer whenever a packet is received from a new IP address. This allows for peers to change IP addresses without setting up a new connection. Unfortunately, this was specified in such a way it cannot be generalized and is tied in with the QUIC protocol. The protocol also fails to handle the simultaneous mobility case.

The MobilityFirst papers cover an extensive set of services and protocols to enable peer mobility for all cases. However, the project also assumes a clean slate and would require a large amount of work to both set up the infrastructure and adapt code bases to enable mobility. The provided code, the MSocket library, fails to stay compatible with normal TCP and requires peers to use the same library failing to meet the compatibility requirement laid out in the problem section.

The paper "An end-to-end approach for host mobility" has a lot of great things about it which make it similar to the proposed solution. It handles all forms of mobility, is compatible with existing Internet architectures, and provides end-to-end management. Where it falls short however is it fails to be generalizable to protocols other than TCP, unsure if it is scalable with current workloads, and uses DNS. This is unsuitable due to the slow propagation of records, requiring each peer to have a record, and using DNS for something it is not meant for when other solutions exist.

## Solution

The proposed solution is to use the tools laid out by MobilityFirst including the Global Name Service and provide an operating system service, similar to DNS which allows for the following:

* Resolution of GUIDs
* Identity verification as outlined in the MobilityFirst papers
  * Identifying self against requests
  * Making identity requests against others
* Querying of IP address to GUID

The service could be used to augment existing protocols allowing for peer mobility and staying compatible with existing implementations and semantics, like the end-to-end paper mentioned above. This approach should be general enough to allow for multiple strategies for peer mobility for each protocol.

This solution however relies on two things, all peers which wish to be mobile using the strategy above must have an implementation of the service and a Global Name Service must be available and able to scale to meet user demand.

### Expected Deliverables

The paper will include the following

* The required services including extensions to MobilityFirst
* The host service and interface to that services
* An augmented TCP state machine using the service to provide peer mobility
* A small discussion on how to implement both the TCP state machine and host service
* A discussion on Auspice and combining DNS with it

The project will not include any runnable code as there is not enough time in the semester left to provide anything worth value.

### Website

[https://mcraealex.github.io/research/csc466](https://mcraealex.github.io/research/csc466)

### Schedule

Feb 8 - Feb 21: 
Review relevant papers and post reading notes on them in aggregate or individually on the website.

Feb 22 - Feb 28: 
Re-evaluate the initial proposal given the new information. Involving a meeting with the teaching staff for feedback.

Mar 1 - Mar 14:
Start formally defining the connection upgrade protocol with reference to current protocols.

Mar 15 - Mar 21:
Finalize the protocol and start writing up the findings

Mar 22 - Apr 4:
	Finalize the paper and include a section about how to go about implementing the protocol.


## Related research

Alex C. Snoeren and Hari Balakrishnan. 2000. An end-to-end approach to host mobility. In <i>Proceedings of the 6th annual international conference on Mobile computing and networking</i> (<i>MobiCom '00</i>). Association for Computing Machinery, New York, NY, USA, 155–166. DOI:https://doi.org/10.1145/345910.345938

Arun Venkataramani, James F. Kurose, Dipankar Raychaudhuri, Kiran Nagaraja, Morley Mao, and Suman Banerjee. 2014. MobilityFirst: a mobility-centric and trustworthy internet architecture. SIGCOMM Comput. Commun. Rev. 44, 3 (July 2014), 74–80. DOI:https://doi-org.ezproxy.library.uvic.ca/10.1145/2656877.2656888

Dipankar Raychaudhuri, Kiran Nagaraja, and Arun Venkataramani. 2012. MobilityFirst: a robust and trustworthy mobility-centric architecture for the future internet. SIGMOBILE Mob. Comput. Commun. Rev. 16, 3 (July 2012), 2–13. DOI:https://doi-org.ezproxy.library.uvic.ca/10.1145/2412096.2412098

Ivan Seskar, Kiran Nagaraja, Sam Nelson, and Dipankar Raychaudhuri. 2011. MobilityFirst future internet architecture project. In Proceedings of the 7th Asian Internet Engineering Conference (AINTEC '11). Association for Computing Machinery, New York, NY, USA, 1–3. DOI:https://doi-org.ezproxy.library.uvic.ca/10.1145/2089016.2089017

F. Zhang et al., "EdgeBuffer: Caching and prefetching content at the edge in the MobilityFirst future Internet architecture," 2015 IEEE 16th International Symposium on A World of Wireless, Mobile and Multimedia Networks (WoWMoM), Boston, MA, 2015, pp. 1-9, doi: 10.1109/WoWMoM.2015.7158137.

B. Yang, X. Chen, J. Xie, S. Li, Y. Zhang and J. Yang, "Multicast Design for the MobilityFirst Future Internet Architecture," 2019 International Conference on Computing, Networking and Communications (ICNC), Honolulu, HI, USA, 2019, pp. 88-93, doi: 10.1109/ICCNC.2019.8685485.

QUIC Protocol - https://datatracker.ietf.org/doc/draft-ietf-quic-transport/
