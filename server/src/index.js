require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const router = require('./route/route');



app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', router)

const PORT = process.env.PORT || 4000
app.listen(PORT, function () {
    console.log('Express app is running on port ' + PORT)
});

