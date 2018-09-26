export { Reel }
import { ReelAnims } from './reelAnimations.js'
import { Tile } from './tile.js'

let Reel = class {
    constructor(reelSet, viewport) {


        this.reelSet = reelSet;
        this.body = new PIXI.Container();
        this.visibleTiles = [];
        var visibleCount = Math.floor(viewport.height / Tile.getBound().height) + 4;
        this.firstVisibalIndex = 2;
        this.displacementIndex = 1;
        this.spinEnded = new signals.Signal();
        this.stopping = new signals.Signal();
        this.looping = new signals.Signal();
        this.winAnimComplete = new signals.Signal();

        for (var i = 0; i < visibleCount; i++) {
            this.visibleTiles.push(new Tile(reelSet[i]));
            this.body.addChild(this.visibleTiles[i].body);
            this.visibleTiles[i].body.y = (i - this.firstVisibalIndex) * this.visibleTiles[i].bound.height;
        }


    }

    setPosition(stopPosition) {
        this.stopPosition = stopPosition;
        var currentSymbol = stopPosition - this.firstVisibalIndex < 0 ? this.reelSet.length - (this.firstVisibalIndex - stopPosition) : stopPosition - this.firstVisibalIndex;
        for (let i = 0; i < this.visibleTiles.length; i++) {
            this.visibleTiles[i].setSymbol(this.reelSet[currentSymbol], currentSymbol);

            currentSymbol++;
            if (currentSymbol > this.reelSet.length - 1) currentSymbol = 0;
        }
    }

    startRotation(stopPosition) {
        this.stopPosition = stopPosition;
        this.loopCount = 0;
        this._reset();
        this.startTimeline = new TimelineMax({ onComplete: this._loop.bind(this), onUpdate: this._update.bind(this) });
        this.startTimeline.fromTo(this.body, ReelAnims.start.duration, ReelAnims.start.fromVars, ReelAnims.start.toVars);
    }


    _stopRotation() {
        this._reset();
        this.stopTimeline = new TimelineMax({ onComplete: this._onStopEnd.bind(this), onUpdate: this._updateForStop.bind(this) });
        this.stopTimeline.fromTo(this.body, ReelAnims.stop.duration, ReelAnims.stop.fromVars, ReelAnims.stop.toVars);
    }

    _onStopEnd() {
        this._resetOnStop();
        this.spinEnded.dispatch();
        console.log('spinEnd');
    };

    _loop() {
        this._reset();
        this.loopTimeline = new TimelineMax({ onComplete: this._onLoop.bind(this), onUpdate: this._update.bind(this) });
        this.loopTimeline.fromTo(this.body, ReelAnims.loop.duration, ReelAnims.loop.fromVars, ReelAnims.loop.toVars);

    }

    _onLoop() {
        if (this.loopCount === 3) this._stopRotation();
        else {
            this.loopCount++;
            this._loop();
        }
    }

    _update() {
        if (this.body.y / Tile.getBound().height >= this.displacementIndex) {

            this.displacementIndex++;


            this.visibleTiles.unshift(this.visibleTiles.pop());
            this.visibleTiles[0].body.y = this.visibleTiles[1].body.y - Tile.getBound().height;

            var previousPosition = this.visibleTiles[1].stopPosition;
            var position = previousPosition - 1 >= 0 ? previousPosition - 1 : this.reelSet.length - 1;
            this.visibleTiles[0].setSymbol(this.reelSet[position], position);

        }
    }

    _updateForStop() {
        if (this.body.y / Tile.getBound().height >= this.displacementIndex) {
            this.visibleTiles.unshift(this.visibleTiles.pop());
            this.visibleTiles[0].body.y = this.visibleTiles[1].body.y - Tile.getBound().height;


            var position=0;
            if(this.displacementIndex==1)
            {
                var positionDisplacement = this.firstVisibalIndex + 2 - this.displacementIndex;
                position = this.stopPosition + positionDisplacement<= this.reelSet.length - 1? this.stopPosition + positionDisplacement  : Math.abs(this.reelSet.length- (this.stopPosition + positionDisplacement));
                // console.log(position,this.stopPosition,positionDisplacement,this.displacementIndex );
            }
            else
            {
                var previousPosition = this.visibleTiles[1].stopPosition;
                position = previousPosition - 1 >= 0 ? previousPosition - 1 : this.reelSet.length - 1;
            }

            this.visibleTiles[0].setSymbol(this.reelSet[position], position);
            this.displacementIndex++;

        }
    }

    _reset() {
        this.displacementIndex = 1;
        for (var i = 0; i < this.visibleTiles.length; i++) {
            this.visibleTiles[i].body.y = (i - this.firstVisibalIndex) * this.visibleTiles[i].bound.height;
        }
    }


    _resetOnStop() {

        this.displacementIndex = 1;
        this.body.y = 0;
        for (var i = 0; i < this.visibleTiles.length; i++) {
            this.visibleTiles[i].body.y = (i - this.firstVisibalIndex) * this.visibleTiles[i].bound.height;
        }

        this.setPosition(this.stopPosition);

    }

    playWin(winPosition) {
        var actualPosition = winPosition + this.firstVisibalIndex;
        for (tile in this.visibleTiles) {
            if (this.visibleTiles[tile].stopPosition === actualPosition) {

                this.visibleTiles[tile].playWin();
            }
        }
    }


}