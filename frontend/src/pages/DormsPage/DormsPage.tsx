import Container from "react-bootstrap/Container";
import NavButton from "../../components/NavButton"; // Adjust the import path as necessary

const DormsPage = () => {
  return (
    <Container>
      <h1>Bendrabučių duomenų valdymas</h1>
      <div className="flex-container">
        <NavButton to="/dorms/reservation">Kambario rezervacija</NavButton>
        <NavButton to="/dorms/edit">Redaguoti bendrabutį</NavButton>
        <NavButton to="/dorms/add">Pridėti bendrabutį</NavButton>
        <NavButton to="/dorms/requests">Prašymų valdymas</NavButton>
      </div>
    </Container>
  );
};

export default DormsPage;