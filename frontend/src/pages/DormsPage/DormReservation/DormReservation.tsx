import { useState, useEffect, ChangeEvent, FormEvent, useContext } from "react";
import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import DormSelect from "./DormSelect";
import RoomSelect from "./RoomSelect";
import { baseUrl } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DormReservation = () => {
  const [dorms, setDorms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedDorm, setSelectedDorm] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/dorms`)
      .then((response) => response.json())
      .then((data) => setDorms(data))
      .catch((error) => console.error("Failed to fetch dorms", error));
  }, []);

  const handleDormChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const dormId = e.target.value;
    setSelectedDorm(dormId);
    setSelectedRoom(null);
    fetch(`${baseUrl}/dorms/${dormId}/rooms`)
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Failed to fetch rooms", error));
  };

  const handleRoomChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoom(e.target.value);
  };

  const handleReserve = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || !authContext?.user?.username) return;

    try {
      const response = await fetch(`${baseUrl}/dorms/rooms/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId: selectedRoom, studentUsername: authContext.user.username }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Failed to reserve room", error);
      setMessage("Failed to reserve room");
    }
  };

  return (
    <Container>
      <h1>Bendrabučio rezervacija</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleReserve}>
        <DormSelect dorms={dorms} selectedDorm={selectedDorm} onChange={handleDormChange} />
        {selectedDorm && (
          <RoomSelect rooms={rooms} selectedRoom={selectedRoom} onChange={handleRoomChange} />
        )}
        <Row className="mt-3">
          <Col>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Grįžti atgal
            </Button>
          </Col>
          <Col className="text-end">
            <Button variant="primary" type="submit" disabled={!selectedRoom}>
              Rezervuoti
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default DormReservation;