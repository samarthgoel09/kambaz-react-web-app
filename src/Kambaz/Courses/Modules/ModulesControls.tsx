
import { FormControl, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

interface Props {
  isFaculty: boolean;
  moduleName: string;
  setModuleName: (name: string) => void;
  handleAddModule: () => void;
}

export default function ModulesControls({
  isFaculty,
  moduleName,
  setModuleName,
  handleAddModule,
}: Props) {
  if (!isFaculty) return null;
  return (
    <div className="d-flex mb-3">
      <FormControl
        placeholder="New Module Name"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        id="wd-module-name"
        className="me-2"
      />
      <Button
        id="wd-add-module-btn"
        variant="danger"
        onClick={handleAddModule}
        disabled={!moduleName.trim()}
      >
        <FaPlus className="me-1" />
        Module
      </Button>
    </div>
  );
}
