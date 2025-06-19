import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchAssignments, createAssignment, updateAssignmentById, type Assignment } from "./reducer";
import { Form, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid = "", aid = "" } = useParams<{ cid?: string; aid?: string }>();
  const isNew = aid === "New";
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const existing = useSelector((s: RootState) =>
    s.assignmentsReducer.assignments.find((a) => a._id === aid)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [availFrom, setAvailFrom] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availUntil, setAvailUntil] = useState("");

  useEffect(() => {
    if (!isNew && !existing && cid) {
      dispatch(fetchAssignments(cid));
    } else if (existing) {
      setTitle(existing.title);
      setDescription(existing.descriptionHtml.replace(/<[^>]*>/g, ""));
      setPoints(existing.points);
      setAvailFrom(existing.availableFrom || "");
      setDueDate(existing.dueDate || "");
      setAvailUntil(existing.availableUntil || "");
    }
  }, [cid, existing, dispatch, isNew]);

  const handleSave = async () => {
    const payload: Assignment = {
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
        await dispatch(createAssignment({ cid, assn: payload })).unwrap();
      } else {
        await dispatch(updateAssignmentById(payload)).unwrap();
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`, { replace: true });
    } catch (err) {
      console.error("Failed to save assignment:", err);
    }
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
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Assignments`, { replace: true })
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
