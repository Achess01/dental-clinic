import React from "react";

// Components
import { DiagnosticsGenericView } from "./DiagnosticsGenericView";

// API
import { DIAGNOSTICS, TREATMENTS, TREATMENTS_PERFORMED } from "../config/api";

export const DiagnosticView = (props) => (
  <DiagnosticsGenericView path={DIAGNOSTICS} text={"Diagnósticos"} />
);

export const TreatmentView = (props) => (
  <DiagnosticsGenericView path={TREATMENTS} text={"Tratamientos"} />
);

export const TreatmentPerformedView = (props) => (
  <DiagnosticsGenericView
    path={TREATMENTS_PERFORMED}
    text={"Tratamientos realizados"}
  />
);
