import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import StudentsList from "./pages/StudentsPage/StudentsList";
import LecturersPage from "./pages/LecturerPage/LecturersPage";
import LecturerDetails from "./pages/LecturerPage/LecturerDetails";
import LecturerCreation from "./pages/LecturerPage/LecturerCreation";
import LecturerEditPage from "./pages/LecturerPage/LecturerEditPage";
import LecturerEditSalaryPage from "./pages/LecturerPage/LecturerEditSalaryPage";
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
import StudentViewGrade from "./pages/GradesPage/ViewGrades";
import ReportPage from "./pages/GradesPage/Report";
import DormsPage from "./pages/DormsPage/DormsPage";
import DormReservation from "./pages/DormsPage/DormReservation/DormReservation";
import DormEdit from "./pages/DormsPage/DormManagement/DormEdit";
import DormAdd from "./pages/DormsPage/DormManagement/DormAdd";
import RequestManagement from "./pages/DormsPage/DormRequest/RequestManagement";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import Dashboard from "./pages/auth/Dashboard";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import UsersManagement from "./pages/UsersManagement";
import PrivateRoute from "./pages/auth/components/PrivateRoute";
import "./App.css";
import StudentViewGradePage from "./pages/GradesPage/ViewGrades";

function App() {
  const authContext = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Redirect root path based on authentication status */}
      <Route
        path="/"
        element={
          authContext?.user ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Private Routes under "/home" */}
      <Route
        path="/home/*"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />

        {/* Students Routes */}
        <Route
          path="students"
          element={
            <PrivateRoute roles={["administrator"]}>
              <StudentsList />
            </PrivateRoute>
          }
        />
        <Route
          path="students/create"
          element={
            <PrivateRoute roles={["administrator"]}>
              <StudentCreation />
            </PrivateRoute>
          }
        />
        <Route
          path="students/:username"
          element={
            <PrivateRoute roles={["administrator"]}>
              <StudentDetails />
            </PrivateRoute>
          }
        />

        {/* Lecturers Routes */}
        <Route
          path="lecturers"
          element={
            <PrivateRoute roles={["administrator"]}>
              <LecturersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="lecturers/create"
          element={
            <PrivateRoute roles={["administrator"]}>
              <LecturerCreation />
            </PrivateRoute>
          }
        />
        <Route
          path="lecturers/:id"
          element={
            <PrivateRoute roles={["administrator"]}>
              <LecturerDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="lecturers/:id/edit"
          element={
            <PrivateRoute roles={["administrator"]}>
              <LecturerEditPage />
            </PrivateRoute>
          }
        />
        <Route
          path="lecturers/:id/edit-salary"
          element={
            <PrivateRoute roles={["administrator"]}>
              <LecturerEditSalaryPage />
            </PrivateRoute>
          }
        />

        {/* Subjects Routes */}
        <Route
          path="subjects"
          element={
            <PrivateRoute roles={["administrator", "lecturer"]}>
              <SubjectsList />
            </PrivateRoute>
          }
        />
        <Route
          path="subjects/create"
          element={
            <PrivateRoute roles={["administrator"]}>
              <SubjectCreation />
            </PrivateRoute>
          }
        />
        <Route
          path="subjects/remove"
          element={
            <PrivateRoute roles={["administrator"]}>
              <SubjectsRemoval />
            </PrivateRoute>
          }
        />
        <Route
          path="subjects/edit/:code"
          element={
            <PrivateRoute roles={["administrator", "lecturer"]}>
              <SubjectEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="subjectsSelection"
          element={
            <PrivateRoute roles={["student"]}>
              <SubjectsSelection />
            </PrivateRoute>
          }
        />

        {/* Grades Routes */}
        <Route
          path="grades/:subjectCode/students"
          element={
            <PrivateRoute roles={["lecturer"]}>
              <GradesList />
            </PrivateRoute>
          }
        />
        <Route
          path="grades/:subjectCode/students/:username/create"
          element={
            <PrivateRoute roles={["lecturer"]}>
              <AddGradePage />
            </PrivateRoute>
          }
        />
        <Route
          path="grades/:subjectCode/students/:username/edit"
          element={
            <PrivateRoute roles={["lecturer"]}>
              <EditGradesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="grades/:subjectCode/students/:username/report"
          element={
            <PrivateRoute roles={["lecturer"]}>
              <ReportPage />
            </PrivateRoute>
          }
        />
        <Route
          path="grades/:subjectCode/students/:username/mygrades"
          element={
            <PrivateRoute roles={["administrator", "lecturer", "student"]}>
              < StudentViewGradePage />
            </PrivateRoute>
          }
        />

        {/* Dorms Routes */}
        <Route
          path="dorms"
          element={
            <PrivateRoute roles={["administrator", "student"]}>
              <DormsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="dorms/reservation"
          element={
            <PrivateRoute roles={["student"]}>
              <DormReservation />
            </PrivateRoute>
          }
        />
        <Route
          path="dorms/edit"
          element={
            <PrivateRoute roles={["administrator"]}>
              <DormEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="dorms/add"
          element={
            <PrivateRoute roles={["administrator"]}>
              <DormAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="dorms/requests"
          element={
            <PrivateRoute roles={['administrator', 'student']}>
              <RequestManagement />
            </PrivateRoute>
          }
        />

        {/* Users Management */}
        <Route
          path="admin"
          element={
            <PrivateRoute roles={["administrator"]}>
              <UsersManagement />
            </PrivateRoute>
          }
        />
        {/* Dashboard */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute roles={["student", "lecturer", "administrator"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* No Match Route */}
        <Route path="*" element={<NoPage />} />
      </Route>

      {/* Unauthorized Page */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
