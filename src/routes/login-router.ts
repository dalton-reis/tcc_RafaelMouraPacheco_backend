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
            let newUser = new user(req.body);
            if (newUser.name && newUser.password && newUser.role) {
                newUser.save(function (err, user) {
                    if (err) {
                        res.send(err);
                    }
                    this.successAction(user, res);
                });
            } else {
                res.send({
                    success: false,
                    message: 'There is required field not informed!',
                });
            }
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
                        this.successAction(user, res);
                    }
                }
            });
        });
    }

    private successAction(user, res): void {
        const payload = {
            role: user.role
        };
        let token = jwt.sign(payload, 'accessToken', {
            expiresIn: 60 * 60 * 24
        });
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    }
}

const loginRouter = new LoginRouter();
loginRouter.init();
export default loginRouter.router;