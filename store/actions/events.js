import Event from '../../models/event';

export const CREATE_EVENT = 'CREATE_EVENT';
export const SET_EVENT = 'SET_EVENT';

export const fetchEvents = () => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(
                'https://react-b8d93.firebaseio.com/events.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedEvents = [];

            for (const key in resData) {
                loadedEvents.push(
                    new Event(
                        key,
                        resData[key].title,
                        resData[key].description,
                        resData[key].location,
                        resData[key].numberOfVolunteer,
                        resData[key].tasks,
                        resData[key].startTime,
                        resData[key].dueDate,
                        resData[key].volunteers
                    )
                );
            }

            //console.log(loadedEvents);
            dispatch({
                type: SET_EVENT,
                events: loadedEvents
            });
        } catch(err) {
            throw err;
        }
    };
};

export const createEvent = (title, description, location, numberOfVolunteer, tasks, startTime, dueDate, volunteers) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(
            'https://react-b8d93.firebaseio.com/events.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    location,
                    numberOfVolunteer,
                    tasks,
                    startTime,
                    dueDate,
                    volunteers
                })
            }
        );

        const resData = await response.json();

        dispatch({
            type: CREATE_EVENT,
            eventData: {
                id: resData.name,
                title, 
                description, 
                location, 
                numberOfVolunteer, 
                tasks, 
                startTime, 
                dueDate, 
                volunteers
            }
        });
    }
}