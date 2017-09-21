import Phaser from 'phaser';

export default class Obstacle extends Phaser.Sprite {
    constructor(game, x, y, scale) {
        super(game, x, y, 'kitkat');
        this.game.add.existing(this);
        this.scale.setTo(scale, scale);
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
    }
}