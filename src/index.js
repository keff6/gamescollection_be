const express = require("express");
const bodyParser = require('body-parser')
const genreRoutes = require('./routes/genre');
const manufacturerRoutes = require('./routes/manufacturer');
const consoleRoutes = require('./routes/console');
const gameRoutes = require('./routes/game');

const app = express()

const port = 3080

app.use(express.json())


/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req. body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// routes
app.use(genreRoutes);
app.use(manufacturerRoutes);
app.use(consoleRoutes);
app.use(gameRoutes);

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})