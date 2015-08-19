var Readable    = require('stream').Readable;
var concat      = require('concat-stream');
var imagemagick = require('imagemagick-native');
var Datauri     = require('datauri');
var datauri     = new Datauri();

/**
 * @param {String}            svgStr
 * @param {Fn(Error, String)} callback
 */
exports = module.exports = function(svgStr, callback) {
  
  if (svgStr.length === 0) return callback('svg cannot be empty');
  
  var toPng = imagemagick.streams.convert({
    srcFormat: 'SVG',
    format: 'PNG'
  });
  var toUri = concat(function(buffer) {
    datauri.format('.png', new Buffer(buffer));
    return callback(null, datauri.content);
  });
  
  var rs = new Readable();
  rs.push(svgStr);
  rs.push(null);
  rs.pipe(toPng).pipe(toUri);
}

