import React, { useState } from "react";
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as db from "../Database";

export default function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username.trim() || !credentials.password.trim()) {
      alert("Please enter both username and password.");
      return;
    }
    db.users.push({
      _id: String(Date.now()),
      username: credentials.username.trim(),
      password: credentials.password.trim(),
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      role: "STUDENT",
      loginId: "",
      section: "",
      lastActivity: "",
      totalActivity: "",
    });
    alert("Signup successful. Please sign in.");
    navigate("/Kambaz/Account/Signin", { replace: true });
  };

  return (
    <Container fluid className="vh-100 g-0">
      <Row className="h-100 g-0">
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-start justify-content-center"
        >
          <div style={{ width: "100%", maxWidth: 400, padding: "2rem" }}>
            <h1 className="mb-4">Signup</h1>
            <Form onSubmit={handleSignup}>
              <Form.Group controlId="wd-signup-username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <FormControl
                  type="text"
                  placeholder="username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="wd-signup-password" className="mb-4">
                <Form.Label>Password</Form.Label>
                <FormControl
                  type="password"
                  placeholder="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </Form.Group>

              <Button
                id="wd-signup-btn"
                variant="primary"
                type="submit"
                className="w-100 mb-3"
              >
                Signup
              </Button>

              <div className="text-center">
                <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
                  Sign in
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
