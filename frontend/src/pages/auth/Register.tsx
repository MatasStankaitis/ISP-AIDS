// frontend/src/pages/auth/Register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { baseUrl } from "../../constants";
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import background from '../../assets/background.png'; // Import the background image

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
    phone_number: '',
    email: '',
    home_address: '',
    gender: '',
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during registration');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container className="p-4" style={{ maxWidth: '600px', backdropFilter: 'blur(25px)', borderRadius: '15px' }}>
        <h2 className="mb-4 text-center">Registracija</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Vartotojo vardas</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Įveskite vartotojo vardą"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Slaptažodis</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Įveskite slaptažodį"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Vardas</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Įveskite vardą"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="surname" className="mb-3">
                <Form.Label>Pavardė</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  placeholder="Įveskite pavardę"
                  required
                  value={formData.surname}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>El. paštas</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Įveskite el paštą"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="phone_number" className="mb-3">
                <Form.Label>Telefono numeris</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  placeholder="Įveskite tel nr."
                  required
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="home_address" className="mb-3">
                <Form.Label>Namų adresas</Form.Label>
                <Form.Control
                  type="text"
                  name="home_address"
                  placeholder="Įveskite namų adresą"
                  required
                  value={formData.home_address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="gender" className="mb-4">
            <Form.Label>Lytis</Form.Label>
            <Form.Select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Pasirinkti lytį</option>
              <option value="1">Vyras</option>
              <option value="2">Moteris</option>
              <option value="3">Helikopteris</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Užsiregistruoti
          </Button>
        </Form>
        <p className="mt-3 text-center">
          Jau turite paskyrą? <Link to="/login">Prisijunk čia</Link>
        </p>
      </Container>
    </div>
  );
};

export default RegisterPage;