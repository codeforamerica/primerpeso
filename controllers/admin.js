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
    res.locals.title = 'Admin';
    next();
  });

  app.get(base, index);

  app.get(path.join(base, '/:model/:id/edit'), edit);
  app.get(path.join(base, '/:model/new'), edit);
  app.post(path.join(base, '/:model'), save);
  app.get(path.join(base, '/:model/:id'), entry);
  app.post(path.join(base, '/:model/:id'), entry_save);
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
  var doc = sequelize.model(render.model);
  fields = doc.getFormFields('new');
  /*var options = {
    page: (req.param('page') > 0 ? req.param('page') : 1) - 1;
    perPage: 30,
  };*/
  Model.findAndCountAll().success(function(result) {
    return res.render('admin/list', { data: result.rows, fields: fields });
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
  console.log(req.params);
  var render = _.extend(res.locals, {
    model: req.params.model || '',
    id: req.params.id || ''
  });
  var doc = sequelize.model(render.model);
  if (!render.id) {
    render.fields = doc.getFormFields('new');
    return res.render('admin/form', render);
  }
  else {
    doc.find(render.id).success(function(instance) {
      if (!instance) {
        res.status(404);
        return res.render('admin/404', { url: req.url });
      }
      render.fields = doc.getFormFields('edit', instance);
      //return res.json(render);
      return res.render('admin/form', render);
    });
  }
}
/**
 * POST Edit / Create
 */
function save(req, res) {
  var id = req.params.id || '';
  var Model = sequelize.isDefined(req.params.model) ? sequelize.model(req.params.model) : null;
  var instance = Model.buildFromAdminForm(req.body);
  //return(res.json(instance.toJSON()));
  instance.validate().
  success(function(err) {
    if (err) {
      var errorList = [];
      _.each(err, function(errDesc, errKey) {
        if (errKey != '__raw')
          req.flash('errors', errKey + ': ' + errDesc);
      });
      //return res.json(err);
      return res.redirect(req.path);
    }

    instance.save().success(function(){
      req.flash('info', instance.title + ' Successfully Added');
      //return(res.json(instance.toJSON()));
      return res.redirect(req.path);
    })
    .error(function(err) {
      req.flash('errors', err.message);
      return res.redirect(req.path);
      //return res.json(err);
    });
  });
}

function entry (req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model
  });

  var Model = sequelize.model(render.model);

  Model.find(req.params.id).success(function(result) {
    return res.json(result);
  });
}

function entry_save (req, res) {
  var id = req.params.id;
  var Model = sequelize.model(req.params.model);
  var updatedInstance = Model.buildFromAdminForm(req.body);
  delete updatedInstance.dataValues.id;
  var newFields = updatedInstance.dataValues;
  Model.find(req.params.id).success(function(result) {
    result.updateAttributes(newFields)
    .success(function() { res.redirect(req.path); });
  });
}