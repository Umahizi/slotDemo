export {Navigation}
import {StateManager} from '../stateManager.js'
import {STATES} from '../stateManager.js'
import { ReelsSettings } from '../data/reelsSettings.js';
import { Game } from '../data/game.js';

let instance = null;

let Navigation = class{
    constructor()
    {
        if(instance === null )
        {
            instance = this;

            this.init();
        }

        return instance;
    }

    init(){
        this.stateManager = new StateManager();
        this.game = new Game();
        this.balanceAmount = 0;
        this.balance = document.getElementById("balance_amount");
        this.balance.addEventListener("input",this._setBalance.bind(this));
        this.spinBtn = document.getElementById("btn_spin");
        this.score = document.getElementById("score");
        this.stake = 1;
        this._createDebugMenu();
        var image = new Image();
        image.src = 'resources/hdr/nav_spin_btn.png';
        this.spinBtn.appendChild(image);
        this.disableButtons();

    }

    // Button

    enableButtons()
    {
        this.spinBtn.attributes.disabled = false;
        this._addBtnListener();
    }

    disableButtons()
    {
        this._removeBtnListener();
        this.spinBtn.attributes.disabled = true;
    }

    _addBtnListener()
    {
        this.spinBtn.addEventListener('mouseup',this._onClick.bind(this));
    }
    
    _removeBtnListener()
    {
        this.spinBtn.removeEventListener('mouseup',this._onClick.bind(this));

    }

    _onClick(e)
    {
        if(this.balanceAmount<this.stake){
            alert('Low Balance');
            return;
        }
        
        this.stateManager.changeState(STATES.SPIN_START);
    }

    //Score
    showScore(winAmount)
    {
        if(winAmount===0)return;
        this.text = winAmount+"$";
        this.score.innerHTML = this.text;
    }

    hideScore()
    {
        if(this.text===undefined)return;
        this.score.innerHTML = "";
    }

    //Balace
    updateBalance(newBalance)
    {
        this.balanceAmount = newBalance;
        this.balance.value = newBalance;
    }

    _setBalance(e){
        if(isNaN( parseFloat(e.target.value)))
        {
            alert("Balance should be a number");
            e.target.value = this.balanceAmount;
            return;
        }
        else if(parseFloat(e.target.value)>5000 ||parseFloat(e.target.value)<=0)
        {
            alert("Enter balance between 0 and 5000");
            e.target.value = this.balanceAmount;
            return;
        }
        this.balanceAmount = parseFloat(e.target.value);
    }

    //debugg

    _createDebugMenu()
    {
        this.debugMenu = document.getElementById("debug_menu");
        this.debugBtn = document.getElementById("show_debug_menu");
        this.sendDebug = document.getElementById("send_debug");
        this.debugBtn.addEventListener('mouseup',this._toggleDebug.bind(this));
        this.sendDebug.addEventListener('mouseup',this._saveDebugOptions.bind(this));
        this.debugForm = document.getElementById("debugForm");
        var reelOptions = this._getReelOptions();
        var lineOptions = this._getLineOptions();
        this.select_r_1 = document.getElementById("select_reel_1");
        this.select_r_2 = document.getElementById("select_reel_2");
        this.select_r_3 = document.getElementById("select_reel_3");
        this.select_r_1.innerHTML = reelOptions;
        this.select_r_2.innerHTML = reelOptions;
        this.select_r_3.innerHTML = reelOptions;
        this.select_p_1 = document.getElementById("select_position_1");
        this.select_p_2 = document.getElementById("select_position_2");
        this.select_p_3 = document.getElementById("select_position_3");
        this.select_p_1.innerHTML = lineOptions;
        this.select_p_2.innerHTML = lineOptions;
        this.select_p_3.innerHTML = lineOptions;
        this.debugOpened = false;
    }

    _getReelOptions()
    {
        var innerHTML="";
        for(let i =1;i<ReelsSettings.symbolMap.length;i++)
        {
            innerHTML+="<option value=\""+ReelsSettings.symbolMap[i].id+"\">"+ReelsSettings.symbolMap[i].name+"</option>";
        }
        return innerHTML;
    }

    _getLineOptions()
    {
        var innerHTML="";
        for(let i =0;i<ReelsSettings.winLines.length;i++)
        {
            innerHTML+="<option value=\""+i+"\">"+ReelsSettings.winLinesNames[i]+"</option>";
        }
        return innerHTML;
    }

    _saveDebugOptions(e)
    {
        this._closeDebug();
        this.game.debugMode =true;
        console.log( parseInt(this.select_r_1.options[this.select_r_1.selectedIndex].attributes.value));
        var selectedSymbolds = [
           parseInt(this.select_r_1.options[this.select_r_1.selectedIndex].attributes.value.value),
           parseInt(this.select_r_2.options[this.select_r_2.selectedIndex].attributes.value.value),
            parseInt(this.select_r_3.options[this.select_r_3.selectedIndex].attributes.value.value)
        ];
        var selectedStopPositions = [
            parseInt(this.select_p_1.options[this.select_p_1.selectedIndex].attributes.value.value),
            parseInt(this.select_p_2.options[this.select_p_2.selectedIndex].attributes.value.value),
            parseInt(this.select_p_3.options[this.select_p_3.selectedIndex].attributes.value.value)
        ];

        this.game.setDebug(selectedSymbolds,selectedStopPositions);

    }

    _toggleDebug(e)
    {
        if(this.debugOpened===true) this._closeDebug();
        else this._openDebug();
    }

    _openDebug()
    {
        this.debugOpened=true;
        this.debugForm.classList.remove("invisible");
    }

    _closeDebug()
    {
        this.debugOpened=false;
        this.debugForm.classList.add("invisible");
    }



}