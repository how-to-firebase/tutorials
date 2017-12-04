# Implementation: Client-side is easy

All example code can be found in my
[Quiver repo](https://github.com/deltaepsilon/quiver/tree/master/packages/firebase-authentication)
on Github. I've called the project `firebase-authentication`. The relevant Firebase Authentication
code can be found in
[auth-service.js](https://github.com/deltaepsilon/quiver/blob/master/packages/firebase-authentication/src/services/auth.service.js).

## Overview

The example code uses [Preact](https://github.com/developit/preact) for client-side templating, but
don't get distracted by that. The relevant code for Firebase is all standard ES2015 JavaScript.

### Auth Service

We'll start by reviewing
[auth-service.js](https://github.com/deltaepsilon/quiver/blob/master/packages/firebase-authentication/src/services/auth.service.js).

I'm using [Visual Studio Code](https://code.visualstudio.com/) as my editor/IDE, and you'll notice
that a lot of code folding in my example images. Code folding is simply a way to visually collapse
blocks of code in the IDE so that they don't distract us.

### Function Signatures

**AuthService** has 10 methods that use `firebase.auth()`.

* onAuthStateChanged
* signOut
* currentUserDelete
* signInWithEmailAndPassword
* createUserWithEmailAndPassword
* sendPasswordResetEmail
* signInWithPhoneNumber
* signInWithPopup
* signInWithRedirect
* getRecaptchaVerifier

![AuthService](https://i.imgur.com/ZWrk6uA.png)

![AuthService return](https://i.imgur.com/B7uqUSS.png)

**AuthService** takes 4 functions as external dependencies

* fire
* handleError
* changeView
* clearInputs

These external dependencies encapsulate business logic that's irrelevant to our examples, so don't
worry about them.

**AuthService** also uses `window.firebase` and `firebase.auth()` to bootstrap itself. This assumes that Firebase has already been attached to the ```window``` object via script tags on the page.

Finally, **AuthService** creates a `providersMap` using the `firebase.auth` prototype. These providers will be used for OAuth login in the ```signInWithPopup``` and ```signInWithRedirect``` methods.

![method signature](https://i.imgur.com/CJ8Ohet.png)

### onAuthStateChanged

The ```onAuthStateChanged``` method is the crux of Firebase Authentication. It's used to register a callback that gets called whenever the page's authentication state changes.

If the page loads and there are no authentication tokens in ```localStorage```, then the callback is called with a ```null``` argument. Otherwise, if Firebase Authentication has previously authenticated on the page and saved a token to ```localStorage```, then ```onAuthStateChanged``` is called with Firebase Authentication's ```currentUser```.

The ```currentUser``` is the JWT that Firebase Authentication is using for the session.

The example below shows that ```AuthServices``` exported ```onAuthStateChanged``` function is merely a wrapper for ```window.firebase.auth().onAuthStateChanged```. You don't need to wrap ```onAuthStateChanged``` in your own code, but it was helpful with this service architecture to isolate ```AuthService``` and ```index.js```, which is calling it.

Notice in the example below that ```initAuthService```  creates a new ```AuthService``` and passes in the relevant dependencies. Next it passes a callback into ```this.authService.onAuthStateChanged```. This callback contains application-specific business logic which we can ignore. Just note that ```currentUser``` will be ```null`` if authentication fails and will contain the JWT if authentication succeeds.

### signOut & delete


