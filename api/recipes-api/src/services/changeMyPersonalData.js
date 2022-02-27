import axios from "axios";

const API_URL = "http://localhost:8080/api/changeMyPersonalData/";

class AuthService {
  changeMyPersonalData(activeUser, name, sex, city,  descryption, file) {
    return axios.post(API_URL + activeUser, {
        activeUser,
        name,
        sex,
        city,
        descryption,
        file
    });
  }
}

export default new AuthService();