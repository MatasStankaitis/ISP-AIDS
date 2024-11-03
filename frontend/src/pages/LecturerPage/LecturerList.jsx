import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const LecturerList = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  return (
    <>
      <div>
        <h1>Dėstytojų sąrašas</h1>
      </div>
    </>
  );
};

export default LecturerList;
