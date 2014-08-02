// @TODO -- REMOVE THIS FROM GIT
module.exports = {

  redis: process.env.REDISTOGO_URL || 'redis://127.0.0.1:6379/2',
  pg: process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET || 'I Am A Monkey',
  staticFilePrefix: process.env.STATIC_FILE_PREFIX || '',

  mandrill: {
    apiKey: process.env.MANDRILL_API_KEY || '',
  }
};
