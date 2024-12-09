// StudentDataTableRow 
import React from "react";
import PropTypes from "prop-types";

const StudentDataTableRow = ({
  id,
  name,
  surname,
  addGradeButton,
  editGradesButton,
  viewGradesButton
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{surname}</td>
      <td>
        {addGradeButton} {editGradesButton} {viewGradesButton}
      </td>
    </tr>
  );
};

StudentDataTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  addGradeButton: PropTypes.element,
  editGradesButton: PropTypes.element,
  viewGradesButton: PropTypes.element,
};

export default StudentDataTableRow;
