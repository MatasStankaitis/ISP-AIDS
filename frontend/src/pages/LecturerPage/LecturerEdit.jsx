import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const LecturerEdit = ({ lecturers, onEdit }) => {
  const { id } = useParams();
  const lecturer = lecturers.find((lect) => lect.id === parseInt(id));
  const [formData, setFormData] = useState(lecturer || {});
  const navigate = useNavigate();

  if (!lecturer) return <p>Dėstytojas nerastas</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData);
    navigate('/lecturers'); // Grįžti į dėstytojų sąrašą
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
        Išsaugoti pakeitimus
      </Button>
    </Form>
  );
};

export default LecturerEdit;
