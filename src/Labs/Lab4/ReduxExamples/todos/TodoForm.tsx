import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button, FormControl } from "react-bootstrap";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroup.Item>
      <Button
        id="wd-add-todo-click"
        className="me-2"
        onClick={() => dispatch(addTodo(todo))}
      >
        Add
      </Button>
      <Button
        id="wd-update-todo-click"
        className="me-2"
        onClick={() => dispatch(updateTodo(todo))}
      >
        Update
      </Button>
      <FormControl
        value={todo.title}
        placeholder="Enter todo..."
        onChange={(e) =>
          dispatch(setTodo({ ...todo, title: e.target.value }))
        }
      />
    </ListGroup.Item>
  );
}
