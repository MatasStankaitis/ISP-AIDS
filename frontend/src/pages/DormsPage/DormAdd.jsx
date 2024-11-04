import { Container, Form, Button, Row, Col } from "react-bootstrap";

const DormAdd = () => {
return (
    <Container>
        <h1>Pridėti bendrabutį</h1>
        <Form>
            <Row>
                <Col>
                    <Form.Group controlId="dormName">
                        <Form.Label>Bendrabučio nr. </Form.Label>
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
                        <Form.Label>Adresas</Form.Label>
                        <Form.Control type="text" placeholder="Įveskite adresą" />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" type="submit">
                Pridėti bendrabutį
            </Button>
        </Form>
    </Container>
);
};

export default DormAdd;