export const ACTION_1 ="ACTION_1";

export const QUERY_ALL = "QUERY_ALL"


export function accion1(id) {
    return {
        type: ACTION_1,
        payload: id
    }
}


///////////////////
export function queryAll(params) {
    return{
        type: QUERY_ALL,
        payload: params
    }
}

