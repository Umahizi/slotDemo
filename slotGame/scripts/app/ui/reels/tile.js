export {Tile}
import {ReelAnims} from './reelAnimations.js'

let Tile = class {

    constructor(symbolId)
    {
        this.body = new PIXI.Container();
        this.bound = new PIXI.Rectangle(0,0,141,121/2);

        let frames = [];

        this.setSymbol(symbolId,0);
        this.winComplete =new signals.Signal();
    }

    setSymbol(symbolId,stopPosition)
    {
        this.stopPosition = stopPosition;
        if(symbolId===this.symbolId)return;
        this.symbolId = symbolId;
        
        if(this.symbol!=undefined)
        {
           if(this.body.children.indexOf(this.symbol)!=-1) this.body.removeChild(this.symbol);
            this.symbol.destroy();
        }

        var val = '0' + this.symbolId;
        if(symbolId>0 && PIXI.TextureCache['./symbol_'+ val]!==undefined){
        var texture = PIXI.Texture.fromFrame('./symbol_'+ val);
        this.symbol = new PIXI.Sprite(texture);
        this.body.addChild(this.symbol);
       }
    }


    playWin()
    {
        this.winTimeline = new TimelineMax({repeat:2,yoyo:true,onComplete:this._onWinComplete.bind(this)});
        this.winTimeline.to(ReelAnims.win.duration,ReelAnims.win.toVars)
    }

    _onWinComplete()
    {
        this.winComplete.dispatch();
    }

    static getBound()
    {
        return new PIXI.Rectangle(0,0,141,121/2);
    }

  
}