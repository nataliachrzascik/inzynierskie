import axios from "axios";

const API_URL = "http://localhost:8080/api/addToFavourite/";

class AuthService {
  addToFavourite(path,userID) {
    return axios.post(API_URL, {
      path,
      userID
    });
  }
}

export default new AuthService();