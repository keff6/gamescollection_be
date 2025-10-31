const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/index.js');
const errorHandler = require('./middleware/errorHandler')
const credentials = require('./middleware/credentials')
const corsOptions = require('./config/corsOptions')

const app = express()

const port = process.env.PORT || 3030;

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());

// routes
app.use('/api/v1', apiRoutes);

// custom error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})