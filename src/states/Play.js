import Phaser from 'phaser';
import Player from '../models/Player';
import TimerDisplayer from '../models/TimerDisplayer';
import {PlayerTurn, GameState} from '../domain/types';
import Obstacle from '../models/Obstacle';

export default class Play extends Phaser.State {
	init() {
		// Initialize scene
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.gameState = GameState.PLAYING;
		this.hasCollided = 0;

		this.chaserVelocity = 200;
		this.chasedVelocity = 180;
	}

	create () {
		// Initialize game objects
		this.player1 = new Player(
			this.game, 100, 400, this.chaserVelocity,
			this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			this.game.input.keyboard.addKey(Phaser.Keyboard.D)
		);

		this.player2 = new Player(
			this.game, 1100, 100, this.chasedVelocity,
			this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
			this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
			this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
			this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
		);

		this.game.currentTurn = PlayerTurn.PLAYER_1;
		this.player1.showBomb();

		this.timer = new TimerDisplayer(this.game, 0, 0, Phaser.Timer.SECOND * 20);

		this.obstacles = this.game.add.group();
		this.obstacles.add(new Obstacle(this.game, 800, 300, 0.6));
		this.obstacles.add(new Obstacle(this.game, 250, 150, 0.6));
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
		this.hasCollided++;
		if (this.hasCollided % 2 == 0) {
			if (this.game.currentTurn == PlayerTurn.PLAYER_1) {
				this.game.currentTurn = PlayerTurn.PLAYER_2;
				this.player1.hideBomb();
				this.player1.setVelocity(this.chasedVelocity);
				this.player2.showBomb();
				this.player2.setVelocity(this.chaserVelocity);
			} else {
				this.game.currentTurn = PlayerTurn.PLAYER_1;
				this.player1.showBomb();
				this.player1.setVelocity(this.chaserVelocity);
				this.player2.hideBomb();
				this.player2.setVelocity(this.chasedVelocity);
			}
			
			this.resetPlayerPositions();
			this.timer.reset();
		}
	}

	update () {
		// Update game objects
		if (this.game.gameState === GameState.PLAYING) {
			this.game.physics.arcade.collide(this.player1, this.player2, this.handleCollisionBetweenPlayers, null, this);
			this.game.physics.arcade.collide(this.player1, this.obstacles);
			this.game.physics.arcade.collide(this.player2, this.obstacles);
		} else if (this.game.gameState === GameState.GAME_OVER) {
			if (this.game.currentTurn === PlayerTurn.PLAYER_1) {
				this.player1.kill();
			} else if (this.game.currentTurn === PlayerTurn.PLAYER_2) {
				this.player2.kill();
			}
			this.game.gameState = GameState.END;
		}
	}
}
