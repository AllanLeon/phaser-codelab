import Phaser from 'phaser';
export default class Player extends Phaser.Sprite {
    constructor(game, x, y, velocity, upKey, downKey, leftKey, rightKey) {
        super(game, x, y, 'goomba');
        this.game.add.existing(this);

        this.velocity = velocity;
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;

        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;

        this.initializeKeys();

        this.animations.add('walk', [0, 1], 10, true);

        this.bomb = this.game.add.sprite(0, 0, 'bomb');
        this.addChild(this.bomb);
        this.hideBomb();
    }

    moveUp() {
        this.body.velocity.y -= this.velocity;
    }
    
    moveDown() {
        this.body.velocity.y += this.velocity;
    }

    moveLeft() {
        this.body.velocity.x -= this.velocity;
    }

    moveRight() {
        this.body.velocity.x += this.velocity;
    }
    
    stopX() {
        this.body.velocity.x = 0;
    }

    stopY() {
        this.body.velocity.y = 0;
    }

    initializeKeys() {
        this.upKey.onDown.add(this.moveUp, this);
        this.upKey.onUp.add(this.stopY, this);
        this.downKey.onDown.add(this.moveDown, this);
        this.downKey.onUp.add(this.stopY, this);
        this.leftKey.onDown.add(this.moveLeft, this);
        this.leftKey.onUp.add(this.stopX, this);
        this.rightKey.onDown.add(this.moveRight, this);
        this.rightKey.onUp.add(this.stopX, this);
    }

    hideBomb() {
        this.bomb.alpha = 0;
    }

    showBomb() {
        this.bomb.alpha = 1;
    }

    update() {
        if (this.upKey.isUp && this.downKey.isUp && this.leftKey.isUp && this.rightKey.isUp) {
            this.animations.stop('walk');
        } else {
            this.animations.play('walk');
        }
    }
}