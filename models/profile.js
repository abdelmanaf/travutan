import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    destinations: [{}],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model('Profile', profileSchema);

export { Profile };
