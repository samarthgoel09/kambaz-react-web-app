
import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  findAssignmentById,
  createAssignmentForCourse,
  updateAssignment,
  type Assignment as AssignmentType,
} from "./client";      
import { Form, Button, Spinner } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid = "", aid = "" } = useParams<{ cid?: string; aid?: string }>();
  const isNew = aid === "New";
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [availFrom, setAvailFrom] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availUntil, setAvailUntil] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isNew && aid) {
      setLoading(true);
      findAssignmentById(aid)
        .then((assn: AssignmentType) => {
          setTitle(assn.title);
          setDescription(assn.descriptionHtml.replace(/<[^>]*>/g, ""));
          setPoints(assn.points);
          setAvailFrom(assn.availableFrom || "");
          setDueDate(assn.dueDate || "");
          setAvailUntil(assn.availableUntil || "");
        })
        .catch((err) => console.error("Failed to load assignment:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [aid, isNew]);
  const handleSave = async () => {
    const payload: AssignmentType = {
      _id: aid,
      title: title.trim(),
      descriptionHtml: `<p>${description}</p>`,
      points,
      availableFrom: availFrom,
      dueDate,
      availableUntil: availUntil,
    };

    try {
      if (isNew) {
        await createAssignmentForCourse(cid, payload);
      } else {
        await updateAssignment(payload);
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`, { replace: true });
    } catch (err) {
      console.error("Failed to save assignment:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-3 text-center">
        <Spinner animation="border" role="status" />
        <div>Loading assignment…</div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <h2>
        {isNew
          ? `New Assignment for Course: ${cid}`
          : `Edit Assignment: ${title}`}
      </h2>
      <hr />

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="datetime-local"
            value={availFrom}
            onChange={(e) => setAvailFrom(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Available Until</Form.Label>
          <Form.Control
            type="datetime-local"
            value={availUntil}
            onChange={(e) => setAvailUntil(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Assignments`, {
                replace: true,
              })
            }
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
