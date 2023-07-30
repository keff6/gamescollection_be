const brandsDataSanitizer = (brands) => {
  return brands.map(c => {
    c.logoUrl = c.logourl;
    delete c.logourl;
  })
}

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

const gamesDataSanitizer = (games) => {
  return games.map(g => {
    if(JSON.stringify(g.genres) === '[null]') {
      g.genres = []
    }
    g.consoleId = g.id_console;
    g.isNew = g.is_new;
    g.isComplete = g.is_complete;
    g.isWishlist = g.is_wishlist;
    g.isDigital = g.is_digital;
    g.coverUrl = g.coverurl;
    delete g.id_console;
    delete g.is_new;
    delete g.is_complete;
    delete g.is_wishlist;
    delete g.is_digital;
    delete g.coverurl;
  })
}

module.exports = {
  consolesDataSanitizer,
  gamesDataSanitizer,
  brandsDataSanitizer,
}