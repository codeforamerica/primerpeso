// @TODO -- REMOVE THIS FROM GIT
module.exports = {

  redis: process.env.REDISTOGO_URL || 'redis://127.0.0.1:6379/2',
  pg: process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
  staticFilePrefix: process.env.STATIC_FILE_PREFIX || '',

  mailgun: {
    login: process.env.MAILGUN_LOGIN || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
    password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
  },

  mandrill: {
    login: process.env.MANDRILL_LOGIN || 'hackathonstarterdemo',
    password: process.env.MANDRILL_PASSWORD || 'E1K950_ydLR4mHw12a0ldA'
  },

  sendgrid: {
    user: process.env.SENDGRID_USER || 'hslogin',
    password: process.env.SENDGRID_PASSWORD || 'hspassword00'
  },
};
