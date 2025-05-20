import { Container, Row, Col, Form, Button } from "react-bootstrap";


export default function Profile() {
  return (
    <Container fluid className="vh-100 g-0">
      <Row className="h-100 g-0">

        <Col xs={20} md={100} className="d-flex align-items-start justify-content-center">
          <div style={{ width: "100%", maxWidth: 8000, padding: "2rem" }}>
            <h1 className="mb-5">Profile</h1>
            <Form>
              <div className="d-flex align-items-center mb-4">
                <Form.Label style={{ width: "25%", minWidth: 120 }}>Username</Form.Label>
                <Form.Control defaultValue="alice" style={{ flex: 1 }} />
              </div>
              <div className="d-flex align-items-center mb-4">
                <Form.Label style={{ width: "25%", minWidth: 120 }}>ID</Form.Label>
                <Form.Control defaultValue="123" style={{ flex: 1 }} />
              </div>
              <div className="d-flex align-items-center mb-4">
                <Form.Label style={{ width: "25%", minWidth: 120 }}>First Name</Form.Label>
                <Form.Control defaultValue="Alice" style={{ flex: 1 }} />
              </div>

              <div className="d-flex align-items-center mb-4">
                <Form.Label style={{ width: "25%", minWidth: 120 }}>Last Name</Form.Label>
                <Form.Control defaultValue="Wonderland" style={{ flex: 1 }} />
              </div>

              <div className="d-flex align-items-center mb-4">
                <Form.Label style={{ width: "25%", minWidth: 120 }}>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue="2000-01-01"
                  style={{ flex: 1 }}
                />
              </div>

              <div className="d-flex align-items-center mb-4">
                <Form.Label style={{ width: "25%", minWidth: 120 }}>Email</Form.Label>
                <Form.Control defaultValue="alice@wonderland.com" style={{ flex: 1 }} />
              </div>

              <div className="d-flex align-items-center mb-5">
                <Form.Label style={{ width: "25%", minWidth: 120 }}>Role</Form.Label>
                <Form.Control defaultValue="User" style={{ flex: 1 }} />
              </div>

              <div className="d-flex justify-content-end">
                <Button id="wd-signout-btn" variant="danger" size="lg" className="px-5">
                  Signout
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
