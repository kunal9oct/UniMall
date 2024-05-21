import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext({
  user: {},
  addUser: () => {},
  updateUser: () => {},
});

function userReducer(state, action) {
  if (action.type === "ADD_USER") {
    return { ...state, user: action.payload };
  }

  if (action.type === "UPDATE_USER") {
    return { ...state, user: action.payload };
  }

  return state;
}

export default function UserContextProvider({ children }) {
  const initialUser = {
    id: null,
    name: null,
    username: null,
    email: null,
    avatarImgURL: null,
    profileImgURL: null,
    authority: null,
  };

  const [userState, userDispatch] = useReducer(userReducer, {
    user: initialUser,
  });

  function handleAddUser(user) {
    userDispatch({
      type: "ADD_USER",
      payload: user,
    });
  }

  function handleUpdateUser(user) {
    userDispatch({
      type: "UPDATE_USER",
      payload: user,
    });
  }

  const ctxValue = {
    user: userState.user,
    addUser: handleAddUser,
    updateUser: handleUpdateUser,
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      handleAddUser(user);
    }
  }, []);

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
}
