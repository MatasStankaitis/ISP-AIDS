// frontend/src/pages/DormsPage/DormsPage.tsx
import { Container, Row, Col } from "react-bootstrap";
import NavButton from "../../components/NavButton";
import {
  FaBed,
  FaEdit,
  FaPlus,
  FaEnvelope,
  FaBackward,
} from "react-icons/fa"; // Import icons

const DormsPage = () => {
  return (
    <Container className="mt-4 text-center">
      <h1 className="mb-4">Bendrabučių duomenų valdymas</h1>
      <Row className="g-3 justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <NavButton
            to="/home/dorms/reservation"
            className="btn btn-outline-primary btn-lg w-100"
          >
            <FaBed className="me-2" />
            Kambario rezervacija
          </NavButton>
        </Col>
        <Col xs={12} md={10} lg={8}>
          <NavButton
            to="/home/dorms/edit"
            className="btn btn-outline-primary btn-lg w-100"
          >
            <FaEdit className="me-2" />
            Redaguoti bendrabutį
          </NavButton>
        </Col>
        <Col xs={12} md={10} lg={8}>
          <NavButton
            to="/home/dorms/add"
            className="btn btn-outline-primary btn-lg w-100"
          >
            <FaPlus className="me-2" />
            Pridėti bendrabutį
          </NavButton>
        </Col>
        <Col xs={12} md={10} lg={8}>
          <NavButton
            to="/home/dorms/requests"
            className="btn btn-outline-primary btn-lg w-100"
          >
            <FaEnvelope className="me-2" />
            Prašymų valdymas
          </NavButton>
        </Col>
        <Col xs={12} md={10} lg={8}>
          <NavButton
            to="/home"
            className="btn btn-outline-primary btn-lg w-100"
          >
            <FaBackward className="me-2" />
            Atgal
          </NavButton>
        </Col>
      </Row>
    </Container>
  );
};

export default DormsPage;