/**
 * Admin.js
 */

var path = require('path');
var S = require('string');
var _ = require('underscore');

var paths = [],
    info  = {};

var mongoose,
    base_url,
    path_url;

exports.add = function(model_info) {
  paths.push(model_info.path);
  info[model_info.path] = model_info;
};

exports.config = function(app, mongoose_app, base) {
  mongoose = mongoose_app;
  base_url = base.replace(/\/$/, "");  // remove trailing slash from base url

  // Middleware to expose some helper functions and vars to templates
  app.use('/admin', function(req, res, next) {
    res.locals.capitalizeFirstLetter = capitalizeFirstLetter;
    res.locals.base = base_url;
    res.locals.menu = paths;
    res.locals.isAdminPath = true;
    next();
  });

  // routes
  app.get(path.join(base, '/'), index);

  app.get(path.join(base, '/:path/:id/edit'), edit);
  app.get(path.join(base, '/:path/new'), edit);
  app.get(path.join(base, '/:path'), list);

  app.post(path.join(base, '/:path/:id/delete'), del);
  app.post(path.join(base, '/:path/:id'), save);
  app.post(path.join(base, '/:path'), save);

};

function index(req, res) {
  res.render('admin/index', { title: 'Admin' });
}

function list(req, res) {
  var p = req.params.path,
      m = info[p].model,
      Model = mongoose.model(m);

  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
  var perPage = 30;
  var options = {
    perPage: perPage,
    page: page
  };

  Model.list(options, function(err, results) {
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
  });
}

function edit(req, res) {
  var p = req.params.path,
      id = req.params.id,
      meta = info[p];
      Model = mongoose.model(meta.model);

  Model.load(id, function(err, doc) {
    if (err) return res.render('admin/500');
    if (!doc) {
      doc = new Model();
    }
    processEditFields(meta, doc, function() {
      res.render('admin/edit', {
        meta:  meta,
        doc:   doc,
        path:  p,
        edit:  meta.edit,
        field: meta.fields
      });
    });
  });
}

function save(req, res) {
  console.log(req.body);
  console.log(req.params.id);
  var id = req.params.id
  var modelName = req.params.path
  var Model = mongoose.model(info[modelName].model);
  var formData = req.body;


  Model.findOne({_id: id}, function(err, doc) {
    if (err) console.log(err);
    // @todo this was bring in refs via processFormFields.
    console.log(doc);
    console.log(req.body);
    if (!id) {
      doc = new Model(formData)
    }
    else {
      updateFromObject(doc, formData);
    }
    doc.save(function(err) {
      if (err) console.log(err);
      return res.redirect(base_url + '/' + modelName);
    });
  });
}

function del(req, res) {
  var id = req.params.id,
      p = req.params.path,
      Model = mongoose.model(info[p].model);

  Model.remove({ _id: id }, function(err) {
    if (err) console.log(err);
    return res.redirect(base_url + '/' + p);
  });
}

/**
 * Helper functions
 */

function capitalizeFirstLetter(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateFromObject(doc, obj) {
  for (var field in obj) {
    doc[field] = obj[field];
  }
}

function getType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function processEditFields(meta, doc, cb) {
  var f, Model, field,
      fields = [],
      count = 0;  // ToDo: change this to an array of fields to process

  for (f in meta.edit)
    if (meta.fields[meta.edit[f]].widget == 'ref') {
      count++;
      fields.push(meta.edit[f]);
    }

  if (!count) {
    return cb();
  }

  for (f in fields) {
    field = meta.fields[fields[f]];
    Model = mongoose.model(field.model);
    Model.find({}, field.display, {sort: field.display}, function(err, results) {
      if (err) console.log(err);
      field['values'] = results.map(function(e) { return e[field.display]; });
      count--;
      if (count == 0) {
        return cb();
      }
    });
  }
}

/**
 * Basically brings in references fields
 * DEP for now.
 */
function processFormFields(meta, body, cb) {
  var f, field, Model,
      query = {},
      fields = [],
      count = 0;

  for (f in meta.edit) {
    if (meta.fields[meta.edit[f]].widget == 'ref') {
      fields.push(meta.edit[f]);
      count++;
    }
  }

  if (!count) {
    return cb();
  }

  for (f in fields) {
    field = meta.fields[fields[f]];
    Model = mongoose.model(field.model);
    query[field.display] = body[fields[f]];
    Model.findOne(query, function(err, ref) {
      if (err) console.log(err);
      body[field.field] = ref['_id'];
      count--;
      if (count == 0) {
        return cb();
      }
    });
  }
}
