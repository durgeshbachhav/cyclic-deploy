require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const book = require('./models/books')

const app = express();
const PORT = process.env.PORT || 4300;


mongoose.set('strictQuery', false)

const connectDB = async () => {
     try {
          const conn = await mongoose.connect(process.env.MONGO_URI)
          console.log(`mongo db is connected ${conn.connection.host}`)
     } catch (error) {
          console.log(error)
          process.exit(1)
     }
}

app.get('/', (req, res) => {
     res.send({ title: "book" })
})

app.get('/add-note', async (req, res) => {
     try {
          await book.insertMany([
               {
                    title: "subhedar",
                    body: "body goes here...",
               },
               {
                    title: "farjand",
                    body: "body goes here...",
               }
          ])
          res.send('data added..')
     } catch (error) {
          res.send(error)
          console.log("error>>", +error)

     }
})


app.get('/books', async (req, res) => {
     const booked = await book.find();
     if (booked) {
          res.json(booked)
     } else {
          res.send('something went wrong')
     }
})






connectDB().then(() => {
     app.listen(PORT, () => {
          console.log(`listening on port ${PORT}`)
     })
})

