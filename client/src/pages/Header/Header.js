import { Link } from "react-router-dom";

export default function Header() {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");

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
                <li>
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
