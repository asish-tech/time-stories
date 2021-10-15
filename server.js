import express from 'express';
import cors from 'cors';
import storiesRouter from './route/getStories.js';


// App Config
const app = express(); // Creating instance of express
const port = 8080;


// Middlewares
app.use(cors());
app.use(express.json());


// API Endpoints
app.use('/getTimeStories', storiesRouter);



app.listen(port, () => console.log(`App started at ${port}`));