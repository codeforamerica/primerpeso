var _ = require('lodash');
var path = require('path');
var db = require('../models');
var S = require('string');
var url = require('url');

module.exports = function(app) {

  var base = '/admin';

  app.use(base, function(req, res, next) {
    res.locals.base = base;
    res.locals.path = req.path || '';
    res.locals.menu = _.without(_.keys(db), 'Sequelize', 'sequelize');
    res.locals.isAdminPath = true;
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
  return res.render('admin/index', { title: 'Admin' });
}

/**
 * Edit / Create
 */
function edit(req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model || '',
    id: req.params.id || ''
  });
  var modelCapped = S(render.model).capitalize().s;
  if (!_.isUndefined(db[modelCapped])) {
    render.isNew = render.id ? false : true;
    var doc = db[modelCapped];
    render.fields = doc.getFormFields('new');
    res.render('admin/form', render);
  }
}

function save(req, res) {
  model = S(req.params.model).capitalize().s;
  var id = req.params.id || '';
  var Model = db[model];
  // TODO -- move these to model?
  var instance = Model.buildFromAdminForm(req, res);
  instance.validate().
  success(function(err) {
    if (err) {
      var errorList = [];
      _.each(err, function(errDesc, errKey) {
        if (errKey != '__raw')
          req.flash('errors', errKey + ': ' + errDesc);
      });
      return res.redirect(req.path);
    }
    instance.save().success(function(){
      req.flash('info', instance.title + ' Successfully Added');
      //return res.json(instance);
      return res.redirect(req.path);
    })
    .error(function(err) {
      var message = err.message;
      req.flash('errors', err.message);
      //return res.json(instance);
      return res.redirect(req.path);
    });
  });
}
