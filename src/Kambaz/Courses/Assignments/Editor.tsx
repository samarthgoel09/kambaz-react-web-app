
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import { Form, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignment = db.assignments.find((a) => a._id === aid);

  if (!assignment) {
    return <h2 className="p-3">Assignment not found</h2>;
  }

  return (
    <div className="p-3">
      <h2>{assignment.title}</h2>
      <hr />
      <Form>
        <Form.Group controlId="wd-assn-name" className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control defaultValue={assignment.title} />
        </Form.Group>
        <Form.Group controlId="wd-assn-desc" className="mb-4">
         <div
           className="border rounded p-3"
           dangerouslySetInnerHTML={{ __html: assignment.descriptionHtml }}
         />
       </Form.Group>
        <Form.Group as={Row} controlId="wd-assn-points" className="mb-3">
          <Form.Label column sm={3}>
            Points
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              type="number"
              defaultValue={assignment.points}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="wd-assn-group" className="mb-3">
          <Form.Label column sm={3}>
            Assignment Group
          </Form.Label>
          <Col sm={6}>
            <Form.Select defaultValue={assignment.group}>
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>DISCUSSIONS</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="wd-assn-display" className="mb-3">
          <Form.Label column sm={3}>
            Display Grade as
          </Form.Label>
          <Col sm={6}>
            <Form.Select defaultValue={assignment.displayGradeAs}>
              <option>Percentage</option>
              <option>Points</option>
              <option>Letter</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group controlId="wd-assn-submission" className="mb-4">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select defaultValue={assignment.submissionType}>
            <option>Online</option>
            <option>On Paper</option>
            <option>No Submission</option>
          </Form.Select>
          {assignment.submissionType === "Online" && (
   <div className="border rounded p-3 mt-2">
     <strong>Online Entry Options</strong>
     <Form.Check
       type="checkbox"
       label="Text Entry"
      defaultChecked={assignment.entryOptions.text}
       className="mt-2"
     />
     <Form.Check
       type="checkbox"
       label="Website URL"
      defaultChecked={assignment.entryOptions.website}
     />
     <Form.Check
       type="checkbox"
       label="Media Recordings"
       defaultChecked={assignment.entryOptions.media}
     />
     <Form.Check
       type="checkbox"
       label="Student Annotation"
       defaultChecked={assignment.entryOptions.annotation}
     />
     <Form.Check
       type="checkbox"
       label="File Uploads"
       defaultChecked={assignment.entryOptions.file}
     />
   </div>
 )}
        </Form.Group>
        <Row className="mb-4">
          <Col md={3}>
            <Form.Group controlId="wd-assn-assign">
              <Form.Label>Assign to</Form.Label>
              <Form.Control defaultValue={assignment.assignTo} />
            </Form.Group>
          </Col>
          <Col md={9}>
            <div className="border rounded p-3">
              <Row className="mb-3">
                <Form.Label column sm={3}>
                  Due
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="datetime-local"
                    defaultValue={assignment.dueDate}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Label column sm={3}>
                  Available from
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="datetime-local"
                    defaultValue={assignment.availableFrom}
                  />
                </Col>
              </Row>
              <Row>
                <Form.Label column sm={3}>
                  Until
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="datetime-local"
                    defaultValue={assignment.availableUntil}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments`}
            className="btn btn-danger"
          >
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
