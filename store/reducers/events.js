import {
    CREATE_EVENT,
    SET_EVENT
} from '../actions/events';
import Event from '../../models/event';

const initialState = {
    availableEvents: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENT:
            return {
                availableEvents: action.events
            };
        case CREATE_EVENT:
            const newEvent = new Event(
                action.eventData.id,
                action.eventData.title,
                action.eventData.description,
                action.eventData.location,
                action.eventData.numberOfVolunteer,
                action.eventData.tasks,
                action.eventData.startTime,
                action.eventData.dueDate,
                action.eventData.volunteers,
            );
            return {
                ...state,
                availableEvents: state.availableEvents.concat(newEvent)
            }
    }
    return state;
}
