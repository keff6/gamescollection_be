const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const genreRoutes = require('./routes/genre');
const brandRoutes = require('./routes/brand');
const consoleRoutes = require('./routes/console');
const gameRoutes = require('./routes/game');
const userRoutes = require('./routes/user');
const errorHandler = require('./middleware/errorHandler')

const app = express()

const port = process.env.PORT || 3030;

app.use(express.json())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());

// routes
app.use(genreRoutes);
app.use(brandRoutes);
app.use(consoleRoutes);
app.use(gameRoutes);
app.use(userRoutes);

// custom error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})