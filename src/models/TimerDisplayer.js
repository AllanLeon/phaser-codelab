import Phaser from 'phaser'

export default class TimerDisplayer extends Phaser.Text {
	constructor(game, x, y, limit) {
        super(game, x, y, '', {fill: '#ffffff'});
        this.game.add.existing(this);

        this.limit = limit;
        this.countdownTimer = this.game.time.create();
        this.countdownTimer.add(this.limit, this.endCountdown, this);
        this.countdownTimer.start();
    }

    endCountdown() {
        this.countdownTimer.stop();
        this.text = "GAME OVER";
    }

    formatTime(s) {
        const minutes = `0${Math.floor(s / 60)}`;
        const seconds = `0${s - minutes * 60}`;
        return `${minutes.substr(-2)}:${seconds.substr(-2)}`;
    }

    update() {
        if (this.countdownTimer.running) {
            this.text = this.formatTime(Math.round((this.limit - this.countdownTimer.ms) / 1000));
        }
    }
}
