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

if (urlParams.has('remove')){
  var un = urlParams.get('username');
  var unRef = database.ref('users/'+un);
  unRef.remove();

}

if (urlParams.has('clear')){
  var unRef = database.ref('users/');
  unRef.remove();

}

function writeUserData(username, points) {
  database.ref('users/' + username).set({
    points: parseInt(points)
  });
}
function getLeaderboard(){
  //Get data
  console.log("running");
  var champs = [];
  var scoreRef = database.ref('users/').orderByChild("points").limitToLast(5);
  console.log(scoreRef);
  return scoreRef.once('value', function(snapshot) {
    snapshot.forEach(child => {
        champs.unshift(child.key+": "+child.val().points);
    });
    console.log(champs);
    //document.getElementById("leaderboard").innerHTML = champs.join(", ");
    var para = document.createElement('p');
    para.appendChild(document.createTextNode(champs.join(", ")));
    var element = document.getElementById("lb");
    element.appendChild(para);
    setTimeout(function(){
    console.log("done");
    }, 1000);

  }, function(error) {
  // The callback failed.
  console.error(error);
  });
  
}


