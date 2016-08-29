
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

    // adjusted height, width and borderwidth to make it look like a paddle
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var myRectangle = {
        x: 10,
        y: canvas.height/2-50,
        width: 20,
        height:100,
        borderWidth: 1
    };
    var myRectangle02 = {
        x: canvas.width-30,
        y: canvas.height/2-50,
        width: 20,
        height:100,
        borderWidth: 1
    };
  

    function movePaddle(someRectangle, canvas, context,newPosition) {
        // console.log("I am starting the animation. the newPosition is " +newPosition);
        var currentRectangleY = someRectangle.y;
        var newY = currentRectangleY + newPosition;

        someRectangle.y = newY;
        // console.log("I have set the position of the paddle to be at " +someRectangle.y);

        // erase the canvas, including the drawing of the rectangle
        context.clearRect(0, 0, canvas.width, canvas.height);
        // console.log("I have erased the canvas");

        // console.log("Now I am going to redraw BOTH RECTANGLES/paddle with its new y.");
    }

    // function that responds to keyPresses
    function onKeyDown(event){
        // event can be called e if you like
        //console.log("onKeyDown event handler is fired");

        switch (event.keyCode){
            case 65:
               // console.log("a");
                    if (myRectangle.y > 0) {
                        movePaddle(myRectangle, canvas, context, -20);
                    }
                break;
            case 90:
               // console.log("z");
                    if (myRectangle.y < canvas.height-100) {
                        movePaddle(myRectangle, canvas, context, 20);
                    }
                break;
            case 38:
               // console.log("up");
                    if(myRectangle02.y > 0) {
                        movePaddle(myRectangle02, canvas, context, -20);
                    }
                break;
            case 40:
                //console.log("down");
                    if(myRectangle02.y < canvas.height-100) {
                        movePaddle(myRectangle02, canvas, context, 20);
                    }
                break;
        }
    }
    
    // listen for keypresses
    document.addEventListener("keydown",onKeyDown);

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
  context.fillStyle = '#551A8B';
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
function animate(myPongBall, canvas, context) {
  // console.log("The animate method is refreshing the 'screen'.");
  // check if the ball hits the left or right edge
  checkIfBallHitsLeftOrRightEdge(myPongBall.centreX,myPongBall.centreY);
  // check if ball hits the bottom or top edge
  checkIfBallHitsTopOrBottomEdge(myPongBall.centreX,myPongBall.centreY);

  // set the x-coordinate of the pong ball
  pongBallX = pongBallX + (speedX*directionX);
  myPongBall.centreX = pongBallX;

  // TODO: set the y-coordinate of the pong ball
  pongBallY = pongBallY + (speedY*directionY);
  myPongBall.centreY = pongBallY;

  context.clearRect(0,0, canvas.width, canvas.height)
  // erase the canvas, including the drawing of the pong ball
  // context.w the pong ball at the new position
  drawPongBall(myPongBall, context);

  // request new frame
  var callBack = function() {
      animate(myPongBall, canvas, context );
  };
  requestAnimFrame(callBack);

  function drawCourtEdge(context){
      context.beginPath();
      context.strokeStyle = 'green';
      context.strokeRect(0,0,canvas.width,canvas.height);
  }

  function drawRectangle(myRectangle, context) {
      // console.log("I am drawing the rectangle");
      context.beginPath();
      context.rect(myRectangle.x, myRectangle.y,
              myRectangle.width, myRectangle.height);
      context.fillStyle = '#8ED6FF';
      context.fill();
      context.lineWidth = myRectangle.borderWidth;
      context.strokeStyle = 'black';
      context.stroke();
  }
  
  function drawNet(context){
    // context.setLineDash([15,15]);
    context.moveTo(canvas.height,0);
    context.lineTo(canvas.height,canvas.width/2);
    context.lineWidth = 5;
    context.strokeStyle = 'green';
    context.stroke();
  }
  function checkIfBallHitsLeftPaddle () {
        var topOfBall = myPongBall.centreY - myPongBall.ballRadius;
        var bottomOfBall = myPongBall.centreY + myPongBall.ballRadius;
        var topOfPaddle = myRectangle.y;
        var bottomOfPaddle = myRectangle.y + myRectangle.height;
        if ((myPongBall.centreX - myPongBall.ballRadius) == (myRectangle.x + 20)) {
            console.log(bottomOfBall, topOfBall);
            if ((topOfPaddle < topOfBall) && (bottomOfBall < bottomOfPaddle)) {
                directionX = -directionX;
                console.log('it registers paddle');
            }
        }
    }
    checkIfBallHitsLeftPaddle()
  function checkIfBallHitsRightPaddle(){
    var topOfBall = myPongBall.centreY - myPongBall.ballRadius;
    var bottomOfBall = myPongBall.centreY + myPongBall.ballRadius;
    var topOfPaddle = myRectangle02.y;
    var bottomOfPaddle = myRectangle02.y + myRectangle.height;
      if((myPongBall.centreX - myPongBall.ballRadius)==(myRectangle02.x - 20)){
        if((topOfPaddle < topOfBall)&& (bottomOfBall < bottomOfPaddle)){
          directionX = -directionX
        }
      }
  }
  checkIfBallHitsRightPaddle()
  drawRectangle(myRectangle,context);
  drawRectangle(myRectangle02,context);
  drawCourtEdge(context);
  drawScore(context)
  drawNet(context)
 }
  setTimeout(animate, 1000,myPongBall,canvas,context);
