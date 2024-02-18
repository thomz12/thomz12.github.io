
  var Module = typeof Module !== 'undefined' ? Module : {};

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    if (Module['ENVIRONMENT_IS_PTHREAD'] || Module['$ww']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'resources.data';
      var REMOTE_PACKAGE_BASE = 'resources.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus'](`Downloading data... (${loaded}/${total})`);
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "resources", true, true);
Module['FS_createPath']("/resources", "audio", true, true);
Module['FS_createPath']("/resources", "default", true, true);
Module['FS_createPath']("/resources/default", "fonts", true, true);
Module['FS_createPath']("/resources/default", "scripts", true, true);
Module['FS_createPath']("/resources/default", "shaders", true, true);
Module['FS_createPath']("/resources/default", "sprites", true, true);
Module['FS_createPath']("/resources", "fonts", true, true);
Module['FS_createPath']("/resources", "scenes", true, true);
Module['FS_createPath']("/resources", "scripts", true, true);
Module['FS_createPath']("/resources", "textures", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency'](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_resources.data');

      };
      Module['addRunDependency']('datafile_resources.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/resources/audio/hit.wav", "start": 0, "end": 8894, "audio": 1}, {"filename": "/resources/audio/success.wav", "start": 8894, "end": 229402, "audio": 1}, {"filename": "/resources/default/fonts/Font Awesome 6 Brands-Regular-400.otf", "start": 229402, "end": 784146}, {"filename": "/resources/default/fonts/Font Awesome 6 Free-Solid-900.otf", "start": 784146, "end": 1808142}, {"filename": "/resources/default/fonts/Roboto-Regular.ttf", "start": 1808142, "end": 1976402}, {"filename": "/resources/default/scripts/routines.lua", "start": 1976402, "end": 1978465}, {"filename": "/resources/default/shaders/font_opengl.jbshader", "start": 1978465, "end": 1979133}, {"filename": "/resources/default/shaders/fullscreen_opengl.jbshader", "start": 1979133, "end": 1979517}, {"filename": "/resources/default/shaders/sprite_opengl.jbshader", "start": 1979517, "end": 1980172}, {"filename": "/resources/default/shaders/ui_opengl.jbshader", "start": 1980172, "end": 1980827}, {"filename": "/resources/default/sprites/juicebox_icon.png", "start": 1980827, "end": 1981161}, {"filename": "/resources/fonts/AldotheApache.ttf", "start": 1981161, "end": 1998253}, {"filename": "/resources/game.jbproject", "start": 1998253, "end": 1998485}, {"filename": "/resources/scenes/9slicetest.jbscene", "start": 1998485, "end": 2003769}, {"filename": "/resources/scenes/attach_test.jbscene", "start": 2003769, "end": 2012030}, {"filename": "/resources/scenes/boing.jbscene", "start": 2012030, "end": 2014976}, {"filename": "/resources/scenes/breakout.jbscene", "start": 2014976, "end": 2078257}, {"filename": "/resources/scenes/easing_test.jbscene", "start": 2078257, "end": 2117424}, {"filename": "/resources/scenes/load_scene_test.jbscene", "start": 2117424, "end": 2120310}, {"filename": "/resources/scenes/main.jbscene", "start": 2120310, "end": 2134456}, {"filename": "/resources/scenes/routine_test.jbscene", "start": 2134456, "end": 2138141}, {"filename": "/resources/scenes/sprite_stress_test.jbscene", "start": 2138141, "end": 2140566}, {"filename": "/resources/scenes/text_test.jbscene", "start": 2140566, "end": 2144049}, {"filename": "/resources/scenes/tilemap.jbscene", "start": 2144049, "end": 2166850}, {"filename": "/resources/scripts/bounce.lua", "start": 2166850, "end": 2167418}, {"filename": "/resources/scripts/bounce_response.lua", "start": 2167418, "end": 2168041}, {"filename": "/resources/scripts/breakout_ball.lua", "start": 2168041, "end": 2168160}, {"filename": "/resources/scripts/breakout_brick.lua", "start": 2168160, "end": 2168298}, {"filename": "/resources/scripts/breakout_player.lua", "start": 2168298, "end": 2168630}, {"filename": "/resources/scripts/ease.lua", "start": 2168630, "end": 2169601}, {"filename": "/resources/scripts/load.lua", "start": 2169601, "end": 2170045}, {"filename": "/resources/scripts/spinning.lua", "start": 2170045, "end": 2170230}, {"filename": "/resources/scripts/test.lua", "start": 2170230, "end": 2170384}, {"filename": "/resources/scripts/text.lua", "start": 2170384, "end": 2170554}, {"filename": "/resources/textures/9slice.png", "start": 2170554, "end": 2170779}, {"filename": "/resources/textures/highlight.png", "start": 2170779, "end": 2170902}, {"filename": "/resources/textures/package.png", "start": 2170902, "end": 2171133}, {"filename": "/resources/textures/tilemap.png", "start": 2171133, "end": 2171533}, {"filename": "/resources/textures/white.png", "start": 2171533, "end": 2171614}], "remote_package_size": 2171614});

  })();
