const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Cargar recursos del juego
}

function create() {
    // Inicializar objetos del juego
    this.add.text(100, 100, 'Juego de Cabezones', { font: '32px Arial', fill: '#ffffff' });
}

function update() {
    // Lógica del juego
}
