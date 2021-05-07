import axios from "axios";
import Config from "../config";

class PoenexusService {
  getLocalisations = () => {
    const api = Config.API_URL;
    return axios
      .get(`${api}/venus/content/locale/available`)
      .then((res) => res.data)
      .catch((err) => err.response.data.data);
  };

  register = (data) => {
    const api = Config.API_URL;
    return axios
      .post(`${api}/venus/user`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data.data);
  };
}

export default new PoenexusService();
