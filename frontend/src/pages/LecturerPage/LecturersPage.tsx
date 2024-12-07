import React from "react";
import LecturerList from "./LecturerList"; // Ensure this import is correct

const LecturersPage = () => {

  return (
    <div>
      <h1>Dėstytojų sąrašas</h1>
      {/* Ensure LecturerList is included */}
      <LecturerList />
    </div>
  );
};

export default LecturersPage;