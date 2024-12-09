import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { baseUrl } from "../../constants";

const LecturerEditSalaryPage = () => {
  const { id: username } = useParams(); // Assuming `id` is the lecturer's username
  const navigate = useNavigate();
  const [currentSalary, setCurrentSalary] = useState("");
  const [error, setError] = useState(null);

  // Fetch lecturer details
  useEffect(() => {
    fetch(`${baseUrl}/lecturers/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch lecturer details");
        }
        return response.json();
      })
      .then((data) => {
        setCurrentSalary(data.current_salary || "");
      })
      .catch((err) => {
        console.error(err);
        setError("Nepavyko gauti dėstytojo duomenų.");
      });
  }, [username]);

  const handleSave = () => {
    const updatedSalary = parseFloat(currentSalary);

    if (isNaN(updatedSalary) || updatedSalary < 0) {
      setError("Neteisingas atlyginimas.");
      return;
    }

    fetch(`${baseUrl}/lecturers/${username}/salary`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ current_salary: updatedSalary }),
    })
      .then((response) => {
        if (response.ok) {
          navigate(`/lecturers/${username}`);
        } else {
          return response.json().then((data) => {
            throw new Error(data.error || "Failed to update salary");
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Nepavyko atnaujinti atlyginimo.");
      });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!currentSalary) {
    return <p>Kraunama...</p>;
  }

  return (
    <Container>
      <h1>Redaguoti atlyginimą</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Dabartinis atlyginimas</Form.Label>
              <Form.Control
                type="number"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button style={{ width: "100%" }} variant="primary" onClick={handleSave}>
              Išsaugoti
            </Button>
          </Col>
          <Col>
            <Button style={{ width: "100%" }} variant="warning" onClick={() => {}}>
              Taikyti bonusą
            </Button>
          </Col>
          <Col>
            <Button style={{ width: "100%" }} variant="secondary" onClick={() => navigate(`/home/lecturers/${username}`)}>        
              Grįžti į profilį
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default LecturerEditSalaryPage;
