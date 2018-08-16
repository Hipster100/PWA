'use strict';

var cacheFirst = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req) {
    var cachedResponse;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return caches.match(req);

          case 2:
            cachedResponse = _context3.sent;
            return _context3.abrupt('return', cachedResponse || fetch(req));

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function cacheFirst(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var networkFirst = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req) {
    var cache, res;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return caches.open('new-dynamic');

          case 2:
            cache = _context4.sent;
            _context4.prev = 3;
            _context4.next = 6;
            return fetch(req);

          case 6:
            res = _context4.sent;

            cache.put(req, res.clone());
            return _context4.abrupt('return', res);

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](3);
            _context4.next = 15;
            return cache.match(req);

          case 15:
            return _context4.abrupt('return', _context4.sent);

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[3, 11]]);
  }));

  return function networkFirst(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var CACHE_VERSION = 'app-v1';
var CACHE_FILES = ['./', '/styles.bundle.js', 'main.bundle.js'];

self.addEventListener('install', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var cache;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return caches.open('new-static4');

          case 2:
            cache = _context.sent;

            cache.addAll(CACHE_FILES);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

self.addEventListener('fetch', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
    var req, url;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req = event.request;
            url = new URL(req.url);

            if (url.origin === location.origin) {

              event.respondWith(cacheFirst(req));
            } else {
              event.respondWith(networkFirst(req));
            }

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());