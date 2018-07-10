//*** defining global scope variables ***
var config = {
    apiKey: "AIzaSyA6F9Aoe8cv-wSAeO93hu0NrWuBwvVmtK4",
    authDomain: "rps-multiplayer-d3991.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-d3991.firebaseio.com",
    projectId: "rps-multiplayer-d3991",
    storageBucket: "rps-multiplayer-d3991.appspot.com",
    messagingSenderId: "727507908434"
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
var refDelete;
var gameOverCount = 0;

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
    setTimeout(putPokemonBack, 2000);
    setTimeout(turnIsPlayerOne, 2000);
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
    setTimeout(putPokemonBack, 2000);
    setTimeout(turnIsPlayerOne, 2000);
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
    setTimeout(putPokemonBack, 2000);
    setTimeout(turnIsPlayerOne, 2000);
}


function increaseTurns() {
    turnCount++;
    console.log("The current turn count is: " + turnCount);
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
    });
    
}





//Start writing into the database for real-time changes

database.ref("turn-counter").on("value", function(snapshot) {
    turnCount = snapshot.val().turn;
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
        $("#player2-text-bar").text("Player 2: " + playerTwoName + " has lost!");
    } else if (turnCount > 1 && matchWinner == "player2") {
        $("#player1-text-bar").text("Player 1: " + playerOneName + " has lost!");
        $("#player2-text-bar").text("Player 2: " + playerTwoName + " has won!");
    } else if (turnCount > 1 && matchWinner == "tie") {
        $("#player1-text-bar").text("Player 1: " + playerOneName + " has tied!");
        $("#player2-text-bar").text("Player 2: " + playerTwoName + " has tied!");
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

function testFunction() {
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
            console.log("Game has ended");
            database.ref("chat").push({
                line: "The other player isn't online. Refresh the page to enter a new match if you were in the middle of a match.",
                sender: "WARNING",
            });
        }
    });
}

// database.ref("GameOver").on("value", function(snapshot) {
// //     var refreshCount = snapshot.val().gameOver;
// //     console.log("The refresh count is:" + refreshCount);
// //     console.log("Game over. Sucker2");
// //     $(".chatlog").append("Gameover");
// //     database.ref("GameOver").push ({
// //         line: "The other player is no longer connected.  Re-add yourself to join a new game.",
// //         sender: "WARNING"
// //     });
// // });

database.ref("players/2").on("value", function(snapshot) {
    matchWinner = matchWinner;
    console.log(snapshot.val());
    playerTwoName = snapshot.val().player;
    playerTwoWins = snapshot.val().wins;
    playerTwoLosses = snapshot.val().losses;
    playerTwoTies = snapshot.val().ties;
    if (turnCount == 1) {
        $("#player2-text-bar").text("Player 2: " + playerTwoName + " has entered the stadium!");
        setTimeout(turnIsPlayerOne, 2000);
    }
    $("#player-two-score").css("visibility", "visible");
    $("#player-two-wins").text("Wins: " + playerTwoWins);
    $("#player-two-losses").text("Losses: " + playerTwoLosses);
});




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
            $("#player1ChoiceStatement").append($("#player-one-rock"));
            // $("#player-one-rock").css("visibility", "visible");
            setTimeout(turnIsPlayerTwo, 1500);
        } else if (playerOneDecision == "paper") {
            $("#player1ChoiceStatement").append($("#player-one-paper"));
            // $("#player-one-paper").css("visibility", "visible");
            setTimeout(turnIsPlayerTwo, 1500);
        } else if (playerOneDecision == "scissors") {
            $("#player1ChoiceStatement").append($("#player-one-scissor"));
            // $("#player-one-scissor").css("visibility", "visible");
            setTimeout(turnIsPlayerTwo, 1500);
        }
        console.log("Player 1's Decision: " + playerOneDecision);
        console.log("Player 2's Decision: " + playerTwoDecision);
    });

    database.ref("player2Choice").on("value", function (snapshot) {
        console.log(snapshot.val());
        playerTwoDecision = snapshot.val().decision;
        if (playerTwoDecision == "rock") {
            $("#player2ChoiceStatement").append($("#player-two-rock"));
            $("#player-two-rock").css("visibility", "visible");
            setTimeout(calculateWinner, 1000);
            // setTimeout(putPokemonBack, 2000);
            // setTimeout(turnIsPlayerOne, 2000);
        } else if (playerTwoDecision == "paper") {
            $("#player2ChoiceStatement").append($("#player-two-paper"));
            $("#player-two-paper").css("visibility", "visible");
            setTimeout(calculateWinner, 1000);
            // setTimeout(putPokemonBack, 2000);
            // setTimeout(turnIsPlayerOne, 2000);
        } else if (playerTwoDecision == "scissors") {
            $("#player2ChoiceStatement").append($("#player-two-scissor"));
            $("#player-two-scissor").css("visibility", "visible");
            setTimeout(calculateWinner, 1000);
            // setTimeout(putPokemonBack, 2000);
            // setTimeout(turnIsPlayerOne, 2000);
        }
        console.log("Player 1's Decision: " + playerOneDecision);
        console.log("Player 2's Decision: " + playerTwoDecision);
    });

    $("#add-player").click(function () {
        designatePlayers();
    });

    $("#chatboxBtn").click(function () {
        event.preventDefault();
        var chatboxText = $("#chatboxText").val().trim();
        console.log("The new line is: " + chatboxText);
        if (globalPlayerStatus == "Player-1") {
            var chatStatus = playerOneName;
        } else if (globalPlayerStatus == "Player-2") {
            var chatStatus = playerTwoName;
        }
        database.ref("chat").push({
            line: chatboxText,
            sender: chatStatus
        });
    });

    database.ref("chat").on("child_added", function (snapshot) {
        console.log(snapshot.val());
        var line = snapshot.val().line;
        var sender = snapshot.val().sender;
        var br = $("<br>");
        console.log("Line to be printed: " + line);
        console.log("Line sent by: " + sender);
            $(".chatlog").append(sender + ": " + line);
            $(".chatlog").append(br);
    });

    // function disconnectedMsg() {
    //     $(".chatlog").append("A player has disconnected");
    // }
    

    var refDeletePlayer1 = firebase.database().ref("players/1");
    refDeletePlayer1.onDisconnect().remove();

    // var refDeleteChat = firebase.database().ref("chat");
    // refDeleteChat.onDisconnect().remove();

    var refDeleteTurn = firebase.database().ref("turn-counter");
    refDeleteTurn.onDisconnect().remove();

    var refDeletePlayer1Choice = firebase.database().ref("player1Choice");
    refDeletePlayer1Choice.onDisconnect().remove();

    var refDeletePlayer2Choice = firebase.database().ref("player2Choice");
    refDeletePlayer2Choice.onDisconnect().remove();


    var refDeletePlayer2 = firebase.database().ref("players/2");
    refDeletePlayer2.onDisconnect().remove();


   $(window).on('load', testFunction);

});


        