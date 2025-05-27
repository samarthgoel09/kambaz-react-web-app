import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import { InputGroup, Form, Button, ListGroup } from "react-bootstrap";
import { FaSearch, FaPlus } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import "../../styles.css";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = db.assignments.filter((a) => a.course === cid);

  return (
    <div className="p-3">
      <div className="d-flex align-items-center mb-4">
        <InputGroup style={{ maxWidth: 300 }} className="me-auto">
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <Form.Control placeholder="Search…" />
        </InputGroup>
        <Button variant="light" size="lg" className="me-2 border border-secondary text-dark">
          <FaPlus className="me-1" /> Group
        </Button>
        <Button variant="danger" size="lg">
          <FaPlus className="me-1" /> Assignment
        </Button>
      </div>

      <ListGroup className="rounded-0">
        <ListGroup.Item className="p-0 mb-3" style={{ border: "1px solid #dee2e6" }}>
          <div className="d-flex justify-content-between align-items-center p-3 bg-light" style={{ border: "1px solid #dee2e6" }}>
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2" />
              <strong>ASSIGNMENTS</strong>
            </div>
            <div className="d-flex align-items-center">
              <Button variant="outline-secondary" size="sm" className="me-2 rounded-pill">
                40% of Total
              </Button>
              <FaPlus className="me-3" />
              <IoEllipsisVertical />
            </div>
          </div>
        </ListGroup.Item>
        {assignments.map((a) => (
          <ListGroup.Item
            key={a._id}
            className="d-flex justify-content-between align-items-start mb-2 p-3"
            style={{
              border: "1px solid #dee2e6",
              borderLeft: "5px solid #198754",
            }}
          >
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
              <div className="text-secondary mb-1" style={{ fontSize: "0.9rem" }}>
                <strong>Not available until</strong> TBD
              </div>
              <div className="text-secondary" style={{ fontSize: "0.9rem" }}>
                <strong>Due</strong> TBD | 100 pts
              </div>
            </div>
            <div className="d-flex align-items-center">
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4 text-secondary ms-3" />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
