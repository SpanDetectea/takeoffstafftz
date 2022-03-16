const IS_AUTH = 'IS_AUTH';

let initialState = {
   authorized: false
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTH:
           return {...state, authorized: true}
        default: return state;
    }
}

export const setAuthorized = () => {
    return ({ type: IS_AUTH });
}

export default login;