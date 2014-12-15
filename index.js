var WeakMap = require('weakmap');

var count = 0;
var storage = new WeakMap();

module.exports = {
    middleware: function () {
        return function (req, res, next) {
            storage.set(req, count++);
            res.on('finish', function () {
                storage.delete(req);
            });
            next();
        };
    },
    get: function (req) {
        return storage.get(req);
    }
};
