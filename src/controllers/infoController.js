const InfoService = require('../services/info')

/**
 *  GET TOTALS
 */
const getTotals = async (req, res, next) => {
  try {
    const infoService = new InfoService()
    const totals = await infoService.getTotals()
    res.send(totals)
  } catch(error) {
    next(error)
  }
}


module.exports = {
  getTotals,
}