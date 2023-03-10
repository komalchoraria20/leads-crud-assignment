import { Container, Navbar, Col } from "react-bootstrap";

import {
  List,
  Bell,
  Grid3x3GapFill,
  PersonCircle,
} from "react-bootstrap-icons";

export function UnauthenticatedNav({ toggleSidebar }) {
  return (
    <Navbar
      bg="dark"
      className="shadow-sm"
      expand="lg"
    >
      <Container
        fluid
        className="text-white"
      >
        <Col
          className="d-flex align-items-center"
          xs={8}
          md={4}
        >
          <List
            size={30}
            onClick={toggleSidebar}
          />
          <Navbar.Brand
            href="/"
            className="text-white ml-1"
          >
            <strong>SAPIEN SYSTEMS</strong>
          </Navbar.Brand>
        </Col>
        <Col
          md={4}
          className="d-none d-lg-flex justify-content-center align-items-center"
        >
          <strong>#BeAChangeMaker</strong>
        </Col>
        <Col
          xs={4}
          md={4}
          className="d-flex justify-content-end align-items-center"
        >
          <Bell
            size={26}
            className="mr-3"
          />
          <Grid3x3GapFill
            size={26}
            className="mr-3"
          />
          <PersonCircle size={26} />
        </Col>
      </Container>
    </Navbar>
  );
}
