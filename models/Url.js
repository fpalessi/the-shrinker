import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
