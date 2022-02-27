import axios from "axios";

const API_URL = "http://localhost:8080/api/recipes/get/";

class AuthService {
  getRecipes(category) {
    return axios.post(API_URL + category);
  }
}

export default new AuthService();