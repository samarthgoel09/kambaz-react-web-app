
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as db from "./Database";

export default function Dashboard() {
  const courses = db.courses;

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={3} lg={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course d-flex justify-content-center">
              <Card style={{ width: 300 }}>
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
  src={course.image}
  variant="top"
  width="100%"
  height={160}
/>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description flex-grow-1 overflow-hidden"
                      style={{ height: 80 }}
                    >
                      {course.description}
                    </Card.Text>
                    <Button variant="primary" className="mt-2 align-self-start">
                      Go
                    </Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
