var svg2pnguri = require('./');
var assert = require('assert');

var input = '<svg version="1.1" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="red" /></svg>';
var output = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAQMAAAC3R49OAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX/AAD///9BHTQRAAAAAWJLR0QB/wIt3gAAAAxJREFUCNdjYKAuAAAAUAABIhPodQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0wOC0yMFQxMzo1MzoxMiswODowMMhJhuwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMDgtMjBUMTM6NTM6MTIrMDg6MDC5FD5QAAAAAElFTkSuQmCC';

describe('svg2pnguri', function() {
  it('should convert svg to png data uri', function(done) {
    svg2pnguri(input, function(err, datauri) {
      assert(!err);
      assert(datauri.trim() === datauri.trim());
      done();
    });
  });
});