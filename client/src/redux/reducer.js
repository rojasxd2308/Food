import { ACTION_1,ACTION_2,ACTION_3,FAKE_TOKEN,QUERY_ALL } from "./actions";

const initialState = {
    recipe_unique:[], 
    all:{},
    myFavorites: [],
    actualUser: ""
}

export function reducer(state=initialState,actions) {  
    switch (actions.type) {
        case ACTION_1:
            return {
                ...state,myFavorites: [...state.myFavorites,actions.payload]
            }
            
            break;
        case ACTION_2:
            let filtrado = state.myFavorites.filter( (item) => 
                    item != actions.payload
            )
            return {
                ...state,myFavorites : filtrado
            }
            break;
            /////////////////////
        case QUERY_ALL:
            return { ...state,all: actions.payload}
            
        break;
            /////////////////////
        case FAKE_TOKEN:
            console.log("token" + actions.payload)
            return {
                ...state , actualUser: actions.payload
            }
            break;
        default:
            return{
                ...state
            }
            break;
    }
}


