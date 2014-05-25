exports = module.exports = function(mongoose) {
  // TODO -- determine if I actually want to have a structure for this damn thing.
  var oppQuerySchema = new mongoose.Schema({
    query: mongoose.Schema.Types.Mixed
  });
  if (process.env.NODE_ENV == 'production') {
    oppQuerySchema.set('autoIndex', false);
  }
  return oppQuerySchema;
}
