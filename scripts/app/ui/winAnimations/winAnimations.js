export {WinAnimations}
import {WinLine} from './winLine.js'
import {Paytable} from './paytable.js'
import {StateManager} from '../../stateManager.js'
import {STATES} from '../../stateManager.js'
import {ReelsSettings} from '../../data/reelsSettings.js'

let instance = null;
let WinAnimations = class{
    constructor()
    {
        if(instance===null)
        {
            instance = this;
            this._init();
        }

        return instance;
    }

    _init(){
        this.body = new PIXI.Container();
        this.payTable = new Paytable();
        this.stateManager = new StateManager();
        this.lineAnimations = [];
        this.visibleLines = [];
        for(var i = 0;i<ReelsSettings.reelsCount;i++)
        {
            this.lineAnimations.push(new WinLine(i));
            this.lineAnimations[i].body.y = 305 + i*70;
        }
    }

    playWin(winLines)
    {
        var ptWins = [];
        for(let i =0;i<winLines.length;i++)
        {
            let index = winLines[i].lineId;
            this.body.addChild(this.lineAnimations[index].body);
            this.visibleLines.push(index);
            ptWins.push(winLines[i].winType);
        }
        this.stateManager.changeState(STATES.FINISH);
        this.payTable.playWin(ptWins);
    }

    hideWinLines()
    {
        for(let i =0;i<this.visibleLines.length;i++)
        {
            let index = this.visibleLines[i];
            this.body.removeChild(this.lineAnimations[index].body);
        }
        this.visibleLines = [];
    }


}