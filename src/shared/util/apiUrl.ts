const API_URL = {
  GET_ALL_USERS: "users",
  LOGIN: "users/login",
  SIGNUP: "users/signup",
  ADD_PLACE: "places",
  GET_USER_PLACES: `places/user`,
} as const;

type ApiEndpoint = keyof typeof API_URL;

export const getApiUrl = (
  apiEndpoint: ApiEndpoint,
  dynamicPath?: string
): string => {
  const base = import.meta.env.VITE_BASE_URL;
  const path = API_URL[apiEndpoint];
  return `${base}/${path}${dynamicPath ? `/${dynamicPath}` : ""}`;
};
