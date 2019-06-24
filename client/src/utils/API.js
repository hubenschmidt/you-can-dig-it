
import axios from 'axios'
import { API_URL } from './config'

export default {
  
  wakeUp: socketId => {
    return fetch(`${API_URL}/wake-up?socketId=${socketId}`, {
      credentials: 'include'
    })
      .then(res => res.ok)
  },


  logout: () => {
    const authToken = localStorage.getItem('authToken')

    return fetch(`${API_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      credentials: 'include'
    })
      .then(res => res.ok)
  },

  
  getLibrary: function() {
    return axios.get("/api/database/library");
  },

  findById: function(id){
    return axios.get(`/api/database/${id}`)
  }
} 

