/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2020
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("LD47Game", function ($asm, globals) {
    "use strict";

    Bridge.define("LD47Game.Game", {
        inherits: [JuiceboxEngine.JuiceboxGame],
        /**
         * Program entry point.
         *
         * @static
         * @public
         * @this LD47Game.Game
         * @memberof LD47Game.Game
         * @return  {void}
         */
        main: function Main () {
            var game = new LD47Game.Game();
        },
        statics: {
            fields: {
                TILE_SIZE: 0,
                DEBUG_HITBOXES: false,
                LevelLetters: null,
                CurLevel: 0,
                CurLives: 0,
                PrevLevel: 0,
                PrevLives: 0,
                Retries: 0
            },
            ctors: {
                init: function () {
                    this.TILE_SIZE = 16;
                    this.DEBUG_HITBOXES = false;
                    this.LevelLetters = System.Array.init(["A", "B", "C"], System.String);
                    this.CurLevel = 0;
                    this.CurLives = 9;
                    this.PrevLevel = 0;
                    this.PrevLives = 9;
                    this.Retries = 0;
                }
            },
            methods: {
                ReportFinishLevel: function (nextLevel, nextLives) {
                    LD47Game.Game.PrevLevel = LD47Game.Game.CurLevel;
                    LD47Game.Game.PrevLives = LD47Game.Game.CurLives;
                    LD47Game.Game.CurLevel = nextLevel;
                    LD47Game.Game.CurLives = nextLives;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                JuiceboxEngine.JuiceboxGame.ctor.call(this);
                if (this.Client) {
                    JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(true);

                    JuiceboxEngine.SceneManager.FadeInDuration = 0.0;

                    this.Run(new LD47Game.MainMenu(this.ResourceManager));
                }
            }
        }
    });

    Bridge.define("LD47Game.InteractableObject", {
        fields: {
            _scene: null,
            _world: null,
            _obj: null
        },
        ctors: {
            ctor: function (pos, scene, world) {
                this.$initialize();
                this._scene = scene;
                this._world = world;

                this._obj = this.CreateObj(pos.$clone());
                this._obj.UserData = this;

                this.DecorateGameObject();
            }
        },
        methods: {
            CreateObj: function (pos) {
                var obj = this._scene.AddGameObject$1(this.GetName());
                obj.Transform.Position2D = pos.$clone();
                return obj;
            }
        }
    });

    Bridge.define("LD47Game.TTScene", {
        inherits: [JuiceboxEngine.Scene],
        fields: {
            entrance: null,
            exit: null,
            _interactables: null,
            _tileMap: null,
            _physicsWorld: null,
            _player: null,
            _hasExit: false,
            _allowMove: false,
            targetZoom: 0,
            targetPos: null,
            _msg: null,
            display: null,
            _backgroundMusic: null
        },
        ctors: {
            init: function () {
                this.targetPos = new JuiceboxEngine.Math.Vector2();
            },
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);
                this._interactables = new (System.Collections.Generic.List$1(LD47Game.InteractableObject)).ctor();
            }
        },
        methods: {
            InitializeScene: function () {
                this._physicsWorld = new Humper.World(1024, 1024);

                this.display = new LD47Game.RoomDisplay(this.GUI.Root);
                this.display.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.display.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                this.display.AnimateTransition(LD47Game.Game.LevelLetters[LD47Game.Game.PrevLevel], LD47Game.Game.LevelLetters[LD47Game.Game.CurLevel], Bridge.toString(LD47Game.Game.PrevLives), Bridge.toString(LD47Game.Game.CurLives));

                this.display.addOnFinishUI(Bridge.fn.cacheBind(this, this.DisplayUIFinish));

                JuiceboxEngine.SceneManager.FadeOutDuration = 0.0;

                this.targetZoom = JuiceboxEngine.Util.Browser.IsMobile() ? 2 : 4;
                this.targetPos = new JuiceboxEngine.Math.Vector2.$ctor3(100, 100);

                this.DefaultCamera.Zoom = 8;
                this.DefaultCamera.PixelPerfect = false;

                var tilemapObj = this.AddGameObject$1("Tilemap");
                tilemapObj.Transform.Position = new JuiceboxEngine.Math.Vector3.$ctor2(0, 0, -10.0);
                this._tileMap = tilemapObj.AddComponent(JuiceboxEngine.TileMap);
                this._tileMap.TileSize = LD47Game.Game.TILE_SIZE;
                this._tileMap.Sprites = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/MapSprites.png");

                var startPos = new JuiceboxEngine.Math.Vector2.$ctor3(72, 150);

                this.DefaultCamera.Parent.Transform.Position2D = startPos.$clone();
                this._player = new LD47Game.Player(startPos.$clone(), this, this._physicsWorld);
                this._player.addOnExit(Bridge.fn.cacheBind(this, this.PlayerExit));

                var bgmObj = this.AddGameObject$1("Music");
                this._backgroundMusic = bgmObj.AddComponent(JuiceboxEngine.Audio.AudioComponent);
                this._backgroundMusic.Loop(true);
                this._backgroundMusic.SetVolume(0.5);

                if (LD47Game.Game.CurLives > 6) {
                    this._backgroundMusic.SetAudioClip(this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Music/rooms_80.mp3"));
                } else {
                    if (LD47Game.Game.CurLives > 3) {
                        this._backgroundMusic.SetAudioClip(this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Music/rooms_100.mp3"));
                    } else {
                        if (LD47Game.Game.CurLives > 0) {
                            this._backgroundMusic.SetAudioClip(this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Music/rooms_120.mp3"));
                        }
                    }
                }

                this._allowMove = false;

            },
            PreUpdate: function () {
                var $t;

                $t = Bridge.getEnumerator(this._interactables);
                try {
                    while ($t.moveNext()) {
                        var interactable = $t.Current;
                        interactable.Update();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                if (!this._hasExit) {
                    this.PlayerUpdate();
                }

                this.CameraUpdate();
            },
            FinalizeScene: function () {

            },
            LateUpdate: function () {

            },
            DisplayUIFinish: function () {
                var startZoom = this.DefaultCamera.Zoom;
                var startPos = this.DefaultCamera.Parent.Transform.Position2D.$clone();

                this._backgroundMusic.Play();

                this.entrance.Close();

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(2.0, Bridge.fn.bind(this, function (x) {
                    this.DefaultCamera.Zoom = JuiceboxEngine.Math.JMath.Interpolate(startZoom, this.targetZoom, JuiceboxEngine.Math.Easings.QuadraticEaseOut(x));
                    this.DefaultCamera.Parent.Transform.Position2D = JuiceboxEngine.Math.Vector2.Interpolate(startPos.$clone(), this.targetPos.$clone(), JuiceboxEngine.Math.Easings.QuadraticEaseOut(x));
                })));

                this.display = null;
                this._allowMove = true;

                this.Start$1();
            },
            CameraUpdate: function () {
                var distance = this._player.PlayerObj.Transform.Position2D.X - this.DefaultCamera.Parent.Transform.Position2D.X;
                var camMoveDist = 50;
                if (JuiceboxEngine.Math.JMath.Abs(distance) > camMoveDist) {
                    camMoveDist = distance > 0 ? -camMoveDist : camMoveDist;

                    this.DefaultCamera.Parent.Transform.Translate2D(new JuiceboxEngine.Math.Vector2.$ctor3(this._player.PlayerObj.Transform.Position2D.X - this.DefaultCamera.Parent.Transform.Position2D.X + camMoveDist, 0));
                }
            },
            PlayerUpdate: function () {
                var dir = new JuiceboxEngine.Math.Vector2.ctor();

                if (JuiceboxEngine.Input.InputManager.Instance.KeyDown("a") || JuiceboxEngine.Input.InputManager.Instance.KeyDown("ArrowLeft")) {
                    dir = JuiceboxEngine.Math.Vector2.op_Addition(dir.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(-1, 0));
                    this._player.rotation = -1.57079637;
                }
                if (JuiceboxEngine.Input.InputManager.Instance.KeyDown("d") || JuiceboxEngine.Input.InputManager.Instance.KeyDown("ArrowRight")) {
                    dir = JuiceboxEngine.Math.Vector2.op_Addition(dir.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(1, 0));
                    this._player.rotation = 1.57079637;
                }
                if (JuiceboxEngine.Input.InputManager.Instance.KeyDown("w") || JuiceboxEngine.Input.InputManager.Instance.KeyDown("ArrowUp")) {
                    dir = JuiceboxEngine.Math.Vector2.op_Addition(dir.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0, 1));
                    this._player.rotation = JuiceboxEngine.Math.JMath.PI;
                }
                if (JuiceboxEngine.Input.InputManager.Instance.KeyDown("s") || JuiceboxEngine.Input.InputManager.Instance.KeyDown("ArrowDown")) {
                    dir = JuiceboxEngine.Math.Vector2.op_Addition(dir.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0, -1));
                    this._player.rotation = 0;
                }

                if (JuiceboxEngine.Input.InputManager.Instance.InputIsTouch) {
                    if (JuiceboxEngine.Math.Vector2.op_Inequality(JuiceboxEngine.Input.InputManager.Instance.MousePosition.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(-1, -1))) {
                        var touch = this.DefaultCamera.ScreenPointToWorld(JuiceboxEngine.Input.InputManager.Instance.MousePosition.$clone());
                        dir = JuiceboxEngine.Math.Vector2.op_Subtraction(touch.$clone(), this._player.PlayerObj.Transform.Position2D.$clone());
                    }
                }

                if (JuiceboxEngine.Math.Vector2.op_Inequality(dir.$clone(), JuiceboxEngine.Math.Vector2.Zero.$clone())) {
                    if (this._msg != null) {
                        this.GUI.Root.RemoveChild(this._msg);
                        this._msg = null;
                    }

                    dir.Normalize();

                    if (this._allowMove) {
                        this._player.rotation = JuiceboxEngine.Math.JMath.ATan2(dir.X, -dir.Y);
                    }
                }

                if (this._allowMove) {
                    this._player.direction = dir.$clone();
                }

                this._player.Update();
            },
            PlayerExit: function () {
                if (this._hasExit) {
                    return;
                }

                var won = this.HasWon();

                if (won) {
                    LD47Game.Game.ReportFinishLevel(((LD47Game.Game.CurLevel + 1) | 0), LD47Game.Game.CurLives);
                    LD47Game.Game.Retries = 0;
                } else {
                    LD47Game.Game.ReportFinishLevel(LD47Game.Game.CurLevel, ((LD47Game.Game.CurLives - 1) | 0));
                    LD47Game.Game.Retries = (LD47Game.Game.Retries + 1) | 0;
                }

                this._hasExit = true;

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.CloseLevel());
            },
            ShowText: function (text) {
                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.ShowDialog(text));
            },
            GetTilePos: function (tilePos) {
                return new JuiceboxEngine.Math.Vector2.$ctor3(((40 + Bridge.Int.mul(tilePos.X, 16)) | 0), ((72 + Bridge.Int.mul(tilePos.Y, 16)) | 0));
            },
            ShowDialog: function (text) {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    panelText,
                    i,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    this._msg = new JuiceboxEngine.GUI.Panel(this.GUI.Root);
                                        this._msg.Color = new JuiceboxEngine.Math.Color.$ctor2(0, 0, 0, 200);
                                        this._msg.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                                        this._msg.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                                        this._msg.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(0, 0);

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, Bridge.fn.bind(this, function (x) {
                                            if (this._msg != null) {
                                                this._msg.Dimensions = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(300, 400), JuiceboxEngine.Math.Easings.ElasticEaseOut(x));
                                            }
                                        })));
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    if (this._msg != null) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 12;
                                        continue;
                                }
                                case 2: {
                                    panelText = new JuiceboxEngine.GUI.Text(this._msg);
                                        panelText.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(1, -1);
                                        panelText.Dimensions = JuiceboxEngine.Math.Vector2.op_Subtraction(this._msg.Dimensions.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(4, 4));
                                        panelText.DisplayText = "";
                                        panelText.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                                        panelText.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                                        panelText.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/Impact32.bff");

                                        i = 0;
                                        $step = 3;
                                        continue;
                                }
                                case 3: {
                                    if ( i < text.length ) {
                                            $step = 4;
                                            continue;
                                        }
                                    $step = 11;
                                    continue;
                                }
                                case 4: {
                                    panelText.DisplayText = (panelText.DisplayText || "") + String.fromCharCode(text.charCodeAt(i));

                                        if (text.charCodeAt(i) === 10) {
                                            $step = 5;
                                            continue;
                                        } else  {
                                            $step = 7;
                                            continue;
                                        }
                                }
                                case 5: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(0.4);
                                        $step = 6;
                                        return true;
                                }
                                case 6: {
                                    $step = 9;
                                    continue;
                                }
                                case 7: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(0.01);
                                        $step = 8;
                                        return true;
                                }
                                case 8: {
                                    $step = 9;
                                    continue;
                                }
                                case 9: {
                                    $step = 10;
                                    continue;
                                }
                                case 10: {
                                    i = (i + 1) | 0;
                                    $step = 3;
                                    continue;
                                }
                                case 11: {
                                    $step = 12;
                                    continue;
                                }
                                case 12: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            CloseLevel: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    panel,
                    startVolume,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    panel = new JuiceboxEngine.GUI.Panel(this.GUI.Root);
                                        panel.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(9001, 9001);
                                        panel.Color = new JuiceboxEngine.Math.Color.$ctor2(0, 0, 0, 0);
                                        panel.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                                        panel.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                                        startVolume = this._backgroundMusic.Volume;

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, Bridge.fn.bind(this, function (x) {
                                            panel.Color = new JuiceboxEngine.Math.Color.$ctor3(0, 0, 0, x);
                                            this._backgroundMusic.SetVolume(JuiceboxEngine.Math.JMath.Interpolate(startVolume, 0, x));
                                        })));
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    if (LD47Game.Game.CurLevel === 0) {
                                            JuiceboxEngine.SceneManager.SwitchToScene(new LD47Game.Level1(this.ResourceManager));
                                        } else {
                                            if (LD47Game.Game.CurLevel === 1) {
                                                JuiceboxEngine.SceneManager.SwitchToScene(new LD47Game.Level2(this.ResourceManager));
                                            } else {
                                                if (LD47Game.Game.CurLevel === 2) {
                                                    JuiceboxEngine.SceneManager.SwitchToScene(new LD47Game.Level3(this.ResourceManager));
                                                }
                                            }
                                        }

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            }
        }
    });

    Bridge.define("LD47Game.MainMenu", {
        inherits: [JuiceboxEngine.Scene],
        fields: {
            _tileMap: null,
            _backgroundMusic: null,
            _pressText: null,
            loading: false
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);
                this.loading = false;
            }
        },
        methods: {
            InitializeScene: function () {
                var bgmObj = this.AddGameObject$1("Music");
                this._backgroundMusic = bgmObj.AddComponent(JuiceboxEngine.Audio.AudioComponent);
                this._backgroundMusic.Loop(true);
                this._backgroundMusic.SetVolume(0.5);

                this._backgroundMusic.SetAudioClip(this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Music/rooms_80.mp3"));

                var tilemapObj = this.AddGameObject$1("Tilemap");

                tilemapObj.Transform.Position = new JuiceboxEngine.Math.Vector3.$ctor2(0, 0, -10.0);
                this._tileMap = tilemapObj.AddComponent(JuiceboxEngine.TileMap);
                this._tileMap.TileSize = LD47Game.Game.TILE_SIZE;
                this._tileMap.Sprites = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/MapSprites.png");
                this._tileMap.MapData = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/Lvl-Main.png", null));
                this._tileMap.MapData.Wrap = JuiceboxEngine.Graphics.Texture2D.WrapMode.Repeat;

                var panel = new JuiceboxEngine.GUI.Panel(this.GUI.Root);
                panel.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(9001, 9001);
                panel.Color = new JuiceboxEngine.Math.Color.$ctor3(0, 0, 0, 0.95);

                var title = new JuiceboxEngine.GUI.Image(this.GUI.Root);
                title.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/logo.png");
                title.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, 250);
                title.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                title.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                title.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, 150);

                this._pressText = new JuiceboxEngine.GUI.Image(this.GUI.Root);
                this._pressText.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._pressText.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._pressText.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(200, 50);
                this._pressText.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, JuiceboxEngine.Util.Browser.IsMobile() ? "Textures/tabAnywhere.png" : "Textures/pressAnyKey.png");

                var createdBy = new JuiceboxEngine.GUI.Image(this.GUI.Root);
                createdBy.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/CreatedBy.png");
                createdBy.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(100, 100);
                createdBy.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();
                createdBy.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();

                this.DefaultCamera.Zoom = 1.0;

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.OpenLevel());
            },
            PreUpdate: function () {
                this.DefaultCamera.Parent.Transform.Translate2D(new JuiceboxEngine.Math.Vector2.$ctor3(64 * JuiceboxEngine.Util.Time.DeltaTime, 0));
                this.DefaultCamera.Zoom = 0.3 - ((JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds * 0.1) + 1) / 2 * 0.1);

                this._pressText.Color = new JuiceboxEngine.Math.Color.$ctor3(1, 1, 1, JuiceboxEngine.Math.JMath.Abs(JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds)));

                if ((JuiceboxEngine.Input.InputManager.Instance.MouseKeyDown(JuiceboxEngine.Input.MouseKey.LeftMouse) || JuiceboxEngine.Input.InputManager.Instance.AnyKeyPressed) && !this.loading) {
                    this.loading = true;
                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.CloseLevel());
                }
            },
            OpenLevel: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    panel,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    panel = new JuiceboxEngine.GUI.Panel(this.GUI.Root);
                                        panel.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(9001, 9001);
                                        panel.Color = new JuiceboxEngine.Math.Color.$ctor2(0, 0, 0, 0);
                                        panel.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                                        panel.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.25, function (x) {
                                            panel.Color = new JuiceboxEngine.Math.Color.$ctor3(0, 0, 0, 1.0 - x);
                                        }));
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.GUI.Root.RemoveChild(panel);

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            CloseLevel: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    panel,
                    startVolume,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    panel = new JuiceboxEngine.GUI.Panel(this.GUI.Root);
                                        panel.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(9001, 9001);
                                        panel.Color = new JuiceboxEngine.Math.Color.$ctor2(0, 0, 0, 0);
                                        panel.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                                        panel.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                                        startVolume = this._backgroundMusic.Volume;

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, Bridge.fn.bind(this, function (x) {
                                            panel.Color = new JuiceboxEngine.Math.Color.$ctor3(0, 0, 0, x);
                                            this._backgroundMusic.SetVolume(JuiceboxEngine.Math.JMath.Interpolate(startVolume, 0, x));
                                        })));
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(1.0);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    JuiceboxEngine.SceneManager.FadeOutDuration = 0.0;
                                        JuiceboxEngine.SceneManager.SwitchToScene(new LD47Game.Level1(this.ResourceManager));

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            FinalizeScene: function () {

            },
            LateUpdate: function () {

            }
        }
    });

    Bridge.define("LD47Game.MainScene", {
        inherits: [JuiceboxEngine.Scene],
        ctors: {
            /**
             * Scene constructor.
             *
             * @instance
             * @public
             * @this LD47Game.MainScene
             * @memberof LD47Game.MainScene
             * @param   {JuiceboxEngine.Resources.ResourceManager}    manager    The default resource manager.
             * @return  {void}
             */
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);
            }
        },
        methods: {
            /**
             * Initialize the scene.
             *
             * @instance
             * @protected
             * @override
             * @this LD47Game.MainScene
             * @memberof LD47Game.MainScene
             * @return  {void}
             */
            InitializeScene: function () {
                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(34, 32, 52, 255);

            },
            /**
             * Pre update, called before rendering.
             *
             * @instance
             * @protected
             * @override
             * @this LD47Game.MainScene
             * @memberof LD47Game.MainScene
             * @return  {void}
             */
            PreUpdate: function () {

            },
            /**
             * Late update, called after rendering.
             *
             * @instance
             * @protected
             * @override
             * @this LD47Game.MainScene
             * @memberof LD47Game.MainScene
             * @return  {void}
             */
            LateUpdate: function () {

            },
            /**
             * Clean up before moving to other scene.
             *
             * @instance
             * @protected
             * @override
             * @this LD47Game.MainScene
             * @memberof LD47Game.MainScene
             * @return  {void}
             */
            FinalizeScene: function () {

            }
        }
    });

    Bridge.define("LD47Game.Player", {
        fields: {
            Pushing: false,
            _scene: null,
            PlayerObj: null,
            _playerBody: null,
            _playerHead: null,
            _bodySprite: null,
            _headSprite: null,
            direction: null,
            rotation: 0,
            _lerpRotation: 0,
            _blinkCounter: 0,
            _pushTime: 0,
            _playerPhysics: null,
            _isBoosted: false,
            _boostedDir: 0,
            runAnim: null,
            pushAnim: null
        },
        events: {
            OnExit: null
        },
        ctors: {
            init: function () {
                this.direction = new JuiceboxEngine.Math.Vector2();
                this.runAnim = System.Array.init([2, 3, 4, 4, 4, 3, 2, 1, 0, 0, 0, 1], System.Int32);
                this.pushAnim = System.Array.init([5, 6, 5, 7], System.Int32);
            },
            ctor: function (pos, scene, world) {
                this.$initialize();
                this._scene = scene;

                this.PlayerObj = this._scene.AddGameObject$1("Player");
                this.PlayerObj.Transform.Position2D = pos.$clone();
                this._playerPhysics = this.PlayerObj.AddComponent(JuiceboxEngine.PhysicsComponent);
                this._playerPhysics.SetWorld(world);
                this._playerPhysics.DrawBox = LD47Game.Game.DEBUG_HITBOXES;
                this._playerPhysics.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(-3, -3, 6, 6);

                this._playerBody = this._scene.AddGameObject$1("PlayerBody");
                this._bodySprite = this._playerBody.AddComponent(JuiceboxEngine.LayeredSprite);
                this._bodySprite.SetSlicedSprite(this._scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Player.png"), 16, 16, 8, 0.75, 0);
                this._bodySprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, -8);

                this._playerHead = this._scene.AddGameObject$1("PlayerHead");
                this._playerHead.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(0, 8 * this._bodySprite.LayerHeight);
                this._headSprite = this._playerHead.AddComponent(JuiceboxEngine.LayeredSprite);
                this._headSprite.SetSlicedSprite(this._scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/PlayerHead.png"), 16, 16, 8, 0.75, 0);
                this._headSprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, -8);
                this._headSprite.DepthOffset = 8 * this._bodySprite.LayerHeight;
            }
        },
        methods: {
            Update: function () {
                var $t;
                if (this._isBoosted) {
                    this.direction = JuiceboxEngine.Math.Vector2.Rotate(JuiceboxEngine.Math.Vector2.Down.$clone(), this._boostedDir);
                }

                this.direction = JuiceboxEngine.Math.Vector2.op_Multiply$1(this.direction.$clone(), 64 * JuiceboxEngine.Util.Time.DeltaTime);

                if (this.Pushing) {
                    this.direction = JuiceboxEngine.Math.Vector2.op_Division$1(this.direction.$clone(), 2);
                }

                var hits = this._playerPhysics.Translate(this.direction.$clone());

                $t = Bridge.getEnumerator(hits);
                try {
                    while ($t.moveNext()) {
                        var hit = $t.Current;
                        this._isBoosted = false;

                        if (System.String.equals(hit.Parent.Name, "Box")) {
                            var boxHits = hit.Translate(this.direction.$clone());
                            (Bridge.as(hit.Parent.UserData, LD47Game.InteractableBox)).lastTouched = JuiceboxEngine.Util.Time.TotalSeconds;

                            this.Pushing = true;
                            this._pushTime = JuiceboxEngine.Util.Time.TotalSeconds;
                        } else if (System.String.equals(hit.Parent.Name, "Button")) {
                            (Bridge.as(hit.Parent.UserData, LD47Game.InteractableButton)).Activate();
                        } else if (System.String.equals(hit.Parent.Name, "Door")) {
                            if ((Bridge.as(hit.Parent.UserData, LD47Game.InteractableDoor)).IsOpen) {
                                !Bridge.staticEquals(this.OnExit, null) ? this.OnExit() : null;
                            }
                        } else if (System.String.equals(hit.Parent.Name, "Booster")) {
                            var booster = (Bridge.as(hit.Parent.UserData, LD47Game.InteractableBooster));
                            this._isBoosted = true;

                            if (booster.Boosting) {
                                this._boostedDir = booster.Rotation;
                                this.PlayerObj.Transform.Position2D = booster.Position.$clone();
                                booster.DoBoost();
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                if (JuiceboxEngine.Util.Time.TotalSeconds - this._pushTime > 0.1) {
                    this.Pushing = false;
                }

                if (JuiceboxEngine.Math.Vector2.op_Inequality(this.direction.$clone(), JuiceboxEngine.Math.Vector2.Zero.$clone())) {
                    this._lerpRotation = this.AngleInterpolate(this._lerpRotation, this.rotation, JuiceboxEngine.Util.Time.DeltaTime * 20);

                    var speed = 20;

                    if (!this.Pushing) {
                        this._bodySprite.Row = this.runAnim[Bridge.Int.clip32((JuiceboxEngine.Util.Time.TotalSeconds * speed) % this.runAnim.length)];
                    } else {
                        speed = 10;
                        this._bodySprite.Row = this.pushAnim[Bridge.Int.clip32((JuiceboxEngine.Util.Time.TotalSeconds * speed) % this.pushAnim.length)];
                    }

                    this._playerBody.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(this.PlayerObj.Transform.Position2D.X, this.PlayerObj.Transform.Position2D.Y + 1 * JuiceboxEngine.Math.JMath.Abs(JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds * speed)));
                } else {
                    this._playerBody.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(this.PlayerObj.Transform.Position2D.X, this.PlayerObj.Transform.Position2D.Y);
                    this._bodySprite.Row = 2;
                }

                if (!this._isBoosted) {
                    this._bodySprite.Rotation = this._lerpRotation;
                } else {
                    this._bodySprite.Rotation += 25.1327419 * JuiceboxEngine.Util.Time.DeltaTime;
                }

                this._headSprite.Rotation = this._bodySprite.Rotation + JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds) * (0.3926991);

                this._playerHead.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(this._playerBody.Transform.Position2D.X, this._playerBody.Transform.Position2D.Y + 8 * this._bodySprite.LayerHeight);

                this._blinkCounter -= JuiceboxEngine.Util.Time.DeltaTime;
                if (this._blinkCounter < 0.0) {
                    if (this._headSprite.Row === 0) {
                        this._headSprite.Row = 1;
                        this._blinkCounter = 0.1;
                    } else {
                        this._headSprite.Row = 0;
                        this._blinkCounter = JuiceboxEngine.Util.Random.NextRange$1(1.0, 10.0);
                    }
                }
            },
            AngleInterpolate: function (a0, a1, t) {
                var max = 6.28318548;
                var da = (a1 - a0) % max;
                var sad = 2 * da % max - da;
                return a0 + sad * t;
            }
        }
    });

    Bridge.define("LD47Game.RoomDisplay", {
        inherits: [JuiceboxEngine.GUI.Panel],
        fields: {
            imgRoom: null,
            letterUp: null,
            letterDown: null,
            numberUp: null,
            numberDown: null,
            dash: null,
            hint: null,
            fromColor: null,
            toColor: null,
            showRoutine: null
        },
        events: {
            OnFinishUI: null
        },
        ctors: {
            init: function () {
                this.fromColor = new JuiceboxEngine.Math.Color();
                this.toColor = new JuiceboxEngine.Math.Color();
            },
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.Panel.ctor.call(this, parent);
                this.Dimensions = parent.Dimensions.$clone();
                this.Color = JuiceboxEngine.Math.Color.Black.$clone();

                this.dash = new JuiceboxEngine.GUI.Image(this);
                this.dash.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(128, 128);
                this.dash.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/dash.png");
                this.dash.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.dash.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                this.letterUp = new JuiceboxEngine.GUI.Image(this);
                this.letterUp.Position = new JuiceboxEngine.Math.Vector2.$ctor3(-128, 0);
                this.letterUp.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(128, 128);
                this.letterUp.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/A.png");
                this.letterUp.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.letterUp.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                this.letterDown = new JuiceboxEngine.GUI.Image(this.letterUp);
                this.letterDown.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, 0);
                this.letterDown.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(128, 128);
                this.letterDown.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/B.png");
                this.letterDown.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomLeft.$clone();
                this.letterDown.Anchor = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();

                this.numberUp = new JuiceboxEngine.GUI.Image(this);
                this.numberUp.Position = new JuiceboxEngine.Math.Vector2.$ctor3(128, 0);
                this.numberUp.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(128, 128);
                this.numberUp.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/4.png");
                this.numberUp.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.numberUp.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                this.numberDown = new JuiceboxEngine.GUI.Image(this.numberUp);
                this.numberDown.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, 0);
                this.numberDown.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(128, 128);
                this.numberDown.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/3.png");
                this.numberDown.Pivot = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                this.numberDown.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomLeft.$clone();

                var topPanel = new JuiceboxEngine.GUI.Panel(this);
                topPanel.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(512, 128);
                topPanel.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                topPanel.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                topPanel.Color = JuiceboxEngine.Math.Color.Black.$clone();
                topPanel.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, 128);

                var botPanel = new JuiceboxEngine.GUI.Panel(this);
                botPanel.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(512, 128);
                botPanel.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                botPanel.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                botPanel.Color = JuiceboxEngine.Math.Color.Black.$clone();
                botPanel.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -128);

                this.imgRoom = new JuiceboxEngine.GUI.Image(this);
                this.imgRoom.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, 200);
                this.imgRoom.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(128, 128);
                this.imgRoom.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/room.png");
                this.imgRoom.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.imgRoom.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                this.hint = new JuiceboxEngine.GUI.Image(this);
                this.hint.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, 250);
                this.hint.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.hint.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.hint.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/room{0}_hint.png", [((LD47Game.Game.CurLevel + 1) | 0)]));
                this.hint.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -200);
                this.hint.Color = new JuiceboxEngine.Math.Color.$ctor3(1, 1, 1, 0.0);
            }
        },
        methods: {
            AnimateTransition: function (fromLetter, toLetter, fromNumber, toNumber) {
                this.letterUp.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/{0}.png", [fromLetter]));
                this.letterDown.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/{0}.png", [toLetter]));

                this.numberUp.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/{0}.png", [fromNumber]));
                this.numberDown.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/{0}.png", [toNumber]));

                var playwin = !System.String.equals(fromLetter, toLetter) || (System.String.equals(fromLetter, toLetter) && System.String.equals(fromNumber, toNumber));

                var num = System.Int32.parse(fromNumber);
                var gameOverPer = (num / 9.0);
                this.fromColor = new JuiceboxEngine.Math.Color.$ctor3(1.0, gameOverPer, gameOverPer, 1.0);

                this.letterUp.Color = this.fromColor.$clone();
                this.letterDown.Color = this.fromColor.$clone();
                this.numberUp.Color = this.fromColor.$clone();
                this.numberDown.Color = this.fromColor.$clone();
                this.imgRoom.Color = this.fromColor.$clone();
                this.dash.Color = this.fromColor.$clone();
                this.hint.Color = new JuiceboxEngine.Math.Color.$ctor3(this.fromColor.R, this.fromColor.G, this.fromColor.B, this.hint.Color.A);

                num = System.Int32.parse(toNumber);
                gameOverPer = (num / 9.0);
                this.toColor = new JuiceboxEngine.Math.Color.$ctor3(1.0, gameOverPer, gameOverPer, 1.0);

                var clip;

                if (playwin) {
                    clip = this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Music/player_success.mp3");
                } else {
                    clip = this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Music/player_failure.mp3");
                }

                clip.SetGlobalVolume(0.8);
                clip.Play();

                this.showRoutine = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.AnimateLetter(!System.String.equals(fromLetter, toLetter), !System.String.equals(fromNumber, toNumber)));
            },
            Skip: function () {
                this.Parent.RemoveChild(this);
                JuiceboxEngine.Coroutines.CoroutineManager.StopCoroutine(this.showRoutine);
                !Bridge.staticEquals(this.OnFinishUI, null) ? this.OnFinishUI() : null;
            },
            AnimateLetter: function (letter, number) {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    children,
                    $t,
                    child,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(3.0);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForAllCoroutines.ctor([JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(3.0, Bridge.fn.bind(this, function (x) {
                                            if (letter) {
                                                this.letterUp.Position = new JuiceboxEngine.Math.Vector2.$ctor3(this.letterUp.Position.X, JuiceboxEngine.Math.Easings.CubicEaseOut(x) * -128);
                                            }
                                        }))), JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(3.0, Bridge.fn.bind(this, function (x) {
                                            if (number) {
                                                this.numberUp.Position = new JuiceboxEngine.Math.Vector2.$ctor3(this.numberUp.Position.X, JuiceboxEngine.Math.Easings.CubicEaseOut(x) * 128);
                                            }
                                        }))), JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, Bridge.fn.bind(this, function (x) {
                                            var newColor = new JuiceboxEngine.Math.Color.$ctor3(JuiceboxEngine.Math.JMath.Interpolate(this.fromColor.R, this.toColor.R, x), JuiceboxEngine.Math.JMath.Interpolate(this.fromColor.G, this.toColor.G, x), JuiceboxEngine.Math.JMath.Interpolate(this.fromColor.B, this.toColor.B, x), JuiceboxEngine.Math.JMath.Interpolate(this.fromColor.A, this.toColor.A, x));

                                            this.letterUp.Color = newColor.$clone();
                                            this.letterDown.Color = newColor.$clone();
                                            this.numberUp.Color = newColor.$clone();
                                            this.numberDown.Color = newColor.$clone();
                                            this.imgRoom.Color = newColor.$clone();
                                            this.dash.Color = newColor.$clone();
                                            this.hint.Color = new JuiceboxEngine.Math.Color.$ctor3(this.fromColor.R, this.fromColor.G, this.fromColor.B, this.hint.Color.A);
                                        }))), JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, Bridge.fn.bind(this, function (x) {
                                            if (LD47Game.Game.Retries > 1) {
                                                this.hint.Color = new JuiceboxEngine.Math.Color.$ctor3(this.hint.Color.R, this.hint.Color.G, this.hint.Color.B, x);
                                            }
                                        })))]);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(2.0);
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    if (LD47Game.Game.Retries > 1) {
                                            $step = 4;
                                            continue;
                                        } 
                                        $step = 6;
                                        continue;
                                }
                                case 4: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(2.0);
                                        $step = 5;
                                        return true;
                                }
                                case 5: {
                                    $step = 6;
                                    continue;
                                }
                                case 6: {
                                    children = this.Children.ToArray();

                                        $t = Bridge.getEnumerator(children);
                                        try {
                                            while ($t.moveNext()) {
                                                child = $t.Current;
                                                this.RemoveChild(child);
                                            }
                                        } finally {
                                            if (Bridge.is($t, System.IDisposable)) {
                                                $t.System$IDisposable$Dispose();
                                            }
                                        }

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, Bridge.fn.bind(this, function (x) {
                                            this.Color = new JuiceboxEngine.Math.Color.$ctor3(0, 0, 0, 1.0 - x);
                                        })));
                                        $step = 7;
                                        return true;
                                }
                                case 7: {
                                    !Bridge.staticEquals(this.OnFinishUI, null) ? this.OnFinishUI() : null;

                                        this.Parent.RemoveChild(this);

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            }
        }
    });

    Bridge.define("LD47Game.InteractableBooster", {
        inherits: [LD47Game.InteractableObject],
        fields: {
            Rotation: 0,
            Position: null,
            HasBoostedPlayer: false,
            Boosting: false,
            lastBoost: 0,
            _sprite: null
        },
        ctors: {
            init: function () {
                this.Position = new JuiceboxEngine.Math.Vector2();
            },
            ctor: function (pos, scene, world) {
                this.$initialize();
                LD47Game.InteractableObject.ctor.call(this, pos, scene, world);
                this.Position = pos.$clone();
                this.HasBoostedPlayer = false;
                this.Boosting = true;
            }
        },
        methods: {
            Update: function () {
                var baseRow = this.HasBoostedPlayer ? 22 : 14;

                if (this.Boosting) {
                    this._sprite.Row = (baseRow - Bridge.Int.clip32(((JuiceboxEngine.Util.Time.TotalSeconds * 30) % 8))) | 0;
                } else {
                    this._sprite.Row = (baseRow - Bridge.Int.clip32(((JuiceboxEngine.Util.Time.TotalSeconds * 60) % 8))) | 0;
                }

                if (JuiceboxEngine.Util.Time.TotalSeconds - this.lastBoost > 0.5) {
                    this.Boosting = true;
                }

                this._sprite.Rotation = this.Rotation;
            },
            DoBoost: function () {
                this.HasBoostedPlayer = true;
                this.Boosting = false;
                this.lastBoost = JuiceboxEngine.Util.Time.TotalSeconds;
            },
            DecorateGameObject: function () {
                this._sprite = this._obj.AddComponent(JuiceboxEngine.LayeredSprite);
                this._sprite.SetSlicedSprite(this._scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Box.png"), 16, 16, 8, 0.75, 7);
                this._sprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, -8);

                var physics = this._obj.AddComponent(JuiceboxEngine.PhysicsComponent);
                physics.SetWorld(this._world);
                physics.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(-3, -3, 6, 6);
                physics.DrawBox = LD47Game.Game.DEBUG_HITBOXES;
                physics.TriggerOnly = true;
            },
            GetName: function () {
                return "Booster";
            }
        }
    });

    Bridge.define("LD47Game.InteractableBox", {
        inherits: [LD47Game.InteractableObject],
        fields: {
            _physics: null,
            _sprite: null,
            LastButton: null,
            _startPos: null,
            lastTouched: 0,
            _touchingButton: false,
            reset: false
        },
        ctors: {
            init: function () {
                this._startPos = new JuiceboxEngine.Math.Vector2();
            },
            ctor: function (pos, scene, world, reset) {
                if (reset === void 0) { reset = false; }

                this.$initialize();
                LD47Game.InteractableObject.ctor.call(this, pos, scene, world);
                this.reset = reset;
                this._startPos = pos.$clone();
            }
        },
        methods: {
            Update: function () {
                var $t;
                var boxHits = this._physics.Translate(JuiceboxEngine.Math.Vector2.Zero.$clone());

                this._touchingButton = false;
                this._sprite.Enabled = true;

                if (this.reset && !this._touchingButton && JuiceboxEngine.Math.Vector2.op_Inequality(this._startPos.$clone(), this._obj.Transform.Position2D.$clone())) {
                    if (JuiceboxEngine.Util.Time.TotalSeconds - this.lastTouched > 5.0) {
                        this._sprite.Enabled = (JuiceboxEngine.Util.Time.TotalSeconds * 10 % 4) > 2;
                    }

                    if (JuiceboxEngine.Util.Time.TotalSeconds - this.lastTouched > 10.0) {
                        this.Reset();
                    }
                }

                $t = Bridge.getEnumerator(boxHits);
                try {
                    while ($t.moveNext()) {
                        var boxHit = $t.Current;
                        if (System.String.equals(boxHit.Parent.Name, "Button")) {
                            (Bridge.as(boxHit.Parent.UserData, LD47Game.InteractableButton)).Activate();
                            this.LastButton = Bridge.as(boxHit.Parent.UserData, LD47Game.InteractableButton);
                            this._touchingButton = true;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            Reset: function () {
                this._obj.RemoveComponent(JuiceboxEngine.PhysicsComponent);

                this._obj.Transform.Position2D = this._startPos.$clone();

                this._physics = this._obj.AddComponent(JuiceboxEngine.PhysicsComponent);
                this._physics.SetWorld(this._world);
                this._physics.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(-7, -7, 14, 14);
                this._physics.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                this._sprite.Enabled = true;
                this.lastTouched = JuiceboxEngine.Util.Time.TotalSeconds;
            },
            DecorateGameObject: function () {
                this._sprite = this._obj.AddComponent(JuiceboxEngine.LayeredSprite);
                this._sprite.SetSlicedSprite(this._scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Box.png"), 16, 16, 8, 0.75, 0);
                this._sprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, -8);
                this._sprite.Rotation = JuiceboxEngine.Util.Random.NextRange$1(-0.1, 0.1);

                this._physics = this._obj.AddComponent(JuiceboxEngine.PhysicsComponent);
                this._physics.SetWorld(this._world);
                this._physics.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(-7, -7, 14, 14);
                this._physics.DrawBox = LD47Game.Game.DEBUG_HITBOXES;
            },
            GetName: function () {
                return "Box";
            }
        }
    });

    Bridge.define("LD47Game.InteractableButton", {
        inherits: [LD47Game.InteractableObject],
        fields: {
            _sprite: null,
            Activated: false,
            _lastActivate: 0
        },
        events: {
            OnChange: null
        },
        ctors: {
            ctor: function (pos, scene, world) {
                this.$initialize();
                LD47Game.InteractableObject.ctor.call(this, pos, scene, world);
                this.Activated = false;
            }
        },
        methods: {
            DecorateGameObject: function () {
                this._sprite = this._obj.AddComponent(JuiceboxEngine.LayeredSprite);
                this._sprite.SetSlicedSprite(this._scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Box.png"), 16, 16, 3, 0.75, 1);
                this._sprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, -8);
                this._sprite.Rotation = JuiceboxEngine.Util.Random.NextRange$1(-0.1, 0.1);

                var physics = this._obj.AddComponent(JuiceboxEngine.PhysicsComponent);
                physics.SetWorld(this._world);
                physics.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(-8, -8, 16, 16);
                physics.DrawBox = LD47Game.Game.DEBUG_HITBOXES;
                physics.TriggerOnly = true;
            },
            Activate: function () {
                this._sprite.Row = 2;
                this._sprite.Layers = 2;

                if (!this.Activated) {
                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, Bridge.fn.bind(this, function (x) {
                        this._sprite.Size = JuiceboxEngine.Math.Vector2.op_Addition(new JuiceboxEngine.Math.Vector2.$ctor3(0.8, 0.8), JuiceboxEngine.Math.Vector2.op_Multiply$2(JuiceboxEngine.Math.Easings.BackEaseOut(x), new JuiceboxEngine.Math.Vector2.$ctor3(0.2, 0.2)));
                    })));

                    this.Activated = true;
                    !Bridge.staticEquals(this.OnChange, null) ? this.OnChange(true) : null;
                }

                this._lastActivate = JuiceboxEngine.Util.Time.TotalSeconds;
            },
            Deactivate: function () {
                this._sprite.Row = 1;
                this._sprite.Layers = 3;

                if (this.Activated) {
                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, Bridge.fn.bind(this, function (x) {
                        this._sprite.Size = JuiceboxEngine.Math.Vector2.op_Addition(new JuiceboxEngine.Math.Vector2.$ctor3(0.8, 0.8), JuiceboxEngine.Math.Vector2.op_Multiply$2(JuiceboxEngine.Math.Easings.BackEaseOut(x), new JuiceboxEngine.Math.Vector2.$ctor3(0.2, 0.2)));
                    })));

                    this.Activated = false;
                    !Bridge.staticEquals(this.OnChange, null) ? this.OnChange(false) : null;
                }
            },
            GetName: function () {
                return "Button";
            },
            Update: function () {
                if (this.Activated && JuiceboxEngine.Util.Time.TotalSeconds - this._lastActivate > 0.2) {
                    this.Deactivate();
                }
            }
        }
    });

    Bridge.define("LD47Game.InteractableDoor", {
        inherits: [LD47Game.InteractableObject],
        fields: {
            IsOpen: false
        },
        ctors: {
            ctor: function (pos, scene, world) {
                this.$initialize();
                LD47Game.InteractableObject.ctor.call(this, pos, scene, world);
            }
        },
        methods: {
            DecorateGameObject: function () {
                var sprite = this._obj.AddComponent(JuiceboxEngine.LayeredSprite);
                sprite.SetSlicedSprite(this._scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Box.png"), 16, 16, 16, 0.75, 3);
                sprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, -8);
                sprite.Size = new JuiceboxEngine.Math.Vector2.$ctor3(1.5, 1.5);

                var physics = this._obj.AddComponent(JuiceboxEngine.PhysicsComponent);
                physics.SetWorld(this._world);
                physics.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(-8, -8, 16, 4);
                physics.TriggerOnly = true;
                physics.DrawBox = LD47Game.Game.DEBUG_HITBOXES;
            },
            Open: function () {
                var sprite = this._obj.GetComponent(JuiceboxEngine.LayeredSprite);

                this.IsOpen = true;

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, function (x) {
                    sprite.Row = (6 - Bridge.Int.clip32((x * 3.0))) | 0;
                    sprite.Size = JuiceboxEngine.Math.Vector2.op_Addition(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5), (JuiceboxEngine.Math.Easings.BackEaseInOut(x))));
                }));
            },
            Close: function () {
                var sprite = this._obj.GetComponent(JuiceboxEngine.LayeredSprite);

                this.IsOpen = false;

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, function (x) {
                    sprite.Row = (3 + Bridge.Int.clip32((x * 3.0))) | 0;
                    sprite.Size = JuiceboxEngine.Math.Vector2.op_Addition(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5), (1.0 - JuiceboxEngine.Math.Easings.BackEaseInOut(x))));
                }));
            },
            GetName: function () {
                return "Door";
            },
            Update: function () {

            }
        }
    });

    Bridge.define("LD47Game.Level1", {
        inherits: [LD47Game.TTScene],
        fields: {
            button0: null,
            button1: null,
            box0: null,
            box1: null
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                LD47Game.TTScene.ctor.call(this, manager);

            }
        },
        methods: {
            InitializeScene: function () {
                LD47Game.TTScene.prototype.InitializeScene.call(this);

                this._tileMap.MapData = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/Lvl1-{0}.png", [((9 - LD47Game.Game.CurLives) | 0)]));

                this.button0 = new LD47Game.InteractableButton(new JuiceboxEngine.Math.Vector2.$ctor3(104, 110), this, this._physicsWorld);
                this.button1 = new LD47Game.InteractableButton(new JuiceboxEngine.Math.Vector2.$ctor3(168, 110), this, this._physicsWorld);

                this.button0.addOnChange(Bridge.fn.cacheBind(this, this.ButtonStateChanged));
                this.button1.addOnChange(Bridge.fn.cacheBind(this, this.ButtonStateChanged));

                this._interactables.add(this.button0);
                this._interactables.add(this.button1);

                this.box0 = new LD47Game.InteractableBox(new JuiceboxEngine.Math.Vector2.$ctor3(80, 120), this, this._physicsWorld);
                this.box1 = new LD47Game.InteractableBox(new JuiceboxEngine.Math.Vector2.$ctor3(170, 120), this, this._physicsWorld);

                this._interactables.add(this.box0);
                this._interactables.add(this.box1);

                this.entrance = new LD47Game.InteractableDoor(new JuiceboxEngine.Math.Vector2.$ctor3(72, 160), this, this._physicsWorld);
                this.exit = new LD47Game.InteractableDoor(new JuiceboxEngine.Math.Vector2.$ctor3(200, 160), this, this._physicsWorld);

                this._interactables.add(this.entrance);
                this._interactables.add(this.exit);

                this.exit.Close();

                var border = this.AddGameObject$1("Border");
                var borderComp;
                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, 300, 64);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 160, 300, 64);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 64, 32, 96);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(240, 64, 32, 96);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;
            },
            ButtonStateChanged: function (active) {
                if (this.button0.Activated && this.button1.Activated) {
                    if (!this.exit.IsOpen) {
                        this.exit.Open();
                    }
                } else {
                    if (this.exit.IsOpen) {
                        this.exit.Close();
                    }
                }
            },
            PreUpdate: function () {
                LD47Game.TTScene.prototype.PreUpdate.call(this);

            },
            FinalizeScene: function () {
                LD47Game.TTScene.prototype.FinalizeScene.call(this);
            },
            LateUpdate: function () {
                LD47Game.TTScene.prototype.LateUpdate.call(this);
            },
            HasWon: function () {
                return (Bridge.referenceEquals(this.box0.LastButton, this.button1) && Bridge.referenceEquals(this.box1.LastButton, this.button0)) || JuiceboxEngine.Input.InputManager.Instance.KeyDown("q");
            },
            Start$1: function () { }
        }
    });

    Bridge.define("LD47Game.Level2", {
        inherits: [LD47Game.TTScene],
        fields: {
            button: null,
            box: null,
            _boosters: null
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                LD47Game.TTScene.ctor.call(this, manager);
                this._boosters = new (System.Collections.Generic.List$1(LD47Game.InteractableBooster)).ctor();
            }
        },
        methods: {
            InitializeScene: function () {
                LD47Game.TTScene.prototype.InitializeScene.call(this);

                this._tileMap.MapData = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/Lvl2-{0}.png", [((9 - LD47Game.Game.CurLives) | 0)]));

                this.entrance = new LD47Game.InteractableDoor(new JuiceboxEngine.Math.Vector2.$ctor3(72, 160), this, this._physicsWorld);
                this.exit = new LD47Game.InteractableDoor(new JuiceboxEngine.Math.Vector2.$ctor3(296, 160), this, this._physicsWorld);

                this._interactables.add(this.entrance);
                this._interactables.add(this.exit);


                var up = 0;
                var down = JuiceboxEngine.Math.JMath.PI;
                var left = 1.57079637;
                var right = 4.712389;

                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(0, 4), down);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(0, 1), right);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(1, 4), left);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(2, 0), up);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(2, 2), right);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(4, 0), right);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(4, 2), up);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(4, 5), right);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(5, 3), left);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(7, 0), up);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(7, 3), right);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(8, 2), up);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(9, 0), left);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(9, 1), left);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(9, 3), down);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(10, 5), right);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(11, 0), left);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(11, 4), down);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(12, 3), left);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(13, 0), right);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(14, 5), down);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(15, 1), down);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(16, 2), up);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(17, 2), left);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(17, 4), left);
                this.AddBooster(new JuiceboxEngine.Math.Point.$ctor1(18, 3), up);

                this.button = new LD47Game.InteractableButton(new JuiceboxEngine.Math.Vector2.$ctor3(328, 152), this, this._physicsWorld);
                this.button.addOnChange(Bridge.fn.bind(this, function (on) {
                    if (on) {
                        if (!this.exit.IsOpen) {
                            this.exit.Open();
                        }
                    } else {
                        if (this.exit.IsOpen) {
                            this.exit.Close();
                        }
                    }
                }));

                this.box = new LD47Game.InteractableBox(new JuiceboxEngine.Math.Vector2.$ctor3(248, 120), this, this._physicsWorld, true);

                this._interactables.add(this.button);
                this._interactables.add(this.box);

                this.exit.Close();

                var border = this.AddGameObject$1("Border");
                var borderComp;
                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, 500, 64);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 160, 500, 64);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 64, 32, 96);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(336, 64, 32, 96);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(0, 5));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(1, 2));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(1, 3));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(3, 1));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(5, 2));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(5, 4));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(6, 2));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(7, 2));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(7, 4));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(7, 5));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(8, 5));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(10, 2));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(10, 3));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(12, 1));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(12, 2));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(12, 4));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(14, 1));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(14, 2));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(15, 3));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(15, 5));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(16, 1));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(17, 3));
                this.AddCollisionSquare(new JuiceboxEngine.Math.Point.$ctor1(17, 5));
            },
            AddCollisionSquare: function (tilePos) {
                var border = this.AddGameObject$1("Collider");
                var borderComp;
                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(((32 + Bridge.Int.mul(tilePos.X, 16)) | 0), ((64 + Bridge.Int.mul(tilePos.Y, 16)) | 0), 16, 16);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;
            },
            AddBooster: function (tilePos, rotation) {
                var booster = new LD47Game.InteractableBooster(new JuiceboxEngine.Math.Vector2.$ctor3(((40 + Bridge.Int.mul(tilePos.X, 16)) | 0), ((72 + Bridge.Int.mul(tilePos.Y, 16)) | 0)), this, this._physicsWorld);
                booster.Rotation = rotation;
                this._interactables.add(booster);
                this._boosters.add(booster);
            },
            PreUpdate: function () {
                LD47Game.TTScene.prototype.PreUpdate.call(this);
            },
            FinalizeScene: function () {
                LD47Game.TTScene.prototype.FinalizeScene.call(this);
            },
            LateUpdate: function () {
                LD47Game.TTScene.prototype.LateUpdate.call(this);
            },
            HasWon: function () {
                return !System.Linq.Enumerable.from(this._boosters, LD47Game.InteractableBooster).any(function (x) {
                        return !x.HasBoostedPlayer;
                    }) || JuiceboxEngine.Input.InputManager.Instance.KeyDown("q");
            },
            Start$1: function () { }
        }
    });

    Bridge.define("LD47Game.Level3", {
        inherits: [LD47Game.TTScene],
        fields: {
            button11: null,
            button12: null,
            button13: null,
            button21: null,
            button22: null,
            button23: null,
            button31: null,
            button32: null,
            button33: null,
            screenSprite0: null,
            screenSprite1: null,
            screenSprite2: null,
            firstSolution: false,
            isSolved: false,
            timeSolved: 0
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                LD47Game.TTScene.ctor.call(this, manager);
                this.firstSolution = true;
                this.isSolved = false;
            }
        },
        methods: {
            InitializeScene: function () {
                LD47Game.TTScene.prototype.InitializeScene.call(this);

                this._tileMap.MapData = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/Lvl1-{0}.png", [((9 - LD47Game.Game.CurLives) | 0)]));

                this.entrance = new LD47Game.InteractableDoor(new JuiceboxEngine.Math.Vector2.$ctor3(72, 160), this, this._physicsWorld);
                this.exit = new LD47Game.InteractableDoor(new JuiceboxEngine.Math.Vector2.$ctor3(200, 160), this, this._physicsWorld);

                this._interactables.add(this.entrance);
                this._interactables.add(this.exit);

                this.exit.Close();

                var box0 = new LD47Game.InteractableBox(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(1, 1)), this, this._physicsWorld);
                var box1 = new LD47Game.InteractableBox(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(1, 2)), this, this._physicsWorld);
                var box2 = new LD47Game.InteractableBox(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(1, 3)), this, this._physicsWorld);
                var box3 = new LD47Game.InteractableBox(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(11, 1)), this, this._physicsWorld);
                var box4 = new LD47Game.InteractableBox(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(11, 2)), this, this._physicsWorld);
                var box5 = new LD47Game.InteractableBox(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(11, 3)), this, this._physicsWorld);

                this._interactables.add(box0);
                this._interactables.add(box1);
                this._interactables.add(box2);
                this._interactables.add(box3);
                this._interactables.add(box4);
                this._interactables.add(box5);

                this.button21 = new LD47Game.InteractableButton(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(6, 4)), this, this._physicsWorld);
                this.button22 = new LD47Game.InteractableButton(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(6, 2)), this, this._physicsWorld);
                this.button23 = new LD47Game.InteractableButton(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(6, 0)), this, this._physicsWorld);
                this.button11 = new LD47Game.InteractableButton(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(4, 4)), this, this._physicsWorld);
                this.button12 = new LD47Game.InteractableButton(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(4, 2)), this, this._physicsWorld);
                this.button13 = new LD47Game.InteractableButton(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(4, 0)), this, this._physicsWorld);
                this.button31 = new LD47Game.InteractableButton(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(8, 4)), this, this._physicsWorld);
                this.button32 = new LD47Game.InteractableButton(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(8, 2)), this, this._physicsWorld);
                this.button33 = new LD47Game.InteractableButton(this.GetTilePos(new JuiceboxEngine.Math.Point.$ctor1(8, 0)), this, this._physicsWorld);

                this.button11.addOnChange(Bridge.fn.cacheBind(this, this.ButtonChange));
                this.button12.addOnChange(Bridge.fn.cacheBind(this, this.ButtonChange));
                this.button13.addOnChange(Bridge.fn.cacheBind(this, this.ButtonChange));
                this.button21.addOnChange(Bridge.fn.cacheBind(this, this.ButtonChange));
                this.button22.addOnChange(Bridge.fn.cacheBind(this, this.ButtonChange));
                this.button23.addOnChange(Bridge.fn.cacheBind(this, this.ButtonChange));
                this.button31.addOnChange(Bridge.fn.cacheBind(this, this.ButtonChange));
                this.button32.addOnChange(Bridge.fn.cacheBind(this, this.ButtonChange));
                this.button33.addOnChange(Bridge.fn.cacheBind(this, this.ButtonChange));

                this._interactables.add(this.button11);
                this._interactables.add(this.button12);
                this._interactables.add(this.button13);
                this._interactables.add(this.button21);
                this._interactables.add(this.button22);
                this._interactables.add(this.button23);
                this._interactables.add(this.button31);
                this._interactables.add(this.button32);
                this._interactables.add(this.button33);

                var screen0 = this.AddGameObject$1("Screens");
                screen0.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(106, 183);
                this.screenSprite0 = screen0.AddComponent(JuiceboxEngine.LayeredSprite);
                this.screenSprite0.SetSlicedSprite(this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Box.png"), 16, 16, 16, 0.75, 24);
                this.screenSprite0.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, 0);
                this.screenSprite0.Rotation = JuiceboxEngine.Util.Random.NextRange$1(-0.1, 0.1);

                var screen1 = this.AddGameObject$1("Screens");
                screen1.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(138, 183);
                this.screenSprite1 = screen1.AddComponent(JuiceboxEngine.LayeredSprite);
                this.screenSprite1.SetSlicedSprite(this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Box.png"), 16, 16, 16, 0.75, 24);
                this.screenSprite1.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, 0);
                this.screenSprite1.Rotation = JuiceboxEngine.Util.Random.NextRange$1(-0.1, 0.1);

                var screen2 = this.AddGameObject$1("Screens");
                screen2.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(170, 183);
                this.screenSprite2 = screen2.AddComponent(JuiceboxEngine.LayeredSprite);
                this.screenSprite2.SetSlicedSprite(this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Box.png"), 16, 16, 16, 0.75, 24);
                this.screenSprite2.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, 0);
                this.screenSprite2.Rotation = JuiceboxEngine.Util.Random.NextRange$1(-0.1, 0.1);

                var border = this.AddGameObject$1("Border");
                var borderComp;
                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, 300, 64);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 160, 300, 64);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 64, 32, 96);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;

                borderComp = border.AddComponent(JuiceboxEngine.PhysicsComponent);
                borderComp.SetWorld(this._physicsWorld);
                borderComp.AABB = new JuiceboxEngine.Math.Rectangle.$ctor2(240, 64, 32, 96);
                borderComp.DrawBox = LD47Game.Game.DEBUG_HITBOXES;
            },
            ButtonChange: function (active) {

            },
            PreUpdate: function () {
                LD47Game.TTScene.prototype.PreUpdate.call(this);

                var first;
                var second;
                var third;

                if (this.firstSolution || JuiceboxEngine.Util.Time.TotalSeconds - this.timeSolved < 2.0) {
                    first = this.button11.Activated || this.button13.Activated;
                    second = this.button11.Activated && (this.button21.Activated && this.button22.Activated && this.button23.Activated);
                    third = (this.button11.Activated || this.button12.Activated) && this.button31.Activated;
                } else {
                    first = this.button11.Activated && this.button12.Activated && this.button13.Activated;
                    second = this.button21.Activated || this.button22.Activated || this.button23.Activated || this.button32.Activated;
                    third = this.button22.Activated && this.button31.Activated && this.button33.Activated;
                }

                this.screenSprite0.Row = first ? 23 : 24;
                this.screenSprite1.Row = second ? 23 : 24;
                this.screenSprite2.Row = third ? 23 : 24;

                this.isSolved = first && second && third;

                if (this.isSolved) {
                    if (!this.exit.IsOpen) {
                        this.firstSolution = false;
                        this.timeSolved = JuiceboxEngine.Util.Time.TotalSeconds;
                        this.exit.Open();
                        this.ButtonChange(true);
                    }
                }
            },
            FinalizeScene: function () {
                LD47Game.TTScene.prototype.FinalizeScene.call(this);
            },
            LateUpdate: function () {
                LD47Game.TTScene.prototype.LateUpdate.call(this);
            },
            HasWon: function () {
                return this.isSolved && !this.firstSolution;
            },
            Start$1: function () { }
        }
    });
});
