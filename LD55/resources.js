
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
Module['FS_createPath']("/resources/scripts", "ui", true, true);
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
    loadPackage({"files": [{"filename": "/resources/audio/follow.wav", "start": 0, "end": 4641, "audio": 1}, {"filename": "/resources/audio/game_over.mp3", "start": 4641, "end": 164218, "audio": 1}, {"filename": "/resources/audio/main_theme.mp3", "start": 164218, "end": 783968, "audio": 1}, {"filename": "/resources/audio/money.wav", "start": 783968, "end": 798591, "audio": 1}, {"filename": "/resources/audio/throw.wav", "start": 798591, "end": 809160, "audio": 1}, {"filename": "/resources/audio/write.wav", "start": 809160, "end": 814977, "audio": 1}, {"filename": "/resources/default/fonts/Font Awesome 6 Brands-Regular-400.otf", "start": 814977, "end": 1369721}, {"filename": "/resources/default/fonts/Font Awesome 6 Free-Solid-900.otf", "start": 1369721, "end": 2393717}, {"filename": "/resources/default/fonts/Roboto-Regular.ttf", "start": 2393717, "end": 2561977}, {"filename": "/resources/default/scripts/json.lua", "start": 2561977, "end": 2567347}, {"filename": "/resources/default/scripts/routines.lua", "start": 2567347, "end": 2569436}, {"filename": "/resources/default/shaders/font_opengl.jbshader", "start": 2569436, "end": 2570104}, {"filename": "/resources/default/shaders/fullscreen_opengl.jbshader", "start": 2570104, "end": 2570488}, {"filename": "/resources/default/shaders/sprite_opengl.jbshader", "start": 2570488, "end": 2571143}, {"filename": "/resources/default/shaders/ui_opengl.jbshader", "start": 2571143, "end": 2571798}, {"filename": "/resources/default/sprites/juicebox_icon.png", "start": 2571798, "end": 2572132}, {"filename": "/resources/fonts/aldo_the_apache.ttf", "start": 2572132, "end": 2589224}, {"filename": "/resources/game.jbproject", "start": 2589224, "end": 2589467}, {"filename": "/resources/scenes/main.jbscene", "start": 2589467, "end": 2714832}, {"filename": "/resources/scenes/menu.jbscene", "start": 2714832, "end": 2726948}, {"filename": "/resources/scenes/splash.jbscene", "start": 2726948, "end": 2740260}, {"filename": "/resources/scripts/background.lua", "start": 2740260, "end": 2740564}, {"filename": "/resources/scripts/camera.lua", "start": 2740564, "end": 2741701}, {"filename": "/resources/scripts/customer.lua", "start": 2741701, "end": 2750868}, {"filename": "/resources/scripts/customer_spawner.lua", "start": 2750868, "end": 2754664}, {"filename": "/resources/scripts/game_manager.lua", "start": 2754664, "end": 2755726}, {"filename": "/resources/scripts/game_ui.lua", "start": 2755726, "end": 2755882}, {"filename": "/resources/scripts/main_menu.lua", "start": 2755882, "end": 2756650}, {"filename": "/resources/scripts/player.lua", "start": 2756650, "end": 2759341}, {"filename": "/resources/scripts/player_carry.lua", "start": 2759341, "end": 2760159}, {"filename": "/resources/scripts/player_customer.lua", "start": 2760159, "end": 2760826}, {"filename": "/resources/scripts/player_food.lua", "start": 2760826, "end": 2761644}, {"filename": "/resources/scripts/player_score.lua", "start": 2761644, "end": 2762758}, {"filename": "/resources/scripts/table.lua", "start": 2762758, "end": 2764935}, {"filename": "/resources/scripts/ui/ui_button.lua", "start": 2764935, "end": 2765206}, {"filename": "/resources/scripts/ui/ui_game_over.lua", "start": 2765206, "end": 2766803}, {"filename": "/resources/scripts/ui/ui_icon.lua", "start": 2766803, "end": 2767555}, {"filename": "/resources/scripts/ui/ui_logo.lua", "start": 2767555, "end": 2767986}, {"filename": "/resources/scripts/ui/ui_panel.lua", "start": 2767986, "end": 2768541}, {"filename": "/resources/scripts/ui/ui_popup.lua", "start": 2768541, "end": 2769916}, {"filename": "/resources/scripts/ui/ui_progress.lua", "start": 2769916, "end": 2770377}, {"filename": "/resources/scripts/ui/ui_score.lua", "start": 2770377, "end": 2771002}, {"filename": "/resources/sprites/background.png", "start": 2771002, "end": 2771119}, {"filename": "/resources/sprites/food.png", "start": 2771119, "end": 2771392}, {"filename": "/resources/sprites/juicebox_icon.png", "start": 2771392, "end": 2771726}, {"filename": "/resources/sprites/player.png", "start": 2771726, "end": 2774339}, {"filename": "/resources/sprites/table.png", "start": 2774339, "end": 2774595}, {"filename": "/resources/sprites/tilemap.png", "start": 2774595, "end": 2775652}, {"filename": "/resources/sprites/ui_arrow.png", "start": 2775652, "end": 2775806}, {"filename": "/resources/sprites/ui_attention.png", "start": 2775806, "end": 2776005}, {"filename": "/resources/sprites/ui_controls.png", "start": 2776005, "end": 2776439}, {"filename": "/resources/sprites/ui_food.png", "start": 2776439, "end": 2776740}, {"filename": "/resources/sprites/ui_logo.png", "start": 2776740, "end": 2777221}, {"filename": "/resources/sprites/ui_order.png", "start": 2777221, "end": 2777511}, {"filename": "/resources/sprites/ui_payment.png", "start": 2777511, "end": 2777818}, {"filename": "/resources/sprites/ui_progress.png", "start": 2777818, "end": 2777936}, {"filename": "/resources/sprites/ui_progress_bar.png", "start": 2777936, "end": 2778032}, {"filename": "/resources/sprites/ui_wait.png", "start": 2778032, "end": 2778276}, {"filename": "/resources/sprites/ui_window.png", "start": 2778276, "end": 2778402}], "remote_package_size": 2778402});

  })();
