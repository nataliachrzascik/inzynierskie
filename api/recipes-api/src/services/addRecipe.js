import axios from "axios";

const API_URL = "http://localhost:8080/api/recipes/";

class AuthService {
  add(nick, title, category,ingredients,descryption,name,file) {
    return axios.post(API_URL + "add", {
      nick,
      title,
      category,
      ingredients,
      descryption,
      name,
      file
    });
  }
}

export default new AuthService();