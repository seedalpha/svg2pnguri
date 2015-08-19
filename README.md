# svg2pnguri

Converting svg string into png datauri

### Changelog

`1.0.0`:

- project init

### Requirement

ImageMagick is required for the image conversion, follow [here](https://github.com/mash/node-imagemagick-native#installation) to install it.

### Usage

```
var svg2png = require('svg2pnguri');
svg2png('your svg string', function(err, pngUri) {
  console.log('Here is the png datauri:', pngUri);
});
```

### Author

Marvin Lam <lam@seedalpha.net>

### License

©2015 SeedAlpha