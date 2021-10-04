/**
 * @compiler H5 0.0.21310
 */
H5.assemblyVersion("LD49","1.0.0.0");
H5.assembly("LD49", function ($asm, globals) {
    "use strict";

    H5.define("LD49.CompleteUI", {
        inherits: [JuiceboxEngine.GUI.Panel],
        fields: {
            _level: null,
            _inner: null,
            _info: null
        },
        events: {
            OnComplete: null
        },
        ctors: {
            ctor: function (parent, level, time, win) {
                this.$initialize();
                JuiceboxEngine.GUI.Panel.ctor.call(this, parent);
                this._level = level;

                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(300, 460);
                this.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                var title = new JuiceboxEngine.GUI.Text(this);
                title.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache48.bff");
                title.DisplayText = win ? "LEVEL PASSED!" : "LEVEL FAILED!";
                title.ResizeToText(48);
                title.TextAlignment = JuiceboxEngine.GUI.TextAlignment.Center;
                title.Anchor = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                title.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                title.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(2, -2);

                title.Color = win ? JuiceboxEngine.Math.Color.Green.$clone() : JuiceboxEngine.Math.Color.Red.$clone();

                this._inner = new JuiceboxEngine.GUI.Text(this);
                this._inner.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache32.bff");
                this._inner.Anchor = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._inner.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                this._inner.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, -25);
                this._inner.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(295, 400);
                this._inner.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(2, -2);
                this._inner.DisplayText = win ? System.String.format("{0}\nTime: {1}", level.levelTitle, LD49.Program.FormatMS(time)) : "You've hit the kerb...";

                this._info = new JuiceboxEngine.GUI.Text(this);
                this._info.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache32.bff");
                this._info.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._info.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._info.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, 0);
                this._info.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(2, -2);
                this._info.DisplayText = "Submitting score...";
                this._info.ResizeToText(32);

                this.Color = new JuiceboxEngine.Math.Color.$ctor2(0, 0, 0, 32);

                var quit = new JuiceboxEngine.GUI.Panel(this);
                quit.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this.Dimensions.X / 3, 48);
                quit.Color = new JuiceboxEngine.Math.Color.$ctor2(128, 128, 128, 128);

                var quitImg = new JuiceboxEngine.GUI.Image(quit);
                quitImg.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                quitImg.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                quitImg.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/exit.png");
                quitImg.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(48, 48);
                quitImg.InputType = JuiceboxEngine.GUI.UIInput.NONE;
                quitImg.Color = JuiceboxEngine.Math.Color.Black.$clone();

                var quitfront = new JuiceboxEngine.GUI.Image(quitImg);
                quitfront.Position = new JuiceboxEngine.Math.Vector2.$ctor3(-2, 2);
                quitfront.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                quitfront.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                quitfront.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/exit.png");
                quitfront.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(48, 48);

                quit.addOnMouseEnter(function (x) {
                    quit.Color = new JuiceboxEngine.Math.Color.$ctor2(200, 200, 200, 128);
                });
                quit.addOnMouseExit(function (x) {
                    quit.Color = new JuiceboxEngine.Math.Color.$ctor2(128, 128, 128, 128);
                });
                quit.addOnMouseUp(H5.fn.bind(this, function (x) {
                    this.OnComplete(LD49.CompleteUI.CompleteUIResult.QUIT);
                }));

                var retry = new JuiceboxEngine.GUI.Panel(this);
                retry.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this.Dimensions.X / 3, 48);
                retry.Position = new JuiceboxEngine.Math.Vector2.$ctor3(this.Dimensions.X / 3, 0);
                retry.Color = new JuiceboxEngine.Math.Color.$ctor2(128, 128, 128, 128);

                var retryImg = new JuiceboxEngine.GUI.Image(retry);
                retryImg.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                retryImg.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                retryImg.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/arrow-right.png");
                retryImg.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(48, 48);
                retryImg.InputType = JuiceboxEngine.GUI.UIInput.NONE;
                retryImg.Color = JuiceboxEngine.Math.Color.Black.$clone();

                var retryfront = new JuiceboxEngine.GUI.Image(retryImg);
                retryfront.Position = new JuiceboxEngine.Math.Vector2.$ctor3(-2, 2);
                retryfront.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                retryfront.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                retryfront.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/arrow-right.png");
                retryfront.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(48, 48);

                retry.addOnMouseEnter(function (x) {
                    retry.Color = new JuiceboxEngine.Math.Color.$ctor2(200, 200, 200, 128);
                });
                retry.addOnMouseExit(function (x) {
                    retry.Color = new JuiceboxEngine.Math.Color.$ctor2(128, 128, 128, 128);
                });
                retry.addOnMouseUp(H5.fn.bind(this, function (x) {
                    this.OnComplete(LD49.CompleteUI.CompleteUIResult.RETRY);
                }));

                var next = new JuiceboxEngine.GUI.Panel(this);
                next.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this.Dimensions.X / 3, 48);
                next.Position = new JuiceboxEngine.Math.Vector2.$ctor3(this.Dimensions.X / 3 * 2, 0);
                next.Color = new JuiceboxEngine.Math.Color.$ctor2(128, 128, 128, 128);

                var nextImg = new JuiceboxEngine.GUI.Image(next);
                nextImg.Position = new JuiceboxEngine.Math.Vector2.$ctor3(1, -1);
                nextImg.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                nextImg.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                nextImg.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/next.png");
                nextImg.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(48, 48);
                nextImg.InputType = JuiceboxEngine.GUI.UIInput.NONE;
                nextImg.Color = JuiceboxEngine.Math.Color.Black.$clone();

                var nextfront = new JuiceboxEngine.GUI.Image(nextImg);
                nextfront.Position = new JuiceboxEngine.Math.Vector2.$ctor3(-2, 2);
                nextfront.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                nextfront.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                nextfront.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/next.png");
                nextfront.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(48, 48);

                next.addOnMouseEnter(function (x) {
                    next.Color = new JuiceboxEngine.Math.Color.$ctor2(200, 200, 200, 128);
                });
                next.addOnMouseExit(function (x) {
                    next.Color = new JuiceboxEngine.Math.Color.$ctor2(128, 128, 128, 128);
                });
                next.addOnMouseUp(H5.fn.bind(this, function (x) {
                    this.OnComplete(LD49.CompleteUI.CompleteUIResult.NEXT);
                }));

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                    this.Anchor = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(0.5, -0.5), JuiceboxEngine.GUI.UIDefaults.Centered.$clone(), JuiceboxEngine.Math.Easings.CubicEaseOut(x));
                })));
            }
        },
        methods: {
            GetLeaderboards: function () {
                this._info.DisplayText = "Getting leaderboards...";
                this._info.ResizeToText(32);

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.LeaderboardDelay());
            },
            LeaderboardDelay: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    task,
                    $async_e;

                var $enumerator = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSecondsRealTime(2.0);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    task = JuiceboxEngine.Playfab.PlayfabManager.Leaderboard.GetLeaderboardAroundPlayer(System.String.format("level{0}", [this._level.level]), 5);
                                        task.addOnTaskCompleted(H5.fn.cacheBind(this, this.RetrievedLeaderboard));

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
            RetrievedLeaderboard: function (task) {
                var $t, $t1;
                this._info.DisplayText = "";
                this._info.ResizeToText(32);

                var leaderboardTask = (H5.as(task, JuiceboxEngine.Playfab.PlayfabTaskLeaderboard));

                ($t = this._inner).DisplayText = ($t.DisplayText || "") + "\n\nLeaderboard:\n";

                if (task.Success) {
                    var list = leaderboardTask.Leaderboard.Entries;

                    var offsetRanking = 0;

                    for (var i = 0; i < list.Count; i = (i + 1) | 0) {
                        var entry = list.getItem(i).$clone();

                        entry.position = (entry.position + offsetRanking) | 0;

                        if (entry.value === 0 && H5.referenceEquals(entry.playfabId, JuiceboxEngine.Playfab.PlayfabManager.Identity.PlayfabId)) {
                            offsetRanking = (offsetRanking - 1) | 0;
                            continue;
                        }

                        var entryUI = new LD49.LeaderboardEntryUI(this, entry.$clone());
                        entryUI.Position = new JuiceboxEngine.Math.Vector2.$ctor3(5.0, 250 - i * (entryUI.Dimensions.Y + 1));
                    }
                } else {
                    ($t1 = this._inner).DisplayText = ($t1.DisplayText || "") + "\nError getting leaderboard...";
                }
            }
        }
    });

    H5.define("LD49.CompleteUI.CompleteUIResult", {
        $kind: "nested enum",
        statics: {
            fields: {
                QUIT: 0,
                RETRY: 1,
                NEXT: 2
            }
        }
    });

    H5.define("LD49.Goal", {
        statics: {
            fields: {
                GOAL_WIDTH: 0,
                GOAL_LENGTH: 0,
                TRUCK_OFFSET: null,
                TRAILER_OFFSET: null,
                DISTANCE: 0
            },
            ctors: {
                init: function () {
                    this.TRUCK_OFFSET = new JuiceboxEngine.Math.Vector2();
                    this.TRAILER_OFFSET = new JuiceboxEngine.Math.Vector2();
                    this.GOAL_WIDTH = 14;
                    this.GOAL_LENGTH = 32;
                    this.TRUCK_OFFSET = new JuiceboxEngine.Math.Vector2.$ctor3(-10, 0);
                    this.TRAILER_OFFSET = new JuiceboxEngine.Math.Vector2.$ctor3(3, 0);
                    this.DISTANCE = 2.5;
                }
            }
        },
        fields: {
            GameObj: null,
            _sprite: null,
            _player: null,
            _hasBeenReached: false
        },
        events: {
            OnGoalReached: null
        },
        ctors: {
            ctor: function (scene, position, rotation, player) {
                this.$initialize();
                this._player = player;

                this.GameObj = scene.AddGameObject$1("goal");

                this.GameObj.Transform.Position2D = position.$clone();
                this.GameObj.Transform.Rotation2D = rotation;

                this._sprite = this.GameObj.AddComponent(JuiceboxEngine.Sprite);
                this._sprite.Texture = scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/goal.png");
                this._sprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, LD49.Goal.GOAL_LENGTH, LD49.Goal.GOAL_WIDTH);
                this._sprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(((H5.Int.div(((-LD49.Goal.GOAL_LENGTH) | 0), 2)) | 0), ((H5.Int.div(((-LD49.Goal.GOAL_WIDTH) | 0), 2)) | 0));
            }
        },
        methods: {
            Update: function () {
                this._sprite.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, H5.Int.mul(LD49.Goal.GOAL_WIDTH, (H5.Int.clip32((2 * JuiceboxEngine.Util.Time.TotalSeconds)) % 2)), LD49.Goal.GOAL_LENGTH, LD49.Goal.GOAL_WIDTH);

                var pos = this.GameObj.Transform.Position2D.$clone();
                var rot = this.GameObj.Transform.Rotation2D;

                var truckPos = JuiceboxEngine.Math.Vector2.op_Addition(JuiceboxEngine.Math.Vector2.Rotate(LD49.Goal.TRUCK_OFFSET.$clone(), rot), pos.$clone());
                var trailerPos = JuiceboxEngine.Math.Vector2.op_Addition(JuiceboxEngine.Math.Vector2.Rotate(LD49.Goal.TRAILER_OFFSET.$clone(), rot), pos.$clone());

                var truckDistance = JuiceboxEngine.Math.JMath.Abs(JuiceboxEngine.Math.Vector2.Distance(this._player.Position.$clone(), truckPos.$clone()));
                var trailerDistance = JuiceboxEngine.Math.JMath.Abs(JuiceboxEngine.Math.Vector2.Distance(this._player.Attached.Position.$clone(), trailerPos.$clone()));

                if (this._hasBeenReached === false && truckDistance < LD49.Goal.DISTANCE && trailerDistance < LD49.Goal.DISTANCE) {
                    this._hasBeenReached = true;
                    !H5.staticEquals(this.OnGoalReached, null) ? this.OnGoalReached() : null;
                }

            }
        }
    });

    H5.define("LD49.LeaderboardEntryUI", {
        inherits: [JuiceboxEngine.GUI.Panel],
        ctors: {
            ctor: function (parent, entry) {
                this.$initialize();
                JuiceboxEngine.GUI.Panel.ctor.call(this, parent);
                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(290, 48);

                if (entry.position === 1) {
                    this.Color = new JuiceboxEngine.Math.Color.$ctor2(255, 215, 0, 255);
                } else {
                    if (entry.position === 2) {
                        this.Color = new JuiceboxEngine.Math.Color.$ctor2(192, 192, 192, 255);
                    } else {
                        if (entry.position === 3) {
                            this.Color = new JuiceboxEngine.Math.Color.$ctor2(176, 141, 87, 255);
                        } else {
                            if (entry.position % 2 === 0) {
                                this.Color = new JuiceboxEngine.Math.Color.$ctor2(128, 128, 128, 255);
                            } else {
                                if (entry.position % 2 === 1) {
                                    this.Color = new JuiceboxEngine.Math.Color.$ctor2(140, 140, 140, 255);
                                }
                            }
                        }
                    }
                }

                var user = new JuiceboxEngine.GUI.Text(this);
                user.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache32.bff");
                user.DisplayText = System.String.format("#{0} {1}", entry.position, (entry.displayName == null ? entry.playfabId : entry.displayName));
                user.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(290, 32);
                user.TextAlignment = JuiceboxEngine.GUI.TextAlignment.Left;
                user.Anchor = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                user.Pivot = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                user.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(2, -2);

                if (H5.referenceEquals(entry.playfabId, JuiceboxEngine.Playfab.PlayfabManager.Identity.PlayfabId)) {
                    user.Color = JuiceboxEngine.Math.Color.Green.$clone();
                }

                var time = new JuiceboxEngine.GUI.Text(this);
                time.Position = new JuiceboxEngine.Math.Vector2.$ctor3(-3, -3);
                time.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache32.bff");
                time.DisplayText = System.String.format("{0}", [LD49.Program.FormatMS(((-entry.value) | 0))]);
                time.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(290, 32);
                time.ResizeToText(32);
                time.Color = new JuiceboxEngine.Math.Color.$ctor2(230, 230, 230, 255);
                time.TextAlignment = JuiceboxEngine.GUI.TextAlignment.Right;
                time.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomRight.$clone();
                time.Pivot = JuiceboxEngine.GUI.UIDefaults.BottomRight.$clone();
                time.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(2, -2);
            }
        }
    });

    H5.define("LD49.LevelProperties", {
        statics: {
            fields: {
                LEVELS: null
            },
            ctors: {
                init: function () {
                    var $t;
                    this.LEVELS = System.Array.init([($t = new LD49.LevelProperties(), $t.level = 1, $t.levelTitle = "Driving lessons", $t.levelDescription = "Get comfortable driving, and park the truck in the highlighted area! Avoid driving on the kerbs.", $t.truckStart = new JuiceboxEngine.Math.Vector2.$ctor3(300.24838, 186.24524), $t.truckRotation = 5.1417403, $t.trailerStart = new JuiceboxEngine.Math.Vector2.$ctor3(312.04663, 191.70413), $t.trailerRotation = 2.0066514, $t.goalPosition = new JuiceboxEngine.Math.Vector2.$ctor3(232, 296), $t.goalRotation = 4.712389, $t), ($t = new LD49.LevelProperties(), $t.level = 2, $t.levelTitle = "Avoiding kerbs", $t.levelDescription = "It's important not to hit any kerbs with your truck or trailer!", $t.truckStart = new JuiceboxEngine.Math.Vector2.$ctor3(221.79013, 211.7434), $t.truckRotation = 0.9136799, $t.trailerStart = new JuiceboxEngine.Math.Vector2.$ctor3(215.68684, 222.50478), $t.trailerRotation = 3.4129753, $t.goalPosition = new JuiceboxEngine.Math.Vector2.$ctor3(336, 264), $t.goalRotation = JuiceboxEngine.Math.JMath.PI, $t), ($t = new LD49.LevelProperties(), $t.level = 3, $t.levelTitle = "Kerbside parking", $t.levelDescription = "Careful not to go onto the kerb!", $t.truckStart = new JuiceboxEngine.Math.Vector2.$ctor3(333.17395, 197.8499), $t.truckRotation = 13.105678, $t.trailerStart = new JuiceboxEngine.Math.Vector2.$ctor3(322.67145, 203.15962), $t.trailerRotation = 4.5846167, $t.goalPosition = new JuiceboxEngine.Math.Vector2.$ctor3(288, 264), $t.goalRotation = JuiceboxEngine.Math.JMath.PI, $t), ($t = new LD49.LevelProperties(), $t.level = 4, $t.levelTitle = "Narrow path", $t.levelDescription = "keep following the path to the end.", $t.truckStart = new JuiceboxEngine.Math.Vector2.$ctor3(180.19095, 160.73499), $t.truckRotation = 14.108369, $t.trailerStart = new JuiceboxEngine.Math.Vector2.$ctor3(167.19324, 160.81992), $t.trailerRotation = -1.5634161, $t.goalPosition = new JuiceboxEngine.Math.Vector2.$ctor3(320, 360), $t.goalRotation = JuiceboxEngine.Math.JMath.PI, $t), ($t = new LD49.LevelProperties(), $t.level = 5, $t.levelTitle = "Going backwards", $t.levelDescription = "Driving backwards is difficult, it's very unstable. Try small corrections to keep balance!", $t.truckStart = new JuiceboxEngine.Math.Vector2.$ctor3(232.58258, 304.5005), $t.truckRotation = 12.315043, $t.trailerStart = new JuiceboxEngine.Math.Vector2.$ctor3(237.90675, 316.22437), $t.trailerRotation = 2.606301, $t.goalPosition = new JuiceboxEngine.Math.Vector2.$ctor3(200, 164), $t.goalRotation = 4.712389, $t), ($t = new LD49.LevelProperties(), $t.level = 6, $t.levelTitle = "Sandwich", $t.levelDescription = "Kerbs on both sides make it more difficult to line up properly.", $t.truckStart = new JuiceboxEngine.Math.Vector2.$ctor3(232.58258, 304.5005), $t.truckRotation = 12.315043, $t.trailerStart = new JuiceboxEngine.Math.Vector2.$ctor3(237.90675, 316.22437), $t.trailerRotation = 2.606301, $t.goalPosition = new JuiceboxEngine.Math.Vector2.$ctor3(344, 164), $t.goalRotation = 4.712389, $t), ($t = new LD49.LevelProperties(), $t.level = 7, $t.levelTitle = "Keep it straight", $t.levelDescription = "Keep the trailer pointed back!", $t.truckStart = new JuiceboxEngine.Math.Vector2.$ctor3(280.5806, 220.77324), $t.truckRotation = 22.048222, $t.trailerStart = new JuiceboxEngine.Math.Vector2.$ctor3(281.44006, 207.80202), $t.trailerRotation = 0.0718453, $t.goalPosition = new JuiceboxEngine.Math.Vector2.$ctor3(344, 164), $t.goalRotation = 4.712389, $t), ($t = new LD49.LevelProperties(), $t.level = 8, $t.levelTitle = "Tight fit", $t.levelDescription = "This manoeuvre requires a lot of attention!", $t.truckStart = new JuiceboxEngine.Math.Vector2.$ctor3(232.58258, 304.5005), $t.truckRotation = 12.315043, $t.trailerStart = new JuiceboxEngine.Math.Vector2.$ctor3(237.90675, 316.22437), $t.trailerRotation = 2.606301, $t.goalPosition = new JuiceboxEngine.Math.Vector2.$ctor3(336, 164), $t.goalRotation = 4.712389, $t), ($t = new LD49.LevelProperties(), $t.level = 9, $t.levelTitle = "Parralel hell", $t.levelDescription = "Parralel park your trailer into the space!", $t.truckStart = new JuiceboxEngine.Math.Vector2.$ctor3(321.8217, 157.0471), $t.truckRotation = 14.186909, $t.trailerStart = new JuiceboxEngine.Math.Vector2.$ctor3(308.8385, 157.21063), $t.trailerRotation = 4.660849, $t.goalPosition = new JuiceboxEngine.Math.Vector2.$ctor3(356, 272), $t.goalRotation = 4.712389, $t), ($t = new LD49.LevelProperties(), $t.level = 10, $t.levelTitle = "Final test", $t.levelDescription = "Reverse all the way!", $t.truckStart = new JuiceboxEngine.Math.Vector2.$ctor3(160.58258, 304.5005), $t.truckRotation = 12.315043, $t.trailerStart = new JuiceboxEngine.Math.Vector2.$ctor3(160.90675, 316.22437), $t.trailerRotation = 2.606301, $t.goalPosition = new JuiceboxEngine.Math.Vector2.$ctor3(304, 164), $t.goalRotation = 4.712389, $t)], LD49.LevelProperties);
                }
            }
        },
        fields: {
            level: 0,
            levelTitle: null,
            levelDescription: null,
            truckStart: null,
            truckRotation: 0,
            trailerStart: null,
            trailerRotation: 0,
            goalPosition: null,
            goalRotation: 0
        },
        ctors: {
            init: function () {
                this.truckStart = new JuiceboxEngine.Math.Vector2();
                this.trailerStart = new JuiceboxEngine.Math.Vector2();
                this.goalPosition = new JuiceboxEngine.Math.Vector2();
            }
        }
    });

    H5.define("LD49.LevelUI", {
        inherits: [JuiceboxEngine.GUI.Panel],
        fields: {
            _levelInfo: null
        },
        ctors: {
            ctor: function (parent, level) {
                this.$initialize();
                JuiceboxEngine.GUI.Panel.ctor.call(this, parent);
                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(99999, 99999);
                this.Color = JuiceboxEngine.Math.Color.Black.$clone();
                this.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                var title = new JuiceboxEngine.GUI.Text(parent);
                title.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache48.bff");
                title.DisplayText = level.levelTitle;
                title.ResizeToText(48);
                title.TextAlignment = JuiceboxEngine.GUI.TextAlignment.Center;
                title.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.8);
                title.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                title.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(2, -2);

                var desc = new JuiceboxEngine.GUI.Text(title);
                desc.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache32.bff");
                desc.DisplayText = level.levelDescription;
                desc.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(200, 300);
                desc.TextAlignment = JuiceboxEngine.GUI.TextAlignment.Center;
                desc.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();
                desc.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                desc.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(2, -2);

                this._levelInfo = new (System.Collections.Generic.List$1(JuiceboxEngine.GUI.Text)).ctor();

                this._levelInfo.add(title);
                this._levelInfo.add(desc);

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(0.5, H5.fn.bind(this, function (x) {
                    this.Color = new JuiceboxEngine.Math.Color.$ctor3(1.0 - x, 1.0 - x, 1.0 - x, 1.0 - x);
                })));
            }
        },
        methods: {
            FadeOut: function () {
                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                    var fade = 1.0 - x;
                    for (var i = 0; i < this._levelInfo.Count; i = (i + 1) | 0) {
                        this._levelInfo.getItem(i).Color = new JuiceboxEngine.Math.Color.$ctor3(fade, fade, fade, fade);
                        this._levelInfo.getItem(i).ShadowColor = new JuiceboxEngine.Math.Color.$ctor3(0, 0, 0, fade);
                    }
                })));
            }
        }
    });

    H5.define("LD49.MainMenu", {
        inherits: [JuiceboxEngine.Scene],
        fields: {
            _loginID: null,
            _nameText: null,
            _logo: null,
            _play: null,
            _levelName: null,
            _highestLevel: 0,
            _selectedLevel: 0,
            _lbEntries: null
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);

            }
        },
        methods: {
            InitializeScene: function () {
                var $t;
                this._lbEntries = new (System.Collections.Generic.List$1(LD49.LeaderboardEntryUI)).ctor();

                var highestLevelStr = ($t = JuiceboxEngine.Util.LocalStorage.GetValue("highest_level")) != null ? H5.toString($t) : null;

                if (highestLevelStr == null) {
                    JuiceboxEngine.Util.LocalStorage.StoreValue("highest_level", 1);
                    this._highestLevel = 1;
                } else {
                    if (!System.Int32.tryParse(highestLevelStr, H5.ref(this, "_highestLevel"))) {
                        this._highestLevel = 1;
                    }
                }

                this.SceneManager.FadeInDuration = 0.0;
                this.SceneManager.FadeOutDuration = 0.5;

                this._nameText = new JuiceboxEngine.GUI.Text(this.GUI.Root);
                this._nameText.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(9999, 16);
                this._nameText.DisplayText = "Please wait...";

                this._nameText.addOnMouseUp(H5.fn.bind(this, function (ev) {
                    this.AskUsername("Username for leaderboards:");
                }));

                this._logo = new JuiceboxEngine.GUI.Image(this.GUI.Root);
                this._logo.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/logo.png");
                this._logo.Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                this._logo.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.Opening());

                this.Login();
            },
            Opening: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    play,
                    next,
                    prev,
                    $async_e;

                var $enumerator = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(1.0);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                                            this._logo.Dimensions = JuiceboxEngine.Math.Vector2.Interpolate(JuiceboxEngine.Math.Vector2.Zero.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(this._logo.DisplayImage.Width, this._logo.DisplayImage.Height), JuiceboxEngine.Math.Easings.ElasticEaseOut(x));
                                        })));

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(1.0);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                                            this._logo.Anchor = JuiceboxEngine.Math.Vector2.Interpolate(JuiceboxEngine.GUI.UIDefaults.Centered.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.85), JuiceboxEngine.Math.Easings.QuarticEaseOut(x));
                                        })));

                                        if (this._highestLevel === 1) {
                                            play = new JuiceboxEngine.GUI.Text(this.GUI.Root);
                                            play.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache48.bff");
                                            play.DisplayText = "START GAME";
                                            play.ResizeToText(48);
                                            play.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                                            play.addOnMouseUp(H5.fn.bind(this, function (ev) {
                                                this.ResumeGame(1);
                                            }));
                                            play.addOnMouseEnter(function (ev) {
                                                play.Color = JuiceboxEngine.Math.Color.Green.$clone();
                                            });
                                            play.addOnMouseExit(function (ev) {
                                                play.Color = JuiceboxEngine.Math.Color.White.$clone();
                                            });

                                            JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, function (x) {
                                                play.Anchor = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(0.5, -0.5), new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5), JuiceboxEngine.Math.Easings.CubicEaseOut(x));
                                            }));
                                        } else {
                                            this._play = new JuiceboxEngine.GUI.Text(this.GUI.Root);
                                            this._play.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache48.bff");
                                            this._play.DisplayText = System.String.format("Play level {0}", [this._selectedLevel]);
                                            this._play.ResizeToText(48);
                                            this._play.Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                                            this._play.addOnMouseUp(H5.fn.bind(this, function (ev) {
                                                this.ResumeGame(this._selectedLevel);
                                            }));
                                            this._play.addOnMouseEnter(H5.fn.bind(this, function (ev) {
                                                this._play.Color = JuiceboxEngine.Math.Color.Green.$clone();
                                            }));
                                            this._play.addOnMouseExit(H5.fn.bind(this, function (ev) {
                                                this._play.Color = JuiceboxEngine.Math.Color.White.$clone();
                                            }));

                                            next = new JuiceboxEngine.GUI.Text(this._play);
                                            next.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache48.bff");
                                            next.DisplayText = "  next";
                                            next.ResizeToText(48);
                                            next.Pivot = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                                            next.Anchor = JuiceboxEngine.GUI.UIDefaults.CenterRight.$clone();

                                            next.addOnMouseUp(H5.fn.bind(this, function (ev) {
                                                this.SelectLevel(((this._selectedLevel = (this._selectedLevel + 1) | 0)));
                                            }));
                                            next.addOnMouseEnter(function (ev) {
                                                next.Color = JuiceboxEngine.Math.Color.Green.$clone();
                                            });
                                            next.addOnMouseExit(function (ev) {
                                                next.Color = JuiceboxEngine.Math.Color.White.$clone();
                                            });

                                            prev = new JuiceboxEngine.GUI.Text(this._play);
                                            prev.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache48.bff");
                                            prev.DisplayText = "prev  ";
                                            prev.ResizeToText(48);
                                            prev.Pivot = JuiceboxEngine.GUI.UIDefaults.TopRight.$clone();
                                            prev.Anchor = JuiceboxEngine.GUI.UIDefaults.CenterLeft.$clone();

                                            prev.addOnMouseUp(H5.fn.bind(this, function (ev) {
                                                this.SelectLevel(((this._selectedLevel = (this._selectedLevel - 1) | 0)));
                                            }));
                                            prev.addOnMouseEnter(function (ev) {
                                                prev.Color = JuiceboxEngine.Math.Color.Green.$clone();
                                            });
                                            prev.addOnMouseExit(function (ev) {
                                                prev.Color = JuiceboxEngine.Math.Color.White.$clone();
                                            });


                                            this._levelName = new JuiceboxEngine.GUI.Text(this._play);
                                            this._levelName.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache32.bff");
                                            this._levelName.DisplayText = System.String.format("", null);
                                            this._levelName.ResizeToText(32);
                                            this._levelName.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();
                                            this._levelName.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                                            this._levelName.Color = new JuiceboxEngine.Math.Color.$ctor2(200, 200, 200, 255);

                                            this.SelectLevel(this._highestLevel);

                                            JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                                                this._play.Anchor = JuiceboxEngine.Math.Vector2.Interpolate(new JuiceboxEngine.Math.Vector2.$ctor3(0.5, -0.5), new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.6), JuiceboxEngine.Math.Easings.CubicEaseOut(x));
                                            })));
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
            },
            PreUpdate: function () {

            },
            SelectLevel: function (selected) {
                this._selectedLevel = JuiceboxEngine.Math.JMath.Clamp(selected, 1, JuiceboxEngine.Math.JMath.Min(this._highestLevel, LD49.LevelProperties.LEVELS.length));
                this._play.DisplayText = System.String.format("Play level {0}", [this._selectedLevel]);
                this._play.ResizeToText(48);

                this._levelName.DisplayText = System.String.format("{0}", [LD49.LevelProperties.LEVELS[((this._selectedLevel - 1) | 0)].levelTitle]);
                this._levelName.ResizeToText(32);

                JuiceboxEngine.Playfab.PlayfabManager.Leaderboard.GetLeaderboard(System.String.format("level{0}", [this._selectedLevel]), 0, 10).addOnTaskCompleted(H5.fn.cacheBind(this, this.GetLeaderboard));
            },
            GetLeaderboard: function (task) {
                var lbTask = H5.as(task, JuiceboxEngine.Playfab.PlayfabTaskLeaderboard);

                if (H5.referenceEquals(lbTask.Leaderboard.Name, System.String.format("level{0}", [this._selectedLevel]))) {
                    this._levelName.Children.clear();
                    this._lbEntries.clear();

                    for (var i = 0; i < lbTask.Leaderboard.Entries.Count; i = (i + 1) | 0) {
                        var entry = lbTask.Leaderboard.Entries.getItem(i).$clone();
                        var ui = new LD49.LeaderboardEntryUI(this._levelName, entry.$clone());

                        ui.Anchor = JuiceboxEngine.GUI.UIDefaults.BottomCenter.$clone();
                        ui.Pivot = JuiceboxEngine.GUI.UIDefaults.TopCenter.$clone();
                        ui.Position = new JuiceboxEngine.Math.Vector2.$ctor3(0, i * (-ui.Dimensions.Y + 1));

                        this._lbEntries.add(ui);
                    }
                }
            },
            ResumeGame: function (selected) {
                if (JuiceboxEngine.Playfab.PlayfabManager.Identity.Username == null) {
                    this.AskUsername("Username for leaderboards:");
                }

                this.SceneManager.SwitchToScene(new LD49.MainScene(this.ResourceManager, selected));
            },
            LateUpdate: function () {

            },
            FinalizeScene: function () {

            },
            Login: function () {
                this._loginID = JuiceboxEngine.Util.LocalStorage.GetValue("login_id");

                if (this._loginID == null) {
                    this._loginID = System.Guid.NewGuid().toString();

                    System.Console.WriteLine("Registering with Playfab...");
                    this._nameText.DisplayText = "Registering...";
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
                    this._nameText.DisplayText = "Welcome! Click here to change your name.";
                    System.Console.WriteLine(System.String.format("Logged in with Playfab! {0}", [JuiceboxEngine.Playfab.PlayfabManager.Identity.Username]));

                    JuiceboxEngine.Playfab.PlayfabManager.Identity.GetDisplayNameTask.addOnTaskCompleted(H5.fn.bind(this, function (nameTask) {
                        if (JuiceboxEngine.Playfab.PlayfabManager.Identity.Username != null) {
                            this._nameText.DisplayText = System.String.format("Welcome, {0}! Click here to change your name.", [JuiceboxEngine.Playfab.PlayfabManager.Identity.Username]);
                        }
                    }));
                } else {
                    System.Console.WriteLine("Failed to log in with Playfab.");
                }
            },
            AskUsername: function (msg) {
                var preview = JuiceboxEngine.Playfab.PlayfabManager.Identity.Username == null ? System.String.format("Trucker #{0}", [JuiceboxEngine.Util.Random.NextRange(0, 999999)]) : JuiceboxEngine.Playfab.PlayfabManager.Identity.Username;
                var username = JuiceboxEngine.Util.Browser.Prompt(msg, preview);

                if (username == null) {
                    if (JuiceboxEngine.Playfab.PlayfabManager.Identity.Username == null) {
                        username = preview;
                    } else {
                        return;
                    }
                }

                var task = JuiceboxEngine.Playfab.PlayfabManager.Identity.UpdateDisplayName(username);
                task.addOnTaskCompleted(H5.fn.cacheBind(this, this.UpdateUsername));
            },
            UpdateUsername: function (task) {
                if (task.Success) {
                    this._nameText.DisplayText = System.String.format("Welcome, {0}! Click here to change your name.", [JuiceboxEngine.Playfab.PlayfabManager.Identity.Username]);
                } else {
                    this.AskUsername("Something went wrong. Please try again. " + (task.ErrorMessage || ""));
                }
            }
        }
    });

    /** @namespace LD49 */

    /**
     * Example of a scene.
     *
     * @class LD49.MainScene
     * @augments JuiceboxEngine.Scene
     */
    H5.define("LD49.MainScene", {
        inherits: [JuiceboxEngine.Scene],
        fields: {
            _truck: null,
            _trailer: null,
            _goal: null,
            _tileMap: null,
            _level: null,
            _canTakeControl: false,
            _hasControl: false,
            _mapBytes: null,
            _time: 0,
            _timer: null,
            _completeUI: null,
            _ui: null,
            _touch: null,
            _soundFX: null
        },
        ctors: {
            /**
             * Scene constructor, not for any game setup.
             Use {@link } instead.
             *
             * @instance
             * @public
             * @this LD49.MainScene
             * @memberof LD49.MainScene
             * @param   {JuiceboxEngine.Resources.ResourceManager}    manager    The resource manager to use for this scene.
             * @param   {number}                                      level
             * @return  {void}
             */
            ctor: function (manager, level) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);
                this._level = LD49.LevelProperties.LEVELS[((level - 1) | 0)];
            }
        },
        methods: {
            /**
             * Initialize the scene. Game objects can be accessed and created here.
             *
             * @instance
             * @protected
             * @override
             * @this LD49.MainScene
             * @memberof LD49.MainScene
             * @return  {void}
             */
            InitializeScene: function () {
                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(30, 144, 255, 255);
                this.DefaultCamera.Zoom = 4;

                this._soundFX = this.DefaultCamera.Parent.AddComponent(JuiceboxEngine.Audio.AudioComponent);
                this._soundFX.SetAudioClip(this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Sounds/win.mp3"));

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(true);

                this._truck = new LD49.Vehicle(this, 0, this._level.truckStart.$clone(), this._level.truckRotation);
                this._trailer = new LD49.Vehicle(this, 1, this._level.trailerStart.$clone(), this._level.trailerRotation);

                this._goal = new LD49.Goal(this, this._level.goalPosition.$clone(), this._level.goalRotation, this._truck);
                this._goal.addOnGoalReached(H5.fn.cacheBind(this, this.GoalReached));

                this._truck.AttachVehicle(this._trailer);

                var map = this.AddGameObject$1("map");
                this._tileMap = map.AddComponent(JuiceboxEngine.TileMap);
                this._tileMap.Sprites = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/maptiles.png");
                this._tileMap.MapData = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/level{0}.png", [this._level.level]));
                this._tileMap.TileSize = 16;

                this._mapBytes = this._tileMap.MapData.GetPixels(new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, this._tileMap.MapData.Width, this._tileMap.MapData.Height));

                if (JuiceboxEngine.Util.Browser.IsMobile()) {
                    this._touch = new LD49.TouchUI(this.GUI.Root);
                    this.DefaultCamera.Zoom = 2;
                }

                this._ui = new LD49.LevelUI(this.GUI.Root, this._level);

                this._timer = new JuiceboxEngine.GUI.Text(this.GUI.Root);
                this._timer.DisplayText = "";
                this._timer.Anchor = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                this._timer.Pivot = JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone();
                this._timer.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(9999, 32);
                this._timer.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/AldotheApache32.bff");
                this._timer.ShadowOffset = new JuiceboxEngine.Math.Point.$ctor1(2, -2);

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this.StartSequence());
            },
            StartSequence: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    originalZoom,
                    zoomIn,
                    startPos,
                    $async_e;

                var $enumerator = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    originalZoom = this.DefaultCamera.Zoom;
                                        zoomIn = originalZoom * 2;

                                        startPos = this._truck.Position.$clone();

                                        this.DefaultCamera.Zoom = zoomIn;
                                        this.DefaultCamera.Parent.Transform.Position2D = startPos.$clone();

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(1.0);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                                            this.DefaultCamera.Zoom = JuiceboxEngine.Math.JMath.Interpolate(zoomIn, originalZoom, JuiceboxEngine.Math.Easings.CubicEaseOut(x));

                                            var targetPos = this.GetCameraTargetPos();

                                            this.DefaultCamera.Parent.Transform.Position2D = JuiceboxEngine.Math.Vector2.Interpolate(startPos.$clone(), targetPos.$clone(), JuiceboxEngine.Math.Easings.CubicEaseOut(x));
                                        })));

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitForSeconds(1.0);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    this._canTakeControl = true;

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
            GoalReached: function () {
                var $t;
                this._hasControl = false;
                this._canTakeControl = false;

                this._soundFX.Play();

                var time = (-H5.Int.clip32((this._time * 1000))) | 0;
                var lbTask = JuiceboxEngine.Playfab.PlayfabManager.Leaderboard.SetLeaderboardEntry(System.Array.init([System.String.format("level{0}", [this._level.level])], System.String), System.Array.init([time], System.Int32));
                lbTask.addOnTaskCompleted(H5.fn.cacheBind(this, this.OnLeaderboardComplete));

                var highestLevel = { v : 1 };

                var highestLevelStr = ($t = JuiceboxEngine.Util.LocalStorage.GetValue("highest_level")) != null ? H5.toString($t) : null;
                if (highestLevelStr != null) {
                    System.Int32.tryParse(highestLevelStr, highestLevel);
                }

                if (highestLevel.v <= this._level.level) {
                    highestLevel.v = (highestLevel.v + 1) | 0;
                    JuiceboxEngine.Util.LocalStorage.StoreValue("highest_level", highestLevel.v);
                }

                var cameraPos = this.DefaultCamera.Parent.Transform.Position2D.$clone();

                var zoomOut = this.DefaultCamera.Zoom;
                var zoomIn = zoomOut * 2;

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                    this.DefaultCamera.Zoom = JuiceboxEngine.Math.JMath.Interpolate(zoomOut, zoomIn, JuiceboxEngine.Math.Easings.CubicEaseOut(x));
                    this.DefaultCamera.Parent.Transform.Position2D = JuiceboxEngine.Math.Vector2.Interpolate(cameraPos.$clone(), this._truck.Position.$clone(), JuiceboxEngine.Math.Easings.CubicEaseOut(x));

                    if (this._touch != null) {
                        this._touch.Pivot = JuiceboxEngine.Math.Vector2.Interpolate(JuiceboxEngine.GUI.UIDefaults.BottomLeft.$clone(), JuiceboxEngine.GUI.UIDefaults.TopLeft.$clone(), x);
                    }
                })));

                this._completeUI = new LD49.CompleteUI(this.GUI.Root, this._level, time, true);
                this._completeUI.addOnComplete(H5.fn.cacheBind(this, this.EndSequence));
            },
            OnLeaderboardComplete: function (task) {
                this._completeUI.GetLeaderboards();
            },
            EndSequence: function (result) {
                switch (result) {
                    case LD49.CompleteUI.CompleteUIResult.QUIT: 
                        this.SceneManager.SwitchToScene(new LD49.MainMenu(this.ResourceManager));
                        break;
                    case LD49.CompleteUI.CompleteUIResult.RETRY: 
                        this.SceneManager.SwitchToScene(new LD49.MainScene(this.ResourceManager, this._level.level));
                        break;
                    case LD49.CompleteUI.CompleteUIResult.NEXT: 
                        if (this._level.level !== LD49.LevelProperties.LEVELS.length) {
                            this.SceneManager.SwitchToScene(new LD49.MainScene(this.ResourceManager, ((this._level.level + 1) | 0)));
                        } else {
                            this.SceneManager.SwitchToScene(new LD49.MainMenu(this.ResourceManager));
                        }
                        break;
                    default: 
                        break;
                }
            },
            GetCameraTargetPos: function () {
                return JuiceboxEngine.Math.Vector2.op_Division$1((JuiceboxEngine.Math.Vector2.op_Addition(JuiceboxEngine.Math.Vector2.op_Multiply$1(this._truck.Position.$clone(), 2), this._goal.GameObj.Transform.Position2D.$clone())), 3);
            },
            /**
             * Called every frame, before any gameobject updates.
             *
             * @instance
             * @protected
             * @override
             * @this LD49.MainScene
             * @memberof LD49.MainScene
             * @return  {void}
             */
            PreUpdate: function () {
                var timeString = LD49.Program.FormatMS(H5.Int.clip32(this._time * 1000));
                this._timer.DisplayText = System.String.format("Time: {0}", [timeString]);

                if (this._hasControl) {
                    this._truck.Control();

                    this._time += JuiceboxEngine.Util.Time.DeltaTime;

                    this.DefaultCamera.Parent.Transform.Position2D = this.GetCameraTargetPos();

                    this.Colliding(this._truck.Position.$clone());
                    this.Colliding(this._truck.GetWorldAnchorPoint());
                    this.Colliding(this._truck.GetWorldAttachPoint());
                    this.Colliding(this._trailer.Position.$clone());
                    this.Colliding(this._trailer.GetWorldAnchorPoint());
                    this.Colliding(this._trailer.GetWorldAttachPoint());
                } else {
                    if (this._canTakeControl) {
                        if (JuiceboxEngine.Input.InputManager.Instance.AnyKeyPressed || JuiceboxEngine.Input.InputManager.Instance.IsMouseKeyHeld(JuiceboxEngine.Input.MouseKey.LeftMouse)) {
                            this._ui.FadeOut();
                            this._hasControl = true;
                            this._canTakeControl = false;
                        }
                    }
                }

                this._truck.Update();

                this._goal.Update();
            },
            Colliding: function (position) {
                var tile = (JuiceboxEngine.Math.Vector2.op_Division$1(position.$clone(), 16)).ToPoint();

                tile.Y = (((this._tileMap.MapData.Height - 1) | 0) - tile.Y) | 0;

                var data = this._mapBytes[(((((H5.Int.mul(tile.X, 4)) + (H5.Int.mul(H5.Int.mul(tile.Y, this._tileMap.MapData.Width), 4))) | 0) + 1) | 0)];

                if (data !== 0) {
                    this._hasControl = false;

                    this._soundFX.SetAudioClip(this.ResourceManager.Load(JuiceboxEngine.Audio.AudioClip, "Sounds/hit.mp3"));
                    this._soundFX.Play();

                    this._completeUI = new LD49.CompleteUI(this.GUI.Root, this._level, 0, false);
                    this._completeUI.GetLeaderboards();
                    this._completeUI.addOnComplete(H5.fn.cacheBind(this, this.EndSequence));

                    return true;
                }

                return false;
            },
            /**
             * Called every frame, after all gameobject had an update.
             *
             * @instance
             * @protected
             * @override
             * @this LD49.MainScene
             * @memberof LD49.MainScene
             * @return  {void}
             */
            LateUpdate: function () {
                if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("r")) {
                    this.SceneManager.SwitchToScene(new LD49.MainScene(this.ResourceManager, this._level.level));
                }

                if (JuiceboxEngine.Input.InputManager.Instance.IsKeyHeld("p")) {
                    System.Console.WriteLine(System.String.format("Truck: {0}, {1}", this._truck.Position.$clone(), this._truck.Rotation));
                    System.Console.WriteLine(System.String.format("Trailer: {0}, {1}", this._trailer.Position.$clone(), this._trailer.Rotation));
                }
            },
            /**
             * Called when the scene is about to be destroyed.
             *
             * @instance
             * @protected
             * @override
             * @this LD49.MainScene
             * @memberof LD49.MainScene
             * @return  {void}
             */
            FinalizeScene: function () {

            }
        }
    });

    H5.define("LD49.Program", {
        /**
         * Program entry point.
         *
         * @static
         * @private
         * @this LD49.Program
         * @memberof LD49.Program
         * @return  {void}
         */
        main: function Main () {
            var game = new JuiceboxEngine.JuiceboxGame();

            game.Run(new LD49.MainMenu(game.ResourceManager));
        },
        statics: {
            methods: {
                FormatMS: function (ms) {
                    var span = System.TimeSpan.fromMilliseconds(ms);
                    return span.toString("mm\\:ss\\.fff");
                }
            }
        }
    });

    H5.define("LD49.TouchUI", {
        inherits: [JuiceboxEngine.GUI.EmptyUIElement],
        fields: {
            _left: null,
            _right: null,
            _forward: null,
            _backward: null
        },
        ctors: {
            ctor: function (parent) {
                var $t;
                this.$initialize();
                JuiceboxEngine.GUI.EmptyUIElement.ctor.call(this, parent);
                this._left = new JuiceboxEngine.GUI.Image(this);
                ($t = new JuiceboxEngine.GUI.Image(this._left), $t.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/arrow-left.png"), $t);

                this._right = new JuiceboxEngine.GUI.Image(this);
                ($t = new JuiceboxEngine.GUI.Image(this._right), $t.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/arrow-right.png"), $t);

                this._forward = new JuiceboxEngine.GUI.Image(this);
                ($t = new JuiceboxEngine.GUI.Image(this._forward), $t.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/arrow-backward.png"), $t);

                this._backward = new JuiceboxEngine.GUI.Image(this);
                ($t = new JuiceboxEngine.GUI.Image(this._backward), $t.DisplayImage = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/arrow-forward.png"), $t);
            }
        },
        methods: {
            UpdateElement: function () {
                JuiceboxEngine.GUI.EmptyUIElement.prototype.UpdateElement.call(this);

                this.Dimensions = this.Parent.Dimensions.$clone();

                this._left.Color = new JuiceboxEngine.Math.Color.$ctor3(0.5, 0.5, 0.5, 0.5);
                this._left.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this.Dimensions.X / 4, this.Dimensions.Y / 4);
                this._left.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 0.0);
                this.UpdateChild(this._left);

                this._right.Color = new JuiceboxEngine.Math.Color.$ctor3(0.3, 0.3, 0.3, 0.5);
                this._right.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this.Dimensions.X / 4, this.Dimensions.Y / 4);
                this._right.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.25, 0.0);
                this.UpdateChild(this._right);

                this._forward.Color = new JuiceboxEngine.Math.Color.$ctor3(0.5, 0.5, 0.5, 0.5);
                this._forward.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this.Dimensions.X / 4, this.Dimensions.Y / 4);
                this._forward.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.0);
                this.UpdateChild(this._forward);

                this._backward.Color = new JuiceboxEngine.Math.Color.$ctor3(0.3, 0.3, 0.3, 0.5);
                this._backward.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this.Dimensions.X / 4, this.Dimensions.Y / 4);
                this._backward.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.75, 0.0);
                this.UpdateChild(this._backward);
            },
            UpdateChild: function (img) {
                img.Children.getItem(0).Pivot = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();
                img.Children.getItem(0).Anchor = JuiceboxEngine.GUI.UIDefaults.Centered.$clone();

                var dimension = JuiceboxEngine.Math.JMath.Min$1(img.Dimensions.X, img.Dimensions.Y);

                img.Children.getItem(0).Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(dimension, dimension);
            }
        }
    });

    H5.define("LD49.Vehicle", {
        fields: {
            /**
             * Gameobject representing the vehicle.
             *
             * @instance
             * @public
             * @memberof LD49.Vehicle
             * @function GameObj
             * @type JuiceboxEngine.GameObject
             */
            GameObj: null,
            /**
             * Position of this vehicle.
             *
             * @instance
             * @public
             * @memberof LD49.Vehicle
             * @function Position
             * @type JuiceboxEngine.Math.Vector2
             */
            Position: null,
            /**
             * Rotation of the vehicle.
             *
             * @instance
             * @public
             * @memberof LD49.Vehicle
             * @function Rotation
             * @type number
             */
            Rotation: 0,
            /**
             * The vehicle trailing this vehicle.
             *
             * @instance
             * @public
             * @memberof LD49.Vehicle
             * @function Attached
             * @type LD49.Vehicle
             */
            Attached: null,
            /**
             * The vehicle this vehicle is following.
             *
             * @instance
             * @public
             * @memberof LD49.Vehicle
             * @function Parent
             * @type LD49.Vehicle
             */
            Parent: null,
            Locked: false,
            _props: null
        },
        ctors: {
            init: function () {
                this.Position = new JuiceboxEngine.Math.Vector2();
            },
            ctor: function (scene, vehicle, position, rotation) {
                this.$initialize();
                this.Position = position.$clone();
                this.Rotation = rotation;

                this._props = LD49.VehicleProperties.VEHICLES[vehicle];

                this.GameObj = scene.AddGameObject$1(this._props.name);
                this.GameObj.Transform.Position2D = position.$clone();

                var truckSprite = this.GameObj.AddComponent(JuiceboxEngine.LayeredSprite);
                truckSprite.SetSlicedSprite(scene.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, System.String.format("Textures/{0}.png", [this._props.name])), this._props.spriteWidth, this._props.spriteHeight, this._props.spriteLayers, 0.5);
                truckSprite.ColorStep = 0.025;
                truckSprite.LayerResolution = 4;
                truckSprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(((H5.Int.div(((-truckSprite.Dimensions.X) | 0), 2)) | 0), ((H5.Int.div(((-truckSprite.Dimensions.Y) | 0), 2)) | 0));

                truckSprite.Outline = 1.0;
            }
        },
        methods: {
            /**
             * Attach a vehicle to this vehicle.
             *
             * @instance
             * @public
             * @this LD49.Vehicle
             * @memberof LD49.Vehicle
             * @param   {LD49.Vehicle}    vehicle    The vehicle to attach.
             * @return  {void}
             */
            AttachVehicle: function (vehicle) {
                this.Attached = vehicle;
                this.Attached.Parent = this;
            },
            Control: function () {
                var speed = 0;

                var leftRect = new JuiceboxEngine.Math.RectangleF.$ctor2(0, 0, 0.25, 0.25);
                var rightRect = new JuiceboxEngine.Math.RectangleF.$ctor2(0.25, 0, 0.25, 0.25);
                var backwardsRect = new JuiceboxEngine.Math.RectangleF.$ctor2(0.5, 0, 0.25, 0.25);
                var forwardRect = new JuiceboxEngine.Math.RectangleF.$ctor2(0.75, 0, 0.25, 0.25);

                var left = false;
                var right = false;
                var backward = false;
                var forward = false;

                for (var i = 0; i < JuiceboxEngine.Input.InputManager.Instance.Touches.Count; i = (i + 1) | 0) {
                    if (leftRect.Intersects$1(JuiceboxEngine.Input.InputManager.Instance.Touches.getItem(i).$clone())) {
                        left = true;
                    }
                    if (rightRect.Intersects$1(JuiceboxEngine.Input.InputManager.Instance.Touches.getItem(i).$clone())) {
                        right = true;
                    }
                    if (backwardsRect.Intersects$1(JuiceboxEngine.Input.InputManager.Instance.Touches.getItem(i).$clone())) {
                        backward = true;
                    }
                    if (forwardRect.Intersects$1(JuiceboxEngine.Input.InputManager.Instance.Touches.getItem(i).$clone())) {
                        forward = true;
                    }
                }

                if (JuiceboxEngine.Input.InputManager.Instance.IsKeyDown("w") || forward) {
                    speed = 5;
                } else {
                    if ((JuiceboxEngine.Input.InputManager.Instance.IsKeyDown("s") || backward) && !this.Attached.Locked) {
                        speed = -3;
                    }
                }

                var direction = JuiceboxEngine.Math.Vector2.op_Multiply$1(JuiceboxEngine.Math.Vector2.Rotate(new JuiceboxEngine.Math.Vector2.$ctor3(0, -10), this.Rotation), speed);

                this.Position = JuiceboxEngine.Math.Vector2.op_Addition(this.Position.$clone(), JuiceboxEngine.Math.Vector2.op_Multiply$1(direction.$clone(), JuiceboxEngine.Util.Time.DeltaTime));

                if (JuiceboxEngine.Input.InputManager.Instance.IsKeyDown("a") || left) {
                    this.Rotation += (0.5235988) * speed * JuiceboxEngine.Util.Time.DeltaTime;
                } else {
                    if (JuiceboxEngine.Input.InputManager.Instance.IsKeyDown("d") || right) {
                        this.Rotation -= (0.5235988) * speed * JuiceboxEngine.Util.Time.DeltaTime;
                    }
                }
            },
            /**
             * Update vehicle.
             *
             * @instance
             * @public
             * @this LD49.Vehicle
             * @memberof LD49.Vehicle
             * @return  {void}
             */
            Update: function () {
                if (this.Attached != null) {
                    this.Attached.Update();
                }

                if (this.Parent != null) {
                    this.TrailParent();
                }

                this.GameObj.Transform.Position2D = this.Position.$clone();
                this.GameObj.GetComponent(JuiceboxEngine.LayeredSprite).Rotation = this.Rotation;
            },
            TrailParent: function () {
                var direction = JuiceboxEngine.Math.Vector2.op_Subtraction(this.GetWorldWheelbasePoint(), this.Parent.GetWorldAttachPoint());
                direction.Normalize();

                var rotation = JuiceboxEngine.Math.JMath.ATan2(direction.Y, direction.X);

                this.Rotation = rotation + JuiceboxEngine.Math.JMath.PI_OVER_TWO;
                this.Position = JuiceboxEngine.Math.Vector2.op_Addition(this.Parent.GetWorldAttachPoint(), JuiceboxEngine.Math.Vector2.op_Multiply$2(this._props.anchorPoint.Length() * 1.0, direction.$clone()));

                var rotationDifference = this.Parent.Rotation - this.Rotation;
                rotationDifference = JuiceboxEngine.Math.JMath.Wrap(rotationDifference, JuiceboxEngine.Math.JMath.TWO_PI);

                this.Locked = rotationDifference > 4.712389 || rotationDifference < 1.5707964;
            },
            GetWorldAnchorPoint: function () {
                return JuiceboxEngine.Math.Vector2.op_Addition(this.Position.$clone(), JuiceboxEngine.Math.Vector2.Rotate(this._props.attachPoint.$clone(), this.Rotation));
            },
            GetWorldAttachPoint: function () {
                return JuiceboxEngine.Math.Vector2.op_Addition(this.Position.$clone(), JuiceboxEngine.Math.Vector2.Rotate(this._props.attachPoint.$clone(), this.Rotation));
            },
            GetWorldWheelbasePoint: function () {
                return JuiceboxEngine.Math.Vector2.op_Addition(this.Position.$clone(), JuiceboxEngine.Math.Vector2.Rotate(this._props.wheelBase.$clone(), this.Rotation));
            }
        }
    });

    H5.define("LD49.VehicleProperties", {
        statics: {
            fields: {
                VEHICLES: null
            },
            ctors: {
                init: function () {
                    var $t;
                    this.VEHICLES = System.Array.init([($t = new LD49.VehicleProperties(), $t.name = "truck", $t.spriteWidth = 8, $t.spriteHeight = 13, $t.spriteLayers = 11, $t.anchorPoint = new JuiceboxEngine.Math.Vector2.$ctor3(0, -4), $t.attachPoint = new JuiceboxEngine.Math.Vector2.$ctor3(0, 5), $t.wheelBase = new JuiceboxEngine.Math.Vector2.$ctor3(0, 5), $t), ($t = new LD49.VehicleProperties(), $t.name = "trailer", $t.spriteWidth = 8, $t.spriteHeight = 20, $t.spriteLayers = 11, $t.anchorPoint = new JuiceboxEngine.Math.Vector2.$ctor3(0, 8), $t.attachPoint = new JuiceboxEngine.Math.Vector2.$ctor3(0, -10), $t.wheelBase = new JuiceboxEngine.Math.Vector2.$ctor3(0, -8), $t)], LD49.VehicleProperties);
                }
            }
        },
        fields: {
            name: null,
            spriteWidth: 0,
            spriteHeight: 0,
            spriteLayers: 0,
            anchorPoint: null,
            attachPoint: null,
            wheelBase: null
        },
        ctors: {
            init: function () {
                this.anchorPoint = new JuiceboxEngine.Math.Vector2();
                this.attachPoint = new JuiceboxEngine.Math.Vector2();
                this.wheelBase = new JuiceboxEngine.Math.Vector2();
            }
        }
    });
});
