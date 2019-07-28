import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-lover.firebaseio.com/"
});

export default instance;
