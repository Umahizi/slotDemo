import {StateManager} from './scripts/app/stateManager.js'
import {STATES} from './scripts/app/stateManager.js'
export function start() {
    console.log('What?');
    // alert('START');
    let stateManager = new StateManager();
    // window.manager = manager;
    // Manager.start();
    let onAssetsLoaded = function(){
        // manager.start();
        console.log("start state manager");
        stateManager.changeState(STATES.INIT);
    }

    PIXI.loader
    .add('./resources/hdr/nav_spin_btn.png')
    .add('./resources/hdr/sprites.json')
    .load(onAssetsLoaded);
    // manager.start();
  }
