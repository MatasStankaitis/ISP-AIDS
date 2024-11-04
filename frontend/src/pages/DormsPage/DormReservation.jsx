import { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

const DormReservation = () => {
  const [selectedDorm, setSelectedDorm] = useState(null);
  const dorms = ["Bendrabutis 1", "Bendrabutis 2", "Bendrabutis 3"]; // Replace with actual dorm data
  const rooms = {
    "Bendrabutis 1": ["Kambarys 101", "Kambarys 102"],
    "Bendrabutis 2": ["Kambarys 201", "Kambarys 202"],
    "Bendrabutis 3": ["Kambarys 301", "Kambarys 302"],
  };

  const handleReserve = (room) => {
    alert(`Room ${room} reserved!`);
    // Add your reservation logic here
  };

  return (
    <Container>
      <h1>Bendrabučio rezervacija</h1>
      <Form>
        <Form.Group controlId="dormSelect">
          <Form.Label>Pasirinkite bendrabutį</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setSelectedDorm(e.target.value)}
          >
            <option value="">Pasirinkite ...</option>
            {dorms.map((dorm, index) => (
              <option key={index} value={dorm}>
                {dorm}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      {selectedDorm && (
        <div>
          <h2>Kambariai {selectedDorm}</h2>
          <ul>
            {rooms[selectedDorm].map((room, index) => (
              <li key={index}>
                {room}{" "}
                <Button
                  variant="primary"
                  onClick={() => handleReserve(room)}
                >
                  Rezervuoti
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default DormReservation;