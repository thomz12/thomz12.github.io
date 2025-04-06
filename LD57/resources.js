
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
Module['FS_createPath']("/resources/default", "textures", true, true);
Module['FS_createPath']("/resources", "fonts", true, true);
Module['FS_createPath']("/resources", "prefabs", true, true);
Module['FS_createPath']("/resources", "scenes", true, true);
Module['FS_createPath']("/resources", "scripts", true, true);
Module['FS_createPath']("/resources/scripts", "dials", true, true);
Module['FS_createPath']("/resources/scripts", "external", true, true);
Module['FS_createPath']("/resources/scripts", "global", true, true);
Module['FS_createPath']("/resources/scripts", "post_processing", true, true);
Module['FS_createPath']("/resources", "sprites", true, true);
Module['FS_createPath']("/resources/sprites", "ui", true, true);

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
    loadPackage({"files": [{"filename": "/resources/audio/noise.mp3", "start": 0, "end": 58747, "audio": 1}, {"filename": "/resources/audio/ping.mp3", "start": 58747, "end": 80966, "audio": 1}, {"filename": "/resources/audio/treasure.mp3", "start": 80966, "end": 82896, "audio": 1}, {"filename": "/resources/default/fonts/Font Awesome 6 Brands-Regular-400.otf", "start": 82896, "end": 637640}, {"filename": "/resources/default/fonts/Font Awesome 6 Free-Solid-900.otf", "start": 637640, "end": 1661636}, {"filename": "/resources/default/fonts/Roboto-Regular.ttf", "start": 1661636, "end": 1829896}, {"filename": "/resources/default/scripts/components.lua", "start": 1829896, "end": 1853334}, {"filename": "/resources/default/scripts/gizmo.lua", "start": 1853334, "end": 1860806}, {"filename": "/resources/default/scripts/routines.lua", "start": 1860806, "end": 1862972}, {"filename": "/resources/default/shaders/font_opengl.jbshader", "start": 1862972, "end": 1863640}, {"filename": "/resources/default/shaders/fullscreen_opengl.jbshader", "start": 1863640, "end": 1864024}, {"filename": "/resources/default/shaders/sprite_opengl.jbshader", "start": 1864024, "end": 1864679}, {"filename": "/resources/default/shaders/ui_opengl.jbshader", "start": 1864679, "end": 1865334}, {"filename": "/resources/default/textures/editor-banner.png", "start": 1865334, "end": 2245394}, {"filename": "/resources/default/textures/juicebox_icon.png", "start": 2245394, "end": 2246950}, {"filename": "/resources/default/textures/juicebox_icon_small.png", "start": 2246950, "end": 2247402}, {"filename": "/resources/fonts/AldotheApache.ttf", "start": 2247402, "end": 2264494}, {"filename": "/resources/game.jbproject", "start": 2264494, "end": 2264696}, {"filename": "/resources/prefabs/highscore_entry.jbprefab", "start": 2264696, "end": 2267700}, {"filename": "/resources/prefabs/treasure.jbprefab", "start": 2267700, "end": 2269181}, {"filename": "/resources/scenes/main.jbscene", "start": 2269181, "end": 2519955}, {"filename": "/resources/scenes/main_menu.jbscene", "start": 2519955, "end": 2538765}, {"filename": "/resources/scenes/splash.jbscene", "start": 2538765, "end": 2549528}, {"filename": "/resources/scripts/close_sensor.lua", "start": 2549528, "end": 2550843}, {"filename": "/resources/scripts/crt_on_off_effect.lua", "start": 2550843, "end": 2552573}, {"filename": "/resources/scripts/crt_screen_controller.lua", "start": 2552573, "end": 2556389}, {"filename": "/resources/scripts/dials/h_speed.lua", "start": 2556389, "end": 2556944}, {"filename": "/resources/scripts/dials/latency_dial.lua", "start": 2556944, "end": 2557480}, {"filename": "/resources/scripts/dials/v_speed.lua", "start": 2557480, "end": 2557964}, {"filename": "/resources/scripts/external/json.lua", "start": 2557964, "end": 2567988}, {"filename": "/resources/scripts/flash.lua", "start": 2567988, "end": 2568266}, {"filename": "/resources/scripts/global/ctrldive.lua", "start": 2568266, "end": 2568266}, {"filename": "/resources/scripts/global/playfab.lua", "start": 2568266, "end": 2572389}, {"filename": "/resources/scripts/high_scores.lua", "start": 2572389, "end": 2578617}, {"filename": "/resources/scripts/latency_bar.lua", "start": 2578617, "end": 2580297}, {"filename": "/resources/scripts/main_camera.lua", "start": 2580297, "end": 2581192}, {"filename": "/resources/scripts/main_menu.lua", "start": 2581192, "end": 2581796}, {"filename": "/resources/scripts/post_processing/bloom.lua", "start": 2581796, "end": 2586748}, {"filename": "/resources/scripts/post_processing/crt.lua", "start": 2586748, "end": 2589374}, {"filename": "/resources/scripts/post_processing/get_target.lua", "start": 2589374, "end": 2589526}, {"filename": "/resources/scripts/post_processing/get_target_sonar.lua", "start": 2589526, "end": 2589688}, {"filename": "/resources/scripts/post_processing/sonar.lua", "start": 2589688, "end": 2592203}, {"filename": "/resources/scripts/splash.lua", "start": 2592203, "end": 2592480}, {"filename": "/resources/scripts/submarine.lua", "start": 2592480, "end": 2596714}, {"filename": "/resources/scripts/submarine_camera.lua", "start": 2596714, "end": 2597432}, {"filename": "/resources/scripts/tilemap_collision_gen.lua", "start": 2597432, "end": 2598044}, {"filename": "/resources/scripts/timer.lua", "start": 2598044, "end": 2598615}, {"filename": "/resources/scripts/top_bar.lua", "start": 2598615, "end": 2598839}, {"filename": "/resources/scripts/treasure.lua", "start": 2598839, "end": 2599931}, {"filename": "/resources/scripts/treasure_collect.lua", "start": 2599931, "end": 2600981}, {"filename": "/resources/sprites/arrow.png", "start": 2600981, "end": 2601094}, {"filename": "/resources/sprites/dial.png", "start": 2601094, "end": 2601221}, {"filename": "/resources/sprites/dial_back.png", "start": 2601221, "end": 2601476}, {"filename": "/resources/sprites/dial_h_speed.png", "start": 2601476, "end": 2601853}, {"filename": "/resources/sprites/dial_latency.png", "start": 2601853, "end": 2602243}, {"filename": "/resources/sprites/dial_long.png", "start": 2602243, "end": 2602373}, {"filename": "/resources/sprites/dial_v_speed.png", "start": 2602373, "end": 2602752}, {"filename": "/resources/sprites/gradiant.png", "start": 2602752, "end": 2603015}, {"filename": "/resources/sprites/juicebox-icon.png", "start": 2603015, "end": 2608457}, {"filename": "/resources/sprites/no_signal.png", "start": 2608457, "end": 2609459}, {"filename": "/resources/sprites/selection.png", "start": 2609459, "end": 2609578}, {"filename": "/resources/sprites/sonar.png", "start": 2609578, "end": 2620032}, {"filename": "/resources/sprites/submarine.png", "start": 2620032, "end": 2620192}, {"filename": "/resources/sprites/tilemap.png", "start": 2620192, "end": 2620808}, {"filename": "/resources/sprites/treasure.png", "start": 2620808, "end": 2620936}, {"filename": "/resources/sprites/ui/status_0.png", "start": 2620936, "end": 2621126}, {"filename": "/resources/sprites/ui/status_1.png", "start": 2621126, "end": 2621250}, {"filename": "/resources/sprites/ui/status_2.png", "start": 2621250, "end": 2621372}, {"filename": "/resources/sprites/ui/status_3.png", "start": 2621372, "end": 2621496}, {"filename": "/resources/sprites/ui/status_4.png", "start": 2621496, "end": 2621618}, {"filename": "/resources/sprites/ui/status_5.png", "start": 2621618, "end": 2621743}, {"filename": "/resources/sprites/white.png", "start": 2621743, "end": 2621842}], "remote_package_size": 2621842});

  })();
