import { Request, Response, Router } from "express";
import * as mongoose from 'mongoose';

let User = require('../schema/user-schema');
let jwt = require('jsonwebtoken');

export class LoginRouter {

    public router: Router;

    constructor() {
        mongoose.connect('mongodb://localhost/tagarela', {
            useMongoClient: true
        });

        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/users', function (req, res) {
            User.find({}, function (err, users) {
                res.json(users);
            });
        });

        this.router.post('/authenticate', function (req, res) {
            User.findOne({
                name: req.body.name
            }, function (err, user) {
                if (err) {
                    res.json({ erro: err });
                };
                if (!user) {
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                } else if (user) {
                    if (user.password != req.body.password) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else {
                        const payload = {
                            admin: user.admin
                        };
                        var token = jwt.sign(payload, 'accessToken', {
                            expiresInMinutes: 1440
                        });
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }

                }

            });
        });
    }
}

const loginRouter = new LoginRouter();
loginRouter.init();
export default loginRouter.router;