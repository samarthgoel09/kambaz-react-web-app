
import  { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment,
  updateAssignment,
} from "./reducer";
import type { RootState } from "../../store";

import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existing = useSelector((state: RootState) =>
    state.assignmentsReducer.assignments.find((a) => a._id === aid)
  );

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const [title, setTitle] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [points, setPoints] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

  useEffect(() => {
    if (aid !== "New") {
      if (!existing) {
        navigate(`/Kambaz/Courses/${cid}/Assignments`, { replace: true });
        return;
      }
      setTitle(existing.title);
      setDescriptionText(stripHtml(existing.descriptionHtml));
      setPoints(existing.points);
      setDueDate(existing.dueDate);
      setAvailableFrom(existing.availableFrom);
      setAvailableUntil(existing.availableUntil);
    }
  }, [aid, existing, cid, navigate]);

  if (aid !== "New" && !existing) {
    return <h2 className="p-3">Assignment not found</h2>;
  }

  if (!isFaculty && aid !== "New") {
    return (
      <div className="p-3">
        <h2>{existing!.title}</h2>
        <hr />
        <div className="mb-3">
          <strong>Description:</strong>
          <div
            className="border rounded p-3 mt-1"
            dangerouslySetInnerHTML={{ __html: existing!.descriptionHtml }}
          />
        </div>
        <div className="mb-2">
          <strong>Points:</strong> {existing!.points}
        </div>
        <div className="mb-2">
          <strong>Assignment Group:</strong> {existing!.group}
        </div>
        <div className="mb-2">
          <strong>Display Grade As:</strong> {existing!.displayGradeAs}
        </div>
        <div className="mb-4">
          <strong>Submission Type:</strong> {existing!.submissionType}
          {existing!.submissionType === "Online" && (
            <div className="border rounded p-3 mt-2">
              <strong>Online Entry Options:</strong>
              <ul className="mt-2 mb-0">
                {existing!.entryOptions.text && <li>Text Entry</li>}
                {existing!.entryOptions.website && <li>Website URL</li>}
                {existing!.entryOptions.media && <li>Media Recordings</li>}
                {existing!.entryOptions.annotation && <li>Student Annotation</li>}
                {existing!.entryOptions.file && <li>File Uploads</li>}
              </ul>
            </div>
          )}
        </div>
        <div className="mb-4">
          <strong>Assign to:</strong> {existing!.assignTo}
        </div>
        <div className="border rounded p-3 mb-4">
          <Row className="mb-3">
            <strong className="col-sm-3">Due:</strong>
            <Col sm={9}>{existing!.dueDate}</Col>
          </Row>
          <Row className="mb-3">
            <strong className="col-sm-3">Available from:</strong>
            <Col sm={9}>{existing!.availableFrom}</Col>
          </Row>
          <Row>
            <strong className="col-sm-3">Until:</strong>
            <Col sm={9}>{existing!.availableUntil}</Col>
          </Row>
        </div>
        <Link
          to={`../Assignments`}
          className="btn btn-secondary"
        >
          Back to Assignments
        </Link>
      </div>
    );
  }

  return (
    <div className="p-3">
      <h2>
        {aid === "New"
          ? `New Assignment for Course: ${cid}`
          : `Edit Assignment: ${existing!.title}`}
      </h2>
      <hr />
      <Form>
        <Form.Group controlId="wd-assn-title" className="mb-3">
          <Form.Label>Assignment Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter assignment name"
          />
        </Form.Group>

        <Form.Group controlId="wd-assn-desc" className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            placeholder="Enter plain-text description…"
          />
        </Form.Group>

        <Form.Group as={Row} controlId="wd-assn-points" className="mb-3">
          <Form.Label column sm={3}>
            Points
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value, 10) || 0)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="wd-assn-group" className="mb-3">
          <Form.Label column sm={3}>
            Assignment Group
          </Form.Label>
          <Col sm={6}>
            <Form.Select value="ASSIGNMENTS" disabled>
              <option>ASSIGNMENTS</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="wd-assn-display" className="mb-3">
          <Form.Label column sm={3}>
            Display Grade as
          </Form.Label>
          <Col sm={6}>
            <Form.Select value="Percentage" disabled>
              <option>Percentage</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group controlId="wd-assn-submission" className="mb-4">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select value="Online" disabled>
            <option>Online</option>
          </Form.Select>
          <div className="border rounded p-3 mt-2">
            <strong>Online Entry Options</strong>
            <Form.Check
              type="checkbox"
              label="Text Entry"
              checked
              disabled
              className="mt-2"
            />
            <Form.Check type="checkbox" label="Website URL" disabled />
            <Form.Check type="checkbox" label="Media Recordings" disabled />
            <Form.Check
              type="checkbox"
              label="Student Annotation"
              disabled
            />
            <Form.Check type="checkbox" label="File Uploads" disabled />
          </div>
        </Form.Group>

        <Row className="mb-4">
          <Col md={3}>
            <Form.Group controlId="wd-assn-assign" className="mb-3">
              <Form.Label>Assign to</Form.Label>
              <Form.Control value="Everyone" disabled />
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
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
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
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
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
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Assignments`, {
                replace: true,
              })
            }
            className="me-2"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              const htmlToStore = `<p>${descriptionText}</p>`;
              if (aid === "New") {
                dispatch(
                  addAssignment({
                    title: title.trim(),
                    course: cid!,
                    descriptionHtml: htmlToStore,
                    points,
                    group: "ASSIGNMENTS",
                    displayGradeAs: "Percentage",
                    submissionType: "Online",
                    entryOptions: {
                      text: true,
                      website: false,
                      media: false,
                      annotation: false,
                      file: true,
                    },
                    assignTo: "Everyone",
                    dueDate,
                    availableFrom,
                    availableUntil,
                  })
                );
              } else {
                dispatch(
                  updateAssignment({
                    _id: aid!,
                    title: title.trim(),
                    course: cid!,
                    descriptionHtml: htmlToStore,
                    points,
                    group: existing!.group,
                    displayGradeAs: existing!.displayGradeAs,
                    submissionType: existing!.submissionType,
                    entryOptions: existing!.entryOptions,
                    assignTo: existing!.assignTo,
                    dueDate,
                    availableFrom,
                    availableUntil,
                    editing: false,
                  })
                );
              }
              navigate(`/Kambaz/Courses/${cid}/Assignments`, {
                replace: true,
              });
            }}
            id="wd-save-assignment-click"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
