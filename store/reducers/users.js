import {
    CREATE_USER,
    SET_USERS
} from '../actions/users';
import User from '../../models/user';

const initialState = {
    users: [],
    user: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                users: action.users,
                user: action.user
            };
        case CREATE_USER:
            const newUser = new User(
                action.userData.id,
                action.userData.firstName,
                action.userData.lastName,
                action.userData.imageUrl,
                action.userData.description,
                action.userData.title,
                action.userData.userId
            );
            return {
                ...state,
                users: state.users.concat(newUser),
                user: [newUser]
            }
    }
    return state;
}