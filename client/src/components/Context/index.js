import React, { useState, createContext } from "react";
import axios from "axios";
import URL from "../../config";
export const UserContext = createContext();

export const Provider = (props) => {
  const [userData, setUserData] = useState();

  const signIn = async (emailAddress, password) => {
    await axios
      .get(`${URL}/api/users`, {
        auth: {
          username: emailAddress,
          password: password,
        },
      })
      .then((res) => {
        setUserData(res.data);
        sessionStorage.setItem("Name", userData[0].firstName);
        sessionStorage.setItem("Email", userData[0].emailAddress);
        sessionStorage.setItem("isAuthenticated", true);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const signOut = () => {
    sessionStorage.removeItem("Name");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("isAuthenticated");
  };

  return (
    <UserContext.Provider
      value={{
        actions: {
          signIn: signIn,
          signOut: signOut,
          userData: userData,
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
