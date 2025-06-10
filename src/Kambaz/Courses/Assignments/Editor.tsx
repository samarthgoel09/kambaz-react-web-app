import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";

import {
  fetchAssignments,
  createAssignment,
  updateAssignmentById,
  type Assignment,
} from "./reducer";

import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const isNew = aid === "New";
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const existing = useSelector((s: RootState) =>
    s.assignmentsReducer.assignments.find((a) => a._id === aid)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [availFrom, setAvailFrom] = useState("");
  const [availUntil, setAvailUntil] = useState("");

  // Load list if needed, then populate
  useEffect(() => {
    if (!isNew && !existing && cid) {
      dispatch(fetchAssignments(cid));
    } else if (existing) {
      setTitle(existing.title);
      setDescription(existing.descriptionHtml.replace(/<[^>]*>/g, ""));
      setPoints(existing.points);
      setDueDate(existing.dueDate);
      setAvailFrom(existing.availableFrom);
      setAvailUntil(existing.availableUntil);
    }
  }, [existing, cid]);

  const handleSave = () => {
    const payload: Assignment = {
      _id: aid!,
      title: title.trim(),
      descriptionHtml: `<p>${description}</p>`,
      points,
      availableFrom: availFrom,
      dueDate,
      availableUntil: availUntil,
    };
    if (isNew) {
      dispatch(createAssignment({ cid: cid!, assn: payload }));
    } else {
      dispatch(updateAssignmentById(payload));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`, { replace: true });
  };

  return (
    <div className="p-3">
      <h2>
        {isNew
          ? `New Assignment for Course: ${cid}`
          : `Edit Assignment: ${title}`}
      </h2>
      <hr />
      <Form>
        <Form.Group controlId="wd-assn-title" className="mb-3">
          <Form.Label>Title</Form.Label>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col sm={3}>
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) =>
                setPoints(parseInt(e.target.value, 10) || 0)
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Available From
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="datetime-local"
              value={availFrom}
              onChange={(e) => setAvailFrom(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Due Date
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Form.Label column sm={2}>
            Available Until
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="datetime-local"
              value={availUntil}
              onChange={(e) => setAvailUntil(e.target.value)}
            />
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
            variant="primary"
            onClick={handleSave}
            id="wd-save-assignment-click"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
