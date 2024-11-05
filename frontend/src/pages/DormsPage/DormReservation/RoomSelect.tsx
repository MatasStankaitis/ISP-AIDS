import { FC, ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface RoomSelectProps {
  rooms: string[];
  selectedRoom: string | null;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const RoomSelect: FC<RoomSelectProps> = ({ rooms, selectedRoom, onChange }) => (
  <Form.Group controlId="roomSelect">
    <Form.Label>Pasirinkite kambarį</Form.Label>
    <Form.Control as="select" value={selectedRoom || ""} onChange={onChange}>
      <option value="">Pasirinkite ...</option>
      {rooms.map((room, index) => (
        <option key={index} value={room}>
          {room}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
);

export default RoomSelect;