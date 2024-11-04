import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const DormsPage = () => {
  return (
    <Container>
      <h1>Bendrabučių duomenų valdymas</h1>
      <div className="flex-container">
        <Link to="/dorms/reservation">
          <Button variant="primary">Kambario rezervacija</Button>
        </Link>
        <Link to="/dorms/edit">
          <Button variant="primary">Redaguoti bendrabutį</Button>
        </Link>
        <Link to="/dorms/add">
          <Button variant="primary">Pridėti bendrabutį</Button>
        </Link>
        <Link to="/dorms/requests">
          <Button variant="primary">Prašymų valdymas</Button>
        </Link>
      </div>
    </Container>
  );
};

export default DormsPage;