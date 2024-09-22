let floor;
let arco1, arco2, fondo;
let player1, player2, pata1, pata2, pelota;
let player1Score = 0;
let player2Score = 0;
let timer = 60;
let paused = false;
let pauseButton, resetButton, menuButton;

function preload() {
    fondo = loadImage('static/img/cancha.png'); 
}

function setup() {

    createCanvas(850, 500);
    frameRate(60);

    // Arcos
    arco1 = new Sprite(30, 370, 5, 110, 's');
    arco1.visible = true;
    arco1.collider = "none";
    arco2 = new Sprite(820, 370, 5, 110, 's');
    arco2.visible = true;
    arco2.collider = "none";

    // Paredes  
    let walls1 = new Sprite(400, 1, 900, 5, 's');
    let walls2 = new Sprite(847, 0, 5, 860, 's');
    let walls3 = new Sprite(3, 0, 5, 860, 's');
    let walls4 = new Sprite(150, 0, 5, 600, 's');
    walls4.rotation = 50;
    let walls5 = new Sprite(700, 0, 5, 600, 's');
    walls5.rotation = -50;
    let walls6 = new Sprite(20, 305, 5, 65, 's');
    walls6.rotation = -75;
    let walls7 = new Sprite(830, 305, 5, 65, 's');
    walls7.rotation = 75;
    floor = new Sprite(380, 433, 1000, 2, 's');
    floor.visible = true;

    // Jugadores
    player1 = new Sprite(200, 345, 25, 50);
    player1.friction = 0;
    player1.rotationLock = true;
    let cabeza1 = new Sprite(200, 333);
    cabeza1.diameter = 28;
    cabeza1.visible = false;
    pata1 = new Sprite(220, 365, 10, 20);
    pata1.visible = false;
    pata1.collider = 'dynamic'
    new GlueJoint(player1, pata1);
    new GlueJoint(player1, cabeza1);

    player2 = new Sprite(600, 350, 25, 50);
    player2.friction = 0;
    player2.rotationLock = true;
    pata2 = new Sprite(580, 365, 10, 20);
    pata2.visible = false;
    pata2.collider = 'dynamic'
    let cabeza2 = new Sprite(600, 333);
    cabeza2.diameter = 28;
    cabeza2.visible = false;
    new GlueJoint(pata2, player2);
    new GlueJoint(cabeza2, player2);

    // Pelota
    pelota = new Sprite();
    pelota.diameter = 25;
    pelota.bounciness = 0.3;
    pelota.rotationDrag = 2;
    pelota.friction = 0.2;

    world.gravity.y = 9.82;

    pauseButton = createButton("||");
    pauseButton.id('pauseButton'); 
    pauseButton.class('pause-button');
    pauseButton.mouseClicked(pauseGame);
}

function draw() {
    background(fondo);
    contador();

    if (!paused && timer > 0) {
        movePlayers();
        Gool();
    }

    if (timer <= 0) {
        endGame();
    }
}

function updateScoreboard() {
    document.getElementById('player1Score').innerText = player1Score;
    document.getElementById('player2Score').innerText = player2Score;
}

function updateTimer() {
    document.getElementById('gameTimer').innerText = timer;
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
    updateTimer();

    if (frameCount % 60 === 0 && timer > 0 && !paused) {
        timer--;
    }

    if (timer <= 0) {
        fill(255, 0, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('Fin del juego', width / 2, height / 2 - 40);
    }
}

function movePlayers() {
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
        player2Score++;
        updateScoreboard();
        resetPositions();
    }

    if (pelota.overlaps(arco2)) {
        pelota.position.x = 400;
        pelota.position.y = 300;
        player1Score++;
        updateScoreboard();
        resetPositions();
    }
}

function resetPositions() {
    pelota.vel.x = 0;
    pelota.vel.y = 0;
    player1.position.x = 200;
    player1.position.y = 350;
    player2.position.x = 600;
    player2.position.y = 350;
}

function endGame() {
    noLoop(); 

    if (!resetButton) {
        resetButton = createButton('Restablecer');
        resetButton.id('resetButton');
        resetButton.class('end-game-button');
        resetButton.position(width / 2 - 75, height / 2 + 15);
        resetButton.mouseClicked(resetGame);
        resetButton.parent(document.body); 
    }

    if (!menuButton) {
        menuButton = createButton('Volver al menú');
        menuButton.id('menuButton');
        menuButton.class('end-game-button');
        menuButton.position(width / 2 - 75, height / 2 + 85);
        menuButton.mouseClicked(goToMenu);
        menuButton.parent(document.body); 
    }

    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Fin del juego', width / 2, height / 2 - 40);
}

function resetGame() {
    timer = 60;
    player1Score = 0;
    player2Score = 0;
    updateScoreboard();
    resetPositions();
    loop(); 
    paused = false;

    pauseButton.html("||");
    pauseButton.style('background-color', 'green');

   
    if (resetButton) {
        resetButton.remove();
        resetButton = null;
    }
    if (menuButton) {
        menuButton.remove();
        menuButton = null;
    }
}

function goToMenu() {
    window.location.href = 'http://127.0.0.1:5000/menu'; 
}
