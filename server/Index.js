const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
require('./DB/DB')
const Router = require('./Routes/router');
const PORT = 9999
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Router)
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})