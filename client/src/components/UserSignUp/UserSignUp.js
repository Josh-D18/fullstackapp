import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../../config";

export default function UserSignUp() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState(false);
  const [signuperrors, setSignUpErrors] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${URL}/api/users`, {
        emailAddress: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        signuperrors: signuperrors,
      })
      .then(() => {
        alert("Your Profile Was Made!");
        navigate("/signin");
      })
      .catch((error) => {
        setErrors(true);
        setSignUpErrors(error.response.data.message);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "emailAddress") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <div className="form--centered">
        <h2
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </h2>
        {errors ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {signuperrors &&
                signuperrors.map((error, i) => {
                  return <li key={i}>{error}</li>;
                })}
            </ul>
          </div>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <label
            style={{
              marginTop: "0.1rem",
              marginBottom: "0.3rem",
            }}
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            defaultValue=""
            onChange={handleChange}
          />
          <label
            style={{
              marginTop: "0.1rem",
              marginBottom: "0.3rem",
            }}
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            defaultValue=""
            onChange={handleChange}
          />
          <label
            style={{
              marginTop: "0.1rem",
              marginBottom: "0.3rem",
            }}
            htmlFor="emailAddress"
          >
            Email Address
          </label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            defaultValue=""
            onChange={handleChange}
          />
          <label
            style={{
              marginTop: "0.1rem",
              marginBottom: "0.3rem",
            }}
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            defaultValue=""
            onChange={handleChange}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary">Cancel</button>
        </form>
        <p
          style={{
            marginTop: "1rem",
            marginBottom: "0.3rem",
          }}
        >
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </>
  );
}
