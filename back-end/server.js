const express = require('express') ;
const cors = require('cors');
require ('./config/connect')
require('dotenv').config()
const app = express() ;


// CORS configuration to allow requests from your frontend
const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'], // Allow both localhost and 127.0.0.1
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials if needed
};
app.use(cors(corsOptions));


// Parse JSON request bodies  
app.use(express.json());

/* Passport */
const passport = require('passport')
app.use(passport.initialize())
require('./security/passport')(passport)


const port = process.env.PORT ;

const path = require('path');
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoute = require('./controllers/user')
const projectRoute = require('./controllers/project')
const clientRoute = require('./controllers/client')
const taskRoute = require('./controllers/task')

app.use('/user' , userRoute) ;
app.use('/project' , projectRoute) ;
app.use('/client' , clientRoute) ;
app.use('/task' , taskRoute) ;



app.listen(port , ()=>console.log("PlanificaIT : http://localhost:" + port +  " ✅" ) )
