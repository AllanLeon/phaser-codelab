import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
    constructor(game, x, y, upKey, downKey, leftKey, rightKey) {
        super(game, x, y, 'circle');

        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;

        this.scale.setTo(0.2, 0.2);

        this.game.physics.arcade.enable(this);
        this.body.setCircle(this.width);

        this.game.add.existing(this);

        this.initializeKeys();
    }

    initializeKeys() {
        this.upKey.onDown.add(this.moveUp, this);
        this.upKey.onUp.add(this.moveDown, this);

        this.downKey.onDown.add(this.moveDown, this);
        this.downKey.onUp.add(this.moveUp, this);

        this.leftKey.onDown.add(this.moveLeft, this);
        this.leftKey.onUp.add(this.moveRight, this);

        this.rightKey.onDown.add(this.moveRight, this);
        this.rightKey.onUp.add(this.moveLeft, this);
    }

    moveUp() {
        this.body.velocity.y -= 100;
    }
    
    moveDown() {
        this.body.velocity.y += 100;
    }

    moveLeft() {
        this.body.velocity.x -= 100;
    }

    moveRight() {
        this.body.velocity.x += 100;
    }

    stop() {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }
}
