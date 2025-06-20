
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";

import {
  fetchAssignments,
  createAssignment,
  deleteAssignmentById,
  setEditing,
  type Assignment,
  updateAssignmentById,
} from "./reducer";

import AssignmentEditor from "./Editor";

import {
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { FaSearch, FaPlus, FaRegFileAlt } from "react-icons/fa";
import { BsGripVertical, BsTrash, BsGear } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

interface AssignmentsProps {
  isFaculty: boolean;
}

export default function Assignments({ isFaculty }: AssignmentsProps) {
  const { cid, aid } = useParams<{ cid: string; aid?: string }>();
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
  if (aid && aid !== "New") {
    return <AssignmentEditor />;
  }

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
    if (!newTitle.trim() || !cid) return;
    dispatch(
      createAssignment({
        cid,
        assn: {
          title: newTitle.trim(),
          descriptionHtml: `<p>${newDesc}</p>`,
          points: newPoints,
          availableFrom: newFrom,
          dueDate: newDueDate,
          availableUntil: newUntil,
        },
      })
    );
    setShowAdd(false);
    setNewTitle("");
    setNewDesc("");
    setNewPoints(0);
    setNewFrom("");
    setNewDueDate("");
    setNewUntil("");
  };

  return (
    <>
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
              id="wd-add-group-click"
              variant="light"
              size="lg"
              className="me-2 border border-secondary text-dark"
            >
              <FaPlus className="me-1" />
              Group
            </Button>
            <Button
              id="wd-add-assignment-click"
              variant="danger"
              size="lg"
              onClick={() => setShowAdd(true)}
            >
              <FaPlus className="me-1" />
              Assignment
            </Button>
          </>
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
                    dispatch(
                      updateAssignmentById({ ...a, title: e.target.value })
                    )
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
                      to={`${a._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <strong style={{ fontSize: "1.1rem" }}>
                        {a.title}
                      </strong>
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

      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mb-2"
          />
          <FormControl
            as="textarea"
            rows={3}
            placeholder="Description…"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="mb-2"
          />
          <FormControl
            type="number"
            placeholder="Points"
            value={newPoints}
            onChange={(e) => setNewPoints(+e.target.value)}
            className="mb-2"
          />
          <FormControl
            type="datetime-local"
            placeholder="Available From"
            value={newFrom}
            onChange={(e) => setNewFrom(e.target.value)}
            className="mb-2"
          />
          <FormControl
            type="datetime-local"
            placeholder="Due Date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="mb-2"
          />
          <FormControl
            type="datetime-local"
            placeholder="Available Until"
            value={newUntil}
            onChange={(e) => setNewUntil(e.target.value)}
            className="mb-2"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
          <Button id="wd-save-assignment-click" onClick={handleAddAssignment}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
