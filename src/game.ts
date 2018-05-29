/// <reference path="phaser.d.ts" />

export namespace SimpleGame {    
    export class Scene extends Phaser.Scene {
        config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 300},
                    debug: false
                }
            },
            scene: this
        }
        constructor() {
            super('start-screen');
            this.game = new Phaser.Game(this.config);
        }
    
        game: Phaser.Game;
        platforms: Phaser.Physics.Arcade.StaticGroup;
        player: Phaser.Physics.Arcade.Sprite;
        cursors: CursorKeys;
        stars: Phaser.Physics.Arcade.Group;
        score: number = 0;
        scoreText: Phaser.GameObjects.Text;
        bombs: Phaser.Physics.Arcade.Group;
        gameover: Boolean;
    
        preload() {
            this.load.image('sky', './assets/sky.png');
            this.load.image('ground', './assets/platform.png');
            this.load.image('star', './assets/star.png');
            this.load.image('bomb', './assets/bomb.png');
            this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48});
        }
    
        create() {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.add.sprite(400,300, 'sky');
            this.bombs = this.physics.add.group();
            this.platforms = this.physics.add.staticGroup();
            this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
            this.platforms.create(600, 400, 'ground');
            this.platforms.create(50, 250, 'ground');
            this.platforms.create(750, 220, 'ground');

            this.player = this.physics.add.sprite(100, 450, 'dude');

            this.player.setBounce(0.2);
            this.player.setCollideWorldBounds(true);

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: [{key: 'dude', frame: 4}],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNames('dude', {start: 5, end: 8}),
                frameRate: 10,
                repeat: -1
            });

            this.stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: {x: 12, y: 0, stepX: 70}
            });

            this.stars.children.iterate(function(child) {
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            }, this);

            this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

            this.physics.add.collider(this.player, this.platforms);
            this.physics.add.collider(this.stars, this.platforms);
            this.physics.add.collider(this.bombs, this.platforms);
            this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);            
            this.physics.add.overlap(this.player, this.stars, this.collectStars, null, this);
        }
    
        update() {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.anims.play('left', true);
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
                this.player.anims.play('right', true);
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play('turn');
            }

            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-330);
            }
        }

            
        collectStars(player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Sprite) {
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);

            if (this.stars.countActive(true) === 0) {
                this.stars.children.iterate(function(child) {
                    child.enableBody(true, child.x, 0, true, true);
                }, this);

                var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                var bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.allowGravity = false;
            }
        }

        hitBomb(player: Phaser.Physics.Arcade.Sprite, bomb: Phaser.Physics.Arcade.Sprite) {
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.gameover = true;
        }
    }    
}