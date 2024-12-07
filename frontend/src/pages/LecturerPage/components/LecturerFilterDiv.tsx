import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface LecturerFilterDivProps {
  onFilter: (searchText: string) => void;
}

const LecturerFilterDiv: React.FC<LecturerFilterDivProps> = ({ onFilter }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    onFilter(searchText);
  };

  return (
    <div className="filtersDiv">
      <Form className="d-flex">
        <Form.Control
          type="text"
          placeholder="Ieškoti pagal vardą ar pavardę"
          value={searchText}
          onChange={handleSearchChange}
          className="me-2"
        />
        <Button variant="primary" onClick={handleSearchClick}>
          Filtruoti
        </Button>
      </Form>
    </div>
  );
};

export default LecturerFilterDiv;
