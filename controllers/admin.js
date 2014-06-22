var _ = require('lodash');
var path = require('path');
var db = require('../models2');
var S = require('string');
var _ = require('lodash');
var url = require('url');

module.exports = function(app) {

  var base = '/admin';

  app.use(base, function(req, res, next) {
    res.locals.base = base;
    res.locals.menu = _.without(_.keys(db), 'Sequelize', 'sequelize');
    res.locals.isAdminPath = true;
    next();
  });

  app.get(base, index);

  app.get(path.join(base, '/:path/:id/edit'), edit);
  app.get(path.join(base, '/:path/new'), edit);
  //app.get(path.join(base, '/:path'), list);

  /*app.post(path.join(base, '/:path/:id/delete'), adminRouter);
  app.post(path.join(base, '/:path/:id'), adminRouter);
  app.post(path.join(base, '/:path'), adminRouter);*/
};

/**
 * Index
 */
function index(req, res) {
  //res.render('admin/index', { title: 'Admin' });
  //console.log(db.Opportunity);
  return res.render('admin/index');
}

/**
 * Edit / Create
 */
function edit(req, res) {
  var doc = {
    path: req.params.path,
    id: req.params.id || null,
    isNew: true
  };
  if (doc.id) {
    doc.isNew = false;
    // this is NOT a new req
    console.log('not new');
  }
  else {
    if (!_.isUndefined(db[doc.path])) {
      console.log('new');
      doc = _.extend(doc, db[doc.path].rawAttributes);
      return res.json(doc);
    }
  }
}
