
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
    loadPackage({"files": [{"filename": "/resources/audio/bliep0.wav", "start": 0, "end": 38096, "audio": 1}, {"filename": "/resources/audio/bliep1.wav", "start": 38096, "end": 189474, "audio": 1}, {"filename": "/resources/audio/bliep2.wav", "start": 189474, "end": 336592, "audio": 1}, {"filename": "/resources/audio/bliep3.wav", "start": 336592, "end": 477830, "audio": 1}, {"filename": "/resources/audio/fail1.wav", "start": 477830, "end": 713108, "audio": 1}, {"filename": "/resources/audio/fail2.wav", "start": 713108, "end": 743066, "audio": 1}, {"filename": "/resources/audio/juiceboxengine.mp3", "start": 743066, "end": 782688, "audio": 1}, {"filename": "/resources/audio/succes1.wav", "start": 782688, "end": 799686, "audio": 1}, {"filename": "/resources/audio/succes2.wav", "start": 799686, "end": 816684, "audio": 1}, {"filename": "/resources/audio/succes3.wav", "start": 816684, "end": 833124, "audio": 1}, {"filename": "/resources/audio/succes4.wav", "start": 833124, "end": 849564, "audio": 1}, {"filename": "/resources/audio/succes5.wav", "start": 849564, "end": 866004, "audio": 1}, {"filename": "/resources/audio/succes6.wav", "start": 866004, "end": 882440, "audio": 1}, {"filename": "/resources/default/fonts/Font Awesome 6 Brands-Regular-400.otf", "start": 882440, "end": 1437184}, {"filename": "/resources/default/fonts/Font Awesome 6 Free-Solid-900.otf", "start": 1437184, "end": 2461180}, {"filename": "/resources/default/fonts/Roboto-Regular.ttf", "start": 2461180, "end": 2629440}, {"filename": "/resources/default/scripts/routines.lua", "start": 2629440, "end": 2631606}, {"filename": "/resources/default/shaders/font_opengl.jbshader", "start": 2631606, "end": 2632274}, {"filename": "/resources/default/shaders/fullscreen_opengl.jbshader", "start": 2632274, "end": 2632658}, {"filename": "/resources/default/shaders/sprite_opengl.jbshader", "start": 2632658, "end": 2633313}, {"filename": "/resources/default/shaders/ui_opengl.jbshader", "start": 2633313, "end": 2633968}, {"filename": "/resources/default/sprites/juicebox_icon.png", "start": 2633968, "end": 2634302}, {"filename": "/resources/default/textures/editor-banner.png", "start": 2634302, "end": 3014362}, {"filename": "/resources/fonts/poco.ttf", "start": 3014362, "end": 3046966}, {"filename": "/resources/game.jbproject", "start": 3046966, "end": 3047183}, {"filename": "/resources/prefabs/bunny.jbprefab", "start": 3047183, "end": 3049510}, {"filename": "/resources/prefabs/carrot.jbprefab", "start": 3049510, "end": 3050261}, {"filename": "/resources/prefabs/hat.jbprefab", "start": 3050261, "end": 3051309}, {"filename": "/resources/prefabs/text.jbprefab", "start": 3051309, "end": 3053191}, {"filename": "/resources/scenes/game.jbscene", "start": 3053191, "end": 3085552}, {"filename": "/resources/scenes/game_desert.jbscene", "start": 3085552, "end": 3114802}, {"filename": "/resources/scenes/main.jbscene", "start": 3114802, "end": 3124676}, {"filename": "/resources/scripts/blocker.lua", "start": 3124676, "end": 3125263}, {"filename": "/resources/scripts/bunny.lua", "start": 3125263, "end": 3129870}, {"filename": "/resources/scripts/bunny_catch.lua", "start": 3129870, "end": 3130064}, {"filename": "/resources/scripts/bunny_spawner.lua", "start": 3130064, "end": 3131489}, {"filename": "/resources/scripts/button.lua", "start": 3131489, "end": 3132063}, {"filename": "/resources/scripts/carrot.lua", "start": 3132063, "end": 3133421}, {"filename": "/resources/scripts/circle_visual.lua", "start": 3133421, "end": 3133999}, {"filename": "/resources/scripts/garden.lua", "start": 3133999, "end": 3134413}, {"filename": "/resources/scripts/global/bunny_game.lua", "start": 3134413, "end": 3134669}, {"filename": "/resources/scripts/hat.lua", "start": 3134669, "end": 3135948}, {"filename": "/resources/scripts/ingame_text.lua", "start": 3135948, "end": 3136709}, {"filename": "/resources/scripts/lasso.lua", "start": 3136709, "end": 3144203}, {"filename": "/resources/scripts/main_menu.lua", "start": 3144203, "end": 3144611}, {"filename": "/resources/sprites/atlas.png", "start": 3144611, "end": 3151629}, {"filename": "/resources/sprites/blocker.png", "start": 3151629, "end": 3151728}, {"filename": "/resources/sprites/bunny.png", "start": 3151728, "end": 3151973}, {"filename": "/resources/sprites/circle.png", "start": 3151973, "end": 3156244}, {"filename": "/resources/sprites/pr/cowboy.png", "start": 3156244, "end": 3156603}, {"filename": "/resources/sprites/pr/green.png", "start": 3156603, "end": 3156956}, {"filename": "/resources/sprites/pr/mage.png", "start": 3156956, "end": 3157434}, {"filename": "/resources/sprites/pr/thumbnail.png", "start": 3157434, "end": 3327545}, {"filename": "/resources/sprites/pr/viking.png", "start": 3327545, "end": 3328004}, {"filename": "/resources/sprites/rope.png", "start": 3328004, "end": 3328117}, {"filename": "/resources/sprites/tilemap.png", "start": 3328117, "end": 3335746}], "remote_package_size": 3335746});

  })();
