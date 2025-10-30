const ExportService = require('../services/export');
const ExcelJS = require('exceljs');
const mysqldump = require("mysqldump")
const fs = require("fs")
const path = require("path")

/**
 *  EXPORT DATA
 */
const exportData = async (req, res, next) => {
  const { query: getParamsObj } = req;

  try {
    const exportService = new ExportService();
    const rows = await exportService.exportData(getParamsObj)
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Games');
    worksheet.columns = [
      { header: 'Brand', key: 'Brand', width: 20 },
      { header: 'Console', key: 'Console', width: 30 },
      { header: 'Console Year', key: 'ConsoleYear', width: 10 },
      { header: 'Game', key: 'Game', width: 50 },
      { header: 'Game Year', key: 'GameYear', width: 10 },
      { header: 'Genres', key: 'Genres', width: 15 },
      { header: 'Developer', key: 'Developer', width: 20 },
      { header: 'Publisher', key: 'Publisher', width: 20 },
      { header: 'Condition', key: 'Condition', width: 20 },
      { header: 'Finished', key: 'Finished', width: 10 },
      { header: 'Notes', key: 'Notes', width: 50 },
    ];

    rows.forEach(row => worksheet.addRow(row));

    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error)
  }
}


/**
 *  EXPORT DB DUMP (ADMIN ONLY TOOL)
 */
const exportDbDump = async (req, res, next) => {
  const DB_CONFIG = {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DATABASE,
  };

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
          // where: brandId ? { game: `brand_id = ${brandId}` } : {},
        },
      },
    });

    // Set headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename="database_dump.sql"');
    res.setHeader('Content-Type', 'application/sql');

    const fileStream = fs.createReadStream(dumpPath);
    fileStream.pipe(res);

    // Clean up temp file after stream finishes
    fileStream.on('close', () => fs.unlinkSync(dumpPath));

  } catch (err) {
    console.error('Dump error:', err);
    res.status(500).json({ error: 'Failed to export database dump' });
  }
}

module.exports = {
  exportData,
  exportDbDump
}