/* App */
import React from "react";
import { CreatePersonalForm } from "./personal/CreatePersonal";
import { PatientForm } from "./patients/PatientForm";
import { AppointmentForm } from "./patients/AppointmentForm";
import { RecordForm } from "./patients/RecordForm";

function App() {
  return (
    <div className="App">
      <RecordForm />
    </div>
  );
}

export default App;
