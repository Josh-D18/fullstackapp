import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../../config";
export default function CreateCourse() {
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");
  const [courseTitle, setCourseTitle] = useState();
  const [courseDescription, setCourseDescription] = useState();
  const [estimatedTime, setEstimatedTime] = useState();
  const [materialsNeeded, setMaterialsNeeded] = useState();
  const [errors, setErrors] = useState(false);
  const [signuperrors, setSignUpErrors] = useState();
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${URL}/api/courses`, {
        title: courseTitle,
        description: courseDescription,
        estimatedTime: estimatedTime,
        materialsNeeded: materialsNeeded,
        userId: id,
      })
      .then(() => {
        alert("Course Created!");
        navigate("/");
      })
      .catch((error) => {
        setErrors(true);
        setSignUpErrors(error.response.data.message);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "courseTitle") {
      setCourseTitle(e.target.value);
    } else if (e.target.name === "courseDescription") {
      setCourseDescription(e.target.value);
    } else if (e.target.name === "estimatedTime") {
      setEstimatedTime(e.target.value);
    } else if (e.target.name === "materialsNeeded") {
      setMaterialsNeeded(e.target.value);
    }
  };

  return (
    <>
      {" "}
      <div className="wrap">
        <h2
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          Create Course
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
          <div className="main--flex">
            <div>
              <label
                htmlFor="courseTitle"
                style={{
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Course Title
              </label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue=""
                onChange={handleChange}
              />

              <p
                style={{
                  marginTop: "0.1rem",
                  marginBottom: "0.1rem",
                  fontWeight: "bold",
                }}
              >
                By {firstName} {lastName}
              </p>

              <label
                htmlFor="courseDescription"
                style={{
                  marginTop: "1rem",
                  marginBottom: "0.3rem",
                  fontWeight: "bold",
                }}
              >
                Course Description
              </label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label
                style={{
                  marginTop: "0.1rem",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
                htmlFor="estimatedTime"
              >
                Estimated Time
              </label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue=""
                onChange={handleChange}
              />

              <label
                style={{
                  marginTop: "0.1rem",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
                htmlFor="materialsNeeded"
              >
                Materials Needed
              </label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <Link to="/" className="button button-secondary">
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
}
