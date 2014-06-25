var _ = require('lodash');
var path = require('path');
var db = require('../models');
var sequelize = db.sequelize;
var S = require('string');
var url = require('url');

module.exports = function(app) {

  var base = '/admin';

  app.use(base, function(req, res, next) {
    res.locals.base = base;
    res.locals.path = req.path || '';
    res.locals.menu = { opportunity: 'opportunity' };
    res.locals.isAdminPath = true;
    next();
  });

  app.get(base, index);

  app.get(path.join(base, '/:model/:id/edit'), edit);
  app.get(path.join(base, '/:model/new'), edit);
  app.post(path.join(base, '/:model/new'), save);
  app.get(path.join(base, '/debug'), debug);
  app.get(path.join(base, '/:model'), list);

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

function debug(req, res) {
  return res.json(db.sequelize.models);
}
/**
 * GET list
 */
function list(req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model
    //page: req.params.page || 0;
  });

  var Model = sequelize.model(render.model);
  /*var options = {
    page: (req.param('page') > 0 ? req.param('page') : 1) - 1;
    perPage: 30,
  };*/
  Model.findAndCountAll().success(function(result) {
    return res.json(result);
  });

  /*Model.list(options, function(err, results) {
    if (err) return res.render('admin/500');
    Model.count().exec(function(err, count) {
      res.render('admin/list', {
        title: capitalizeFirstLetter(p),
        list:  info[p].list,
        fields: info[p].fields,
        data:  results,
        path:  p,
        page:  page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });*/
}

/**
 * GET Edit / Create
 */
function edit(req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model || '',
    id: req.params.id || ''
  });
  render.isNew = render.id ? false : true;
  var doc = sequelize.model(render.model);
  render.fields = doc.getFormFields('new');
  res.render('admin/form', render);
}
/**
 * POST Edit / Create
 */
function save(req, res) {
  var id = req.params.id || '';
  var Model = sequelize.isDefined(req.params.model) ? sequelize.model(req.params.model) : null;
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
      return res.redirect(req.path);
    })
    .error(function(err) {
      req.flash('errors', err.message);
      return res.redirect(req.path);
    });
  });
}
