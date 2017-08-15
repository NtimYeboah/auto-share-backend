const ReviewController = require('../controllers/reviews.controller.js'),
    Router = require('express').Router,
    router = new Router();

// Get all posts
router.route('/reviews').get(ReviewController.getReviews);

// Add a post
router.route('/reviews').post(ReviewController.addReview);

// Get a single post
router.route('/reviews/:cuid').get(ReviewController.getReview);

module.exports = router;