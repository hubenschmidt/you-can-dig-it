const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Database = new Schema({
    artist: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    }
    label: {
        type: String,
        required: true,
    }
    tracklist: {
        type: Array,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    styles: {
        type: Array,
        required: true,
    },
    wantlist: {
        type: Boolean,
        required: false
    },
    hide: {
        type: Boolean,
        required: false
    }
});

module.exports = Database;