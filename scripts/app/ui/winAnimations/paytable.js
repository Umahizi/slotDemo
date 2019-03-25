export {Paytable}
import {PayTableLine} from './payTableLine.js'
import {ReelsSettings} from '../../data/reelsSettings.js'

let instance = null;
let Paytable = class{
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
        this.body =  new PIXI.Container();
        this.paytableLines = [];
        this.paytableHighlights = [];
        for(let i =0;i<ReelsSettings.paytableMap.length;i++)
        {
            this.paytableLines.push(new PayTableLine(i));
            this.paytableHighlights.push(new PayTableLine(i));
            this.paytableLines[i].body.y = this.paytableHighlights[i].body.y = 125 + 60*i;
            this.body.addChild(this.paytableLines[i].body);
            this.body.addChild(this.paytableHighlights[i].body);
        }
    }

    playWin(winIds)
    {
        for(let i =0;i<winIds.length;i++)
        {
            this.paytableHighlights[winIds[i]].highlight();
        }
    }
}