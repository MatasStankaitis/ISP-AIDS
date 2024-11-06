import { useState, ChangeEvent, FormEvent } from "react";
import { Form, Container, Button } from "react-bootstrap";
import DormSelect from "./DormSelect";
import RoomSelect from "./RoomSelect";

const DormReservation = () => {
  const [selectedDorm, setSelectedDorm] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const dorms = ["Bendrabutis 1", "Bendrabutis 2", "Bendrabutis 3"]; // Replace with actual dorm data
  const rooms = {
    "Bendrabutis 1": ["Kambarys 101", "Kambarys 102"],
    "Bendrabutis 2": ["Kambarys 201", "Kambarys 202"],
    "Bendrabutis 3": ["Kambarys 301", "Kambarys 302"],
  };

  const handleDormChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDorm(e.target.value);
    setSelectedRoom(null); // Reset selected room when dorm changes
  };

  const handleRoomChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoom(e.target.value);
  };

  const handleReserve = (e: FormEvent) => {
    e.preventDefault();
    if (selectedRoom) {
      alert(`Room ${selectedRoom} reserved!`);
      // Add your reservation logic here
    } else {
      alert("Please select a room to reserve.");
    }
  };

  return (
    <Container>
      <h1>Bendrabučio rezervacija</h1>
      <Form onSubmit={handleReserve}>
        <DormSelect
          dorms={dorms}
          selectedDorm={selectedDorm}
          onChange={handleDormChange}
        />
        {selectedDorm && (
          <RoomSelect
            rooms={rooms[selectedDorm]}
            selectedRoom={selectedRoom}
            onChange={handleRoomChange}
          />
        )}
        <Button variant="primary" type="submit" disabled={!selectedRoom}>
          Rezervuoti
        </Button>
      </Form>
    </Container>
  );
};

export default DormReservation;