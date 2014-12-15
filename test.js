var test = require('tape');
var express  = require('express');
var supertest = require('supertest');

var app = express();

var agent = supertest.agent(app);

var middlecache = require('./');

app.use(middlecache.middleware());

var last;
app.use(function (req, res, next) {
    last = middlecache.get(req);
    next();
});

app.get('/', function(req, res) {
    res.end('');
});

test('middlecache', function (t) {
    t.plan(2);
    agent.get('/').end(function () {
        t.equal(last, 0);
        agent.get('/').end(function () {
            t.equal(last, 1);
            t.end();
        });
    });
});
