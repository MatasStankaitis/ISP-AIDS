// frontend/src/pages/Home.tsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col } from 'react-bootstrap';
import universityLogo from '../assets/logo.png'; // Make sure to add the logo to the assets folder
import background from '../assets/background.png'; // Make sure to add the background image to the assets folder

const Home: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        className="text-center p-4"
        style={{
          borderRadius: '25px',
          backdropFilter: 'blur(10px)',
          maxWidth: '600px',
        }}
      >
        <Row className="mb-4">
          <Col>
            <img src={universityLogo} alt="University Logo" style={{ width: '150px' }} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h1>Sveiki atvykę į AIDS</h1>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h2>Vartotojo vardas: {authContext?.user?.username}</h2>
            <p>Rolė: {authContext?.user?.role}</p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h3>Dabartinis laikas</h3>
            <p>{currentTime.toLocaleTimeString()}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;