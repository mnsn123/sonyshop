---
layout: none
---

      if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("An active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("./firebase-messaging-sw.js", {
        scope: "{{ site.url }}/"
      })
      .then(function (reg) {
        console.log("Service worker has been registered for scope: " + reg.scope);
          
          
           var config = {
    apiKey: "AIzaSyC2ZB7VvoUiRdUvnOSPfzP6DPqxejMiw4c",
  authDomain: "news-pushalert.firebaseapp.com",
  databaseURL: "https://news-pushalert.firebaseio.com",
  projectId: "news-pushalert",
  storageBucket: "news-pushalert.appspot.com",
  messagingSenderId: "348845039541"
  };
  firebase.initializeApp(config);
          
          const messaging = firebase.messaging();
          messaging.useServiceWorker(reg);

messaging.requestPermission()
    .then(function() {
        return messaging.getToken();
    })
    .then(function(token) {
        // send rest call to add to database
        $.ajax('https://news-pushalert.firebaseio.com/pushtokens/'+token+'.json', {
            method: 'PUT',
            data: 'true',
            error: function(err) {
            }
        });
    })
    .catch(function(err) {
        console.log('Permission denied' + err);
    });

          
      });
  }
}
