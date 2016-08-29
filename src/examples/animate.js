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
