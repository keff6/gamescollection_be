const consolesDataSanitizer = (consoles) => {
    return consoles.map(c => {
      c.brandId = c.id_brand;
      c.logoUrl = c.logourl;
      c.consoleUrl = c.consoleurl;
      delete c.id_brand;
      delete c.logourl;
      delete c.consoleurl;
    })
}

module.exports = {
  consolesDataSanitizer,
}