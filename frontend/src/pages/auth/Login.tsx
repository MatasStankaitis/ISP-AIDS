// frontend/src/pages/auth/Login.tsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { baseUrl } from "../../constants";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import background from '../../assets/background.png'; // Import the background image

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        if (authContext) {
          authContext.setUser({ username: data.username, role: data.role });
        }
        navigate('/dashboard', { replace: true });
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login');
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
    <Container className="p-4" style={{ maxWidth: '600px', backdropFilter: 'blur(15px)', borderRadius: '15px' }}>
      <h2 className="mb-4 text-center">Prisijungimas</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit" className="w-100">
          Prisijungti
        </Button>
      </Form>
      <p className="mt-3 text-center">
        Neturite paskyros? <Link to="/register">Užsiregistruoti čia</Link>
      </p>
    </Container>
    </div>
  );
};

export default LoginPage;