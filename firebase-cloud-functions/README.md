# Introduction

[Firebase Cloud Functions](https://firebase.googleblog.com/2017/03/introducing-cloud-functions-for-firebase.html) are Google's serverless solution for Firebase apps. They can be used as the (R)eactor functions for [FIRE Stack](https://howtofirebase.com/fire-stack-4195a13daf96) app architecture. If you've developed with firebase-queue, AWS Lambda or some other Functions-as-a-Service architecture, Firebase Cloud Functions should feel natural... just a lot slicker and easier to use :) 

If you're wondering where to start... well, read on my friend.

### FIRE Stack

[FIRE Stack architecture](https://howtofirebase.com/fire-stack-4195a13daf96) replaces the typical REST API with its endpoint and HTTP calls with standalone functions——written by you and running on Firebase's infrastructure—-that react to changes in your app and do anything that you can do in Node.js or Java.

As of this writing, there are six types of triggers:

1. [Firebase Realtime Database](https://firebase.google.com/docs/functions/database-events) triggers
2. [Firebase Authentication](https://firebase.google.com/docs/functions/auth-events) triggers
3. [Firebase Analytics](https://firebase.google.com/docs/functions/analytics-events) triggers
4. [Cloud Storage](https://firebase.google.com/docs/functions/gcp-storage-events) triggers
5. [HTTP](https://firebase.google.com/docs/functions/http-events) triggers
6. [Cloud Pub/Sub](https://firebase.google.com/docs/functions/pubsub-events) triggers

You can read the docs on each of those triggers for some the full rundown. They're not hard to use, although they can be tricky to test. I'm going to start with Authentication and  Firebase Realtime Database triggers. If you can get those working, you shouldn't have trouble with the other even types.

### Node Environment

Cloud Functions supports Node.js LTS releases. The current release is v6.9.1, but [check the docs](https://cloud.google.com/functions/docs/writing/) to make sure that you're developing against the freshest-possible version of Node.js.

If you need help jumping between Node.js versions, check out [n](https://github.com/tj/n) for fast version switching.

To get started, I'm running ```n 6.9.1``` to switch to v6.9.1.

### Authentication Triggers

Authentication


### Testing

I'm using [Jasmine](https://jasmine.github.io/2.0/node.html) for my Node.js tests. It's easy to get started on your own projects. Just do the following:

> I'm using Yarn instead of NPM these days. NPM works almost the same, but let's be honest, Yarn's better :)
> Here are [the docs on installing Yarn](https://yarnpkg.com/lang/en/docs/install/). 
> If you're on OS X, you should be using [Homebrew](https://brew.sh/) for your own sanity.
> If you're serious about dev on OS X, and you're not using Homebrew, take a few minutes to get it set up. Thank me later.
> Installing Yarn with Homebrew is as easy as ```brew update && brew install yarn```.

1. Install Jasmine globally: ```yarn global add jasmine```
2. Install Jasmine in your project: ```yarn add jasmine```
3. Initialize Jasmin: ```jasmine init```
4. Edit ```./spec/support/jasmine.json``` to make sure that the ```spec_dir``` and ```spec_files``` will pick up your tests.



