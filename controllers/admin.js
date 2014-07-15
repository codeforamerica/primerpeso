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
    res.locals.menu = { opportunity: 'opportunity' };
    res.locals.isAdminPath = true;
    res.locals.title = 'Admin Panel - Available Programs';
    next();
  });

  app.get(base, index);

  app.get(path.join(base, '/:model/:id/edit'), edit);
  app.get(path.join(base, '/:model/new'), edit);
  app.post(path.join(base, '/:model'), save);
  app.get(path.join(base, '/:model/:id'), entry);
  app.post(path.join(base, '/:model/:id'), entrySave);
  app.get(path.join(base, '/:model'), list);
  app.get(path.join(base, '/:model/:id/delete'), deleteModel);

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
  var keys = doc.getListFields ? doc.getListFields() : null;
  var fields = keys ? _.pick(doc.getFormFields('new'), keys) : doc.getFormFields('new');
  var options = keys ? { attributes: keys } : {};
  Model.findAndCountAll(options).success(function(result) {
    return res.render('admin/list', { data: result.rows, fields: fields });
  });

}

/**
 * GET Edit / Create
 */
function edit(req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model || '',
    id: req.params.id || ''
  });
  // TODO -- why does this load a model loaded in a previously edited call
  var doc = sequelize.model(render.model);
  if (!render.id) {
    render.fields = doc.getFormFields('new');
    //return res.json(render.fields);
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
      //return res.json(instance);
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
  instance.validate().
  success(function(err) {
    if (err) {
      var errorList = [];
      _.each(err, function(errDesc, errKey) {
        if (errKey != '__raw')
          req.flash('errors', errKey + ': ' + errDesc);
      });
      return res.json(err);
      //return res.redirect(req.path);
    }

    instance.save().success(function(){
      req.flash('info', instance.title + ' Successfully Added');
      return res.redirect(req.path);
    })
    .error(function(err) {
      req.flash('errors', err.message);
      //return res.redirect(req.path);
      return res.json(err);
    });
  });
}

function entry (req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model
  });

  var Model = sequelize.model(render.model);

  var keys = Model.getListFields ? Model.getListFields() : null;
  var fields = keys ? _.pick(Model.getFormFields('new'), keys) : Model.getFormFields('new');
  render['fields'] = fields;
  Model.find(req.params.id).success(function(result) {
    render['entry'] = result;
    return res.render('admin/entry', render);
    // return res.json(result);
  });
}

function entrySave (req, res) {
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

function deleteModel (req, res) {
  var render = _.extend(res.locals, {
    model: req.params.model
  });

  var Model = sequelize.model(render.model);

  Model.find(req.params.id).success(function(result) {
    result.destroy().success(function() {
      req.flash('info', 'Successfully Deleted Entry');
      res.redirect('/admin/' + render.model);
    });
  });
}
