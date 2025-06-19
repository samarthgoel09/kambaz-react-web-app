import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import PeopleTable, { type User } from "../Courses/People/Table";
import * as client from "./client";

export default function Users() {
  const [users, setUsers]           = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [loading, setLoading]       = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      let data: User[];
      if (nameFilter.trim()) {
        data = await client.findUsersByPartialName(nameFilter.trim());
      } else if (roleFilter) {
        data = await client.findUsersByRole(roleFilter);
      } else {
        data = await client.findAllUsers();
      }
      setUsers(data);
    } catch (e) {
      console.error("Failed to load users:", e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [roleFilter, nameFilter]);

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      await client.createUser({
        firstName: "New",
        lastName:  `User${Date.now()}`,
        username:  `newuser${Date.now()}`,
        password:  "password123",
        email:     `email${Date.now()}@neu.edu`,
        section:   "S101",
        role:      "STUDENT",
      });
      await loadUsers();
      setNameFilter("");
      setRoleFilter("");
    } catch (e: any) {
      console.error("Error creating user:", e.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    await client.deleteUser(userId);
    setUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  const handleUpdateUser = async (user: User): Promise<User> => {
    const saved = await client.updateUser(user);
    await loadUsers();
    return saved;
  };

  return (
    <div className="p-4 position-relative">
      <h3>Users</h3>

      <Button
        onClick={handleCreateUser}
        className="btn-danger mb-3 float-end wd-add-people"
        disabled={loading}
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
            <Button onClick={loadUsers} disabled={loading}>
              Search
            </Button>
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            disabled={loading}
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Administrators</option>
            <option value="FACULTY">Faculty</option>
            <option value="TA">Assistants</option>
            <option value="STUDENT">Students</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button
            variant="link"
            onClick={() => {
              setNameFilter("");
              setRoleFilter("");
            }}
            disabled={loading}
          >
            Reset
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div>Loading users…</div>
      ) : (
        <PeopleTable
          users={users}
          onDelete={handleDeleteUser}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
}
