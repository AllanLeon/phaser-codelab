import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
	constructor(game, x, y, upKey, downKey, leftKey, rightKey) {
		super(game, x, y, 'goomba');

		this.upKey = upKey;
		this.downKey = downKey;
		this.leftKey = leftKey;
		this.rightKey = rightKey;

		this.scale.setTo(0.5, 0.5);

		this.game.physics.arcade.enable(this);
		//////this.body.setCircle(this.width);
		// var radius = this.width / 2;
		// this.body.setCircle(
		//	radius,
		//	(-radius + 0.5 * this.width  / this.scale.x),
		//	(-radius + 0.5 * this.height / this.scale.y)
		// );

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
		this.body.velocity.y -= 200;
	}
	
	moveDown() {
		this.body.velocity.y += 200;
	}

	moveLeft() {
		this.body.velocity.x -= 200;
	}

	moveRight() {
		this.body.velocity.x += 200;
	}

	stop() {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}
}
