/**
 * @compiler H5 0.0.25007
 */
H5.assemblyVersion("LD51","1.0.0.0");
H5.assembly("LD51", function ($asm, globals) {
    "use strict";

    H5.define("LD51.IceDisplay", {
        inherits: [JuiceboxEngine.GUI.EmptyUIElement],
        fields: {
            /**
             * Current amount of ice available.
             *
             * @instance
             * @public
             * @memberof LD51.IceDisplay
             * @function CurrentIce
             * @type number
             */
            CurrentIce: 0,
            /**
             * Total amount of ice icons.
             *
             * @instance
             * @public
             * @memberof LD51.IceDisplay
             * @function TotalIce
             * @type number
             */
            TotalIce: 0
        },
        ctors: {
            ctor: function (parent, maxIce) {
                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(256, 64);

                this.TotalIce = maxIce;
                this.CurrentIce = this.TotalIce;

                for (var i = 0; i < this.TotalIce; i = (i + 1) | 0) {
                    var icon = new JuiceboxEngine.GUI.Image(this);
                    icon.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/IceIcon.png");
                    icon.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                    icon.Anchor = JuiceboxEngine.GUI.UIDefaults.CenterLeft.$clone();
                    icon.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this.Dimensions.Y, this.Dimensions.Y);
                    icon.Position = new JuiceboxEngine.Math.Vector2.$ctor3((i * this.Dimensions.X / this.TotalIce) + (this.Dimensions.Y / 2), 0);
                    icon.Enabled = false;
                }

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.Show());
            }
        },
        methods: {
            Show: function () {
                var $s = 0,
                    $jff,
                    $rv,
                    i,
                    icon,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(2.0);
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    i = 0;
                                        $s = 2;
                                        continue;
                                }
                                case 2: {
                                    if ( i < this.TotalIce ) {
                                            $s = 3;
                                            continue;
                                        }
                                    $s = 6;
                                    continue;
                                }
                                case 3: {
                                    icon = { v : this.Children.getItem(i) };

                                        icon.v.Enabled = true;
                                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, (function ($me, icon) {
                                            return function (x) {
                                                icon.v.Scale = JuiceboxEngine.Math.Vector2.Interpolate(JuiceboxEngine.Math.Vector2.Zero.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.Easings.QuadraticEaseOut(x));
                                            };
                                        })(this, icon)));

                                        $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(0.1);
                                        $s = 4;
                                        return true;
                                }
                                case 4: {
                                    $s = 5;
                                    continue;
                                }
                                case 5: {
                                    i = (i + 1) | 0;
                                    $s = 2;
                                    continue;
                                }
                                case 6: {

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
                for (var i = 0; i < this.TotalIce; i = (i + 1) | 0) {
                    var icon = this.Children.getItem(i);
                    icon.Enabled = i < this.CurrentIce;
                }
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
                ICE_SMELT_TIME: 0,
                ICE_MAX_AMOUNT: 0
            },
            ctors: {
                init: function () {
                    this.ICE_SMELT_TIME = 10.0;
                    this.ICE_MAX_AMOUNT = 8;
                }
            }
        },
        fields: {
            _player: null,
            _controller: null,
            _playerSprite: null,
            _iceDisplay: null,
            _iceCream: 0,
            _timer: 0
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

                this._iceDisplay = new LD51.IceDisplay(this.GUI.Root, LD51.MainScene.ICE_MAX_AMOUNT);
                this._iceDisplay.Anchor = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._iceDisplay.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._iceDisplay.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -8);

                this.DefaultCamera.GameObject.Transform.Position2D = this._player.Transform.Position2D.$clone();

                this.StartGame();
            },
            PlayerCollisionStay: function (thisBody, otherBody) {
                if (System.String.equals(otherBody.GameObject.Name, "Person")) {
                    this.TryGiveIceCream(otherBody.GameObject.GetComponent(LD51.PersonComponent));
                } else if (System.String.equals(otherBody.GameObject.Name, "Restock")) {
                    if (thisBody.Velocity.Length() < 0.1) {
                        this._iceCream = LD51.MainScene.ICE_MAX_AMOUNT;
                        this.UpdateIceDisplay();
                    }
                }
            },
            TryGiveIceCream: function (person) {
                if (person.WantsIcecream) {
                    if (this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).Velocity.Length() < 0.1) {
                        if (this._iceCream > 0) {
                            person.GiveIceCream();
                            this._iceCream = (this._iceCream - 1) | 0;
                            this.UpdateIceDisplay();
                        }
                    }
                }
            },
            StartGame: function () {
                this._iceCream = LD51.MainScene.ICE_MAX_AMOUNT;
                this._timer = LD51.MainScene.ICE_SMELT_TIME;
            },
            UpdateIceDisplay: function () {
                this._iceDisplay.CurrentIce = this._iceCream;
                this._iceDisplay.ForceUpdate();
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
                this._timer -= JuiceboxEngine.Util.Time.DeltaTime;

                if (this._timer < 0.0) {
                    this._timer = LD51.MainScene.ICE_SMELT_TIME;

                    if (this._iceCream > 0) {
                        this._iceCream = (this._iceCream - 1) | 0;
                        this.UpdateIceDisplay();
                    }
                }

                this._controller.Update();
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
                PERSON_DIMENSIONS: 0,
                PERSON_ICECREAM_MIN_WAIT: 0,
                PERSON_ICECREAM_MAX_WAIT: 0
            },
            ctors: {
                init: function () {
                    this.PERSON_DIMENSIONS = 16;
                    this.PERSON_ICECREAM_MIN_WAIT = 20.0;
                    this.PERSON_ICECREAM_MAX_WAIT = 120.0;
                }
            }
        },
        fields: {
            WanderDistance: null,
            WantsIcecream: false,
            _ui: null,
            _setup: false,
            _iceTimer: 0
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
                    this._ui.UIElement = image;

                    this.GiveIceCream();

                    this._setup = true;
                }

                this._iceTimer -= JuiceboxEngine.Util.Time.DeltaTime;

                if (this._iceTimer < 0.0 && !this.WantsIcecream) {
                    this._ui.UIElement.Enabled = true;
                    this.WantsIcecream = true;
                }
            },
            GiveIceCream: function () {
                JuiceboxEngine.Util.Log.LogInfo("Sold!");
                this.WantsIcecream = false;
                this._ui.UIElement.Enabled = false;
                this._iceTimer = JuiceboxEngine.Math.RandomNumbers.NextRange$1(LD51.PersonComponent.PERSON_ICECREAM_MIN_WAIT, LD51.PersonComponent.PERSON_ICECREAM_MAX_WAIT);
            },
            Destroy: function () {

            }
        }
    });

    H5.define("LD51.PlayerController", {
        fields: {
            _playerPhysics: null,
            speed: 0,
            maxSpeed: 0,
            reversing: false
        },
        ctors: {
            ctor: function (playerPhysics) {
                this.$initialize();
                this._playerPhysics = playerPhysics;
                this._playerPhysics.Damping = 0.9;

                this.speed = 0;
                this.maxSpeed = 300;
                this.reversing = false;
            }
        },
        methods: {
            Update: function () {
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
});
