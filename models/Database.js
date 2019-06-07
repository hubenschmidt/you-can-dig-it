const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Database = new Schema({
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
    }
});

module.exports = Database;