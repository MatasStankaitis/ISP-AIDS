import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LecturersList from './LecturersList';
import LecturerEdit from './LecturerEdit';
import LecturerDetails from './LecturerDetails';

const LecturersPage = () => {
  const [lecturers, setLecturers] = useState([
    // Pradinis sąrašas – galima pildyti pagal poreikį arba iš duomenų bazės
  ]);

  const handleEditLecturer = (updatedLecturer) => {
    setLecturers(lecturers.map((lecturer) =>
      lecturer.id === updatedLecturer.id ? updatedLecturer : lecturer
    ));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<LecturersList />}
      />
      <Route
        path="edit/:id"
        element={<LecturerEdit lecturers={lecturers} onEdit={handleEditLecturer} />}
      />
      <Route
        path=":id"
        element={<LecturerDetails lecturers={lecturers} />}
      />
    </Routes>
  );
};

export default LecturersPage;
