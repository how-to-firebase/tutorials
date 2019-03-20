# Firebase: 2019's Dominant Web App Platform

## tldr;

Google has invested heavily to make Firebase a full-featured application platform for web. It's dirt cheap to use. It's reliable. It saves up to 50% of your dev time. 

Firebase is all you need... with a few exceptions. Firebase is still missing search functionality, but we can plug that hole with Algolia. Google Cloud Platform provides a few more ancillary services such as DNS, Cloud SQL for reporting data and Bigtable for graph data.

## A Quick History

Firebase was [birthed from a Y Combinator company](https://hackernoon.com/how-to-build-a-product-loved-by-millions-and-get-acquired-by-google-the-firebase-story-82dab4e3e80c) that was acquired by Google in 2014.

Firebase is a classic [disruptive company](http://claytonchristensen.com/key-concepts/). It started as a quick prototyping tool for developers who wanted to move quickly but didn't necessarily need much scale or sophistication.

They've spent the last eight years building capabilities from that original base of passionate freelancers and indie devs, and as a cornerstone of Google Cloud Platform's strategy, Firebase is fighting its way into the larger corporate market.

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

Let's say that I have new user sign up for a multi-player RPG. I want to show that user's email address on their profile, next to any messages that they send to other users. Finally, I'll need a list of all user emails for my admin dashboard.

Firebase asks you to write that email address in three different places, one for each type of read operation. "But Chris!" you ask. What if I need to change the email address??? Isn't that inefficient???

Yep. It's inefficient. You'll have to update that email address in three places, and you'll have to be careful to track everywhere that you saved it.

But how often do you actually need to **write** an email address? What about the reads???

The reality, and the reason that Firebase works so well, is that most apps **read data significantly more** than they write it.

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

I bootstrap projects on a regular basis. Most of my projects are solo projects. I'm the developer, designer and marketer. I'm incredibly time-constrained, so I use Firebase to enable me to achieve greater scope while keeping my time costs low.

I've built the following projects entirely on my own with Firebase:

- [calligraphy.org](https://www.calligraphy.org/): Online teaching platform integrated with Shopify
- [HiiTClock.com](https://www.hiitclock.com/): PWA workout timer
- [pixels.chrisesplin.com](https://pixels.chrisesplin.com/): Chrome extension for UI development
- [bunches.chrisesplin.com](https://bunches.chrisesplin.com/): Multi-player card game

Calligraphy.org powers my wife's business. It took me four months to write it in the mornings before my full-time job. It would have taken twice as long without Firebase.

The other projects took between 75 and 200 hours each. Again, I finished them in my spare time while relying heavily on Firebase.

Firebase has spoiled me. I've used Firebase instead of SQL since 2013. And these aren't just rapid prototypes. They're fully-functional, scalable and used by thousands of customers.

## Firebase includes _nearly_ everything I need to build small- to medium-sized apps

The pillars of Firebase's web offering are

- the Realtime Database (json database),
- Cloud Firestore (document/collection database),
- Cloud Functions for Firebase (serverless functions),
- Firebase Storage (file/blob storage), and
- Firebase Hosting (static file hosting).

These five pillars can support an enormous range of apps.

Realistically, you'll need to "cheat" on Firebase a bit for larger apps. I use GCP for a few things that don't fit neatly within the Firebase offering. I also use [Algolia](https://www.algolia.com/) to power my search.

The funny thing is that Algolia is the most expensive part of my stack at $35/month. The Firebase databases are optimized for everything **except search**. This is an important caveat to recognize early. Searching Firestore collections or anything in the Realtime Database is extremely limited, and for strong architectural reasons. I don't expect to ever see Firebase support search.

I primarily use GCP to manage the DNS for my domains. And I sometimes run Cloud Compute instances for small, custom tasks.

I also use [GitLab.com](https://gitlab.com/deltaepsilon) for CI/CD purposes... so I guess I step out on Firebase a couple of times on each project :)

## Firebase scales effortlessly

Firebase does not allow slow operations. The database does not execute joins. It doesn't search.

I haven't personally built a Firebase app up to massive scale. I've heard that the Realtime Database can run into limits and require manual sharding; however, Firestore is architected much differently, and I wouldn't be surprised if it scales more like [Cloud Spanner](https://cloud.google.com/spanner/).

Firestore has some awesome performance characteristics.

From the [Firestore marketing page](https://firebase.google.com/products/firestore/):

> All queries scale with the size of your result set (note: not your data set), so your app is ready to scale from day one.

Firestore also offers strong consistency, meaning that you don't have to worry about the eventual-consistency data models that bedevil most NoSQL implementations.

## GCP is the escape hatch

Firebase services are built on Google Cloud Platform (aka GCP) infrastructure, and some of them are closely integrated.

For instance, Firebase Cloud Storage uses GCP Storage buckets that you can access through the GCP SDKs.

GCP is an enterprise-focused suite of services. It's massive.

Each Firebase project comes with its own GCP account, granting you access to the full power of GCP. So don't worry if Firebase doesn't fulfill your every need. GCP has it covered.

For example, If you don't want to pay for Algolia, you can spin up an Elasticsearch cluster on GCP and roll your own search. It'll be just as expensive as Algolia... so I can't recommend it for small projects; however, those capabilities are all there.

## Common concerns with Firebase

Firebase has it's downsides!

- Firebase cannot be hosted locally.
- Firebase is tough to mock for local unit tests.
- There's far less tooling available than for SQL databases.
- Firebase can get expensive if you implement it poorly.

None of these problems bothers me. It may be Stockholm Syndrome... but I'm at peace with all of these "problems" with Firebase.

Engineering is all about tradeoffs. Firebase trades a bunch of control and autonomy for speed and simplicity of development.

## When to NOT use Firebase

**DO NOT** use Firebase for highly relational data.

**DO NOT** use Firebase for complex graph data.

**DO NOT** use Firebase for complex server needs.

I sometimes recommend hybrid architectures. Store your relational data in GCP's Cloud SQL or Cloud Spanner databases. Store your graph data in JanusGraph on top of Cloud Bigtable.

But these are all advanced use cases! Don't worry about them until you need them.

## The competition

Firebase's direct competition is dead. [Facebook killed off Parse](https://blog.parseplatform.org/announcements/a-parse-shutdown-reminder/) and [RethinkDB](https://rethinkdb.com/blog/rethinkdb-shutdown/) suffered a similar fate.

The most direct alternative to Firebase at this point is AWS or GCP. They're much more complicated and harder to use... but you could achieve similar architectures with other services.

Or just use Postgres. Postgres is killer... as long as you have budget to write your own API on top of it.

That's about it. Use AWS, GCP or Postgres. Your dev velocity will suffer, but at least with Postgres you can run everything locally!

I've worked in a corporate setting with Postgres running in a local Docker container, and it's slick. I didn't write that API myself. It was expensive to maintain, and I could have duplicated it in Firebase at a much lower cost. But the business I was working with wasn't a fan of managed services. What could I do :)

## Conclusion: Firebase is preferred for most front-end-focused apps

Firebase is a slam dunk for small- to medium-sized projects, especially if they're front-end focused.

You may need to re-architect if you hit massive scale... but you **always** have to re-architect for massive scale. Don't prematurely optimize for scale.

Choose Firebase because it gets you to market faster. It helps you validate your ideas and get feedback.

Firebase is a cornerstone of Google's cloud strategy. It's not going anywhere.
