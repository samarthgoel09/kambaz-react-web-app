
import { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API = `${REMOTE_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",           
    description: "",    
    completed: false,   
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a
        id="wd-retrieve-todos"
        className="btn btn-primary mb-3"
        href={API}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Todos
      </a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <FormControl
        id="wd-todo-id"
        className="w-50 mb-2"
        type="number"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary mb-3"
        href={`${API}/${todo.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Todo by ID
      </a>
      <hr />
      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary mb-3"
        href={`${API}?completed=true`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Completed Todos
      </a>
      <hr />
      <h4>Creating New Items in an Array</h4>
      <a
        id="wd-create-todo"
        className="btn btn-primary mb-3"
        href={`${API}/create`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Create Todo
      </a>
      <hr />
      <h4>Deleting from an Array</h4>
      <FormControl
        id="wd-delete-todo-id"
        className="w-50 mb-2"
        type="number"
        placeholder="ID to delete"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <a
        id="wd-delete-todo"
        className="btn btn-danger mb-3"
        href={`${API}/${todo.id}/delete`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Delete Todo with ID = {todo.id}
      </a>
      <hr />
      <h4>Describe Todo ID = {todo.id}</h4>
      <FormControl
        id="wd-update-todo-id-desc"
        className="w-25 mb-2 me-2 float-start"
        type="number"
        placeholder="ID"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        id="wd-update-todo-description"
        className="w-50 mb-2 float-start"
        type="text"
        placeholder="New description"
        defaultValue={todo.description}
        onChange={(e) =>
          setTodo({ ...todo, description: e.target.value })
        }
      />
      <a
        id="wd-update-todo-description"
        className="btn btn-success mb-3 float-start ms-2"
        href={`${API}/${todo.id}/description/${encodeURIComponent(
          todo.description
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Describe Todo ID = {todo.id}
      </a>
      <br />

      <hr />
      <h4>Complete Todo ID = {todo.id}</h4>
      <FormControl
        id="wd-update-todo-id-completed"
        className="w-25 mb-2 me-2 float-start"
        type="number"
        placeholder="ID"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormCheck
        id="wd-update-todo-completed"
        type="checkbox"
        label="Completed?"
        className="mb-2 float-start"
        checked={todo.completed}
        onChange={(e) =>
          setTodo({ ...todo, completed: e.target.checked })
        }
      />
      <a
        id="wd-update-todo-completed"
        className="btn btn-success mb-3 float-start ms-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Complete Todo ID = {todo.id}
      </a>
      <hr />
      <h5>Local “todo” State</h5>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  );
}
