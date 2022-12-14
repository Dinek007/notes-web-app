import { OpenAPI } from "./api";

export const setBaseUrls = () => {
  OpenAPI.BASE = 'https://i4ihxrxj9j.execute-api.us-east-1.amazonaws.com/dev';
};

export const removeToken = () => {
  OpenAPI.TOKEN = undefined;
};

export const setToken = (accessToken: string) => {
  OpenAPI.TOKEN = accessToken;
};