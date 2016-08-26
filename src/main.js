// import Court from "./Court"
// import Ball from "./Ball"
class PongGame{
	// let court = new Court();
 		// let paddles,
			//  	ball,
		 // 	 	score;
	constructor(field,equipment,target){
		this.court = new Court(width,height,field);
		// this.court = field;
		// this.court.width = field.width;
		// this.court.height = field.height;
		this.court.context = field.getContext('2d'); 
		// this.paddles = equipment;
		// this.ball = target;
		// this.score = 0;
		init();
	}
	init(){
		createNet()
		showBoard(this.court)
		showAndPositionBall(this.ball)
		showAndPositionPaddles(this.paddles)
		showScore(this.score)
		$(document).ready(function(){
			playGame();
		});
	};
	showBoard(court){}
	showAndPositionBall(ball){}
	// showAndPositionPaddles(paddles){}
	// showScore(score){}
	playGame(){}
}
// playGame(){
// 	//moveBall
// 	//movePaddle
// 	//detectCollision
// 	//increaseScore
// 	//resetBall
// }

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// context.fillStyle = 'yellow';
// // fillRect(x1, y1, x2, y2)
// context.fillRect(10, 50, 10, 50);
// context.fillRect(280,10,10,50);
// // dotted line
// // createNet(){
// // this.court.context.setLineDash([15,15]);
// // this.court.context.beginPath();
// // context.moveTo(this.court.width/2,0);
// // context.lineTo(this.court.width/2,this.court.height);
// // context.lineWidth = 5;
// // context.strokeStyle = 'green';
// // context.stroke();
// // }

// score

// ball
context.fillStyle = 'white';
context.beginPath();
// arc(x, y, radius, 0, Pi* 2, true)
context.arc(150, 75, 5, 0, Math.PI*2, true);
context.fill();