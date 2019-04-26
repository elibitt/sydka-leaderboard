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

var urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('update')){
  var un = urlParams.get('username');
  var newPoints = urlParams.get('points');
  writeUserData(un, newPoints);
}

function writeUserData(username, points) {
  database.ref('users/' + username).set({
    points: parseInt(points)
  });
}

function readUserPoints(username) {
  var champs = [];
  var scoreRef = database.ref('users/').orderByChild("points").limitToLast(5);
  scoreRef.on('value', function(snapshot) {
    snapshot.forEach(child => {
        champs.unshift(child.key+": "+child.val().points);
    });
  });
  document.getElementById("leaderboard").innerHTML = champs.join(", ");

}
