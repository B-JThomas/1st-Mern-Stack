import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.status(201).send('Welcome To MERN')
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log(`App is connected to the database`);
        app.listen(PORT, () => {
            console.log(`App Listening on ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })