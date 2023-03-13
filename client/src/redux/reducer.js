import { ACTION_1, QUERY_ALL } from "./actions";

const initialState = {
    recipe_unique: [],
    all: {},
    myFavorites: [],
    actualUser: ""
}

export function reducer(state = initialState, actions) {
    switch (actions.type) {
        case ACTION_1:
            return {
                ...state, myFavorites: [...state.myFavorites, actions.payload]
            }
            break;
        case QUERY_ALL:
            return { ...state, all: actions.payload }

            break;
        default:
            return {
                ...state
            }
            break;
    }
}


