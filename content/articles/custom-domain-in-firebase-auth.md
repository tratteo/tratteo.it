---
title: "How to set a custom domain in Firebase Auth"
headline: Web Dev
date: 2026-01-27
description: Learn how to use a custom domain in your Firebase app in simple steps.
tags: [backend, firebase]
author:
    name: Matteo Beltrame
    avatar: /trat.jpg
    url: https://tratteo.it
thumbnail: /articles/custom-domain-in-firebase-auth/thumbnail.jpg
github_repo: null
youtube_tutorial: https://youtu.be/rwq_vLEfPMU
techstack: [firebase, typescript]
---

::callout{icon="ri:target-fill" }
We will set a custom auth domain for our [Firebase](https://firebase.com){target=\_blank} project, so that our app will have a more professional feeling.
::

## Requirements
To proceed with the tutorial it is supposed you already meet the following requirements:
1. You have an active Firebase project
2. You own a valid domain

I will not go into the details on how to create or integrate Firebase with your web framework. However, if you do not have a project, you can create a new one in the [Firebase Console](https://console.firebase.google.com).

::callout{icon="logos:youtube-icon" to="https://youtu.be/BSuBX_mt2aw" target="_blank"}
If you want to learn how to build a **fullstack** web app in Nuxt using Firebase as backend, check out the complete tutorial on my YouTube channel! 
::

When you first create a Firebase project, the default auth domain will have the following structure: `yourappid.firebaseapp.com`. This is the domain that will appear when users will sign up with external providers, such as Google.


## Configuring Firebase Auth providers

For this tutorial we will use the Google provider to check that the domain has been correctly configured as it is the easiest provider to enable.

Head into the `Authentication` section of Firebase and go into the `Sign-in method` tab.
Here you will click on `Add new provider` and select Google. You can edit some default parameters if you want, such as the project id, then insert the support email and confirm.

::note
To enable providers in mobile apps you have to meet further requirements. Check out the [official documentation](https://developers.google.com/android/guides/client-auth) to learn more. I suggest you to test the domain configuration with a web app, which is extremely easy to implement for testing purposes.
::

## Configuring the custom domain

At this point we need to add our custom domain. We will have to add it in few different places: the Auth settings and the Hosting settings.

#### Auth settings
Head over the `Settings` tab of the Authentication section and then in the `Authorized domains` section you can add your custom domain. 
You should have some default domains configured by Firebase.
::tip
In the Auth settings, you will have to add the root domain. In the example below, I added the domain `depthlog.net` for my custom app [Depthlog](https://depthlog.net){target=\_blank} even if we will use a subdomain for the auth provider. 
::

You can add any custom domain that you want, you can see that I added also the `depthlog.vercel.app` one since my app is hosted on [Vercel](https://vercel.com){target=\_blank}.
![Firebase auth domains settings](/articles/custom-domain-in-firebase-auth/firebase-auth-domains-settings.jpg)


#### Hosting settings

In the Hosting settings, you will have to add the actual domain that you want to use in your app. 
::warning
Even if you are not hosting your project on Firebase Hosting, you have to add the domain anyway, since the auth provider is hosted by Firebase Hosting itself.
::

This will be the domain that will host the provider popup. In the example, I added the domain `app.depthlog.net`. It is important that the subdomain is free and it is not used for something else. 
![Firebase auth domains settings](/articles/custom-domain-in-firebase-auth/hosting-domains-settings.jpg)

If you do not use Firebase Hosting for your project, you will encounter a nuisance when adding the custom domain: everytime you will access the Hosting section, you will have to go through the "initialization steps".
::note
After adding the domain, it can take up to multiple hours for Firebase to generate the certificate.
::

## Configuring Google Cloud Console

At this point we are almost done, we need to configure the domain in the Google Cloud Console so that our app can execute the code and authorize the redirecting url.

Head over to the following path in the Google Cloud Console [`API and services/credentials`](https://console.cloud.google.com/apis/credentials){target=\_blank} (double check that the selected project is the right one) and look for the OAuth 2.0 clients.

You will have different clients for the different apps that you have in your Firebase project, so one for Android, one for IOS, one for Web and so on.

In this case we will configure the Web client. 

1. Look for the entry named `Web client (auto created by Google Service)` and click on it
2. Add the complete domain including the protocol in the **Authorized JavaScript origins**. In my case I will add the following domain `https://app.depthlog.net`
3. Add to the **Authorized redirecting URI** the URI composed by your domain, followed by the suffix `__/auth/handler`. So again, in my case it would be `https://app.depthlog.net/__/auth/handler`.
4. Click on save.

## Hooking the custom domain

Now everything is configured, the last thing is to configure your Firebase plugin in order to use the custom auth domain. To do that simply replace the `authDomain` value in your Firebase initialization.

::note
This step differs depending on what platform you are targeting and what framework you are using. Again, in this case we will see how to configure a Javascript Firebase plugin.
::

In Javascript, when you initialize the Firebase app, simply change the `authDomain` key to your new custom domain:

```ts [firebase.ts]
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "auth.depthlog.net", // <- Insert your custom auth domain here
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};

const app = initializeApp(firebaseConfig);
```

Now you have everything configured, you can test your custom domain by attempting to access using the Google provider.

Cheers!

::callout{icon="logos:youtube-icon" to="https://youtu.be/BSuBX_mt2aw" target="_blank"}
If you want to learn how to build a **fullstack** web app in Nuxt using Firebase as backend, check out the complete tutorial on my YouTube channel! 
::


::card-group
::card{icon="mdi:github" title="Free Nuxt 4 template" to="https://github.com/tratteo/nuxt_template" target="_blank" }
A dashboard with multi-column layout.
::

::card{icon="logos:youtube-icon" title="YouTube Tutorials" to="https://www.youtube.com/@matteo-beltrame" target="_blank" color="error" variant="solid"}
I post cool stuff and tutorials on my YouTube channel!
::

::
