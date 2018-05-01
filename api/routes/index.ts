module.exports = function (app) {
    require('./proxies')(app)
    require('./ui')(app)
};