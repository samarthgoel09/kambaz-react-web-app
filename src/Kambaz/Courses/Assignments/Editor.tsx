import {
  Form,
  Button,
  Card,      
  Row,
  Col,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <Form className="p-3">

      <Form.Group controlId="assignmentName" className="mb-4">
        <Form.Label>Assignment Name</Form.Label>
<Form.Control
   type="text"
   placeholder="Enter assignment title"
   defaultValue="A1"
/>      </Form.Group>

      <Form.Group controlId="assignmentDescription" className="mb-4">
        <Form.Label>Description</Form.Label>
        <Card className="border mb-3">
          <Card.Body>
            <p>
              The assignment is{" "}
              <a href="#" className="text-danger">
                available online
              </a>
              .
            </p>
            <p>
              Submit a link to the landing page of your Web application
              running on Netlify.
            </p>
            <ul>
              <li>Your full name and section</li>
              <li>Links to each of the lab assignments</li>
              <li>Link to the Kanbaz application</li>
              <li>Links to all relevant source code repositories</li>
            </ul>
            <p>
              The Kanbaz application should include a link to navigate back to
              the landing page.
            </p>
          </Card.Body>
        </Card>
      </Form.Group>
      <Form.Group as={Row} controlId="points" className="mb-3">
        <Form.Label column xs={12} sm={3}>
          Points
        </Form.Label>
        <Col xs={12} sm={9}>
          <Form.Control type="number" defaultValue={100} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="assignmentGroup" className="mb-3">
        <Form.Label column xs={12} sm={3}>
          Assignment Group
        </Form.Label>
        <Col xs={12} sm={9}>
          <Form.Select defaultValue="assignments">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="displayAs" className="mb-3">
        <Form.Label column xs={12} sm={3}>
          Display Grade as
        </Form.Label>
        <Col xs={12} sm={9}>
          <Form.Select defaultValue="percentage">
            <option>Percentage</option>
            <option>Letter</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4" controlId="submissionType">
    <Form.Label column xs={12} sm={3}>
      Submission Type
    </Form.Label>
    <Col xs={12} sm={9}>
      <div className="border rounded p-3">
        <Form.Select
  defaultValue="online"    
  className="mb-3"
  style={{ boxShadow: "none" }}
>
  <option value="online">Online</option>
  <option value="offline">Offline</option>
</Form.Select>
        <div className="fw-semibold mb-2">Online Entry Options</div>
        <Form.Check type="checkbox" label="Text Entry" className="mb-2" />
       <Form.Check
          type="checkbox"
          label="Website URL"
          defaultChecked
          className="mb-2"
        />
       <Form.Check type="checkbox" label="Media Recordings" className="mb-2" />
        <Form.Check type="checkbox" label="Student Annotation" className="mb-2" />
        <Form.Check type="checkbox" label="File Uploads" />
      </div>
    </Col>
  </Form.Group>
      <Form.Group as={Row} controlId="assignTo" className="mb-4">
        <Form.Label column xs={12} sm={3}>
          Assign to
        </Form.Label>
        <Col xs={12} sm={9}>
          <Form.Control defaultValue="Everyone" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="dueDate" className="mb-4">
        <Form.Label column xs={12} sm={3}>
          Due
        </Form.Label>
        <Col xs={12} sm={9}>
          <Form.Control type="date" defaultValue="2024-05-13" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="availableFrom" className="mb-4">
        <Form.Label column xs={12} sm={3}>
          Available from
        </Form.Label>
        <Col xs={12} sm={9}>
          <Form.Control type="date" defaultValue="2024-05-06" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="availableUntil" className="mb-4">
        <Form.Label column xs={12} sm={3}>
          Until
        </Form.Label>
        <Col xs={12} sm={9}>
          <Form.Control type="date" defaultValue="2024-05-20" />
        </Col>
      </Form.Group>
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-2">
          Cancel
        </Button>
        <Button variant="danger">Save</Button>
      </div>
    </Form>
  );
}
