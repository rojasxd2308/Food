export const ACTION_1 ="ACTION_1";
export const ACTION_2 ="ACTION_2";
export const ACTION_3 ="ACTION_3";
export const QUERY_ALL = "QUERY_ALL"
export const FAKE_TOKEN = "FAKE_TOKEN";


export function accion1(id) {
    return {
        type: ACTION_1,
        payload: id
    }
}


export function accion2(id) {
    return {
        type: ACTION_2,
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
///////////////////
// para setear el id de usuario que usare para guardar llas obtenciones 
export const falsoToken = (idUser) => {
    return {
        type: FAKE_TOKEN,
        payload: idUser
    }
}

export const accion3 = () => async dispatch => {
    // usar try catch and await
    dispatch({
        type: ACTION_3,
        payload: true
    })
}