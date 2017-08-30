import Phaser from 'phaser';
import Player from '../models/Player';
import Obstacle from '../models/Obstacle';
import TimerDisplayer from '../models/TimerDisplayer';
import {PlayerTurn, GameState} from '../domain/types';

export default class Play extends Phaser.State {
	init() {
		// Initialize scene
		this.physics.startSystem(Phaser.Physics.ARCADE);
	}

	create () {
		// Initialize game objects
	}

	update () {
		// Update game objects
	}
}
