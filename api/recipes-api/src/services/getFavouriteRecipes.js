import axios from "axios";

const API_URL = "http://localhost:8080/api/getFavoutiteRecipes/";

class AuthService {
  getFavouriteRecipes(tableID) {
    return axios.post(API_URL, {
       tableID
      });
  }
}

export default new AuthService();