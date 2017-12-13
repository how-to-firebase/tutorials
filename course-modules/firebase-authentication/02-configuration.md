# Configuration: Let's get started!

Your first step is to visit your Firebase Dashboard and select Develop > Authentication from the
left nav bar.

Now select the **SIGN-IN METHOD** tab and start enabling sign-in methods.

![sign in method](https://i.imgur.com/dmAgaFh.png)

Email/Password, Phone, Google and Anonymous auth can be enabled with a quick button click. The
third-party providers--Facebook, Twitter and Github--will require a little more ceremony. You'll
need to follow the instructions in the Firebase docs to register your app with the third-party
provider. We'll cover the Facebook flow below.

But quick! Before you get distracted, scroll down a bit and notice that Firebase requires you to
approve the domains that you want to use with Firebase Authentication. Your Firebase Hosting domain
will be there by default. So will 127.0.0.1 and localhost. Add any extra domains you hope to use.

Also notice the **Advanced** options:

* One account per email address
* Manage sign-up quota

I personally like to enable multiple auth methods for each email address. That enables my users to
sign in with Google one day and Facebook the next. My app's business logic will notice the matching
email addresses and provide them the same account data.

Multiple accounts per email is harder to secure than requiring one account per email. If you require
one account per email you can still prompt users to link accounts their other
Google/Facebook/Twitter/Github accounts once they've logged in.

I've just noticed that my users tend to forget how they logged in last time, so I like to
automatically link accounts if possible. But yeah... that's extra work on my end, and it's possible
that an attacker could steal a victim's email, add it to their Facebook account and use Facebook to
log into my app :(

Managing the sign-up quota is useful if you find that your app is getting spammed by fake sign-up
attempts. This is rare :)

## Add a third-party OAuth provider

We'll cover the Facebook flow below. Facebook may alter their developer site, so check the
[Firebase docs](https://firebase.google.com/docs/auth/web/facebook-login) if you get confused.

1. [Create a developer account](https://developers.facebook.com/) with Facebook or log in to your
   existing account.
2. Create a new Facebook app.
3. Copy your App ID and App Secret
4. Paste your App ID and App Secret into the Firebase Dashboard
5. Copy the OAuth redirect URI from your Firebase Dashboard
6. Set up Facebook Login on Facebook's developer site
7. Paste your OAuth redirect URI from step 5 into Facebook's **Valid OAuth redirect URIs** field

### Screenshots: Add Facebook OAuth

![Imgur](https://i.imgur.com/I9VkiYK.png)

![Create a Facebook App](https://i.imgur.com/2vl7bAA.png)

![Copy your App ID and App Secret](https://i.imgur.com/uCkDHm6.png)

![Paste your App Id and App Secret](https://i.imgur.com/qaSYddj.png)

![Set up Facebook Login](https://i.imgur.com/Rcwulu0.png)

![Paste your OAuth redirect URI](https://i.imgur.com/jQjgGJH.png)

# Add Firebase Auth to your Web App

This is the easy part.

The Firebase SDK is typically added to a web page using a `<script>` tag. It can be pulled in with
ES2015 imports if you're using Babel, but let's keep it simple for now.

1. Navigate to your Firebase Dashboard and click **Project Overview** on the left bar.
2. Click the **Add Firebase to your web app** button in the main panel.
3. Copy the `<script>` tags and paste them into the `index.html` for your web app.

![Navigate to Firebase Project Overview](https://i.imgur.com/tXN4Wcq.png)

![Copy your script tags](https://i.imgur.com/CBlawKZ.png)

![Paste script tags into index.html](https://i.imgur.com/fz6RsxX.png)

### Advanced Configuration (very optional)

Notice how in the example above you imported the entire Firebase SDK from
```https://www.gstatic.com/firebasejs/4.7.0/firebase.js```

Also notice that you hard-coded your config into your `index.html`.

There's nothing wrong with this, and it's the easiest way to add Firebase to your app; however,
`firebase.js` is a heavy file to load onto your page, and the Firebase teams knows it. As a result,
they've broken `firebase.js` up into its component parts, so only use the bits
that you need.

You'll need `firebase-app.js` imported first, but from their you can add the other parts a-la carte.

* `firebase-auth.js`
* `firebase-database.js`
* `firebase-firestore.js`
* `firebase-messaging.js`

**_Hot Tip_**

Notice how your config is hard-coded in the example? There's a way around that!

If you use Firebase Hosting, all of the relevant Firebase SDK files are served up from
`https://your-app.firebaseapp.com/__/firebase/`, including a file called `init.js` that will
automatically initialize your app with all of its config!

This is super useful if you plan to deploy your client code to different Firebase apps, which is
recommended for development, testing and production environments.

And what about local dev? Well, I like to create a matching folder structure in my local project.
Then I copy/paste the relevant files to my local directory under `/__/firebase/`. This is an
advanced technique to be sure, but it will save you a lot of pain when configuring multiple deploy
environments.

```html
<body>
  <!-- Just auth, no database, firestore or messaging -->
  <script src="__/firebase/4.7.0/firebase-app.js"></script>
  <script src="__/firebase/4.7.0/firebase-auth.js"></script>
  <script src="__/firebase/init.js"></script>
</body>
```

![Use the __/firebase folder](https://i.imgur.com/qVYhFmg.png)

![Local folder structure](https://i.imgur.com/vqgfyCj.png)
