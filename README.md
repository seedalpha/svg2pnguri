# svg2pnguri

Converting svg string into png datauri

### Changelog

`1.1.0`:
  
- support `JPEG` format
- support `GIF` format
- support custom `width` and `height`
- support quality (defaults to 100)
- strip metadata on conversion
- update license

`1.0.2`:

- test

`1.0.1`:

- update readme

`1.0.0`:

- project init

### Requirement

ImageMagick is required for the image conversion, follow [here](https://github.com/mash/node-imagemagick-native#installation) to install it.

### Usage

```javascript
var svg2png = require('svg2pnguri');

svg2png('your svg string', function(err, pngUri) {
  console.log('Here is the png datauri:', pngUri);
});

```

#### svg2png(options, callback)

Options:
    
    src: String || Buffer || Stream
    width: Number, optional, width in pixels, defaults to svg width
    height: Number, optional, height in pixels, defaults to svg height
    format: String, optional, intermediary format for data uri (could be PNG, JPEG, GIF), defaults to PNG
    quality: Number, optional, intermediary conversion quality (0-100), defaults to 100

Callback:
    
    err: Conversion error
    result: Datauri string

#### Shorthand scr2png(src, callback)

Pass `String` or `Buffer` or `Readable` directly to use default options

### Authors

Marvin Lam <lam@seedalpha.net>
Vladimir Popov <vlad@seedalpha.net>

### License

MIT