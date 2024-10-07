
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
Module['FS_createPath']("/resources/scripts", "external", true, true);
Module['FS_createPath']("/resources/scripts", "global", true, true);
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
    loadPackage({"files": [{"filename": "/resources/audio/bgm.mp3", "start": 0, "end": 3842843, "audio": 1}, {"filename": "/resources/audio/bliep0.wav", "start": 3842843, "end": 3880939, "audio": 1}, {"filename": "/resources/audio/bliep1.wav", "start": 3880939, "end": 4032317, "audio": 1}, {"filename": "/resources/audio/bliep2.wav", "start": 4032317, "end": 4179435, "audio": 1}, {"filename": "/resources/audio/bliep3.wav", "start": 4179435, "end": 4320673, "audio": 1}, {"filename": "/resources/audio/fail1.wav", "start": 4320673, "end": 4555951, "audio": 1}, {"filename": "/resources/audio/fail2.wav", "start": 4555951, "end": 4585909, "audio": 1}, {"filename": "/resources/audio/juiceboxengine.mp3", "start": 4585909, "end": 4625531, "audio": 1}, {"filename": "/resources/audio/main.mp3", "start": 4625531, "end": 6472827, "audio": 1}, {"filename": "/resources/audio/succes1.wav", "start": 6472827, "end": 6489825, "audio": 1}, {"filename": "/resources/audio/succes2.wav", "start": 6489825, "end": 6506823, "audio": 1}, {"filename": "/resources/audio/succes3.wav", "start": 6506823, "end": 6523263, "audio": 1}, {"filename": "/resources/audio/succes4.wav", "start": 6523263, "end": 6539703, "audio": 1}, {"filename": "/resources/audio/succes5.wav", "start": 6539703, "end": 6556143, "audio": 1}, {"filename": "/resources/audio/succes6.wav", "start": 6556143, "end": 6572579, "audio": 1}, {"filename": "/resources/default/fonts/Font Awesome 6 Brands-Regular-400.otf", "start": 6572579, "end": 7127323}, {"filename": "/resources/default/fonts/Font Awesome 6 Free-Solid-900.otf", "start": 7127323, "end": 8151319}, {"filename": "/resources/default/fonts/Roboto-Regular.ttf", "start": 8151319, "end": 8319579}, {"filename": "/resources/default/scripts/routines.lua", "start": 8319579, "end": 8321745}, {"filename": "/resources/default/shaders/font_opengl.jbshader", "start": 8321745, "end": 8322413}, {"filename": "/resources/default/shaders/fullscreen_opengl.jbshader", "start": 8322413, "end": 8322797}, {"filename": "/resources/default/shaders/sprite_opengl.jbshader", "start": 8322797, "end": 8323452}, {"filename": "/resources/default/shaders/ui_opengl.jbshader", "start": 8323452, "end": 8324107}, {"filename": "/resources/default/sprites/juicebox_icon.png", "start": 8324107, "end": 8324441}, {"filename": "/resources/default/textures/editor-banner.png", "start": 8324441, "end": 8704501}, {"filename": "/resources/fonts/poco.ttf", "start": 8704501, "end": 8737105}, {"filename": "/resources/game.jbproject", "start": 8737105, "end": 8737355}, {"filename": "/resources/prefabs/bunny.jbprefab", "start": 8737355, "end": 8740044}, {"filename": "/resources/prefabs/carrot.jbprefab", "start": 8740044, "end": 8740795}, {"filename": "/resources/prefabs/fade.jbprefab", "start": 8740795, "end": 8741507}, {"filename": "/resources/prefabs/hat.jbprefab", "start": 8741507, "end": 8742555}, {"filename": "/resources/prefabs/leaderboard_entry.jbprefab", "start": 8742555, "end": 8748195}, {"filename": "/resources/prefabs/text.jbprefab", "start": 8748195, "end": 8750077}, {"filename": "/resources/scenes/game.jbscene", "start": 8750077, "end": 8805597}, {"filename": "/resources/scenes/game_desert.jbscene", "start": 8805597, "end": 8834847}, {"filename": "/resources/scenes/main.jbscene", "start": 8834847, "end": 8905346}, {"filename": "/resources/scenes/main_backup.jbscene", "start": 8905346, "end": 8934531}, {"filename": "/resources/scripts/blocker.lua", "start": 8934531, "end": 8935476}, {"filename": "/resources/scripts/bunny.lua", "start": 8935476, "end": 8941653}, {"filename": "/resources/scripts/bunny_catch.lua", "start": 8941653, "end": 8941847}, {"filename": "/resources/scripts/bunny_spawner.lua", "start": 8941847, "end": 8943990}, {"filename": "/resources/scripts/button.lua", "start": 8943990, "end": 8944535}, {"filename": "/resources/scripts/carrot.lua", "start": 8944535, "end": 8945893}, {"filename": "/resources/scripts/circle_visual.lua", "start": 8945893, "end": 8946708}, {"filename": "/resources/scripts/external/json.lua", "start": 8946708, "end": 8956732}, {"filename": "/resources/scripts/fade.lua", "start": 8956732, "end": 8957211}, {"filename": "/resources/scripts/garden.lua", "start": 8957211, "end": 8957859}, {"filename": "/resources/scripts/global/bunny_game.lua", "start": 8957859, "end": 8958634}, {"filename": "/resources/scripts/global/playfab.lua", "start": 8958634, "end": 8962757}, {"filename": "/resources/scripts/hand_animation.lua", "start": 8962757, "end": 8962962}, {"filename": "/resources/scripts/hat.lua", "start": 8962962, "end": 8964241}, {"filename": "/resources/scripts/ingame_text.lua", "start": 8964241, "end": 8965137}, {"filename": "/resources/scripts/lasso.lua", "start": 8965137, "end": 8973341}, {"filename": "/resources/scripts/leaderboard.lua", "start": 8973341, "end": 8976176}, {"filename": "/resources/scripts/light_button.lua", "start": 8976176, "end": 8977398}, {"filename": "/resources/scripts/loading_bunny.lua", "start": 8977398, "end": 8977518}, {"filename": "/resources/scripts/main_menu.lua", "start": 8977518, "end": 8983409}, {"filename": "/resources/scripts/result_ui.lua", "start": 8983409, "end": 8986314}, {"filename": "/resources/scripts/timer.lua", "start": 8986314, "end": 8987722}, {"filename": "/resources/sprites/atlas.png", "start": 8987722, "end": 8995687}, {"filename": "/resources/sprites/blocker.png", "start": 8995687, "end": 8995786}, {"filename": "/resources/sprites/bunny.png", "start": 8995786, "end": 8996005}, {"filename": "/resources/sprites/bunny_logo.png", "start": 8996005, "end": 8997484}, {"filename": "/resources/sprites/circle.png", "start": 8997484, "end": 9001755}, {"filename": "/resources/sprites/leaderboard_bronze.png", "start": 9001755, "end": 9002184}, {"filename": "/resources/sprites/leaderboard_bronze_small.png", "start": 9002184, "end": 9002499}, {"filename": "/resources/sprites/leaderboard_gold.png", "start": 9002499, "end": 9002933}, {"filename": "/resources/sprites/leaderboard_gold_small.png", "start": 9002933, "end": 9003249}, {"filename": "/resources/sprites/leaderboard_noob.png", "start": 9003249, "end": 9003688}, {"filename": "/resources/sprites/leaderboard_noob_small.png", "start": 9003688, "end": 9004002}, {"filename": "/resources/sprites/leaderboard_silver.png", "start": 9004002, "end": 9004431}, {"filename": "/resources/sprites/leaderboard_silver_small.png", "start": 9004431, "end": 9004745}, {"filename": "/resources/sprites/logo.png", "start": 9004745, "end": 9005132}, {"filename": "/resources/sprites/main_menu_background.png", "start": 9005132, "end": 9005447}, {"filename": "/resources/sprites/rope.png", "start": 9005447, "end": 9005560}, {"filename": "/resources/sprites/tilemap.png", "start": 9005560, "end": 9013225}, {"filename": "/resources/sprites/ui_button.png", "start": 9013225, "end": 9013429}, {"filename": "/resources/sprites/ui_button_disabled.png", "start": 9013429, "end": 9013636}, {"filename": "/resources/sprites/ui_button_left.png", "start": 9013636, "end": 9013887}, {"filename": "/resources/sprites/ui_button_light.png", "start": 9013887, "end": 9014091}, {"filename": "/resources/sprites/ui_button_lightest.png", "start": 9014091, "end": 9014295}, {"filename": "/resources/sprites/ui_button_right.png", "start": 9014295, "end": 9014546}, {"filename": "/resources/sprites/ui_leaderboard_panel.png", "start": 9014546, "end": 9015963}, {"filename": "/resources/sprites/ui_panel.png", "start": 9015963, "end": 9016241}, {"filename": "/resources/sprites/ui_panel_pointed.png", "start": 9016241, "end": 9016618}, {"filename": "/resources/sprites/ui_panel_rounded.png", "start": 9016618, "end": 9016999}], "remote_package_size": 9016999});

  })();
