/* App */
import React from "react";
import { CreatePersonalForm } from "./personal/CreatePersonal";
import { PatientForm } from "./patients/PatientForm";
import { AppointmentForm } from "./patients/AppointmentForm";

function App() {
  return (
    <div className="App">
      <AppointmentForm />
    </div>
  );
}

export default App;
