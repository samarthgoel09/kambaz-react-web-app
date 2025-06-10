import React, { useState } from "react";
import * as client from "./client";
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signin() {
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const user = await client.signin(credentials);
    if (!user) {
      alert("Invalid credentials");
      return;
    }
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard", { replace: true });
  } catch (err: any) {
    console.error("Sign-in error:", err, err.response);
    const msg =
      err.response?.data?.message ||
      err.message ||
      "Unknown error";
    alert(`Sign-in failed: ${msg}`);
  }
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
            <h1 className="mb-4">Sign in</h1>
            <Form onSubmit={handleSignIn}>
              <Form.Group controlId="wd-username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <FormControl
                  placeholder="username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="wd-password" className="mb-4">
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
                id="wd-signin-btn"
                variant="primary"
                type="submit"
                className="w-100 mb-3"
              >
                Sign in
              </Button>

              <div className="text-center">
                <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
                  Sign up
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
