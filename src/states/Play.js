import Phaser from 'phaser';
import Player from '../models/Player';
import Obstacle from '../models/Obstacle';
import TimerDisplayer from '../models/TimerDisplayer';
import {PlayerTurn, GameState} from '../domain/types';

export default class Play extends Phaser.State {
	create () {
		this.game.gameState = GameState.PLAYING;
		this.physics.startSystem(Phaser.Physics.ARCADE);		
	}

	update () {
		if (this.game.gameState === GameState.PLAYING) {

		} else if (this.game.gameState === GameState.GAME_OVER) {
			this.game.gameState = GameState.END;
		}
	}
}
