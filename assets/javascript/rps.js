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

var globalDoesExist;
var playerOne = "";
var playerTwo;
var winsOne = 0;
var winsTwo = 0;
var lossesOne = 0;
var lossesTwo = 0;
var turnCount = 1;
var turnOf;
var playerOneDecision;
var playerTwoDecision;
var playerOneName;
var playerTwoName;

//*** defining functions below ***


function makePokemonInvisible() {
    $(".all-pokemon").css("visibility", "hidden");
    $(".both-scoreboards").css("visibility", "hidden");
}

function makePokemonVisible() {
    $(".all-pokemon").css("visibility", "visible");
    $(".both-scoreboards").css("visibility", "visible");
}

function turnIsPlayerOne() {
    $("#player1-text-bar").text("Player 1: " + playerOneName + "'s turn");
    $(".player-one-box").css("border-width", "5px");
    $(".player-one-box").css("border-color", "red");
    $(".player-one-box").css("border-style", "groove");

    $("#player2-text-bar").text("Player 2: " + playerTwoName);
    $(".player-two-box").css("border-width", "");
    $(".player-two-box").css("border-color", "");
    $(".player-two-box").css("border-style", "");

    turnOf = "turnOfPlayerOne";
    console.log("Whose turn is it: " +turnOf);
}

function turnIsPlayerTwo() {
    $("#player2-text-bar").text("Player 2: " + playerTwo + "'s turn");
    $(".player-two-box").css("border-width", "5px");
    $(".player-two-box").css("border-color", "red");
    $(".player-two-box").css("border-style", "groove");

    $("#player1-text-bar").text("Player 1: " + playerOne);
    $(".player-one-box").css("border-width", "");
    $(".player-one-box").css("border-color", "");
    $(".player-one-box").css("border-style", "");

    turnOf = "turnOfPlayerTwo";
    console.log("Whose turn is it: " +turnOf);
}

function addAttrToPokemon() {
    $("#player-one-rock").attr("data-team", "playerOne");
    $("#player-one-paper").attr("data-team", "playerOne");
    $("#player-one-scissor").attr("data-team", "playerOne");

    $("#player-one-rock").attr("data-type", "rock");
    $("#player-one-paper").attr("data-type", "paper");
    $("#player-one-scissor").attr("data-type", "scissors");

    $("#player-two-rock").attr("data-team", "playerTwo");
    $("#player-two-paper").attr("data-team", "playerTwo");
    $("#player-two-scissor").attr("data-team", "playerTwo");

    $("#player-two-rock").attr("data-type", "rock");
    $("#player-two-paper").attr("data-type", "paper");
    $("#player-two-scissor").attr("data-type", "scissors");

}


//this is the function for submitting the names of player 1 and player 2 
function designatePlayers() {
    event.preventDefault;
    console.log($("Input is " + "#player-input").val());
    console.log("Before designation: " + playerOne);

    var ref = firebase.database().ref("players/1");
    ref.once("value").then(function (snapshot) {
        var doesExist = snapshot.exists();
        console.log("Player 1 exists: " + doesExist);
        if (doesExist === false) {
            globalDoesExist = "false";
        } else {
            globalDoesExist = "true";
        } console.log("Global Does Exist: " + globalDoesExist);

        if (globalDoesExist == "false") {
            playerOne = $("#player-input").val();
            console.log("After submit, Player One is " + playerOne)
            // $("#player1-text-bar").text("Player 1: " + playerOne + " has entered the stadium!");
             playerOne = $("#player-input").val();
             database.ref("players/1").set({
                player: playerOne,
                wins: winsOne,
                losses: lossesOne,
            })
        } else {
            playerTwo = $("#player-input").val();
            // $("#player2-text-bar").text("Player 2: " + playerTwo + " has entered the stadium!");
            database.ref("players/2").set({
                player: playerTwo,
                wins: winsTwo,
                losses: lossesTwo,
            });
            database.ref("turn-counter").set({
                turn: turnCount
            });
    
        }
    });
    
}
//Start writing into the database for real-time changes
database.ref("players/1").on("value", function(snapshot) {
    console.log(snapshot.val());
    playerOneName = snapshot.val().player;
    $("#player1-text-bar").text("Player 1: " + playerOneName + " has entered the stadium!");
});

database.ref("players/2").on("value", function(snapshot) {
    console.log(snapshot.val());
    playerTwoName = snapshot.val().player;
    $("#player2-text-bar").text("Player 2: " + playerTwoName + " has entered the stadium!");
    makePokemonVisible();
    setInterval(turnIsPlayerOne, 3000);
    console.log("Player Two is " + playerTwo);
    console.log("Turn count is " + turnCount);
});



// function clickingPokemon() {
//     if (turnOf === "turnOfPlayerOne") {
//         if ($(this).attr("data-team") === "playerOne") {
//             var choiceStatement = "<p>Player 1 chose"
//             console.log(this);
//             console.log("The team this is on: " + $(this).attr("data-team"));
//             console.log("The type: " + $(this).attr("data-type"));
//             $(this).prepend(choiceStatement);
//             $("#player-one-choice").append(this);
//             playerOneDecision = $(this).attr("data-type");
//             turnIsPlayerTwo();
//         } 
//     } else if (turnOf === "turnOfPlayerTwo") {
//         if ($(this).attr("data-team") === "playerTwo") {
//             var choiceStatement = "<p>Player 2 chose"
//             console.log(this);
//             console.log("The team this is on: " + $(this).attr("data-team"));
//             console.log("The type: " + $(this).attr("data-type"));
//             $(this).prepend(choiceStatement);
//             $("#player-two-choice").append(this);
//             playerTwoDecision = $(this).attr("data-type");
//         }
//     }
// }






//start of function initiation
$(document).ready(function() {

    makePokemonInvisible();
    addAttrToPokemon();

    $(".all-pokemon").click(function () {
        if (turnOf === "turnOfPlayerOne") {
            if ($(this).attr("data-team") === "playerOne") {
                var choiceStatement = "<p>Player 1 chose"
                console.log(this);
                console.log("The team this is on: " + $(this).attr("data-team"));
                console.log("The type: " + $(this).attr("data-type"));
                $(this).prepend(choiceStatement);
                $("#player-one-choice").append(this);
                playerOneDecision = $(this).attr("data-type");
                turnIsPlayerTwo();
            } 
        } else if (turnOf === "turnOfPlayerTwo") {
            if ($(this).attr("data-team") === "playerTwo") {
                var choiceStatement = "<p>Player 2 chose"
                console.log(this);
                console.log("The team this is on: " + $(this).attr("data-team"));
                console.log("The type: " + $(this).attr("data-type"));
                $(this).prepend(choiceStatement);
                $("#player-two-choice").append(this);
                playerTwoDecision = $(this).attr("data-type");
            }
        }
        console.log("Player 1's Decision: " + playerOneDecision);
        console.log("Player 2's Decision: " + playerTwoDecision);
    }); 

   $("#add-player").click(function() {
       designatePlayers();
    });


});
