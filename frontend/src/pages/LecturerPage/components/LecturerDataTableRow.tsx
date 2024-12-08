import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

interface LecturerDataTableRowProps {
  name: string;
  surname: string;
  username: string;
  phone_number: string;
  email: string;
  home_address: string;
  gender: string;
  status: string;
  faculty: string;
  current_salary: number;
  onRemove: (name: string) => void;
}

const LecturerDataTableRow = ({
  name,
  surname,
  username,
  phone_number,
  email,
  home_address,
  gender,
  status,
  faculty,
  current_salary,
  onRemove,
}: LecturerDataTableRowProps) => (
  <tr>
    <td>{username}</td> {/* Unique Identifier or Index */}
    <td>{name}</td>
    <td>{surname}</td>
    <td>{username}</td>
    <td>{phone_number || "N/A"}</td>
    <td>{email}</td>
    <td>{status || "N/A"}</td>
    <td>{faculty || "N/A"}</td>
    <td>{home_address || "N/A"}</td>
    <td>{gender || "N/A"}</td>
    <td>{current_salary ? `€${current_salary}` : "N/A"}</td>
    <td>
      <Link to={`/lecturers/${username}`}>
        <Button variant="success">Peržiūrėti</Button>
      </Link>
      <Button variant="danger" onClick={() => onRemove(name)}>
        Pašalinti
      </Button>
    </td>
  </tr>
);

export default LecturerDataTableRow;
