process.env.NODE_ENV = 'test';

const mongoose = require('mongoose'),
    Mockgoose = require('mockgoose').Mockgoose,
    mockgoose = new Mockgoose(mongoose),
    Review = require('../models/review'),
    config = require('../config'),
    dummyData = require('./utils/data'),

    chai = require('chai'),
    should = chai.should(),
    chaiHttp = require('chai-http'),
    cuid = require('cuid');

const server = require('../app');

chai.use(chaiHttp);

describe('Reviews', () => {

    beforeEach((done) => {
        mockgoose.prepareStorage().then(() => {
            mongoose.connect(config.mongoURL, (err) => {
                done(err)
            });
        });

        let review = new Review({
            'message': dummyData.review.message,
            'user': dummyData.review.user,
            'cuid': cuid()
        });

        review.save((err) => {
            if (err) done(err);
            done();
        });
    });

    afterEach((done) => {
        Review.remove({}, (err) => {
            if (err) throw err;
            done();
        });
    });

    describe('/GET reviews', () => {
        it('should get all reviews', (done) => {
            chai.request(server)
            .get('/api/reviews')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.reviews.should.be.a('array');
                res.body.reviews[0].should.have.all.keys('id', 'cuid', 'user', 'message');
                done();
            });
        });
    });

    describe('/reviews create a single review', () => {
        it('should create a review', (done) => {
            chai.request(server)
            .post('/api/reviews')
            .send(dummyData.review)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.review.should.be.a('object');
                res.body.review.should.have.all.keys('id', 'cuid', 'user', 'message');
                done();
            });
        })
    });

    describe('/GET/cuid review', () => {
        it('should get a single review', (done) => {
            let review = new Review({
                'message': dummyData.review.message,
                'user': dummyData.review.user,
                'cuid': cuid()
            });

            review.save((err, savedReview) => {
                chai.request(server)
                .get(`/api/reviews/${savedReview.cuid}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.review.should.be.a('object');
                    res.body.review.should.have.all.keys('id', 'cuid', 'user', 'message');
                    done();
                });
            });
        });
    });
});
