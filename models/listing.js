const mongoose = require("mongoose");
const review = require("./review.js");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    filename: String,
    url: String,
  }, { _id: false }); 

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: imageSchema,
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if (listing) {
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;