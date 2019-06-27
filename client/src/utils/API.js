
import axios from 'axios'
import { API_URL } from './config'
import filterParams from './filterParams';

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

  
  getLibrary: function(id) {
    return axios.get(`/api/database/library/${id}`);
  },

  findById: function(id){
    return axios.get(`/api/database/${id}`)
  },

  syncUserReleases: function(id) {
    return axios.get(`/api/database/syncUserReleases/${id}`)
  },

  getSearchResults: function(params){
    return axios.get('/api/search', { params: filterParams(params) });
  },

  saveRelease: function(releaseData) {
    console.log(releaseData, 'logging search release')
    return axios.post("/api/database/library", releaseData);
  }  
} 

