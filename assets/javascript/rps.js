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

var playerOne;
var player1Exists;
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
var playerOneLosses;
var playerOneWins;
var playerTwoLosses;
var playerTwoWins;
var globalPlayerStatus = "";
var matchWinner;
var tiesOne = 0;
var tiesTwo = 0;
var playerOneTies = 0;
var playerTwoTies = 0;

//*** defining functions below ***

function makeScoresInvisble() {
    $(".both-scoreboards").css("visibility", "hidden");   
}
function makePokemonInvisible() {
    $(".all-pokemon").css("visibility", "hidden");
}

function makePokemon1Visible() {
    $("#player-one-rock").css("visibility", "visible");
    $("#player-one-paper").css("visibility", "visible");
    $("#player-one-scissor").css("visibility", "visible");
}

function makePokemon2Visible() {
    $("#player-two-rock").css("visibility", "visible");
    $("#player-two-paper").css("visibility", "visible");
    $("#player-two-scissor").css("visibility", "visible");
}

function putPokemonBack() {
    makePokemonInvisible();
    $("#player-one-pokemon").append($("#player-one-rock"));
    $("#player-one-pokemon").append($("#player-one-paper"));
    $("#player-one-pokemon").append($("#player-one-scissor"));

    $("#player-two-pokemon").append($("#player-two-rock"));
    $("#player-two-pokemon").append($("#player-two-paper"));
    $("#player-two-pokemon").append($("#player-two-scissor"));
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

    if (globalPlayerStatus == "Player-1") {
        makePokemon1Visible();
    }
}

function turnIsPlayerTwo() {
    
    $("#player2-text-bar").text("Player 2: " + playerTwoName + "'s turn");
    $(".player-two-box").css("border-width", "5px");
    $(".player-two-box").css("border-color", "red");
    $(".player-two-box").css("border-style", "groove");

    $("#player1-text-bar").text("Player 1: " + playerOneName);
    $(".player-one-box").css("border-width", "");
    $(".player-one-box").css("border-color", "");
    $(".player-one-box").css("border-style", "");

    turnOf = "turnOfPlayerTwo";
    console.log("Whose turn is it: " +turnOf);

    if (globalPlayerStatus == "Player-2") {
        makePokemon2Visible();
    }
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

function calculateWinner() {
    if (playerOneDecision == "rock" && playerTwoDecision == "rock") {
        console.log("Winner is: It's a tie.");
        increaseTurns();
        tieMatch();
    } else if (playerOneDecision == "rock" && playerTwoDecision == "paper") {
        console.log("Winner is Player 2");
        increaseTurns();
        player2Wins();
    } else if (playerOneDecision == "rock" && playerTwoDecision == "scissors") {
        console.log("Winner is Player 1");
        increaseTurns();
        player1Wins();
    } else if (playerOneDecision == "paper" && playerTwoDecision == "rock") {
        console.log("Winner is Player 1");
        increaseTurns();
        player1Wins();
    } else if (playerOneDecision == "paper" && playerTwoDecision == "paper") {
        console.log("Winner is: It's a tie!");
        increaseTurns();
        tieMatch();
    } else if (playerOneDecision == "paper" && playerTwoDecision == "scissors") {
        console.log("Winner is Player 2");
        increaseTurns();
        player2Wins();
    } else if (playerOneDecision == "scissors" && playerTwoDecision == "rock") {
        console.log("Winner is Player 2");
        increaseTurns();
        player2Wins();
    } else if (playerOneDecision == "scissors" && playerTwoDecision == "paper") {
        console.log("Winner is Player 1");
        increaseTurns();
        player1Wins();
    } else if (playerOneDecision == "scissors" && playerTwoDecision == "scissors") {
        console.log("Winner is: It's a tie!");
        increaseTurns();
        tieMatch();
    }
}

function player1Wins() {
    matchWinner = "player1";
    playerOneWins++;
    playerTwoLosses++;
    database.ref("players/1").set({
        player: playerOneName,
        wins: playerOneWins,
        losses: playerOneLosses,
        ties: playerOneTies,
    });
    database.ref("players/2").set({
        player: playerTwoName,
        wins: playerTwoWins,
        losses: playerTwoLosses,
        ties: playerTwoTies,
    });
}

function player2Wins() {
    matchWinner = "player2";
    playerTwoWins++;
    playerOneLosses++;
    database.ref("players/1").set({
        player: playerOneName,
        wins: playerOneWins,
        losses: playerOneLosses,  
        ties: playerOneTies,
    });
    database.ref("players/2").set({
        player: playerTwoName,
        wins: playerTwoWins,
        losses: playerTwoLosses,
        ties: playerTwoTies,
    });
}

function tieMatch() {
    matchWinner = "tie";
    playerOneTies++;
    playerTwoTies++;
    database.ref("players/1").set({
        player: playerOneName,
        wins: playerOneWins,
        losses: playerOneLosses,
        ties: playerOneTies,
    });
    database.ref("players/2").set({
        player: playerTwoName,
        wins: playerTwoWins,
        losses: playerTwoLosses,
        ties: playerTwoTies,
    });
}


function increaseTurns() {
    turnCount++;
    database.ref("turn-counter").set({
        turn: turnCount
    });
}

//this is the function for submitting the names of player 1 and player 2 
function designatePlayers() {
    event.preventDefault();
    console.log($("Input is " + "#player-input").val());
    console.log("Before designation: " + playerOne);

    var ref = firebase.database().ref("players/1");
    ref.once("value").then(function (snapshot) {
        var doesPlayer1Exist = snapshot.exists();
        console.log("Player 1 exists: " + doesPlayer1Exist);
        if (doesPlayer1Exist === false) {
            player1Exists = "false";
        } else {
            player1Exists = "true";
        } console.log("Does Exist: " + player1Exists);

        if (player1Exists == "false") {
            playerOne = $("#player-input").val();
            console.log("After submit, Player One is " + playerOne)
             playerOne = $("#player-input").val();
             globalPlayerStatus = "Player-1";
             console.log("My global player status is: " + globalPlayerStatus);
             database.ref("players/1").set({
                player: playerOne,
                wins: winsOne,
                losses: lossesOne,
                ties: tiesOne,
            })

        } else {
            playerTwo = $("#player-input").val();
            globalPlayerStatus = "Player-2";
            console.log("My global player status is: " + globalPlayerStatus);
            database.ref("players/2").set({
                player: playerTwo,
                wins: winsTwo,
                losses: lossesTwo,
                ties: tiesTwo,
            });
            database.ref("turn-counter").set({
                turn: turnCount
            });
    
        }
        // var playerRef = firebase.database().ref("players/1");
        // var key1 = playerRef.key;
        // key = playerRef.child("player")
        // console.log("Key1 is: " + key1);
        // console.log("Key is: " + key);
        // playerRef.once("value").then(function (snapshot) {
        //     console.log(snapshot.val());
        // });

    });
    
}





//Start writing into the database for real-time changes

database.ref("turn-counter").on("value", function(snapshot) {
    turnCount = snapshot.val().turn
});


database.ref("players/1").on("value", function(snapshot) {
    matchWinner = matchWinner;
    playerOneDecision = playerOneDecision;
    console.log(snapshot.val());
    playerOneName = snapshot.val().player;
    playerOneWins = snapshot.val().wins;
    playerOneLosses = snapshot.val().losses;
    playerOneTies = snapshot.val().ties;
    console.log(turnCount);
    if (turnCount == 1) {
        $("#player1-text-bar").text("Player 1: " + playerOneName + " has entered the stadium!");
    } else if (turnCount > 1 && matchWinner == "player1") {
        $("#player1-text-bar").text("Player 1: " + playerOneName + " has won!");
        $("#player2-text-bar").text("Player 1: " + playerTwoName + " has lost!");
    } else if (turnCount > 1 && matchWinner == "player2") {
        $("#player1-text-bar").text("Player 1: " + playerOneName + " has lost!");
        $("#player2-text-bar").text("Player 1: " + playerTwoName + " has won!");
    } else if (turnCount > 1 && matchWinner == "tie") {
        $("#player1-text-bar").text("Player 1: " + playerOneName + " has tied!");
        $("#player2-text-bar").text("Player 1: " + playerTwoName + " has tied!");
    }
    if (playerOneDecision == "rock") {
        $("#player-one-rock").css("visibility", "visible");
    } else if (playerOneDecision == "paper") {
        $("#player-one-paper").css("visibility", "visible");
    } else if (playerOneDecision == "scissors") {
        $("#player-one-scissor").css("visibility", "visible");
    }

    $("#player-one-score").css("visibility", "visible");
    $("#player-one-wins").text("Wins: " + playerOneWins);
    $("#player-one-losses").text("Losses: " + playerOneLosses);
});

database.ref("players/2").on("value", function(snapshot) {
    matchWinner = matchWinner;
    console.log(snapshot.val());
    playerTwoName = snapshot.val().player;
    playerTwoWins = snapshot.val().wins;
    playerTwoLosses = snapshot.val().losses;
    playerTwoTies = snapshot.val().ties;
    if (turnCount == 1) {
        $("#player2-text-bar").text("Player 2: " + playerTwoName + " has entered the stadium!");
        setTimeout(turnIsPlayerOne, 3000);
    }
    $("#player-two-score").css("visibility", "visible");
    $("#player-two-wins").text("Wins: " + playerTwoWins);
    $("#player-two-losses").text("Losses: " + playerTwoLosses);
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
    makeScoresInvisble();
    addAttrToPokemon();
    
    $(".all-pokemon").click(function () {
        if (globalPlayerStatus == "Player-1") {
            if ($(this).attr("data-team") === "playerOne") {
                playerOneDecision = $(this).attr("data-type");
                database.ref("player1Choice").set({
                    decision: playerOneDecision
                });
            }
        } else if (globalPlayerStatus == "Player-2") {
                if ($(this).attr("data-team") === "playerTwo") {
                    playerTwoDecision = $(this).attr("data-type");
                    database.ref("player2Choice").set({
                        decision: playerTwoDecision
                });
            }
        }
    }); 

            database.ref("player1Choice").on("value", function (snapshot) {
                console.log(snapshot.val());
                playerOneDecision = snapshot.val().decision;
                if (playerOneDecision == "rock") {
                    var choiceStatement = "<p>Player 1 chose";
                    $("#player-one-rock").prepend(choiceStatement);
                    $("#player-one-choice").append($("#player-one-rock"));
                    // $("#player-one-rock").css("visibility", "visible");
                    setTimeout(turnIsPlayerTwo, 3000);
                } else if (playerOneDecision == "paper") {
                    var choiceStatement = "<p>Player 1 chose";
                    $("#player-one-paper").prepend(choiceStatement);
                    $("#player-one-choice").append($("#player-one-paper"));
                    // $("#player-one-paper").css("visibility", "visible");
                    setTimeout(turnIsPlayerTwo, 3000);
                } else if (playerOneDecision == "scissors") {
                    var choiceStatement = "<p>Player 1 chose";
                    $("#player-one-scissor").prepend(choiceStatement);
                    $("#player-one-choice").append($("#player-one-scissor"));
                    // $("#player-one-scissor").css("visibility", "visible");
                    setTimeout(turnIsPlayerTwo, 3000);
                }
                console.log("Player 1's Decision: " + playerOneDecision);
                console.log("Player 2's Decision: " + playerTwoDecision);
            });

            database.ref("player2Choice").on("value", function (snapshot) {
                console.log(snapshot.val());
                playerTwoDecision = snapshot.val().decision;
                if (playerTwoDecision == "rock") {
                    var choiceStatement = "<p>Player 2 chose";
                    $("#player-two-rock").prepend(choiceStatement);
                    $("#player-two-choice").append($("#player-two-rock"));
                    $("#player-two-rock").css("visibility", "visible");
                    setTimeout(calculateWinner, 1500);
                    setTimeout(putPokemonBack, 2000);
                    setTimeout(turnIsPlayerOne, 2000);
                } else if (playerTwoDecision == "paper") {
                    var choiceStatement = "<p>Player 2 chose";
                    $("#player-two-paper").prepend(choiceStatement);
                    $("#player-two-choice").append($("#player-two-paper"));
                    $("#player-two-paper").css("visibility", "visible");
                    setTimeout(calculateWinner, 1500);
                    setTimeout(putPokemonBack, 2000);
                    setTimeout(turnIsPlayerOne, 2000);
                } else if (playerTwoDecision == "scissors") {
                    var choiceStatement = "<p>Player 2 chose";
                    $("#player-two-scissor").prepend(choiceStatement);
                    $("#player-two-choice").append($("#player-two-scissor"));
                    $("#player-two-scissor").css("visibility", "visible");
                    setTimeout(calculateWinner, 1500);
                    setTimeout(putPokemonBack, 2000);
                    setTimeout(turnIsPlayerOne, 2000);
                }
                console.log("Player 1's Decision: " + playerOneDecision);
                console.log("Player 2's Decision: " + playerTwoDecision);
            });

            $("#add-player").click(function() {
                designatePlayers();
             });

             $("#chatboxBtn").click(function() {
                 event.preventDefault();
                 console.log("Hi");
                 var chatboxText = $("#chatboxText").val().trim();
                 console.log("The new line is: " + chatboxText);
                 database.ref("chat").push({
                    line: chatboxText,
                 });
             });

             database.ref("chat").on("child_added", function(snapshot) {
                console.log(snapshot.val());
                var line = snapshot.val().line;
                var br = $("<br>");
                console.log("Line to be printed: " + line);
                if (globalPlayerStatus == "") {
                    $(".chatlog").append("Unknown Player: " + line);
                    $(".chatlog").append(br);
                } else if (globalPlayerStatus == "Player-1") {
                    $(".chatlog").append(playerOneName + ": " + line);
                    $(".chatlog").append(br);
                } else if (globalPlayerStatus == "Player-2") {
                    $(".chatlog").append(playerTwoName + ": " + line);
                    $(".chatlog").append(br);
                }
             });



});
            
        