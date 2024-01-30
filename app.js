const express = require('express')
const path = require('path')
const axios = require('axios')
const app = express()
const port = 4200


const routes = require('./routes/routes')

app.use(express.static('public'));
app.use('/', routes);


app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
})