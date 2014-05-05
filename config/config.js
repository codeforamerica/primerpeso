module.exports = {
	db: process.env.MONGODB|| 'mongodb://localhost:27017/shopLocal',
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
  max_rows: 1000,
  // Allow / Deny Writes.
  read_only: false,
}
