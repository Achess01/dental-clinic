import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router";
import { Link } from "react-router-dom";
// Components
import { Header } from "../components/Header";
import { LoginForm as Login } from "../personal/Login";
import { Welcome } from "../components/Welcome";
import { ChangePasswordForm } from "../personal/ChangeInitialPasswordView";
import { PersonalView } from "../personal/PersonalView";
import { EditPersonalView } from "../personal/EditPersonalView";
import { ReportsView } from "../personal/ReportsView";

import { PatientView } from "../patients/PatientView";
import { EditPatientView } from "../patients/EditPatientView";
import { PatientRecordsView } from "../patients/PatientRecordsView";

import { AppointmentView } from "../appointments/AppointmentView";
import { EditAppointmentView } from "../appointments/EditAppointmentView";
import { SpecialistAppointmentsView } from "../appointments/SpecialistAppointmentsView";
import { EditRecordView } from "../records/EditRecordView";

import {
  DiagnosticView,
  TreatmentView,
  TreatmentPerformedView,
} from "../diagnostics/DiagnosticView";
import {
  EditDiagnosticView,
  EditTreatmentView,
  EditTreatmentPerformedView,
} from "../diagnostics/EditDiagnosticView";

// Redux
import { useSelector } from "react-redux";

const Error404 = (props) => {
  return (
    <>
      <h1>Esta página no existe</h1>
      <Link to="/">Regresar al login</Link>
    </>
  );
};

const NotImplemented = (props) => <h1>Sin implementar</h1>;

const NoRoleUser = (props) => {
  return (
    <>
      <h1>Usted no puede ingresar al sistema, consulte con el administrador</h1>
      <Link to="/">Regresar al login</Link>
    </>
  );
};

const AppRoutes = (props) => {
  let user = useSelector((state) => state.user.user);

  const redirectUser = (user) => {
    const requestUser = user;
    if (!requestUser) {
      return <Navigate to="/login" />;
    }

    if (requestUser.is_staff || requestUser.is_admin) {
      return <Navigate to="/staff" />;
    }

    if (requestUser.is_assistant) {
      return <Navigate to="/assistant" />;
    }

    if (requestUser.is_secretary) {
      return <Navigate to="/secretary" />;
    }

    if (requestUser.is_specialist) {
      return <Navigate to="/specialist" />;
    }

    // Do logOut and redirect
    return <Navigate to="/no-role" />;
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={redirectUser(user)} />
        <Route
          path="/change-initial-password"
          element={user ? redirectUser(user) : <ChangePasswordForm />}
        />
        <Route path="/login" element={user ? redirectUser(user) : <Login />} />
        <Route path="/no-role" element={<NoRoleUser />} />

        <Route
          path="/staff"
          element={
            user && (user.is_staff || user.is_admin) ? (
              <Outlet />
            ) : (
              redirectUser(user)
            )
          }
        >
          {/* Staff routes */}
          <Route path="" element={<Welcome />} />

          <Route path="reports" element={<ReportsView />} />

          <Route path="personal" element={<PersonalView />} />
          <Route path="personal/:username" element={<EditPersonalView />} />

          <Route path="diagnostics" element={<DiagnosticView />} />
          <Route path="diagnostics/:id" element={<EditDiagnosticView />} />

          <Route path="treatments" element={<TreatmentView />} />
          <Route path="treatments/:id" element={<EditTreatmentView />} />

          <Route
            path="treatments-performed"
            element={<TreatmentPerformedView />}
          />
          <Route
            path="treatments-performed/:id"
            element={<EditTreatmentPerformedView />}
          />

          <Route path="appointments" element={<AppointmentView />} />

          <Route path="patients" element={<PatientView />} />
          <Route path="patients/:id" element={<EditPatientView />} />
          <Route path="patients/:id/records" element={<PatientRecordsView />} />
        </Route>

        <Route
          path="/assistant"
          element={user && user.is_assistant ? <Outlet /> : redirectUser(user)}
        >
          {/* Assistant routes */}
          <Route path="" element={<Welcome />} />
          <Route path="appointments" element={<AppointmentView />} />

          <Route path="patients" element={<PatientView />} />
          <Route path="patients/:id/records" element={<PatientRecordsView />} />
        </Route>

        <Route
          path="/secretary"
          element={user && user.is_secretary ? <Outlet /> : redirectUser(user)}
        >
          {/* Secretary routes */}
          <Route path="" element={<Welcome />} />

          <Route path="appointments" element={<AppointmentView />} />
          <Route path="appointments/:id" element={<EditAppointmentView />} />

          <Route path="patients" element={<PatientView />} />
          <Route path="patients/:id" element={<EditPatientView />} />
          <Route path="patients/:id/records" element={<PatientRecordsView />} />
        </Route>

        <Route
          path="/specialist"
          element={user && user.is_specialist ? <Outlet /> : redirectUser(user)}
        >
          {/* Specialist routes */}
          <Route path="" element={<Welcome />} />
          <Route path="appointments" element={<SpecialistAppointmentsView />} />
          <Route path="appointments/:id/record" element={<EditRecordView />} />

          <Route path="patients" element={<PatientView />} />
          <Route path="patients/:id/records" element={<PatientRecordsView />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
