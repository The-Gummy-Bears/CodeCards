import axios from "axios";

export default {
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  getUserbyName: function(name) {
    return axios.get("/api/users/" + name);
  },
  saveCategory: function(req) {
    return axios.put("/api/users/" + req.username, req);
  },
  addInfoCard: function(cardData) {
    return axios.put("api/users/" + cardData.username + "/addCard", cardData);
  },
  deleteCategory: function(data) {
    console.log(data);
    return axios.put("api/users/" + data.username + "/delete", data);
  }
};