import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import LoginRouter from "./routes/login-router";
import BoardRouter from "./routes/board-router";

class App {

    public express: express.Application;

    constructor() {
        mongoose.connect('', {
            useMongoClient: true
        });
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json({
            limit: '5mb'
        }));
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {
        let router = express.Router();

        router.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers',
                'Access-Control-Allow-Methods,' +
                'Authorization,' +
                'Access-Control-Allow-Headers,' +
                'Access-Control-Allow-Origin,' +
                'X-Requested-With,' +
                'content-type,' +
                'X-Auth-Token');

            if ('OPTIONS' == req.method) {
                res.send(200);
            } else {
                next();
            }
        });

        // router.use((req, res, next) => {
        //     let token: any = req.headers['authorization'];
        //     if (token) {
        //         jwt.verify(token, 'accessToken', function (err) {
        //             if (err) {
        //                 return res.status(401).send({
        //                     message: 'Invalid token.'
        //                 });
        //             } else {
        //                 next();
        //             }
        //         })
        //     } else {
        //         return res.status(403).send({
        //             message: 'No token provided.'
        //         })
        //     }
        // });

        this.express.use('/', router);
        this.express.use('/api/login', LoginRouter);
        this.express.use('/api/board', BoardRouter);
    }

}

export default new App().express;
