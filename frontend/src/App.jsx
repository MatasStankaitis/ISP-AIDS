import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import "./App.css";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import StudentsList from "./pages/StudentsPage/StudentsList";
import LecturersPage from "./pages/LecturerPage/LecturersPage";
import Subjects from "./pages/Subjects";
import StudentDetails from "./pages/StudentsPage/StudentDetails";
import StudentCreation from "./pages/StudentsPage/StudentCreation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="lecturers" element={<LecturersPage />} />
          <Route path="students/create" element={<StudentCreation />}></Route>
          <Route path="students/:vidko" element={<StudentDetails />}></Route>
          <Route path="subjects" element={<Subjects />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
