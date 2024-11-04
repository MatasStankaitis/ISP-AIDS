import React, { useState } from 'react';
import LecturerDataTable from './components/LecturerDataTable';
import LecturerCreation from './LecturerCreation';

const LecturersList = () => {
  const [lecturers, setLecturers] = useState([
    // Pradinis dėstytojų sąrašas arba tuščias, jei nėra duomenų
  ]);

  const handleAddLecturer = (newLecturer) => {
    setLecturers([...lecturers, { ...newLecturer, id: lecturers.length + 1 }]);
  };

  const handleDeleteLecturer = (id) => {
    setLecturers(lecturers.filter((lecturer) => lecturer.id !== id));
  };

  const handleEditSalary = (id) => {
    const salary = prompt("Įveskite naują atlyginimą:");
    if (salary) {
      setLecturers(lecturers.map((lecturer) =>
        lecturer.id === id ? { ...lecturer, salary } : lecturer
      ));
    }
  };

  return (
    <div>
      <h1>Dėstytojų sąrašas</h1>
      
      {/* Mygtukas „Pridėti dėstytoją“ su „flex-container“ klase */}
      <div className="flex-container">
        <button onClick={() => alert("Čia bus pridėtas dėstytojo kūrimas!")}>Pridėti dėstytoją</button>
      </div>

      {/* Lentelė su „table-div“ klase, kad būtų siauresnė ir centruota */}
      <div className="table-div">
        <LecturerDataTable
          lecturers={lecturers}
          onDelete={handleDeleteLecturer}
          onEditSalary={handleEditSalary}
        />
      </div>

      {/* „LecturerCreation“ forma su „filtersDiv“ klase */}
      <div className="filtersDiv">
        <LecturerCreation onAdd={handleAddLecturer} />
      </div>
    </div>
  );
};

export default LecturersList;
