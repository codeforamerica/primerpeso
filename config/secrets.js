// @TODO -- REMOVE THIS FROM GIT
module.exports = {

  db: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/bizwallet',
  pg: process.env.PG_URI || 'postgres://MrMaksimize:NewOrder@127.0.0.1:5432/bizwallet',
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

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
