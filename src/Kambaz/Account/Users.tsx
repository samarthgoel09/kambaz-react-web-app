import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";

export default function Users() {
  const [users, setUsers]           = useState<any[]>([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [loading, setLoading]       = useState(false);

  // Fetch & filter
  const loadUsers = async () => {
    setLoading(true);
    try {
      let data;
      if (nameFilter.trim()) {
        data = await client.findUsersByPartialName(nameFilter.trim());
      } else if (roleFilter) {
        data = await client.findUsersByRole(roleFilter);
      } else {
        data = await client.findAllUsers();
      }
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [roleFilter, nameFilter]);

  // Create new user
// inside src/Kambaz/Account/Users.tsx

const handleCreateUser = async () => {
  console.log("🔔 Creating new user…");
  try {
    const newUser = await client.createUser({
      firstName: "New",
      lastName:  `User${users.length + 1}`,
      username:  `newuser${Date.now()}`,
      password:  "password123",
      email:     `email${users.length + 1}@neu.edu`,
      section:   "S101",
      role:      "STUDENT",
    });
    console.log("✅ Created user:", newUser);

    // Immediately add the created user into state:
    setUsers((prev) => [...prev, newUser]);

    // Optionally, reset any filters so it shows up:
    setNameFilter("");
    setRoleFilter("");
  } catch (e: any) {
    console.error("❌ Error creating user", e.response?.data || e.message);
  }
};



  // Delete user callback
  const handleDeleteUser = async (userId: string) => {
    await client.deleteUser(userId);
    setUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  // Update user callback
  const handleUpdateUser = async (updated: any) => {
    const saved = await client.updateUser(updated);
    setUsers((prev) =>
      prev.map((u) => (u._id === saved._id ? saved : u))
    );
  };

  return (
    <div className="p-4 position-relative">
      <h3>Users</h3>

      <Button
        onClick={handleCreateUser}
        className="btn-danger mb-3 float-end wd-add-people"
      >
        <FaPlus className="me-2" /> New User
      </Button>

      <Row className="mb-3">
        <Col md={5}>
          <InputGroup>
            <Form.Control
              placeholder="Search by name..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <Button onClick={loadUsers}>Search</Button>
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Administrators</option>
            <option value="FACULTY">Faculty</option>
            <option value="TA">Assistants</option>
            <option value="STUDENT">Students</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button variant="link" onClick={() => {
            setNameFilter(""); 
            setRoleFilter("");
          }}>
            Reset
          </Button>
        </Col>
      </Row>

      {loading
        ? <div>Loading users…</div>
        : <PeopleTable
            users={users}
            onDelete={handleDeleteUser}
            onUpdate={handleUpdateUser}
          />
      }
    </div>
  );
}
