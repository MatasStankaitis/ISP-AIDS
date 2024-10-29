import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
  return (
    <>
    
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">AIDS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/students">Studentai</Nav.Link>
            <Nav.Link href="/subjects">Moduliai</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  )
};

export default Layout;