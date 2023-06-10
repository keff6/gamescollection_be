const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const genreRoutes = require('./routes/genre');
const brandRoutes = require('./routes/brand');
const consoleRoutes = require('./routes/console');
const gameRoutes = require('./routes/game');


const app = express()

const port = process.env.PORT || 3030;

app.use(express.json())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// routes
app.use(genreRoutes);
app.use(brandRoutes);
app.use(consoleRoutes);
app.use(gameRoutes);

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})