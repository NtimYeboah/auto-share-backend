const transform = require('./../utils/transformer');

describe('Transformer test', () => {
    it('should transform a single post', (done) => {
        let review = {
            '_id': '58f339b081c2aab5ad7ebeb2',
            'cuid': 'cj1khqqm80000vxh745u1gu7p',
            'user': 'John Doe',
            'message': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
            'createdAt': new Date()
        };

        let data = transform.item(review);

        data.should.be.a('object');
        data.should.have.all.keys('id', 'cuid', 'user', 'createdAt', 'message');
        data.should.not.have.key('body');
        done();
    });

    it('should transform a collection of posts', (done) => {
        let reviews = [
            {
                '_id': '58f339b081c2aab5ad7ebeb2',
                'cuid': 'cj1khqqm80000vxh745u1gu7p',
                'user': 'John Doe',
                'message': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
                'createdAt': new Date()
            },
            {
                '_id': '2aab5ad7ebeb258f339b081c',
                'cuid': 'vxh745u1gu7pcj1khqqm80000',
                'user': 'John Doe',
                'message': 'Sit voluptatem accusantium doloremque laudantium sed ut perspiciatis unde omnis iste natus error',
                'createdAt': new Date()
            }

        ];

        let data = transform.collection(reviews);

        data.should.be.a('array');
        data[0].should.have.all.keys('id', 'cuid', 'user', 'createdAt', 'message');
        data[0].should.not.have.key('body');
        data[1].should.have.all.keys('id', 'cuid', 'user', 'createdAt', 'message');
        data[1].should.not.have.key('body');
        done();
    });
});