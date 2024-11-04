import { useState } from "react";
import { Container, Form, Button, ListGroup, Collapse } from "react-bootstrap";

const RequestHandling = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState("");
  const [requestType, setRequestType] = useState("");
  const [expandedRequest, setExpandedRequest] = useState(null);

  const handleAddRequest = () => {
    const newRequestObj = {
      text: newRequest,
      type: requestType,
      approved: null,
      timeCreated: new Date().toLocaleString(),
    };
    setRequests([...requests, newRequestObj]);
    setNewRequest("");
    setRequestType("");
  };

  const handleApproval = (index, approved) => {
    const updatedRequests = requests.map((request, i) =>
      i === index ? { ...request, approved } : request
    );
    setRequests(updatedRequests);
  };

  const toggleExpand = (index) => {
    setExpandedRequest(expandedRequest === index ? null : index);
  };

  return (
    <Container>
      <h1>Prašymų valdymas</h1>
      <Form>
        <Form.Group controlId="requestForm">
          <Form.Label>Naujas prašymas</Form.Label>
          <Form.Control
            type="text"
            value={newRequest}
            onChange={(e) => setNewRequest(e.target.value)}
            placeholder="Įveskite prašymą"
          />
        </Form.Group>
        <Form.Group controlId="requestType">
          <Form.Label>Prašymo tipas</Form.Label>
          <Form.Control
            as="select"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
          >
            <option value="">Pasirinkite tipą...</option>
            <option value="Type 1">Tipas 1</option>
            <option value="Type 2">Tipas 2</option>
            <option value="Type 3">Tipas 3</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleAddRequest}>
          Pridėti prašymą
        </Button>
      </Form>
      <h2>Prašymų sąrašas</h2>
      <ListGroup>
        {requests.map((request, index) => (
          <ListGroup.Item key={index} onClick={() => toggleExpand(index)}>
            <div>
              <strong>{request.type}</strong>: {request.text}
            </div>
            <Collapse in={expandedRequest === index}>
              <div>
                <p>Laikas sukurtas: {request.timeCreated}</p>
                <div>
                  {request.approved === null ? (
                    <>
                      <Button
                        variant="success"
                        onClick={() => handleApproval(index, true)}
                      >
                        Patvirtinti
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleApproval(index, false)}
                      >
                        Atmesti
                      </Button>
                    </>
                  ) : request.approved ? (
                    <span style={{ color: "green" }}>Patvirtinta</span>
                  ) : (
                    <span style={{ color: "red" }}>Atmesta</span>
                  )}
                </div>
              </div>
            </Collapse>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default RequestHandling;