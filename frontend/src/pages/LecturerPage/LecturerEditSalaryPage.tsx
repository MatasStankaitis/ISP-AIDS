import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { baseUrl } from "../../constants";

const LecturerEditSalaryPage = () => {
  const { id: username } = useParams(); // Assuming `id` is the lecturer's username
  const navigate = useNavigate();
  
  const [currentSalary, setCurrentSalary] = useState("");
  const [error, setError] = useState(null);
  const [paychecks, setPaychecks] = useState([]);

  // Modal states for the newest paycheck bonus calculation
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [newestPaycheck, setNewestPaycheck] = useState(null);
  const [calculatedBonus, setCalculatedBonus] = useState(0);

  useEffect(() => {
    // Fetch lecturer details
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

    // Fetch lecturer paychecks
    fetch(`${baseUrl}/lecturers/${username}/paychecks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch paychecks");
        }
        return response.json();
      })
      .then((data) => {
        setPaychecks(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Nepavyko gauti algalapių duomenų.");
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

  // Example bonus calculation function:
  const calculateBonus = (paycheck) => {
    const { working_rate, student_review_score, working_hours, overtime_hours, overtime_rate } = paycheck;
    // Example formula:
    // bonus = (working_hours * 0.05 * working_rate) + (overtime_hours * overtime_rate) + (student_review_score * 5)
    const bonus = (working_hours * 0.05 * working_rate) 
                  + (overtime_hours * overtime_rate)
                  + (student_review_score * 5);
    return bonus.toFixed(2);
  };

  // Find and calculate bonus for the newest paycheck
  const handleCalculateBonus = () => {
    if (paychecks.length === 0) {
      setError("Nėra algalapių, kuriems būtų galima taikyti premiją.");
      return;
    }
    // Sort paychecks by date descending and take the first one
    const sorted = [...paychecks].sort((a, b) => new Date(b.date) - new Date(a.date));
    const newest = sorted[0];
    const bonusValue = calculateBonus(newest);

    setNewestPaycheck(newest);
    setCalculatedBonus(bonusValue);
    setShowBonusModal(true);
  };

  const handlePayBonus = () => {
    if (!newestPaycheck) return;
    
    // Update the newest paycheck with the bonus
    // Let's say we add the bonus to both gross_pay and net_pay (you can adjust the logic):
    const updatedGrossPay = parseFloat(newestPaycheck.gross_pay) + parseFloat(calculatedBonus);
    // Example: net pay might be gross minus some tax; let's assume net pay also increases by the same bonus 
    // or some fraction. Here we just add the full bonus for simplicity:
    const updatedNetPay = parseFloat(newestPaycheck.net_pay) + parseFloat(calculatedBonus);

    // First update the paycheck
    fetch(`${baseUrl}/lecturers/${username}/paychecks/${newestPaycheck.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gross_pay: updatedGrossPay,
        net_pay: updatedNetPay
      }),
    })
    .then(response => {
      if(!response.ok) {
        return response.json().then(data => {
          throw new Error(data.error || "Nepavyko atnaujinti algalapio.");
        });
      }
      // After successful paycheck update, update the lecturer's current_salary to match the updated net pay
      return fetch(`${baseUrl}/lecturers/${username}/salary`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_salary: updatedNetPay })
      });
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.error || "Nepavyko atnaujinti dėstytojo atlyginimo.");
        });
      }
      // Successfully updated both
      setShowBonusModal(false);
      setNewestPaycheck(null);
      // Refetch the paychecks and lecturer data
      return Promise.all([
        fetch(`${baseUrl}/lecturers/${username}`).then(r=>r.json()),
        fetch(`${baseUrl}/lecturers/${username}/paychecks`).then(r=>r.json())
      ]);
    })
    .then(([lecturerData, paycheckData]) => {
      setCurrentSalary(lecturerData.current_salary || "");
      setPaychecks(paycheckData);
    })
    .catch(err => {
      console.error(err);
      setError(err.message || "Įvyko klaida.");
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (currentSalary === "") {
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

        {/* Display paychecks in a table */}
        <Row className="mt-5">
          <Col>
            <h2>Algalapiai</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Working Rate</th>
                  <th>Review Score</th>
                  <th>Working Hours</th>
                  <th>Overtime Hours</th>
                  <th>Overtime Rate</th>
                  <th>Gross Pay</th>
                  <th>Net Pay</th>
                </tr>
              </thead>
              <tbody>
                {paychecks.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.date}</td>
                    <td>{p.working_rate}</td>
                    <td>{p.student_review_score}</td>
                    <td>{p.working_hours}</td>
                    <td>{p.overtime_hours}</td>
                    <td>{p.overtime_rate}</td>
                    <td>{p.gross_pay}</td>
                    <td>{p.net_pay}</td>
                  </tr>
                ))}
                {paychecks.length === 0 && (
                  <tr>
                    <td colSpan="9">No paychecks available.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Button style={{ width: "100%" }} variant="primary" onClick={handleSave}>
              Išsaugoti
            </Button>
          </Col>
          <Col>
            {/* One general bonus calculation button */}
            <Button style={{ width: "100%" }} variant="warning" onClick={handleCalculateBonus}>
              Skaičiuoti bonusą
            </Button>
          </Col>
          <Col>
            <Button
              style={{ width: "100%" }}
              variant="secondary"
              onClick={() => navigate(`/home/lecturers/${username}`)}
            >
              Grįžti į profilį
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Bonus Modal */}
      <Modal show={showBonusModal} onHide={() => setShowBonusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Premijos apskaičiavimas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {newestPaycheck && (
            <div>
              <p><strong>Darbo valandos:</strong> {newestPaycheck.working_hours}</p>
              <p><strong>Viršvalandžiai:</strong> {newestPaycheck.overtime_hours}</p>
              <p><strong>Darbo valandos tarifas:</strong> {newestPaycheck.working_rate}</p>
              <p><strong>Viršvalandžių tarifas:</strong> {newestPaycheck.overtime_rate}</p>
              <p><strong>Studentų vertinimas:</strong> {newestPaycheck.student_review_score}</p>
              <hr />
              <p><strong>Apskaičiuota premija:</strong> {calculatedBonus}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBonusModal(false)}>
            Atšaukti
          </Button>
          <Button variant="primary" onClick={handlePayBonus}>
            Mokėti
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LecturerEditSalaryPage;
