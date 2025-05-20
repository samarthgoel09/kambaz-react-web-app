
import { InputGroup, Form, Button, ListGroup } from "react-bootstrap";
import { FaSearch, FaPlus , FaRegFileAlt} from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import "../../styles.css";
import { Link } from "react-router-dom";

interface Assignment {
  title: string;
  modules: string;
  availableAt: string;  
  dueAt: string;        
  points: string;
}

const sampleAssignments: Assignment[] = [
  {
    title: "A1",
    modules: "Multiple Modules",
    availableAt: "May 6 at 12:00 am",
    dueAt: "May 13 at 11:59 pm",
    points: "100 pts",
  },
  {
    title: "A2",
    modules: "Multiple Modules",
    availableAt: "May 13 at 12:00 am",
    dueAt: "May 20 at 11:59 pm",
    points: "100 pts",
  },
  {
    title: "A3",
    modules: "Multiple Modules",
    availableAt: "May 20 at 12:00 am",
    dueAt: "May 27 at 11:59 pm",
    points: "100 pts",
  },
];

export default function Assignments() {
  return (
    <div className="p-3">
      <div className="d-flex align-items-center mb-4">
        <InputGroup style={{ maxWidth: 300 }} className="me-auto">
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <Form.Control placeholder="Search…" />
        </InputGroup>
<Button
   variant="light"   size="lg"
  className="me-2 border border-secondary text-dark"
 >          <FaPlus className="me-1" /> Group
        </Button>
        <Button variant="danger" size="lg">
          <FaPlus className="me-1" /> Assignment
        </Button>
      </div>
      <ListGroup className="rounded-0">
        <ListGroup.Item className="p-0 mb-3" style={{ border: "1px solid #dee2e6" }}>
          <div
            className="d-flex justify-content-between align-items-center p-3 bg-light"
            style={{ border: "1px solid #dee2e6" }}
          >
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
        {sampleAssignments.map((a, i) => (
          <ListGroup.Item
            key={i}
            className="d-flex justify-content-between align-items-start mb-2 p-3"
            style={{
              border: "1px solid #dee2e6",
              borderLeft: "5px solid #198754",
            }}
          >
            <div>
              <div className="d-flex align-items-center mb-1">
  <BsGripVertical className="me-2" />
  <FaRegFileAlt className="text-success me-2 fs-4" />
  <Link
    to={a.title}
    className="text-decoration-none text-dark"
    style={{ fontSize: "1.1rem", fontWeight: 600 }}
  >
    {a.title}
  </Link>
</div>
             <div className="text-secondary mb-1" style={{ fontSize: "0.9rem" }}>
    {a.modules}{" "}
    |{" "}
    <strong>Not available until</strong>{" "}
    {a.availableAt}{" "}
    |{" "}
  </div>
              <div className="text-secondary" style={{ fontSize: "0.9rem" }}>
                <strong>Due</strong> {a.dueAt} | {a.points}
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
