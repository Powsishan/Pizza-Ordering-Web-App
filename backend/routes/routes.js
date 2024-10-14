const express = require('express');
const router = express.Router();

const {
    userLogin,
    registerUser,
    addPizza,
    getPizzas,
    updatePizza,
    deletePizza,
    addReservation,
    updateReservation,
    updateReservationStatus,
    getReservation } = require('../controller/controller')
const { authenticate, authorize } = require('../middleware/authorization');
const upload = require('../middleware/upload'); 


// (Public Route)
router.post('/login', userLogin);// user login
router.post('/register', registerUser);// user registration
router.get('/pizzas', getPizzas);// get all pizza 
router.post('/makereservation', addReservation);// make a new reservation 


// (Protected  Route)
router.post('/addpizza', authenticate, authorize('Admin'), upload.single('Image'), addPizza);
router.put('/updatepizza/:id', authenticate, authorize('Admin'), upload.single('Image'), updatePizza);// update Pizza (admin)
router.delete('/delpizza/:id', authenticate, authorize('Admin'), deletePizza);// delete Pizza (admin)
router.post('/reservation', authenticate, authorize('Admin'), getReservation);// view all reservation 


router.put('/updatereservations/:id', authenticate, authorize('User'), updateReservation); // Users can update their reservations
router.put('/updatereservations/status/:id', authenticate, authorize('Admin'), updateReservationStatus); // Admins can update status






module.exports = router;
