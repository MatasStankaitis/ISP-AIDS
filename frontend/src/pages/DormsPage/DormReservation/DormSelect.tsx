import { FC, ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface DormSelectProps {
  dorms: string[];
  selectedDorm: string | null;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const DormSelect: FC<DormSelectProps> = ({ dorms, selectedDorm, onChange }) => (
  <Form.Group controlId="dormSelect">
    <Form.Label>Pasirinkite bendrabutį</Form.Label>
    <Form.Control as="select" value={selectedDorm || ""} onChange={onChange}>
      <option value="">Pasirinkite ...</option>
      {dorms.map((dorm, index) => (
        <option key={index} value={dorm}>
          {dorm}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
);

export default DormSelect;