const GET_USERS = 'GET_USERS';
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const EDIT_USER = 'EDIT_USER';
const SEARCH_USER = 'SEARCH_USER';

const initialState = {
    users: [],
    search: ''
}

const contact = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {...state,users: action.users};
        case ADD_USER:
            let newUser = {
                id: state.users[state.users.length-1].id+1,
                name: action.name,
                status: action.status,
                img: action.image
            }
            return {...state, users: [...state.users, newUser]};
        case DELETE_USER:
            return {
                ...state, 
                users: state.users.filter(item => item.id !== action.userId)
            };
        case EDIT_USER:
            return {
                ...state ,
                users: state.users.map(item => {
                    if (item.id === action.userId) {
                        item.name = action.name;
                        item.status = action.status;
                        item.img = action.image;
                    }
                    return item;
                })
            };
        case SEARCH_USER:
            return {...state, search: action.username };
        default:
            return state;
    }
}

export const getUsers = (users) => {
    return ({type:GET_USERS, users})
}
export const addUser = (name,status,image) => {
    return ({type: ADD_USER, name,status,image})
}
export const deleteUser = (userId) => {
    return ({type: DELETE_USER, userId})
}
export const editUser = (userId, name, status, image) => {
    return ({type: EDIT_USER, userId, name, status, image})
}
export const searchUser = (username) => {
    return ({type: SEARCH_USER, username})
}

export default contact;