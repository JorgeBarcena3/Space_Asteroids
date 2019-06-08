var shoot = new Audio("./assets/laser_shoot.mp3");
var LifePwup = new Audio("./assets/LifePwup.mp3");
var SpeedPwup = new Audio("./assets/speedPwup.mp3");
var ShootPwup = new Audio("./assets/speedPwup.mp3");
var backgroundMusic = $("#backgroundAudio")[0];

$( document ).ready(function() {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.25;
    var prmise = backgroundMusic.play();
    
});


