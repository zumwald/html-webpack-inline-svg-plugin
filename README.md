Inline SVG extension for the HTML Webpack Plugin
========================================
[![npm version](https://badge.fury.io/js/html-webpack-inline-svg-plugin.svg)](https://badge.fury.io/js/html-webpack-inline-svg-plugin) [![Build status](https://travis-ci.org/theGC/html-webpack-inline-svg-plugin.svg)](https://travis-ci.org/theGC/html-webpack-inline-svg-plugin)

Allows you to inline SVGs that are parsed by [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin).

Now you can serve SVGs easily to all devices, with or without javascript. Combined with techniques such as: [SVG as Icon Font](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) you have a simple way of ensuring your svg referenced icons are always visible.

The plugin relies on [svgo](https://github.com/svg/svgo) to optimise SVGs. You can configure it's settings, check below for more details.

Installation
------------
Install the plugin with npm:
```shell
$ npm install --save-dev html-webpack-inline-svg-plugin
```

**or** [yarn](https://yarnpkg.com/):
```shell
$ yarn add html-webpack-inline-svg-plugin --dev
```

Usage
-----------
Require the plugin in your webpack config:

```javascript
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
```

Add the plugin to your webpack config as follows:

```javascript
plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackInlineSVGPlugin()
]
```

Config
-----------
To configure SVGO which is the module used to optimise your SVGs, add a `svgoConfig` object to your `html-webpack-plugin` config:

```javascript
plugins: [
    new HtmlWebpackPlugin({
        svgoConfig: {
            removeTitle: false,
            removeViewBox: true,
        },
    }),
    new HtmlWebpackInlineSVGPlugin()
]
```

For a full list of the SVGO config (default) params we are using check out: [sygo-config.js](sygo-config.js). The config you set is merged with our defaults, it does not replace it.

> Please note: setting `cleanupIDs: true` within the above config will break the jasmine tests we have set up. The plugin makes a lot of assumptions on how your SVGs should be optimised for output. It may be that some of the tests we have set up clash with real use cases, but when building this plugin it was assumed it would predominately be used to inline SVGs for use instead of icon fonts. Please raise an issue if this is causing problems...
