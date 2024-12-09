import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { baseUrl } from "../../constants";

const LecturerDetails = () => {
  const { id } = useParams(); // Use the username as the identifier
  const [lecturer, setLecturer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLecturer = async () => {
      try {
        const response = await fetch(`${baseUrl}/lecturers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch lecturer data");
        }
        const data = await response.json();
        setLecturer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturer();
  }, [id]);

  if (loading) {
    return <p>Kraunama...</p>;
  }

  if (error) {
    return <p>Klaida: {error}</p>;
  }

  if (!lecturer) {
    return <p>Dėstytojas nerastas.</p>;
  }

  return (
    <Container>
      <h1>Dėstytojo informacija</h1>
      <Row>
        <Col md={8}>
          <p><strong>Vardas:</strong> {lecturer.name}</p>
          <p><strong>Pavardė:</strong> {lecturer.surname}</p>
          <p><strong>Vartotojo vardas:</strong> {lecturer.username}</p>
          <p><strong>Telefono nr.:</strong> {lecturer.phone_number}</p>
          <p><strong>El. paštas:</strong> {lecturer.email}</p>
          <p><strong>Statusas:</strong> {lecturer.status_name}</p>
          <p><strong>Fakultetas:</strong> {lecturer.faculty_name || "N/A"}</p>
          <p><strong>Adresas:</strong> {lecturer.home_address}</p>
          <p><strong>Lytis:</strong> {lecturer.gender_name}</p>
          <p><strong>Atlyginimas:</strong> €{lecturer.current_salary.toFixed(2)}</p>
        </Col>
        <Col md={4} className="text-center">
          <img
            src={lecturer.photo_URL || "https://via.placeholder.com/200"}
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
