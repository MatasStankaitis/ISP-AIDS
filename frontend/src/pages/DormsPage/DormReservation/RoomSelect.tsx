import React from "react";
import { Form } from "react-bootstrap";

const RoomSelect = ({ rooms, selectedRoom, onChange }) => {

  const mapStatus = (status) => {
    switch (status) {
      case 1:
        return "Laisvas";
      case 2:
        return "Užimtas";
      case 3:
        return "Rezervuotas";
      default:
        return "Nežinomas";
    }
  }

  return (
    <Form.Group controlId="roomSelect">
      <Form.Label>Pasirinkite kambarį</Form.Label>
      <Form.Control as="select" value={selectedRoom || ""} onChange={onChange}>
        <option value="">Pasirinkite...</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            Kambarys nr. {room.room_number}. Kambario statusas: {mapStatus(room.status)}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default RoomSelect;