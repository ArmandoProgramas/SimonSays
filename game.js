var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;


$(document).keypress(function(){
if(!started){
$(".title-text").text("Level " + level);
nextSequence();
started = true;
}

});



$(".btn").click(function (event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var buttonAudio = new Audio("sounds/" + name + ".mp3");
    buttonAudio.play();
}

function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber =  Math.floor(Math.random() * 4 );

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //Flash Animation for button in the sequence
    
    playSound(randomChosenColor);


}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();        
            }, 1000)
         }
    } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, press any key to restart");
            
            setTimeout(function(){
                $("body").removeClass("game-over");

            }, 200);
            startOver();
        }
    }

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;

}