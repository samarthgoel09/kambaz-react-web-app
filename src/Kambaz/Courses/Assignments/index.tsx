
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";

import {
  fetchAssignments,
  createAssignment,
  updateAssignmentById,
  deleteAssignmentById,
  setEditing,
  type Assignment,
} from "./reducer";

import {
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap";
import { FaSearch, FaPlus, FaRegFileAlt } from "react-icons/fa";
import { BsGripVertical, BsTrash, BsGear } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function Assignments({ isFaculty }: { isFaculty: boolean }) {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const assignments = useSelector(
    (s: RootState) => s.assignmentsReducer.assignments
  );
  const status = useSelector((s: RootState) => s.assignmentsReducer.status);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPoints, setNewPoints] = useState(0);
  const [newFrom, setNewFrom] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newUntil, setNewUntil] = useState("");
  useEffect(() => {
    if (cid) dispatch(fetchAssignments(cid));
  }, [cid, dispatch]);

  if (status === "loading") {
    return <div>Loading assignments…</div>;
  }

  const handleDelete = (aid: string) => {
    if (window.confirm("Delete this assignment?")) {
      dispatch(deleteAssignmentById(aid));
    }
  };

  const handleEditClick = (aid: string) => {
    dispatch(setEditing({ id: aid, editing: true }));
  };

  const handleSaveInline = (a: Assignment) => {
    dispatch(updateAssignmentById({ ...a, editing: false }));
  };

  const handleAddAssignment = () => {
    if (!newTitle.trim()) return;
    const payload = {
      title: newTitle.trim(),
      descriptionHtml: `<p>${newDesc}</p>`,
      points: newPoints,
      availableFrom: newFrom,
      dueDate: newDueDate,
      availableUntil: newUntil,
    };
    dispatch(createAssignment({ cid: cid!, assn: payload }));
    setShowAdd(false);
    setNewTitle("");
    setNewDesc("");
    setNewPoints(0);
    setNewFrom("");
    setNewDueDate("");
    setNewUntil("");
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center mb-4">
        <InputGroup style={{ maxWidth: 300 }} className="me-auto">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search…" />
        </InputGroup>
        {isFaculty && (


           <><Button
            id="wd-add-group-click"
            variant="light"
            size="lg"
            className="me-2 border border-secondary text-dark"
          >
            <FaPlus className="me-1" /> Group
          </Button><Button
            id="wd-add-assignment-click"
            variant="danger"
            size="lg"
            onClick={() => setShowAdd(true)}
          >
              <FaPlus className="me-1" /> Assignment
            </Button></>
        )}
      </div>

      <ListGroup className="rounded-0 mb-3">
        <ListGroup.Item className="p-0 border">
          <div className="d-flex justify-content-between align-items-center p-3 bg-light border">
            <strong>ASSIGNMENTS</strong>
          </div>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup className="rounded-0">
        {assignments.map((a) => (
          <ListGroup.Item
            key={a._id}
            className="d-flex justify-content-between align-items-start mb-2 p-3 border"
            style={{ borderLeft: "5px solid #198754" }}
          >
            <div className="flex-grow-1">
              {a.editing && isFaculty ? (
                <FormControl
                  value={a.title}
                  onChange={(e) =>
                    dispatch(updateAssignmentById({ ...a, title: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveInline(a);
                    }
                  }}
                  className="me-3"
                />
              ) : (
                <>
                  <div className="d-flex align-items-center mb-1">
                    <BsGripVertical className="me-2" />
                    <FaRegFileAlt className="me-2 text-success" />
                    <Link
                      to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <strong style={{ fontSize: "1.1rem" }}>{a.title}</strong>
                    </Link>
                  </div>
                  <div
                    className="text-secondary mb-1"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <strong>Not available until</strong> {a.availableFrom || "TBD"}
                  </div>
                  <div
                    className="text-secondary"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <strong>Due</strong> {a.dueDate || "TBD"} | {a.points} pts
                  </div>
                </>
              )}
            </div>

            <div className="d-flex align-items-center">
              {isFaculty && !a.editing && (
                <>
                  <BsGear
                    onClick={() => handleEditClick(a._id)}
                    className="text-primary me-3 fs-5"
                  />
                  <BsTrash
                    onClick={() => handleDelete(a._id)}
                    className="text-danger fs-5 me-3"
                  />
                </>
              )}
              {a.editing && <GreenCheckmark className="me-3" />}
              <IoEllipsisVertical className="fs-4 text-secondary" />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Add Assignment Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <FormControl
                placeholder="Assignment title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FormControl
                as="textarea"
                rows={3}
                placeholder="Describe assignment…"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <FormControl
                type="number"
                value={newPoints}
                onChange={(e) => setNewPoints(+e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Available From</Form.Label>
              <FormControl
                type="datetime-local"
                value={newFrom}
                onChange={(e) => setNewFrom(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <FormControl
                type="datetime-local"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Available Until</Form.Label>
              <FormControl
                type="datetime-local"
                value={newUntil}
                onChange={(e) => setNewUntil(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
          <Button
            id="wd-save-assignment-click"
            variant="primary"
            onClick={handleAddAssignment}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
