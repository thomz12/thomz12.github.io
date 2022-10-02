/**
 * @compiler H5 0.0.25007
 */
H5.assemblyVersion("LD51","1.0.0.0");
H5.assembly("LD51", function ($asm, globals) {
    "use strict";

    H5.define("LD51.BigTextUI", {
        inherits: [JuiceboxEngine.GUI.EmptyUIElement],
        fields: {
            _background: null,
            _foreground: null,
            _text: null
        },
        ctors: {
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, 64);
                this.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                this._background = new JuiceboxEngine.GUI.Panel(this);
                this._background.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._background.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._background.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(290, 64);
                this._background.Color = new JuiceboxEngine.Math.Color.$ctor2(215, 123, 186, 255);
                this._background.Position = new JuiceboxEngine.Math.Vector2.$ctor3(5, -5);

                this._foreground = new JuiceboxEngine.GUI.Panel(this._background);
                this._foreground.Dimensions = this._background.Dimensions.$clone();
                this._foreground.Color = new JuiceboxEngine.Math.Color.$ctor2(99, 155, 255, 255);
                this._foreground.Position = new JuiceboxEngine.Math.Vector2.$ctor3(-5, 5);

                this._text = new JuiceboxEngine.GUI.CanvasText(this._foreground);
                this._text.Dimensions = this._foreground.Dimensions.$clone();
                this._text.VerticalAlignment = JuiceboxEngine.GUI.TextVerticalAlignment.Center;
                this._text.HorizontalAlignment = JuiceboxEngine.GUI.TextHorizontalAlignment.Center;
                this._text.DisplayText = "Game Over!";
                this._text.Font = "AldotheApache";
                this._text.TextSize = 48;

                this._background.Enabled = false;
            }
        },
        methods: {
            ShowText: function (text, duration) {
                if (duration === void 0) { duration = 2.0; }
                this._text.DisplayText = text;
                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.ShowAnimation(duration));
            },
            ShowAnimation: function (duration) {
                var $s = 0,
                    $jff,
                    $rv,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(0.2);
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    this._background.Enabled = true;

                                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, H5.fn.bind(this, function (x) {
                                            this._background.Scale = JuiceboxEngine.Math.Vector2.Interpolate(JuiceboxEngine.Math.Vector2.Zero.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Easings.BackEaseOut(x));
                                        })));

                                        $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(duration);
                                        $s = 2;
                                        return true;
                                }
                                case 2: {
                                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, H5.fn.bind(this, function (x) {
                                            this._background.Scale = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Vector2.Zero.$clone(), JuiceboxEngine.Math.Easings.BackEaseIn(x));
                                        })));

                                        $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(0.3);
                                        $s = 3;
                                        return true;
                                }
                                case 3: {
                                    this._background.Enabled = false;

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($ae1) {
                        $ae = System.Exception.create($ae1);
                        throw $ae;
                    }
                }));
                return $en;
            }
        }
    });

    H5.define("LD51.Button", {
        inherits: [JuiceboxEngine.GUI.EmptyUIElement],
        fields: {
            _background: null,
            _foreground: null,
            _text: null
        },
        ctors: {
            ctor: function (parent, text) {
                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, 74);
                this.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.InputType = JuiceboxEngine.GUI.UIInput.SELF;

                this.addOnMouseStay(H5.fn.cacheBind(this, this.MouseStay));
                this.addOnMouseExit(H5.fn.cacheBind(this, this.MouseExit));
                this.addOnMouseDown(H5.fn.cacheBind(this, this.MouseDown));

                this._background = new JuiceboxEngine.GUI.Panel(this);
                this._background.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._background.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._background.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(290, 64);
                this._background.Color = new JuiceboxEngine.Math.Color.$ctor2(215, 123, 186, 255);
                this._background.Position = new JuiceboxEngine.Math.Vector2.$ctor3(5, -5);

                this._foreground = new JuiceboxEngine.GUI.Panel(this);
                this._foreground.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._foreground.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._foreground.Dimensions = this._background.Dimensions.$clone();
                this._foreground.Color = new JuiceboxEngine.Math.Color.$ctor2(99, 155, 255, 255);
                this._foreground.Position = new JuiceboxEngine.Math.Vector2.$ctor3(-5, 5);

                this._text = new JuiceboxEngine.GUI.CanvasText(this._foreground);
                this._text.Dimensions = this._foreground.Dimensions.$clone();
                this._text.VerticalAlignment = JuiceboxEngine.GUI.TextVerticalAlignment.Center;
                this._text.HorizontalAlignment = JuiceboxEngine.GUI.TextHorizontalAlignment.Center;
                this._text.DisplayText = text;
                this._text.Font = "AldotheApache";
                this._text.TextSize = 48;
            }
        },
        methods: {
            MouseDown: function (ev) {
                this._background.Color = JuiceboxEngine.Math.Color.White.$clone();
                this._foreground.Color = JuiceboxEngine.Math.Color.White.$clone();
            },
            MouseExit: function (ev) {
                this._background.Position = new JuiceboxEngine.Math.Vector2.$ctor3(5, -5);
                this._foreground.Position = new JuiceboxEngine.Math.Vector2.$ctor3(-5, 5);
                this._background.Color = new JuiceboxEngine.Math.Color.$ctor2(215, 123, 186, 255);
                this._foreground.Color = new JuiceboxEngine.Math.Color.$ctor2(99, 155, 255, 255);
            },
            MouseStay: function (ev) {
                var mouseEvent = ev;

                var pos = JuiceboxEngine.Math.Vector2.op_Division(mouseEvent.position.$clone(), this.Dimensions.$clone());

                this._background.Position = new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Math.JMath.Interpolate(5, -5, pos.X), JuiceboxEngine.Math.JMath.Interpolate(5, -5, pos.Y));
                this._foreground.Position = new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Math.JMath.Interpolate(-5, 5, pos.X), JuiceboxEngine.Math.JMath.Interpolate(-5, 5, pos.Y));
            }
        }
    });

    /** @namespace LD51 */

    /**
     * Example of a scene.
     *
     * @class LD51.MainScene
     * @augments JuiceboxEngine.Scene
     */
    H5.define("LD51.MainScene", {
        inherits: [JuiceboxEngine.Scene],
        statics: {
            fields: {
                ICE_SMELT_TIME: 0
            },
            ctors: {
                init: function () {
                    this.ICE_SMELT_TIME = 10.0;
                }
            }
        },
        fields: {
            _player: null,
            _arrow: null,
            _arrowSprite: null,
            _controller: null,
            _playerSprite: null,
            _timerUI: null,
            _scoreUI: null,
            _bigTextUI: null,
            _timer: 0,
            _hasControl: false,
            _deliveries: 0,
            _score: 0,
            _collided: false,
            _invincible: false,
            _topPanel: null,
            _bottomPanel: null,
            _people: null,
            _currentPerson: null,
            _backgroundAudio: null,
            _currentLevel: 0
        },
        ctors: {
            /**
             * Scene constructor, not for any game setup.
             Use {@link } instead.
             *
             * @instance
             * @public
             * @this LD51.MainScene
             * @memberof LD51.MainScene
             * @param   {JuiceboxEngine.Resources.ResourceManager}    manager    The resource manager to use for this scene.
             * @return  {void}
             */
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);
                this._people = new (System.Collections.Generic.List$1(LD51.PersonComponent)).ctor();
            }
        },
        methods: {
            /**
             * Initialize the scene. Game objects can be accessed and created here.
             *
             * @instance
             * @protected
             * @override
             * @this LD51.MainScene
             * @memberof LD51.MainScene
             * @return  {void}
             */
            InitializeScene: function () {
                var personSystem = new LD51.PersonComponentSystem();
                this.ComponentManager.AddComponentSystem(personSystem);
                personSystem.addOnPersonCreate(H5.fn.cacheBind(this, this.PersonCreate));

                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(30, 144, 255, 255);
                this.DefaultCamera.Zoom = 2;

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(true);

                var level = this.ResourceManager.Load(JuiceboxEngine.Level, "Levels/CityMap.json");
                level.LoadToScene(this);

                this._backgroundAudio = this.GetGameObjectByName("Music").GetComponent(JuiceboxEngine.Audio.AudioComponent);

                this.PhysicsWorld.Gravity = new JuiceboxEngine.Math.Vector2.$ctor3(0, 0);
                var wallPlayerMaterial = this.PhysicsWorld.CreateContactMaterial(new JuiceboxEngine.Physics.P2Material.$ctor1("wall"), new JuiceboxEngine.Physics.P2Material.$ctor1("player"));
                wallPlayerMaterial.Friction = 0.0;

                this._player = this.GetGameObjectByName("Player");
                this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).addOnCollisionStay(H5.fn.cacheBind(this, this.PlayerCollisionStay));
                this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).addOnCollisionStart(H5.fn.cacheBind(this, this.PlayerCollisionStart));
                this._controller = new LD51.PlayerController(this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent));
                this._playerSprite = this._player.GetComponent(JuiceboxEngine.Components.LayeredSpriteComponent);

                this._arrow = this.AddGameObject$1("Arrow");
                this._arrowSprite = this._arrow.AddComponent(JuiceboxEngine.Components.SpriteComponent);
                this._arrowSprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(0, 32);
                this._arrowSprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Arrow.png");

                this.PlayLevelAudio(1);

                this._topPanel = new JuiceboxEngine.GUI.Panel(this.GUI.Root);
                this._topPanel.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(10000, 32);
                this._topPanel.Anchor = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                this._topPanel.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomLeft.$clone();
                this._topPanel.Color = JuiceboxEngine.Math.Color.Black.$clone();

                this._bottomPanel = new JuiceboxEngine.GUI.Panel(this.GUI.Root);
                this._bottomPanel.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(10000, 32);
                this._bottomPanel.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomLeft.$clone();
                this._bottomPanel.Pivot = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                this._bottomPanel.Color = JuiceboxEngine.Math.Color.Black.$clone();

                this._timerUI = new LD51.TimerUI(this.GUI.Root);
                this._timerUI.Anchor = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._timerUI.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._timerUI.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -8);

                this._scoreUI = new LD51.ScoreUI(this.GUI.Root);

                this._bigTextUI = new LD51.BigTextUI(this.GUI.Root);

                this.StartGame();

            },
            PersonCreate: function (personComponent) {
                this._people.add(personComponent);
            },
            PlayerCollisionStart: function (thisBody, otherBody) {
                if (!System.String.equals(otherBody.GameObject.Name, "Person")) {
                    if (!this._invincible) {
                        this._collided = true;
                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.Collide());
                    }
                }
            },
            PlayerCollisionStay: function (thisBody, otherBody) {
                if (this._hasControl) {
                    if (System.String.equals(otherBody.GameObject.Name, "Person")) {
                        this.TryGiveIceCream(otherBody.GameObject.GetComponent(LD51.PersonComponent));
                    }
                }
            },
            ShakeCamera: function (intensity, duration) {
                var $s = 0,
                    $jff,
                    $rv,
                    shakeOffset,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    if ( duration > 0.0 ) {
                                            $s = 1;
                                            continue;
                                        } 
                                        $s = 3;
                                        continue;
                                }
                                case 1: {
                                    shakeOffset = new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Math.RandomNumbers.NextRange$1(-1.0, 1.0), JuiceboxEngine.Math.RandomNumbers.NextRange$1(-1.0, 1.0));
                                        shakeOffset.Normalize();

                                        this.DefaultCamera.GameObject.Transform.Position2D = JuiceboxEngine.Math.Vector2.op_Addition(this.DefaultCamera.GameObject.Transform.Position2D.$clone(), JuiceboxEngine.Math.Vector2.op_Multiply$1(shakeOffset.$clone(), intensity));

                                        duration -= JuiceboxEngine.Util.Time.DeltaTime;

                                        $en.current = new JuiceboxEngine.Coroutines.WaitForFrame();
                                        $s = 2;
                                        return true;
                                }
                                case 2: {
                                    
                                        $s = 0;
                                        continue;
                                }
                                case 3: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($ae1) {
                        $ae = System.Exception.create($ae1);
                        throw $ae;
                    }
                }));
                return $en;
            },
            Collide: function () {
                var $s = 0,
                    $jff,
                    $rv,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.2, H5.fn.bind(this, function (x) {
                                            this._playerSprite.Size = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(1.5, 1.5), new JuiceboxEngine.Math.Vector2.$ctor3(1.0, 1.0), x);
                                        })));

                                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.ShakeCamera(3, 0.5));

                                        this._playerSprite.Color = new JuiceboxEngine.Math.Color.$ctor3(999.0, 999.0, 999.0, 1.0);
                                        $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(0.1);
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    this._playerSprite.Color = new JuiceboxEngine.Math.Color.$ctor3(1.0, 1.0, 1.0, 1.0);

                                        this._invincible = true;
                                        $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(0.5);
                                        $s = 2;
                                        return true;
                                }
                                case 2: {
                                    this._invincible = false;

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($ae1) {
                        $ae = System.Exception.create($ae1);
                        throw $ae;
                    }
                }));
                return $en;
            },
            TryGiveIceCream: function (person) {
                if (person.WantsIcecream) {
                    if (this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).Velocity.Length() < 0.1) {
                        person.GiveIceCream();
                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.FocusCamera());
                        this._player.GetComponent(JuiceboxEngine.Audio.AudioComponent).AudioClip = this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, System.String.format("Sounds/Bliep{0}.mp3", [this._currentLevel]));
                        this._player.GetComponent(JuiceboxEngine.Audio.AudioComponent).Play();
                        this._deliveries = (this._deliveries + 1) | 0;

                        var pointStrings = new (System.Collections.Generic.List$1(System.String)).ctor();
                        var points = new (System.Collections.Generic.List$1(System.Int32)).ctor();

                        pointStrings.add("Delivery");
                        points.add(100);

                        if (this._timer > 5.0) {
                            pointStrings.add("Speed bonus!");
                            points.add(20);
                        }

                        if (this._timer < 0.1) {
                            pointStrings.add("Last moment!");
                            points.add(20);
                        } else if (this._timer < 1.0) {
                            pointStrings.add("Just on time!");
                            points.add(10);
                        } else if (this._timer < 2.0) {
                            pointStrings.add("Cutting it close!");
                            points.add(5);
                        }

                        if (this._controller.Drifted) {
                            pointStrings.add("Nice drift!");
                            points.add(10);
                        }
                        this._controller.ResetDrift();

                        if (this._deliveries === 10) {
                            pointStrings.add("LEVEL UP!");
                            points.add(50);

                            this.PlayLevelAudio(2);
                        } else if (this._deliveries === 20) {
                            pointStrings.add("LEVEL UP!");
                            points.add(50);

                            this.PlayLevelAudio(3);
                        }

                        if (!this._collided) {
                            pointStrings.add("Clean drive!");
                            points.add(25);
                        }
                        this._collided = false;

                        this._score = (this._score + (System.Linq.Enumerable.from(points, System.Int32).sum())) | 0;
                        this._scoreUI.AddScore(pointStrings.ToArray(), points.ToArray());

                        this._timer = LD51.MainScene.ICE_SMELT_TIME;
                        this._currentPerson = this.FindPerson(((H5.Int.mul(this._deliveries, 50) + 100) | 0));
                        this._currentPerson.WantsIceCream();
                    }
                }
            },
            FocusCamera: function () {
                var $s = 0,
                    $jff,
                    $rv,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    this._hasControl = false;

                                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, H5.fn.bind(this, function (x) {
                                            this.DefaultCamera.Zoom = 2 + JuiceboxEngine.Math.Easings.QuadraticEaseOut(x) * 2;
                                            this._topPanel.Position = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 1.0), JuiceboxEngine.Math.JMath.Interpolate(0, -this._topPanel.Dimensions.Y, x));
                                            this._bottomPanel.Position = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 1.0), JuiceboxEngine.Math.JMath.Interpolate(0, this._bottomPanel.Dimensions.Y, x));
                                        })));

                                        $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(1.0);
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    this._hasControl = true;
                                        this._timer = LD51.MainScene.ICE_SMELT_TIME;

                                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, H5.fn.bind(this, function (x) {
                                            this.DefaultCamera.Zoom = 2 + JuiceboxEngine.Math.Easings.QuarticEaseIn(1.0 - x) * 2;
                                            this._topPanel.Position = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 1.0), JuiceboxEngine.Math.JMath.Interpolate(-this._topPanel.Dimensions.Y, 0, x));
                                            this._bottomPanel.Position = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 1.0), JuiceboxEngine.Math.JMath.Interpolate(this._bottomPanel.Dimensions.Y, 0, x));
                                        })));

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($ae1) {
                        $ae = System.Exception.create($ae1);
                        throw $ae;
                    }
                }));
                return $en;
            },
            StartGame: function () {
                this._timer = LD51.MainScene.ICE_SMELT_TIME;
                this._hasControl = true;
                this._deliveries = 0;

                this.DefaultCamera.GameObject.Transform.Position2D = this._player.Transform.Position2D.$clone();

                this._currentPerson = this.FindPerson(0);
                this._currentPerson.WantsIceCream();
            },
            /**
             * Called every frame, before any gameobject updates.
             *
             * @instance
             * @protected
             * @override
             * @this LD51.MainScene
             * @memberof LD51.MainScene
             * @return  {void}
             */
            PreUpdate: function () {
                if (this._hasControl) {
                    this._timer -= JuiceboxEngine.Util.Time.DeltaTime;
                    this._timerUI.UpdateTime(this._timer);
                }

                if (this._timer < 0.0) {
                    this._timer = 0;
                    this._timerUI.UpdateTime(this._timer);

                    this._hasControl = false;

                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.GameOver());
                }

                if (this._hasControl) {
                    this._controller.Update();
                }

                if (!this._invincible) {
                    this._playerSprite.Size = JuiceboxEngine.Math.Vector2.op_Addition(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds * 50)), 0.02), (this._controller.speed / this._controller.maxSpeed)));
                }
            },
            GameOver: function () {
                var $s = 0,
                    $jff,
                    $rv,
                    flash,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.ShakeCamera(3, 0.5));

                                        flash = new JuiceboxEngine.GUI.Panel(this.GUI.Root);
                                        flash.Dimensions = this.GUI.Root.Dimensions.$clone();
                                        flash.Color = JuiceboxEngine.Math.Color.White.$clone();

                                        this._arrowSprite.Enabled = false;

                                        this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).AngularDamping = 0.8;
                                        this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).AngularVelocity = 30.0;
                                        this._controller.speed = 0;


                                        $en.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.ctor(JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.1, function (x) {
                                            flash.Color = new JuiceboxEngine.Math.Color.$ctor3(1.0, 1.0, 1.0, JuiceboxEngine.Math.JMath.Sin(x * JuiceboxEngine.Math.JMath.PI));
                                        })));
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(0.5);
                                        $s = 2;
                                        return true;
                                }
                                case 2: {
                                    this._bigTextUI.ShowText("Game Over!", 2);

                                        flash.Remove();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($ae1) {
                        $ae = System.Exception.create($ae1);
                        throw $ae;
                    }
                }));
                return $en;
            },
            FindPerson: function (range) {
                var ordered = System.Linq.Enumerable.from(this._people, LD51.PersonComponent).orderBy(H5.fn.bind(this, function (x) {
                        return JuiceboxEngine.Math.JMath.Abs((JuiceboxEngine.Math.Vector2.op_Subtraction(x.GameObject.Transform.Position2D.$clone(), this._player.Transform.Position2D.$clone())).Length() - range);
                    }));

                for (var i = 0; i < ordered.count(); i = (i + 1) | 0) {
                    if (H5.referenceEquals(ordered.elementAt(i), this._currentPerson)) {
                        continue;
                    }

                    return ordered.elementAt(i);
                }

                return null;

            },
            /**
             * Called every frame, after all gameobject had an update.
             *
             * @instance
             * @protected
             * @override
             * @this LD51.MainScene
             * @memberof LD51.MainScene
             * @return  {void}
             */
            PostUpdate: function () {
                this._arrow.Transform.Position2D = JuiceboxEngine.Math.Vector2.op_Addition(this._player.Transform.Position2D.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0, 4));
                this._arrowSprite.Offset = JuiceboxEngine.Math.Vector2.op_Addition(new JuiceboxEngine.Math.Vector2.$ctor3(0, 32), JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(0, 8), JuiceboxEngine.Math.JMath.Abs(JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds * JuiceboxEngine.Math.JMath.PI * 2))));

                var dir = JuiceboxEngine.Math.Vector2.op_Subtraction(this._currentPerson.GameObject.Transform.Position2D.$clone(), this._player.Transform.Position2D.$clone());
                dir.Normalize();

                this._arrow.Transform.Rotation2D = JuiceboxEngine.Math.JMath.ATan2(dir.Y, dir.X) - JuiceboxEngine.Math.JMath.PI_OVER_TWO;
                this.DefaultCamera.GameObject.Transform.Position2D = JuiceboxEngine.Math.Vector2.Interpolate(this.DefaultCamera.GameObject.Transform.Position2D.$clone(), JuiceboxEngine.Math.Vector2.op_Addition(this._player.Transform.Position2D.$clone(), (JuiceboxEngine.Math.Vector2.op_Multiply$1(this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).Velocity.$clone(), 0.25))), 5.0 * JuiceboxEngine.Util.Time.DeltaTime);
            },
            PlayLevelAudio: function (level) {
                level = JuiceboxEngine.Math.JMath.Clamp(level, 1, 3);

                this._currentLevel = level;

                this._backgroundAudio.AudioClip = this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, System.String.format("Sounds/Overworld_level_{0}.mp3", [this._currentLevel]));

                this._backgroundAudio.Play();
            },
            /**
             * Called when the scene is about to be destroyed.
             *
             * @instance
             * @protected
             * @override
             * @this LD51.MainScene
             * @memberof LD51.MainScene
             * @return  {void}
             */
            FinalizeScene: function () {

            }
        }
    });

    H5.define("LD51.PersonComponent", {
        inherits: [JuiceboxEngine.Components.Component],
        statics: {
            fields: {
                PERSON_DIMENSIONS: 0
            },
            ctors: {
                init: function () {
                    this.PERSON_DIMENSIONS = 16;
                }
            }
        },
        fields: {
            WanderDistance: null,
            WantsIcecream: false,
            _ui: null,
            _setup: false,
            _animOffset: 0,
            _sprite: null
        },
        ctors: {
            init: function () {
                this.WanderDistance = new JuiceboxEngine.Math.Vector2();
            }
        },
        methods: {
            Initialize: function () {
                this._setup = false;
                this._ui = this.GameObject.AddComponent(JuiceboxEngine.Components.UIComponent);

                var image = new JuiceboxEngine.GUI.Image(this.GameObject.Scene.GUI.Root);
                image.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();
                image.DisplayImage = this.GameObject.Scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/IceCreamRequest.png");
                image.Dimensions = JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(image.DisplayImage.Width, image.DisplayImage.Height), this.GameObject.Scene.DefaultCamera.Zoom), JuiceboxEngine.Util.Config.ConfigValues.PixelSize);
                image.Enabled = false;

                this._animOffset = JuiceboxEngine.Math.RandomNumbers.Next() * 100;

                this._ui.UIElement = image;
            },
            Update: function () {
                JuiceboxEngine.Components.Component.prototype.Update.call(this);

                if (!this._setup) {
                    this._sprite = this.GameObject.GetComponent(JuiceboxEngine.Components.SpriteComponent);
                    this._sprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(H5.Int.mul(JuiceboxEngine.Math.RandomNumbers.NextRange(0, 4), LD51.PersonComponent.PERSON_DIMENSIONS), H5.Int.mul(JuiceboxEngine.Math.RandomNumbers.NextRange(0, 4), LD51.PersonComponent.PERSON_DIMENSIONS), LD51.PersonComponent.PERSON_DIMENSIONS, LD51.PersonComponent.PERSON_DIMENSIONS);
                    this._setup = true;
                }

                this._sprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(0, JuiceboxEngine.Math.JMath.Abs(JuiceboxEngine.Math.JMath.Sin(this._animOffset + JuiceboxEngine.Util.Time.TotalSeconds * JuiceboxEngine.Math.JMath.PI * 4 * (this.WantsIcecream ? 2 : 1)) * 2));

                if (this.WantsIcecream) {
                    this._ui.UIElement.Scale = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.JMath.Abs(JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds * 4)) * 0.5));
                }
            },
            WantsIceCream: function () {
                this.WantsIcecream = true;

                this._ui.UIElement.Enabled = true;
                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.2, H5.fn.bind(this, function (x) {
                    this._ui.UIElement.Scale = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Easings.BackEaseOut(x));
                })));
            },
            GiveIceCream: function () {
                if (this.WantsIcecream) {
                    this.WantsIcecream = false;
                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.HideBubble());
                }
            },
            HideBubble: function () {
                var $s = 0,
                    $jff,
                    $rv,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    $en.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, H5.fn.bind(this, function (x) {
                                            this._ui.UIElement.Scale = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Easings.BackEaseOut(1.0 - x));
                                        })));
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    this._ui.UIElement.Enabled = false;

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($ae1) {
                        $ae = System.Exception.create($ae1);
                        throw $ae;
                    }
                }));
                return $en;
            },
            Destroy: function () {

            }
        }
    });

    H5.define("LD51.PersonComponentSystem", {
        inherits: [JuiceboxEngine.Components.ComponentSystem],
        events: {
            OnPersonCreate: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                JuiceboxEngine.Components.ComponentSystem.ctor.call(this, LD51.PersonComponent);
            }
        },
        methods: {
            CreateComponent: function () {
                var person = new LD51.PersonComponent();

                !H5.staticEquals(this.OnPersonCreate, null) ? this.OnPersonCreate(person) : null;

                return person;
            }
        }
    });

    H5.define("LD51.PlayerController", {
        fields: {
            _playerPhysics: null,
            _playerSprite: null,
            speed: 0,
            maxSpeed: 0,
            reversing: false,
            Drifted: false,
            _driftTime: 0,
            tilt: 0
        },
        ctors: {
            ctor: function (playerPhysics) {
                this.$initialize();
                this._playerPhysics = playerPhysics;
                this._playerPhysics.Damping = 0.9;

                this._playerSprite = playerPhysics.GameObject.GetComponent(JuiceboxEngine.Components.LayeredSpriteComponent);

                this.speed = 0;
                this.maxSpeed = 300;
                this.reversing = false;
            }
        },
        methods: {
            Update: function () {
                if (this._playerPhysics.Velocity.Length() < 2) {
                    this.speed = 0;
                }

                if (JuiceboxEngine.Math.JMath.Abs(this._playerSprite.Rotation) > 0.3926991) {
                    this._driftTime += JuiceboxEngine.Util.Time.DeltaTime;

                    if (this._driftTime > 1.0) {
                        this.Drifted = true;
                    }
                } else {
                    this._driftTime = 0;
                }

                if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("W") || JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("ArrowUp") || JuiceboxEngine.Input.InputManager.Instance.IsMouseKeyHeld(JuiceboxEngine.Input.MouseKey.LeftMouse)) {
                    this.speed += 500 * JuiceboxEngine.Util.Time.DeltaTime;

                    if (this.speed > 0) {
                        this.reversing = false;
                    }
                } else if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("S") || JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("ArrowDown")) {
                    if (this.speed <= 0) {
                        this.speed -= 300 * JuiceboxEngine.Util.Time.DeltaTime;
                        this.reversing = true;
                    } else {
                        this.speed -= 850 * JuiceboxEngine.Util.Time.DeltaTime;
                    }
                } else {
                    if (this.reversing) {
                        this.speed += 300 * JuiceboxEngine.Util.Time.DeltaTime;
                    } else {
                        this.speed -= 300 * JuiceboxEngine.Util.Time.DeltaTime;
                    }
                }

                if (this.reversing) {
                    this.speed = JuiceboxEngine.Math.JMath.Clamp$1(this.speed, -this.maxSpeed, 0);
                } else {
                    this.speed = JuiceboxEngine.Math.JMath.Clamp$1(this.speed, 0, this.maxSpeed);
                }

                this._playerPhysics.AngularVelocity = 0;

                if (JuiceboxEngine.Math.JMath.Abs(this.speed) > 0.1) {
                    if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("D") || JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("ArrowRight")) {
                        this._playerPhysics.AngularVelocity = -JuiceboxEngine.Math.JMath.Interpolate(3, 2, (this.speed / this.maxSpeed));
                    } else if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("A") || JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("ArrowLeft")) {
                        this._playerPhysics.AngularVelocity = JuiceboxEngine.Math.JMath.Interpolate(3, 2, (this.speed / this.maxSpeed));
                    }

                    if (this.reversing) {
                        this._playerPhysics.AngularVelocity *= -1;
                    }
                }

                this._playerPhysics.Velocity = JuiceboxEngine.Math.Vector2.Rotate(new JuiceboxEngine.Math.Vector2.$ctor3(0, this.speed), this._playerPhysics.Rotation);

                if (!this.reversing) {
                    this._playerSprite.Rotation = JuiceboxEngine.Math.JMath.Interpolate(this._playerSprite.Rotation, this._playerPhysics.AngularVelocity, 5.0 * JuiceboxEngine.Util.Time.DeltaTime) * 0.8 * (this._playerPhysics.Velocity.Length() / this.maxSpeed);
                } else {
                    this._playerSprite.Rotation = JuiceboxEngine.Math.JMath.Interpolate(this._playerSprite.Rotation, 0, 5.0 * JuiceboxEngine.Util.Time.DeltaTime) * 0.8;
                }
            },
            ResetDrift: function () {
                this._driftTime = 0;
                this.Drifted = false;
            }
        }
    });

    H5.define("LD51.Program", {
        /**
         * Program entry point.
         *
         * @static
         * @private
         * @this LD51.Program
         * @memberof LD51.Program
         * @return  {void}
         */
        main: function Main () {
            var game = new JuiceboxEngine.JuiceboxGame();

            game.Run(new LD51.MainScene(game.ResourceManager));
        }
    });

    H5.define("LD51.ScoreUI", {
        inherits: [JuiceboxEngine.GUI.EmptyUIElement],
        fields: {
            _text: null,
            _score: 0,
            _displayedScore: 0
        },
        ctors: {
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, parent.Dimensions.Y / 2);
                this.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();
                this.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();

                this._score = 0;
                this._displayedScore = 0;

                this._text = new JuiceboxEngine.GUI.CanvasText(this);
                this._text.Dimensions = this.Dimensions.$clone();
                this._text.HorizontalAlignment = JuiceboxEngine.GUI.TextHorizontalAlignment.Center;
                this._text.VerticalAlignment = JuiceboxEngine.GUI.TextVerticalAlignment.Center;
                this._text.DisplayText = "0";
                this._text.Font = "AldotheApache";
                this._text.TextSize = 128;
                this._text.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();
                this._text.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();
                this._text.Scale = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5);
            }
        },
        methods: {
            AddScore: function (texts, scores) {
                this._score = (this._score + (System.Linq.Enumerable.from(scores, System.Int32).sum())) | 0;

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.AnimateScoreText(texts, scores));
            },
            AnimateScoreText: function (text, scores) {
                var $s = 0,
                    $jff,
                    $rv,
                    canvasTexts,
                    i,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    canvasTexts = System.Array.init(text.length, null, JuiceboxEngine.GUI.CanvasText);

                                        i = 0;
                                        $s = 1;
                                        continue;
                                }
                                case 1: {
                                    if ( i < text.length ) {
                                            $s = 2;
                                            continue;
                                        }
                                    $s = 5;
                                    continue;
                                }
                                case 2: {
                                    canvasTexts[i] = new JuiceboxEngine.GUI.CanvasText(this);
                                        canvasTexts[i].DisplayText = System.String.format("{0} +{1}", text[i], scores[i]);
                                        canvasTexts[i].TextSize = 32;
                                        canvasTexts[i].HorizontalAlignment = JuiceboxEngine.GUI.TextHorizontalAlignment.Center;
                                        canvasTexts[i].VerticalAlignment = JuiceboxEngine.GUI.TextVerticalAlignment.Center;
                                        canvasTexts[i].Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, 32);
                                        canvasTexts[i].Anchor = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                                        canvasTexts[i].Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                                        canvasTexts[i].Font = "AldotheApache";

                                        $en.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(this.ShowScoreText(canvasTexts[i], H5.Int.mul((((((text.length - i) | 0) - 1) | 0)), 32), text.length));
                                        $s = 3;
                                        return true;
                                }
                                case 3: {
                                    $s = 4;
                                    continue;
                                }
                                case 4: {
                                    i = (i + 1) | 0;
                                    $s = 1;
                                    continue;
                                }
                                case 5: {
                                    $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(0.5);
                                        $s = 6;
                                        return true;
                                }
                                case 6: {
                                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.ScoreAnimation(System.Linq.Enumerable.from(scores, System.Int32).sum()));

                                        $en.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.25, function (x) {
                                            for (var i1 = 0; i1 < canvasTexts.length; i1 = (i1 + 1) | 0) {
                                                canvasTexts[i1].Scale = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Vector2.Zero.$clone(), x);
                                                canvasTexts[i1].Anchor = JuiceboxEngine.Math.Vector2.Interpolate(JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone(), JuiceboxEngine.GUI.UIDefaults.Centered.$clone(), JuiceboxEngine.Math.Easings.QuadraticEaseOut(x));
                                            }
                                        }));
                                        $s = 7;
                                        return true;
                                }
                                case 7: {
                                    for (var i1 = 0; i1 < canvasTexts.length; i1 = (i1 + 1) | 0) {
                                            canvasTexts[i1].Remove();
                                        }

                                        canvasTexts = null;

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($ae1) {
                        $ae = System.Exception.create($ae1);
                        throw $ae;
                    }
                }));
                return $en;
            },
            ShowScoreText: function (text, height, totalItems) {
                var $s = 0,
                    $jff,
                    $rv,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    $en.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3 / totalItems, function (x) {
                                            text.Scale = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(0, 0), new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Easings.QuadraticEaseOut(x));
                                        }));
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    $en.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.2 / totalItems, function (x) {
                                            text.Position = JuiceboxEngine.Math.Vector2.Interpolate(JuiceboxEngine.Math.Vector2.Zero.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0, height), JuiceboxEngine.Math.Easings.QuadraticEaseOut(x));
                                        }));
                                        $s = 2;
                                        return true;
                                }
                                case 2: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($ae1) {
                        $ae = System.Exception.create($ae1);
                        throw $ae;
                    }
                }));
                return $en;
            },
            ScoreAnimation: function (addedScore) {
                var $s = 0,
                    $jff,
                    $rv,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    $en.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.25, H5.fn.bind(this, function (x) {
                                            this._text.Scale = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5), new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), x);
                                        })));
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    $en.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                                            this._displayedScore = (this._score + H5.Int.clip32(JuiceboxEngine.Math.JMath.Interpolate(0, addedScore, x))) | 0;
                                            this._text.DisplayText = H5.toString(this._displayedScore);
                                        })));
                                        $s = 2;
                                        return true;
                                }
                                case 2: {
                                    $en.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.25, H5.fn.bind(this, function (x) {
                                            this._text.Scale = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5), x);
                                        })));
                                        $s = 3;
                                        return true;
                                }
                                case 3: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($ae1) {
                        $ae = System.Exception.create($ae1);
                        throw $ae;
                    }
                }));
                return $en;
            },
            UpdateElement: function () {
                JuiceboxEngine.GUI.EmptyUIElement.prototype.UpdateElement.call(this);
                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, this.Parent.Dimensions.Y / 2);
            },
            SetScoreDisplay: function (score) {
                this._text.DisplayText = score;
            }
        }
    });

    H5.define("LD51.TimerUI", {
        inherits: [JuiceboxEngine.GUI.EmptyUIElement],
        fields: {
            _canvasTextTimer: null
        },
        ctors: {
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(256, 64);

                this._canvasTextTimer = new JuiceboxEngine.GUI.CanvasText(this);
                this._canvasTextTimer.DisplayText = " ";
                this._canvasTextTimer.Dimensions = this.Dimensions.$clone();
                this._canvasTextTimer.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._canvasTextTimer.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._canvasTextTimer.Font = "AldotheApache";
                this._canvasTextTimer.TextSize = 64;
                this._canvasTextTimer.Scale = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5);
            }
        },
        methods: {
            UpdateTime: function (time) {
                this._canvasTextTimer.DisplayText = System.TimeSpan.fromSeconds(time).toString("ss.fff");

                if (time < 3.0) {
                    this._canvasTextTimer.Color = JuiceboxEngine.Math.Color.Red.$clone();
                    this._canvasTextTimer.Scale = JuiceboxEngine.Math.Vector2.op_Addition(new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5), JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5), (1.0 - (time / 3.0))));
                } else {
                    this._canvasTextTimer.Color = JuiceboxEngine.Math.Color.White.$clone();
                    this._canvasTextTimer.Scale = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5);
                }
            },
            UpdateElement: function () {

            }
        }
    });
});
