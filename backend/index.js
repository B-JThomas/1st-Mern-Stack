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

//Route CREATING a Book
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

//Route GETTING all Books 

app.get('/books', async (req,res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(err) {
       console.log(err.message)    
       res.status(500).send({ message: err.message }) 
    }
})

//Route GETTING a Books 

app.get('/books/:id', async (req,res) => {
    try {

        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(book);
    } catch(err) {
       console.log(err.message)    
       res.status(500).send({ message: err.message }) 
    }
})

//Route for UPDATING a book

app.put('/books/:id', async (req,res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) 
        {
            return res.status(400).send({ message: 'Please input all fields!' })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({ message: 'Book Not Found'});
        }
        return res.status(204).json({ message: 'Book Updates'});

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