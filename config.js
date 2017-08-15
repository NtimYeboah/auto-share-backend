const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/db_kudobuzz',
    port: process.env.PORT || 9000
};

module.exports = config;