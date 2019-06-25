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
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    labels: {
        type: Array,
        required: false,
    },
    year: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: false,
    },
    genres: {
        type: Array,
        required: true,
    },
    styles: {
        type: Array,
        required: true,
    },
    tracklist: {
        type: Array,
        required: true,
    },
    uri: {
        type: String,
        required: true,
    },
    videos: {
        type: Array,
        required: false,
    },
    images: {
        type: Array,
        required: false,
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
    userIds: [
        {
        type: mongoose.Schema.Types.ObjectId
        
    }
]

});

const Release = mongoose.model("releases", releaseSchema)

module.exports = Release;