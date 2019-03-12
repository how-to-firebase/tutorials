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

## Firebase teaches you to use a distributed architecture

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

Firebase has two databases, 

1. the [Realtime Database](https://firebase.google.com/docs/database/), also known as classic Firebase or the RTDB, and
2. [Cloud Firestore](https://firebase.google.com/docs/firestore/).

The Realtime Database is ideal for fast, high-volume operations. I use the RTDB for tracking how many users I have online at any one time. I use it for job queues that are consumed with [Cloud Functions](https://firebase.google.com/docs/functions/).

Firestore is better for longer-lived, more structured data. I use Firestore for 90% of my data storage. You pay by the operation, so it's not ideal for extremely frequent reads and writes... but that's why we have the RTDB :)

I use Firestore for user profiles, chat logs, purchase records... anything that I need to stick around for a while.





## Firebase is cheap and much, much faster



## Firebase includes everything you need to build small- to medium-sized apps

## Firebase scales effortlessly

## GCP is the escape hatch

## Common concerns with Firebase

## When to NOT use Firebase

## The competition

## Conclusion: Firebase is preferred for most front-end-focused apps