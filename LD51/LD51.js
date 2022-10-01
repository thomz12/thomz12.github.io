/**
 * @compiler H5 0.0.25007
 */
H5.assemblyVersion("LD51","1.0.0.0");
H5.assembly("LD51", function ($asm, globals) {
    "use strict";

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
            _controller: null,
            _playerSprite: null,
            _timerUI: null,
            _timer: 0,
            _hasControl: false,
            _topPanel: null,
            _bottomPanel: null
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
                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(30, 144, 255, 255);
                this.DefaultCamera.Zoom = 1;

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(true);

                var level = this.ResourceManager.Load(JuiceboxEngine.Level, "Levels/CityMap.json");
                level.LoadToScene(this);

                this.PhysicsWorld.Gravity = new JuiceboxEngine.Math.Vector2.$ctor3(0, 0);
                var wallPlayerMaterial = this.PhysicsWorld.CreateContactMaterial(new JuiceboxEngine.Physics.P2Material.$ctor1("wall"), new JuiceboxEngine.Physics.P2Material.$ctor1("player"));
                wallPlayerMaterial.Friction = 0.0;

                this._player = this.GetGameObjectByName("Player");
                this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).addOnCollisionStay(H5.fn.cacheBind(this, this.PlayerCollisionStay));
                this._controller = new LD51.PlayerController(this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent));
                this._playerSprite = this._player.GetComponent(JuiceboxEngine.Components.LayeredSpriteComponent);

                this._timerUI = new LD51.TimerUI(this.GUI.Root);
                this._timerUI.Anchor = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._timerUI.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._timerUI.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -8);

                this.DefaultCamera.GameObject.Transform.Position2D = this._player.Transform.Position2D.$clone();

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

                this.StartGame();
            },
            PlayerCollisionStay: function (thisBody, otherBody) {
                if (this._hasControl) {
                    if (System.String.equals(otherBody.GameObject.Name, "Person")) {
                        this.TryGiveIceCream(otherBody.GameObject.GetComponent(LD51.PersonComponent));
                    } else if (System.String.equals(otherBody.GameObject.Name, "Restock")) {
                    }
                }
            },
            TryGiveIceCream: function (person) {
                if (person.WantsIcecream) {
                    if (this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).Velocity.Length() < 0.1) {
                        person.GiveIceCream();

                        this._timer = LD51.MainScene.ICE_SMELT_TIME;

                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.FocusCamera());
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
                                            this.DefaultCamera.Zoom = 1 + JuiceboxEngine.Math.Easings.QuadraticEaseOut(x);
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
                                            this.DefaultCamera.Zoom = 1 + JuiceboxEngine.Math.Easings.QuarticEaseIn(1.0 - x);
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
                    this._timerUI.Enabled = true;
                } else {
                    this._timerUI.Enabled = false;
                }

                if (this._timer < 0.0) {
                    this._hasControl = false;
                }

                if (this._hasControl) {
                    this._controller.Update();
                }

                this._playerSprite.Size = JuiceboxEngine.Math.Vector2.op_Addition(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.JMath.Sin(JuiceboxEngine.Util.Time.TotalSeconds * 50)), 0.02), (this._controller.speed / this._controller.maxSpeed)));
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
                if (JuiceboxEngine.Util.Time.DeltaTime > 0.02) {
                    JuiceboxEngine.Util.Log.LogInfo("Frame time is high!");
                }

                this.DefaultCamera.GameObject.Transform.Position2D = JuiceboxEngine.Math.Vector2.Interpolate(this.DefaultCamera.GameObject.Transform.Position2D.$clone(), JuiceboxEngine.Math.Vector2.op_Addition(this._player.Transform.Position2D.$clone(), (JuiceboxEngine.Math.Vector2.op_Multiply$1(this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).Velocity.$clone(), 0.25))), 5.0 * JuiceboxEngine.Util.Time.DeltaTime);
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
            _setup: false
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
            },
            Update: function () {
                JuiceboxEngine.Components.Component.prototype.Update.call(this);

                if (!this._setup) {
                    var sprite = this.GameObject.GetComponent(JuiceboxEngine.Components.SpriteComponent);
                    sprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(H5.Int.mul(JuiceboxEngine.Math.RandomNumbers.NextRange(0, 4), LD51.PersonComponent.PERSON_DIMENSIONS), H5.Int.mul(JuiceboxEngine.Math.RandomNumbers.NextRange(0, 4), LD51.PersonComponent.PERSON_DIMENSIONS), LD51.PersonComponent.PERSON_DIMENSIONS, LD51.PersonComponent.PERSON_DIMENSIONS);

                    var image = new JuiceboxEngine.GUI.Image(this.GameObject.Scene.GUI.Root);
                    image.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();
                    image.DisplayImage = this.GameObject.Scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/IceCreamRequest.png");
                    image.Dimensions = JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(image.DisplayImage.Width, image.DisplayImage.Height), this.GameObject.Scene.DefaultCamera.Zoom), JuiceboxEngine.Util.Config.ConfigValues.PixelSize);
                    image.Enabled = false;

                    this._ui.UIElement = image;

                    this.WantsIceCream();

                    this._setup = true;
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
                    JuiceboxEngine.Util.Log.LogInfo("Sold!");
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

    H5.define("LD51.PlayerController", {
        fields: {
            _playerPhysics: null,
            _playerSprite: null,
            speed: 0,
            maxSpeed: 0,
            reversing: false
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

                if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("W")) {
                    this.speed += 500 * JuiceboxEngine.Util.Time.DeltaTime;

                    if (this.speed > 0) {
                        this.reversing = false;
                    }
                } else if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("S")) {
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
                    if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("D")) {
                        this._playerPhysics.AngularVelocity = -JuiceboxEngine.Math.JMath.Interpolate(3, 2, (this.speed / this.maxSpeed));
                    } else if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("A")) {
                        this._playerPhysics.AngularVelocity = JuiceboxEngine.Math.JMath.Interpolate(3, 2, (this.speed / this.maxSpeed));
                    }

                    if (this.reversing) {
                        this._playerPhysics.AngularVelocity *= -1;
                    }
                }

                this._playerPhysics.Velocity = JuiceboxEngine.Math.Vector2.Rotate(new JuiceboxEngine.Math.Vector2.$ctor3(0, this.speed), this._playerPhysics.Rotation);

                if (!this.reversing) {
                    this._playerSprite.Rotation = JuiceboxEngine.Math.JMath.Interpolate(this._playerSprite.Rotation, this._playerPhysics.AngularVelocity, 5.0 * JuiceboxEngine.Util.Time.DeltaTime) * 0.8 * (this.speed / this.maxSpeed);
                } else {
                    this._playerSprite.Rotation = JuiceboxEngine.Math.JMath.Interpolate(this._playerSprite.Rotation, 0, 5.0 * JuiceboxEngine.Util.Time.DeltaTime) * 0.8;
                }
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
                this._canvasTextTimer.DisplayText = "10:00.000";
                this._canvasTextTimer.Dimensions = this.Dimensions.$clone();
                this._canvasTextTimer.Font = "AldotheApache";
                this._canvasTextTimer.TextSize = 32;
            }
        },
        methods: {
            UpdateTime: function (time) {
                this._canvasTextTimer.DisplayText = System.TimeSpan.fromSeconds(time).toString("ss.fff");
            },
            UpdateElement: function () {

            }
        }
    });
});
