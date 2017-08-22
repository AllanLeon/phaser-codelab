import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
	constructor(game, x, y, upKey, downKey, leftKey, rightKey) {
		super(game, x, y, 'goomba');

		this.setWalkAnimation();

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

	setWalkAnimation() {
		this.animations.add('walk', [0, 1], 10, true);
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

	moveUp() {
		this.body.velocity.y -= 200;
		this.animations.play('walk');
	}
	
	moveDown() {
		this.body.velocity.y += 200;
		this.animations.play('walk');
	}

	moveLeft() {
		this.body.velocity.x -= 200;
		this.animations.play('walk');
	}

	moveRight() {
		this.body.velocity.x += 200;
		this.animations.play('walk');
	}

	stopX() {
		this.body.velocity.x = 0;
		this.animations.stop('walk');
	}

	stopY() {
		this.body.velocity.y = 0;
	}

	update() {
		if (this.x > this.game.world.width && this.body.velocity.x > 0) {
			this.x = - this.width;
		}

		if (this.x <  - this.width && this.body.velocity.x < 0) {
			this.x = this.game.world.width;
		}

		if (this.y > this.game.world.height && this.body.velocity.y > 0) {
			this.y = - this.height;
		}

		if (this.y < - this.height && this.body.velocity.y < 0) {
			this.y = this.game.world.height;
		}
	}
}
