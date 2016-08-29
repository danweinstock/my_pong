  window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
// console.log("First context returns " + context);
// centreX and centreY are the initial coordinates of the ball
// wrt the centre of the ball.
var myPongBall = {
centreX: (canvas.width / 2),
centreY: (canvas.height  / 2),
ballRadius:10,
borderWidth: 2
};

var scores = {playerOneScore: 0, playerTwoScore: 0}
  function drawScore(context){
    context.fillStyle= 'red';
    context.font = "20px Arial"
    context.fillText('Score: '+scores.playerOneScore, canvas.width*1/4, 30);
    context.fillText('Score: '+scores.playerTwoScore, canvas.width*3/4, 30);
  }
function drawPongBall(myPongBall, context) {
  context.beginPath();
  context.arc(myPongBall.centreX, myPongBall.centreY,myPongBall.ballRadius, 0, 2 * Math.PI, false);
  context.fillStyle = '#8ED6FF';
function drawCourtEdge(context){
  context.beginPath();
  context.strokeStyle = 'green';
  context.strokeRect(0,0,canvas.width,canvas.height);
}
context.fill();
context.lineWidth = myPongBall.borderWidth;
context.strokeStyle = 'black';
context.stroke();
}

drawPongBall(myPongBall, context);

var directionX = 1; // 1 is positive (to the right), -1 is to the left
var directionY = 1;
var speedX = 5; // set the ball's initial speed
var speedY = 6;
var pongBallX = myPongBall.centreX; // set the ball's initial x position;
var pongBallY = myPongBall.centreY; // set the ball's initial y position;



function checkIfBallHitsLeftOrRightEdge(currentX,currentY){

  var rightEdge = canvas.width;
  var leftEdge = 0;
// console.log("the currentX of target is " + currentX);
// console.log("the currentY of target is " + currentY);

// add compensation for pong ball's radius
  if (directionX==1){
    currentX = currentX + myPongBall.ballRadius;
  }else{
    currentX = currentX - myPongBall.ballRadius;
  }


  var ballHitsRightEdge = (currentX>=rightEdge)?true:false;
  var ballHitsLeftEdge = (currentX<=leftEdge)?true:false;

  if(ballHitsLeftEdge || ballHitsRightEdge){
    // console.log("collision detected");
    directionX = -directionX;
  }
  if(ballHitsRightEdge){
    scores.playerOneScore++;
  }
  if(ballHitsLeftEdge){
    scores.playerTwoScore++;
  }

}

function checkIfBallHitsTopOrBottomEdge (currentX, currentY) {
  var bottomEdge = canvas.height;
  var topEdge = 0;
  var ballHitsTopEdge = (currentY<=topEdge)?true:false
  var ballHitsBottomEdge = (currentY>=bottomEdge)?true:false

  if(ballHitsTopEdge || ballHitsBottomEdge){
    directionY = -directionY;
  }
}