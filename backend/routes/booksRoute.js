import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


//Route CREATING a Book
router.post('/', async (req,res) => {
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

router.get('/', async (req,res) => {
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

router.get('/:id', async (req,res) => {
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

router.put('/:id', async (req,res) => {
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

//Route for DELETING a book

router.delete('/:id', async (req,res) => {
    try {

        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({ message: 'Book Not Found'});
        }
        return res.status(204).json({ message: 'Book Deleted'});

    } catch(err) {
       console.log(err.message)    
       res.status(500).send({ message: err.message }) 
    }
})


export default router;