import {
  Profile
} from "../models/profile.js"
import {
  Destination
} from "../models/destination.js"

async function show(req, res) {

  console.log('user user user',req.user)
  const p = await Profile.findById(
    req.user._id
  )
    .populate('destinations')
  
  if (p){
    res.json(p)
  }

}
async function removeProfileDestination(req, res) {
  try {

    const profile = await Profile.findByIdAndUpdate({
      user: req.user._id
    }, {
      $pull: {
        "destinations": {
          _id: req.params.destId
        }
      }
    }, {
      safe: true,
      upsert: true
    });
    if (profile) {
      res.status(200).json(profile)
    }

  } catch (e) {
    return res.status(500)
  }

}

async function createOrUpdateProfileDestination(req, res) {
  try {

    const getUser = await Profile.findById(req.user._id);
    if (getUser) {

      const p = await Profile.updateOne({
          user: req.user._id
        }, {
          $push: {
            destinations: req.params.dest
          }
        },

      )
      if(p){
        res.status(200).json(p);
      }

    }else{

      const p = await Profile.create({user:req.user._id, destinations:[req.params.destId]});
      if(p){

        res.status(200).json(p)
      }

       
    }
  } catch (e) {
    console.log(e)
    res.status(500)
  }



}


export {
  show,
  createOrUpdateProfileDestination,
  removeProfileDestination
}