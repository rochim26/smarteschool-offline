// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// console.log("service worker registered");

importScripts("https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.3/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAeIMzWUV3w1A39AZcV8NxICLlUh5SJLj4",
  authDomain: "smart-school-300211.firebaseapp.com",
  projectId: "smart-school-300211",
  storageBucket: "smart-school-300211.appspot.com",
  messagingSenderId: "429403777394",
  appId: "1:429403777394:web:de06e0f5e50868a38d95eb",
  measurementId: "G-V07WNQQYZQ",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// messaging.setBackgroundMessageHandler(function (payload) {
//   console.log(payload);
//   const notification = JSON.parse(payload);
//   const notificationOption = {
//     body: notification.body,
//     icon: notification.icon,
//   };
//   return self.registration.showNotification(
//     payload.notification.title,
//     notificationOption
//   );
// });
firebase.messaging();

//background notifications will be received here
firebase.messaging().setBackgroundMessageHandler((payload) => {
  console.log("received notif" + payload);
  const { title, body } = JSON.parse(payload.data.notification);
  const { url } = JSON.parse(payload.data.data);
  var options = {
    body,
    // icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Video-Game-Controller-Icon-IDV-green.svg/249px-Video-Game-Controller-Icon-IDV-green.svg.png",
    data: {
      url: url,
    },
  };
  registration.showNotification(title, options);
});

// self.addEventListener("notificationclick", (e) => {});
