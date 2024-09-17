let floor;
let arco1, arco2, backgroundImage;
let player1, player2, pata1, pata2, pelota;
let player1Score = 0;
let player2Score = 0;
let paused = false;
let pauseButton;1
let obstaculo1;
let obstaculo2;
let obstaculo3;
let timer = 0;


function setup() {
	new Canvas(850, 500);

    // Arcos
    arco1 = new Sprite(15, 380, 5, 130, 's');
    arco1.visible = true;
    arco1.collider = "none"
    arco2 = new Sprite(835, 380, 5, 130, 's');
    arco2.visible = true;
    arco2.collider = "none"

	 // Pisos
	 let floor1 = new Sprite(400, 1, 900, 5, 's');
	 let floor2 = new Sprite(847, 0, 5, 900, 's');
	 let floor3 = new Sprite(3, 0, 5, 900, 's');
	 let floor4 = new Sprite(150, 0, 5, 600, 's');
	 floor4.rotation = 50;
	 let floor5 = new Sprite(700, 0, 5, 800, 's');
	 floor5.rotation = -50;
	 let floor6 = new Sprite(-7, 310, 5, 65, 's');
	 floor6.rotation = -75;
	 let floor7 = new Sprite(860, 310, 5, 65, 's');
	 floor7.rotation = 75;
	 let floor8 = new Sprite(380, 438, 1000, 2, 's');

      // Obstáculos
    obstaculo1 = new Sprite(425, 120, 100, 100,  's');
    obstaculo1.diameter = 120
    obstaculo1.color = 'red';
    obstaculo2 = new Sprite(175, 150, 70, 70,  's');
    obstaculo2.diameter = 60
    obstaculo2.color = 'red';
    obstaculo3 = new Sprite(675, 150, 70, 70,  's');
    obstaculo3.diameter = 60
    obstaculo3.color = 'red';

	// Jugadores
    player1 = new Sprite(200, 350, 28, 50);
    player1.friction = 0;
    player1.rotationLock = true;
    let cabeza1 = new Sprite(200, 333);
    cabeza1.diameter = 28;
    cabeza1.visible = false;
    pata1 = new Sprite(220, 352, 10, 20);
    pata1.visible = false;
    new GlueJoint(player1, pata1);
    new GlueJoint(player1, cabeza1);

	player2 = new Sprite(600, 350, 28, 50);
    player2.friction = 0;
    player2.rotationLock = true;
    pata2 = new Sprite(580, 352, 10, 20);
    pata2.visible = false;
    let cabeza2 = new Sprite(600, 333);
    cabeza2.diameter = 28;
    cabeza2.visible = false;
    new GlueJoint(pata2, player2);
    new GlueJoint(cabeza2, player2);

	// Pelota
    pelota = new Sprite();
    pelota.diameter = 30;
    pelota.bounciness = 0.3;
    pelota.rotationDrag = 2;
    pelota.friction = 0.2;
    
	// Gravedad de la pelota
    world.gravity.y = 9.82;

    // Pausa
    
	pauseButton = createButton("Pausa");
    pauseButton.position(650,90); // Centrando el botón arriba
    pauseButton.mouseClicked(pauseGame);
    pauseButton.style('background-color', 'green');
	
   

}

function draw() {
    background('skyblue');
    contador();  
    
    if (!paused) {
        movePlayers();
        Gool();
    }
    
    estetica();
}


function pauseGame() {
    if (!paused) {
        // Pausa el juego
        paused = true;
        noLoop();
        pauseButton.html("Reanudar");
    } else {
        // Reanuda el juego
        paused = false;
        loop();
        pauseButton.html("Pausa");
    }
}

function estetica() {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);

    // Marcadores de puntaje
    text(player1Score, width / 2 - 50, height - 25);
    text('-', width / 2, height - 0);
    text(player2Score, width / 2 + 50, height - 25);

    fill(0);
    text('EQUIPO 1', width / 4, height - 25);
    text('EQUIPO 2', (3 * width) / 4, height - 25);
}

function contador() {
    fill(0);  
    textSize(24); 
    text('Tiempo: ' + timer, width / 2, 50);
    if (frameCount % 60 == 0 && !paused) {
      timer++;
    }
}

function movePlayers() {
    // Controlar a player1
    if (kb.pressing('a')) {
        player1.vel.x = -4;
    } else if (kb.pressing('d')) {
        player1.vel.x = 4;
    } else {
        player1.vel.x = 0;
    }
	
    if (kb.presses('w')) {
        player1.vel.y = -7.5;
    }

    // Patear
    if (kb.pressing('g')) {
        pata1.rotation = 20;
        if (pata1.collides(pelota)) {
            pelota.direction = 338;
            pelota.speed = 15;
        }
    } else if (kb.pressing('h')) {
        pata1.rotation = 20;
        if (pata1.collides(pelota)) {
            pelota.direction = 0;
            pelota.speed = 15;
        }
    }

    // Controlar a player2
    if (kb.pressing('4')) {
        player2.vel.x = -4;
    } else if (kb.pressing('6')) {
        player2.vel.x = 4;
    } else {
        player2.vel.x = 0;
    }
    if (kb.presses('8')) {
        player2.vel.y = -7.5;
    }

    // Patear
    if (kb.pressing('l')) {
        pata2.rotation = -20;
        if (pata2.collides(pelota)) {
            pelota.direction = 203;
            pelota.speed = 15;
        }
    } else if (kb.pressing('ñ')) {
        pata2.rotation = -20;
        if (pata2.collides(pelota)) {
            pelota.direction = 180;
            pelota.speed = 15;
        }
    }
}

function Gool() {
    if (pelota.overlaps(arco1)) {
        pelota.position.x = 400;
        pelota.position.y = 300;
        pelota.vel.x = -4;
        player1.position.x = 200;
        player1.position.y = 350;
        player2.position.x = 600;
        player2.position.y = 350;
        player2Score++;
    }

    if (pelota.overlaps(arco2)) {
        pelota.position.x = 400;
        pelota.position.y = 300;
        pelota.vel.x = 4;
        player1.position.x = 200;
        player1.position.y = 350;
        player2.position.x = 600;
        player2.position.y = 350;
        player1Score++;
    }
}


