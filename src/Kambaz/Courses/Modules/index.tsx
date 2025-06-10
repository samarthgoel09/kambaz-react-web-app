import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";

import {
  setModules,
  addModule,
  deleteModule as deleteModuleAction,
  editModule,
  changeModuleName,      
  updateModule as updateModuleAction,
} from "./reducer";

import {
  findModulesForCourse,
  createModuleForCourse,
} from "../client";              
import {
  updateModule as updateModuleClient,
  deleteModule as deleteModuleClient,
} from "./client";             

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
  const currentUser = useSelector((s: RootState) => s.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";
  const [moduleName, setModuleName] = useState("");
  const modules = useSelector((s: RootState) => s.modulesReducer.modules);
  useEffect(() => {
    if (!cid) return;
    findModulesForCourse(cid).then((mods) => dispatch(setModules(mods)));
  }, [cid, dispatch]);
  const handleAddModule = async () => {
    if (!cid || !moduleName.trim()) return;
    const newMod = await createModuleForCourse(cid, { name: moduleName });
    dispatch(addModule(newMod));
    setModuleName("");
  };
  const handleDeleteModule = async (mid: string) => {
    await deleteModuleClient(mid);
    dispatch(deleteModuleAction(mid));
  };
  const handleEditModule = (mid: string) => {
    dispatch(editModule(mid));
  };
  const handleSaveModule = async (mod: any) => {
    const updated = await updateModuleClient(mod);
    dispatch(updateModuleAction(updated));
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
        {modules.map((mod) => (
          <ListGroup.Item
            key={mod._id}
            className="wd-module p-0 mb-3 fs-5 border-0"
            style={{ backgroundColor: "#e2e4e6" }}
          >
            <div className="wd-title p-3 ps-2 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3 text-secondary" />

              {!mod.editing ? (
                <span className="flex-grow-1">{mod.name}</span>
              ) : (
                <FormControl
                  className="w-50 d-inline-block me-3"
                  value={mod.name}
                  onChange={(e) =>
                    dispatch(changeModuleName({ id: mod._id, name: e.target.value }))
                  }
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      await handleSaveModule({ ...mod, editing: false });
                    }
                  }}
                />
              )}

              {isFaculty ? (
                <ModuleControlButtons
                  moduleId={mod._id}
                  editModule={handleEditModule}
                  deleteModule={handleDeleteModule}
                  publishModule={() => console.log("Publish Module", mod._id)}
                  addLesson={() => console.log("Add Lesson under", mod._id)}
                  onMore={() => console.log("More options for", mod._id)}
                />
              ) : (
                <div className="d-flex align-items-center">
                  <GreenCheckmark className="me-2" />
                  <FaEllipsisV className="fs-4 text-secondary" />
                </div>
              )}
            </div>

            {mod.lessons?.length > 0 && (
              <ListGroup className="wd-lessons rounded-0 border-top-0">
                {mod.lessons.map((lesson) => (
                  <ListGroup.Item
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center"
                  >
                    <BsGripVertical className="me-2 fs-3 text-secondary" />
                    <span className="flex-grow-1">{lesson.name}</span>
                    {isFaculty ? (
                      <LessonControlButtons
                        lessonId={lesson._id}
                        editLesson={(lid) => console.log("Edit lesson", lid)}
                        deleteLesson={(lid) => console.log("Delete lesson", lid)}
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
