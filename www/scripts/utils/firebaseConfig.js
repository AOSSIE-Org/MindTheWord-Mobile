import { firebase } from 'firebase';
var config = {
                apiKey: "AIzaSyDMX_jOW-Yfu6R48j_A6ISwVtc0d2gB7qo",
                authDomain: "mindtheword-16735.firebaseapp.com",
                databaseURL: "https://mindtheword-16735.firebaseio.com",
                projectId: "mindtheword-16735",
                storageBucket: "mindtheword-16735.appspot.com",
                messagingSenderId: "23095186114"
              };

firebase.initializeApp(config);
export var FirebaseApp = firebase.database();