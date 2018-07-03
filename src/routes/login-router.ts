import {Router} from "express";

let user = require('../schema/user-schema');
let jwt = require('jsonwebtoken');

export class LoginRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/users', function (req, res) {
            user.find({}, function (err, users) {
                res.json({users});
            });
        });

        this.router.post('/newUser', function (req, res) {
            user.findOne({name: req.body.name}, (err, response) => {
                if (response) {
                    res.json({success: false, message: 'Usuário já existente.'});
                } else {
                    let newUser = new user(req.body);
                    if (newUser.name && newUser.password && newUser.role) {
                        newUser.save(function (err, user) {
                            if (err) {
                                res.status(500).send(err);
                            }
                            const payload = {
                                role: user.role
                            };
                            let token = jwt.sign(payload, 'accessToken', {
                                expiresIn: 60 * 60 * 24
                            });
                            res.json({
                                success: true,
                                message: 'Enjoy your token!',
                                token: token,
                                user: user
                            });
                        });
                    } else {
                        res.send({
                            success: false,
                            message: 'Campo obrigatório não preenchido',
                        });
                    }
                }
            });
        });

        this.router.put('/user/:id', function (req, res) {
            user.findById(req.params.id, (err, responseByID) => {
                responseByID.update(req.body, (err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    user.find((err, responseByUpdate) => {
                        if (err) {
                            res.status(500).send(err)
                        }
                        const payload = {
                            role: user.role
                        };
                        let token = jwt.sign(payload, 'accessToken', {
                            expiresIn: 60 * 60 * 24
                        });
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token,
                            user: responseByUpdate
                        });
                    });
                });
            });
        });

        this.router.post('/authenticate', function (req, res) {
            user.findOne({
                name: req.body.name
            }, function (err, user) {
                if (err) {
                    res.json(err);
                }
                if (!user) {
                    res.json({success: false, message: 'Authentication failed. User not found.'});
                } else if (user) {
                    if (user.password != req.body.password) {
                        res.json({success: false, message: 'Authentication failed. Wrong password.'});
                    } else {
                        const payload = {
                            role: user.role
                        };
                        let token = jwt.sign(payload, 'accessToken', {
                            expiresIn: 60 * 60 * 24
                        });
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token,
                            user: user
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