import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import "./App.css";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import StudentsList from "./pages/StudentsPage/StudentsList";
import Subjects from "./pages/Subjects";
import SubjectsList from "./pages/SubjectsPage/SubjectsList";
import SubjectCreation from "./pages/SubjectsPage/SubjectCreation";
import SubjectEdit from "./pages/SubjectsPage/SubjectEdit";
import SubjectsRemoval from "./pages/SubjectsPage/SubjectsRemoval";
import SubjectsSelection from "./pages/SubjectsPage/SubjectsSelection";
import StudentDetails from "./pages/StudentsPage/StudentDetails";
import StudentCreation from "./pages/StudentsPage/StudentCreation";
import GradesList from "./pages/GradesPage/GradesList";
import AddGradePage from "./pages/GradesPage/AddGrade";
import EditGradesPage from "./pages/GradesPage/EditGrade";
import ViewGradesPage from "./pages/GradesPage/components/ReportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="students/create" element={<StudentCreation />}></Route>
          <Route path="students/:vidko" element={<StudentDetails />}></Route>
          <Route path="subjects" element={<SubjectsList />} />
          <Route path="subjects/create" element={<SubjectCreation />} />
          <Route path="subjects/remove" element={<SubjectsRemoval />} />
          <Route path="subject/edit" element={<SubjectEdit />} />
          <Route path="subjectsSelection" element={<SubjectsSelection />} />
          <Route path="/grades" element={<GradesList />} />
          <Route path="/grades/add/:studentId" element={<AddGradePage />} />
          <Route path="/grades/edit/:studentId" element={<EditGradesPage />} />
          <Route path="/grades/view/:studentId" element={<ViewGradesPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
