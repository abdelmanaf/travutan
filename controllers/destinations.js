import {
    Profile
} from './../models/profile.js'
import {
    Destination
} from './../models/destination.js'

function create(req, res) {
    console.log(req.body)
    Destination.create(req.body)
        .then(result => res.json(result))
        .catch(err => console.log(err))
}

function index(req, res) {
    Destination.find({})
        .then(destinations => {
            res.status(200).json(destinations)
        })
        .catch(err => {
            res.json(err)
        })
}

function show(req, res) {
    const id = req.params.id
    Destination.findOne(id)
        .then(destination => {
            res.status(200).json(destination)
        })
        .catch(err => {
            res.json(err)
        })
}

function deleteDestination(req, res) {
    const id = req.params.id;
    Destination.findOneAndDelete(id).then(destination => {
            res.status(200).json(destination)
        })
        .catch(err => {
            res.json(err)
        })

}

function update(req, res) {
    const id = req.params.id;


    Destination.findOneAndUpdate(id, req.body, {
            upsert: true
        }).then(destination => {
            res.status(200).json(destination)
        })
        .catch(err => {
            res.json(err)
        })



    // Destination.findOneAndUpdate(id, req.body, {upsert: true}, function(err, dest) {
    //     if (err) return res.send(500, {error: err});
    //     return res.status(200).json(dest);
    // });


}

export {
    create,
    deleteDestination as delete,
    index,
    update,
    show
}