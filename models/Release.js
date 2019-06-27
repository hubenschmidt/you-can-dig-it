const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const releaseSchema = new Schema({
    id_release: {
        type: Number,
        required: true,
        // validate: {
        //     isAsync: true,
        //     validator: function(v, cb){
        //         Release.find({id_discogs: v}, function(err,docs){
        //             cb(docs.length == 0);
        //         });
        //     },
        //     message: 'Release already exists!'
        // }
    },
    artist: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    labels: {
        type: Array,
        required: false,
    },
    year: {
        type: Number,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    genres: {
        type: Array,
        required: false,
    },
    styles: {
        type: Array,
        required: false,
    },
    tracklist: {
        type: Array,
        required: false,
    },
    url: {
        type: String,
        required: false,
    },
    uri: {
        type: String,
        required: false,
    },
    Search_master_url: {
        type: String,
        required: false
    },
    Search_resource_url: {
        type: String,
        required: false,
    },
    Search_uri: {
        type: String,
        required: false,
    },
    videos: {
        type: Array,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    thumb: {
        type: String,
        required: false
    },
    lowest_price: {
        type: Number,
        required: false,
    },
    wantlist: {
        type: Boolean,
        required: false,
    },
    hide: {
        type: Boolean,
        required: false,
    },
    user_data: {
        type: Map,
        default: null,
        required: false,
    },
    userIds: [
        {
        type: mongoose.Schema.Types.ObjectId,
        required: false
        
    }
]

});

const Release = mongoose.model("releases", releaseSchema)

module.exports = Release;