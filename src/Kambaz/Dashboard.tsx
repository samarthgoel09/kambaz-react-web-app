
import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchAllCourses as fetchAllCoursesAPI,
  createCourse as createCourseAPI,
  updateCourse as updateCourseAPI,
  deleteCourse as deleteCourseAPI,
} from "./Courses/client";
import {
  findMyCourses as fetchMyCoursesAPI,
  enrollInCourse as enrollAPI,
  unenrollFromCourse as unenrollAPI,
} from "./Account/client";
import type { RootState } from "./store";
import {
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export interface Course {
  _id: string;
  name: string;
  number: string;
  description: string;
  image: string;
  enrolled?: boolean;
}

export default function Dashboard() {
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  );
  if (!currentUser) {
    return <h2 className="p-3">Please sign in to see your Dashboard.</h2>;
  }
  const isFaculty = currentUser.role === "FACULTY";

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [showAll, setShowAll] = useState<boolean>(true);

  const [newCourse, setNewCourse] = useState<Omit<Course, "_id">>({
    name: "",
    number: "",
    description: "",
    image: "/images/react.jpg",
  });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const loadCourses = async () => {
    try {
      const all = await fetchAllCoursesAPI();
      setAllCourses(all);
    } catch (err) {
      console.error("load all failed", err);
      setAllCourses([]);
    }
    try {
      const mine = await fetchMyCoursesAPI();
      setEnrolledCourses(mine);
    } catch (err) {
      console.error("load mine failed", err);
      setEnrolledCourses([]);
    }
  };

  useEffect(() => {
    loadCourses();
  }, [currentUser]);

  const handleAdd = async () => {
    if (!newCourse.name.trim()) return;
    try {
      await createCourseAPI(newCourse);
      setNewCourse({
        name: "",
        number: "",
        description: "",
        image: "/images/react.jpg",
      });
      await loadCourses();
    } catch (err) {
      console.error("add failed", err);
    }
  };

  const handleUpdate = async () => {
    if (!editingCourse || !editingCourse.name.trim()) return;
    try {
      await updateCourseAPI(editingCourse);
      setEditingCourse(null);
      await loadCourses();
    } catch (err) {
      console.error("update failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await deleteCourseAPI(id);
      await loadCourses();
    } catch (err) {
      console.error("delete failed", err);
    }
  };

  const handleEnroll = async (id: string) => {
    try {
      await enrollAPI(id);
      const mine = await fetchMyCoursesAPI();
      setEnrolledCourses(mine);
    } catch (err: any) {
      if (err.response?.status === 409) {
        console.warn("already enrolled");
      } else {
        console.error("enroll failed", err);
      }
    }
  };

  const handleUnenroll = async (id: string) => {
    if (!window.confirm("Unenroll from this course?")) return;
    try {
      await unenrollAPI(id);
      setEnrolledCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("unenroll failed", err);
    }
  };

  // remove any null/undefined entries
  const safeAll = allCourses.filter(
    (c): c is Course => c != null
  );
  const safeEnrolled = enrolledCourses.filter(
    (c): c is Course => c != null
  );

  // build displayed list
  const rawDisplayed = showAll
    ? safeAll.map((c) => ({
        ...c,
        enrolled: safeEnrolled.some((e) => e._id === c._id),
      }))
    : safeEnrolled;

  const displayed = rawDisplayed; // already safe

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title" className="d-flex justify-content-between">
        Dashboard
        <Button
          id="wd-toggle-enrollments"
          variant="secondary"
          onClick={() => setShowAll((s) => !s)}
        >
          {showAll ? "Show Only Enrolled" : "Show All Courses"}
        </Button>
      </h1>
      <hr />

      {isFaculty && !editingCourse && (
        <div className="mb-4">
          <h5>New Course</h5>
          <FormControl
            placeholder="Course Name"
            value={newCourse.name}
            onChange={(e) =>
              setNewCourse({ ...newCourse, name: e.target.value })
            }
            className="mb-2"
          />
          <FormControl
            placeholder="Course Number"
            value={newCourse.number}
            onChange={(e) =>
              setNewCourse({ ...newCourse, number: e.target.value })
            }
            className="mb-2"
          />
          <FormControl
            as="textarea"
            rows={3}
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                description: e.target.value,
              })
            }
            className="mb-2"
          />
          <Button
            id="wd-add-new-course-btn"
            variant="primary"
            onClick={handleAdd}
            disabled={!newCourse.name.trim()}
          >
            Add Course
          </Button>
          <hr />
        </div>
      )}

      {isFaculty && editingCourse && (
        <div className="mb-4">
          <h5>Edit Course</h5>
          <FormControl
            placeholder="Course Name"
            value={editingCourse.name}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, name: e.target.value })
            }
            className="mb-2"
          />
          <FormControl
            placeholder="Course Number"
            value={editingCourse.number}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, number: e.target.value })
            }
            className="mb-2"
          />
          <FormControl
            as="textarea"
            rows={3}
            placeholder="Description"
            value={editingCourse.description}
            onChange={(e) =>
              setEditingCourse({
                ...editingCourse,
                description: e.target.value,
              })
            }
            className="mb-2"
          />
          <ButtonGroup>
            <Button
              id="wd-update-course-btn"
              variant="warning"
              onClick={handleUpdate}
              disabled={!editingCourse.name.trim()}
            >
              Update
            </Button>
            <Button
              id="wd-cancel-update-btn"
              variant="secondary"
              onClick={() => setEditingCourse(null)}
            >
              Cancel
            </Button>
          </ButtonGroup>
          <hr />
        </div>
      )}

      <h2 id="wd-dashboard-published">
        {showAll
          ? `All Courses (${displayed.length})`
          : `Your Enrolled Courses (${displayed.length})`}
      </h2>
      <Row xs={1} md={3} lg={5} className="g-4">
        {displayed.map((c) => (
          <Col
            key={c._id}
            className="wd-dashboard-course d-flex justify-content-center"
          >
            <Card style={{ width: 300 }}>
              <Card.Img src={c.image} variant="top" height={160} />
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
                <ButtonGroup className="mt-auto w-100">
                  <Link
                    to={`/Kambaz/Courses/${c._id}/Home`}
                    className="btn btn-primary flex-grow-1"
                  >
                    Go
                  </Link>
                  {isFaculty ? (
                    <>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => setEditingCourse(c)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : c.enrolled ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleUnenroll(c._id)}
                    >
                      Unenroll
                    </Button>
                  ) : (
                    showAll && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleEnroll(c._id)}
                      >
                        Enroll
                      </Button>
                    )
                  )}
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
