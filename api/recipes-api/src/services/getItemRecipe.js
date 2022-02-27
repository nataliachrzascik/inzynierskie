import axios from "axios";

const API_URL = "http://localhost:8080/api/getOneRecipe/";

class AuthService {
  getItemRecipe(id) {
    return axios.post(API_URL + id);
  }
}

export default new AuthService();