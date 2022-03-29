import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import URL from "../../config";
import { default as ReactMarkdown } from "react-markdown";

export default function CourseDetail() {
  const userId = sessionStorage.getItem("id");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const [courseDetail, setCourseDetail] = useState();
  const params = useParams();
  let navigate = useNavigate();

  // Loading Course Detail Info when the screen renders
  useEffect(() => {
    const getCourseDetail = () => {
      axios
        .get(`${URL}/api/courses/${params.id}`)
        .then((res) => setCourseDetail(res.data))
        .catch((error) => {
          console.log({ error });
        });
    };
    getCourseDetail();
  }, [params.id]);

  const handleDelete = async () => {
    await axios
      .delete(`${URL}/api/courses/${params.id}`)
      .then(() => {
        alert("Your Course Has Been Deleted!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="wrap">
        <h2
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          Course Detail
        </h2>
        <form>
          {courseDetail &&
            [courseDetail].map((course) => {
              return (
                <div className="main--flex" key={course.id}>
                  <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p
                      style={{
                        marginTop: "0.1rem",
                        marginBottom: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      By {course.User.firstName} {course.User.lastName}
                    </p>
                    <ReactMarkdown>{course.description}</ReactMarkdown>
                  </div>
                  <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>

                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">
                      <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                    </ul>
                  </div>
                </div>
              );
            })}
        </form>
      </div>
      <div className="actions--bar">
        <div className="wrap">
          {courseDetail &&
          isAuthenticated &&
          Number(userId) === courseDetail.User.id ? (
            <>
              <Link className="button" to={`/courses/${params.id}/update`}>
                Update Course
              </Link>
              <button onClick={handleDelete} className="button">
                Delete Course
              </button>
              <button
                className="button button-secondary"
                onClick={() => navigate("/")}
              >
                Return to List
              </button>
            </>
          ) : (
            <>
              <button
                className="button button-secondary"
                onClick={() => navigate("/")}
              >
                Return to List
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
