import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";

export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  loginId?: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: string;
}

interface PeopleTableProps {
  users?: User[];
  onDelete?: (userId: string) => Promise<void>;
  onUpdate?: (updated: User) => Promise<User>;
}

export default function PeopleTable({
  users = [],
  onDelete,
  onUpdate,
}: PeopleTableProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div id="wd-people-table" className="position-relative">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u._id} className={idx % 2 === 0 ? "table-light" : ""}>
              <td className="text-nowrap">
                <a
                  href="#"
                  className="text-danger text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedUserId(u._id);
                  }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  {u.firstName || ""} {u.lastName || ""}
                </a>
              </td>
              <td>{u.email || ""}</td>
              <td>{u.loginId || ""}</td>
              <td>{u.section || ""}</td>
              <td>{u.role || ""}</td>
              <td>{u.lastActivity || ""}</td>
              <td>{u.totalActivity || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUserId && (
        <PeopleDetails
          uid={selectedUserId}
          onClose={() => setSelectedUserId(null)}
          onDelete={() =>
            onDelete ? onDelete(selectedUserId) : Promise.resolve()
          }
          onUpdate={(u) => (onUpdate ? onUpdate(u) : Promise.resolve(u))}
        />
      )}
    </div>
  );
}
