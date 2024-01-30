import { createContext, useContext } from "react";

// context for user ID to consume it down the tree

export const UserIdContext = createContext<string>("");
export const useUserId = () => useContext(UserIdContext);

// HTTP wrappers provided by web.lab stuff

const formatParams = (params: object) => {
  return Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
};

const convertToJSON = (res: any) => {
  if (!res.ok) {
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
  }
  return res
    .clone() // clone so that the original is still readable for debugging
    .json() // start converting to JSON object
    .catch((error) => {
      // throw an error containing the text that couldn't be converted to JSON
      return res.text().then((text) => {
        throw `API request's result could not be converted to a JSON object: \n${text}`;
      });
    });
};

// Helper code to make a get request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export const get = (endpoint: string, params: object = {}) => {
  const fullPath = endpoint + "?" + formatParams(params);
  return fetch(fullPath)
    .then(convertToJSON)
    .catch((error) => {
      // give a useful error message
      throw `GET request to ${fullPath} failed with error:\n${error}`;
    });
};

// Helper code to make a post request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export const post = (endpoint: string, params: object = {}) => {
  return fetch(endpoint, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
    .then(convertToJSON) // convert result to JSON object
    .catch((error) => {
      // give a useful error message
      throw `POST request to ${endpoint} failed with error:\n${error}`;
    });
};

// Similar helper but for multiform data
export const postMultiform = (endpoint: string, formData: FormData) => {
  return fetch(endpoint, {
    method: "post",
    // Explicitly specifying the header causes an error.
    // According to https://chat.openai.com/share/78a35daa-0a77-4bbb-af9b-f8383f3bec73
    // the hader is automatically inferred by JS with the right "boundary" part of the header
    body: formData,
  }).then(convertToJSON);
};
