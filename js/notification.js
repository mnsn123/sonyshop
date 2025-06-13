// Initialize Firebase - https://firebase.google.com/docs/web/setup

/*
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
messaging.requestPermission()
    .then(function() {
        return messaging.getToken();
    })
    .then(function(token) {
       
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
*/
