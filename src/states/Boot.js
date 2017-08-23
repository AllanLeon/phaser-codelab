import Phaser from 'phaser'

export default class Boot extends Phaser.State {
	init () {
		// Recommended to leave as 1 unless you need multi-touch support
		this.input.maxPointers = 1

		// Phaser will automatically pause if the browser tab the game is in loses focus
		this.stage.disableVisibilityChange = true

		if (this.game.device.desktop) {
			// Desktop specific settings go here
		} else {
			// Mobile specific settings go here
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
			this.scale.setMinMax(480, 260, 1024, 768)
			this.scale.forceLandscape = true
		}
	}

	preload () {
	 	// Load anything you need for the game here
	 	this.load.spritesheet('goomba', 'assets/images/goomba.png', 100, 100);
		this.load.image('kitkat', 'assets/images/kitkat.png');
		this.load.image('bomb', 'assets/images/bomb.png');
		this.load.audio('boom', 'assets/audio/boom.wav');
	}

	create () {
		this.game.stage.backgroundColor = '#222'

		// Start the game
		this.state.start('Play')
	}
}
