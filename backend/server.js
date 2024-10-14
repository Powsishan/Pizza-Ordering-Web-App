require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/routes');
const cors = require('cors');
const initializeAdmin = require('./config/initializeAdmin');
const errorHandler = require('./middleware/errorHandler');
const path = require('path'); 



const app = express();
const  PORT = process.env.PORT || 4001

//connect to DB
connectDB();

app.use(express.json());
app.use(cors(  ));


app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 


//initialize Admin login
initializeAdmin();

app.use('/piz', routes);



app.use(errorHandler);

app.listen(PORT,() =>{
    console.log(`server is running on ${PORT}`)
})