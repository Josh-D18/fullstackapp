import "./App.css";
import { Provider } from "./components/Context/index";
import { Routes, Route } from "react-router-dom";
import Courses from "./components/Courses/Courses";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import UpdateCourse from "./components/UpdateCourse/UpdateCourse";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import UserSignIn from "./components/UserSignIn/UserSignIn";
import UserSignOut from "./pages/UserSignOut/UserSignOut";
import UserSignUp from "./components/UserSignUp/UserSignUp";
import PrivateRoute from "./components/Auth/PrivateRoute/PrivateRoute";
import Header from "./pages/Header/Header";

function App() {
  return (
    <section className="App">
      {/* Wrapped Routes In Provider Component. All routes have access to context functions */}
      <Provider>
        <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route
            path="/courses/create/"
            element={<PrivateRoute Component={CreateCourse} />}
          />
          <Route
            path="/courses/:id/update/"
            element={<PrivateRoute Component={UpdateCourse} />}
          />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/signup" element={<UserSignUp />} />
        </Routes>
      </Provider>
    </section>
  );
}

export default App;
