# Outro: Maybe it wasn't that easy :)

I covered email/password, phone and OAuth authentication methods.

I did not cover anonymous authentication or custom authentication.

## Anonymous & Custom Authentication

Most apps will not need anonymous or custom authentication, and I don't recommend using them unless
you absolutely need them.

You'll know that you need anonymous auth if you need secure database transactions with an
otherwise-unauthenticated user, or if you need to maintain a user session without authenticating
your user.

You'll only use custom auth if you need to integrate a Firebase client with a non-Firebase
authentication system. There's no problem with doing this... just don't waste your time on it if
it's not necessary. The entire point of using Firebase is that it's an app platform. Yes, you can
use each part of the platform separately, but that kinda defeats the purpose.

## OAuth is the best

Seriously. Use OAuth providers, especially Google. OAuth providers let your users benefit from
multi-factor authentication, and they de-risk your own code. Sure, holding onto an email and
password for a few seconds before you pass them to Firebase and delete them forever isn't
particularly risky... but why waste the effort when you can use users' existing OAuth provider
accounts?

## Know your users

<rant>
I just urged you to use OAuth. Well, maybe don't use OAuth. Make sure you know your users. Talk to
them. Are they social-media obsessed power users who prefer Twitter OAuth, or are they phone-first
users who may not have any other accounts and would prefer a quick SMS auth experience?

Yeah, it's easy to overload your users with **ALL OF THE AUTHS**, but sometimes a simple
email/password form is more effective. Find out. Ask your users. And if you're too lazy to ask,
maybe start with OAuth and track page abandonment analytics?

Auth sign-in flows can be make-or-break for an app. Don't fail because of your sign-in flow.
</rant>

