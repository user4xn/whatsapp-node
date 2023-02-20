const apiResponse = require("../util/api-response");
const createError = require("http-errors");
const express = require("express");
const router = express.Router();
const userService = require('../app/user/UserService');
const userValidation = require('../app/user/UserValidation');

router.get('/', async function(req, res, next) {
    try {
        const request = {
            limit : req.query.limit !== undefined ? parseInt(req.query.limit) : 10,
            offset : req.query.offset !== undefined ? parseInt(req.query.offset) : 0,
            keyword : req.query.keyword !== undefined ? req.query.keyword : "",
        }
        const service = new userService();
        const data = await service.getAllUser(request);
        const response = apiResponse("list all users",200,"success",data);
        res.send(response);
    } catch (err) {
        next(createError(err.name, err.message));
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        const id = req.params.id
        const service = new userService();
        const data = await service.getUserById(id);
        const response = apiResponse("detail user",200,"success",data);
        res.send(response);
    } catch (err) {
        next(createError(err.name, err.message));
    }
});

router.post('/store',async function(req, res, next){
    try {
        const payload = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        const {error} = userValidation.validate(payload);
        if(error){
            let message = "";
            if(typeof error.details !== "undefined"){
                error.details.forEach(function(item){
                     message += item.message
                });
            }
            const response = apiResponse(message,422,"error",null);
            res.status(422);
            return res.send(response);
        }
        const service = new userService();
        await service.createNewUser(payload);
        const response = apiResponse("Success create new user",200,"success",null);
        res.send(response);
    } catch (err) {
        next(createError(err.name, err.message));
    }
});

module.exports = router
