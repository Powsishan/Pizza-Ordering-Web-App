const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');



// User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User', // Default role is user
        required: true
    }
});


//  generate auth token for the user
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, role: this.role }, // Include role in the token
        process.env.JWTPRIVATEKEY,
        { expiresIn: "7d" }
    );
    return token;
};

const User = mongoose.model("User", userSchema);


// Reservation Schema
const reservationSchema = new mongoose.Schema({
    CustomerName: { type: String, required: true },
    ContactNumber: { type: String, required: true },
    ReservationDate: { type: Date, required: true },
    ReservationTime: { type: String, required: true }, 
    NumberOfPeople: { type: Number, required: true },
    Message: { type: String, required: false },

    Status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User collection
});

const Reservation = mongoose.model("Reservation", reservationSchema);


// Pizza Schema
const pizzaSchema = new mongoose.Schema({
    Name: { type: String, required: true, minlength: 3, maxlength: 100 },
    Description: { type: String, required: true, minlength: 10, maxlength: 500 },
    Price: { type: Number, required: true, min: 0 },
    Image: { type: String, required: true }
});

const Pizza = mongoose.model("Pizza", pizzaSchema);


// Validation for registration
const validateRegister = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

// Validation for login
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

// Validation for Reservation

const validateReservation = (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const schema = Joi.object({
        NumberOfPeople: Joi.number().integer().min(1).required().label("Number of People"),
        ReservationDate: Joi.date().min(today).required().label("Reservation Date"), 
        ReservationTime: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required().label("Reservation Time"), 
        ContactNumber: Joi.string().pattern(/^\d{10}$/).required().label("Contact Number"),
        Message: Joi.string().allow(null, '').optional().label("Description"),
        CustomerName: Joi.string().min(3).max(50).required().label("Customer Name")
    });

    return schema.validate(data);
};



// Validation for Pizza
const validatePizza = (data) => {
    const schema = Joi.object({
        Name: Joi.string().required().min(3).max(100).label("Name"),
        Description: Joi.string().required().min(10).max(500).label("Description"),
        Price: Joi.number().required().min(0).label("Price"),
        Image: Joi.string().optional().label("Image")
    });

    return schema.validate(data);
};


module.exports = {
    User,
    Reservation,
    Pizza,
    validateRegister,
    validateLogin,
    validateReservation,
    validatePizza
};