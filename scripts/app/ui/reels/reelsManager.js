export { ReelsManager }
import { Reel } from './reel.js'
import { StateManager } from '../../stateManager.js'
import { STATES } from '../../stateManager.js'

let ReelsManager = class {
    constructor() {
        this.reelsCount = 0;
        this.reelsSet = null;
        this.reels = [];
        this.bound = new PIXI.Rectangle(0, 0, 141, 181.5);
        this.body = new PIXI.Container();
    }

    creteReels(reelSets) {

        this.reelsCount = reelSets.length;

        for (var i = 0; i < this.reelsCount; i++) {
            let reel = new Reel(reelSets[i], this.bound);
            this.reels.push(reel);
            this.body.addChild(reel.body);
            reel.body.x = i * reel.body.width + i * 20;
        }

    }

    setScreenResult(stopPositions) {
        for (let i = 0; i < this.reels.length; i++) {
            this.reels[i].setPosition(stopPositions[i])
        }
    }

    spinReels(stopPositions) {
        this.reelsPlaying = this.reels.length;
        var tl = new TimelineMax();

        for (let i = 0; i < this.reels.length; i++) {
            this.reels[i].spinEnded.addOnce(this._onReelSpinEnd.bind(this));
            tl.add(TweenLite.delayedCall(i * 0.5, this.reels[i].startRotation.bind(this.reels[i]), [stopPositions[i]]));
        }
    }

    _onReelSpinEnd() {
        this.reelsPlaying--;
        if (this.reelsPlaying === 0) {
            new StateManager().changeState(STATES.STOPPED);
        }
    }

    playWinLine(lineId) {
        for (reel in this.reels) {
            this.reels[reel].playWin(lineId);
        }
    }


}