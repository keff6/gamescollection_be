const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  console.log('TEST')
  res.status(500).send(err.message)
}

module.exports = errorHandler