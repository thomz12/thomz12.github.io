/**
 * @compiler H5 0.0.25007
 */
H5.assemblyVersion("LD50","1.0.0.0");
H5.assembly("LD50", function ($asm, globals) {
    "use strict";

    H5.define("LD50.Circle", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new LD50.Circle(); }
            }
        },
        fields: {
            Center: null,
            Radius: 0
        },
        ctors: {
            init: function () {
                this.Center = new JuiceboxEngine.Math.Vector2();
            },
            $ctor1: function (center, radius) {
                this.$initialize();
                this.Center = center.$clone();
                this.Radius = radius;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = H5.addHash([1668468399, this.Center, this.Radius]);
                return h;
            },
            equals: function (o) {
                if (!H5.is(o, LD50.Circle)) {
                    return false;
                }
                return H5.equals(this.Center, o.Center) && H5.equals(this.Radius, o.Radius);
            },
            $clone: function (to) {
                var s = to || new LD50.Circle();
                s.Center = this.Center.$clone();
                s.Radius = this.Radius;
                return s;
            }
        }
    });

    H5.define("LD50.Dish", {
        fields: {
            Name: null,
            Mass: 0,
            SpriteOffset: null,
            SourceRectangle: null,
            BoundingBoxes: null,
            Circles: null
        },
        ctors: {
            init: function () {
                this.SpriteOffset = new JuiceboxEngine.Math.Vector2();
                this.SourceRectangle = new JuiceboxEngine.Math.Rectangle();
            }
        }
    });

    H5.define("LD50.Dishes", {
        statics: {
            fields: {
                DishList: null
            },
            ctors: {
                init: function () {
                    var $t;
                    this.DishList = System.Array.init([($t = new LD50.Dish(), $t.Name = "Plate", $t.Mass = 1.0, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, -8), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, 16, 16), $t.BoundingBoxes = System.Array.init([], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([new LD50.Circle.$ctor1(new JuiceboxEngine.Math.Vector2.$ctor3(0, 0), 8)], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Pan", $t.Mass = 1.5, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-14, -8), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(16, 0, 28, 16), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(6, 0, 12, 4)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([new LD50.Circle.$ctor1(new JuiceboxEngine.Math.Vector2.$ctor3(-6, 0), 8)], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Fork", $t.Mass = 0.3, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-3.0, -7.0), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(48, 3, 6, 14), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(0, 0, 5, 11)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Cup", $t.Mass = 0.5, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-6, -5), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(64, 6, 12, 10), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(-1, 0, 10, 9)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([], LD50.Circle), $t)], LD50.Dish);
                }
            }
        }
    });

    /** @namespace LD50 */

    /**
     * Example of a scene.
     *
     * @class LD50.MainScene
     * @augments JuiceboxEngine.Scene
     */
    H5.define("LD50.MainScene", {
        inherits: [JuiceboxEngine.Scene],
        fields: {
            _counter: null,
            _dishes: null,
            _aiming: false,
            _aimingObject: null,
            _dishMass: 0
        },
        ctors: {
            /**
             * Scene constructor, not for any game setup.
             Use {@link } instead.
             *
             * @instance
             * @public
             * @this LD50.MainScene
             * @memberof LD50.MainScene
             * @param   {JuiceboxEngine.Resources.ResourceManager}    manager    The resource manager to use for this scene.
             * @return  {void}
             */
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);
                this._dishes = new (System.Collections.Generic.List$1(JuiceboxEngine.GameObject)).ctor();
            }
        },
        methods: {
            /**
             * Initialize the scene. Game objects can be accessed and created here.
             *
             * @instance
             * @protected
             * @override
             * @this LD50.MainScene
             * @memberof LD50.MainScene
             * @return  {void}
             */
            InitializeScene: function () {
                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(30, 144, 255, 255);
                this.DefaultCamera.Zoom = 4;

                this.LoadLevel(this.ResourceManager.Load(JuiceboxEngine.Level, "Levels/Main.json"));

                this.DefaultCamera.Parent.Transform.Position2D = this.GetObjectByName("CameraPosition").Transform.Position2D.$clone();

                this._counter = this.GetObjectByName("Counter");
                this._aiming = true;
            },
            /**
             * Called every frame, before any gameobject updates.
             *
             * @instance
             * @protected
             * @override
             * @this LD50.MainScene
             * @memberof LD50.MainScene
             * @return  {void}
             */
            PreUpdate: function () {
                if (this._aiming) {
                    if (this._aimingObject == null) {
                        this._aimingObject = this.CreateDish();
                    }

                    var body = this._aimingObject.GetComponent(JuiceboxEngine.Physics.BodyP2);

                    if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("a")) {
                        body.Position = (JuiceboxEngine.Math.Vector2.op_Addition(body.Position.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(-64 * JuiceboxEngine.Util.Time.DeltaTime, 0)));
                    }
                    if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("d")) {
                        body.Position = (JuiceboxEngine.Math.Vector2.op_Addition(body.Position.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(64 * JuiceboxEngine.Util.Time.DeltaTime, 0)));
                    }
                    if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("r")) {
                        body.Rotation += 6.2831855 * JuiceboxEngine.Util.Time.DeltaTime;
                    }

                    if (JuiceboxEngine.Input.InputManager.Instance.IsKeyUp(" ")) {
                        body.Mass = this._dishMass;
                        body.Velocity = new JuiceboxEngine.Math.Vector2.$ctor3(0, -20);

                        this._aiming = false;
                        this._dishMass = 0;
                    }
                } else {
                    if (this._aimingObject != null) {
                        if (this._aimingObject.GetComponent(JuiceboxEngine.Physics.BodyP2).Sleeping) {
                            this._aiming = true;
                            this._aimingObject = null;
                        }
                    }
                }
            },
            CreateDish: function () {
                var $t, $t1;
                var dish = LD50.Dishes.DishList[JuiceboxEngine.Util.Random.NextRange(0, LD50.Dishes.DishList.length)];

                var dishObj = this.AddGameObject$1(dish.Name);
                dishObj.Transform.Position2D = JuiceboxEngine.Math.Vector2.op_Addition(this.DefaultCamera.Parent.Transform.Position2D.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Util.Random.NextRange(-8, 8), 64));

                var sprite = dishObj.AddComponent(JuiceboxEngine.Sprite);
                sprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Dishes.png");
                sprite.SourceRectangle = dish.SourceRectangle.$clone();
                sprite.Offset = dish.SpriteOffset.$clone();

                var body = dishObj.AddComponent(JuiceboxEngine.Physics.BodyP2);
                body.Mass = 0;
                this._dishMass = dish.Mass;

                for (var i = 0; i < dish.Circles.length; i = (i + 1) | 0) {
                    var circle = ($t = dish.Circles)[i].$clone();
                    body.AddCircle(circle.Radius, circle.Center.$clone());
                }

                for (var i1 = 0; i1 < dish.BoundingBoxes.length; i1 = (i1 + 1) | 0) {
                    var rect = ($t1 = dish.BoundingBoxes)[i1].$clone();
                    body.AddRectangle(rect.$clone());
                }

                this._dishes.add(dishObj);

                return dishObj;
            },
            DebugBodyShape: function (body) {
                var rect = body.GetAABB();
                JuiceboxEngine.Debugging.DebugRenderer.Instance.DrawRect(rect.$clone(), JuiceboxEngine.Math.Color.Red.$clone(), 1);
                JuiceboxEngine.Debugging.DebugRenderer.Instance.DrawRectFilled(new JuiceboxEngine.Math.RectangleF.$ctor1(JuiceboxEngine.Math.Vector2.op_Subtraction(body.Parent.Transform.Position2D.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(1, 1)), 2, 2), JuiceboxEngine.Math.Color.Blue.$clone());
            },
            /**
             * Called every frame, after all gameobject had an update.
             *
             * @instance
             * @protected
             * @override
             * @this LD50.MainScene
             * @memberof LD50.MainScene
             * @return  {void}
             */
            LateUpdate: function () {
                var $t;
                if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("h")) {
                    this.DebugBodyShape(this._counter.GetComponent(JuiceboxEngine.Physics.BodyP2));

                    $t = H5.getEnumerator(this._dishes);
                    try {
                        while ($t.moveNext()) {
                            var dish = $t.Current;
                            this.DebugBodyShape(dish.GetComponent(JuiceboxEngine.Physics.BodyP2));
                        }
                    } finally {
                        if (H5.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }
            },
            /**
             * Called when the scene is about to be destroyed.
             *
             * @instance
             * @protected
             * @override
             * @this LD50.MainScene
             * @memberof LD50.MainScene
             * @return  {void}
             */
            FinalizeScene: function () {

            }
        }
    });

    /**
     * Handles user sign-in or account creation.
     *
     * @class LD50.PlayfabSignin
     */
    H5.define("LD50.PlayfabSignin", {
        fields: {
            _loginID: null,
            _currentState: 0
        },
        events: {
            OnStateChange: null,
            OnUsernameChanged: null
        },
        props: {
            /**
             * Current login state.
             *
             * @instance
             * @memberof LD50.PlayfabSignin
             * @function CurrentState
             * @type number
             */
            CurrentState: {
                get: function () {
                    return this._currentState;
                },
                set: function (value) {
                    this._currentState = value;
                    !H5.staticEquals(this.OnStateChange, null) ? this.OnStateChange(this._currentState) : null;
                }
            }
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @this LD50.PlayfabSignin
             * @memberof LD50.PlayfabSignin
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this._currentState = LD50.PlayfabSignin.LoginState.NONE;
            }
        },
        methods: {
            /**
             * Login to playfab with stored login ID.
             *
             * @instance
             * @this LD50.PlayfabSignin
             * @memberof LD50.PlayfabSignin
             * @return  {void}
             */
            AutoLogin: function () {
                this._loginID = JuiceboxEngine.Util.LocalStorage.GetValue("login_id");

                if (this._loginID == null) {
                    this._loginID = System.Guid.NewGuid().toString();

                    System.Console.WriteLine("Registering with Playfab...");
                    this.CurrentState = LD50.PlayfabSignin.LoginState.REGISTERING;

                    JuiceboxEngine.Playfab.PlayfabManager.Identity.LoginWithCustomID(this._loginID, true);
                } else {
                    System.Console.WriteLine("Logging in with Playfab...");
                    this.CurrentState = LD50.PlayfabSignin.LoginState.REGISTERING;

                    JuiceboxEngine.Playfab.PlayfabManager.Identity.LoginWithCustomID(this._loginID, false);
                }

                JuiceboxEngine.Playfab.PlayfabManager.Identity.LoginTask.addOnTaskCompleted(H5.fn.cacheBind(this, this.LoginFinished));
            },
            /**
             * Change name of signed in user.
             {@link } has to be {@link }
             *
             * @instance
             * @this LD50.PlayfabSignin
             * @memberof LD50.PlayfabSignin
             * @param   {string}    username
             * @return  {void}
             */
            ChangeName: function (username) {
                if (this.CurrentState !== LD50.PlayfabSignin.LoginState.SIGNED_IN) {
                    System.Console.WriteLine("Can't change name, user is not signed in.");
                }

                System.Console.WriteLine(System.String.format("Attempting to update username to {0}", [username]));

                var task = JuiceboxEngine.Playfab.PlayfabManager.Identity.UpdateDisplayName(username);
                task.addOnTaskCompleted(H5.fn.cacheBind(this, this.UpdateUsername));
            },
            /**
             * Called when sign-in finished.
             *
             * @instance
             * @private
             * @this LD50.PlayfabSignin
             * @memberof LD50.PlayfabSignin
             * @param   {JuiceboxEngine.Playfab.PlayfabTask}    task    The finished playfab task.
             * @return  {void}
             */
            LoginFinished: function (task) {
                if (task.Success) {
                    JuiceboxEngine.Util.LocalStorage.StoreValue("login_id", this._loginID);

                    System.Console.WriteLine(System.String.format("Logged in with Playfab! {0}", [JuiceboxEngine.Playfab.PlayfabManager.Identity.Username]));
                    this.CurrentState = LD50.PlayfabSignin.LoginState.SIGNED_IN;
                } else {
                    this.CurrentState = LD50.PlayfabSignin.LoginState.ERROR;
                    System.Console.WriteLine("Failed to log in with Playfab.");
                }
            },
            /**
             * Called when username update finished.
             *
             * @instance
             * @private
             * @this LD50.PlayfabSignin
             * @memberof LD50.PlayfabSignin
             * @param   {JuiceboxEngine.Playfab.PlayfabTask}    task    The finished playfab task.
             * @return  {void}
             */
            UpdateUsername: function (task) {
                !H5.staticEquals(this.OnUsernameChanged, null) ? this.OnUsernameChanged(task.Success, task.ErrorMessage) : null;
            }
        }
    });

    /**
     * Sign-in states.
     *
     * @class number
     */
    H5.define("LD50.PlayfabSignin.LoginState", {
        $kind: "nested enum",
        statics: {
            fields: {
                NONE: 0,
                SIGNED_OUT: 1,
                SIGNED_IN: 2,
                REGISTERING: 3,
                SIGNING_IN: 4,
                ERROR: 5
            }
        }
    });

    H5.define("LD50.Program", {
        /**
         * Program entry point.
         *
         * @static
         * @private
         * @this LD50.Program
         * @memberof LD50.Program
         * @return  {void}
         */
        main: function Main () {
            var game = new JuiceboxEngine.JuiceboxGame();

            game.Run(new LD50.MainScene(game.ResourceManager));
        }
    });
});
