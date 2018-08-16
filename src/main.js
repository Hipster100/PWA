'use strict';

var _core = require('@angular/core');

var _platformBrowserDynamic = require('@angular/platform-browser-dynamic');

var _app = require('./app/app.module');

var _environment = require('./environments/environment');

if (_environment.environment.production) {
  (0, _core.enableProdMode)();
}

(0, _platformBrowserDynamic.platformBrowserDynamic)().bootstrapModule(_app.AppModule).catch(function (err) {
  return console.log(err);
});
