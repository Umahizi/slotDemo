export {UI}
import {ReelsManager} from './reels/reelsManager.js'
import {WinAnimations} from './winAnimations/winAnimations.js'
import {Paytable} from './winAnimations/paytable.js'


let instance = null;
let UI = class {
    constructor()
    {
        if(instance === null )
        {
            instance = this;
            this.init();
        }

        return instance;
    }

    init()
    {
        TweenLite.defaultEase = Linear.easeNone;
        TweenMax.defaultEase = Linear.easeNone;
        
        this.app = new PIXI.Application(1024, 768, {backgroundColor : 0xffffff});
       
        this.reelsHolder = new PIXI.Container();
        this.winLinesContainer = new PIXI.Container();
        this.paytableContainer = new PIXI.Container();
        this.reelsManager = new ReelsManager();
        this.winAnimations = new WinAnimations();
        this.paytable = new Paytable();
      
        this.reelsHolder.x = 472;
        this.reelsHolder.y = 255;
        this.reelsHolder.addChild(this.reelsManager.body);
        this.winLinesContainer.addChild(this.winAnimations.body);
        this.paytableContainer.addChild(this.paytable.body);
        this.winAnimations.body.x = 475;
        this.paytable.body.x = 85;
       
        document.body.appendChild(this.app.view);
        this.gameTexture = PIXI.Texture.fromFrame('./backGround');
        this.background = new PIXI.Sprite(this.gameTexture);
        this.app.stage.addChild(this.reelsHolder);
        this.app.stage.addChild(this.background);
        this.app.stage.addChild(this.winLinesContainer);
        this.app.stage.addChild(this.paytableContainer);

       
        console.log(this.app);
        
    }
    
    

}