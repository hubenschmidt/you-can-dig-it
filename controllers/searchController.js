const m = require('../models');
const Discogs = require('disconnect').Client;
let discogs_uid;


module.exports = {
    searchAll: searchAll,
    create: create
}
var getUserData = async (id) => {
    return new Promise((resolve, reject) => {
        m.User.findById(id, function (err, doc) {
            if (err) reject(err);
            resolve(doc ? doc.toJSON() : undefined);
        });
    });
}

async function searchAll(req, res) {
    var userData = await getUserData(req.query.userId);
    var accessData = userData.discogsAccessData;
    var dcDb = new Discogs(accessData).database();
    var pr1 = await new Promise((resolve, reject) => {
        dcDb.search(req.query.q,{type:"release", page:1, per_page:5})
            .then(results => resolve(results))
            .catch(err=>reject(err))
    });

    var promises = [];
    pr1.results.forEach(element => {
        promises.push(getReleaseData(element))
    });

    var retVal = await Promise.all(promises);

    res.json(retVal);
};


async function getReleaseData(release) {
    return new Promise((resolve, reject) => {
        new Discogs().database().getRelease(release.id, (err, data) => {
            if (err) reject(err);
            resolve({release, data});
        });
    });
}

var dbFindOneByReleaseId = async(releaseId) => {
    return new Promise((resolve, reject) => {
        m.Release.findOne({id_release: releaseId}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
    
}

async function findOneAndUpdatePromise(conditions, update)
{
    return new Promise((resolve, reject) => {
        m.Release.findOneAndUpdate(conditions, update).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

async function create(req, res){
    var userId = req.params._id;
    var existing = await dbFindOneByReleaseId(req.body.id);
    if (existing) {
        existing = existing.toJSON();
        var update = false;
        if (existing.userIds) {
            existing.userIds = existing.userIds.map(uid => uid.toString());
            if (existing.userIds.indexOf(userId) == -1)
            {
                existing.userIds.push(userId);
                update = true;
            }
        }
        else {
            existing.userIds = [userId];
            update = true;
        }
        if (update) return res.json(await findOneAndUpdatePromise({_id: existing._id},{userIds: existing.userIds}));
        
    } else {

        const release = {
            id_release: req.body.id,
            title: req.body.title,
            year: req.body.year,
            country: req.body.country,
            genres: req.body.genres,
            image: req.body.image,
            artist: req.body.artist,
            tracklist: req.body.tracklist,
            userIds: [req.params._id]
            
           
        };
        return res.json(await createReleasePromise([release]));
        
    }


}


async function createReleasePromise(release)
{
    return new Promise(async (resolve, reject) => {
        var tracklist = await getTracklist(release[0].id_release);
        release[0].tracklist = tracklist;
        m.Release.create(release).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
var getTracklist = async (releaseId) => {
    return new Promise((resolve, reject) => {
        new Discogs().database().getRelease(releaseId, (err, data) => {
            if (err) reject(err);
            resolve(data ? data.tracklist : null);
        })
    });
}
