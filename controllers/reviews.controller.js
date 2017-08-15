const Review = require('../models/review'),
    cuid = require('cuid'),
    sanitizeHtml = require('sanitize-html'),

    transform = require('./../utils/transformer');

/**
 * Get all reviews
 *
 * @param req
 * @param res
 */
const getReviews = function(req, res) {
    Review.find({}).sort('-dateCreated').exec((err, reviews) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).json({
            reviews: transform.collection(reviews)
        });
    });
};

/**
 * Save a review
 *
 * @param req
 * @param res
 */
const addReview = function(req, res) {
    const review = new Review({
        user: sanitizeHtml(req.body.user),
        message: sanitizeHtml(req.body.message),
        cuid: cuid()
    });

    review.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(201).json({
            review: transform.item(saved)
        });
    });
};

/**
* Get a single review
*
* @param req
* @param res
*/
const getReview = function(req, res) {
    Review.findOne({ slug: req.params.cuid }).exec((err, review) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).json({
            review: transform.item(review)
        });
    });
};


module.exports = {
    addReview,
    getReviews,
    getReview
};