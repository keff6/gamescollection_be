const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const ERROR_CODES = {
  DUPLICATED: 'ER_DUP_ENTRY',
  IS_REFERENCED: 'ER_ROW_IS_REFERENCED_2'
}

const ACTION_TYPE = {
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
}

const TABLE = {
  GENRE: 'genre',
  BRAND: 'brand',
  CONSOLE: 'console',
  GAME: 'game',
}

module.exports = {
  DAY_IN_MILLISECONDS,
  ERROR_CODES,
  ACTION_TYPE,
  TABLE,
}