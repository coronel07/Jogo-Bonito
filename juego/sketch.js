let floor;
let arco1;
let arco2;
let backgroundImage;
let player1;
let player2;
let pata1;
let pata2;
let pelota;
let player1Score = 0;
let player2Score = 0;
let paused = false;
let pauseButton;

function setup() {
	new Canvas(850, 500);

	ball = new Sprite();
	ball.diameter = 50;

    let floor1 = new Sprite(400, 1, 900, 5, 's');
    let floor2 = new Sprite(847, 0, 5, 600, 's');
    let floor3 = new Sprite(3, 0, 5, 600, 's');
    
}

function draw() {
	background('skyblue');

	if (mouse.presses()) {
		ball.speed = 10;
		ball.moveTo(mouse);
	}


function preload() {

    player1Image = loadImage('assets/PJ1.png');
}


    player1 = createSprite(100, 300, 50, 50);

 
    player1.addImage('default', player1Image);

   
    player1.scale = 0.5;

    

    // Controlar el movimiento de player1
    if (keyIsDown(LEFT_ARROW)) {
        player1.position.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player1.position.x += 5;
    }

    // Dibujar todos los sprites
    drawSprites();
}