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





//start of function initiation
$(document).ready(function() {
   $(".all-pokemon").click(function() {
       var choiceStatement = "<p>Player Two chose"
       console.log(this);
       $(this).prepend(choiceStatement);
       $("#player-two-choice").append(this);
   }); 

   $("#add-player").click(function() {
       event.preventDefault;
       console.log($("#player-input").val());
   });
});