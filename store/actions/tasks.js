import Task from "../../models/task";

export const CREATE_TASK = "CREATE_TASK";
export const SET_TASK = "SET_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const fetchTasks = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        "https://react-b8d93.firebaseio.com/tasks.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedTasks = [];

      for (const key in resData) {
        loadedTasks.push(
          new Task(
            key,
            resData[key].title,
            resData[key].description,
            resData[key].location,
            resData[key].numberOfVolunteer,
            resData[key].startTime,
            resData[key].dueDate,
            resData[key].volunteers,
            resData[key].event
          )
        );
      }

      dispatch({
        type: SET_TASK,
        tasks: loadedTasks,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteTask = taskId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(
        `https://react-b8d93.firebaseio.com/products/${taskId}.json?auth=${token}`,
        {
            method: 'DELETE'
        }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({type: DELETE_TASK, tid: taskId});
    };
};

export const createTask = (title, description, location, numberOfVolunteer, startTime, dueDate, volunteers, event) => {
  return async(dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://react-b8d93.firebaseio.com/tasks.json`,
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
          startTime, 
          dueDate, 
          volunteers, 
          event
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_TASK,
      taskData: {
        id: resData.name,
        title, 
          description, 
          location, 
          numberOfVolunteer, 
          startTime, 
          dueDate, 
          volunteers, 
          event
      }
    });
  }
};

export const updateTask = (id, title, description, location, numberOfVolunteer, startTime, dueDate, volunteers, event) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://react-b8d93.firebaseio.com/tasks/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title, 
          description, 
          location, 
          numberOfVolunteer, 
          startTime, 
          dueDate, 
          volunteers, 
          event
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_TASK,
      tid: id,
      taskData: {
        
        title, 
          description, 
          location, 
          numberOfVolunteer, 
          startTime, 
          dueDate, 
          volunteers, 
          event
      }
    });
  };
};
