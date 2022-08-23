import Axios from "axios";

const DOMAIN = "http://localhost:8000";
export const USERS = "users";
export const LOGIN = `${USERS}/login`;
export const INITIAL_PASSWORD = `${USERS}/initial_password`;
export const RESET_PASSWORD = `reset_password`;
export const SPECIALISTS = `${USERS}/specialists`;

export const PATIENTS = "patients";

export const RECORDS = "records";

export const ATTENTION_TYPES = `${RECORDS}/attention_types`;
export const ATTENDANCE_STATES = `${RECORDS}/attendance_states`;
export const VOUCHER_STATES = `${RECORDS}/voucher_states`;
export const SURFACES = `${RECORDS}/surfaces`;

const NO_ATTENDED_RECORDS = "no-attended-records";
const LATE_RECORDS = "late-records";

export const APPOINTMENTS = "appointments";

export const DIAGNOSTICS = "diagnostics";

export const TREATMENTS = "treatments";

export const TREATMENTS_PERFORMED = "treatments-performed";

export const signup = {
  admins: `${USERS}/clinic-admin/signup`,
  specialists: `${USERS}/specialists/signup`,
  assistants: `${USERS}/assistants/signup`,
  secretaries: `${USERS}/secretaries/signup`,
};

const getEndpoint = (path) => {
  return `${DOMAIN}/${path}/`;
};

const signUpGeneric = async ({ data, token, path }) => {
  try {
    const endpoint = getEndpoint(path);
    const response = await Axios.post(endpoint, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

const deleteGeneric = async ({ id, token, path }) => {
  try {
    const endpoint = getEndpoint(path) + `${id}/`;
    const response = await Axios.delete(endpoint, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    return null;
  }
};

export const getAllGeneric = async ({ token, path }) => {
  try {
    const endpoint = getEndpoint(path);
    const response = await Axios.get(endpoint, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    return null;
  }
};

const updateGeneric = async ({ id, token, data, path }) => {
  try {
    const endpoint = `${getEndpoint(path)}${id}/`;
    const response = await Axios.patch(endpoint, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    return null;
  }
};

const getGeneric = async ({ id, token, path }) => {
  try {
    const endpoint = `${getEndpoint(path)}${id}/`;
    const response = await Axios.get(endpoint, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    return null;
  }
};

/* Users */

export const resetPassword = async ({ username, token }) => {
  const path = `${USERS}/${username}/${RESET_PASSWORD}`;
  return await signUpGeneric({ data: {}, token, path });
};

export const signUpUser = async ({ data, type, token }) => {
  return await signUpGeneric({ data, token, path: signup[type] });
};

export const changeInitialPassword = async (data) => {
  try {
    const response = await Axios.post(getEndpoint(INITIAL_PASSWORD), data);
    return response;
  } catch (e) {
    return null;
  }
};

export const getUsers = async (token) => {
  return await getAllGeneric({ token, path: USERS });
};

export const updateUser = async ({ username, token, data }) => {
  return await updateGeneric({ id: username, token, data, path: USERS });
};

export const getUser = async ({ username, token }) => {
  return await getGeneric({ id: username, token, path: USERS });
};

export const getSpecialists = async (token) => {
  return await getAllGeneric({ token, path: SPECIALISTS });
};

export const deleteUser = async ({ username, token }) => {
  return await deleteGeneric({ id: username, token, path: USERS });
};

/* Patients */
export const signUpPatient = async ({ data, token }) => {
  return await signUpGeneric({ data, token, path: PATIENTS });
};

export const getPatients = async (token, params = {}) => {
  const base_path = PATIENTS + "?";
  const path = Object.entries(params).reduce((prev, current) => {
    return `${prev}${current[0]}=${current[1]}&`;
  }, base_path);

  return await getAllGeneric({ token, path });
};

export const updatePatient = async ({ id, token, data }) => {
  return await updateGeneric({ id, token, data, path: PATIENTS });
};

export const getPatient = async ({ id, token }) => {
  return await getGeneric({ id, token, path: PATIENTS });
};

export const deletePatient = async ({ id, token }) => {
  return await deleteGeneric({ id, token, path: PATIENTS });
};

// Appointments

export const signUpAppointment = async ({ data, token }) => {
  return await signUpGeneric({ data, token, path: APPOINTMENTS });
};

export const getAppointments = async (token, params = {}) => {
  const base_path = APPOINTMENTS + "?";
  const path = Object.entries(params).reduce((prev, current) => {
    return `${prev}${current[0]}=${current[1]}&`;
  }, base_path);
  return await getAllGeneric({ token, path });
};

export const updateAppointment = async ({ id, token, data }) => {
  return await updateGeneric({ id, token, data, path: APPOINTMENTS });
};

export const getAppointment = async ({ id, token }) => {
  return await getGeneric({ id, token, path: APPOINTMENTS });
};

// Records

export const getRecords = async ({ token, params }) => {
  const query_params = params || {};
  const base_path = RECORDS + "?";
  const queries = Object.entries(query_params).reduce((prev, current) => {
    return `${prev}${current[0]}=${current[1]}&`;
  }, base_path);

  return await getAllGeneric({ token, path: queries });
};

export const getRecord = async ({ id, token }) => {
  return await getGeneric({ id, token, path: RECORDS });
};

export const updateRecord = async ({ id, token, data }) => {
  return await updateGeneric({ id, token, data, path: RECORDS });
};

export default getEndpoint;
