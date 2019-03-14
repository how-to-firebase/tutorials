# Getting Started with Firebase, 2019 Edition

## tldr;

## A Quick History

Firebase was [birthed from a Y Combinator company](https://hackernoon.com/how-to-build-a-product-loved-by-millions-and-get-acquired-by-google-the-firebase-story-82dab4e3e80c) that was acquired by Google in 2014.

Firebase is a classic [disruptive company](http://claytonchristensen.com/key-concepts/). It started as a quick prototyping tool for developers who wanted to move quickly but didn't necessarily need much scale or sophistication.

They've spent the last eight years building capabilities from that original base of passionate freelancers and indie devs, and as a cornerstone of Google Cloud Platform's strategy, Firebase is poised to enter the larger corporate market.

## What is Firebase?

Firebase is a suite of managed services that are focused on developer experience over raw power.

Firebase handles your authentication, data storage, document storage and serverless functions.

AWS and GCP appeal to large, corporate projects that can take years to ship.

Use Firebase when you need to ship yesterday.

You may have heard that Firebase is just for startups or prototypes, or that it fails at scale or gets super expensive. Well... things have changed. A lot.

## Firebase teaches front-end devs to use a distributed architecture

Firebase enables a distributed architecture.

New developers have traditionally learned to build monolithic apps.

A monolith is a single application server that holds your database and server. Everything lives on a single server that you control, so it's very easy to teach and understand. 

The first managed service that I used was Amazon S3. It was an endpoint where I could send files. S3 would save the files and give me a link. I'd save the link in my local SQL database and S3 would serve the file to my users.

Managed services are used to create distributed systems. Each part of the system is optimized for a small part of the puzzle. Developers compose these systems together.

AWS and GCP provide extremely powerful, complicated managed services aimed at large, enterprise users. They're not built for indie devs. And that's where Firebase comes in.

Firebase lets you quickly deploy managed services for small- to medium-sized apps. And you can roll in heavier-duty Google Cloud Platform (GCP) services as your app grows.

## An alternative to SQL

Most developers are raised on SQL.

SQL is great for modeling relational data, but guess what! Most data is not as relational as you may think.

SQL is ideal when you don't know how you're going to query your data. You simply store your data in [third normal form](https://en.wikipedia.org/wiki/Third_normal_form) and SQL lets you query it into almost any structure for your front end.

Firebase and other NoSQL datastores optimize for reads, which are much more common than writes. So instead of writing once and reading in many different ways like with SQL... NoSQL/Firebase asks you to write the data to match your reads.

## Firebase crushes other databases (for many use cases)

Let's say that I have new user sign up for a multi-player RPG. I want to show that user's email address on their profile, next to any messages that they chat to other users, and finally I'll need a list of all user emails for my admin dashboard.

Firebase asks you to write that email address in three different places. "But Chris!" you ask. What if I need to change the email address??? Isn't that inefficient???

Yep. It's inefficient. You'll have to update that email address in three places, and you'll have to be careful to track everywhere that you saved it.

But how often do you actually need to write an email address? What about the reads???

The reality, and the reason that Firebase works so well, is that most apps read data **significantly more** than they write it.

So get over your SQL-induced anxiety and duplicate data throughout your Firebase data structure. Your database reads will dramatically outperform SQL reads at scale.

## The Evil Twin Databases

Firebase now has two databases, 

1. the [Realtime Database](https://firebase.google.com/docs/database/), also known as classic Firebase or the RTDB, and
2. [Cloud Firestore](https://firebase.google.com/docs/firestore/).

The Realtime Database is ideal for fast, high-volume operations. I use the RTDB for tracking how many users I have online at any one time. I use it for job queues that are consumed with [Cloud Functions](https://firebase.google.com/docs/functions/).

Firestore is better for longer-lived, more structured data. I use Firestore for 90% of my data storage. You pay by the operation, so it's not ideal for extremely frequent reads and writes... but that's why we have the RTDB :)

I use Firestore for user profiles, chat logs, purchase records... anything that I need to stick around for a while.

## Firebase is cheap and much, much faster

The [Iron Triangle of Project Management](https://en.wikipedia.org/wiki/Project_management_triangle) states that all projects are compromises between **cost**, **scope** and **time**.

Firebase is the lowest-cost and fastest development experience of which I'm aware.

I bootstrap projects on a regular basis. Most of my projects are solo projects. I'm the developer, designer and marketer. I'm incredibly time-constrained, so I use Firebase to enable me to achieve greater scope.

I've built the following projects entirely on my own with Firebase:

- [calligraphy.org](https://www.calligraphy.org/): Online teaching platform integrated with Shopify
- [HiiTClock.com](https://www.hiitclock.com/): PWA workout timer
- [pixels.chrisesplin.com](https://pixels.chrisesplin.com/): Chrome extension for UI development
- [bunches.chrisesplin.com](https://bunches.chrisesplin.com/): Multi-player card game

Calligraphy.org powers my wife's business. It took me four months to write it in the mornings before my full-time job. It would have taken twice as long without Firebase.

The other projects took between 75 and 200 hours each. Again, I finished them in my spare time while relying heavily on Firebase.

Firebase has spoiled me. I haven't spun up a new production server in two years. And these aren't just rapid prototypes. They're fully-functional, scalable and used by thousands of customers.

## Firebase includes *nearly* everything I need to build small- to medium-sized apps

The pillars of Firebase's web offering are 

- the Realtime Database (json database),
- Cloud Firestore (document/collection database),
- Cloud Functions for Firebase (serverless functions),
- Firebase Storage (file/blob storage), and 
- Firebase Hosting (static file hosting).

These five pillars can support an enormous range of apps.

Realistically, you'll need to "cheat" on Firebase a bit for larger apps. I use GCP for a few things that don't fit neatly within the Firebase offering. I also use [Algolia](https://www.algolia.com/) to power my search. 

The funny thing is that Algolia is the most expensive part of my stack at $35/month. The Firebase databases are optimized for everything **except search**. This is an important caveat to recognize early. Searching Firestore collections or anything in the Realtime Database is extremely limited, and for strong architectural reasons. I don't expect to ever see Firebase support search.

I primarily use GCP to manage the DNS for my domains. But I've also run some Cloud Compute instances for build processes. 

And I use [GitLab.com](https://gitlab.com/deltaepsilon) for CI/CD purposes... so I guess I step out on Firebase a couple of times on each project :)

## Firebase scales effortlessly



## GCP is the escape hatch

## Common concerns with Firebase

## When to NOT use Firebase

## The competition

## Conclusion: Firebase is preferred for most front-end-focused apps