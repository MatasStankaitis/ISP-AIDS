import { Container, Form, Button, Row, Col } from "react-bootstrap";

const DormEdit = () => {
  return (
    <Container>
      <h1>Redaguoti bendrabutį</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="dormName">
              <Form.Label>Dormitory nr. </Form.Label>
            <Form.Control
                            type="number"
                            placeholder="Įveskite bendrabučio nr"
                            min="1"
                            step="1"
                        />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="dormAddress">
              <Form.Label>Naujas adresas</Form.Label>
              <Form.Control type="text" placeholder="Įveskite nauja adresą" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Išsaugoti pakeitimus
        </Button>
      </Form>
    </Container>
  );
};

export default DormEdit;