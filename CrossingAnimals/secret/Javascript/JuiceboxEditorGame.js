/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2020
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("JuiceboxEditorGame", function ($asm, globals) {
    "use strict";

    /** @namespace JuiceboxEditorGame */

    /**
     * Editor base class.
     *
     * @abstract
     * @class JuiceboxEditorGame.Editor
     */
    Bridge.define("JuiceboxEditorGame.Editor", {
        fields: {
            /**
             * Editor name.
             *
             * @instance
             * @public
             * @memberof JuiceboxEditorGame.Editor
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * Scene that can be used for editing.
             *
             * @instance
             * @protected
             * @memberof JuiceboxEditorGame.Editor
             * @type JuiceboxEngine.Scene
             */
            _scene: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEditorGame.Editor
             * @memberof JuiceboxEditorGame.Editor
             * @param   {JuiceboxEngine.Scene}    scene    
             * @param   {string}                  name     Editor name.
             * @return  {void}
             */
            ctor: function (scene, name) {
                this.$initialize();
                this.Name = name;
                this._scene = scene;
            }
        }
    });

    Bridge.define("JuiceboxEditorGame.Game", {
        inherits: [JuiceboxEngine.JuiceboxGame],
        /**
         * Program entry point.
         *
         * @static
         * @public
         * @this JuiceboxEditorGame.Game
         * @memberof JuiceboxEditorGame.Game
         * @return  {void}
         */
        main: function Main () {
            var game = new JuiceboxEditorGame.Game();
        },
        statics: {
            fields: {
                game: null
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                JuiceboxEngine.JuiceboxGame.ctor.call(this);
                if (this.Client) {
                    JuiceboxEditorGame.Game.game = this;

                    this.Run(new JuiceboxEditorGame.MainScene(this.ResourceManager));
                }
            }
        }
    });

    Bridge.define("JuiceboxEditorGame.MainScene", {
        inherits: [JuiceboxEngine.Scene],
        fields: {
            _editor: null
        },
        ctors: {
            /**
             * Scene constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEditorGame.MainScene
             * @memberof JuiceboxEditorGame.MainScene
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
             * @this JuiceboxEditorGame.MainScene
             * @memberof JuiceboxEditorGame.MainScene
             * @return  {void}
             */
            InitializeScene: function () {
                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(255, 127, 80, 255);

                this._editor = new JuiceboxEditorGame.MapEditor(this);
            },
            /**
             * Pre update, called before rendering.
             *
             * @instance
             * @protected
             * @override
             * @this JuiceboxEditorGame.MainScene
             * @memberof JuiceboxEditorGame.MainScene
             * @return  {void}
             */
            PreUpdate: function () {
                this._editor.Update();
            },
            /**
             * Late update, called after rendering.
             *
             * @instance
             * @protected
             * @override
             * @this JuiceboxEditorGame.MainScene
             * @memberof JuiceboxEditorGame.MainScene
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
             * @this JuiceboxEditorGame.MainScene
             * @memberof JuiceboxEditorGame.MainScene
             * @return  {void}
             */
            FinalizeScene: function () {

            }
        }
    });

    /** @namespace JuiceboxEngine.GameUI */

    /**
     * GameUI base class.
     *
     * @abstract
     * @public
     * @class JuiceboxEngine.GameUI.GameUIElement
     * @augments JuiceboxEngine.GUI.EmptyUIElement
     */
    Bridge.define("JuiceboxEngine.GameUI.GameUIElement", {
        inherits: [JuiceboxEngine.GUI.EmptyUIElement],
        fields: {
            /**
             * Does this element have a tooltip?
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GameUI.GameUIElement
             * @function HasToolTip
             * @type boolean
             */
            HasToolTip: false,
            /**
             * The tooltip text, if it has any.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GameUI.GameUIElement
             * @function ToolTipText
             * @type string
             */
            ToolTipText: null,
            /**
             * Tooltip UI element.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.GameUI.GameUIElement
             * @type JuiceboxEngine.GameUI.GameUIPanel
             */
            _toolTip: null,
            _showRoutine: null,
            _showTooltip: false,
            _curMouseAnimation: null
        },
        ctors: {
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this.HasToolTip = false;
                this.ToolTipText = "";
            }
        },
        methods: {
            /**
             * Set UI element tooltip when hovered over by mouse or finger.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameUI.GameUIElement
             * @memberof JuiceboxEngine.GameUI.GameUIElement
             * @param   {string}    toolTipText    The tooltip text. If left empty, tooltip will be disabled.
             * @return  {void}
             */
            SetToolTip: function (toolTipText) {
                this.HasToolTip = !System.String.isNullOrEmpty(toolTipText);
                this.ToolTipText = toolTipText;

                this.addOnMouseEnter(Bridge.fn.bind(this, function (ev) {
                    if (this._curMouseAnimation != null) {
                        JuiceboxEngine.Coroutines.CoroutineManager.StopCoroutine(this._curMouseAnimation);
                    }
                    this._curMouseAnimation = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.MouseEnter());

                    if (this.HasToolTip) {
                        this._showRoutine = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.ShowToolTip((Bridge.as(ev, JuiceboxEngine.GUI.UIMouseEvent)).position.$clone()));
                        this._showTooltip = true;
                    }
                }));

                this.addOnMouseStay(Bridge.fn.bind(this, function (ev) {
                    if (this.HasToolTip && this._toolTip != null) {
                        this._toolTip.Position = (Bridge.as(ev, JuiceboxEngine.GUI.UIMouseEvent)).absolutePosition.$clone();
                    }
                }));

                this.addOnMouseExit(Bridge.fn.bind(this, function (ev) {
                    if (this._curMouseAnimation != null) {
                        JuiceboxEngine.Coroutines.CoroutineManager.StopCoroutine(this._curMouseAnimation);
                    }
                    this._curMouseAnimation = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.MouseExit());

                    if (this.HasToolTip) {
                        this.RootElement.RemoveChild(this._toolTip);
                        this._toolTip = null;
                        this._showTooltip = false;

                        JuiceboxEngine.Coroutines.CoroutineManager.StopCoroutine(this._showRoutine);
                    }
                }));
            },
            /**
             * Show tooltip animation.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.GameUI.GameUIElement
             * @memberof JuiceboxEngine.GameUI.GameUIElement
             * @param   {JuiceboxEngine.Math.Vector2}       pos    Mouse position to start from.
             * @return  {System.Collections.IEnumerator}           Coroutine
             */
            ShowToolTip: function (pos) {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    padding,
                    text,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(1.0);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    if (this._showTooltip) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    padding = 10;

                                        this._toolTip = new JuiceboxEngine.GameUI.GameUIPanel(this.RootElement);
                                        this._toolTip.Pivot = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 0.0);
                                        this._toolTip.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(200, 50);
                                        this._toolTip.InputType = JuiceboxEngine.GUI.UIInput.NONE;
                                        this._toolTip.Position = JuiceboxEngine.Math.Vector2.op_Addition(this.AbsolutePosition.$clone(), pos.$clone());
                                        this._toolTip.Color = JuiceboxEngine.GameUI.GameUIConstants.ToolTipColor.$clone();

                                        text = new JuiceboxEngine.GUI.Text(this._toolTip);
                                        text.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, JuiceboxEngine.GameUI.GameUIConstants.NormalFontPath);
                                        text.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(text.Font.GetWidth(this.ToolTipText), 24);
                                        text.Pivot = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 0.5);
                                        text.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 0.5);
                                        text.Position = new JuiceboxEngine.Math.Vector2.$ctor3(padding, 0);
                                        text.Color = JuiceboxEngine.GameUI.GameUIConstants.TextColor.$clone();
                                        text.ShadowColor = JuiceboxEngine.GameUI.GameUIConstants.TextShadow.$clone();
                                        text.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(2, -2);

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.2, Bridge.fn.bind(this, function (x) {
                                            if (this._toolTip != null) {
                                                this._toolTip.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Math.Easings.QuadraticEaseOut(x) * text.Dimensions.X + Bridge.Int.mul(padding, 2), JuiceboxEngine.Math.Easings.QuadraticEaseOut(x) * 50);
                                            }
                                        }), false));
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    text.DisplayText = this.ToolTipText;
                                    $step = 4;
                                    continue;
                                }
                                case 4: {

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

    /**
     * Default colors in the Game UI.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.GameUI.GameUIConstants
     */
    Bridge.define("JuiceboxEngine.GameUI.GameUIConstants", {
        statics: {
            fields: {
                TextColor: null,
                TextShadow: null,
                ButtonColor: null,
                ButtonShadow: null,
                PrimaryButtonColor: null,
                PrimaryButtonShadow: null,
                PanelColor: null,
                PanelShadow: null,
                ToolTipColor: null,
                PanelPath: null,
                PanelBorder: 0,
                NormalFontPath: null,
                BigFontPath: null
            },
            ctors: {
                init: function () {
                    this.TextColor = new JuiceboxEngine.Math.Color();
                    this.TextShadow = new JuiceboxEngine.Math.Color();
                    this.ButtonColor = new JuiceboxEngine.Math.Color();
                    this.ButtonShadow = new JuiceboxEngine.Math.Color();
                    this.PrimaryButtonColor = new JuiceboxEngine.Math.Color();
                    this.PrimaryButtonShadow = new JuiceboxEngine.Math.Color();
                    this.PanelColor = new JuiceboxEngine.Math.Color();
                    this.PanelShadow = new JuiceboxEngine.Math.Color();
                    this.ToolTipColor = new JuiceboxEngine.Math.Color();
                    this.TextColor = new JuiceboxEngine.Math.Color.$ctor2(255, 255, 255, 255);
                    this.TextShadow = new JuiceboxEngine.Math.Color.$ctor2(34, 32, 33, 255);
                    this.ButtonColor = new JuiceboxEngine.Math.Color.$ctor2(84, 160, 255, 255);
                    this.ButtonShadow = new JuiceboxEngine.Math.Color.$ctor2(46, 134, 222, 255);
                    this.PrimaryButtonColor = new JuiceboxEngine.Math.Color.$ctor2(254, 202, 87, 255);
                    this.PrimaryButtonShadow = new JuiceboxEngine.Math.Color.$ctor2(255, 159, 67, 255);
                    this.PanelColor = new JuiceboxEngine.Math.Color.$ctor2(84, 160, 255, 255);
                    this.PanelShadow = new JuiceboxEngine.Math.Color.$ctor2(46, 134, 222, 255);
                    this.ToolTipColor = new JuiceboxEngine.Math.Color.$ctor2(46, 134, 222, 255);
                    this.PanelPath = "GameUI/Panel.png";
                    this.PanelBorder = 16;
                    this.NormalFontPath = "GameUI/OCRAExtended24.bff";
                    this.BigFontPath = "GameUI/OCRAExtended32.bff";
                }
            }
        }
    });

    Bridge.define("JuiceboxEditorGame.MapEditor", {
        inherits: [JuiceboxEditorGame.Editor],
        fields: {
            _tilemap: null,
            _selectedTile: null,
            _animationFrames: 0,
            _animationSpeed: 0
        },
        ctors: {
            init: function () {
                this._selectedTile = new JuiceboxEngine.Math.Point();
            },
            ctor: function (scene) {
                this.$initialize();
                JuiceboxEditorGame.Editor.ctor.call(this, scene, "Tilemap editor");
                var obj = scene.AddGameObject$1("Tilemap");
                this._tilemap = obj.AddComponent(JuiceboxEngine.TileMap);

                this._scene.DefaultCamera.Zoom = 1;

                this._tilemap.TileSize = 16;
                this._tilemap.Sprites = scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/MapSprites.png");

                var size = 64;

                var data = System.Array.init(Bridge.Int.mul(Bridge.Int.mul(size, size), 4), 0, System.Byte);

                for (var i = 0; i < Bridge.Int.mul(Bridge.Int.mul(size, size), 4); i = (i + 4) | 0) {
                    data[i] = 0;
                    data[i] = 0;
                    data[i] = 0;
                    data[i] = 255;
                }

                this._tilemap.MapData = new JuiceboxEngine.Graphics.Texture2D.$ctor1(size, size, data);
                this._tilemap.MapData.Wrap = JuiceboxEngine.Graphics.Texture2D.WrapMode.Repeat;

                var selector = new JuiceboxEngine.GUI.Image(this._scene.GUI.Root);
                selector.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this._tilemap.Sprites.Width, this._tilemap.Sprites.Height);
                selector.DisplayImage = this._tilemap.Sprites;
                selector.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomLeft.$clone();
                selector.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomLeft.$clone();

                var highLight = new JuiceboxEngine.GUI.Image(selector);
                highLight.Pivot = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                highLight.Anchor = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                highLight.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this._tilemap.TileSize, this._tilemap.TileSize);
                highLight.Color = new JuiceboxEngine.Math.Color.$ctor3(1.0, 0.0, 0.0, 0.5);

                var slider = new JuiceboxEngine.GameUI.GameUISlider(selector);
                slider.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, 10);
                slider.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this._tilemap.Sprites.Width, 32);
                slider.Increments = 10;
                slider.Anchor = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                slider.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomLeft.$clone();

                var animFramesText = new JuiceboxEngine.GUI.Text(slider);
                animFramesText.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(200, 32);
                animFramesText.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                animFramesText.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                animFramesText.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(1, -1);
                animFramesText.InputType = JuiceboxEngine.GUI.UIInput.NONE;

                slider.addValueChanged(Bridge.fn.bind(this, function (value) {
                    this._animationFrames = Bridge.Int.clip32(JuiceboxEngine.Math.JMath.Round(value * 10));
                    animFramesText.DisplayText = Bridge.toString(this._animationFrames);
                    animFramesText.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(animFramesText.Font.GetWidth(animFramesText.DisplayText), 32);
                }));

                var speedSlider = new JuiceboxEngine.GameUI.GameUISlider(selector);
                speedSlider.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, 52);
                speedSlider.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this._tilemap.Sprites.Width, 32);
                speedSlider.Increments = 255;
                speedSlider.Anchor = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                speedSlider.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomLeft.$clone();

                speedSlider.addValueChanged(Bridge.fn.bind(this, function (value) {
                    this._animationSpeed = Bridge.Int.clip32(JuiceboxEngine.Math.JMath.Round(value * 255));
                    animFramesText.DisplayText = Bridge.toString(this._animationFrames);
                    animFramesText.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(animFramesText.Font.GetWidth(animFramesText.DisplayText), 32);
                }));

                selector.addOnMouseDown(Bridge.fn.bind(this, function (uiEvent) {
                    var mouseEvent = Bridge.as(uiEvent, JuiceboxEngine.GUI.UIMouseEvent);
                    var pos = mouseEvent.position.$clone();

                    highLight.Position = JuiceboxEngine.Math.Vector2.op_Subtraction(pos.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0, selector.DisplayImage.Height));
                    highLight.Position = new JuiceboxEngine.Math.Vector2.$ctor3((((Bridge.Int.div(Bridge.Int.clip32(highLight.Position.X), Bridge.Int.clip32(this._tilemap.TileSize))) | 0)) * this._tilemap.TileSize, (((Bridge.Int.div(Bridge.Int.clip32(highLight.Position.Y), Bridge.Int.clip32(this._tilemap.TileSize))) | 0)) * this._tilemap.TileSize);

                    this._selectedTile = new JuiceboxEngine.Math.Point.$ctor1(((Bridge.Int.div(Bridge.Int.clip32(pos.X), Bridge.Int.clip32(this._tilemap.TileSize))) | 0), (((((((Bridge.Int.div(this._tilemap.Sprites.Height, Bridge.Int.clip32(this._tilemap.TileSize))) | 0)) - (((Bridge.Int.div(Bridge.Int.clip32(pos.Y), Bridge.Int.clip32(this._tilemap.TileSize))) | 0))) | 0) - 1) | 0));
                }));

                this._tilemap.Sprites.addonLoad(Bridge.fn.bind(this, function (sender, args) {
                    selector.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this._tilemap.Sprites.Width, this._tilemap.Sprites.Height);
                    slider.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this._tilemap.Sprites.Width, 32);
                    speedSlider.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this._tilemap.Sprites.Width, 32);
                }));
            }
        },
        methods: {
            Update: function () {
                var $t;
                if (JuiceboxEngine.Input.InputManager.Instance.MouseKeyHeld(JuiceboxEngine.Input.MouseKey.RightMouse)) {
                    if (JuiceboxEngine.Input.InputManager.Instance.KeyDown("Control")) {
                        $t = this._scene.DefaultCamera;
                        $t.Zoom += JuiceboxEngine.Input.InputManager.Instance.MouseDelta.Y;
                    } else {
                        var screenSize = new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Graphics.GraphicsManager.Instance.Width, JuiceboxEngine.Graphics.GraphicsManager.Instance.Height);
                        this._scene.DefaultCamera.Parent.Transform.Translate2D(JuiceboxEngine.Math.Vector2.op_Multiply(JuiceboxEngine.Input.InputManager.Instance.MouseDelta.$clone(), (JuiceboxEngine.Math.Vector2.op_Division$1(screenSize.$clone(), this._scene.DefaultCamera.Zoom))));
                    }
                }

                if (JuiceboxEngine.Input.InputManager.Instance.MouseKeyHeld(JuiceboxEngine.Input.MouseKey.LeftMouse)) {
                    var worldPos = this._scene.DefaultCamera.ScreenPointToWorld(JuiceboxEngine.Input.InputManager.Instance.MousePosition.$clone());
                    var tilePos = new JuiceboxEngine.Math.Point.$ctor1(((Bridge.Int.div(Bridge.Int.clip32(worldPos.X), Bridge.Int.clip32(this._tilemap.TileSize))) | 0), (((((this._tilemap.MapData.Height - ((Bridge.Int.div(Bridge.Int.clip32(worldPos.Y), Bridge.Int.clip32(this._tilemap.TileSize))) | 0)) | 0)) - 1) | 0));

                    JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.SetPixels(this._tilemap.MapData, new JuiceboxEngine.Math.Rectangle.$ctor1(tilePos.$clone(), 1, 1), System.Array.init([new JuiceboxEngine.Math.Color.$ctor2(this._selectedTile.X, this._selectedTile.Y, this._animationFrames, this._animationSpeed)], JuiceboxEngine.Math.Color));
                }

                if (JuiceboxEngine.Input.InputManager.Instance.KeyPressed("o")) {
                    var canvas = document.createElement("canvas");
                    canvas.width = this._tilemap.MapData.Width;
                    canvas.height = this._tilemap.MapData.Height;

                    var context = canvas.getContext("2d");
                    var bytes = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.GetPixels(this._tilemap.MapData, new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, this._tilemap.MapData.Width, this._tilemap.MapData.Height));

                    var base64string = System.Convert.toBase64String(bytes, null, null, null);

                    System.Console.WriteLine(base64string);
                    JuiceboxEngine.Util.Config.ConfigValues.Fullscreen = false;
                }
            }
        }
    });

    /**
     * Game UI button. 
     Has a default style to be consistent across multiple games.
     *
     * @public
     * @class JuiceboxEngine.GameUI.GameUIButton
     * @augments JuiceboxEngine.GameUI.GameUIElement
     */
    Bridge.define("JuiceboxEngine.GameUI.GameUIButton", {
        inherits: [JuiceboxEngine.GameUI.GameUIElement],
        fields: {
            _buttonFront: null,
            _buttonBack: null,
            _height: 0,
            _curHeight: 0,
            _frontColor: null,
            _backColor: null,
            _buttonText: null
        },
        props: {
            /**
             * Height of the button in pixels.
             Moves the button panels away from each other.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GameUI.GameUIButton
             * @function Height
             * @type number
             */
            Height: {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this._curHeight = this._height;

                    this.UpdateButtonPositions();
                }
            }
        },
        ctors: {
            init: function () {
                this._frontColor = new JuiceboxEngine.Math.Color();
                this._backColor = new JuiceboxEngine.Math.Color();
            },
            /**
             * Button constructor.
             Note: This button consumes all input.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameUI.GameUIButton
             * @memberof JuiceboxEngine.GameUI.GameUIButton
             * @param   {JuiceboxEngine.GUI.UIElement}    parent    The UI parent.
             * @return  {void}
             */
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GameUI.GameUIElement.ctor.call(this, parent);
                this.InputType = JuiceboxEngine.GUI.UIInput.SELF;

                this._buttonBack = new JuiceboxEngine.GUI.SlicedImage(this);
                this._buttonFront = new JuiceboxEngine.GUI.SlicedImage(this);

                this._buttonFront.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, JuiceboxEngine.GameUI.GameUIConstants.PanelPath);
                this._buttonFront.Border = JuiceboxEngine.GameUI.GameUIConstants.PanelBorder;
                this._buttonFront.Color = JuiceboxEngine.GameUI.GameUIConstants.ButtonColor.$clone();

                this._buttonBack.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, JuiceboxEngine.GameUI.GameUIConstants.PanelPath);
                this._buttonBack.Border = JuiceboxEngine.GameUI.GameUIConstants.PanelBorder;
                this._buttonBack.Color = JuiceboxEngine.GameUI.GameUIConstants.ButtonShadow.$clone();

                this._frontColor = this._buttonFront.Color.$clone();
                this._backColor = this._buttonBack.Color.$clone();

                this.addOnMouseDown(Bridge.fn.bind(this, function (mouseEvent) {
                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.FlashButton());
                }));
            }
        },
        methods: {
            /**
             * Add text to the button.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameUI.GameUIButton
             * @memberof JuiceboxEngine.GameUI.GameUIButton
             * @param   {string}                     text       The text to display.
             * @param   {boolean}                    bigText    Increased text size. (for primary buttons, for example)
             * @return  {JuiceboxEngine.GUI.Text}               The created text element.
             */
            SetText: function (text, bigText) {
                if (bigText === void 0) { bigText = false; }
                if (this._buttonText == null) {
                    this._buttonText = new JuiceboxEngine.GUI.Text(this._buttonFront);
                    this._buttonText.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, bigText ? JuiceboxEngine.GameUI.GameUIConstants.BigFontPath : JuiceboxEngine.GameUI.GameUIConstants.NormalFontPath);

                    this._buttonText.Color = JuiceboxEngine.GameUI.GameUIConstants.TextColor.$clone();
                    this._buttonText.ShadowColor = JuiceboxEngine.GameUI.GameUIConstants.TextShadow.$clone();
                    this._buttonText.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(2, -2);

                    this._buttonText.Pivot = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5);
                    this._buttonText.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5);
                }

                this._buttonText.DisplayText = text;
                this._buttonText.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this._buttonText.Font.GetWidth(text), bigText ? 32 : 24);

                return this._buttonText;
            },
            /**
             * Add custom content to this UI element.
             NOTE: Input will not work on these elements.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameUI.GameUIButton
             * @memberof JuiceboxEngine.GameUI.GameUIButton
             * @return  {JuiceboxEngine.GUI.UIElement}        Button front panel element.
             */
            GetButtonElement: function () {
                return this._buttonFront;
            },
            /**
             * Called when the button needs updating.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.GameUI.GameUIButton
             * @memberof JuiceboxEngine.GameUI.GameUIButton
             * @return  {void}
             */
            UpdateElement: function () {
                this._buttonFront.Dimensions = this.Dimensions.$clone();
                this._buttonBack.Dimensions = this.Dimensions.$clone();
            },
            /**
             * Flash the button white for one frame.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.GameUI.GameUIButton
             * @memberof JuiceboxEngine.GameUI.GameUIButton
             * @return  {System.Collections.IEnumerator}
             */
            FlashButton: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    this._buttonFront.Color = JuiceboxEngine.Math.Color.White.$clone();
                                        $enumerator.current = null;
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this._buttonFront.Color = this._frontColor.$clone();

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
            /**
             * Only update button panel positions based on height.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.GameUI.GameUIButton
             * @memberof JuiceboxEngine.GameUI.GameUIButton
             * @return  {void}
             */
            UpdateButtonPositions: function () {
                var offset = new JuiceboxEngine.Math.Vector2.$ctor3(-JuiceboxEngine.Math.JMath.Round(this._curHeight), JuiceboxEngine.Math.JMath.Round(this._curHeight));

                this._buttonFront.Position = offset.$clone();
                this._buttonBack.Position = JuiceboxEngine.Math.Vector2.op_UnaryNegation(offset.$clone());
            },
            MouseEnter: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, Bridge.fn.bind(this, function (progress) {
                                            this._curHeight = this._height - JuiceboxEngine.Math.Easings.ExponentialEaseOut(progress) * this._height;
                                            this.UpdateButtonPositions();
                                        })));
                                        $step = 1;
                                        return true;
                                }
                                case 1: {

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
            MouseExit: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.3, Bridge.fn.bind(this, function (progress) {
                                            this._curHeight = JuiceboxEngine.Math.Easings.ExponentialEaseOut(progress) * this._height;
                                            this.UpdateButtonPositions();
                                        })));
                                        $step = 1;
                                        return true;
                                }
                                case 1: {

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

    Bridge.define("JuiceboxEngine.GameUI.GameUIPanel", {
        inherits: [JuiceboxEngine.GameUI.GameUIElement],
        fields: {
            _panel: null
        },
        ctors: {
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GameUI.GameUIElement.ctor.call(this, parent);
                this._panel = new JuiceboxEngine.GUI.SlicedImage(this);
                this._panel.InputType = JuiceboxEngine.GUI.UIInput.NONE;
                this._panel.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(100, 100);
                this._panel.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, JuiceboxEngine.GameUI.GameUIConstants.PanelPath);
                this._panel.Color = JuiceboxEngine.GameUI.GameUIConstants.PanelColor.$clone();
                this._panel.Border = JuiceboxEngine.GameUI.GameUIConstants.PanelBorder;
            }
        },
        methods: {
            UpdateElement: function () {
                this._panel.Color = this.Color.$clone();
                this._panel.Dimensions = this.Dimensions.$clone();
            },
            MouseEnter: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = null;
                                        $step = 1;
                                        return true;
                                }
                                case 1: {

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
            MouseExit: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = null;
                                        $step = 1;
                                        return true;
                                }
                                case 1: {

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

    /**
     * @memberof JuiceboxEngine.GameUI
     * @callback JuiceboxEngine.GameUI.GameUISlider.SliderDelegate
     * @param   {number}    value
     * @return  {void}
     */

    Bridge.define("JuiceboxEngine.GameUI.GameUISlider", {
        inherits: [JuiceboxEngine.GameUI.GameUIElement],
        fields: {
            /**
             * Slider knob padding.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GameUI.GameUISlider
             * @function Padding
             * @type number
             */
            Padding: 0,
            /**
             * Value of the slider ranging from 0 to 1.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GameUI.GameUISlider
             * @function Value
             * @type number
             */
            Value: 0,
            /**
             * How many increments are in the slider.
             0 for unlimted.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GameUI.GameUISlider
             * @function Increments
             * @type number
             */
            Increments: 0,
            _back: null,
            _slider: null,
            _sliderPos: 0
        },
        events: {
            /**
             * Event fired when value is changed.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameUI.GameUISlider
             * @memberof JuiceboxEngine.GameUI.GameUISlider
             * @function addValueChanged
             * @param   {JuiceboxEngine.GameUI.GameUISlider.SliderDelegate}    value
             * @return  {void}
             */
            /**
             * Event fired when value is changed.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameUI.GameUISlider
             * @memberof JuiceboxEngine.GameUI.GameUISlider
             * @function removeValueChanged
             * @param   {JuiceboxEngine.GameUI.GameUISlider.SliderDelegate}    value
             * @return  {void}
             */
            ValueChanged: null
        },
        ctors: {
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GameUI.GameUIElement.ctor.call(this, parent);
                this.Padding = 8;

                this._back = new JuiceboxEngine.GUI.SlicedImage(this);
                this._back.InputType = JuiceboxEngine.GUI.UIInput.NONE;
                this._back.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(200, 50);
                this._back.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, JuiceboxEngine.GameUI.GameUIConstants.PanelPath);
                this._back.Color = JuiceboxEngine.GameUI.GameUIConstants.PanelShadow.$clone();
                this._back.Border = JuiceboxEngine.GameUI.GameUIConstants.PanelBorder;

                this._slider = new JuiceboxEngine.GUI.SlicedImage(this._back);
                this._slider.InputType = JuiceboxEngine.GUI.UIInput.NONE;
                this._slider.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(40, 40);
                this._slider.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, JuiceboxEngine.GameUI.GameUIConstants.PanelPath);
                this._slider.Border = JuiceboxEngine.GameUI.GameUIConstants.PanelBorder;
                this._slider.Color = JuiceboxEngine.GameUI.GameUIConstants.PanelColor.$clone();
                this._slider.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                this.addOnMouseHeld(Bridge.fn.bind(this, function (ev) {
                    this.MoveSlider(Bridge.as(ev, JuiceboxEngine.GUI.UIMouseEvent));
                }));

                this.addOnMouseExit(Bridge.fn.bind(this, function (ev) {
                    if (JuiceboxEngine.Input.InputManager.Instance.MouseKeyHeld(JuiceboxEngine.Input.MouseKey.LeftMouse)) {
                        this.MoveSlider(Bridge.as(ev, JuiceboxEngine.GUI.UIMouseEvent));
                    }
                }));

                this.addOnMouseStay(Bridge.fn.bind(this, function (ev) {
                    this._sliderPos = JuiceboxEngine.Math.JMath.Interpolate(this._sliderPos, this.Value, 15.0 * JuiceboxEngine.Util.Time.DeltaTime);

                    this.UpdateElement();
                }));
            }
        },
        methods: {
            MoveSlider: function (mouseEvent) {
                var value = JuiceboxEngine.Math.JMath.Clamp$1(mouseEvent.position.X, 0, this.Dimensions.X) / this.Dimensions.X;

                if (this.Increments !== 0.0) {
                    value = (Bridge.Int.clip32(value * (this.Increments))) / (this.Increments);
                }

                if (this.Value !== value) {
                    this.Value = value;
                    !Bridge.staticEquals(this.ValueChanged, null) ? this.ValueChanged(this.Value) : null;
                }

                this._showTooltip = false;
            },
            UpdateElement: function () {
                this._back.Dimensions = this.Dimensions.$clone();

                var size = JuiceboxEngine.Math.JMath.Min$1(this.Dimensions.X, this.Dimensions.Y) - this.Padding * 2;

                var dist = JuiceboxEngine.Math.JMath.Abs(this._sliderPos - this.Value) * (size / 2);

                this._slider.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(size + dist, size - dist);
                this._slider.Position = new JuiceboxEngine.Math.Vector2.$ctor3((this.Padding + this._slider.Dimensions.X / 2) + this._sliderPos * (this.Dimensions.X - size - this.Padding * 2), this.Padding + this._slider.Dimensions.Y / 2);
            },
            MouseEnter: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    size,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    size = JuiceboxEngine.Math.JMath.Min$1(this.Dimensions.X, this.Dimensions.Y) - this.Padding * 2;

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.2, Bridge.fn.bind(this, function (x) {
                                            this._slider.Dimensions = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(size, size), (0.25 * JuiceboxEngine.Math.Easings.BackEaseOut(x) + 1));
                                        })));
                                        $step = 1;
                                        return true;
                                }
                                case 1: {

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
            MouseExit: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    size,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    size = JuiceboxEngine.Math.JMath.Min$1(this.Dimensions.X, this.Dimensions.Y) - this.Padding * 2;

                                        this._sliderPos = this.Value;
                                        this.UpdateElement();

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.4, Bridge.fn.bind(this, function (x) {
                                            this._slider.Dimensions = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(size, size), (0.3 * (1 - JuiceboxEngine.Math.Easings.BounceEaseOut(x)) + 1));
                                        })));
                                        $step = 1;
                                        return true;
                                }
                                case 1: {

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
});
