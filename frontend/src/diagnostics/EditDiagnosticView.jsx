import React from "react";

// Components
import { EditDiagnosticsGenericView } from "./EditDiagnosticsGenericView";

//API
import { DIAGNOSTICS, TREATMENTS, TREATMENTS_PERFORMED } from "../config/api";

export const EditDiagnosticView = (props) => (
  <EditDiagnosticsGenericView path={DIAGNOSTICS} text="Diagnóstico" />
);

export const EditTreatmentView = (props) => (
  <EditDiagnosticsGenericView path={TREATMENTS} text="Tratamiento" />
);

export const EditTreatmentPerformedView = (props) => (
  <EditDiagnosticsGenericView
    path={TREATMENTS_PERFORMED}
    text="Tratamientos realizados"
  />
);
