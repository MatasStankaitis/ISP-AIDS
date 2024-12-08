// frontend/src/pages/Layout.tsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { baseUrl } from "../constants";

const Layout = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      authContext?.setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">AIDS</Navbar.Brand>
          <Nav className="me-auto">
            {authContext?.user ? (
              <>
                <Nav.Link as={Link} to="/home/students">Students</Nav.Link>
                <Nav.Link as={Link} to="/home/lecturers">Lecturers</Nav.Link>
                <Nav.Link as={Link} to="/home/subjects">Subjects</Nav.Link>
                <Nav.Link as={Link} to="/home/subjectsSelection">Subject Selection</Nav.Link>
                <Nav.Link as={Link} to="/home/dorms">Dorms</Nav.Link>
                <Nav.Link as={Link} to="/home/admin">Users Management</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : null}
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;