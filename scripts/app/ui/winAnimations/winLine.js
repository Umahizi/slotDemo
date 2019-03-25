export {WinLine}

let WinLine = class {
    constructor(lineId)
    {
        this.lineId = lineId;
        this.body =  new PIXI.Container();
        var graphic = new PIXI.Graphics();
        graphic.lineStyle(5, 0xff7aac, 1)
        .moveTo(0, 0)
        .lineTo(468, 0);
        this.body.addChild(graphic);
    }
}