import { Profile } from '../models/profile.js';
import { Destination } from '../models/destination.js';

async function show(req, res, next) {
  console.log('user user user', req.user);
  try {
    const p = await Profile.findOne({ user: req.user._id });
    console.log('pppppp', p);
    if (p && p.destinations && p.destinations.length > 0) {
      const ar = [...p.destinations];
      res.json(ar);
    } else {
      res.json({});
    }
  } catch (e) {
    console.log(e);
  }
}
async function removeProfileDestination(req, res) {
  try {
    console.log('dddd', req.params.destId);
    const profile = await Profile.findOneAndUpdate(
      {
        user: req.user._id,
      },
      {
        $pull: {
          destinations: {
            _id: req.params.destId,
          },
        },
      },
      {
        safe: true,
        upsert: true,
      }
    );
    if (profile) {
      res.status(200);
    }
  } catch (e) {
    console.log('removeProfileDestinationError', e);
    return res.status(500);
  }
}

async function createOrUpdateProfileDestination(req, res) {
  try {
    console.log('body data', req.body);

    const p = await Profile.findOneAndUpdate(
      {
        user: req.user._id,
      },
      {
        $push: {
          destinations: req.body,
        },
      }
    );
    if (p) {
      res.status(200).json(p);
    } else {
      const data = {
        user: req.user._id,
        destinations: [req.body.dest || req.query.dest],
      };
      const newProfile = new Profile(data);
      await newProfile.save();
      if (newProfile) {
        res.json(newProfile);
      }
    }
  } catch (e) {
    console.log('createOrUpdateProfileDestinationError', e);
    res.status(500);
  }
}

export { show, createOrUpdateProfileDestination, removeProfileDestination };
