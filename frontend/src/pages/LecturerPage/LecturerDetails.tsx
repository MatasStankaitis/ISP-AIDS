import { useParams, Link } from "react-router-dom";
import LECTURERS from "../../prototypeData/lecturers";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LecturerDetails = () => {
  const { id } = useParams();
  const lecturer = LECTURERS.find((lect) => lect.id === Number(id));

  if (!lecturer) {
    return <p>Dėstytojas nerastas.</p>; // If the lecturer is not found
  }

  return (
    <Container>
      <h1>Dėstytojo informacija</h1>
      <Row>
        <Col md={8}>
          <p><strong>Vardas:</strong> {lecturer.name}</p>
          <p><strong>Pavardė:</strong> {lecturer.surname}</p>
          <p><strong>Vartotojo vardas:</strong> {lecturer.username}</p>
          <p><strong>Telefono nr.:</strong> {lecturer.phone}</p>
          <p><strong>El. paštas:</strong> {lecturer.email}</p>
          <p><strong>Statusas:</strong> {lecturer.status}</p>
          <p><strong>Fakultetas:</strong> {lecturer.faculty}</p>
          <p><strong>Adresas:</strong> {lecturer.address}</p>
          <p>
            <strong>Lytis:</strong>{" "}
            {lecturer.gender === "1" && "Vyras"}
            {lecturer.gender === "2" && "Moteris"}
            {lecturer.gender === "3" && "Kita"}
          </p>
          <p><strong>Atlyginimas:</strong> €{lecturer.salary.toFixed(2)}</p>
        </Col>
        <Col md={4} className="text-center">
          <img
            src={lecturer.pictureUrl}
            alt={`${lecturer.name} ${lecturer.surname}`}
            style={{
              width: "100%",
              maxWidth: "200px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />
        </Col>
      </Row>
      <div>
        <Link to={`/lecturers/${id}/edit`}>
          <Button variant="primary">Redaguoti informaciją</Button>
        </Link>
        <Link to={`/lecturers/${id}/edit-salary`}>
          <Button variant="warning" className="ms-2">Redaguoti atlyginimą</Button>
        </Link>
        <Link to="/lecturers">
          <Button variant="secondary" className="ms-2">Grįžti į sąrašą</Button>
        </Link>
      </div>
    </Container>
  );
};

export default LecturerDetails;
