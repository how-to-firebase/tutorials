---
title: "Overview"
date: 2017-12-13T00:10:00-07:00
draft: false
weight: 10
---

# Overview

Firebase is a huge suite of products. We'll focus on web.

## Modules

Some of these modules are **much** larger than others.

| Module         | Intensity | Reasoning                                                                            |
| -------------- | --------- | ------------------------------------------------------------------------------------ |
| Authentication | 🌶         | Auth is the easiest Firebase feature to implement.                                   |
| Storage        | 🌶🌶        | Small API with some complexity                                                       |
| Messaging      | 🌶🌶        | The Firebase SDK hides most complexity                                               |
| Firestore      | 🌶🌶🌶🌶🌶     | Firestore is the meat of Firebase's offering.                                        |
| Security Rules | 🌶🌶🌶       | Super confusing at first, once you figure it out... it's actually quite simple       |
| Realtime DB    | 🌶🌶🌶🌶      | The Realtime DB (RTDB) is rife with gotchas.                                         |
| Functions      | 🌶🌶🌶🌶🌶     | Functions is the back end of your app. It's tricky to develop on, but crazy powerful |
| Hosting        | 🌶🌶        | Static file hosting has some detail, but it's mostly just static files.              |

## Demo Project: Fogo

Fogo ([github](https://github.com/how-to-firebase/fogo)) is a minimal app that demonstrates 
the features of all of the modules that we're covering.

### Why use a demo project?

Firebase is a sprawling platform. We need to keep an eye on how all of the platform features relate.

Learning a platform is hard. We'll start with working code so that we always have an environment to
test our learning. Experiment, break things, and you can always revert to working code if you get 
lost.
