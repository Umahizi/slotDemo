export {Manager};
import {UI} from './ui/ui.js'
import {ReelsSettings} from './data/reelsSettings.js'
import {Game} from './data/game.js'
import {Navigation} from './navigation/navigation.js'

let instance = null;

let Manager = class {
    constructor()
    {
        if(instance === null )
        {
            instance = this;
            this._init();
            window.manager = this;
        }
        return instance;
    }

    _init()
    {
        this.game = new Game();
        this.navigation = new Navigation();
    }

    
    start()
    {
        this.ui = new UI();
        this.reelsManager = this.ui.reelsManager;
        this.navigation.updateBalance(1000);
        var reelSets = ReelsSettings.reelSets;
        this.reelsManager.creteReels(reelSets);
        this.reelsManager.setScreenResult(ReelsSettings.initialStopPositions);
        this.setReady();
    }

    setReady()
    {
        this.navigation.enableButtons();
    }


    spin()
    {
        var spinResults = this.game.getResult();
        this.ui.winAnimations.hideWinLines();
        this.navigation.hideScore();
        this.navigation.updateBalance(this.navigation.balanceAmount-this.navigation.stake);
        this.navigation.disableButtons();
        this.reelsManager.spinReels(spinResults);
    }

    spinEnd()
    {
        
        this.navigation.showScore(this.game.totalWin);
        this.ui.winAnimations.playWin(this.game.getWinLines());
        this.navigation.updateBalance(this.navigation.balanceAmount+this.game.totalWin);
    }

    finish()
    {

    }



}



