const API_URL = {
  GET_ALL_USERS: "users",
  LOGIN: "users/login",
  SIGNUP: "users/signup",
  ADD_PLACE: "places",
  GET_PLACES_BY_USER_ID: "places/user",
  GET_PLACE_BY_ID: "places",
  UPDATE_PLACE_BY_ID: "places",
  DELETE_PLACE_BY_ID: "places"
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
