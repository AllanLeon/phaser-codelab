import Phaser from 'phaser';
import Player from '../models/Player';
import TimerDisplayer from '../models/TimerDisplayer';
import {PlayerTurn} from '../domain/types';

export default class Play extends Phaser.State {
	create () {
		this.hasCollided = 0;
		
		// Add your game content here
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.player1 = new Player(
			this.game, 100, 400,
			this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			this.game.input.keyboard.addKey(Phaser.Keyboard.D)
		);
		this.player1.frame = 1;

		this.player2 = new Player(
			this.game, 800, 400,
			this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
			this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
			this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
			this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
		);
		this.player2.frame = 0;

		this.currentTurn = PlayerTurn.PLAYER_1;

		this.score = {
			player1: 0,
			player2: 0
        };
        
        this.timer = new TimerDisplayer(this.game, 0, 0, Phaser.Timer.SECOND * 10);

		this.resetPositions();

		console.log(this.score);
	}

	resetPositions() {
		this.player1.x = 100;
		this.player1.y = 400;

		this.player2.x = 800;
		this.player2.y = 400;
	}

	scorePoint() {
		this.hasCollided++;
		if (this.hasCollided % 2 == 0) {
			if (this.currentTurn == PlayerTurn.PLAYER_1) {
				this.score.player1++;
				this.currentTurn = PlayerTurn.PLAYER_2;
			} else {
				this.score.player2++;
				this.currentTurn = PlayerTurn.PLAYER_1;
			}
			
			this.resetPositions();
			console.log(this.score);
			console.log(this.hasCollided);
		}
	}

	update () {
        this.game.physics.arcade.overlap(this.player1, this.player2, this.scorePoint, null, this);
        this.player1.update();
        this.player2.update();
        this.timer.update();
	}

	render() {
		this.game.debug.body(this.player1);
		this.game.debug.body(this.player2);
	}
}
