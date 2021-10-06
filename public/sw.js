// var CACHE = "smartschool";
// var urlsToCache = [
//   "/",
//   "/smartschool",
//   "/smartschool/login",
//   "/smartschool/login/siswa",
//   "/smartschool/login/kepsek",
//   "/smartschool/login/guru",
//   "/smartschool/login/admin",
// ];

// console.log("installing worker");

// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     caches.open(CACHE).then(function (cache) {
//       console.log("opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then((response) => {
//       if (response) {
//         console.log("pulling from cached request");
//         return response;
//       }
//       return fetch(e.request).then((response) => {
//         const content = response.headers.get("content-type");
//         if (
//           !response ||
//           response.status !== 200 ||
//           response.type !== "basic" ||
//           (content.indexOf("image") < 0 && content.indexOf("text") < 0)
//         ) {
//           return response;
//         }

//         var responseToCache = response.clone();

//         caches.open(CACHE).then((cache) => {
//           cache.put(e.request, responseToCache);
//         });

//         return response;
//       });
//     })
//   );
// });

// self.addEventListener("activate", (e) => {
//   var cacheAllowed = ["smartschool"];

//   e.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheAllowed.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
