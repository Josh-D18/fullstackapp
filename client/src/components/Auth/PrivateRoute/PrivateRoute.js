import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ Component }) {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const navi = useNavigate();

  return (
    <>
      {/* Check if User is signed In. If user is signed in, give them access to the page. If not ask them to sign in */}
      {isAuthenticated ? (
        <Component />
      ) : (
        <div className="wrap center">
          <p className="space">You are not logged in. Please Sign In!</p>
          <button className="button" onClick={() => navi("/signin")}>
            Sign In
          </button>
        </div>
      )}
    </>
  );
}
