var debug = require('debug')('mongoose-time');
module.exports = function timestamps(schema,opts) {
    updated_at = opts.updated_at || 'updated_at';
    created_at = opts.created_at || 'created_at';
    updated_at_index = opts.updated_at_index || false;
    created_at_index = opts.created_at_index || false;
    debug('updated_at = ' + updated_at);
    debug('created_at = ' + created_at);
    debug("updated_at_index = " + updated_at_index);
    debug("created_at_index = " + created_at_index);
    schema.add({ updated_at: Date, created_at: Date });
    schema.path(updated_at).index(updated_at_index);
    schema.path(created_at).index(created_at_index);
    schema.pre('save', function(next){
      var timestamp = new Date();
      this[created_at] = this[created_at] || timestamp;
      this[updated_at] = timestamp;
      debug (updated_at + '=' + this[updated_at] + '; '+ created_at +' = ' + this[created_at]);
      next();
    });
};
