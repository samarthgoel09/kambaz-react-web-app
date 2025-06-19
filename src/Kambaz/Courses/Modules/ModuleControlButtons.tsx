
import { Button, ButtonGroup } from "react-bootstrap";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";

interface Props {
  moduleId: string;
  editModule: (mid: string) => void;
  deleteModule: (mid: string) => void;
  onMore?: () => void;
}

export default function ModuleControlButtons({
  moduleId,
  editModule,
  deleteModule,
  onMore,
}: Props) {
  return (
    <ButtonGroup size="sm" className="ms-auto">
      <Button
        variant="outline-warning"
        onClick={() => editModule(moduleId)}
        title="Edit Module"
      >
        <FaEdit />
      </Button>
      <Button
        variant="outline-danger"
        onClick={() => deleteModule(moduleId)}
        title="Delete Module"
      >
        <FaTrash />
      </Button>
      <Button
        variant="link"
        className="text-secondary"
        onClick={onMore}
        title="More options"
      >
        <FaEllipsisV />
      </Button>
    </ButtonGroup>
  );
}
