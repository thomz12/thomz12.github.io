/**
 * @compiler H5 0.0.25007
 */
H5.assemblyVersion("LD51","1.0.0.0");
H5.assembly("LD51", function ($asm, globals) {
    "use strict";

    /** @namespace LD50 */

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
            Text: null,
            _offset: 0
        },
        ctors: {
            ctor: function (parent, text, offset) {
                if (offset === void 0) { offset = 5; }

                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this._offset = offset;

                this.InputType = JuiceboxEngine.GUI.UIInput.SELF;

                this.addOnMouseStay(H5.fn.cacheBind(this, this.MouseStay));
                this.addOnMouseExit(H5.fn.cacheBind(this, this.MouseExit));
                this.addOnMouseDown(H5.fn.cacheBind(this, this.MouseDown));
                this.addOnMouseUp(H5.fn.cacheBind(this, this.MouseUp));

                this._background = new JuiceboxEngine.GUI.Panel(this);
                this._background.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._background.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._background.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(290, 64);
                this._background.Color = new JuiceboxEngine.Math.Color.$ctor2(215, 123, 186, 255);
                this._background.Position = new JuiceboxEngine.Math.Vector2.$ctor3(offset, ((-offset) | 0));

                this._foreground = new JuiceboxEngine.GUI.Panel(this);
                this._foreground.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._foreground.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._foreground.Dimensions = this._background.Dimensions.$clone();
                this._foreground.Color = new JuiceboxEngine.Math.Color.$ctor2(95, 205, 228, 255);
                this._foreground.Position = new JuiceboxEngine.Math.Vector2.$ctor3(((-offset) | 0), offset);

                this.Text = new JuiceboxEngine.GUI.CanvasText(this._foreground);
                this.Text.Dimensions = this._foreground.Dimensions.$clone();
                this.Text.VerticalAlignment = JuiceboxEngine.GUI.TextVerticalAlignment.Center;
                this.Text.HorizontalAlignment = JuiceboxEngine.GUI.TextHorizontalAlignment.Center;
                this.Text.DisplayText = text;
                this.Text.Font = "AldotheApache";
                this.Text.TextSize = 32;
            }
        },
        methods: {
            UpdateElement: function () {
                JuiceboxEngine.GUI.EmptyUIElement.prototype.UpdateElement.call(this);

                this._background.Dimensions = JuiceboxEngine.Math.Vector2.op_Subtraction(this.Dimensions.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(10, 10));
                this._foreground.Dimensions = this._background.Dimensions.$clone();
                this.Text.Dimensions = this._foreground.Dimensions.$clone();
            },
            MouseUp: function (ev) {
                this._background.Color = new JuiceboxEngine.Math.Color.$ctor2(215, 123, 186, 255);
                this._foreground.Color = new JuiceboxEngine.Math.Color.$ctor2(95, 205, 228, 255);
            },
            MouseDown: function (ev) {
                this._background.Color = JuiceboxEngine.Math.Color.White.$clone();
                this._foreground.Color = JuiceboxEngine.Math.Color.White.$clone();
            },
            MouseExit: function (ev) {
                var startBack = this._background.Position.$clone();
                var startFront = this._foreground.Position.$clone();

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.1, H5.fn.bind(this, function (x) {
                    this._background.Position = JuiceboxEngine.Math.Vector2.Interpolate(startBack.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(this._offset, -this._offset), x);
                    this._foreground.Position = JuiceboxEngine.Math.Vector2.Interpolate(startFront.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(-this._offset, this._offset), x);

                })));

                this._background.Color = new JuiceboxEngine.Math.Color.$ctor2(215, 123, 186, 255);
                this._foreground.Color = new JuiceboxEngine.Math.Color.$ctor2(95, 205, 228, 255);
            },
            MouseStay: function (ev) {
                var mouseEvent = ev;

                var pos = JuiceboxEngine.Math.Vector2.op_Division(mouseEvent.position.$clone(), this.Dimensions.$clone());

                this._background.Position = new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Math.JMath.Interpolate(this._offset, -this._offset, pos.X), JuiceboxEngine.Math.JMath.Interpolate(this._offset, -this._offset, pos.Y));
                this._foreground.Position = new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Math.JMath.Interpolate(-this._offset, this._offset, pos.X), JuiceboxEngine.Math.JMath.Interpolate(-this._offset, this._offset, pos.Y));
            }
        }
    });

    H5.define("LD51.LD51Panel", {
        inherits: [JuiceboxEngine.GUI.EmptyUIElement],
        fields: {
            Front: null,
            Back: null,
            offset: 0
        },
        ctors: {
            ctor: function (parent, offset, dimensions) {
                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this.offset = offset;

                this.Dimensions = dimensions.$clone();

                this.Back = new JuiceboxEngine.GUI.Panel(this);
                this.Back.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomRight.$clone();
                this.Back.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomRight.$clone();
                this.Back.Color = new JuiceboxEngine.Math.Color.$ctor2(215, 123, 186, 255);

                this.Front = new JuiceboxEngine.GUI.Panel(this);
                this.Front.Pivot = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                this.Front.Anchor = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                this.Front.Color = new JuiceboxEngine.Math.Color.$ctor2(95, 205, 228, 255);

                this.UpdateDimensions();
            }
        },
        methods: {
            UpdateDimensions: function () {
                this.Back.Dimensions = JuiceboxEngine.Math.Vector2.op_Subtraction(this.Dimensions.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(this.offset, this.offset));
                this.Front.Dimensions = this.Back.Dimensions.$clone();
            },
            UpdateElement: function () {
                JuiceboxEngine.GUI.EmptyUIElement.prototype.UpdateElement.call(this);

                this.UpdateDimensions();
            }
        }
    });

    H5.define("LD51.LeaderboardUI", {
        inherits: [JuiceboxEngine.GUI.EmptyUIElement],
        fields: {
            _title: null,
            _titlePanel: null,
            _bodyPanel: null,
            _scrollArea: null,
            _loading: null,
            _loadingRoutine: null,
            maxScroll: 0,
            _curBoard: 0,
            LEADERBOARD_NAMES: null,
            LEADERBOARD_NAMES_HUMAN: null
        },
        events: {
            OnClose: null
        },
        ctors: {
            init: function () {
                this.LEADERBOARD_NAMES = System.Array.init(["score", "deliveries_high", "deliveries", "bonks", "drifts_high", "drifts"], System.String);
                this.LEADERBOARD_NAMES_HUMAN = System.Array.init(["Highscores", "Ice sold", "Total ice sold", "Total Crashes", "Drifts", "Total Drifts"], System.String);
            },
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this._curBoard = 0;

                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, 450);
                this.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                this._titlePanel = new LD51.LD51Panel(this, 4, new JuiceboxEngine.Math.Vector2.$ctor3(270, 64));
                this._titlePanel.Anchor = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._titlePanel.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();

                this._title = new JuiceboxEngine.GUI.CanvasText(this._titlePanel.Front);
                this._title.Dimensions = this._titlePanel.Front.Dimensions.$clone();
                this._title.HorizontalAlignment = JuiceboxEngine.GUI.TextHorizontalAlignment.Center;
                this._title.VerticalAlignment = JuiceboxEngine.GUI.TextVerticalAlignment.Center;
                this._title.DisplayText = "Leaderboard";
                this._title.Font = "AldotheApache";
                this._title.TextSize = 32;

                this._bodyPanel = new LD51.LD51Panel(this._titlePanel, 3, new JuiceboxEngine.Math.Vector2.$ctor3(290, this.Dimensions.Y - this._titlePanel.Dimensions.Y));
                this._bodyPanel.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();
                this._bodyPanel.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._bodyPanel.Front.UseScissor = true;
                this._bodyPanel.Front.InputType = JuiceboxEngine.GUI.UIInput.SELF;
                this._bodyPanel.Front.addOnMouseHeld(H5.fn.cacheBind(this, this.MouseMove));

                this._scrollArea = new JuiceboxEngine.GUI.EmptyUIElement.ctor(this._bodyPanel.Front);
                this._scrollArea.Dimensions = this._bodyPanel.Front.Dimensions.$clone();
                this._scrollArea.Anchor = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                this._scrollArea.Pivot = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();

                this._loading = new JuiceboxEngine.GUI.Image(this._bodyPanel);
                this._loading.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(128, 128);
                this._loading.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._loading.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._loading.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/IceIcon.png");

                this._loadingRoutine = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.LinearRepeat(2.0, H5.fn.bind(this, function (x) {
                    this._loading.Rotation = -x * JuiceboxEngine.Math.JMath.PI * 2;
                })));

                var close = new LD51.Button(this._bodyPanel, "close", 2);
                close.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(150, 32);
                close.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomLeft.$clone();
                close.Pivot = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                close.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -3);
                close.Text.TextSize = 16;

                close.addOnMouseUp(H5.fn.bind(this, function (ev) {
                    !H5.staticEquals(this.OnClose, null) ? this.OnClose() : null;
                    this.Remove();
                }));

                var next = new LD51.Button(this._titlePanel, ">", 2);
                next.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(48, 60);
                next.Anchor = JuiceboxEngine.GUI.UIDefaults.CenterRight.$clone();
                next.Pivot = JuiceboxEngine.GUI.UIDefaults.CenterLeft.$clone();
                next.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -3);
                next.addOnMouseUp(H5.fn.bind(this, function (ev) {
                    this._curBoard = (((this._curBoard + 1) | 0)) % this.LEADERBOARD_NAMES.length;
                    this.LoadLeaderboard(this._curBoard);
                }));

                var prev = new LD51.Button(this._titlePanel, "<", 2);
                prev.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(48, 60);
                prev.Anchor = JuiceboxEngine.GUI.UIDefaults.CenterLeft.$clone();
                prev.Pivot = JuiceboxEngine.GUI.UIDefaults.CenterRight.$clone();
                prev.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -3);
                prev.addOnMouseUp(H5.fn.bind(this, function (ev) {
                    this._curBoard = (this._curBoard - 1) | 0;

                    if (this._curBoard < 0) {
                        this._curBoard = (this.LEADERBOARD_NAMES.length - 1) | 0;
                    }

                    this.LoadLeaderboard(this._curBoard);
                }));

                this.LoadLeaderboard(this._curBoard);
            }
        },
        methods: {
            MouseMove: function (ev) {
                var mouseEvent = ev;
                this._scrollArea.Position = JuiceboxEngine.Math.Vector2.op_Subtraction(this._scrollArea.Position.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0, JuiceboxEngine.Input.InputManager.Instance.MouseDelta.Y * JuiceboxEngine.Graphics.GraphicsManager.Instance.Height));
                this._scrollArea.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, JuiceboxEngine.Math.JMath.Clamp$1(this._scrollArea.Position.Y, 0, this.maxScroll));
            },
            LoadLeaderboard: function (index, local) {
                if (local === void 0) { local = false; }
                var pfName = this.LEADERBOARD_NAMES[index];
                this._title.DisplayText = this.LEADERBOARD_NAMES_HUMAN[index];

                if (local) {
                    JuiceboxEngine.Playfab.PlayfabManager.Leaderboard.GetLeaderboardAroundPlayer(pfName, 100).addOnTaskCompleted(H5.fn.cacheBind(this, this.GotLeaderboard));
                } else {
                    JuiceboxEngine.Playfab.PlayfabManager.Leaderboard.GetLeaderboard(pfName, 0, 100).addOnTaskCompleted(H5.fn.cacheBind(this, this.GotLeaderboard));
                }

                this.ClearAndLoad();
            },
            GotLeaderboard: function (task) {
                this.ShowLeaderboardData(task.Leaderboard);
            },
            ShowLeaderboardData: function (leaderboard) {
                this._loading.Enabled = false;
                this._scrollArea.RemoveAllChildren();

                this.maxScroll = 5;

                for (var i = 0; i < leaderboard.Entries.Count; i = (i + 1) | 0) {
                    this.maxScroll += 33;

                    var entry = leaderboard.Entries.getItem(i).$clone();

                    var scorePanel = new JuiceboxEngine.GUI.EmptyUIElement.ctor(this._scrollArea);
                    scorePanel.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(280, 32);
                    scorePanel.Anchor = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                    scorePanel.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                    scorePanel.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, ((H5.Int.mul(((-i) | 0), 33) - 5) | 0));

                    var leaderboardText = new JuiceboxEngine.GUI.CanvasText(scorePanel);
                    leaderboardText.DisplayText = System.String.format("{0}. {1}", entry.position, entry.displayName);
                    leaderboardText.Dimensions = scorePanel.Dimensions.$clone();
                    leaderboardText.VerticalAlignment = JuiceboxEngine.GUI.TextVerticalAlignment.Center;
                    leaderboardText.HorizontalAlignment = JuiceboxEngine.GUI.TextHorizontalAlignment.Left;
                    leaderboardText.Font = "AldotheApache";
                    leaderboardText.TextSize = 24;

                    var leaderboardScore = new JuiceboxEngine.GUI.CanvasText(scorePanel);
                    leaderboardScore.DisplayText = System.String.format("{0}", [entry.value]);
                    leaderboardScore.Dimensions = scorePanel.Dimensions.$clone();
                    leaderboardScore.VerticalAlignment = JuiceboxEngine.GUI.TextVerticalAlignment.Center;
                    leaderboardScore.HorizontalAlignment = JuiceboxEngine.GUI.TextHorizontalAlignment.Right;
                    leaderboardScore.Font = "AldotheApache";
                    leaderboardScore.TextSize = 24;

                    if (System.String.equals(entry.playfabId, JuiceboxEngine.Playfab.PlayfabManager.Identity.PlayfabId)) {
                        leaderboardText.Color = new JuiceboxEngine.Math.Color.$ctor2(153, 229, 80, 255);
                        leaderboardScore.Color = new JuiceboxEngine.Math.Color.$ctor2(153, 229, 80, 255);
                    }

                    if (entry.position === 1) {
                        leaderboardText.Color = new JuiceboxEngine.Math.Color.$ctor2(251, 242, 54, 255);
                        leaderboardScore.Color = new JuiceboxEngine.Math.Color.$ctor2(251, 242, 54, 255);
                    } else if (entry.position === 2) {
                        leaderboardText.Color = new JuiceboxEngine.Math.Color.$ctor2(203, 219, 252, 255);
                        leaderboardScore.Color = new JuiceboxEngine.Math.Color.$ctor2(203, 219, 252, 255);
                    } else if (entry.position === 3) {
                        leaderboardText.Color = new JuiceboxEngine.Math.Color.$ctor2(217, 160, 102, 255);
                        leaderboardScore.Color = new JuiceboxEngine.Math.Color.$ctor2(217, 160, 102, 255);
                    }
                }

                this.maxScroll -= this._bodyPanel.Dimensions.Y;
                if (this.maxScroll < 0) {
                    this.maxScroll = 0;
                }
            },
            ClearAndLoad: function () {
                this._scrollArea.RemoveAllChildren();
                this._loading.Enabled = true;
            },
            Destroy: function () {
                JuiceboxEngine.GUI.EmptyUIElement.prototype.Destroy.call(this);
                JuiceboxEngine.Coroutines.CoroutineManager.StopCoroutine(this._loadingRoutine);
            }
        }
    });

    H5.define("LD51.MainMenu", {
        inherits: [JuiceboxEngine.Scene],
        fields: {
            _player: null,
            _background: null,
            _playfabText: null,
            _leaderboardUI: null,
            username: null,
            _askUsername: false,
            _startPlaying: false,
            _nameChange: false,
            _play: null,
            _leaderboards: null,
            _creditsBtn: null,
            _title: null
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);

            }
        },
        methods: {
            InitializeScene: function () {
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(true);

                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(215, 123, 186, 255);
                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(95, 205, 228, 255);

                this._player = this.AddGameObject$1("PlayerPreview");
                this._player.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(0, 64);

                var sprite = this._player.AddComponent(JuiceboxEngine.Components.LayeredSpriteComponent);
                sprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/Truck.png");
                sprite.Layers = 32;
                sprite.LayerResolution = 8;
                sprite.LayerDimensions = new JuiceboxEngine.Math.Point.$ctor1(16, 32);
                sprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8, -16);
                sprite.Size = new JuiceboxEngine.Math.Vector2.$ctor3(5, 5);
                sprite.SnapRotation = 0;

                var ui = this._player.AddComponent(JuiceboxEngine.Components.UIComponent);
                ui.UIElement = new JuiceboxEngine.GUI.EmptyUIElement.ctor(this.GUI.Root);
                ui.UIElement.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                ui.UIElement.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(200, 200);
                ui.UIElement.addOnMouseDown(H5.fn.cacheBind(this, this.ClickPlayer));

                var honk = this._player.AddComponent(JuiceboxEngine.Audio.AudioComponent);
                honk.AudioClip = this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Sounds/FX/Honk.mp3");
                honk.Volume = 0.5;

                this._background = this.AddGameObject$1("background");
                var map = this._background.AddComponent(JuiceboxEngine.Components.TileMapComponent);
                map.Sprites = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/MainMenuSprites.png");
                map.TileSize = 64;
                map.MapData = new JuiceboxEngine.Graphics.Texture2D.$ctor1(1, 1, System.Array.init([0, 0, 0, 0], System.Byte));

                var bgm = this._background.AddComponent(JuiceboxEngine.Audio.AudioComponent);
                bgm.AudioClip = this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Sounds/MainMenu.mp3");
                bgm.Loop = true;
                bgm.Play();

                this._play = new LD51.Button(this.GUI.Root, "Play!");
                this._play.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, 74);
                this._play.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.4);
                this._play.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._play.addOnMouseUp(H5.fn.bind(this, function (ev) {
                    this.Play();
                }));

                this._leaderboards = new LD51.Button(this.GUI.Root, "Leaderboards");
                this._leaderboards.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(250, 55);
                this._leaderboards.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.4);
                this._leaderboards.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -79);
                this._leaderboards.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._leaderboards.addOnMouseUp(H5.fn.bind(this, function (ev) {
                    this._leaderboardUI = new LD51.LeaderboardUI(this.GUI.Root);
                    this._leaderboardUI.addOnClose(H5.fn.bind(this, function () {
                        this._play.Enabled = true;
                        this._leaderboards.Enabled = true;
                        this._creditsBtn.Enabled = true;
                        this._playfabText.Enabled = true;
                        this._title.Enabled = true;
                    }));

                    this._play.Enabled = false;
                    this._leaderboards.Enabled = false;
                    this._creditsBtn.Enabled = false;
                    this._playfabText.Enabled = false;
                    this._title.Enabled = false;
                }));
                this._leaderboards.Enabled = false;

                this._title = new JuiceboxEngine.GUI.Image(this.GUI.Root);
                this._title.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/title.png");
                this._title.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(424, 151);
                this._title.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._title.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.8);

                this._creditsBtn = new LD51.Button(this.GUI.Root, "Credits");
                this._creditsBtn.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(250, 55);
                this._creditsBtn.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.4);
                this._creditsBtn.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -139);
                this._creditsBtn.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._creditsBtn.addOnMouseUp(function (ev) { });

                var signin = new LD50.PlayfabSignin();
                signin.AutoLogin();
                signin.addOnStateChange(H5.fn.cacheBind(this, this.PlayfabStateChange));

                this._playfabText = new JuiceboxEngine.GUI.CanvasText(this.GUI.Root);
                this._playfabText.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, 64);
                this._playfabText.TextSize = 24;
                this._playfabText.Anchor = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._playfabText.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._playfabText.HorizontalAlignment = JuiceboxEngine.GUI.TextHorizontalAlignment.Center;
                this._playfabText.VerticalAlignment = JuiceboxEngine.GUI.TextVerticalAlignment.Top;
                this._playfabText.DisplayText = "Connecting to playfab...";
                this._playfabText.Font = "AldotheApache";
                this._playfabText.Color = new JuiceboxEngine.Math.Color.$ctor2(95, 205, 228, 255);
                this._playfabText.addOnMouseUp(H5.fn.bind(this, function (ev) {
                    this._nameChange = true;
                    this.AskUsername(null);
                }));
            },
            ClickPlayer: function (ev) {
                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.Click());
                this._player.GetComponent(JuiceboxEngine.Audio.AudioComponent).Stop();
                this._player.GetComponent(JuiceboxEngine.Audio.AudioComponent).Play();
            },
            Click: function () {
                var $s = 0,
                    $jff,
                    $rv,
                    sprite,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    sprite = this._player.GetComponent(JuiceboxEngine.Components.LayeredSpriteComponent);

                                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.2, function (x) {
                                            sprite.Size = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(6.0, 6.0), new JuiceboxEngine.Math.Vector2.$ctor3(5.0, 5.0), x);
                                        }));

                                        sprite.Color = new JuiceboxEngine.Math.Color.$ctor3(999.0, 999.0, 999.0, 1.0);
                                        $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(0.016);
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    sprite.Color = new JuiceboxEngine.Math.Color.$ctor3(1.0, 1.0, 1.0, 1.0);

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
            PlayfabStateChange: function (state) {
                switch (state) {
                    case LD50.PlayfabSignin.LoginState.NONE: 
                        this._playfabText.DisplayText = "Can't connect.";
                        break;
                    case LD50.PlayfabSignin.LoginState.SIGNED_OUT: 
                        this._playfabText.DisplayText = "Signed out.";
                        break;
                    case LD50.PlayfabSignin.LoginState.SIGNED_IN: 
                        this._playfabText.DisplayText = "Signed in.";
                        var task = JuiceboxEngine.Playfab.PlayfabManager.Identity.GetDisplayName(JuiceboxEngine.Playfab.PlayfabManager.Identity.PlayfabId);
                        task.addOnTaskCompleted(H5.fn.cacheBind(this, this.GotUsername));
                        this._leaderboards.Enabled = true;
                        break;
                    case LD50.PlayfabSignin.LoginState.REGISTERING: 
                        this._playfabText.DisplayText = "Registering...";
                        break;
                    case LD50.PlayfabSignin.LoginState.SIGNING_IN: 
                        this._playfabText.DisplayText = "Signing in...";
                        break;
                    case LD50.PlayfabSignin.LoginState.ERROR: 
                        this._playfabText.DisplayText = "Couldn't sign in...";
                        break;
                    default: 
                        break;
                }
            },
            Play: function () {
                if (JuiceboxEngine.Playfab.PlayfabManager.Identity.LoggedIn) {
                    if (this._askUsername) {
                        this.AskUsername(null);
                        return;
                    }
                }

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.PlayAnimation());
            },
            PlayAnimation: function () {
                var $s = 0,
                    $jff,
                    $rv,
                    startRot,
                    $ae;

                var $en = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($s) {
                                case 0: {
                                    this._startPlaying = true;
                                        startRot = this._player.Transform.Rotation2D;
                                        $en.current = new JuiceboxEngine.Coroutines.WaitForCoroutine.$ctor1(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.1, H5.fn.bind(this, function (x) {
                                            this._player.Transform.Rotation2D = JuiceboxEngine.Math.JMath.AngleInterpolate(startRot, -1.5707964, x);
                                        })));
                                        $s = 1;
                                        return true;
                                }
                                case 1: {
                                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                                            this._player.Transform.Position2D = JuiceboxEngine.Math.Vector2.op_Addition(this._player.Transform.Position2D.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(1280 * JuiceboxEngine.Util.Time.DeltaTime, 0));
                                        })));

                                        this.SceneManager.SwitchToScene(new LD51.MainScene(this.ResourceManager));

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
            AskUsername: function (task) {
                if (task != null) {
                    if (task.Success) {
                        if (!this._nameChange) {
                            JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.PlayAnimation());
                        }
                        this._nameChange = false;
                    }
                } else {
                    var defaultName = JuiceboxEngine.Playfab.PlayfabManager.Identity.Username;
                    if (defaultName == null) {
                        defaultName = System.String.format("Ice Driver #{0}", [JuiceboxEngine.Math.RandomNumbers.NextRange(1000, 10000)]);
                    }

                    var inputName = null;
                    var msg = task == null ? "Username for leaderboards" : "Error, please try a different name. (Name already taken?)";

                    try {
                        inputName = JuiceboxEngine.Util.Browser.Prompt(msg, defaultName);
                    } catch ($e1) {
                        $e1 = System.Exception.create($e1);
                        JuiceboxEngine.Util.Log.LogWarning(System.String.format("Can't show prompt. will use default name. ({0})", [defaultName]));
                    }

                    if (inputName == null) {
                        inputName = defaultName;
                    }

                    JuiceboxEngine.Playfab.PlayfabManager.Identity.UpdateDisplayName(inputName).addOnTaskCompleted(H5.fn.cacheBind(this, this.AskUsername));
                }
            },
            GotUsername: function (task) {
                if (task.Success) {
                    this.username = task.Response.InfoResultPayload.AccountInfo.TitleInfo.DisplayName;

                    if (this.username != null) {
                        this._playfabText.DisplayText = System.String.format("Signed in, welcome {0}", [this.username]);
                    } else {
                        this._askUsername = true;
                    }
                }
            },
            PreUpdate: function () {
                var $t;
                if (!this._startPlaying) {
                    $t = this._player.Transform;
                    $t.Rotation2D += 0.7853982 * JuiceboxEngine.Util.Time.DeltaTime;
                }
                this._background.Transform.Translate2D(JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(16, 16), JuiceboxEngine.Util.Time.DeltaTime));
            },
            PostUpdate: function () {

            },
            FinalizeScene: function () {

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
            _totalTime: 0,
            _hasControl: false,
            _deliveries: 0,
            _score: 0,
            _bonks: 0,
            _cleanDeliveries: 0,
            _driftDeliveries: 0,
            _collided: false,
            _invincible: false,
            _topPanel: null,
            _bottomPanel: null,
            _people: null,
            _currentPerson: null,
            _vroomAudio: null,
            _bonkAudio: null,
            _backgroundAudio: null,
            _currentLevel: 0,
            _isFirst: false,
            _driftSmoke: null
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

                var level = this.ResourceManager.Load(JuiceboxEngine.Level, "Levels/CityMap.json");
                level.LoadToScene(this);

                this._backgroundAudio = this.GetGameObjectByName("Music").GetComponent(JuiceboxEngine.Audio.AudioComponent);
                this._backgroundAudio.Volume = 0.5;

                this.PhysicsWorld.Gravity = new JuiceboxEngine.Math.Vector2.$ctor3(0, 0);
                var wallPlayerMaterial = this.PhysicsWorld.CreateContactMaterial(new JuiceboxEngine.Physics.P2Material.$ctor1("wall"), new JuiceboxEngine.Physics.P2Material.$ctor1("player"));
                wallPlayerMaterial.Friction = 0.0;

                this._player = this.GetGameObjectByName("Player");
                this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).addOnCollisionStay(H5.fn.cacheBind(this, this.PlayerCollisionStay));
                this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent).addOnCollisionStart(H5.fn.cacheBind(this, this.PlayerCollisionStart));
                this._controller = new LD51.PlayerController(this._player.GetComponent(JuiceboxEngine.Physics.P2PhysicsComponent));
                this._playerSprite = this._player.GetComponent(JuiceboxEngine.Components.LayeredSpriteComponent);

                this._driftSmoke = this._player.AddComponent(JuiceboxEngine.Particles.ContinuousParticleComponent);
                this._driftSmoke.Color = new JuiceboxEngine.Math.Color.$ctor3(1.0, 1.0, 1.0, 1.0);
                this._driftSmoke.EmmisionRate = 0.01;
                this._driftSmoke.Gravity = new JuiceboxEngine.Math.Vector2.$ctor3(0, 1.0);
                this._driftSmoke.addOnRequestParticle(function (particle) {
                    particle.size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), JuiceboxEngine.Math.RandomNumbers.NextRange$1(4.0, 6.0));
                    particle.velocity = new JuiceboxEngine.Math.Vector2.$ctor3(0, 0.1);
                    particle.rotation = JuiceboxEngine.Math.RandomNumbers.NextRange$1(0.0, JuiceboxEngine.Math.JMath.TWO_PI);
                    particle.lifeTime = JuiceboxEngine.Math.RandomNumbers.NextRange$1(0.5, 1.5);
                });
                this._driftSmoke.addOnParticleUpdate(function (particle) {
                    particle.size = JuiceboxEngine.Math.Vector2.op_Addition(particle.size.$clone(), JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(5, 5), JuiceboxEngine.Util.Time.DeltaTime));
                    particle.color = new JuiceboxEngine.Math.Color.$ctor3(1.0, 1.0, 1.0, JuiceboxEngine.Math.JMath.Interpolate(1.0, 0.0, particle.lifeProgress));
                });


                this._bonkAudio = this.AddGameObject$1("Bonk").AddComponent(JuiceboxEngine.Audio.AudioComponent);

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
                                    this._bonks = (this._bonks + 1) | 0;
                                        this._cleanDeliveries = 0;

                                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.2, H5.fn.bind(this, function (x) {
                                            this._playerSprite.Size = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(1.5, 1.5), new JuiceboxEngine.Math.Vector2.$ctor3(1.0, 1.0), x);
                                        })));

                                        JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.ShakeCamera(3, 0.5));

                                        if (this._hasControl) {
                                            this._bonkAudio.AudioClip = this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, System.String.format("Sounds/FX/Bop.mp3", null));
                                            this._bonkAudio.Play();
                                        }

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
                        this._player.GetComponent(JuiceboxEngine.Audio.AudioComponent).AudioClip = this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, System.String.format("Sounds/FX/Bliep{0}.mp3", [this._currentLevel]));
                        this._player.GetComponent(JuiceboxEngine.Audio.AudioComponent).Play();
                        this._deliveries = (this._deliveries + 1) | 0;
                        this._isFirst = false;

                        var pointStrings = new (System.Collections.Generic.List$1(System.String)).ctor();
                        var points = new (System.Collections.Generic.List$1(System.Int32)).ctor();

                        pointStrings.add("Delivery");
                        points.add(100);

                        if (this._timer > 7.0) {
                            pointStrings.add("Quick delivery!");
                            points.add(25);
                        } else if (this._timer > 5.0) {
                            pointStrings.add("Speed bonus!");
                            points.add(20);
                        } else if (this._timer > 3.0) {
                            pointStrings.add("Time to spare!");
                            points.add(15);
                        }


                        if (this._controller.Drifted) {
                            if (this._driftDeliveries === 0) {
                                pointStrings.add("Epic drift!");
                                points.add(10);
                            } else {
                                pointStrings.add(System.String.format("Epic drift! (x{0})", [((this._driftDeliveries + 1) | 0)]));
                                points.add(((10 + H5.Int.mul(this._driftDeliveries, 5)) | 0));
                            }

                            this._driftDeliveries = (this._driftDeliveries + 1) | 0;
                        } else {
                            this._driftDeliveries = 0;
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
                            if (this._cleanDeliveries === 0) {
                                pointStrings.add("Clean drive!");
                                points.add(25);
                            } else {
                                pointStrings.add(System.String.format("Clean drive! (x{0})", [((this._cleanDeliveries + 1) | 0)]));
                                points.add(((25 + H5.Int.mul(this._cleanDeliveries, 5)) | 0));
                            }

                            this._cleanDeliveries = (this._cleanDeliveries + 1) | 0;
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

                this._totalTime = 0;

                this._isFirst = true;
                this._currentPerson = System.Linq.Enumerable.from(this._people, LD51.PersonComponent).first();
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
                    if (!this._isFirst) {
                        this._timer -= JuiceboxEngine.Util.Time.DeltaTime;
                        this._timerUI.UpdateTime(this._timer);
                    }

                    this._totalTime += JuiceboxEngine.Util.Time.DeltaTime;
                }

                this._driftSmoke.EmmisionRate = this._controller.Drifting && this._hasControl ? 0.01 : 10000;

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

                                        this._backgroundAudio.AudioClip = this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Sounds/FX/GameOver.mp3");
                                        this._backgroundAudio.Loop = false;
                                        this._backgroundAudio.Play();

                                        if (JuiceboxEngine.Playfab.PlayfabManager.Identity.LoggedIn) {
                                            JuiceboxEngine.Playfab.PlayfabManager.Leaderboard.SetLeaderboardEntry(System.Array.init(["attempts", "bonks", "score", "deliveries", "deliveries_high", "drifts", "drifts_high", "time_played"], System.String), System.Array.init([1, this._bonks, this._score, this._deliveries, this._deliveries, this._controller.TotalDrifts, this._controller.TotalDrifts, H5.Int.clip32(this._totalTime)], System.Int32));
                                        }

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
                                    this._bigTextUI.ShowText("Game Over!", 5);

                                        flash.Remove();

                                        $en.current = new JuiceboxEngine.Coroutines.WaitForSeconds(6.0);
                                        $s = 3;
                                        return true;
                                }
                                case 3: {
                                    this.SceneManager.SwitchToScene(new LD51.MainMenu(this.ResourceManager));

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
            Drifting: false,
            TotalDrifts: 0,
            _driftTime: 0
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
                    this.Drifting = true;
                    this._driftTime += JuiceboxEngine.Util.Time.DeltaTime;

                    if (this._driftTime > 1.0) {
                        if (!this.Drifted) {
                            this.TotalDrifts = (this.TotalDrifts + 1) | 0;
                        }

                        this.Drifted = true;
                    }
                } else {
                    this.Drifting = false;
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
                    this._playerSprite.Rotation = JuiceboxEngine.Math.JMath.Interpolate(this._playerSprite.Rotation, this._playerPhysics.AngularVelocity / 2, 0.1 * (this._playerPhysics.Velocity.Length() / this.maxSpeed));
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

            game.Run(new LD51.MainMenu(game.ResourceManager));
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
