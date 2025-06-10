import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import { FaPlusCircle, FaTrash, FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await client.fetchTodos();
        setTodos(data.map((t: any) => ({ ...t, editing: false })));
        setErrorMessage(null);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Failed to load todos");
      }
    })();
  }, []);
  const createTodo = () => {
    const newTodo = { id: Date.now(), title: "", completed: false, editing: true };
    setTodos([newTodo, ...todos]);
  };
  const postTodo = async () => {
    try {
      const updated = await client.createTodo();
      setTodos(updated.map((t: any) => ({ ...t, editing: false })));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Unable to create todo");
    }
  };
  const editTodo = (todo: any) => {
    setTodos(todos.map((t: any) => (t.id === todo.id ? { ...t, editing: true } : t)));
  };
  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t: any) => (t.id === todo.id ? { ...todo, editing: false } : t)));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || `Unable to update Todo with ID ${todo.id}`
      );
    }
  };
  const toggleCompleted = (todo: any, completed: boolean) => {
    updateTodo({ ...todo, completed });
  };
  const removeTodo = async (todo: any) => {
    try {
      const updated = await client.removeTodo(todo);
      setTodos(updated.map((t: any) => ({ ...t, editing: false })));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || `Unable to delete Todo with ID ${todo.id}`
      );
    }
  };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <Alert
          id="wd-todo-error-message"
          variant="danger"
          onClose={() => setErrorMessage(null)}
          dismissible
          className="mb-2 mt-2"
        >
          {errorMessage}
        </Alert>
      )}
      <h4>
        Todos
        <FaPlusCircle
          id="wd-post-todo"
          className="text-primary float-end fs-3 me-3"
          style={{ cursor: "pointer" }}
          onClick={postTodo}
        />
        <FaPlusCircle
          id="wd-create-todo"
          className="text-success float-end fs-3"
          style={{ cursor: "pointer" }}
          onClick={createTodo}
        />
      </h4>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroup.Item key={todo.id} className="position-relative">
            <FaPencilAlt
              className="text-primary float-end me-1 mt-1"
              style={{ cursor: "pointer" }}
              onClick={() => editTodo(todo)}
            />
            <input
              type="checkbox"
              className="form-check-input me-2 float-start"
              checked={todo.completed}
              onChange={(e) => toggleCompleted(todo, e.currentTarget.checked)}
            />
            {todo.editing ? (
              <FormControl
                className="w-50 float-start me-2"
                defaultValue={todo.title}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({
                      ...todo,
                      title: (e.target as HTMLInputElement).value,
                    });
                  }
                }}
              />
            ) : (
              <span
                className="flex-grow-1"
                style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              >
                {todo.title}
              </span>
            )}
            <FaTrash
              id="wd-remove-todo"
              className="text-danger float-end mt-1 me-1"
              style={{ cursor: "pointer" }}
              onClick={() => removeTodo(todo)}
            />
            <TiDelete
              id="wd-delete-todo"
              className="text-danger float-end fs-3"
              style={{ cursor: "pointer" }}
              onClick={() => removeTodo(todo)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
