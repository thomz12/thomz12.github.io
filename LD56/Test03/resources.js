
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
Module['FS_createPath']("/resources/default", "textures", true, true);
Module['FS_createPath']("/resources", "fonts", true, true);
Module['FS_createPath']("/resources", "prefabs", true, true);
Module['FS_createPath']("/resources", "scenes", true, true);
Module['FS_createPath']("/resources", "scripts", true, true);
Module['FS_createPath']("/resources/scripts", "global", true, true);
Module['FS_createPath']("/resources", "sprites", true, true);
Module['FS_createPath']("/resources/sprites", "pr", true, true);

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
    loadPackage({"files": [{"filename": "/resources/audio/bliep1.mp3", "start": 0, "end": 21512, "audio": 1}, {"filename": "/resources/audio/bliep2.mp3", "start": 21512, "end": 39580, "audio": 1}, {"filename": "/resources/audio/bliep3.mp3", "start": 39580, "end": 56707, "audio": 1}, {"filename": "/resources/audio/bliep_0.wav", "start": 56707, "end": 94803, "audio": 1}, {"filename": "/resources/audio/fail_1.wav", "start": 94803, "end": 330047, "audio": 1}, {"filename": "/resources/audio/fail_2.mp3", "start": 330047, "end": 336118, "audio": 1}, {"filename": "/resources/audio/juiceboxengine.mp3", "start": 336118, "end": 375740, "audio": 1}, {"filename": "/resources/audio/succes_1.mp3", "start": 375740, "end": 379853, "audio": 1}, {"filename": "/resources/audio/succes_2.mp3", "start": 379853, "end": 384044, "audio": 1}, {"filename": "/resources/audio/succes_3.mp3", "start": 384044, "end": 388235, "audio": 1}, {"filename": "/resources/audio/succes_4.mp3", "start": 388235, "end": 392322, "audio": 1}, {"filename": "/resources/audio/succes_5.mp3", "start": 392322, "end": 396749, "audio": 1}, {"filename": "/resources/audio/succes_6.mp3", "start": 396749, "end": 400313, "audio": 1}, {"filename": "/resources/default/fonts/Font Awesome 6 Brands-Regular-400.otf", "start": 400313, "end": 955057}, {"filename": "/resources/default/fonts/Font Awesome 6 Free-Solid-900.otf", "start": 955057, "end": 1979053}, {"filename": "/resources/default/fonts/Roboto-Regular.ttf", "start": 1979053, "end": 2147313}, {"filename": "/resources/default/scripts/routines.lua", "start": 2147313, "end": 2149479}, {"filename": "/resources/default/shaders/font_opengl.jbshader", "start": 2149479, "end": 2150147}, {"filename": "/resources/default/shaders/fullscreen_opengl.jbshader", "start": 2150147, "end": 2150531}, {"filename": "/resources/default/shaders/sprite_opengl.jbshader", "start": 2150531, "end": 2151186}, {"filename": "/resources/default/shaders/ui_opengl.jbshader", "start": 2151186, "end": 2151841}, {"filename": "/resources/default/sprites/juicebox_icon.png", "start": 2151841, "end": 2152175}, {"filename": "/resources/default/textures/editor-banner.png", "start": 2152175, "end": 2532235}, {"filename": "/resources/fonts/dogicabold.ttf", "start": 2532235, "end": 2563687}, {"filename": "/resources/fonts/poco.ttf", "start": 2563687, "end": 2596291}, {"filename": "/resources/game.jbproject", "start": 2596291, "end": 2596472}, {"filename": "/resources/prefabs/bunny.jbprefab", "start": 2596472, "end": 2598799}, {"filename": "/resources/prefabs/carrot.jbprefab", "start": 2598799, "end": 2599550}, {"filename": "/resources/prefabs/hat.jbprefab", "start": 2599550, "end": 2600598}, {"filename": "/resources/prefabs/text.jbprefab", "start": 2600598, "end": 2602480}, {"filename": "/resources/scenes/game.jbscene", "start": 2602480, "end": 2635226}, {"filename": "/resources/scenes/game_desert.jbscene", "start": 2635226, "end": 2664476}, {"filename": "/resources/scenes/main.jbscene", "start": 2664476, "end": 2668606}, {"filename": "/resources/scripts/blocker.lua", "start": 2668606, "end": 2669193}, {"filename": "/resources/scripts/bunny.lua", "start": 2669193, "end": 2671820}, {"filename": "/resources/scripts/bunny_catch.lua", "start": 2671820, "end": 2672014}, {"filename": "/resources/scripts/bunny_spawner.lua", "start": 2672014, "end": 2672476}, {"filename": "/resources/scripts/button.lua", "start": 2672476, "end": 2673021}, {"filename": "/resources/scripts/carrot.lua", "start": 2673021, "end": 2674018}, {"filename": "/resources/scripts/circle_visual.lua", "start": 2674018, "end": 2674470}, {"filename": "/resources/scripts/garden.lua", "start": 2674470, "end": 2674884}, {"filename": "/resources/scripts/global/score.lua", "start": 2674884, "end": 2674973}, {"filename": "/resources/scripts/hat.lua", "start": 2674973, "end": 2676252}, {"filename": "/resources/scripts/ingame_text.lua", "start": 2676252, "end": 2677013}, {"filename": "/resources/scripts/lasso.lua", "start": 2677013, "end": 2684507}, {"filename": "/resources/scripts/main_menu.lua", "start": 2684507, "end": 2684649}, {"filename": "/resources/sprites/atlas.png", "start": 2684649, "end": 2689896}, {"filename": "/resources/sprites/blocker.png", "start": 2689896, "end": 2689995}, {"filename": "/resources/sprites/bunny.png", "start": 2689995, "end": 2690240}, {"filename": "/resources/sprites/circle.png", "start": 2690240, "end": 2694511}, {"filename": "/resources/sprites/pr/cowboy.png", "start": 2694511, "end": 2694870}, {"filename": "/resources/sprites/pr/green.png", "start": 2694870, "end": 2695223}, {"filename": "/resources/sprites/pr/mage.png", "start": 2695223, "end": 2695701}, {"filename": "/resources/sprites/pr/thumbnail.png", "start": 2695701, "end": 2865812}, {"filename": "/resources/sprites/pr/viking.png", "start": 2865812, "end": 2866271}, {"filename": "/resources/sprites/rope.png", "start": 2866271, "end": 2866384}, {"filename": "/resources/sprites/tilemap.png", "start": 2866384, "end": 2873422}], "remote_package_size": 2873422});

  })();
