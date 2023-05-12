const Game = require('../models/game_schema');
//CRUD functions
const readData = (req, res) => {
    Game.find()
        .then((data) => {
            console.log(data);
            if(data.length > 0){
                res.status(200).json(data);
            }
            else{
                res.status(404).json("None found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

    // res.status(200).json({
    //     "msg" : "All festivals retrieved",
    //     "data": data
    // });
};

const readOne = (req, res) => {

    let id = req.params.id;

    // connect to db and retrieve Game with :id
    Game.findById(id)
        .then((data) => {

            if(data){
                res.status(200).json(data);
            }
            else {
                res.status(404).json({
                    "message": `Game with id: ${id} not found`
                });
            }
            
        })
        .catch((err) => {
            console.error(err);
            if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                res.status(500).json(err)
            }
            
            
        });


};

const createData = (req, res) => {
    // console.log(req.body);
    let GameData = req.body;

    Game.create(GameData)
        .then((data) => {
            console.log('New Game Created!', data);
            res.status(201).json(data);
        })
        .catch((err) => {
            if(err.name === 'ValidationError'){
                console.error('Validation Error!!', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error" : err.message 
                });
            }
            else {
                console.error(err);
                res.status(500).json(err);
            }
        });
    };

    

const updateData = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Game.findByIdAndUpdate(id, body, {
        new: true
    })
        .then((data) => {

            if(data){
                res.status(201).json(data);
            }
            else {
                res.status(404).json({
                    "message": `Game with id: ${id} not found`
                });
            }
            
        })
        .catch((err) => {
            if(err.name === 'ValidationError'){
                console.error('Validation Error!!', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error" : err.message 
                });
            }
            else if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                console.error(err);
                res.status(500).json(err);
            }
        });


};

const deleteData = (req, res) => {

    let id = req.params.id;

    Game.deleteOne({ _id: id })
        .then((data) => {

            if(data.deletedCount){
                res.status(200).json({
                    "message": `Game with id: ${id} deleted successfully`
                });
            }
            else {
                res.status(404).json({
                    "message": `Game with id: ${id} not found`
                });
            }
            
        })
        .catch((err) => {
            console.error(err);
            if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                res.status(500).json(err)
            } 
        });


};

module.exports = {
    readData,
    readOne,
    createData,
    updateData,
    deleteData
};


