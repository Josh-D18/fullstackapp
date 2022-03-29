import axios from "axios";
import URL from "../../config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UpdateCourse() {
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");
  const [errors, setErrors] = useState(false);
  const [signuperrors, setSignUpErrors] = useState();
  const navigate = useNavigate();
  const paramsId = useParams().id;
  const [courseTitle, setCourseTitle] = useState();
  const [courseDescription, setCourseDescription] = useState();
  const [estimatedTime, setEstimatedTime] = useState();
  const [materialsNeeded, setMaterialsNeeded] = useState();
  const id = sessionStorage.getItem("id");
  const [courseDetail, setCourseDetail] = useState();

  useEffect(() => {
    const getCourseDetail = () => {
      axios
        .get(`${URL}/api/courses/${paramsId}`)
        .then((res) => setCourseDetail(res.data))
        .catch((error) => {
          console.log({ error });
        });
    };
    getCourseDetail();
  }, [paramsId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`${URL}/api/courses/${paramsId}`, {
        title: courseTitle,
        description: courseDescription,
        estimatedTime: estimatedTime,
        materialsNeeded: materialsNeeded,
        userId: id,
      })
      .then(() => {
        alert("Course Updated!");
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
          Update Course
        </h2>
        {errors ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {signuperrors ? (
                signuperrors.map((error, i) => <li key={i}>{error}</li>)
              ) : (
                <li>{signuperrors}</li>
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label
                style={{
                  marginTop: "0.3rem",
                  marginBottom: "0.3rem",
                  fontWeight: "bold",
                }}
                htmlFor="courseTitle"
              >
                Course Title
              </label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue={courseDetail && courseDetail.title}
                onChange={handleChange}
              />

              <p
                style={{
                  marginTop: "0.1rem",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                By {(courseDetail && courseDetail.User.firstName) || firstName}{" "}
                {(courseDetail && courseDetail.User.lastName) || lastName}
              </p>

              <label
                style={{
                  marginTop: "0.3rem",
                  marginBottom: "0.3rem",
                  fontWeight: "bold",
                }}
                htmlFor="courseDescription"
              >
                Course Description
              </label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                onChange={handleChange}
                defaultValue={courseDetail && courseDetail.description}
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
                defaultValue={courseDetail && courseDetail.estimatedTime}
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
                defaultValue={courseDetail && courseDetail.materialsNeeded}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <Link to="/" className="button button-secondary">
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
}
