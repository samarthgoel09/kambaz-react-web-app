
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  deleteAssignment,
  editAssignment,
  updateAssignment,
} from "./reducer";
import type { RootState } from "../../store";

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
import "../../styles.css";

interface AssignmentsProps {
  isFaculty: boolean;
}

export default function Assignments({ isFaculty }: AssignmentsProps) {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPoints, setNewPoints] = useState(0);
  const [newDueDate, setNewDueDate] = useState("");
  const [newAvailableFrom, setNewAvailableFrom] = useState("");
  const [newAvailableUntil, setNewAvailableUntil] = useState("");

  const assignments = useSelector((state: RootState) =>
    state.assignmentsReducer.assignments.filter((a) => a.course === cid)
  );

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleAddAssignment = () => {
    if (newTitle.trim()) {
      dispatch(
        addAssignment({
          title: newTitle.trim(),
          course: cid!,
          descriptionHtml: newDescription.trim(),
          points: newPoints,
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
          dueDate: newDueDate,
          availableFrom: newAvailableFrom,
          availableUntil: newAvailableUntil,
        })
      );
      setNewTitle("");
      setNewDescription("");
      setNewPoints(0);
      setNewDueDate("");
      setNewAvailableFrom("");
      setNewAvailableUntil("");
      handleCloseAdd();
    }
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  const handleEditAssignment = (assignmentId: string) => {
    dispatch(editAssignment(assignmentId));
  };

  const handleUpdateAssignment = (updated: any) => {
    dispatch(updateAssignment(updated));
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
          <>
            <Button
              variant="light"
              size="lg"
              className="me-2 border border-secondary text-dark"
            >
              <FaPlus className="me-1" /> Group
            </Button>
            <Button variant="danger" size="lg" onClick={handleShowAdd}>
              <FaPlus className="me-1" /> Assignment
            </Button>
          </>
        )}
      </div>

      <ListGroup className="rounded-0 mb-3">
        <ListGroup.Item className="p-0" style={{ border: "1px solid #dee2e6" }}>
          <div
            className="d-flex justify-content-between align-items-center p-3 bg-light"
            style={{ border: "1px solid #dee2e6" }}
          >
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2" />
              <strong>ASSIGNMENTS</strong>
            </div>
            <div className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                size="sm"
                className="me-2 rounded-pill"
              >
                40% of Total
              </Button>
              {isFaculty && <FaPlus className="me-3" />}
              {isFaculty && <IoEllipsisVertical />}
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup className="rounded-0">
        {assignments.map((a) => (
          <ListGroup.Item
            key={a._id}
            className="d-flex justify-content-between align-items-start mb-2 p-3"
            style={{
              border: "1px solid #dee2e6",
              borderLeft: "5px solid #198754",
            }}
          >
            <div className="flex-grow-1">
              {a.editing && isFaculty ? (
                <FormControl
                  defaultValue={a.title}
                  onChange={(e) =>
                    handleUpdateAssignment({ ...a, title: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdateAssignment({ ...a, editing: false });
                    }
                  }}
                  className="me-3"
                />
              ) : (
                <div>
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
                  <div className="text-secondary" style={{ fontSize: "0.9rem" }}>
                    <strong>Due</strong> {a.dueDate || "TBD"} | {a.points} pts
                  </div>
                </div>
              )}
            </div>

            <div className="d-flex align-items-center">
              {isFaculty && !a.editing && (
                <>
                  <BsGear
                    onClick={() => handleEditAssignment(a._id)}
                    className="text-primary me-3 fs-5"
                  />
                  <BsTrash
                    onClick={() => handleDeleteAssignment(a._id)}
                    className="text-danger fs-5 me-3"
                  />
                </>
              )}

              {a.editing && (
                <>
                  <GreenCheckmark className="me-3" />
                  <IoEllipsisVertical className="fs-4 text-secondary me-3" />
                </>
              )}

              {!a.editing && (
                <>
                  <GreenCheckmark className="me-3" />
                  <IoEllipsisVertical className="fs-4 text-secondary" />
                </>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {isFaculty && (
        <Modal show={showAddModal} onHide={handleCloseAdd}>
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
                <Form.Label>Description (HTML)</Form.Label>
                <FormControl
                  as="textarea"
                  rows={3}
                  placeholder="Describe assignment…"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Points</Form.Label>
                <FormControl
                  type="number"
                  value={newPoints}
                  onChange={(e) => setNewPoints(parseInt(e.target.value) || 0)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Available From</Form.Label>
                <FormControl
                  type="datetime-local"
                  value={newAvailableFrom}
                  onChange={(e) => setNewAvailableFrom(e.target.value)}
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
                  value={newAvailableUntil}
                  onChange={(e) => setNewAvailableUntil(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddAssignment}
              id="wd-save-assignment-click"
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
