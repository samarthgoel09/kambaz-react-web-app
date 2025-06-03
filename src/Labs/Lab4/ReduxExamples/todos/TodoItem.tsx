import { useDispatch } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item key={todo.id} className="d-flex align-items-center">
      <Button
        id="wd-delete-todo-click"
        variant="danger"
        size="sm"
        className="me-2"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        Delete
      </Button>
      <Button
        id="wd-set-todo-click"
        variant="secondary"
        size="sm"
        className="me-3"
        onClick={() => dispatch(setTodo(todo))}
      >
        Edit
      </Button>
      <span>{todo.title}</span>
    </ListGroup.Item>
  );
}
