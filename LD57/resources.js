
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
    loadPackage({"files": [{"filename": "/resources/audio/noise.mp3", "start": 0, "end": 58747, "audio": 1}, {"filename": "/resources/audio/ping.mp3", "start": 58747, "end": 80966, "audio": 1}, {"filename": "/resources/audio/treasure.mp3", "start": 80966, "end": 82896, "audio": 1}, {"filename": "/resources/default/fonts/Font Awesome 6 Brands-Regular-400.otf", "start": 82896, "end": 637640}, {"filename": "/resources/default/fonts/Font Awesome 6 Free-Solid-900.otf", "start": 637640, "end": 1661636}, {"filename": "/resources/default/fonts/Roboto-Regular.ttf", "start": 1661636, "end": 1829896}, {"filename": "/resources/default/scripts/components.lua", "start": 1829896, "end": 1853330}, {"filename": "/resources/default/scripts/gizmo.lua", "start": 1853330, "end": 1860802}, {"filename": "/resources/default/scripts/routines.lua", "start": 1860802, "end": 1862968}, {"filename": "/resources/default/shaders/font_opengl.jbshader", "start": 1862968, "end": 1863636}, {"filename": "/resources/default/shaders/fullscreen_opengl.jbshader", "start": 1863636, "end": 1864020}, {"filename": "/resources/default/shaders/sprite_opengl.jbshader", "start": 1864020, "end": 1864675}, {"filename": "/resources/default/shaders/ui_opengl.jbshader", "start": 1864675, "end": 1865330}, {"filename": "/resources/default/textures/editor-banner.png", "start": 1865330, "end": 2245390}, {"filename": "/resources/default/textures/juicebox_icon.png", "start": 2245390, "end": 2246946}, {"filename": "/resources/default/textures/juicebox_icon_small.png", "start": 2246946, "end": 2247398}, {"filename": "/resources/fonts/AldotheApache.ttf", "start": 2247398, "end": 2264490}, {"filename": "/resources/game.jbproject", "start": 2264490, "end": 2264654}, {"filename": "/resources/prefabs/treasure.jbprefab", "start": 2264654, "end": 2266134}, {"filename": "/resources/scenes/main.jbscene", "start": 2266134, "end": 2508475}, {"filename": "/resources/scripts/crt_on_off_effect.lua", "start": 2508475, "end": 2510205}, {"filename": "/resources/scripts/crt_screen_controller.lua", "start": 2510205, "end": 2511815}, {"filename": "/resources/scripts/dials/h_speed.lua", "start": 2511815, "end": 2512206}, {"filename": "/resources/scripts/dials/latency_dial.lua", "start": 2512206, "end": 2512742}, {"filename": "/resources/scripts/dials/v_speed.lua", "start": 2512742, "end": 2513078}, {"filename": "/resources/scripts/flash.lua", "start": 2513078, "end": 2513356}, {"filename": "/resources/scripts/latency_bar.lua", "start": 2513356, "end": 2514902}, {"filename": "/resources/scripts/main_camera.lua", "start": 2514902, "end": 2515797}, {"filename": "/resources/scripts/post_processing/bloom.lua", "start": 2515797, "end": 2520749}, {"filename": "/resources/scripts/post_processing/crt.lua", "start": 2520749, "end": 2523375}, {"filename": "/resources/scripts/post_processing/get_target.lua", "start": 2523375, "end": 2523527}, {"filename": "/resources/scripts/post_processing/get_target_sonar.lua", "start": 2523527, "end": 2523689}, {"filename": "/resources/scripts/post_processing/sonar.lua", "start": 2523689, "end": 2526204}, {"filename": "/resources/scripts/submarine.lua", "start": 2526204, "end": 2530289}, {"filename": "/resources/scripts/submarine_camera.lua", "start": 2530289, "end": 2531007}, {"filename": "/resources/scripts/tilemap_collision_gen.lua", "start": 2531007, "end": 2531619}, {"filename": "/resources/scripts/timer.lua", "start": 2531619, "end": 2532077}, {"filename": "/resources/scripts/treasure.lua", "start": 2532077, "end": 2533169}, {"filename": "/resources/scripts/treasure_collect.lua", "start": 2533169, "end": 2533852}, {"filename": "/resources/sprites/arrow.png", "start": 2533852, "end": 2533965}, {"filename": "/resources/sprites/dial.png", "start": 2533965, "end": 2534092}, {"filename": "/resources/sprites/dial_back.png", "start": 2534092, "end": 2534347}, {"filename": "/resources/sprites/dial_h_speed.png", "start": 2534347, "end": 2534724}, {"filename": "/resources/sprites/dial_latency.png", "start": 2534724, "end": 2535114}, {"filename": "/resources/sprites/dial_long.png", "start": 2535114, "end": 2535244}, {"filename": "/resources/sprites/dial_v_speed.png", "start": 2535244, "end": 2535623}, {"filename": "/resources/sprites/gradiant.png", "start": 2535623, "end": 2535880}, {"filename": "/resources/sprites/no_signal.png", "start": 2535880, "end": 2536882}, {"filename": "/resources/sprites/sonar.png", "start": 2536882, "end": 2547336}, {"filename": "/resources/sprites/submarine.png", "start": 2547336, "end": 2547496}, {"filename": "/resources/sprites/tilemap.png", "start": 2547496, "end": 2548112}, {"filename": "/resources/sprites/treasure.png", "start": 2548112, "end": 2548240}, {"filename": "/resources/sprites/ui/status_0.png", "start": 2548240, "end": 2548430}, {"filename": "/resources/sprites/ui/status_1.png", "start": 2548430, "end": 2548554}, {"filename": "/resources/sprites/ui/status_2.png", "start": 2548554, "end": 2548676}, {"filename": "/resources/sprites/ui/status_3.png", "start": 2548676, "end": 2548800}, {"filename": "/resources/sprites/ui/status_4.png", "start": 2548800, "end": 2548922}, {"filename": "/resources/sprites/ui/status_5.png", "start": 2548922, "end": 2549047}, {"filename": "/resources/sprites/white.png", "start": 2549047, "end": 2549146}], "remote_package_size": 2549146});

  })();
