import {createStore} from 'redux';

const initialState = {
    claims:[]
}

const reducer = (state,action)=>{

    switch(action.type){
        case "claimList":
            state = action.payload;
    }
        return state;
};

export const store = createStore(reducer, initialState);