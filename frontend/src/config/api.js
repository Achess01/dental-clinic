import Axios from "axios";

const DOMAIN = "http://localhost:8000";
export const USERS = "users";
export const LOGIN = `${USERS}/login`;
export const INITIAL_PASSWORD = `${USERS}/initial_password`;
export const RESET_PASSWORD = `reset_password`;
export const SPECIALISTS = `${USERS}/specialists`;

export const signup = {
  admins: `${USERS}/clinic-admin/signup`,
  specialists: `${USERS}/specialists/signup`,
  assistants: `${USERS}/assistants/signup`,
  secretaries: `${USERS}/secretaries/signup`,
};

const getEndpoint = (path) => {
  return `${DOMAIN}/${path}/`;
};

export const deleteUser = async ({ username, token }) => {
  try {
    const endpoint = getEndpoint(USERS) + `${username}/`;
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

export const resetPassword = async ({ username, token }) => {
  try {
    const endpoint = getEndpoint(USERS) + `${username}/${RESET_PASSWORD}/`;
    const response = await Axios.post(
      endpoint,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const signUpUser = async ({ data, type, token }) => {
  try {
    const response = await Axios.post(getEndpoint(signup[type]), data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
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
  try {
    const response = await Axios.get(getEndpoint(USERS), {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    return null;
  }
};

export const updateUser = async ({ username, token, data }) => {
  try {
    const response = await Axios.patch(
      `${getEndpoint(USERS)}${username}/`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    return null;
  }
};

export const getUser = async ({ username, token }) => {
  try {
    const response = await Axios.get(`${getEndpoint(USERS)}${username}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    return null;
  }
};

export const getSpecialists = async (token) => {
  try {
    const response = await Axios.get(getEndpoint(SPECIALISTS), {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    return null;
  }
};

export default getEndpoint;
