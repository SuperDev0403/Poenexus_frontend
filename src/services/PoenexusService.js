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

  getSellData = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/getSellData`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  };

  getGameMode = () => {
    return axios
      .get(`https://api.pathofexile.com/leagues`)
      .then((res) => res.data)
      .catch((err) => err.response);
  };

  saveSell = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/saveSell`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  };

  getBuyData = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/getBuyData`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  };

  getPriceChaos = () => {
    const api = Config.API_URL;
    return axios
      .get(`${api}/getPriceChaos`)
      .then((res) => res.data)
      .catch((err) => err.response);
  };

  saveTransaction = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/saveTransaction`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  };

  cancelSellObj = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/cancelSellObj`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  };

  acceptObj = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/acceptObj`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  };
}

export default new PoenexusService();
