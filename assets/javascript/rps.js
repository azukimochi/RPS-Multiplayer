//*** defining global scope variables ***
var config = {
    apiKey: "AIzaSyCW4ZQjx5hD-Yfa3vxwJJd8cQf6SEO-FQo",
    authDomain: "multi-player-rps-20094.firebaseapp.com",
    databaseURL: "https://multi-player-rps-20094.firebaseio.com",
    projectId: "multi-player-rps-20094",
    storageBucket: "multi-player-rps-20094.appspot.com",
    messagingSenderId: "456723330628"
};
firebase.initializeApp(config);

var database = firebase.database();
// var chatBranch = firebase.database("chat"); <-delete if not needed
// var playersBranch = firebase.database().ref("players"); <-delete if not needed
// var playerOneBranch = firebase.database().ref("players/1"); <-delete if not needed
// var playerTwoBranch = firebase.database().ref("players/2"); <-delete if not needed

var playerOne = "";
var playerTwo;
var winsOne = 0;
var winsTwo = 0;
var lossesOne = 0;
var lossesTwo = 0;
var turn = 1;

//*** defining functions below ***

//this is the function for submitting the names of player 1 and player 2 
function designatePlayers() {
    event.preventDefault;
    console.log($("Input is " + "#player-input").val());
    console.log("Before designation: " + playerOne);
    if (playerOne === "") {
        playerOne = $("#player-input").val();
        console.log("After submit, Player One is " + playerOne)
         playerOne = $("#player-input").val();
         database.ref("players/1").set({
            player: playerOne,
            wins: winsOne,
            losses: lossesOne,
        })
     } else {
         playerTwo = $("#player-input").val();
         database.ref("players/2").set({
            player: playerTwo,
            wins: winsTwo,
            losses: lossesTwo,
         });
         database.ref("turn").set({
            turn: turn
         });
     } console.log("Player Two is " + playerTwo);
        console.log("Turn count is " + turn);
}

//start of function initiation
$(document).ready(function() {
   $(".all-pokemon").click(function() {
       var choiceStatement = "<p>Player Two chose"
       console.log(this);
       $(this).prepend(choiceStatement);
       $("#player-two-choice").append(this);
   }); 

   $("#add-player").click(function() {
       designatePlayers();
    });


    // database.ref("players/1").on("value", function(snapshot) {
    //     console.log(snapshot.val());
    //     // highPrice = snapshot.val().highPrice; 
    //     // highBidder = snapshot.val().highBidder;
    // });

});
