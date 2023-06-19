const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const salePostRoutes = require('./routes/carSale');

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB is connected');
    })  
    .catch((error) => {
        console.log('Error connectiong to MongoDB', error);
    });

//app.use('/api', userRoutes);
app.use('/api', salePostRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});