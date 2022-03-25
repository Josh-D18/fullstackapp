import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Courses from "./components/Courses/Courses";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import UpdateCourse from "./components/UpdateCourse/UpdateCourse";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import UserSignIn from "./components/UserSignIn/UserSignIn";
import UserSignOut from "./pages/UserSignOut/UserSignOut";
import UserSignUp from "./components/UserSignUp/UserSignUp";

function App() {
  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:5000")
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log({ res });
        });
    };
    getData();
  }, []);
  return (
    <section className="App">
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/signup" element={<UserSignUp />} />
      </Routes>
    </section>
  );
}

export default App;
