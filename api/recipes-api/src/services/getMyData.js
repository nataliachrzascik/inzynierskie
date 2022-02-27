import axios from "axios";

const API_URL = "http://localhost:8080/api/myData/get/";

class AuthService {
  getMyData(nick) {
    return axios.post(API_URL + nick);
  }
}

export default new AuthService();