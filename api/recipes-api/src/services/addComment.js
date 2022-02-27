import axios from "axios";

const API_URL = "http://localhost:8080/api/addComment/";

class AuthService {
  addComment(comment,id,activeUser) {
    console.log("comment")
    return axios.post(API_URL + id, {
      comment,
      id,
      activeUser
    });
  }
}

export default new AuthService();