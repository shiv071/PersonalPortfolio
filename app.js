const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
 

const tempPath = path.join(__dirname, "files");
app.set("view engine", "hbs");
app.set("views", tempPath);
app.use(express.static(tempPath));

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("index");
});
app.get("*",(req,res)=>{
    res.render("404err",{
        errorMessage:"Oops, Page not found"
    });
});

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PersonalPortfolio';

app.post('/submit-form', async (req, res) => {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('formdata');

    const formdata = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    };
    try {
        await collection.insertOne(formdata);
        // res.send('Form submitted successfully!');
        res.render("formconfirmation");
    } catch (error) {
        console.error(error);
        res.send('Error submitting form.');
    }
});

app.listen(port, () => {
    console.log("Listening on port ${port}");
})