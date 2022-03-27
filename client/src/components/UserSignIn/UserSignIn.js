import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/index";

export default function UserSignIn() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { actions } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    actions.signIn(emailAddress, password);
  };

  const handleChange = (e) => {
    if (e.target.name === "emailAddress") {
      setEmailAddress(e.target.value);
    }

    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <article>
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            defaultValue=""
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            defaultValue=""
            onChange={handleChange}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <Link to="">
            <button className="button">Cancel</button>
          </Link>
        </form>
        <p>
          Don't have a user account? Click here to <Link to="/">sign up</Link>!
        </p>
      </article>
    </>
  );
}
