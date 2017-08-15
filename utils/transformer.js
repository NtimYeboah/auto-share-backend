class Transformer {
    item(data) {
        if (typeof data !== 'object') {
            throw new Error ('Data given must be an object');
        }

        return {
            'id': data._id,
            'cuid': data.cuid,
            'message': data.message,
            'user': data.user
        }
    }

    collection(data) {
        if (!Array.isArray(data)) {
            throw new Error ('Data given must be an array');
        }

        return data.map(item => this.item(item));
    }
}

module.exports = new Transformer;