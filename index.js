/**
 * svg2pnguri
 */

/**
 * Module dependencies
 */

var isReadable  = require('isstream').isReadable;
var toStream    = require('tostream');
var datauri     = require('datauri-stream');
var concat      = require('concat-stream');
var imagemagick = require('imagemagick-native');
var mime        = require('mime');
var throughout  = require('throughout');

/**
 * Check if options is raw `src`
 *
 * @param {String|Buffer|Readable|Object} input
 * @return {Boolean} isRaw
 */

function isRaw(input) {
  return typeof input === 'string' || Buffer.isBuffer(input) || isReadable(input);
}

function defaults(obj, parent) {
  for (var key in parent) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = parent[key];
    }
  }
  return obj;
}

var defaultOptions = {
  format: 'PNG',
  quality: 100,
  srcFormat: 'SVG',
  strip: true
}

/**
 * Consturctor
 *
 * @param {Object} params
 *   @param {String|Buffer|Readable} src, svg source
 *   @param {Number} width, optional, defautl taken from svg
 *   @param {Number} height, optional, default taken from svg
 *   @param {String} format, output format (JPEG, PNG, GIF), default 'PNG'
 *   @param {Number} quality, output quality, default 100
 * @param {Function} callback(err, datauri)
 */

function svg2pnguri(options, callback) {
  
  if (isRaw(options)) {
    options = {
      src: options
    };
  }
  
  defaults(options, defaultOptions);
    
  toStream(options.src)
    .pipe(imagemagick.streams.convert(options))
    .pipe(datauri({ mime: mime.lookup(options.format) }))
    .pipe(concat(function(buffer) {
      callback(null, buffer.toString());
    }));
}

/**
 * Streaming inteface
 */

svg2pnguri.stream = function(options) {
  
  options = options || {};
  
  defaults(options, defaultOptions);
  
  return throughout(imagemagick.streams.convert(options), datauri({ mime: mime.lookup(options.format) }));
}

/**
 * Expose
 */

exports = module.exports = svg2pnguri;
