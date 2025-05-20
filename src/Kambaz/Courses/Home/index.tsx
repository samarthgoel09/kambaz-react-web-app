import { ListGroup } from "react-bootstrap";
import ModulesControls from "../Modules/ModulesControls";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div className="d-flex">
      
      <div className="flex-fill">
        <ModulesControls />
        <br /><br /><br /><br />

        <ListGroup className="rounded-0" id="wd-modules">
        </ListGroup>
      </div>
      <div className="d-none d-xl-block ms-4" style={{ width: 350 }}>
        <CourseStatus />
      </div>
    </div>
  );
}

