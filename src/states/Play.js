import Phaser from 'phaser';
import Player from '../models/Player';

export default class Play extends Phaser.State {
	init() {
		// Initialize scene
		this.physics.startSystem(Phaser.Physics.ARCADE);
	}

	create () {
		// Initialize game objects
		this.player1 = new Player(
			this.game, 100, 400, 400,
			this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			this.game.input.keyboard.addKey(Phaser.Keyboard.D)
		);
	}

	update () {
		// Update game objects
		this.player1.update();
	}
}
