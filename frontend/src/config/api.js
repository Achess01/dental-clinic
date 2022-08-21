export const USERS = "users";
export const LOGIN = `${USERS}/login`;
export const INITIAL_PASSWORD = `${USERS}/initial_password`;
export const RESET_PASSWORD = `${USERS}/reset_password`;
export const SPECIALISTS = `${USERS}/specialists`;

export const signup = {
  admin: `${USERS}/clinic-admin/signup`,
  specialist: `${USERS}/specialists/signup`,
  assistants: `${USERS}/assistants/signup`,
  secretaries: `${USERS}/secretaries/signup`,
};

const DOMAIN = "http://localhost:3000";

const getEndpoint = (path) => {
  return `${DOMAIN}/${path}/`;
};

export default getEndpoint;
