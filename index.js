const express = require('express');
const app = express();
const path = require('path');
const port = 80;
const bodyParser = require('body-parser');
// const fs = require('fs');
// const http = require('http');


// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance1');
    console.log("We are connected guys...")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('docs'));

// Define schema
const contactSchema = new mongoose.Schema({
    Name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);



app.get('/', (req, res) => {
    const con = 'This is the best app Lorem ipsum dolor sit amet consectetur adipisicing elit.';
    const para = {}
    res.status(200).render('index.html', para);
})
app.get('/contact', (req, res) => {
    // const con = 'This is the best app Lorem ipsum dolor sit amet consectetur adipisicing elit.';
    const para = {}
    res.status(200).render('contact.html', para);
})


app.post('/contact', (req, res) => {
    let myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the data")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    })

    // res.status(200).render('contact.pug');
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})