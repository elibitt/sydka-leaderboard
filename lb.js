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
  database.ref('users/' + username).set({
    points: points
  });
}

function readUserPoints(username) {

  var result = database.ref('users/').orderByChild("points").limitToFirst(5);
  document.getElementById("leaderboard").innerHTML = result;

}
