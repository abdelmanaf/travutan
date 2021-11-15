import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const destinationSchema = new Schema(
  {
    title: String,
    image: String,
    covid: String,
    wikiUrl: String,
    budget: String,
    population: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'DestinationReview' }],
    questions: [{ type: Schema.Types.ObjectId, ref: 'QuestionPost' }],
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model('Destination', destinationSchema);

export { Destination };
