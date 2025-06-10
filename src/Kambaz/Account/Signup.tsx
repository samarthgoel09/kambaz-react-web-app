import React, { useState } from "react";
import { FormControl, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username.trim() || !credentials.password.trim()) {
      alert("Please enter both a username and password.");
      return;
    }
    try {
      const newUser = await client.signup(credentials);
      dispatch(setCurrentUser(newUser));
      navigate("/Kambaz/Account/Profile", { replace: true });
    } catch (err: any) {
      if (err.response?.status === 400) {
        alert(err.response.data.message);
      } else {
        console.error(err);
        alert("Signup failed—please try again.");
      }
    }
  };

  return (
    <Container fluid className="vh-100 g-0">
      <Row className="h-100 g-0">
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <div style={{ width: 320, padding: "2rem" }}>
            <h1 className="mb-4">Sign up</h1>
            <form onSubmit={handleSignup}>
              <FormControl
                className="mb-3"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                id="wd-signup-username"
              />
              <FormControl
                className="mb-4"
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                id="wd-signup-password"
              />
              <Button
                id="wd-signup-btn"
                variant="primary"
                type="submit"
                className="w-100 mb-3"
              >
                Sign up
              </Button>
            </form>
            <div className="text-center">
              <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
