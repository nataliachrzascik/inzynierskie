import axios from "axios";

const API_URL = "http://localhost:8080/api/myRecipes/get/";

class AuthService {
  getMyRecipes(nick) {
    return axios.post(API_URL + nick);
  }
}

export default new AuthService();