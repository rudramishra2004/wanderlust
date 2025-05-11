const Listing = require("./models/listing.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn =(req, res, next)=>{
    if(!req.isAuthenticated()){
        //redirectURL save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to make change!");
        return res.redirect("/login");
    }
    next();
}

module.exports.savedRedirectedUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

//   <% if(currUser && currUser._id.equals(listing.owner._id)) { %>
module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "you don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "you don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}