
import { Button } from "react-bootstrap";
import { FaPencilAlt, FaTrash, FaPlus, FaEllipsisV } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";

interface ModuleControlButtonsProps {
  moduleId: string;
  editModule: (moduleId: string) => void;
  deleteModule: (moduleId: string) => void;
  publishModule: (moduleId: string) => void;
  addLesson: (moduleId: string) => void;
  onMore: (moduleId: string) => void;
}

export default function ModuleControlButtons({
  moduleId,
  editModule,
  deleteModule,
  publishModule,
  addLesson,
  onMore,
}: ModuleControlButtonsProps) {
  return (
    <div className="d-flex align-items-center">
   
      <Button
        variant="link"
        className="p-0 text-primary me-3"
        onClick={(e) => {
          e.preventDefault();
          editModule(moduleId);
        }}
        id="wd-edit-module-click"
      >
        <FaPencilAlt size={18} />
      </Button>

      <Button
        variant="link"
        className="p-0 text-danger me-3"
        onClick={(e) => {
          e.preventDefault();
          deleteModule(moduleId);
        }}
        id="wd-delete-module-click"
      >
        <FaTrash size={18} />
      </Button>

      <Button
        variant="link"
        className="p-0 text-success me-3"
        onClick={(e) => {
          e.preventDefault();
          publishModule(moduleId);
        }}
        id="wd-publish-module-click"
      >
        <GreenCheckmark />
      </Button>

      <Button
        variant="link"
        className="p-0 text-dark me-3"
        onClick={(e) => {
          e.preventDefault();
          addLesson(moduleId);
        }}
        id="wd-add-lesson-click"
      >
        <FaPlus size={18} />
      </Button>

      <Button
        variant="link"
        className="p-0 text-secondary"
        onClick={(e) => {
          e.preventDefault();
          onMore(moduleId);
        }}
        id="wd-more-module-click"
      >
        <FaEllipsisV size={18} />
      </Button>
    </div>
  );
}
