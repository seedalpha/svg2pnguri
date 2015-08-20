/**
 * svg2pnguri
 */

/**
 * Module dependencies
 */

var isReadable  = require('isstream').isReadable;
var concat      = require('concat-stream');
var imagemagick = require('imagemagick-native');
var Datauri     = require('datauri');

/**
 * Supported formats
 */

var formats = {
  'PNG': '.png',
  'JPEG': '.jpg',
  'GIF': '.gif'
};

/**
 * Buffer (of format) to datauri
 *
 * @param {String} format
 * @param {Buffer} buffer
 * @param {Function} callback(err, datauri)
 */

function bufToDataUri(format, buffer, callback) {
  var datauri = new Datauri();
  try {
    datauri.format(format, buffer);
  } catch (e) {
    return callback(e);
  }
  callback(null, datauri.content);
}

/**
 * Concat stream and convert to datauri
 *
 * @param {String} format
 * @param {Function} callback(err, datauri)
 * @return {Writeable} stream
 */

function toDataUri(format, callback) {
  return concat(function(buffer) {
    bufToDataUri(format, buffer, callback);
  });
}

/**
 * Check if options is raw `src`
 *
 * @param {String|Buffer|Readable|Object} input
 * @return {Boolean} isRaw
 */

function isRaw(input) {
  return typeof input === 'string' || Buffer.isBuffer(input) || isReadable(input);
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
  
  // doesn't break existsing api
  if (isRaw(options)) {
    options = {
      src: options
    };
  }
  
  var opts = {
    format: options.format || 'PNG',
    quality: options.quality || 100,
    srcFormat: 'SVG',
    strip: true
  };
  
  var format = formats[opts.format];
  
  if (options.width) {
    opts.width = options.width;
  }
  
  if (options.height) {
    opts.height = options.height;
  }
  
  if (isReadable(options.src)) {
    options.src
      .pipe(imagemagick.streams.convert(opts))
      .pipe(toDataUri(format, callback));
  } else {
    
    if (!options.src.length) {
      return callback(new Error('options.src should not be empty'));
    }
    
    if (Buffer.isBuffer(options.src)) {
      opts.srcData = options.src;
    } else if (typeof options.src === 'string') {
      opts.srcData = new Buffer(options.src);
    } else {
      process.nextTick(function() {
        callback(new Error('options.src should be a string, buffer or readable stream'));
      });
    }
    
    imagemagick.convert(opts, function(err, buffer) {
      if (err) return callback(err);
      bufToDataUri(format, buffer, callback);
    });
  }  
}

/**
 * Expose
 */

exports = module.exports = svg2pnguri;
