import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ Component }) {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const navi = useNavigate();

  return (
    <>
      {isAuthenticated ? (
        <Component />
      ) : (
        <div>
          <p>You are not logged in. Please Sign In!</p>
          <button onClick={() => navi("/signin")}>Sign In</button>
        </div>
      )}
    </>
  );
}
