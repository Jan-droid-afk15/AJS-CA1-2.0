const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

//Schema for Users, required in MongoDB
const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name field is required'],
        },
        email: {
            type: String,
            required: [true, 'Email field is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password field is required'],
        },
        project_ID: {
            type: String,
            
        },
        assignment_ID: {
            type: String,
            
        }
    },
    { timestamps: true }
);
//Bcrypt hashes a user's password and encrypts them for security.
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

module.exports = model('User', userSchema);