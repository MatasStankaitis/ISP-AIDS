// StudentDataTableRow.js
import React from "react";
import PropTypes from "prop-types";

const StudentDataTableRow = ({ name, surname, id, addGradeButton, editGradesButton, viewGradesButton }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{surname}</td>
            <td>
                {addGradeButton}
                {editGradesButton}
                {viewGradesButton}
            </td>
        </tr>
    );
};

StudentDataTableRow.propTypes = {
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    addGradeButton: PropTypes.element,
    editGradesButton: PropTypes.element,
    viewGradesButton: PropTypes.element,
};

export default StudentDataTableRow;
