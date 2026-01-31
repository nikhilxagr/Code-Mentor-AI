import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  problemNumber: {
    type: String,
    required: true
  },

  problemTitle: {
    type: String,
    required: true
  },

  solution: {
    type: String,
    required: true
  },

  approach: {
    type: String
  },

  timeComplexity: {
    type: String
  },

  spaceComplexity: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
