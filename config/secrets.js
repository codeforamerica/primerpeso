// @TODO -- REMOVE ANY DEFAULT DEPENDENCE
module.exports = {

  redis: process.env.REDISTOGO_URL || 'redis://127.0.0.1:6379/2',
  pg: process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET || 'I Am A Monkey',
  staticFilePrefix: process.env.STATIC_FILE_PREFIX || '',
  env: process.env.NODE_ENV || 'development',
  mailDev: process.env.MAIL_DEV || false,
  mailFrom: process.env.MAIL_FROM || '',

  mandrill: {
    user: process.env.MANDRILL_USER || '',
    apiKey: process.env.MANDRILL_APIKEY || ''
  },
};
