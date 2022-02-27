import axios from "axios";

const API_URL = "http://localhost:8080/api/addToFriends/";

class AuthService {
  addToFriends(myID,friendID) {
    console.log("add to friends")
    return axios.post(API_URL, {
        myID,
        friendID
    });
  }
}

export default new AuthService();