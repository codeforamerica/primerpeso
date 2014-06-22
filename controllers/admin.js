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
    res.locals.path = req.path || '';
    res.locals.menu = _.without(_.keys(db), 'Sequelize', 'sequelize');
    res.locals.isAdminPath = true;
    console.log(res.locals);
    next();
  });

  app.get(base, index);

  app.get(path.join(base, '/:model/:id/edit'), edit);
  app.get(path.join(base, '/:model/new'), edit);
  app.post(path.join(base, '/:model/new'), save);
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
  var render = _.extend(res.locals, {
    model: req.params.model || '',
    id: req.params.id || ''
  });
  if (!_.isUndefined(db[render.model])) {
    render.isNew = render.id ? false : true;
    var doc = db[render.model];
    render.fields = doc.getFormFields('new');
    //return res.json(fields);
    res.render('admin/form', render);
  }
}

function save(req, res) {
  var model = req.params.model || '';
  var id = req.params.id || '';
  var Model = db[model];
  var instance = Model.create({
    title: req.body.title,
    purpose: req.body.purpose
  })
  .success(function(idk) {
    console.log('SUCCESS SAVE');
    return res.redirect(req.path);
  })
  .error(function(error){
    var message = error.message;
    var severity = error.severity;
    req.flash('error', 'hi');
    return res.redirect(req.path);
  });
};
