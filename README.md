LiquidGalaxyVideoConference
===========================

The aim of the project it's to add a video-call funcionality to the acutal Liquid Galaxy using the [WebRTC](https://webrtc.org) technology.
This is a [Google Summer of Code 2014](http://www.google-melange.com/gsoc/homepage/google/gsoc2014) project linked with the  [Liquid Galaxy project](http://www.google.com/earth/explore/showcase/liquidgalaxy.html).

We investigated the actual situation related to open source projects and WebRTC applications that allows you to do video-conferences and it was quite limited. Most of them allows you to do that but with Peer 2 Peer connections and that means that if we have a 5 people video-conference we will have to upload 5 times our stream and this is big trouble for the usual Internet connections that we all have. The project that we found more interesting was the one called Licode project, a project by some researchers of Universidad Politécnica de Madrid, we have chosen this one because they implemented a Multipoint Control Unit (MCU) that is 100% compatible with WebRTC standards and protocols called Erizo written in c++. And additionally they give a really friendly API called Erizo Api that configures and manages all the aspects of Erizo from the Node.js application.

If you are interested on install and make this project run please feel free to take a look on the [Project wiki](https://github.com/cdedios/LiquidGalaxyVideoConference/wiki)



# Code Structure

In this section you will find the description of the project structure; we will explain a little bit about the WebRTC technology and the Licode Project, how they work and give some examples. Later on we will discuss the main issues that we faced while we implemented
our solution and concluding we will mention the part that we found more interesting.

## General Structure
In the next two points we will describe the 2 main projects that our solution is based on:
WebRTC and Licode.
### WebRTC
WebRTC is a free, open project that enables web browsers with Real-Time Communications (RTC) capabilities via simple JavaScript APIs and HTML5. The WebRTC components have been optimized to serve better this purpose. It's supported by Google, Mozilla and Opera. Historically, RTC has been complex, requiring expensive audio and video technologies to be licensed or developed by yourself. Integrating RTC technology with existing content, data and services has been difficult and time consuming, particularly on the web. In May 2011, Ericsson built the first implementation of WebRTC.

WebRTC implements open standards for real-time, plugin-free video, audio and data communication:
   * Many web services already use RTC, but need downloads, native applications or plugins. These includes Skype, Facebook (which uses Skype) and Google Hangouts (which use the Google Talk plugin).
   * Downloading, installing and updating plugins can be complex and annoying.
   * Plugins can be difficult to deploy, debug, troubleshoot, test and maintain -and may require licensing and integration with complex, expensive technology. It's often difficult to persuade people to install plugins in the first place!

The guiding principles of the WebRTC project are that its APIs should be open source, free, standardized, built into web browsers and more efficient than existing technologies.
WebRTC applications need to do several things:
* Get streaming audio, video or other data.
* Get network information such as IP addresses and ports, and exchange this with other WebRTC clients (known as peers) to enable connection, even through NATs and firewalls.
* Coordinate signaling communication to report errors and initiate or close sessions.
* Exchange information about media and client capability, such as resolution and codecs.
* Communicate streaming audio, video or data.

This are the main APIs that WebRTC implements to acquire and communicate
streaming data:
* MediaStream: get access to data streams, such as from the user's camera and microphone.
* RTCPeerConnection: audio or video calling, with facilities for encryption and bandwidth management.
* RTCDataChannel: peer-to-peer communication of generic data.

### Licode Project
The Licode project is an Open Source project that allows us to include real-time communications like streaming or videoconference on our web application in a very easy and fast way. Is based on WebRTC technologies and 100% compatible with latest stable versions of Google Chrome. Users are able to talk from their web browsers with no need to installing anything.
On the Figure we can how it looks like the structure of a Licode application.

Based on the Figure we will introduce the main elements:

**Clients:** Clients are JavaScript applications that run on browsers. Users will be able to access Licode rooms by using these clients. When connecting to a room a client needs the access token that is usually taken by server applications. You could implement
videoconference rooms, chat, synchronization mechanisms, VoIP applications, and so on. Clients talk to Erizo Controller through Erizo client, which is part of this project.

**Rooms:** All users and clients in a room can share their streams through Licode. They can act like videoconferencing chats, instant messaging rooms, video streaming sessions, and any other kind of virtual space for real-time collaboration. A room is created by server applications through Nuve API, and the users will connect to these rooms through Erizo. Rooms are controlled by Erizo Controller, which manages Erizo through a JavaScript wrapper called Erizo API to control streams.

***Erizo:*** Clients will connect users to rooms through Erizo service. Developers can manage this service with a JavaScript library that runs in the browser. Erizo is a cloud-based scalable service that allows multiple users to connect to Licode rooms. These rooms are created by the server applications using Nuve API. Erizo Controller which manages Erizo through a JavaScript wrapper called Erizo API to control streams.

***Nuve API:*** Developers can manage Licode rooms by sending requests to this API. These requests are typically sent from server applications, coded in python, node.js, Ruby on Rails, and so on. Licode provides different libraries, plug-ins and add-ons to facilitate the tasks of creating and removing rooms. Server applications can also ask for access tokens to this API. These tokens are needed for user connections, so developers should pass them to clients. Server talks to Nuve in order to do these actions.

***Server:*** Developers will manage rooms (creation and deletion) from their server applications. Typical server applications can create a room, and request access for their users to Nuve, via a token-based authentication mechanism. This mechanism allows these
servers to create access tokens, and they will provide these tokens to their clients. Server talks to Nuve in order to do these actions Now we will introduce the 2 APIs that we will use on the both sides server and client.

***Client API:*** This API handles connections to rooms and streams in the web applications. Is designed to be executed in the browsers of your users, so it is provided as a JavaScript file you can reference in your web applications. Typical usage consists of: connection to the desired room, using the token retrieved in the back-end (explained at Server API), management of local audio and video, client event handling, and so on.
