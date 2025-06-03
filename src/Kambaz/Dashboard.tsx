import  { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  FormControl,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store";
import {
  enrollCourse,
  unenrollCourse,
} from "./enrollmentReducer";
import * as db from "./Database";

export default function Dashboard() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const enrollments = useSelector(
    (state: RootState) => state.enrollmentReducer
  );
  const dispatch = useDispatch();

  if (!currentUser) {
    return <h2 className="p-3">Please sign in to see your Dashboard.</h2>;
  }

  const isFaculty = currentUser.role === "FACULTY";

  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "",
    name: "",
    description: "",
    image: "/images/react.jpg",
  });

  const addNewCourse = () => {
    if (!course.name.trim()) return;
    const newCourse = {
      ...course,
      _id: String(Date.now()),
      image: course.image || "/images/react.jpg",
    };
    setCourses([...courses, newCourse]);
    setCourse({
      _id: "",
      name: "",
      description: "",
      image: "/images/react.jpg",
    });
  };

  const updateCourse = () => {
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
    setCourse({
      _id: "",
      name: "",
      description: "",
      image: "/images/react.jpg",
    });
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((c) => c._id !== courseId));

  };

  const myEnrolledCourseIds = new Set(
    enrollments
      .filter((en) => en.user === currentUser._id)
      .map((en) => en.course)
  );

  const myEnrolledCourses = courses.filter((c) =>
    myEnrolledCourseIds.has(c._id)
  );

  const [showAll, setShowAll] = useState(false);
  const displayedCourses = showAll ? courses : myEnrolledCourses;

  const handleEnroll = (courseId: string) => {
    dispatch(enrollCourse(currentUser._id, courseId));
  };
  const handleUnenroll = (courseId: string) => {
    dispatch(unenrollCourse(currentUser._id, courseId));
  };

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>


      <div className="d-flex justify-content-end mb-2">
        <Button
          variant="primary"
          onClick={() => setShowAll((prev) => !prev)}
          id="wd-toggle-enrollments"
        >
          {showAll ? "Show Only Enrolled" : "Show All Courses"}
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              id="wd-add-new-course-click"
              variant="primary"
              className="float-end"
              onClick={addNewCourse}
              disabled={!course.name.trim()}
            >
              Add
            </Button>
            <Button
              id="wd-update-course-click"
              variant="warning"
              className="float-end me-2"
              onClick={updateCourse}
              disabled={!course._id}
            >
              Update
            </Button>
          </h5>
          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={course.name}
            onChange={(e) =>
              setCourse({ ...course, name: e.target.value })
            }
            id="wd-course-name"
          />
          <FormControl
            as="textarea"
            rows={3}
            className="mb-4"
            placeholder="Course Description"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            id="wd-course-desc"
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAll
          ? `All Courses (${displayedCourses.length})`
          : `Your Enrolled Courses (${displayedCourses.length})`}
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={3} lg={5} className="g-4">
          {displayedCourses.map((c) => {
            const isEnrolled = myEnrolledCourseIds.has(c._id);

            return (
              <Col
                key={c._id}
                className="wd-dashboard-course d-flex justify-content-center"
              >
                <Card style={{ width: 300 }}>
                  <Card.Img
                    src={c.image || "/images/react.jpg"}
                    variant="top"
                    height={160}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-nowrap overflow-hidden">
                      {c.name}
                    </Card.Title>
                    <Card.Text
                      className="flex-grow-1 overflow-hidden"
                      style={{ height: 80 }}
                    >
                      {c.description}
                    </Card.Text>

                    <div className="mb-2">
                      {isEnrolled ? (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleUnenroll(c._id)}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleEnroll(c._id)}
                        >
                          Enroll
                        </Button>
                      )}
                    </div>

                    <ButtonGroup className="mt-auto w-100">
                      {isEnrolled ? (
                        <Link
                          to={`/Kambaz/Courses/${c._id}/Home`}
                          className="btn btn-primary"
                        >
                          Go
                        </Link>
                      ) : (
                        <Button variant="secondary" disabled style={{ flex: 1 }}>
                          Go
                        </Button>
                      )}

                      {isFaculty && isEnrolled && (
                        <>
                          <Button
                            id="wd-delete-course-click"
                            variant="danger"
                            size="sm"
                            onClick={() => deleteCourse(c._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            id="wd-edit-course-click"
                            variant="warning"
                            size="sm"
                            onClick={() => setCourse(c)}
                          >
                            Edit
                          </Button>
                        </>
                      )}
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
