export {StateManager}
export {STATES}
import {Manager} from './manager.js'

let instance = null;

let StateManager =  class{
    constructor()
    {
        if(instance === null )
        {
            instance = this;
            console.log('new instance');
            this.init();
            
        }

        return instance;
    }


    init(){
        this.manager = new Manager();
    
    }

    changeState(newState)
    {
        if(this.state === newState)return;
        this.previousState = this.state;
        
        console.log(this.state);

        switch(newState)
        {
            case STATES.INIT:
            {
                this.state = newState;
                this.manager.start();
                break;
            }
            
            case STATES.READY:
            {
                this.state = newState;

                this.manager.setReady();
                break;

            }
           
            case STATES.SPIN_START:
            {
                if(this.previousState!=STATES.READY&&this.previousState!=STATES.INIT)return;
                this.state = newState;

                this.manager.spin();
                break;

            }
          
            case STATES.STOPPED:
            {
                this.state = newState;

                this.manager.spinEnd();
                break;

            }
           
            case STATES.FINISH:
            {
                this.state = newState;

                this.manager.finish();
                this.changeState(STATES.READY);
                break;

            }
        
            default: break;
        }
    }
}

let STATES = {
    INIT:1,
    READY:2,
    SPIN_START:3,
    SPINNING:4,
    STOPPED:5,
    FINISH:6,

}