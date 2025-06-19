import { useParams, useLocation, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import CourseNavigation from "./Navigation";
import Home             from "./Home";
import Modules          from "./Modules";
import Assignments      from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import People       from "./People"; 
import { FaAlignJustify } from "react-icons/fa";

export default function Courses() {
  const { cid } = useParams<{ cid: string }>();
  const location = useLocation();

  const course = useSelector((state: RootState) =>
    state.coursesReducer.all.find((c) => c._id === cid)
  );
  if (!course) return <h2 className="p-3">Course not found</h2>;

  const currentUser = useSelector((state: RootState) =>
    state.accountReducer.currentUser
  );
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course.name} &gt; {location.pathname.split("/")[4] || "Home"}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block bg-white border-end pe-4">
          <CourseNavigation isFaculty={isFaculty} />
        </div>
        <div className="flex-fill ps-4">
          <Routes>
            <Route index element={<Navigate to="Home" replace />} />

            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />

            <Route
              path="Assignments"
              element={<Assignments isFaculty={isFaculty} />}
            />
            <Route
              path="Assignments/:aid"
              element={<AssignmentEditor />}
            />

             <Route path="People"      element={<People />} />
             <Route path="Piazza" element={<h2 className="p-3">Piazza</h2>} />
            <Route path="Zoom" element={<h2 className="p-3">Zoom Meetings</h2>} />
            <Route path="Quizzes" element={<h2 className="p-3">Quizzes</h2>} />
            <Route path="Grades"  element={<h2 className="p-3">Grades</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
