let floor;
let walls;
let arco1, arco2, backgroundImage;
let player1, player2, pata1, pata2, pelota;
let player1Score = 0;
let player2Score = 0;
let timer = 60;
let paused = false;
let pauseButton;
let fondo;

function preload() {
    fondo = loadImage('static/img/cancha.png');
}

function setup() {
    new Canvas(850, 500);

    // Arcos
    arco1 = new Sprite(30, 370, 5, 110, 's');
    arco1.visible = true;
    arco1.collider = "none"
    arco2 = new Sprite(820, 370, 5, 110, 's');
    arco2.visible = true;
    arco2.collider = "none"

    // paredes  
    let walls1 = new Sprite(400, 1, 900, 5, 's');
    let walls2 = new Sprite(847, 0, 5, 860, 's');
    let walls3 = new Sprite(3, 0, 5, 860, 's');
    //palos de arriba
    let walls4 = new Sprite(150, 0, 5, 600, 's');
    walls4.rotation = 50;
    let walls5 = new Sprite(700, 0, 5, 600, 's');
    walls5.rotation = -50;
    //arco izq
    let walls6 = new Sprite(20, 305, 5, 65, 's');
    walls6.rotation = -75;
    //arco derecho
    let walls7 = new Sprite(830, 305, 5, 65, 's');
    walls7.rotation = 75;
    //piso
    let floor = new Sprite(380, 433, 1000, 2, 's');
    floor.visible = true

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
    // Crear un botón circular para pausar/reanudar el juego
    pauseButton = createButton("||");
    pauseButton.position(1010, 478);
    pauseButton.size(40, 40);
    pauseButton.mouseClicked(pauseGame);

    // Estilos para hacer que el botón sea circular
    pauseButton.style('background-color', 'green');
    pauseButton.style('border', 'none');
    pauseButton.style('border-radius', '50%');
    pauseButton.style('color', 'white');
    pauseButton.style('font-size', '24px');
    pauseButton.style('cursor', 'pointer');
}


function draw() {
    background(fondo);
    contador();

    if (!paused && timer > 0) {
        movePlayers();
        Gool();
    }

    estetica();
}

function estetica() {
    fill(255);
    textSize(24);

    // Marcadores de puntaje
    text(player1Score, 396, 470);
    text('-', width / 2, height - 0);
    text(player2Score, 438, 470);

    fill(255);
    textSize(20);
    text('EQUIPO', 265, 470);
    text('EQUIPO', 510, 470);
}

function pauseGame() {
    if (!paused) {
        paused = true;
        noLoop();
        pauseButton.html("▶");
        pauseButton.style('background-color', 'red');
    } else {
        paused = false;
        loop();
        pauseButton.html("||");
        pauseButton.style('background-color', 'green');
    }
}

function contador() {
    fill(0);
    textSize(15);

    text('00:' + timer, 405, 494);

    if (frameCount % 60 == 0 && timer > 0 && !paused) {
        timer--;
    }

    if (timer <= 0) {
        text('Fin del juego', width / 2, height / 2);
        noLoop();
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


