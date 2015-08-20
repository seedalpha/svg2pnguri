var svg2pnguri = require('./');
var assert = require('assert');
var Readable = require('stream').Readable;
var fs = require('fs');
var concat = require('concat-stream');

var input   = fs.readFileSync(__dirname + '/test.svg').toString();
var output  = fs.readFileSync(__dirname + '/test_png.datauri').toString();
var outputGIF = fs.readFileSync(__dirname + '/test_gif.datauri').toString();
var outputJPEG = fs.readFileSync(__dirname + '/test_jpeg.datauri').toString();

describe('svg2pnguri', function() {
  
  it('should convert svg to png data uri', function(done) {
    svg2pnguri(input, function(err, datauri) {
      assert(!err);
      assert.strictEqual(output, datauri);
      done();
    });
  });
  
  it('should convert svg buffer to png data uri', function(done) {
    svg2pnguri(new Buffer(input), function(err, datauri) {
      assert(!err);
      assert.strictEqual(output, datauri);
      done();
    });
  });
  
  
  it('should convert svg readable stream to png data uri', function(done) {
    var stream = new Readable();
    svg2pnguri(stream, function(err, datauri) {
      assert(!err);
      assert.strictEqual(output, datauri);
      done();
    });

    stream.push(input);
    stream.push(null);
  });

  it('should support width and height options', function(done) {
    svg2pnguri({
      src: input,
      width: 500,
      height: 500
    }, function(err, datauri) {
      assert(!err);
      assert(output !== datauri);
      done();
    });
  });
  
  it('should support quality option', function(done) {
    svg2pnguri({
      src: input,
      quality: 50
    }, function(err, datauri) {
      assert(!err);
      assert(output !== datauri);
      done();
    });
  });
  
  it('should support JPEG format', function(done) {
    svg2pnguri({
      src: input,
      format: 'JPEG'
    }, function(err, datauri) {
      assert(!err);
      assert(outputJPEG === datauri);
      done();
    });
  });
  
  it('should support GIF format', function(done) {
    svg2pnguri({
      src: input,
      format: 'GIF'
    }, function(err, datauri) {
      assert(!err);
      assert(outputGIF === datauri);
      done();
    });
  });
  
  it('should use streaming interface', function(done) {
    fs.createReadStream(__dirname + '/test.svg')
      .pipe(svg2pnguri.stream())
      .pipe(concat(function(buffer) {
        assert(buffer.toString() === output);
        done();
      }));
  });
});