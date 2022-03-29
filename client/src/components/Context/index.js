import { useNavigate } from "react-router-dom";
import React, { createContext } from "react";
import axios from "axios";
import URL from "../../config";
export const UserContext = createContext();

export const Provider = (props) => {
  const navigate = useNavigate();

  const signIn = async (emailAddress, password) => {
    await axios
      .get(`${URL}/api/users`, {
        auth: {
          username: emailAddress,
          password: password,
        },
      })
      .then((res) => {
        sessionStorage.setItem("firstName", res.data[0].firstName);
        sessionStorage.setItem("lastName", res.data[0].lastName);
        sessionStorage.setItem("Email", res.data[0].emailAddress);
        sessionStorage.setItem("id", res.data[0].id);
        sessionStorage.setItem("isAuthenticated", true);
        navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const signOut = () => {
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("id");
    navigate("/");
    window.location.reload(false);
  };

  return (
    <UserContext.Provider
      value={{
        actions: {
          signIn: signIn,
          signOut: signOut,
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
