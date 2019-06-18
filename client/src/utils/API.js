import axios from "axios";

export default {
    //Gets all releases saved in local database
    getReleases: function(){
        return axios.get('/api/database')
    },

    //Gets one release saved in local database with the given id
    getRelease: function(id_release){
        return axios.get('/api/database/:id_release')
    }

}