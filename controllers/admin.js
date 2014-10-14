var _ = require('lodash');
var path = require('path');
var db = require('../models');
var sequelize = db.sequelize;
var S = require('string');
var url = require('url');
var Promise = require('bluebird');

module.exports = function(app) {

  var base = '/admin';


  app.use(base, require('../policies/admin'));

  app.use(base, function(req, res, next) {
    res.locals.base = base;
    res.locals.path = req.path || '';
    res.locals.menu = { opportunity: 'Oportunidad', agency: 'Agencia' };
    res.locals.isAdminPath = true;
    res.locals.title = 'Admin';
    next();
  });

  app.get(base, dashboard);

  app.get(path.join(base, '/debug/:model'), debug);
  app.get(path.join(base, '/:model/:id/edit'), edit);
  app.get(path.join(base, '/:model/new'), edit);
  app.post(path.join(base, '/:model'), save);
  app.get(path.join(base, '/:model/:id'), view);
  app.post(path.join(base, '/:model/:id'), save);
  app.get(path.join(base, '/:model'), list);
  app.get(path.join(base, '/:model/:id/delete'), deleteModel);

};


function debug(req, res) {
  var modelName = req.params.model || '';
  var Model = sequelize.isDefined(modelName) ? sequelize.model(modelName) : null;
  var assocData = Model.associations;
  var assocRet = _.mapValues(assocData, function(assocInfo, assocKey) {
    assocInfo.options = _.omit(assocInfo.options, ['sequelize']);
    assocInfo.foreignKeyAttribute = _.omit(assocInfo.foreignKeyAttribute, ['sequelize', 'Model']);
    var resN =  _.omit(assocInfo, ['source', 'target', 'through', 'targetAssociation', 'sequelize']);
    return resN;
  });
    //assocInfo.options = _.omit(assocInfo.options, ['sequelize']);
  return res.json(assocRet);

}


/**
 * Index / Dashboard
 */
function dashboard(req, res) {
  return res.redirect('/admin/opportunity');
}


/**
 * GET list
 */
function list(req, res) {
  var modelName = req.params.model || '';
  var Model = sequelize.isDefined(modelName) ? sequelize.model(modelName) : null;
  var render = _.extend(res.locals, {
    model: modelName
  });
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
    Model.findAll({
      attributes: attributes,
      where: { creatorId: req.user.get('id') }
    }).success(function(results) {
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
  var Model = sequelize.model(render.model);
  if (!render.id) {
    render.formInfo = Model.getFormFields('new');
    return res.render('admin/form', render);
  }
  else {

    Model.loadFull({ where: { id: render.id } }).success(function(instance) {
      if (!instance) {
        res.status(404);
        return res.render('admin/404', { url: req.url });
      }
      render.formInfo = Model.getFormFields('edit', instance);
      return res.render('admin/form', render);
    });
  }
}

/**
 * POST Edit / Create
 */
function save(req, res) {
  var id = req.params.id || '';
  var modelName = req.params.model || '';
  var Model = sequelize.isDefined(modelName) ? sequelize.model(modelName) : null;


  // TODO -- use findOrCreate
  // If there is no id we are creating a new instance
  if (!id || _.isEmpty(id)) {
    Model.createInstance(req.body).then(function(instance) {
      var methodName = 'add' + S(modelName).capitalize().s;
      return req.user[methodName](instance);
    }).then(function() {
      req.flash('info', 'Añadido exitosamente');
      return res.redirect(req.path);
    }).error(function(err) {
      req.flash('errors', err.message);
      return res.redirect(req.path);
    });
  // If we have an id then we are updating an existing instance
  } else {
    Model.updateInstance(id, req.body).then(function(instance) {
      req.flash('info', 'Añadido exitosamente');
      return res.redirect(req.path);
    }).error(function(err) {
      throw err;
      req.flash('errors', err.message);
      return res.redirect(req.path);
    });
  }
}

/**
 * GET model/{id}
 */
function view(req, res) {
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
