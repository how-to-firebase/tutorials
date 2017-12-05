# Implementation: The easy part?

All example code can be found in my
[Quiver repo](https://github.com/deltaepsilon/quiver/tree/master/packages/firebase-authentication)
on Github. I've called the project `firebase-authentication`. The relevant Firebase Authentication
code can be found in
[auth-service.js](https://github.com/deltaepsilon/quiver/blob/master/packages/firebase-authentication/src/services/auth.service.js).

> These examples use
> [JavaScript ES2015 destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
> and single-parameter (monad) functions. I like to pass in a single object with named attributes,
> then destructure those attributes in the method signature. This is all personal preference, so
> don't let it distract you.

## Overview

The example code uses [Preact](https://github.com/developit/preact) for client-side templating, but
don't get distracted by that. The relevant code for Firebase is all standard ES2015 JavaScript.

### Auth Service

We'll start by reviewing
[auth-service.js](https://github.com/deltaepsilon/quiver/blob/master/packages/firebase-authentication/src/services/auth.service.js).

I'm using [Visual Studio Code](https://code.visualstudio.com/) as my editor/IDE, and you'll notice a
lot of code folding in my example images. Code folding is a way to visually collapse blocks of code
in the IDE so that they don't distract us.

### Function Signatures

**AuthService** has 10 methods that use `firebase.auth()`.

* `onAuthStateChanged`
* `signOut`
* `currentUserDelete`
* `signInWithEmailAndPassword`
* `createUserWithEmailAndPassword`
* `sendPasswordResetEmail`
* `signInWithPhoneNumber`
* `signInWithPopup`
* `signInWithRedirect`
* `getRecaptchaVerifier`

![AuthService](https://i.imgur.com/ZWrk6uA.png)

![AuthService return](https://i.imgur.com/B7uqUSS.png)

**AuthService** takes 4 functions as external dependencies

* fire
* handleError
* changeView
* clearInputs

These external dependencies encapsulate business logic that's irrelevant to our examples, so don't
worry about them.

**AuthService** also uses `window.firebase` and `firebase.auth()` to bootstrap itself. This assumes
that Firebase has already been attached to the `window` object via script tags on the page.

Finally, **AuthService** creates a `providersMap` using the `firebase.auth` prototype. These
providers will be used for OAuth login in the `signInWithPopup` and `signInWithRedirect` methods.

![method signature](https://i.imgur.com/CJ8Ohet.png)

### onAuthStateChanged

The `onAuthStateChanged` method is the crux of Firebase Authentication. It's used to register a
callback that gets called whenever the page's authentication state changes.

> Note: Firebase Authentication uses `localStorage` to save authentication tokens across user
> sessions.

If the page loads and there are no authentication tokens in `localStorage`, then the callback is
called with a `null` argument. Otherwise, if Firebase Authentication has previously authenticated on
the page and saved a token to `localStorage`, then `onAuthStateChanged` is called with Firebase
Authentication's `currentUser`.

The `currentUser` is the JWT that Firebase Authentication is using for the session.

The example below shows that `AuthService`'s exported `onAuthStateChanged` function is merely a
wrapper for `window.firebase.auth().onAuthStateChanged`. You don't need to wrap `onAuthStateChanged`
in your own code, but it was helpful with this service architecture to isolate `AuthService` from
the component that's using it.

The example below has two files, `auth.service.js` and `index.js`. `index.js` is the code for the
component that's using `AuthService`. Notice in the example below that `initAuthService` creates a
new `AuthService` and passes in the relevant dependencies. Next it passes a callback into
`this.authService.onAuthStateChanged`. This callback contains application-specific business logic
which we can ignore. Just note that `currentUser` will be ``null` if authentication fails and will
contain the JWT if authentication succeeds.

![onAuthStateChanged](https://i.imgur.com/UC8l10r.png)

### signOut & delete

Signing out is easy enough. We called `firebase.auth()` at the top of the file and assigned the auth
object to the variable `auth`, so all we need to do is call `auth.signOut()` and our session will be
closed and our `onAuthStateChanged` callback will be called with a `null` currentUser.

Deleting our currentUser is a bit trickier, because we need to get the currentUser first.
currentUser is an attribute on our `auth` object. It can be accessed directly directly from
`window.firebase.auth().currentUser`. The `currentUser` object has a `delete` method that returns a
promise.

![Imgur](https://i.imgur.com/uKhdDRW.png)

### Email/Password Auth

There are two email/password-specific functions with the same method signature:

* `auth.signInWithEmailAndPassword(email, password)`
* `auth.createUserWithEmailAndPassword(email, password)`

Both methods return promises, and you should definitely use `.catch` blocks to handle errors from
both methods. The error objects have a `code` attribute that you'll use to handle the errors.

`signInWithEmailAndPassword` throws two codes worth handling:

* `auth/user-not-found`
* `auth/wrong-password`

There's one **gotcha** here, and it's with `auth/wrong-password`. If you offer login with an OAuth
provider--Google/Facebook/Twitter/Github--you'll likely have users that log in with the OAuth
provider, sign out, and then try to log in with the same email address.

In this case there will be an account under that email address, but it won't have a password
associated with it. This login attempt will throw an `auth/wrong-password` error, so you'll need to
decide on your own business logic in this case. Do you want to suggest that they reset their
password, register a new email/password account, or remind them to try signing in with an OAuth
provider? It's up to you!

`createUserWithEmailAndPassword` throws one error:

* `auth/email-already-in-use`

Note that `auth/email-already-in-use` will only be thrown if a user already has an OAuth account
**AND** you've limited users to one account per email address. You can change this setting in your
Firebase Dashboard under **Authentication > Sign-In Method > Advanced > One account per email
address > CHANGE**

![sign in user with email/password](https://i.imgur.com/kWo2Zlb.png)

There's one more email/password method that we've missed: `sendPasswordResetEmail(email)`

It's simple enough. It sends an email with a password reset link. You can modify the password reset
email on your Dashboard under **Authentication > Templates > Password reset**.

![send password reset email](https://i.imgur.com/c1HPgZT.png)

### Phone Auth

Phone auth is a little trickier to implement due to the need for a recaptcha element on the page.
This can get a little complicated, so you'll want to review the
[Firebase docs](https://firebase.google.com/docs/auth/web/phone-auth) before creating your own
implementation.

The gist is that you create an element on your page to hold the recaptcha element and give Firebase
the `id` for that element. Firebase Authentication will automatically inject a recaptcha box into
the element and will request that the user complete a recaptcha test before signing in with a phone
number.

The trick is that you can specify that the recaptcha should be `invisible` and use the `id` of the
button that you use to trigger the phone auth. Firebase will then use Google's recaptcha system to
do mouse tracking on the button to determine if the user is human. If the recaptcha mouse-tracking
test is inconclusive, Firebase will open a recaptcha modal in the window.

You'll need to register your `RecaptchaVerifier` when you render your phone login form. You'll also
need to pass the resulting `RecaptchaVerifier` object into `signInwithPhoneNumber(phoneNumber,
recaptchaVerifier)`.

![create recaptcha verifier](https://i.imgur.com/L0IqQEF.png)

There's another **gotcha** with `signInWithPhoneNumber`: be careful how you format the phone number.
The format that's successful for me is `+1 1234567890`, where `+1` is a country code, followed by
a space and then the phone number. The following example uses the variable name `callingCode` for
the country code.

Notice in the example how I handle a successful call to `signInWithPhoneNumber` in the `.then(...)`
block. The `.then(...)` block gets called with a `confirmationResult` object that has a `.confirm`
method on it. `.confirm` returns a promise, and you'll need to catch any errors with a `.catch(...)`
block. You'll call `confirmationResult.confirm(code)` with the confirmation code that will be sent
to your user's phone via SMS.

If `.confirm` is passed a valid code, then the callback we registered earlier with
`auth.onAuthStateChanged(cb)` will be called with the new currentUser JWT. If the code is wrong, the
`.confirm` call will throw an error with the code `auth/invalid-verification-code`.

![sign in with phone number](https://i.imgur.com/V7hBqys.png)

## Phone Auth Review

Phone auth is tricky for two reasons:

1. Recaptcha
2. Saving the `confirmationResult` and calling it later

You'll likely need to fuss with the recaptcha a bit to get it working smoothly with your user
interface. Experiment with different size options and use the
[Firebase docs](https://firebase.google.com/docs/auth/web/phone-auth) as your guide. I personally
like to attach an invisible recaptcha to my **SEND SMS** button, but you may find the visible
captcha to be more reliable.

I also found that I needed to pass in a callback when registering a new `RecaptchaVerifier`, even if
that callback was an empty function. Experiment with it and be patient :)

Second, calling `auth.signInwithPhoneNumber` can be tricky because you'll need to save the resulting
`confirmationResult` using `.then(confirmationResult => ...)`. In my example I used an external
function called `setConfirm` and passed it a function that takes a code and passes it into
`confirmationResult.confirm`. This is a common JavaScript pattern, but it may be hard to read if
you're less familiar with JavaScript. Pay close attention to lines 64 and 65 of the example.

`setConfirm` is an external function that I passed into `AuthService` from a UI component.
`setConfirm` takes a callback function and saves it to a variable for later use. When the user has
entered a confirmation code into that component's form, the component calls the callback function
with the code. The callback function has wrapped a call to
`confirmationResult.confirm(code).catch(...)`.

### OAuth with Popup or Redirect

OAuth is the easy part. We can call one of two methods, and the callback we registered earlier with
`auth.onAuthStateChanged` will handle the result. And that's it.

* `auth.signInWithPopup(provider)`
* `auth.signInWithRedirect(provider)`

Just make sure to pass in a valid provider. Our example created a map of all possible providers at
the top of the file and assigned it to `providersMap`, but you can create the provider object inline
if you prefer.

![sign in with OAuth](https://i.imgur.com/8EBSuBo.png)
