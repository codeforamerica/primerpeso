// @TODO -- REMOVE ANY DEFAULT DEPENDENCE
module.exports = {

  redis: process.env.REDISTOGO_URL || 'redis://127.0.0.1:6379/2',
  pg: process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET || 'I Am A Monkey',
  staticFilePrefix: process.env.STATIC_FILE_PREFIX || '',
  env: process.env.NODE_ENV || 'development',
  mailHandler: process.env.MAILHANDLER || 'mandrill',
  mailFrom: process.env.MAIL_FROM || '',
  mailTo: process.env.MAIL_TO || '',
  gaNum: process.env.GA_NUM || 'UA-XXXCC-X',
  puertoRicoGaNum: process.env.PR_GA_NUM || 'UA-XXXPR-X',

  mandrill: {
    user: process.env.MANDRILL_USER || '',
    apiKey: process.env.MANDRILL_APIKEY || ''
  },

  keen: {
    projectId: process.env.KEEN_PROJECT_ID,
    writeKey: process.env.KEEN_WRITE_KEY
  }
};
