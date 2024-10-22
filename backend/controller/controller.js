const bcrypt = require('bcrypt');
const { User, Reservation, Pizza, validateRegister, validateLogin, validateReservation, validatePizza } = require('../model/models');
const mongoose = require('mongoose')

// User login
const userLogin = async (req, res, next) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return next({ isJoi: true, details: error.details });
        }

        // Check if the user exists 
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next({ statusCode: 401, message: 'Invalid Email or Password' });
        }

        // Password comparison 
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return next({ statusCode: 401, message: 'Invalid Email or Password' });
        }

        // Generate JWT token 
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: 'Logged in successfully' });

    } catch (error) {
        next({ statusCode: 500, message: 'Internal Server Error' });
    }
};

// Register user
const registerUser = async (req, res, next) => {
    try {
        const { error } = validateRegister(req.body);
        if (error) {
            return next({ isJoi: true, details: error.details });
        }

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return next({ statusCode: 409, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const savedUser = await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({
            message: "User created successfully",
            user: savedUser,
        });

    } catch (error) {
        next({ statusCode: 500, message: 'Internal Server Error' });
    }
};



// Add Pizza
const addPizza = async (req, res, next) => {
    try {

        console.log("Received body data:", req.body);
        console.log("Received file:", req.file);

        const { error } = validatePizza(req.body);
        if (error) {
            console.error("Validation error:", error.details); // Log validation errors

            return next({ isJoi: true, details: error.details });
        }

        const pizza = new Pizza({
            Name: req.body.Name,
            Description: req.body.Description,
            Price: req.body.Price,

            Image: `http://localhost:4001/uploads/${req.file.filename}` 
        });

        await pizza.save();
        res.status(201).send({ message: "Pizza created successfully", pizza });
    } catch (error) {
        console.error("Error adding pizza:", error); // Log the error for debugging

        next({ statusCode: 500, message: "Internal Server Error" ,error });
    }
};


// Get Pizzas
const getPizzas = async (req, res, next) => {
    try {
        const pizzas = await Pizza.find();
        res.status(200).send(pizzas);
    } catch (error) {
        next({ statusCode: 500, message: "Internal Server Error" });
    }
};

// Delete Pizza
const deletePizza = async (req, res, next) => {
    try {
        const pizzaId = req.params.id;

        // Check if the pizza exists
        const pizza = await Pizza.findById(pizzaId);
        if (!pizza) {
            return next({ statusCode: 404, message: 'Pizza not found' });
        }

        // Delete the pizza
        await Pizza.findByIdAndDelete(pizzaId);
        res.status(200).send({ message: 'Pizza deleted successfully' });
    } catch (error) {
        next({ statusCode: 500, message: 'Internal Server Error' });
    }
};

// Update Pizza
const updatePizza = async (req, res, next) => {
    try {
        const pizzaId = req.params.id;
        console.log('Pizza ID received:', pizzaId); // Log the received pizzaId

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(pizzaId)) {
            console.log('Invalid Pizza ID:', pizzaId); // Log invalid ID
            return res.status(400).json({ error: 'Invalid Pizza ID' });
        }

        // Validate the request body
        const { error } = validatePizza(req.body);
        if (error) {
            console.log('Validation Error:', error.details); // Log validation error
            return next({ isJoi: true, details: error.details });
        }

        // Find the existing pizza
        const pizza = await Pizza.findById(pizzaId);
        if (!pizza) {
            console.log('Pizza not found with ID:', pizzaId); // Log not found case
            return next({ statusCode: 404, message: 'Pizza not found' });
        }

        // Update the pizza properties
        pizza.Name = req.body.Name;
        pizza.Description = req.body.Description;
        pizza.Price = req.body.Price;

        // Check if a new image is uploaded
        if (req.file) {
            // Construct the image URL
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            pizza.Image = imageUrl; // Update image path to URL
        }

        // Save the updated pizza
        const updatedPizza = await pizza.save();

        console.log('Pizza updated successfully:', updatedPizza); // Log updated pizza
        res.status(200).send({ message: 'Pizza updated successfully', pizza: updatedPizza });
    } catch (error) {
        console.error('Error updating pizza:', error); // Log the error
        next({ statusCode: 500, message: 'Internal Server Error' });
    }
};




// Get Reservation
const getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.find();
        res.status(200).send(reservation);
    } catch (error) {
        next({ statusCode: 500, message: "Internal Server Error" });
    }
};


// add reservation (user)
const addReservation = async (req, res, next) => {
    try {
        // Validate the request body
        const { error } = validateReservation(req.body);
        if (error) {
            return next({ isJoi: true, details: error.details });
        }

        const reservation = new Reservation({
            CustomerName: req.body.CustomerName,
            ContactNumber: req.body.ContactNumber,
            ReservationDate: req.body.ReservationDate,
            ReservationTime: req.body.ReservationTime,
            NumberOfPeople: req.body.NumberOfPeople,
            Message: req.body.Message,
        });

        await reservation.save();
        res.status(201).send({ message: "Reservation created successfully", reservation });
    } catch (error) {
        next({ statusCode: 500, message: "Internal Server Error" });
    }
};



// update  reservation (user)
const updateReservation = async (req, res, next) => {
    try {
        const reservationId = req.params.id;

        // Validate the reservation
        const { error } = validateReservation(req.body);
        if (error) {
            return next({ isJoi: true, details: error.details });
        }

        // Ensure the reservation belongs to the user
        const reservation = await Reservation.findOne({ _id: reservationId, UserId: req.user._id });
        if (!reservation) {
            return next({ statusCode: 404, message: 'Reservation not found or you are not authorized to update it' });
        }

        // Update the reservation details
        reservation.CustomerName = req.body.CustomerName;
        reservation.ContactNumber = req.body.ContactNumber;
        reservation.ReservationDate = req.body.ReservationDate;
        reservation.ReservationTime = req.body.ReservationTime,
        reservation.NumberOfPeople = req.body.NumberOfPeople;
        reservation.Message = req.body.Message;


        await reservation.save();
        res.status(200).send({ message: "Reservation updated successfully", reservation });
    } catch (error) {
        next({ statusCode: 500, message: "Internal Server Error" });
    }
};

// update  reservation (admin)
const updateReservationStatus = async (req, res, next) => {
    try {
        const reservationId = req.params.id;

        // Validate the new status
        const { status } = req.body;
        if (!['accepted', 'rejected','pending'].includes(status)) {
            return next({ statusCode: 400, message: 'Invalid status' });
        }

        // Find and update the reservation status
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return next({ statusCode: 404, message: 'Reservation not found' });
        }

        reservation.Status = status;
        await reservation.save();

        res.status(200).send({ message: "Reservation status updated successfully", reservation });
    } catch (error) {
        next({ statusCode: 500, message: "Internal Server Error" });
    }
};



module.exports = {
    userLogin,
    registerUser,
    addPizza,
    getPizzas,
    updatePizza,
    deletePizza,
    addReservation,
    updateReservation,
    updateReservationStatus,
 
    getReservation
};
