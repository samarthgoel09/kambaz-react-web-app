import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { findUsersForCourse } from "../client";
import { deleteUser, updateUser } from "../../Account/client";
import PeopleTable from "./Table";

export default function People() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!cid) return;
    findUsersForCourse(cid)
      .then((list) => {
        setUsers(list.filter((u: null) => u != null));
      })
      .catch((e) => {
        console.error("Failed loading course users:", e);
        setUsers([]);
      });
  }, [cid]);

  const handleDelete = async (uid: string) => {
    await deleteUser(uid);
    setUsers((prev) => prev.filter((u) => u._id !== uid));
  };

  const handleUpdate = async (user: any) => {
    const updated = await updateUser(user);
    setUsers((prev) =>
      prev.map((u) => (u._id === updated._id ? updated : u))
    );
    return updated; 
  };

  return (
    <PeopleTable
      users={users}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
}
