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

		this.player2 = new Player(
			this.game, 1100, 100, 400,
			this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
			this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
			this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
			this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
		);

		this.counter = 0;
	}

	resetPlayerPositions() {
		this.player1.x = 100;
		this.player1.y = 400;
		this.player1.body.velocity.x = 0;
		this.player1.body.velocity.y = 0;
		
		this.player2.x = 1100;
		this.player2.y = 100;
		this.player2.body.velocity.x = 0;
		this.player2.body.velocity.y = 0;
	}

	handleCollisionBetweenPlayers() {
		this.resetPlayerPositions();
	}

	update () {
		// Update game objects
		this.game.physics.arcade.collide(this.player1, this.player2, this.handleCollisionBetweenPlayers, null, this);
	}
}
