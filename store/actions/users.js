import User from "../../models/user";

export const CREATE_USER = "CREATE_USER";
export const SET_USERS = "SET_USERS";

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        "https://react-b8d93.firebaseio.com/users.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedUsers = [];

      for (const key in resData) {
        loadedUsers.push(
          new User(
            key,
            resData[key].firstName,
            resData[key].lastName,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].title,
            resData[key].userId
          )
        );
      }
      
      dispatch({
        type: SET_USERS,
        users: loadedUsers,
        user: loadedUsers.filter((user) => user.userId === userId),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createUser = (
  firstName,
  lastName,
  imageUrl,
  description,
  title,
  userId
) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    
    const response = await fetch(
      `https://react-b8d93.firebaseio.com/users.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          imageUrl,
          description,
          title,
          userId: userId,
        }),
      }
    );

    const resData = await response.json();
      console.log(resData);
    dispatch({
      type: CREATE_USER,
      userData: {
        id: resData.name,
        firstName,
        lastName,
        imageUrl,
        description,
        title,
        userId: userId,
      },
    });
  };
};
