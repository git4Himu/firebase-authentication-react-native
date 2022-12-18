import axios from "axios";
axios.interceptors.request.use(function (config) {
  // Pass  the token for backend Auth
  // I Don't need because
  // I dont authorize validate the token in firebase database
  // its open to all read and write

  return config;
});
