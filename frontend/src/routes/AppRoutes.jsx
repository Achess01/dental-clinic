import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router";
import { Link, BrowserRouter } from "react-router-dom";
// Components
import { Header } from "../components/Header";
import { LoginForm as Login } from "../personal/Login";
import { Welcome } from "../components/Welcome";

import { CreatePersonalForm } from "../personal/CreatePersonal";

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
  let user = {
    firts_name: "hola",
    // is_assistant: true,
    // is_secretary: true,
    // is_specialist: true,
    // is_admin: true,
    is_staff: true,
  };

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
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={redirectUser(user)} />
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

          <Route path="personal" element={<NotImplemented />} />
          <Route path="personal/:id" element={<NotImplemented />} />

          <Route path="diagnostics" element={<NotImplemented />} />
          <Route path="diagnostics/:id" element={<NotImplemented />} />

          <Route path="treatments" element={<NotImplemented />} />
          <Route path="treatments/:id" element={<NotImplemented />} />

          <Route path="treatments-performed" element={<NotImplemented />} />
          <Route path="treatments-performed/:id" element={<NotImplemented />} />

          <Route path="appointments" element={<NotImplemented />} />

          <Route path="patients" element={<NotImplemented />} />
          <Route path="patients/:patient" element={<NotImplemented />} />
          <Route
            path="patients/:patient/records"
            element={<NotImplemented />}
          />
          <Route path="records" element={<NotImplemented />} />
        </Route>

        <Route
          path="/assistant"
          element={user && user.is_assistant ? <Outlet /> : redirectUser(user)}
        >
          {/* Assistant routes */}
          <Route path="" element={<Welcome />} />
          <Route path="appointments" element={<NotImplemented />} />
          <Route path="patients" element={<NotImplemented />} />
          <Route
            path="patients/:patient/records"
            element={<NotImplemented />}
          />
        </Route>

        <Route
          path="/secretary"
          element={user && user.is_secretary ? <Outlet /> : redirectUser(user)}
        >
          {/* Secretary routes */}
          <Route path="" element={<Welcome />} />
          <Route path="appointments" element={<NotImplemented />} />
          <Route path="patients" element={<NotImplemented />} />
          <Route
            path="patients/:patient/records"
            element={<NotImplemented />}
          />
        </Route>

        <Route
          path="/specialist"
          element={user && user.is_specialist ? <Outlet /> : redirectUser(user)}
        >
          {/* Specialist routes */}
          <Route path="" element={<Welcome />} />
          <Route path="appointments" element={<NotImplemented />} />
          <Route path="patients" element={<NotImplemented />} />
          <Route
            path="patients/:patient/records"
            element={<NotImplemented />}
          />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
