
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
Module['FS_createPath']("/resources", "default", true, true);
Module['FS_createPath']("/resources/default", "fonts", true, true);
Module['FS_createPath']("/resources/default", "scripts", true, true);
Module['FS_createPath']("/resources/default", "shaders", true, true);
Module['FS_createPath']("/resources/default", "sprites", true, true);
Module['FS_createPath']("/resources/default", "textures", true, true);
Module['FS_createPath']("/resources", "prefabs", true, true);
Module['FS_createPath']("/resources", "scenes", true, true);
Module['FS_createPath']("/resources", "scripts", true, true);
Module['FS_createPath']("/resources", "sprites", true, true);

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
    loadPackage({"files": [{"filename": "/resources/default/fonts/Font Awesome 6 Brands-Regular-400.otf", "start": 0, "end": 554744}, {"filename": "/resources/default/fonts/Font Awesome 6 Free-Solid-900.otf", "start": 554744, "end": 1578740}, {"filename": "/resources/default/fonts/Roboto-Regular.ttf", "start": 1578740, "end": 1747000}, {"filename": "/resources/default/scripts/routines.lua", "start": 1747000, "end": 1749166}, {"filename": "/resources/default/shaders/font_opengl.jbshader", "start": 1749166, "end": 1749834}, {"filename": "/resources/default/shaders/fullscreen_opengl.jbshader", "start": 1749834, "end": 1750218}, {"filename": "/resources/default/shaders/sprite_opengl.jbshader", "start": 1750218, "end": 1750873}, {"filename": "/resources/default/shaders/ui_opengl.jbshader", "start": 1750873, "end": 1751528}, {"filename": "/resources/default/sprites/juicebox_icon.png", "start": 1751528, "end": 1751862}, {"filename": "/resources/default/textures/editor-banner.png", "start": 1751862, "end": 2131922}, {"filename": "/resources/game.jbproject", "start": 2131922, "end": 2132103}, {"filename": "/resources/prefabs/bunny.jbprefab", "start": 2132103, "end": 2134430}, {"filename": "/resources/prefabs/hat.jbprefab", "start": 2134430, "end": 2135478}, {"filename": "/resources/scenes/game.jbscene", "start": 2135478, "end": 2140835}, {"filename": "/resources/scenes/main.jbscene", "start": 2140835, "end": 2144965}, {"filename": "/resources/scripts/blocker.lua", "start": 2144965, "end": 2145398}, {"filename": "/resources/scripts/bunny.lua", "start": 2145398, "end": 2148025}, {"filename": "/resources/scripts/bunny_catch.lua", "start": 2148025, "end": 2148219}, {"filename": "/resources/scripts/bunny_spawner.lua", "start": 2148219, "end": 2148681}, {"filename": "/resources/scripts/button.lua", "start": 2148681, "end": 2149226}, {"filename": "/resources/scripts/circle_visual.lua", "start": 2149226, "end": 2149685}, {"filename": "/resources/scripts/hat.lua", "start": 2149685, "end": 2150914}, {"filename": "/resources/scripts/lasso.lua", "start": 2150914, "end": 2157385}, {"filename": "/resources/scripts/main_menu.lua", "start": 2157385, "end": 2157527}, {"filename": "/resources/sprites/atlas.png", "start": 2157527, "end": 2162771}, {"filename": "/resources/sprites/blocker.png", "start": 2162771, "end": 2162870}, {"filename": "/resources/sprites/bunny.png", "start": 2162870, "end": 2163115}, {"filename": "/resources/sprites/circle.png", "start": 2163115, "end": 2167386}, {"filename": "/resources/sprites/rope.png", "start": 2167386, "end": 2167499}, {"filename": "/resources/sprites/tilemap.png", "start": 2167499, "end": 2171939}], "remote_package_size": 2171939});

  })();
