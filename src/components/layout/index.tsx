import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UnauthenticatedNav } from "./top";

export default function Layout({ token, children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <header>
        <UnauthenticatedNav
          toggleSidebar={() => setSidebarOpen((sidebarOpen) => !sidebarOpen)}
        />
      </header>
      <main>
        <Container fluid>
          <Row>
            {sidebarOpen && (
              <Col
                xs={12}
                md={4}
                lg={2}
                className="bg-dark text-white"
              >
                <Row className="m-3">Home</Row>
                <Row className="m-3">Chat</Row>
                <Row className="m-3">Schedule</Row>
                <Row className="m-3">Clients</Row>
                <Row className="m-3">Bookings</Row>
              </Col>
            )}
            <Col>{children}</Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
