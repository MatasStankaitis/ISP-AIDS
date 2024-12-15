import React from "react";
import { Form } from "react-bootstrap";

const DormSelect = ({ dorms, selectedDorm, onChange }) => {
  return (
    <Form.Group controlId="dormSelect">
      <Form.Label>Pasirinkite bendrabutį</Form.Label>
      <Form.Control as="select" value={selectedDorm || ""} onChange={onChange}>
        <option value="">Pasirinkite...</option>
        {dorms.map((dorm) => (
          <option key={dorm.id} value={dorm.id}>
            {dorm.number} bendrabutis. Adresas: {dorm.address}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default DormSelect;