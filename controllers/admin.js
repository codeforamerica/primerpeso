var _ = require('lodash');
var path = require('path');
var db = require('../models');
var sequelize = db.sequelize;
var S = require('string');
var url = require('url');

module.exports = function(app) {

  var base = '/admin';


  app.use(base, require('../policies/admin'));

  app.use(base, function(req, res, next) {
    res.locals.base = base;
    res.locals.path = req.path || '';
    res.locals.menu = { opportunity: 'oportunidad' };
    res.locals.isAdminPath = true;
    res.locals.title = 'Admin';
    next();
  });

  app.get(base, dashboard);

  app.get(path.join(base, '/:model/:id/edit'), edit);
  app.get(path.join(base, '/:model/new'), edit);
  app.post(path.join(base, '/:model'), save);
  app.get(path.join(base, '/:model/:id'), entry);
  app.post(path.join(base, '/:model/:id'), save);
  app.get(path.join(base, '/:model'), list);
  app.get(path.join(base, '/:model/:id/delete'), deleteModel);

};

/**
 * Index / Dashboard
 */
function dashboard(req, res) {
  return res.redirect('/admin/opportunity');
}

function debug(req, res) {j
  return res.json(db.sequelize.models);
}

/**
 * GET list
 */
function list(req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model
  });

  var Model = sequelize.model(render.model);
  var fields = Model.getListFields ? Model.getListFields() : Model.getDefaultFields();
  var attributes = _.keys(fields);
  attributes.push('id');
  if (req.query.listAll == 'true') {
    Model.findAll({ attributes: attributes }).success(function(results){
      return res.render('admin/list', { data: results, fields: fields });
    });
  }
  else {
    // TODO -- need to abstract this out for admin.
    req.user.getOpportunities({ attributes: attributes }).success(function(results) {
      return res.render('admin/list', { data: results, fields: fields });
    });
  }
}

/**
 * GET Edit / Create
 */
function edit(req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model || '',
    id: req.params.id || ''
  });
  var doc = sequelize.model(render.model);
  if (!render.id) {
    render.formInfo = doc.getFormFields('new');
    return res.render('admin/form', render);
  }
  else {
    doc.find(render.id).success(function(instance) {
      if (!instance) {
        res.status(404);
        return res.render('admin/404', { url: req.url });
      }
      render.formInfo = doc.getFormFields('edit', instance);
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

  // If there is no id we are creating a new instance
  if (!id || _.isEmpty(id)) {
    Model.createInstance(req.body).then(function(instance) {
      return req.user.addOpportunity(instance);
    }).then(function() {
      req.flash('info', req.params.model + ' Añadido exitosamente');
      return res.redirect(req.path);
    }).error(function(err) {
      req.flash('errors', err.message);
      return res.json(err);
    });
  // If we have an id then we are updating an existing instance
  } else {
    var instance = Model.buildFromAdminForm(req.body);
    delete instance.dataValues.id;
    var newFields = instance.dataValues;
    Model.find(req.params.id).success(function(result) {
      result.updateAttributes(newFields).success(function() {
        res.redirect(req.path);
      });
    });
  };
}

function entry (req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model
  });

  var Model = sequelize.model(render.model);
  var fields = Model.getDefaultFields();
  var attributes = _.keys(fields);
  attributes.push('id');
  Model.find(req.params.id).success(function(result) {
    var values = result.getFormatedValues();
    return res.render('admin/entry', { title: Model.name, fields: fields, entry: values });
  });
}

function deleteModel (req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model
  });

  var Model = sequelize.model(render.model);

  Model.find(req.params.id).success(function(result) {
    result.destroy().success(function() {
      req.flash('info', 'Programa borrado con éxito');
      res.redirect('/admin/' + render.model);
    });
  });
}
