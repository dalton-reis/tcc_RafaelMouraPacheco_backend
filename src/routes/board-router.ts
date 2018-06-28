import {Router} from "express";

let board = require('../schema/board-schema');

export class BoardRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/boards', function (req, res) {
            board.find({}, function (err, boards) {
                res.json(boards);
            });
        });

        this.router.post('/newBoard', function (req, res) {
            let newBoard = new board(req.body);
            for (let i = 0; i < newBoard.images.length; i++) {
                if (!newBoard.images[i]) {
                    res.send({
                        success: false,
                        message: 'There is required field not informed!',
                    });
                } else {
                    newBoard.save(function (err) {
                        if (err) {
                            res.send(err);
                        }
                        res.json({
                            success: true,
                            message: 'Board created successfully',
                        });
                    });
                }
            }
        });

        this.router.delete('/delete/:id', function (req, res) {
            board.findById(req.params.id, (err, responseByID) => {
                responseByID.remove(req.body, (err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    board.find((err) => {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.json({
                            success: true,
                            message: 'Removed!',
                        });
                    });
                });
            });
        });
    }

}

const boardRouter = new BoardRouter();
boardRouter.init();
export default boardRouter.router;