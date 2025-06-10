

import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import { fetchAllCourses } from "./Courses/client";

interface Course {
  _id: string;
  name: string;
  number: string;
  description: string;
  image: string;
}

interface DashboardProps {
  courses: Course[];
  onAddCourse: (data: Omit<Course, "_id">) => Promise<Course>;
  onDeleteCourse: (courseId: string) => Promise<void>;
  onUpdateCourse: (course: Course) => Promise<void>;
  onEnrollCourse: (courseId: string) => Promise<void>;
  onUnenrollCourse: (courseId: string) => Promise<void>;
}

export default function Dashboard({
  courses: initialEnrolled,
  onAddCourse,
  onDeleteCourse,
  onUpdateCourse,
  onEnrollCourse,
  onUnenrollCourse,
}: DashboardProps) {
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  );
  if (!currentUser) {
    return <h2 className="p-3">Please sign in to see your Dashboard.</h2>;
  }
  const isFaculty = currentUser.role === "FACULTY";
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] =
    useState<Course[]>(initialEnrolled);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    setEnrolledCourses(initialEnrolled);
  }, [initialEnrolled]);

  useEffect(() => {
    fetchAllCourses()
      .then(setAllCourses)
      .catch(console.error);
  }, []);
  const [newCourse, setNewCourse] = useState<Omit<Course, "_id">>({
    name: "",
    number: "",
    description: "",
    image: "/images/react.jpg",
  });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);


const handleAdd = async () => {
  if (!newCourse.name.trim()) return;

  const tempId = `temp-${Date.now()}`;
  const tempCourse: Course = { _id: tempId, ...newCourse };
  setAllCourses(prev => [...prev, tempCourse]);
  setEnrolledCourses(prev => [...prev, tempCourse]);
  setNewCourse({ name: "", number: "", description: "", image: "/images/react.jpg" });

  try {
    const created = await onAddCourse(newCourse);
    if (created && created._id) {
      setAllCourses(prev => prev.map(c => c._id === tempId ? created : c));
      setEnrolledCourses(prev => prev.map(c => c._id === tempId ? created : c));
    }
  } catch (err) {
    console.error("Add course failed, but leaving it in UI:", err);
 
  }
};


  const handleUpdate = async () => {
    if (!editingCourse || !editingCourse.name.trim()) return;
    await onUpdateCourse(editingCourse);
    setAllCourses(prev =>
      prev.map(c => (c._id === editingCourse._id ? editingCourse : c))
    );
    setEnrolledCourses(prev =>
      prev.map(c => (c._id === editingCourse._id ? editingCourse : c))
    );
    setEditingCourse(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    await onDeleteCourse(id);
    setAllCourses(prev => prev.filter(c => c._id !== id));
    setEnrolledCourses(prev => prev.filter(c => c._id !== id));
  };

  const handleUnenroll = async (id: string) => {
    if (!window.confirm("Unenroll from this course?")) return;
    await onUnenrollCourse(id);
    setEnrolledCourses(prev => prev.filter(c => c._id !== id));
  };

  const handleEnroll = async (id: string) => {
    await onEnrollCourse(id);
    const newly = allCourses.find(c => c._id === id);
    if (newly) setEnrolledCourses(prev => [...prev, newly]);
  };

  const displayed = showAll ? allCourses : enrolledCourses;
  const enrolledIds = new Set(enrolledCourses.map(c => c._id));

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && !editingCourse && (
        <div className="mb-4">
          <h5>New Course</h5>
          <FormControl
            placeholder="Course Name"
            value={newCourse.name}
            onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
            id="wd-course-name"
            className="mb-2"
          />
          <FormControl
            placeholder="Course Number"
            value={newCourse.number}
            onChange={e => setNewCourse({ ...newCourse, number: e.target.value })}
            id="wd-course-number"
            className="mb-2"
          />
          <FormControl
            as="textarea"
            rows={3}
            placeholder="Course Description"
            value={newCourse.description}
            onChange={e => setNewCourse({
              ...newCourse,
              description: e.target.value
            })}
            id="wd-course-desc"
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
            onChange={e => setEditingCourse({ ...editingCourse, name: e.target.value })}
            id="wd-edit-course-name"
            className="mb-2"
          />
          <FormControl
            placeholder="Course Number"
            value={editingCourse.number}
            onChange={e => setEditingCourse({ ...editingCourse, number: e.target.value })}
            id="wd-edit-course-number"
            className="mb-2"
          />
          <FormControl
            as="textarea"
            rows={3}
            placeholder="Course Description"
            value={editingCourse.description}
            onChange={e => setEditingCourse({
              ...editingCourse,
              description: e.target.value
            })}
            id="wd-edit-course-desc"
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
      <div className="d-flex justify-content-end mb-2">
        <Button
          id="wd-toggle-enrollments"
          variant="secondary"
          onClick={() => setShowAll(prev => !prev)}
        >
          {showAll ? "Show Only Enrolled" : "Show All Courses"}
        </Button>
      </div>

      <h2 id="wd-dashboard-published">
        {showAll
          ? `All Courses (${displayed.length})`
          : `Your Enrolled Courses (${displayed.length})`}
      </h2>
      <hr />

      <Row xs={1} md={3} lg={5} className="g-4">
        {displayed.map(c => {
          const isEnrolled = enrolledIds.has(c._id);
          return (
            <Col key={c._id} className="wd-dashboard-course d-flex justify-content-center">
              <Card style={{ width: 300 }}>
                <Card.Img src={c.image} variant="top" height={160} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-nowrap overflow-hidden">
                    {c.name}
                  </Card.Title>
                  <Card.Text className="flex-grow-1 overflow-hidden" style={{ height: 80 }}>
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
                    ) : isEnrolled ? (
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
          );
        })}
      </Row>
    </div>
  );
}
