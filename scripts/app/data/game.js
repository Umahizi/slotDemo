export { Game }
import { ReelsSettings } from './reelsSettings.js'

let instance = null;

let Game = class {
    constructor() {
        if (instance === null) {
            instance = this;

            this.init();
        }

        return instance;
    }

    init() {
        this.debugMode = false;
    }

    setDebug(symbolIds,stopPositions) {
        this.debugMode = true;
        this.debugResults = [];
        for(let i = 0; i<symbolIds.length;i++)
        {
            var stopPosition = ReelsSettings.reelSets[i].indexOf(symbolIds[i])+stopPositions[i];
            this.debugResults.push(stopPosition);
        }

    }

    getResult() {
        if(this.debugMode){
            this.result = this.debugResults;
        }
        else {
            this.result = [this._getRandomInt(), this._getRandomInt(), this._getRandomInt()];
        }
        this.combinations = [];
        for (let i = 0; i < ReelsSettings.winLines.length; i++) {
            this.combinations.push(this._getCombination(ReelsSettings.winLines[i]));
        }
        this.winningLines = this._getWinningLines(this.combinations);
        this.debugMode = false;
        return this.result;
    }

    getWinLines() {
        return this.winningLines;
    }

    getTotalWin()
    {
        return this.totalWin;
    }

    _getWinningLines(combinations) {
        let winningLines = [];
        this.totalWin= 0;
        for (let lineId = 0; lineId < combinations.length; lineId++) {
            for (let i = 0; i < ReelsSettings.paytableMap.length; i++) {
                if(this._checkLineCondition(combinations[lineId],lineId,i)){
                    winningLines.push({combination:combinations[lineId],lineId:lineId,winType:i,winAmount:ReelsSettings.paytableMap[i].winAmount});
                    this.totalWin+=ReelsSettings.paytableMap[i].winAmount;
                    break;
                }
            }
        }

        return winningLines;
    }

    _checkLineCondition(combination,lineId,paytableIndex)
    {
        if(ReelsSettings.paytableMap[paytableIndex].lineIds.indexOf(lineId)===-1)return false;
        for(var i = 0;i<combination.length;i++)
        {
            if(ReelsSettings.paytableMap[paytableIndex].symbolIds.indexOf(combination[i])===-1)return false;
        }
        return true;

    }

    _getCombination(lineId) {
        var combination = [];

        for (let i = 0; i < ReelsSettings.reelsCount; i++) {
            var position = this.result[i] + lineId <= ReelsSettings.reelSets[i].length - 1 ? this.result[i] + lineId : Math.abs(ReelsSettings.reelSets[i].length - this.result[i] + lineId);
            combination.push(ReelsSettings.reelSets[i][position]);
        }
        return combination;
    }

    _getRandomInt() {
        let rand = Math.random();
        return Math.floor(rand * 10);
    }
}