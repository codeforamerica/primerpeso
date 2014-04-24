module.exports = {
	db: process.env.MONGODB|| 'mongodb://localhost:27017/financier',
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
  max_rows: 1000,
  // Allow / Deny Writes.
  read_only: false,
  solr: {
  	base_url: 'http://google.com',
  }
}