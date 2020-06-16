import {
    DELETE_TASK,
    CREATE_TASK,
    UPDATE_TASK,
    SET_TASK
} from '../actions/tasks';
import Task from '../../models/task';

const initialState = {
    availableTasks: [],
    userTasks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TASK:
            return {
                availableTasks: action.tasks
            };
        case CREATE_TASK:
            const newTask = new Task(

            );
            return {
                ...state,
                availableTasks: state.availableTasks.concat(newTask)
            }
        case UPDATE_TASK:
            const taskIndex = state.userTasks.findIndex(
                task => task.id === action.tid
            );
            const updatedTask = new Task(

            );
            
        case DELETE_TASK:
            return {
                ...state,
                availableTasks: state.availableTasks.filter(
                    task => task.id !== action.tid   
                )
            };
    }
    return state;
}