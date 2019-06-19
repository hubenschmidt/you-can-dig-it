import axios from "axios";

export default {
  // Gets all albums 
  getLibrary: function() {
    return axios.get("/api/database/library");
  },

  findById: function(id){
    return axios.get(`/api/database/${id}`)
  }
};
