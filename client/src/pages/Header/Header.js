import { Link } from "react-router-dom";
import { UserContext } from "../../components/Context/index";
import { useContext } from "react";

export default function Header() {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");
  const { actions } = useContext(UserContext);

  return (
    <>
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
          </h1>
          <nav>
            {!isAuthenticated ? (
              <ul className="header--signedout">
                <li>
                  <Link to="signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </ul>
            ) : (
              <ul className="header--signedin">
                <li>
                  Welcome, {firstName} {lastName}!
                </li>
                <li onClick={() => actions.signOut()}>
                  <Link to="/signout">Sign Out</Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
