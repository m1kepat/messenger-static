import { createContext, useState, useEffect, useMemo } from "react";

export const UsersContext = createContext();

export const usersData = [
  {
    username: "Earline.Crona",
    id: 0,
  },
  {
    username: "Dulce.Bartell",
    id: 1,
  },
  {
    username: "Leila62",
    id: 2,
  },
  {
    username: "Johnson71",
    id: 3,
  },
  {
    username: "Mandy69",
    id: 4,
  },
  {
    username: "Bonnie.Romaguera",
    id: 5,
  },
  {
    username: "Tony_Graham94",
    id: 6,
  },
  {
    username: "Kariane68",
    id: 7,
  },
  {
    username: "Christine6",
    id: 8,
  },
  {
    username: "Roy11",
    id: 9,
  },
  {
    username: "Raymond.Smitham",
    id: 10,
  },
  {
    username: "Tevin_Kutch99",
    id: 11,
  },
  {
    username: "Duane76",
    id: 12,
  },
  {
    username: "Anabelle_Mohr77",
    id: 13,
  },
  {
    username: "Sabrina_Langosh16",
    id: 14,
  },
  {
    username: "Jarret.Bashirian70",
    id: 15,
  },
  {
    username: "Jean81",
    id: 16,
  },
  {
    username: "Molly_Thompson",
    id: 17,
  },
  {
    username: "Wyatt37",
    id: 18,
  },
  {
    username: "Petra_Mohr52",
    id: 19,
  },
];

export const UsersProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loginValue, setLoginValue] = useState("");
  const [users] = useState(usersData);

  useEffect(() => {
    const savedLogin = localStorage.getItem("chat_login");
    const savedAuth = localStorage.getItem("chat_isAuth");

    if (savedLogin && savedAuth) {
      setLoginValue(savedLogin);
      setIsAuth(true);
    }
  }, []);

  const handleLogin = (login) => {
    setLoginValue(login);
    setIsAuth(true);
    localStorage.setItem("chat_login", login);
    localStorage.setItem("chat_isAuth", true);
  };

  const handleLogout = () => {
    localStorage.removeItem("chat_login");
    localStorage.removeItem("chat_isAuth");
    localStorage.removeItem("selected_chat");
    setIsAuth(false);
    setLoginValue("");
  };

  const currentUser = useMemo(() => {
    return users.find((user) => user.username === loginValue);
  }, [users, loginValue]);

  return (
    <UsersContext.Provider
      value={{
        isAuth,
        handleLogin,
        handleLogout,
        users,
        currentUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
