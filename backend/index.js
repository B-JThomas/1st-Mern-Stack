import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (req, res) => {
    console.log(req)
    return res.status(201).send('Welcome To MERN')
});

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