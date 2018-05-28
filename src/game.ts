/// <reference path="phaser.d.ts" />

class SimpleGame {
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    game: Phaser.Game;
    platforms: any;
    ground: any;
    ledge: any;
    player: any;
    cursors: any;


    preload() {
        this.game.load.image('sky', './assets/sky.png');
        this.game.load.image('ground', './assets/platform.png');
        this.game.load.image('star', './assets/star.png');
        this.game.load.spritesheet('dude', './assets/dude.png', 32, 48);
    }

    create() {
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.add.sprite(0,0, 'sky');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.platforms = this.game.add.group();
        
        this.platforms.enableBody = true;
        this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        this.ground.scale.setTo(2, 2);
        this.ground.body.immovable = true;

        this.ledge = this.platforms.create(400, 400, 'ground');
        this.ledge.body.immovable = true;
        this.ledge = this.platforms.create(-150, 250, 'ground');
        this.ledge.body.immovable = true;

        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
        this.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        this.player.animations.add('left', [0,1,2,3], 10, true);
        this.player.animations.add('right', [5,6,7,8], 10, true);
    }

    update() {
        //  Collide the player and the stars with the platforms
        var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
        } 
        else if(this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.frame = 4;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
            this.player.body.velocity.y = -350;
        }
    }
}

export default SimpleGame;