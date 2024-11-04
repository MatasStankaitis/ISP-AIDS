import React from 'react';
import { useParams } from 'react-router-dom';

const LecturerDetails = ({ lecturers }) => {
  const { id } = useParams();
  const lecturer = lecturers.find((lect) => lect.id === id);

  if (!lecturer) return <p>Dėstytojas nerastas</p>;

  return (
    <div>
      <h2>{lecturer.firstName} {lecturer.lastName}</h2>
      <p>El. paštas: {lecturer.email}</p>
      <p>Atlyginimas: {lecturer.salary} €</p>
    </div>
  );
};

export default LecturerDetails;
