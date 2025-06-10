
import { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
const API = `${REMOTE_SERVER}/lab5/todos`;
  const [moduleObj, setModuleObj] = useState({
    id: "m1",
    name: "Intro to NodeJS",
    description: "Basics of Express and server setup",
    course: "CS101",
  });

 const [todo, setTodo] = useState({id: "1"});  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Assignment: Retrieving & Modifying</h4>

      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2 mb-2"
        href={ASSIGNMENT_API_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Assignment
      </a>

      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary me-2 mb-2"
        href={`${ASSIGNMENT_API_URL}/title`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Title
      </a>
      <br />

      <FormControl
        id="wd-assignment-title"
        className="w-50 mb-2"
        type="text"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      <a
        id="wd-update-assignment-title"
        className="btn btn-primary me-2 mb-2"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Title
      </a>
      <br />

      <FormControl
        id="wd-assignment-score"
        className="w-25 mb-2"
        type="number"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value, 10) })
        }
      />

      <a
        id="wd-update-assignment-score"
        className="btn btn-primary me-2 mb-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Score
      </a>
      <br />

      <FormCheck
        id="wd-assignment-completed"
        type="checkbox"
        label="Completed?"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
        className="mb-2"
      />

      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary me-2 mb-2"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Completed
      </a>

      <hr />

      <h5>Local Assignment Object</h5>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>

      <hr />

      <h4>Module: Retrieving & Modifying</h4>

      <a
        id="wd-get-module"
        className="btn btn-primary me-2 mb-2"
        href={MODULE_API_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Module
      </a>

      <a
        id="wd-get-module-name"
        className="btn btn-primary me-2 mb-2"
        href={`${MODULE_API_URL}/name`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Module Name
      </a>
      <br />

      <FormControl
        id="wd-module-name"
        className="w-50 mb-2"
        type="text"
        defaultValue={moduleObj.name}
        onChange={(e) =>
          setModuleObj({ ...moduleObj, name: e.target.value })
        }
      />

      <a
        id="wd-update-module-name"
        className="btn btn-primary me-2 mb-2"
        href={`${MODULE_API_URL}/name/${moduleObj.name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Module Name
      </a>
      <br />

      <FormControl
        id="wd-module-description"
        className="w-75 mb-2"
        type="text"
        defaultValue={moduleObj.description}
        onChange={(e) =>
          setModuleObj({ ...moduleObj, description: e.target.value })
        }
      />

      <a
        id="wd-update-module-description"
        className="btn btn-primary me-2 mb-2"
        href={`${MODULE_API_URL}/description/${moduleObj.description}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Module Description
      </a>

      <hr />

      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        className="w-50 mb-3"
        type="number"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />      <h5>Local Module Object</h5>
      <pre>{JSON.stringify(moduleObj, null, 2)}</pre>
    </div>
  );
}
