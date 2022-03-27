import { useAuth, useNavigate, Route, Routes } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  return (
    <Route
      {...restOfProps}
      element={(props) => (isAuthenticated ? <Component {...props} /> : "")}
    />
  );
}
