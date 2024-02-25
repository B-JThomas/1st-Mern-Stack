import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.status(201).send('Welcome To MERN')
});

//Route for saving a new Book
app.post('/books', async (req,res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) 
        {
            return res.status(400).send({ message: 'Please input all fields!' })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch(err) {
       console.log(err.message)    
       res.status(500).send({ message: err.message }) 
    }
})


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