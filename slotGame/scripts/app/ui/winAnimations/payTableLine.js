export {PayTableLine}

let PayTableLine = class {
    constructor(id)
    {
        this.id = id;
        this.body =  new PIXI.Container();
        var texture = PIXI.Texture.fromFrame('./pay_table_0'+ id);
        this.symbol = new PIXI.Sprite(texture);
        this.body.addChild(this.symbol);
    }

    highlight()
    {
        this.body.alpha =0.7;
        this.highlightTl= new TimelineMax({repeat:5,yoyo:true,onComplete:this._onHighlightComplete.bind(this)});
        this.highlightTl.to(this.body,1,{x:this.body.x-10,y:this.body.y-10,alpha:0});
    }

    _onHighlightComplete()
    {
        this.body.alpha =0;
    }
}