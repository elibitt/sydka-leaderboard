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
    points: parseInt(points)
  });
}

function readUserPoints(username) {
  var retString = "";
  var scoreRef = database.ref('users/').orderByChild("points").limitToFirst(5);
  scoreRef.once('child_added', function(snapshot) {
    retString += JSON.stringify(snapshot.val());
    console.log(snapshot.val());
    
  });
  document.getElementById("leaderboard").innerHTML = retString;

}
