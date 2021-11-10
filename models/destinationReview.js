import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const destinationReviewSchema = new Schema({
   rating: Number,
   content: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "destinationReview" }]
  },{
    timestamps: true,
  });
  
  const DestinationReview = mongoose.model("Destination", destinationReviewSchema);



export {
	DestinationReview
}