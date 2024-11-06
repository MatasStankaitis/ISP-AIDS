import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const LecturerCreation = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ firstName: '', lastName: '', email: '', salary: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>Vardas</Form.Label>
        <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Pavardė</Form.Label>
        <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>El. paštas</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="salary">
        <Form.Label>Atlyginimas</Form.Label>
        <Form.Control type="number" name="salary" value={formData.salary} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Pridėti dėstytoją
      </Button>
    </Form>
  );
};

export default LecturerCreation;
