console.log($("h1"))
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern= []




function  playsound(name){
    var audio = new Audio("/Simon Game Challenge Starting Files/sounds/"+ name + ".mp3")
    audio.play();
}


console.log($("h1"))

function nextSequence() {
    userClickedPattern = []
    console.log("Inside the next sequence");
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    // Apply the animation to the button with the corresponding color
    $("#"+randomChosenColour).fadeOut(100, function() {
        $(this).fadeIn(100);
    });
    console.log(randomChosenColour);

    playsound(randomChosenColour)  // calling the playsound function with the randomchosen color 

    level += 1
    console.log(level)  // when the next sequence fuction is call im increasing the level value 
    $("h1").text("Level "+ level) // changing the h1 to the currennt level 
} 

function animatePress(currentColor){
    console.log("now it is in the animate press funciton")
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $('#'+currentColor).removeClass("pressed");
    },100);
    console.log(currentColor)
}
// This for satarting keypress will only works single time for starting the game 
$(document).one('keypress',function(){
   nextSequence()
   console.log("It is a key press function")
   $("#level-title").text("Level 0");
  });

  var level = 0; // Here im globally created the level variable and assigned it to 0

 
  function checkAnswer(currentLevel){
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){// This if condition to check the last index comparing of colors which are gernarated by usercliked and whiare in userclikcked pattern and random generated in gamepatterns of last index means last index
        console.log("success")
        if(gamePattern[gamePattern.length]===userClickedPattern[userClickedPattern.length]){
            console.log("yes just now pressed key also correct")
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
        else{
            console.log("Now pressed key is a wrong key ")
        }
    }
    else{
        console.log("Wrong")
        playsound("wrong") // when the answer wrong playing the sound as wrong
        $("body").addClass("game-over"); // lightining the background with red that you made a mistake  and after 200msec removing the class
        $("#level-title").text("Game Over !! Press any key to Restart")

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          
          startOver()
    }

  }


//THIS IS THE FUNCTION CALLING THE NEXT SEQUNCE 
$(".btn").click(function () {
    

    var userChosenColour = $(this).attr("id"); // here userchosencolour is a varaible  is used to know the whcih button  now i pressed 
    
    userClickedPattern.push(userChosenColour)
    

    animatePress(userChosenColour) 
    
    console.log(userClickedPattern)
    checkAnswer(userClickedPattern.length-1) // passing the userclicked pattern array last index value to the check my answer function 

    // Now you can use the userChosenColour variable to work with the ID of the clicked button
    console.log("Clicked button ID: " + userChosenColour);
// Call the nextSequence function to start the game

    nextSequence();
});




function startOver(){
    level = 0;
    gamePattern = []
    started = false;
}






























