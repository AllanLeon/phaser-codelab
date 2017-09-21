import Phaser from 'phaser';
import {GameState, PlayerTurn} from '../domain/types';

export default class TimerDisplayer extends Phaser.Text {
    constructor(game, x, y, limit) {
        super(game, x, y, '', {fill: '#ffffff'});
        this.game.add.existing(this);

        this.limit = limit;
        this.countdownTimer = this.game.time.create(false);
        this.countdownTimer.add(this.limit, this.endCountdown, this);
        this.countdownTimer.start();

        this.boomAudio = this.game.add.audio('boom');
    }

    endCountdown() {
        this.countdownTimer.stop();
        this.game.gameState = GameState.GAME_OVER;
        if (this.game.currentTurn === PlayerTurn.PLAYER_1) {
            this.text = 'Player 2 Won!';
        } else {
            this.text = 'Player 1 Won!';
        }

        this.boomAudio.play();
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

    reset() {
        this.countdownTimer.stop();
        this.countdownTimer.removeAll();
        this.countdownTimer.add(this.limit, this.endCountdown, this);
        this.countdownTimer.start();
    }
}