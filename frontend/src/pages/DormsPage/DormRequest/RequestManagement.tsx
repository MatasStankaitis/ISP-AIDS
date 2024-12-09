// frontend/src/pages/DormsPage/RequestManagement/RequestManagement.tsx
import { useState, useEffect, useContext } from "react";
import { Container, Alert, Button, Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RequestForm from "./RequestForm";
import RequestList from "./RequestList";
import RequestFilter from "./RequestFilter";
import { baseUrl } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";

interface Request {
  id: number;
  title: string;
  typeName: string;
  description: string;
  statusName: string;
  date_created: string;
  studentUsername?: string;
}

const RequestManagement = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showRequestsModal, setShowRequestsModal] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(authContext.user);
  
  const fetchRequests = async (filters = {}) => {
    try {
      const endpoint = authContext?.user?.role === 'administrator'
        ? `${baseUrl}/dorms/requests`
        : `${baseUrl}/dorms/requests/student/${authContext?.user?.username}`;
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`${endpoint}?${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCreateRequest = async (title: string, type: string, description: string) => {
    try {
      const studentUsername = authContext?.user?.username; // Use actual username
      const response = await fetch(`${baseUrl}/dorms/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentUsername,
          title,
          type,
          description,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create request");
      }
      const data = await response.json();
      setMessage(data.message);
      fetchRequests();
      setShowModal(false); // Close the modal on success
    } catch (error) {
      console.error(error);
      setMessage("Failed to create request");
    }
  };


  const handleFilter = async (filters: { username: string}) => {
     try {
      if (filters.username === "") {
        fetchRequests();
        return;
      }
      const response =  await fetch(`${baseUrl}/dorms/requests/student/${filters.username}`);
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Prašymų valdymas</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Row className="mb-3 justify-content-center">
        <Col xs="auto">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Grįžti atgal
          </Button>
        </Col>
        {authContext?.user?.role !== 'administrator' && (
          <Col xs="auto">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Pildyti prašymą
            </Button>
          </Col>
        )}
        <Col xs="auto">
          <Button variant="primary" onClick={() => setShowRequestsModal(true)}>
            Atidaryti prašymų sąrašą
          </Button>
        </Col>
      </Row>
      {authContext?.user?.role !== 'administrator' && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Pildyti prašymą</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RequestForm onSubmit={handleCreateRequest} />
          </Modal.Body>
        </Modal>
      )}
      <Modal show={showRequestsModal} onHide={() => setShowRequestsModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Prašymų sąrašas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {authContext?.user?.role === 'administrator' && <RequestFilter onFilter={handleFilter} />}
          <RequestList requests={requests} isAdmin={authContext?.user?.role === 'administrator'} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RequestManagement;