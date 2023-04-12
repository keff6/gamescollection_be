const express = require("express");
const genderRoutes = require('./routes/gender');
const manufacturerRoutes = require('./routes/manufacturer');
const consoleRoutes = require('./routes/console');
const gameRoutes = require('./routes/game');

const app = express()

const port = 3030

app.use(express.json())

// routes
app.use(genderRoutes);
app.use(manufacturerRoutes);
app.use(consoleRoutes);
app.use(gameRoutes);

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})