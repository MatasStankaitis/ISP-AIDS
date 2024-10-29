import StudentListItem from "../components/StudentItem";
import STUDENTS from "../prototypeData/students";


const Students = () => {
    return <div>
        <h1>Studentu sarasas</h1>;
        <ul style={{textAlign:"center"}}>
            {STUDENTS.map((student) => <StudentListItem {...student}/>)}
        </ul>
        </div>
  };
  
  export default Students;