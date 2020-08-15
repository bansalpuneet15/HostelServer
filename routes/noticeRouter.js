const express = require('express');
const bodyParser = require('body-parser');

const noticeRouter = express.Router();
noticeRouter.use(bodyParser.json());
var authenticate = require('../authenticate');

const Notices = require('../models/notices')

noticeRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    Notices.find({hostel: req.user.hostel})
    .populate('hostel')
    .then((notices) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(notices);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    req.body.hostel = req.user.hostel;
    Notices.create(req.body)
    .then((notice) => {
        Notices.findById(notice._id)
        .populate('hostel')
        .then((notice) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(notice)
        }, err => next(err)) 
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /notices');
}) 
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Notices.deleteMany({hostel: req.user.hostel})
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, err => next(err))
}) 

noticeRouter.route('/:noticeId')
.get(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`Get operation not supported on /${req.params.noticeId}`);
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`Delete operation not supported on /${req.params.noticeId}`);
}) 
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`Put operation not supported on /${req.params.noticeId}`);
}) 
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Notices.findByIdAndDelete(req.params.noticeId)
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(response);
    }, err => next(err))
}) 
module.exports = noticeRouter;