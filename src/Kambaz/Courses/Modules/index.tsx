// src/Kambaz/Courses/Modules/index.tsx

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";

import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
} from "./reducer";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  const [moduleName, setModuleName] = useState("");

  const modules = useSelector((state: RootState) =>
    state.modulesReducer.modules.filter((m: any) => m.course === cid)
  );

  const handleAddModule = () => {
    if (!moduleName.trim()) return;
    dispatch(addModule({ name: moduleName, course: cid! }));
    setModuleName("");
  };

  const handleDeleteModule = (moduleId: string) => {
    dispatch(deleteModule(moduleId));
  };

  const handleEditModule = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };

  const handleUpdateModule = (updatedModule: any) => {
    dispatch(updateModule(updatedModule));
  };

  return (
    <div className="wd-modules px-4">
      <h2 className="mb-3">Modules for Course: {cid}</h2>

      <ModulesControls
        isFaculty={isFaculty}
        moduleName={moduleName}
        setModuleName={setModuleName}
        handleAddModule={handleAddModule}
      />
      <hr />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((mod: any) => (
          <ListGroup.Item
            key={mod._id}
            style={{ backgroundColor: "#e2e4e6" }}
            className="wd-module p-0 mb-3 fs-5 border-0"
          >
            <div className="wd-title p-3 ps-2 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3 text-secondary" />

              {!mod.editing && <span className="flex-grow-1">{mod.name}</span>}
              {mod.editing && (
                <FormControl
                  className="w-50 d-inline-block me-3"
                  defaultValue={mod.name}
                  onChange={(e) =>
                    handleUpdateModule({ ...mod, name: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdateModule({ ...mod, editing: false });
                    }
                  }}
                />
              )}

              {isFaculty ? (
                <ModuleControlButtons
                  moduleId={mod._id}
                  editModule={handleEditModule}
                  deleteModule={handleDeleteModule}
                  publishModule={() =>
                    console.log("Publish Module", mod._id)
                  }
                  addLesson={() =>
                    console.log("Add Lesson under", mod._id)
                  }
                  onMore={() =>
                    console.log("More options for", mod._id)
                  }
                />
              ) : (
                <div className="d-flex align-items-center">
                  <GreenCheckmark className="me-2" />
                  <FaEllipsisV className="fs-4 text-secondary" />
                </div>
              )}
            </div>

            {mod.lessons && mod.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0 border-top-0">
                {mod.lessons.map((lesson: any) => (
                  <ListGroup.Item
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center"
                  >
                    <BsGripVertical className="me-2 fs-3 text-secondary" />
                    <span className="flex-grow-1">{lesson.name}</span>
                    {isFaculty ? (
                      <LessonControlButtons
                        lessonId={lesson._id}
                        editLesson={(lid) =>
                          console.log("Edit lesson", lid)
                        }
                        deleteLesson={(lid) =>
                          console.log("Delete lesson", lid)
                        }
                      />
                    ) : (
                      <div className="d-flex align-items-center">
                        <GreenCheckmark className="me-2" />
                        <FaEllipsisV className="fs-4 text-secondary" />
                      </div>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
