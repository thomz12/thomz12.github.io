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
                    this.DishList = System.Array.init([($t = new LD50.Dish(), $t.Name = "Plate", $t.Mass = 1.0, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, -8), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, 16, 16), $t.BoundingBoxes = System.Array.init([], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([new LD50.Circle.$ctor1(new JuiceboxEngine.Math.Vector2.$ctor3(0, 0), 8)], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Pan", $t.Mass = 1.5, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-14, -8), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(16, 0, 28, 16), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(6, 0, 12, 4)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([new LD50.Circle.$ctor1(new JuiceboxEngine.Math.Vector2.$ctor3(-6, 0), 8)], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Fork", $t.Mass = 0.3, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-3.0, -7.0), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(96, 3, 6, 14), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(0, 0, 5, 11)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Cup", $t.Mass = 0.5, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-6, -5), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(192, 6, 12, 10), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(-1, 0, 10, 9)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Ladle", $t.Mass = 0.4, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-2, -6), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(112, 0, 6, 16), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(0, 2, 4, 16)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Pot", $t.Mass = 1.5, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, -8), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(288, 0, 16, 16), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(0, 0, 15, 15)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Glass", $t.Mass = 0.4, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-4.5, -7.5), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(208, 3, 9, 13), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(0, 0, 9, 13)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Roller", $t.Mass = 0.8, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-2.5, -8.0), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(144, 0, 5, 16), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(0, 0, 4, 15)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([], LD50.Circle), $t), ($t = new LD50.Dish(), $t.Name = "Knife", $t.Mass = 1.0, $t.SpriteOffset = new JuiceboxEngine.Math.Vector2.$ctor3(-4.5, -11.0), $t.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(128, 0, 9, 16), $t.BoundingBoxes = System.Array.init([new JuiceboxEngine.Math.RectangleF.$ctor2(0, 0, 8.0, 9.0), new JuiceboxEngine.Math.RectangleF.$ctor2(2.5, -8, 3.0, 7.0)], JuiceboxEngine.Math.RectangleF), $t.Circles = System.Array.init([], LD50.Circle), $t)], LD50.Dish);
                }
            }
        }
    });

    H5.define("LD50.JuiceUI.JuiceUIPanel", {
        inherits: [JuiceboxEngine.GUI.EmptyUIElement],
        fields: {
            _front: null,
            _back: null,
            _height: 0
        },
        props: {
            /**
             * How far the panels are out from each other.
             *
             * @instance
             * @public
             * @memberof LD50.JuiceUI.JuiceUIPanel
             * @function Height
             * @type number
             */
            Height: {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this.ForceUpdate();
                }
            }
        },
        ctors: {
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this._back = new JuiceboxEngine.GUI.SlicedImage(this);
                this._front = new JuiceboxEngine.GUI.SlicedImage(this);

                this._back.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, LD50.JuiceUI.JuiceUIConsts.PANEL_TEXTURE_PATH);
                this._front.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, LD50.JuiceUI.JuiceUIConsts.PANEL_TEXTURE_PATH);

                this._back.Border = LD50.JuiceUI.JuiceUIConsts.PANEL_BORDER_WIDTH;
                this._front.Border = LD50.JuiceUI.JuiceUIConsts.PANEL_BORDER_WIDTH;

                this._height = LD50.JuiceUI.JuiceUIConsts.PANEL_OFFSET;

                this._back.Color = LD50.JuiceUI.JuiceUIConsts.PANEL_BACK.$clone();
                this._front.Color = LD50.JuiceUI.JuiceUIConsts.PANEL_FRONT.$clone();
            }
        },
        methods: {
            UpdateElement: function () {
                JuiceboxEngine.GUI.EmptyUIElement.prototype.UpdateElement.call(this);

                this._back.Position = new JuiceboxEngine.Math.Vector2.$ctor3(this.Height, -this.Height);
                this._front.Position = new JuiceboxEngine.Math.Vector2.$ctor3(-this.Height, this.Height);

                this._back.Dimensions = this.Dimensions.$clone();
                this._front.Dimensions = this.Dimensions.$clone();
            }
        }
    });

    H5.define("LD50.JuiceUI.JuiceUIConsts", {
        statics: {
            fields: {
                /**
                 * Default 32 size font.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof LD50.JuiceUI.JuiceUIConsts
                 * @default "JuiceUI/AldotheApache32.bff"
                 * @type string
                 */
                FONT_32_PATH: null,
                /**
                 * Default 48 size font.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof LD50.JuiceUI.JuiceUIConsts
                 * @default "JuiceUI/AldotheApache48.bff"
                 * @type string
                 */
                FONT_48_PATH: null,
                /**
                 * Default shadow offset.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof LD50.JuiceUI.JuiceUIConsts
                 * @type JuiceboxEngine.Math.Point
                 */
                FONT_SHADOW_OFFSET: null,
                /**
                 * Panel image for UI.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof LD50.JuiceUI.JuiceUIConsts
                 * @default "JuiceUI/Panel.png"
                 * @type string
                 */
                PANEL_TEXTURE_PATH: null,
                /**
                 * Border of panel image.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof LD50.JuiceUI.JuiceUIConsts
                 * @default 5
                 * @type number
                 */
                PANEL_BORDER_WIDTH: 0,
                /**
                 * Offset of two panel images from each other.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof LD50.JuiceUI.JuiceUIConsts
                 * @default 2.0
                 * @type number
                 */
                PANEL_OFFSET: 0,
                /**
                 * Default panel front color.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof LD50.JuiceUI.JuiceUIConsts
                 * @type JuiceboxEngine.Math.Color
                 */
                PANEL_FRONT: null,
                /**
                 * Default panel back color.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof LD50.JuiceUI.JuiceUIConsts
                 * @type JuiceboxEngine.Math.Color
                 */
                PANEL_BACK: null
            },
            ctors: {
                init: function () {
                    this.FONT_SHADOW_OFFSET = new JuiceboxEngine.Math.Point();
                    this.PANEL_FRONT = new JuiceboxEngine.Math.Color();
                    this.PANEL_BACK = new JuiceboxEngine.Math.Color();
                    this.FONT_32_PATH = "JuiceUI/AldotheApache32.bff";
                    this.FONT_48_PATH = "JuiceUI/AldotheApache48.bff";
                    this.FONT_SHADOW_OFFSET = new JuiceboxEngine.Math.Point.$ctor1(2, -2);
                    this.PANEL_TEXTURE_PATH = "JuiceUI/Panel.png";
                    this.PANEL_BORDER_WIDTH = 5;
                    this.PANEL_OFFSET = 2.0;
                    this.PANEL_FRONT = new JuiceboxEngine.Math.Color.$ctor2(252, 163, 17, 255);
                    this.PANEL_BACK = new JuiceboxEngine.Math.Color.$ctor2(43, 44, 40, 255);
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
        statics: {
            fields: {
                MIN_DIST: 0
            },
            ctors: {
                init: function () {
                    this.MIN_DIST = 48;
                }
            }
        },
        fields: {
            _counter: null,
            _dishes: null,
            _highestPoint: 0,
            _curHeight: 0,
            _aiming: false,
            _moving: false,
            _aimingObject: null,
            _dishMass: 0,
            _scoreText: null
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
                this._dishes = new (System.Collections.Generic.List$1(JuiceboxEngine.Physics.BodyP2)).ctor();
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

                this._scoreText = new JuiceboxEngine.GUI.Text(this.GUI.Root);
                this._scoreText.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, LD50.JuiceUI.JuiceUIConsts.FONT_48_PATH);
                this._scoreText.DisplayText = "";
                this._scoreText.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(2000, 48);
                this._scoreText.Pivot = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 0.0);
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
                    body.Position = new JuiceboxEngine.Math.Vector2.$ctor3(body.Position.X, this.DefaultCamera.Parent.Transform.Position2D.Y + 48);

                    if (JuiceboxEngine.Input.InputManager.Instance.IsMouseKeyHeld(JuiceboxEngine.Input.MouseKey.LeftMouse) && JuiceboxEngine.Input.InputManager.Instance.MousePosition.Y > 0.4 || this._moving) {
                        var world = this.DefaultCamera.ScreenPointToWorld(JuiceboxEngine.Input.InputManager.Instance.MousePosition.$clone());
                        body.Position = new JuiceboxEngine.Math.Vector2.$ctor3(world.X, body.Position.Y);
                        this._moving = true;
                    }

                    if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld(" ") || (JuiceboxEngine.Input.InputManager.Instance.IsMouseKeyHeld(JuiceboxEngine.Input.MouseKey.LeftMouse) && JuiceboxEngine.Input.InputManager.Instance.MousePosition.Y < 0.2)) {
                        body.Rotation += 6.2831855 * JuiceboxEngine.Util.Time.DeltaTime;
                    }

                    if (JuiceboxEngine.Input.InputManager.Instance.IsMouseKeyUp(JuiceboxEngine.Input.MouseKey.LeftMouse) && this._moving) {
                        body.Mass = this._dishMass;
                        body.Velocity = new JuiceboxEngine.Math.Vector2.$ctor3(0, -20);

                        this._aiming = false;
                        this._moving = false;
                        this._dishMass = 0;
                    }
                } else {
                    if (this._aimingObject != null) {
                        if (this._aimingObject.GetComponent(JuiceboxEngine.Physics.BodyP2).Sleeping) {
                            this._aiming = true;
                            this._aimingObject.GetComponent(JuiceboxEngine.Physics.BodyP2).Type = 2;
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

                this._dishes.add(body);

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
                this._highestPoint = this.GetHighestPoint();
                var camPos = this.DefaultCamera.Parent.Transform.Position2D.$clone();

                if (this._curHeight < LD50.MainScene.MIN_DIST) {
                    this._curHeight = LD50.MainScene.MIN_DIST;
                }

                var interpolatedHeight = JuiceboxEngine.Math.JMath.Interpolate(this._curHeight, this._highestPoint, 3.0 * JuiceboxEngine.Util.Time.DeltaTime);
                this._curHeight = interpolatedHeight;

                JuiceboxEngine.Debugging.DebugRenderer.Instance.DrawLine(new JuiceboxEngine.Math.Vector2.$ctor3(camPos.X - 100, interpolatedHeight), new JuiceboxEngine.Math.Vector2.$ctor3(camPos.X + 100, interpolatedHeight), new JuiceboxEngine.Math.Color.$ctor2(128, 128, 128, 128), 1);
                this._scoreText.DisplayText = System.Single.format((JuiceboxEngine.Math.JMath.Round((interpolatedHeight - LD50.MainScene.MIN_DIST) * 10) / 10));
                this._scoreText.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.75, this.DefaultCamera.WorldToScreenPoint(new JuiceboxEngine.Math.Vector2.$ctor3(0, interpolatedHeight)).Y);

                if (this._highestPoint - this._curHeight < 1.0) {
                    this.DefaultCamera.Parent.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(camPos.X, JuiceboxEngine.Math.JMath.Interpolate(camPos.Y, this._highestPoint, 2.0 * JuiceboxEngine.Util.Time.DeltaTime));
                }

                if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("h")) {
                    this.DebugBodyShape(this._counter.GetComponent(JuiceboxEngine.Physics.BodyP2));

                    $t = H5.getEnumerator(this._dishes);
                    try {
                        while ($t.moveNext()) {
                            var dish = $t.Current;
                            this.DebugBodyShape(dish);
                        }
                    } finally {
                        if (H5.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }
            },
            GetHighestPoint: function () {
                var highest = LD50.MainScene.MIN_DIST;

                for (var i = 0; i < this._dishes.Count; i = (i + 1) | 0) {
                    var body = this._dishes.getItem(i);

                    if (H5.referenceEquals(body.Parent, this._aimingObject)) {
                        continue;
                    }

                    var height = body.GetAABB().Top;

                    if (height > highest) {
                        highest = height;
                    }
                }

                return highest;
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

    H5.define("LD50.JuiceUI.JuiceUIButton", {
        inherits: [LD50.JuiceUI.JuiceUIPanel],
        fields: {
            _routine: null
        },
        events: {
            OnPress: null
        },
        ctors: {
            ctor: function (parent) {
                this.$initialize();
                LD50.JuiceUI.JuiceUIPanel.ctor.call(this, parent);
                this.InputType = JuiceboxEngine.GUI.UIInput.SELF;

                this.addOnMouseEnter(H5.fn.cacheBind(this, this.MouseEnter));
                this.addOnMouseExit(H5.fn.cacheBind(this, this.MouseExit));
                this.addOnMouseUp(H5.fn.cacheBind(this, this.MouseUp));
            }
        },
        methods: {
            SetText: function (displayText, big) {
                if (big === void 0) { big = false; }
                var text = new JuiceboxEngine.GUI.Text(this._front);
                text.ShadowOffset = LD50.JuiceUI.JuiceUIConsts.FONT_SHADOW_OFFSET.$clone();
                text.DisplayText = displayText;
                text.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                text.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                if (big) {
                    text.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, LD50.JuiceUI.JuiceUIConsts.FONT_48_PATH);
                    text.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(text.Font.GetWidth(displayText), 48);
                } else {
                    text.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, LD50.JuiceUI.JuiceUIConsts.FONT_32_PATH);
                    text.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(text.Font.GetWidth(displayText), 32);
                }
            },
            MouseUp: function (ev) {
                !H5.staticEquals(this.OnPress, null) ? this.OnPress() : null;

                this._routine = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.2, H5.fn.bind(this, function (x) {
                    this.Height = JuiceboxEngine.Math.JMath.Interpolate(LD50.JuiceUI.JuiceUIConsts.PANEL_OFFSET, 0, JuiceboxEngine.Math.Easings.ExponentialEaseOut(x));
                })));

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.ClickAnim());
            },
            ClickAnim: function () {
                var $s = 0,
                    $jff,
                    $rv,
                    backColor,
                    frontColor,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    backColor = this._back.Color.$clone();
                                        frontColor = this._front.Color.$clone();

                                        this._back.Color = JuiceboxEngine.Math.Color.White.$clone();
                                        this._front.Color = JuiceboxEngine.Math.Color.White.$clone();

                                        $en.current = null;
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    this._back.Color = backColor.$clone();
                                        this._front.Color = frontColor.$clone();

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
            MouseEnter: function (ev) {
                if (this._routine != null) {
                    JuiceboxEngine.Coroutines.CoroutineManager.StopCoroutine(this._routine);
                }

                this._routine = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.2, H5.fn.bind(this, function (x) {
                    this.Height = JuiceboxEngine.Math.JMath.Interpolate(LD50.JuiceUI.JuiceUIConsts.PANEL_OFFSET, 0, JuiceboxEngine.Math.Easings.ExponentialEaseOut(x));
                })));
            },
            MouseExit: function (ev) {
                if (this._routine != null) {
                    JuiceboxEngine.Coroutines.CoroutineManager.StopCoroutine(this._routine);
                }

                this._routine = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.2, H5.fn.bind(this, function (x) {
                    this.Height = JuiceboxEngine.Math.JMath.Interpolate(0, LD50.JuiceUI.JuiceUIConsts.PANEL_OFFSET, JuiceboxEngine.Math.Easings.ExponentialEaseOut(x));
                })));
            }
        }
    });
});
