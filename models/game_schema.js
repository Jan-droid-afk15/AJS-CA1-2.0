const { Schema, model } = require('mongoose');
//Internet Schema
const gameSchema = Schema(
    {
        title: {
            type: String, 
            required: true
           
        },
        developerId: {
            type: Schema.Types.ObjectId, 
            ref: 'Developer'
            
        },
        genre: {
            type: String, 
            required: true
            
        },
        releaseDate: { 
            type: Date, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        },
        image: { 
            type: String, 
            required: true 
        },
    },
    { timestamps: true }
);

module.exports = model('Game', gameSchema);



