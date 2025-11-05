const dbConnection = require("../config/db");
const mysqldump = require("mysqldump")
const fs = require("fs")
const path = require("path")

class ExportService {
  /**
   *  EXPORT SELECTED DATA
   */
  async exportData(getParamsObj) {
    const {
      idBrand = '',
      idConsole = '',
      // status params
      isComplete = '',
      isNew = '',
      isWishlist = '',
      isDigital = '',
      isBacklog = '',
      isFinished = '',
    } = getParamsObj;

    const selectQuery = `call EXPORT_DATA(
        ${(idConsole && idConsole !== 'all') ? "'" + idConsole + "'" : null},
        ${(idBrand && idBrand !== 'all') ? "'" + idBrand + "'" : null},
        ${isComplete || null},
        ${isNew || null},
        ${isWishlist || null},
        ${isDigital || null},
        ${isBacklog || null},
        ${isFinished || null})`;

    try {
      const [[rows]] = await dbConnection.query(selectQuery);
      return rows;
    } catch(err) {
      throw new Error(err);
    } 
    
  }

  /**
   *  DATABASE DUMP
   */
  async exportDump() {
    try {
      const { brandId } = req.query; // optional filter

      // Define export file path
      const dumpPath = path.join('/tmp', `database_dump_${Date.now()}.sql`);

      // Create full dump
      await mysqldump({
        connection: DB_CONFIG,
        dumpToFile: dumpPath,
        dump: {
          data: {
            // If you want to filter by brandId, you can do custom queries:
            tables: ['game', 'console'],
            where: brandId ? { game: `brand_id = ${brandId}` } : {},
          },
        },
      });

    } catch (err) {
      console.error('Dump error:', err);
      res.status(500).json({ error: 'Failed to export database dump' });
    }
  }
}

module.exports = ExportService