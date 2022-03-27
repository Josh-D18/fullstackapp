import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import URL from "../../config";
export default function Courses() {
  const [course, setCourse] = useState();

  useEffect(() => {
    const getCourse = () => {
      axios
        .get(`${URL}/api/courses/`)
        .then((res) => {
          setCourse(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getCourse();
  }, []);

  return (
    <>
      {" "}
      <div className="wrap main--grid">
        {course &&
          course.map((item) => {
            return (
              <div key={item.id}>
                <Link
                  className="course--module course--link"
                  to={`/courses/${item.id}`}
                >
                  <h2 className="course--label">Course</h2>
                  <h3 className="course--title">{item.title}</h3>
                </Link>
              </div>
            );
          })}
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </>
  );
}
