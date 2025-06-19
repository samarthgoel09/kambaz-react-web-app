import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import {
  setModules,
  editModule,
  changeModuleName,
  saveModule,
  removeModule,
} from "./reducer";
import {
  findModulesForCourse,
  createModuleForCourse,
  updateModule,
  deleteModule,
} from "./client";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import GreenCheckmark from "./GreenCheckmark";

import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const modules = useSelector((s: RootState) => s.modulesReducer.modules);
  const currentUser = useSelector((s: RootState) => s.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  const [newName, setNewName] = useState("");

  const reload = async () => {
    if (!cid) return;
    const mods = await findModulesForCourse(cid);
    dispatch(setModules(mods));
  };

  useEffect(() => {
    reload();
  }, [cid, dispatch]);

  const handleAdd = async () => {
    if (!cid || !newName.trim()) return;
    await createModuleForCourse(cid, { name: newName });
    setNewName("");
    await reload();
  };

  const handleDelete = async (mid: string) => {
    if (!window.confirm("Delete this module?")) return;
    await deleteModule(mid);
    dispatch(removeModule(mid));
  };

  const handleEdit = (mid: string) => {
    dispatch(editModule(mid));
  };

  const handleSave = async (mod: any) => {
    const updated = await updateModule(mod);
    dispatch(saveModule(updated));
  };

  return (
    <div className="wd-modules px-4">
      <h2 className="mb-3">Modules for Course: {cid}</h2>

      <ModulesControls
        isFaculty={isFaculty}
        moduleName={newName}
        setModuleName={setNewName}
        handleAddModule={handleAdd}
      />

      <hr />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((mod) => (
          <React.Fragment key={mod._id}>
            <ListGroup.Item
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
                        await handleSave({ ...mod, editing: false });
                      }
                    }}
                  />
                )}

                {isFaculty ? (
                  <ModuleControlButtons
                    moduleId={mod._id}
                    editModule={handleEdit}
                    deleteModule={handleDelete}
                    onMore={() => console.log("More options for", mod._id)}
                  />
                ) : (
                  <div className="d-flex align-items-center ms-auto">
                    <GreenCheckmark className="me-2" />
                    <FaEllipsisV className="fs-4 text-secondary" />
                  </div>
                )}
              </div>
            </ListGroup.Item>

            {mod.lessons && mod.lessons.length > 0 && (
              <ListGroup className="mb-4 ps-4">
                {mod.lessons.map((lesson) => (
                  <ListGroup.Item
                    key={lesson._id}
                    className="p-2 border-0 bg-white d-flex align-items-center"
                  >
                    <BsGripVertical className="me-2 fs-3 text-secondary opacity-50" />
                    <span className="flex-grow-1">{lesson.name}</span>
                    {isFaculty ? null : <GreenCheckmark className="ms-2" />}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </React.Fragment>
        ))}
      </ListGroup>
    </div>
  );
}
