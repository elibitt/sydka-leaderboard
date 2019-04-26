var config = {
    apiKey: "AIzaSyBeSICfxHQthPIl8RH7R3ZFUxUe1Q7rIJY",
    authDomain: "sydka-leaderboard.firebaseapp.com",
    databaseURL: "https://sydka-leaderboard.firebaseio.com",
    projectId: "sydka-leaderboard",
    storageBucket: "sydka-leaderboard.appspot.com",
    messagingSenderId: "61957478509"
  };
firebase.initializeApp(config);

var database = firebase.database();


function writeUserData(username, points) {
  firebase.database().ref('users/' + username).set({
    points: points
  });
}

function readUserPoints(username) {
  console.log( firebase.database().ref('/users/' + username).once('value') );

}
