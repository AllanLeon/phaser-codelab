import Phaser from 'phaser';

export default class Obstacle extends Phaser.Sprite {
	constructor(game, x, y, scale) {
		super(game, x, y, 'kitkat');

		this.scale.setTo(scale, scale);

		game.physics.arcade.enable(this);
		this.body.immovable = true;

		game.add.existing(this);
	}
}
