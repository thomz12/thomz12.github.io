/**
 * @compiler H5 0.0.15365
 */
H5.assemblyVersion("LD48","1.0.0.0");
H5.assembly("LD48", function ($asm, globals) {
    "use strict";

    H5.define("LD48.Extensions", {
        statics: {
            methods: {
                KiloFormat: function (num) {
                    if (num.gte(System.UInt64(100000000))) {
                        return (num.div(System.UInt64(1000000))).toString("#,0M");
                    }

                    if (num.gte(System.UInt64(10000000))) {
                        return ((num.div(System.UInt64(1000000))).toString("0.#") || "") + "M";
                    }

                    if (num.gte(System.UInt64(100000))) {
                        return (num.div(System.UInt64(1000))).toString("#,0K");
                    }

                    if (num.gte(System.UInt64(10000))) {
                        return ((num.div(System.UInt64(1000))).toString("0.#") || "") + "K";
                    }

                    return num.toString("#,0");
                }
            }
        }
    });

    H5.define("LD48.FixedCharge", {
        fields: {
            id: 0,
            desc: null,
            name: null,
            price: System.UInt64(0),
            unlockPrice: System.UInt64(0),
            debtPerSecond: System.UInt64(0),
            owned: System.UInt64(0)
        }
    });

    H5.define("LD48.MainMenu", {
        inherits: [JuiceboxEngine.Scene],
        statics: {
            fields: {
                BPM: 0
            },
            ctors: {
                init: function () {
                    this.BPM = 132;
                }
            }
        },
        fields: {
            _defaultZoom: 0,
            _title: null,
            _start: null,
            _background: null,
            _leaderboardText: null,
            _audio: null,
            _loginID: null,
            _lowestScroll: 0
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);
                JuiceboxEngine.Graphics.GraphicsManager.Instance.addOnResize(H5.fn.bind(this, function (x, y) {
                    this.ScaleGame();
                }));
            }
        },
        methods: {
            ScaleGame: function () {
                if (JuiceboxEngine.Util.Browser.IsMobile()) {
                    this._defaultZoom = 1;
                    return;
                }

                this._defaultZoom = JuiceboxEngine.Graphics.GraphicsManager.Instance.Height < 1000 ? 1 : 2;
                this.DefaultCamera.Zoom = this._defaultZoom;
            },
            Login: function () {
                this._loginID = JuiceboxEngine.Util.LocalStorage.GetValue("login_id");

                if (this._loginID == null) {
                    this._loginID = System.Guid.NewGuid().toString();

                    System.Console.WriteLine("Registering with Playfab...");
                    JuiceboxEngine.Playfab.PlayfabManager.Identity.LoginWithCustomID(this._loginID, true);
                } else {
                    System.Console.WriteLine("Logging in with Playfab...");
                    JuiceboxEngine.Playfab.PlayfabManager.Identity.LoginWithCustomID(this._loginID, false);
                }
                JuiceboxEngine.Playfab.PlayfabManager.Identity.LoginTask.addOnTaskCompleted(H5.fn.cacheBind(this, this.LoginFinished));
            },
            LoginFinished: function (task) {
                if (task.Success) {
                    JuiceboxEngine.Util.LocalStorage.StoreValue("login_id", this._loginID);
                    System.Console.WriteLine(System.String.format("Logged in with Playfab! {0}", [JuiceboxEngine.Playfab.PlayfabManager.Identity.Username]));
                } else {
                    System.Console.WriteLine("Failed to log in with Playfab.");
                }

                this.ShowLeaderboard();
            },
            InitializeScene: function () {
                this.Login();
                this.ScaleGame();

                this._background = this.AddGameObject$1("Background");
                var map = this._background.AddComponent(JuiceboxEngine.TileMap);
                map.TileSize = 16;
                map.MapData = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/backgroundData.png");
                map.MapData.Wrap = JuiceboxEngine.Graphics.Texture2D.WrapMode.Repeat;
                map.Sprites = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/background.png");

                this._audio = this._background.AddComponent(JuiceboxEngine.Audio.AudioComponent);
                this._audio.SetAudioClip(this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Sounds/menu.mp3"));
                this._audio.Play();
                this._audio.Loop(true);

                this._title = this.AddGameObject$1("Title");
                this._title.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(0, 64);
                var titleSprite = this._title.AddComponent(JuiceboxEngine.Sprite);
                titleSprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Title.png");
                titleSprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(((H5.Int.div(((-titleSprite.Texture.Width) | 0), 2)) | 0), ((H5.Int.div(((-titleSprite.Texture.Height) | 0), 2)) | 0));
                titleSprite.Size = new JuiceboxEngine.Math.Vector2.$ctor3(2, 2);

                this._leaderboardText = this.AddGameObject().AddComponent(JuiceboxEngine.TextComponent);
                this._leaderboardText.Alignment = JuiceboxEngine.GUI.TextAlignment.Center;
                this._leaderboardText.DisplayText = "Loading leaderboard...";
                this._leaderboardText.Color = JuiceboxEngine.Math.Color.Black.$clone();

                this._leaderboardText.Parent.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(0, -48);

                var startelement = new JuiceboxEngine.GUI.EmptyUIElement.ctor(this.GUI.Root);
                startelement.Dimensions = JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(80, 20), this._defaultZoom), 2);
                startelement.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                startelement.addOnMouseEnter(H5.fn.bind(this, function (ev) {
                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, H5.fn.bind(this, function (x) {
                        this._start.GetComponent(JuiceboxEngine.Sprite).Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.Easings.CircularEaseOut(x) / 4.0));
                    })));
                }));

                startelement.addOnMouseExit(H5.fn.bind(this, function (ev) {
                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, H5.fn.bind(this, function (x) {
                        this._start.GetComponent(JuiceboxEngine.Sprite).Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.Easings.QuadraticEaseOut(1.0 - x) / 4.0));
                    })));
                }));

                startelement.addOnMouseUp(H5.fn.bind(this, function (x) {
                    if (JuiceboxEngine.Playfab.PlayfabManager.Identity.Username == null) {
                        var username = JuiceboxEngine.Util.Browser.Prompt("Leaderboard user name:", System.String.format("Guest #{0}", [JuiceboxEngine.Util.Random.NextRange(0, 999999)]));

                        if (username == null) {
                            this.SceneManager.SwitchToScene(new LD48.MainScene(this.ResourceManager));
                        }

                        var task = JuiceboxEngine.Playfab.PlayfabManager.Identity.UpdateDisplayName(username);
                        task.addOnTaskCompleted(H5.fn.cacheBind(this, this.UpdateUsername));
                    } else {
                        this.SceneManager.SwitchToScene(new LD48.MainScene(this.ResourceManager));
                    }
                }));

                this._start = this.AddGameObject$1("Start");
                this._start.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(0, 0);

                this._start.AddComponent(JuiceboxEngine.UIComponent).Setup(startelement, this);

                var startSprite = this._start.AddComponent(JuiceboxEngine.Sprite);
                startSprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/buttons.png");
                startSprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, 128, 20);
                startSprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-35, -9);
            },
            ShowLeaderboard: function () {
                var task = JuiceboxEngine.Playfab.PlayfabManager.Leaderboard.GetLeaderboard("Highscore", 0, 100);

                task.addOnTaskCompleted(H5.fn.bind(this, function (lbTask) {
                    if (lbTask.Success) {
                        this._leaderboardText.DisplayText = "Deepest in debt:";

                        var leaderboardTask = H5.cast(lbTask, JuiceboxEngine.Playfab.PlayfabTaskLeaderboard);
                        var leaderboard = leaderboardTask.Leaderboard;

                        var entries = System.Array.init(leaderboard.Entries.Count, null, JuiceboxEngine.GameObject);

                        for (var i = 0; i < leaderboard.Entries.Count; i = (i + 1) | 0) {
                            var entry = leaderboard.Entries.getItem(i).$clone();

                            var lbEntryObj = this.AddGameObject$1(System.String.format("Entry{0}", [i]));
                            entries[i] = lbEntryObj;

                            lbEntryObj.Transform.Position = new JuiceboxEngine.Math.Vector3.$ctor2(0, H5.Int.mul(-20, i), -1.0);

                            this._lowestScroll = H5.Int.mul(-20, i);

                            var entrySprite = lbEntryObj.AddComponent(JuiceboxEngine.Sprite);
                            entrySprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/buttons.png");

                            entrySprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 40, 128, 18);
                            entrySprite.Priority = 0.1;

                            if (i === 0) {
                                entrySprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 58, 128, 18);
                            } else {
                                if (i === 1) {
                                    entrySprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 76, 128, 18);
                                } else {
                                    if (i === 2) {
                                        entrySprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 94, 128, 18);
                                    }
                                }
                            }

                            entrySprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(((H5.Int.div(((-entrySprite.Texture.Width) | 0), 2)) | 0), ((H5.Int.div(((-entrySprite.Texture.Height) | 0), 2)) | 0));

                            var text = lbEntryObj.AddComponent(JuiceboxEngine.TextComponent);
                            text.Alignment = JuiceboxEngine.GUI.TextAlignment.Left;
                            text.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-62, -64);

                            var name = entry.displayName;
                            if (name != null && name.length > 12) {
                                name = name.substr(0, 10);
                                name = (name || "") + "..";
                            }

                            text.DisplayText = System.String.format("{0}. {1} - {2}", entry.position, name, System.Int32.format(entry.value, "#,##"));
                            text.Color = JuiceboxEngine.Math.Color.Black.$clone();
                        }

                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.LinearRepeat(1.0, function (x) {
                            for (var i1 = 0; i1 < entries.length; i1 = (i1 + 1) | 0) {
                                entries[i1].Transform.Rotation2D = JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds + i1) * (0.049087387);
                            }
                        }));
                    } else {
                        this._leaderboardText.DisplayText = "Can't load leaderboard.";
                        System.Console.WriteLine("Failed to get leaderboards... :(");
                    }
                }));
            },
            PreUpdate: function () {
                this._background.Transform.Translate2D(JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(-16, -16), JuiceboxEngine.Util.Time.DeltaTime), this._defaultZoom));

                if (JuiceboxEngine.Input.InputManager.Instance.MouseKeyHeld(JuiceboxEngine.Input.MouseKey.LeftMouse)) {
                    this.DefaultCamera.Parent.Transform.Translate2D(JuiceboxEngine.Math.Vector2.op_Division$1(JuiceboxEngine.Math.Vector2.op_Division$1((JuiceboxEngine.Math.Vector2.op_Multiply(JuiceboxEngine.Input.InputManager.Instance.MouseDelta.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0, JuiceboxEngine.Graphics.GraphicsManager.Instance.Height))), this.DefaultCamera.Zoom), JuiceboxEngine.Util.Config.ConfigValues.PixelSize));

                    this._audio.Play();
                    this._audio.Loop(true);
                }

                this.DefaultCamera.Zoom = this._defaultZoom + JuiceboxEngine.Math.JMath.Clamp$1(JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds * JuiceboxEngine.Math.JMath.TWO_PI * (2)), 0, 1) * 0.025;

                if (this.DefaultCamera.Parent.Transform.Position2D.Y > 0) {
                    this.DefaultCamera.Parent.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(this.DefaultCamera.Parent.Transform.Position2D.X, 0);
                }

                if (this.DefaultCamera.Parent.Transform.Position2D.Y < this._lowestScroll) {
                    this.DefaultCamera.Parent.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(this.DefaultCamera.Parent.Transform.Position2D.X, this._lowestScroll);
                }

                this._title.Transform.Rotation2D = JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds) * (0.09817477);
                this._start.Transform.Rotation2D = JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds + 1) * (0.09817477);
            },
            UpdateUsername: function (task) {
                if (task.Success) {
                    this.SceneManager.SwitchToScene(new LD48.MainScene(this.ResourceManager));
                } else {
                    var username = JuiceboxEngine.Util.Browser.Prompt("Something went wrong. " + (task.ErrorMessage || ""), System.String.format("Guest #{0}", [JuiceboxEngine.Util.Random.NextRange(0, 999999)]));

                    if (username == null) {
                        this.SceneManager.SwitchToScene(new LD48.MainScene(this.ResourceManager));
                        return;
                    }

                    var newTask = JuiceboxEngine.Playfab.PlayfabManager.Identity.UpdateDisplayName(username);
                    newTask.addOnTaskCompleted(H5.fn.cacheBind(this, this.UpdateUsername));
                }
            },
            LateUpdate: function () {

            },
            FinalizeScene: function () {

            }
        }
    });

    H5.define("LD48.MainScene", {
        inherits: [JuiceboxEngine.Scene],
        statics: {
            fields: {
                BPM: 0,
                GAME_TIME: 0,
                KICK_IN_BPM_EFFECT: 0,
                MAX_WEBSITES: 0
            },
            ctors: {
                init: function () {
                    this.BPM = 132;
                    this.GAME_TIME = 160;
                    this.KICK_IN_BPM_EFFECT = 14.5;
                    this.MAX_WEBSITES = 6;
                }
            }
        },
        fields: {
            _background: null,
            _website: null,
            _debtCounter: null,
            _debtPerSecondCounter: null,
            _popup: null,
            _timer: null,
            _exit: null,
            _websiteSprite: null,
            _debtText: null,
            _debtTextShadow: null,
            _debtPerSecondText: null,
            _debtPerSecondTextShadow: null,
            _timerText: null,
            _websiteParticles: null,
            _fixedCharges: null,
            debt: System.UInt64(0),
            debtPerSecond: System.UInt64(0),
            _shownDebt: System.UInt64(0),
            _debtTimer: 0,
            _timeLeft: 0,
            _fps: null,
            _defaultZoom: 0,
            _popupEnabledThisFrame: false,
            _finished: false,
            _lowestScroll: 0,
            FixedCharges: null,
            _fixedChargesGenerated: null
        },
        ctors: {
            init: function () {
                var $t;
                this.FixedCharges = System.Array.init([($t = new LD48.FixedCharge(), $t.id = 0, $t.name = "Food", $t.price = System.UInt64(10), $t.debtPerSecond = System.UInt64(1), $t.desc = "I'm getting hungry.", $t.unlockPrice = System.UInt64(10), $t), ($t = new LD48.FixedCharge(), $t.id = 1, $t.name = "Phone", $t.price = System.UInt64(97), $t.debtPerSecond = System.UInt64(11), $t.desc = "Call me maybe.", $t.unlockPrice = System.UInt64(50), $t), ($t = new LD48.FixedCharge(), $t.id = 2, $t.name = "Utilities", $t.price = System.UInt64(890), $t.debtPerSecond = System.UInt64(150), $t.desc = "Unlimited power!", $t.unlockPrice = System.UInt64(97), $t), ($t = new LD48.FixedCharge(), $t.id = 3, $t.name = "Car loan", $t.price = System.UInt64(13059), $t.debtPerSecond = System.UInt64(2000), $t.desc = "Money goes vrooom.", $t.unlockPrice = System.UInt64(890), $t), ($t = new LD48.FixedCharge(), $t.id = 4, $t.name = "Mortgage", $t.price = System.UInt64(147923), $t.debtPerSecond = System.UInt64(12000), $t.desc = "Sign here, here, here!", $t.unlockPrice = System.UInt64(13059), $t)], LD48.FixedCharge);
            },
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);
                this.debt = System.UInt64(0);
                this.debtPerSecond = System.UInt64(0);
                this._timeLeft = LD48.MainScene.GAME_TIME;
                this._finished = false;

                JuiceboxEngine.Graphics.GraphicsManager.Instance.addOnResize(H5.fn.bind(this, function (x, y) {
                    this.ScaleGame();
                }));
            }
        },
        methods: {
            ScaleGame: function () {
                if (JuiceboxEngine.Util.Browser.IsMobile()) {
                    this._defaultZoom = 1;
                    return;
                }

                this._defaultZoom = JuiceboxEngine.Graphics.GraphicsManager.Instance.Height < 1000 ? 1 : 2;
                this.DefaultCamera.Zoom = this._defaultZoom;
            },
            InitializeScene: function () {
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(true);

                this._fps = new JuiceboxEngine.GUI.Text(this.GUI.Root);
                this._fps.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(10000, 16);

                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(63, 136, 197, 255);
                this.DefaultCamera.Parent.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(0, -46);

                this.ScaleGame();

                this._background = this.AddGameObject$1("Background");
                var map = this._background.AddComponent(JuiceboxEngine.TileMap);
                map.TileSize = 16;
                map.MapData = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/backgroundData.png");
                map.MapData.Wrap = JuiceboxEngine.Graphics.Texture2D.WrapMode.Repeat;
                map.Sprites = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/background.png");

                var music = this._background.AddComponent(JuiceboxEngine.Audio.AudioComponent);
                music.SetAudioClip(this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Sounds/main.mp3"));
                music.Play();

                this._website = this.AddGameObject$1("website");
                this._websiteSprite = this._website.AddComponent(JuiceboxEngine.Sprite);
                this._websiteSprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Website0.png");
                this._websiteSprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(((H5.Int.div(((-this._websiteSprite.Texture.Width) | 0), 2)) | 0), ((H5.Int.div(((-this._websiteSprite.Texture.Height) | 0), 2)) | 0));
                this._websiteSprite.Priority = 0.1;

                var websiteHit = new JuiceboxEngine.GUI.EmptyUIElement.ctor(this.GUI.Root);
                websiteHit.Dimensions = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(200, 200), this.DefaultCamera.Zoom);
                websiteHit.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                websiteHit.addOnMouseUp(H5.fn.cacheBind(this, this.WebsiteClick));
                websiteHit.addOnMouseEnter(H5.fn.cacheBind(this, this.WebsiteEnter));
                websiteHit.addOnMouseExit(H5.fn.cacheBind(this, this.WebsiteExit));

                var webAudio = this._website.AddComponent(JuiceboxEngine.Audio.AudioComponent);
                webAudio.SetAudioClip(this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Sounds/buy.mp3"));

                var websiteUI = this._website.AddComponent(JuiceboxEngine.UIComponent);
                websiteUI.Setup(websiteHit, this);

                var buyParticles = this.AddGameObject$1("Particles");
                this._websiteParticles = buyParticles.AddComponent(JuiceboxEngine.Particles.BurstParticleComponent);
                this._websiteParticles.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Dollar.png");
                this._websiteParticles.Gravity = new JuiceboxEngine.Math.Vector2.$ctor3(0, 5);
                this._websiteParticles.BurstAmount = 5;

                this._websiteParticles.addOnRequestParticle(function () {
                    var particle = new JuiceboxEngine.Particles.Particle();
                    particle.particleFrames = 1;
                    particle.sourceRectangles = System.Array.init([new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, 8, 8)], JuiceboxEngine.Math.Rectangle);

                    particle.velocity = new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Util.Random.NextRange$1(-1.0, 1.0), JuiceboxEngine.Util.Random.NextRange$1(-0.5, -1.0));
                    particle.color = JuiceboxEngine.Math.Color.White.$clone();
                    particle.lifeTime = JuiceboxEngine.Util.Random.NextRange$1(0.25, 1.0);
                    particle.totalLifeTime = particle.lifeTime;
                    particle.size = new JuiceboxEngine.Math.Vector2.$ctor3(1, 1);

                    return particle;
                });

                this._websiteParticles.addOnParticleUpdate(function (particle) {
                    particle.size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(2, 2), (particle.lifeTime / particle.totalLifeTime));
                });

                this._debtCounter = this.AddGameObject$1("Debt counter");
                this._debtCounter.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(0, 54);

                this._debtText = this._debtCounter.AddComponent(JuiceboxEngine.TextComponent);
                this._debtText.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/8-bit.bff");
                this._debtText.DisplayText = this.GetDisplayString(this.debt);
                this._debtText.Alignment = JuiceboxEngine.GUI.TextAlignment.Center;

                this._debtTextShadow = this._debtCounter.AddComponent(JuiceboxEngine.TextComponent);
                this._debtTextShadow.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/8-bit.bff");
                this._debtTextShadow.Color = JuiceboxEngine.Math.Color.Black.$clone();
                this._debtTextShadow.Alignment = JuiceboxEngine.GUI.TextAlignment.Center;
                this._debtTextShadow.DisplayText = this._debtText.DisplayText;
                this._debtTextShadow.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(2, -2);

                this._debtPerSecondCounter = this.AddGameObject$1("DPS counter");
                this._debtPerSecondCounter.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(0, 47);
                this._debtPerSecondText = this._debtPerSecondCounter.AddComponent(JuiceboxEngine.TextComponent);
                this._debtPerSecondText.DisplayText = this.GetDisplayString(this.debt);
                this._debtPerSecondText.Alignment = JuiceboxEngine.GUI.TextAlignment.Center;

                this._debtPerSecondTextShadow = this._debtPerSecondCounter.AddComponent(JuiceboxEngine.TextComponent);
                this._debtPerSecondTextShadow.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(1, -1);
                this._debtPerSecondTextShadow.Color = JuiceboxEngine.Math.Color.Black.$clone();
                this._debtPerSecondTextShadow.DisplayText = this._debtPerSecondText.DisplayText;
                this._debtPerSecondTextShadow.Alignment = JuiceboxEngine.GUI.TextAlignment.Center;

                this._fixedCharges = System.Array.init(this.FixedCharges.length, null, JuiceboxEngine.GameObject);
                this._fixedChargesGenerated = System.Array.init(this.FixedCharges.length, System.UInt64(0), System.UInt64);

                for (var i = 0; i < this.FixedCharges.length; i = (i + 1) | 0) {
                    var fixedCharge = { v : this.FixedCharges[i] };

                    var charge = { v : this.AddGameObject$1(System.String.format("Fixed charge {0}", [i])) };
                    charge.v.Enabled = false;

                    this._fixedCharges[i] = charge.v;

                    charge.v.Transform.Position = new JuiceboxEngine.Math.Vector3.$ctor2(0, ((-80 - H5.Int.mul(i, 20)) | 0), 0.25);

                    var chargeSprite = { v : charge.v.AddComponent(JuiceboxEngine.Sprite) };
                    chargeSprite.v.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Charge.png");
                    chargeSprite.v.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(((H5.Int.div(((-chargeSprite.v.Texture.Width) | 0), 2)) | 0), ((H5.Int.div(((-chargeSprite.v.Texture.Height) | 0), 2)) | 0));
                    chargeSprite.v.Priority = 0.5;

                    var chargeHit = new JuiceboxEngine.GUI.EmptyUIElement.ctor(this.GUI.Root);
                    chargeHit.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(H5.Int.mul(chargeSprite.v.Texture.Width, 2) * this.DefaultCamera.Zoom, chargeSprite.v.Texture.Height * this.DefaultCamera.Zoom);
                    chargeHit.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                    var chargeText = { v : charge.v.AddComponent(JuiceboxEngine.TextComponent) };
                    chargeText.v.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-60, -9);
                    chargeText.v.Color = JuiceboxEngine.Math.Color.Black.$clone();
                    chargeText.v.DisplayText = System.String.format("???? {0}", [this.GetDisplayStringSmall(fixedCharge.v.price)]);

                    var chargeDebtText = charge.v.AddComponent(JuiceboxEngine.TextComponent);
                    chargeDebtText.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(22, -9);
                    chargeDebtText.Color = JuiceboxEngine.Math.Color.Black.$clone();
                    chargeDebtText.DisplayText = System.String.format("${0}/s", [LD48.Extensions.KiloFormat(fixedCharge.v.debtPerSecond)]);

                    var chargeUI = charge.v.AddComponent(JuiceboxEngine.UIComponent);
                    chargeUI.Setup(chargeHit, this);

                    var audio = { v : charge.v.AddComponent(JuiceboxEngine.Audio.AudioComponent) };
                    audio.v.SetAudioClip(this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Sounds/ka-ching.mp3"));

                    chargeHit.addOnMouseEnter((function ($me, charge, chargeSprite) {
                        return H5.fn.bind($me, function (ev) {
                            this._popup.Transform.Position2D = charge.v.Transform.Position2D.$clone();
                            this._popup.Enabled = true;
                            this._popupEnabledThisFrame = true;

                            JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, H5.fn.bind(this, function (x) {
                                chargeSprite.v.Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.Easings.CircularEaseOut(x) / 4.0));
                                charge.v.Transform.Scale = JuiceboxEngine.Math.Vector3.op_Multiply$1(new JuiceboxEngine.Math.Vector3.$ctor2(1, 1, 1), (1 + JuiceboxEngine.Math.Easings.CircularEaseOut(x) / 4.0));

                                this._popup.GetComponent(JuiceboxEngine.Sprite).Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (JuiceboxEngine.Math.Easings.CircularEaseOut(x)));
                                this._popup.Transform.Scale = JuiceboxEngine.Math.Vector3.op_Multiply$1(new JuiceboxEngine.Math.Vector3.$ctor2(1, 1, 1), (JuiceboxEngine.Math.Easings.CircularEaseOut(x)));
                            })));
                        });
                    })(this, charge, chargeSprite));

                    chargeHit.addOnMouseStay((function ($me, fixedCharge) {
                        return H5.fn.bind($me, function (ev) {
                            this._popup.GetComponent(JuiceboxEngine.TextComponent).DisplayText = System.String.format("{0}\nHave: {1} (${2}/s)\nTotal: {3}", fixedCharge.v.desc, fixedCharge.v.owned, fixedCharge.v.debtPerSecond.mul(fixedCharge.v.owned), this.GetDisplayStringSmall(this._fixedChargesGenerated[fixedCharge.v.id]));
                        });
                    })(this, fixedCharge));

                    chargeHit.addOnMouseExit((function ($me, chargeSprite, charge) {
                        return H5.fn.bind($me, function (ev) {
                            if (!this._popupEnabledThisFrame) {
                                this._popup.Enabled = false;
                            }

                            JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, function (x) {
                                chargeSprite.v.Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.Easings.QuadraticEaseOut(1.0 - x) / 4.0));
                                charge.v.Transform.Scale = JuiceboxEngine.Math.Vector3.op_Multiply$1(new JuiceboxEngine.Math.Vector3.$ctor2(1, 1, 1), (1 + JuiceboxEngine.Math.Easings.QuadraticEaseOut(1.0 - x) / 4.0));
                            }));
                        });
                    })(this, chargeSprite, charge));

                    chargeHit.addOnMouseUp((function ($me, fixedCharge, chargeText, audio, chargeSprite, charge) {
                        return H5.fn.bind($me, function (ev) {
                            if (this.debt.gte(fixedCharge.v.price)) {
                                this.debtPerSecond = this.debtPerSecond.add(fixedCharge.v.debtPerSecond);
                                this.debt = this.debt.sub(fixedCharge.v.price);
                                this._shownDebt = this.debt;

                                fixedCharge.v.owned = fixedCharge.v.owned.inc();
                                fixedCharge.v.price = H5.Int.clipu64(System.Int64.toNumber(fixedCharge.v.price) * JuiceboxEngine.Math.JMath.Pow(1.15, System.Int64.toNumber(fixedCharge.v.owned)));
                                chargeText.v.DisplayText = System.String.format("{0} {1}", fixedCharge.v.name, this.GetDisplayStringSmall(fixedCharge.v.price));

                                audio.v.Stop();
                                audio.v.Play();
                                audio.v.SetVolume(0.5);
                            }

                            JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, function (x) {
                                chargeSprite.v.Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.Easings.CircularEaseOut(x) / 4.0));
                                charge.v.Transform.Scale = JuiceboxEngine.Math.Vector3.op_Multiply$1(new JuiceboxEngine.Math.Vector3.$ctor2(1, 1, 1), (1 + JuiceboxEngine.Math.Easings.CircularEaseOut(x) / 4.0));
                            }));
                        });
                    })(this, fixedCharge, chargeText, audio, chargeSprite, charge));
                }

                this._popup = this.AddGameObject$1("Popup");
                this._popup.Enabled = false;

                var popupSprite = this._popup.AddComponent(JuiceboxEngine.Sprite);
                popupSprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/WebsiteBuyFrame.png");
                popupSprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(((H5.Int.div(((-popupSprite.Texture.Width) | 0), 2)) | 0), ((H5.Int.div(popupSprite.Texture.Height, 64)) | 0));
                popupSprite.Priority = 1E-06;

                var popupText = this._popup.AddComponent(JuiceboxEngine.TextComponent);
                popupText.Alignment = JuiceboxEngine.GUI.TextAlignment.Left;
                popupText.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-50, popupSprite.Texture.Height / 1.5);
                popupText.DisplayText = "All your base\nare belong to\nus.";
                popupText.Color = JuiceboxEngine.Math.Color.Black.$clone();

                this._timer = this.AddGameObject$1("Timer");
                this._timer.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(0, -68);
                this._timerText = this._timer.AddComponent(JuiceboxEngine.TextComponent);
                this._timerText.Alignment = JuiceboxEngine.GUI.TextAlignment.Center;
                this._timerText.DisplayText = "2:30 remaining";

                var startelement = new JuiceboxEngine.GUI.EmptyUIElement.ctor(this.GUI.Root);
                startelement.Dimensions = JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(80, 20), this._defaultZoom), 2);
                startelement.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                startelement.addOnMouseEnter(H5.fn.bind(this, function (ev) {
                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, H5.fn.bind(this, function (x) {
                        this._exit.GetComponent(JuiceboxEngine.Sprite).Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.Easings.CircularEaseOut(x) / 4.0));
                    })));
                }));

                startelement.addOnMouseExit(H5.fn.bind(this, function (ev) {
                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, H5.fn.bind(this, function (x) {
                        this._exit.GetComponent(JuiceboxEngine.Sprite).Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.Easings.QuadraticEaseOut(1.0 - x) / 4.0));
                    })));
                }));

                startelement.addOnMouseUp(H5.fn.bind(this, function (x) {
                    this.SceneManager.SwitchToScene(new LD48.MainMenu(this.ResourceManager));
                }));

                this._exit = this.AddGameObject$1("Exit");
                this._exit.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(0, 108);

                this._exit.AddComponent(JuiceboxEngine.UIComponent).Setup(startelement, this);

                var exitSprite = this._exit.AddComponent(JuiceboxEngine.Sprite);
                exitSprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/buttons.png");
                exitSprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 20, 128, 20);
                exitSprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-35, -9);

                this._exit.Enabled = false;
            },
            WebsiteEnter: function (ev) {
                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, H5.fn.bind(this, function (x) {
                    this._websiteSprite.Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.Easings.CircularEaseOut(x) / 4.0));
                })));
            },
            WebsiteExit: function (ev) {
                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, H5.fn.bind(this, function (x) {
                    this._websiteSprite.Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.Easings.QuadraticEaseOut(1.0 - x) / 4.0));
                })));
            },
            WebsiteClick: function (ev) {
                this.WebsiteEnter(null);

                var audio = this._website.GetComponent(JuiceboxEngine.Audio.AudioComponent);

                audio.Play(true);
                audio.SetVolume(0.35);

                if (!this._finished) {
                    this.AddDebt(System.UInt64(1));

                    var pos = this.DefaultCamera.ScreenPointToWorld(JuiceboxEngine.Input.InputManager.Instance.MousePosition.$clone());
                    this.BurstDollars(1, pos.$clone());

                    this._websiteSprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/Website{0}.png", [JuiceboxEngine.Util.Random.NextRange(0, LD48.MainScene.MAX_WEBSITES)]));
                }
            },
            BurstDollars: function (amount, position) {
                this._websiteParticles.Parent.Transform.Position2D = position.$clone();
                this._websiteParticles.BurstAmount = amount > 255 ? 255 : amount;

                this._websiteParticles.Burst();
            },
            AddDebt: function (debtAdded) {
                if (debtAdded.equals(System.UInt64(0))) {
                    return;
                }

                var debtBefore = this.debt;
                var debtTarget = this.debt.add(debtAdded);

                this.debt = this.debt.add(debtAdded);

                if (debtAdded.equals(System.UInt64(1))) {
                    this._shownDebt = this.debt;
                }

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, H5.fn.bind(this, function (x) {
                    this._debtCounter.Transform.Scale = JuiceboxEngine.Math.Vector3.op_Multiply$1(new JuiceboxEngine.Math.Vector3.$ctor2(1, 1, 1), (1 + JuiceboxEngine.Math.Easings.QuadraticEaseOut(1.0 - x) / 4.0));

                    if (debtAdded.ne(System.UInt64(1))) {
                        this._shownDebt = H5.Int.clipu64(JuiceboxEngine.Math.JMath.Interpolate(System.Int64.toNumber(debtBefore), System.Int64.toNumber(debtTarget), x));
                    }
                })));

                for (var i = 0; i < this.FixedCharges.length; i = (i + 1) | 0) {
                    if (!this._fixedCharges[i].Enabled) {
                        this._fixedCharges[i].Enabled = this.debt.gte(this.FixedCharges[i].unlockPrice);
                    }
                }
            },
            /**
             * Convert a number to a presentable string.
             *
             * @instance
             * @private
             * @this LD48.MainScene
             * @memberof LD48.MainScene
             * @param   {System.UInt64}    value    The value to make pretty.
             * @return  {string}                    Presentable string representing the value.
             */
            GetDisplayString: function (value) {
                return System.String.format("${0}", [value.toString("#,##")]);
            },
            /**
             * Convert a number to a small presentable string.
             *
             * @instance
             * @private
             * @this LD48.MainScene
             * @memberof LD48.MainScene
             * @param   {System.UInt64}    value    The value to make pretty.
             * @return  {string}                    Presentable string representing the value in few characters as possible.
             */
            GetDisplayStringSmall: function (value) {
                return System.String.format("${0}", [LD48.Extensions.KiloFormat(value)]);
            },
            ShowLeaderboard: function () {
                var task = JuiceboxEngine.Playfab.PlayfabManager.Leaderboard.GetLeaderboard("Highscore", 0, 100);

                task.addOnTaskCompleted(H5.fn.bind(this, function (lbTask) {
                    if (lbTask.Success) {
                        var leaderboardTask = H5.cast(lbTask, JuiceboxEngine.Playfab.PlayfabTaskLeaderboard);
                        var leaderboard = leaderboardTask.Leaderboard;

                        var entries = System.Array.init(leaderboard.Entries.Count, null, JuiceboxEngine.GameObject);

                        for (var i = 0; i < leaderboard.Entries.Count; i = (i + 1) | 0) {
                            var entry = leaderboard.Entries.getItem(i).$clone();

                            var lbEntryObj = this.AddGameObject$1(System.String.format("Entry{0}", [i]));
                            entries[i] = lbEntryObj;

                            lbEntryObj.Transform.Position = new JuiceboxEngine.Math.Vector3.$ctor2(0, H5.Int.mul(-20, i), -1.0);

                            this._lowestScroll = H5.Int.mul(-20, i);

                            var entrySprite = lbEntryObj.AddComponent(JuiceboxEngine.Sprite);
                            entrySprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/buttons.png");

                            entrySprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 40, 128, 18);

                            if (i === 0) {
                                entrySprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 58, 128, 18);
                            } else {
                                if (i === 1) {
                                    entrySprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 76, 128, 18);
                                } else {
                                    if (i === 2) {
                                        entrySprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 94, 128, 18);
                                    }
                                }
                            }

                            entrySprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(((H5.Int.div(((-entrySprite.Texture.Width) | 0), 2)) | 0), ((H5.Int.div(((-entrySprite.Texture.Height) | 0), 2)) | 0));
                            entrySprite.Priority = 0.1;

                            var text = lbEntryObj.AddComponent(JuiceboxEngine.TextComponent);
                            text.Alignment = JuiceboxEngine.GUI.TextAlignment.Left;
                            text.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-62, -64);
                            text.DisplayText = System.String.format("{0}. {1} - {2}", entry.position, entry.displayName, System.Int32.format(entry.value, "#,##"));
                            text.Color = JuiceboxEngine.Math.Color.Black.$clone();
                        }

                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.LinearRepeat(1.0, function (x) {
                            for (var i1 = 0; i1 < entries.length; i1 = (i1 + 1) | 0) {
                                entries[i1].Transform.Rotation2D = JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds + i1) * (0.049087387);
                            }
                        }));
                    } else {
                        System.Console.WriteLine("Failed to get leaderboards... :(");
                    }
                }));
            },
            PreUpdate: function () {
                if (this._timeLeft < 0) {
                    this._timeLeft -= JuiceboxEngine.Util.Time.DeltaTimeRealTime;

                    if (this._timeLeft < -1) {
                        if (JuiceboxEngine.Input.InputManager.Instance.MouseKeyHeld(JuiceboxEngine.Input.MouseKey.LeftMouse)) {
                            this.DefaultCamera.Parent.Transform.Translate2D(JuiceboxEngine.Math.Vector2.op_Division$1(JuiceboxEngine.Math.Vector2.op_Division$1((JuiceboxEngine.Math.Vector2.op_Multiply(JuiceboxEngine.Input.InputManager.Instance.MouseDelta.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0, JuiceboxEngine.Graphics.GraphicsManager.Instance.Height))), this.DefaultCamera.Zoom), JuiceboxEngine.Util.Config.ConfigValues.PixelSize));
                        }

                        if (this.DefaultCamera.Parent.Transform.Position2D.Y > 0) {
                            this.DefaultCamera.Parent.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(this.DefaultCamera.Parent.Transform.Position2D.X, 0);
                        }

                        if (this.DefaultCamera.Parent.Transform.Position2D.Y < this._lowestScroll) {
                            this.DefaultCamera.Parent.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(this.DefaultCamera.Parent.Transform.Position2D.X, this._lowestScroll);
                        }
                    }

                    if (!this._finished) {
                        this._finished = true;
                        this._timer.Enabled = false;

                        this._exit.Enabled = true;

                        var task = JuiceboxEngine.Playfab.PlayfabManager.Leaderboard.SetLeaderboardEntry(System.Array.init(["Highscore", "TotalScore", "Attempts"], System.String), System.Array.init([System.Int64.clip32(this.debt), System.Int64.clip32(this.debt), 1], System.Int32));
                        task.addOnTaskCompleted(H5.fn.bind(this, function (x) {
                            JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.ShowLeaderboards());
                        }));


                        for (var i = 0; i < this._fixedCharges.length; i = (i + 1) | 0) {
                            this._fixedCharges[i].GetComponent(JuiceboxEngine.UIComponent).Enabled = false;
                        }

                        this._websiteSprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/WebsiteBlocked.png");

                        var start = this.DefaultCamera.Parent.Transform.Position2D.$clone();

                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                            this.DefaultCamera.Parent.Transform.Position2D = JuiceboxEngine.Math.Vector2.Interpolate(start.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0, 0), x);

                            for (var i1 = 0; i1 < this._fixedCharges.length; i1 = (i1 + 1) | 0) {
                                this._fixedCharges[i1].Transform.Position2D = JuiceboxEngine.Math.Vector2.op_Addition(this._fixedCharges[i1].Transform.Position2D.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0, -128 * x));
                            }
                        })));
                    }
                } else {
                    if (LD48.MainScene.GAME_TIME - this._timeLeft > LD48.MainScene.KICK_IN_BPM_EFFECT) {
                        this.DefaultCamera.Zoom = this._defaultZoom + JuiceboxEngine.Math.JMath.Clamp$1(JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds * JuiceboxEngine.Math.JMath.TWO_PI * (2)), 0, 1) * 0.025;
                    }

                    this._debtTimer += JuiceboxEngine.Util.Time.DeltaTime;
                    this._timeLeft -= JuiceboxEngine.Util.Time.DeltaTimeRealTime;

                    var span = System.TimeSpan.fromSeconds(this._timeLeft);
                    this._timerText.DisplayText = System.String.format("{0}:{1} remaining", span.getMinutes(), System.String.alignString(H5.toString(span.getSeconds()), 2, 48));

                    if (this._debtTimer >= 1.0) {
                        this.AddDebt(this.debtPerSecond);
                        this.BurstDollars(this.debtPerSecond.equals(System.UInt64(0)) ? 0 : ((((H5.Int.div(System.Int64.clip32(this.debtPerSecond), 5)) | 0) + 1) | 0), this._debtPerSecondCounter.Transform.Position2D.$clone());

                        this._debtTimer = 0;

                        for (var i1 = 0; i1 < this._fixedCharges.length; i1 = (i1 + 1) | 0) {
                            this._fixedChargesGenerated[i1] = this._fixedChargesGenerated[i1].add((this.FixedCharges[i1].debtPerSecond.mul(this.FixedCharges[i1].owned)));
                        }
                    }

                    this._debtText.DisplayText = "Debt " + (this.GetDisplayString(this._shownDebt) || "");
                    this._debtTextShadow.DisplayText = this._debtText.DisplayText;

                    this._debtPerSecondText.DisplayText = System.String.format("${0}/s", [this.debtPerSecond]);
                    this._debtPerSecondTextShadow.DisplayText = this._debtPerSecondText.DisplayText;

                    for (var i2 = 0; i2 < this._fixedCharges.length; i2 = (i2 + 1) | 0) {
                        if (this.debt.gte(this.FixedCharges[i2].price)) {
                            this._fixedCharges[i2].GetComponent(JuiceboxEngine.Sprite).Color = JuiceboxEngine.Math.Color.White.$clone();
                        } else {
                            this._fixedCharges[i2].GetComponent(JuiceboxEngine.Sprite).Color = new JuiceboxEngine.Math.Color.$ctor3(0.5, 0.5, 0.5, 1.0);
                        }

                        this._fixedCharges[i2].Transform.Rotation2D = JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds + i2) * (0.049087387);
                    }
                }

                this._website.Transform.Rotation2D = JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds) * (0.09817477);

                this._exit.Transform.Rotation2D = JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds + 2) * (0.09817477);

                this._background.Transform.Translate2D(JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(-16, -16), JuiceboxEngine.Util.Time.DeltaTime), this._defaultZoom));
            },
            ShowLeaderboards: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(2.0);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.ShowLeaderboard();

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
            LateUpdate: function () {
                this._popupEnabledThisFrame = false;
            },
            FinalizeScene: function () {

            }
        }
    });

    H5.define("LD48.Program", {
        main: function Main (args) {
            var game = new JuiceboxEngine.JuiceboxGame();

            game.AudioManager.SetVolume(0.75);

            game.Run(new LD48.MainMenu(game.ResourceManager));
        }
    });
});
