import axios from "axios";
import Config from "../config";

class PoenexusService {
  register = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  };

  login = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  };

  updateUserInfo = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/updateUserInfo`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  };

  getUserInfo = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/getUserInfo`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  };
}

export default new PoenexusService();
