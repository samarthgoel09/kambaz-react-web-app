import { useEffect, useState } from "react";
import { FaUserCircle, FaPencilAlt, FaCheck } from "react-icons/fa";
import { IoCloseSharp }                      from "react-icons/io5";
import { FormControl }                        from "react-bootstrap";

interface Props {
  uid: string;
  onClose: () => void;
  onDelete: (userId: string) => Promise<void>;
  onUpdate: (user: any) => Promise<any>;
}

export default function PeopleDetails({
  uid,
  onClose,
  onDelete,
  onUpdate,
}: Props) {
  const [user, setUser]       = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [role, setRole]       = useState("");
  const [section, setSection] = useState("");

  useEffect(() => {
    import("../../Account/client").then(({ findUserById }) =>
      findUserById(uid).then((u) => {
        setUser(u);
        setName(`${u.firstName} ${u.lastName}`);
        setEmail(u.email || "");
        setRole(u.role || "");
        setSection(u.section || "");
      })
    );
  }, [uid]);

  if (!user) return null;

  const handleSave = async () => {
    const [firstName, lastName = ""] = name.split(" ");
    const updated = { ...user, firstName, lastName, email, role, section };
    const saved   = await onUpdate(updated);
    setUser(saved || updated);
    setEditing(false);
    onClose();
  };


  const handleDelete = async () => {
    await onDelete(uid);
    onClose();
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0">
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-4">
        <FaUserCircle className="text-secondary fs-1" />
      </div>

      <div className="position-relative my-3">
        {!editing ? (
          <>
            <FaPencilAlt
              className="position-absolute end-0 top-0 text-secondary fs-5"
              onClick={() => setEditing(true)}
              style={{ cursor: "pointer" }}
            />
            <div onClick={() => setEditing(true)} className="text-danger fs-4">
              {user.firstName} {user.lastName}
            </div>
          </>
        ) : (
          <>
            <FaCheck
              className="position-absolute end-0 top-0 text-success fs-5"
              onClick={handleSave}
              style={{ cursor: "pointer" }}
            />
            <FormControl
              className="w-100 mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </>
        )}
      </div>

      <hr />

      <div className="mb-3">
        <strong>Email:</strong>{" "}
        {!editing ? (
          <span>{user.email}</span>
        ) : (
          <FormControl
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      </div>

      <div className="mb-3">
        <strong>Role:</strong>{" "}
        {!editing ? (
          <span>{user.role}</span>
        ) : (
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="STUDENT">Student</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Admin</option>
          </select>
        )}
      </div>

      <div className="mb-3">
        <strong>Section:</strong>{" "}
        {!editing ? (
          <span>{user.section}</span>
        ) : (
          <FormControl
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
        )}
      </div>

      {!editing && (
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
