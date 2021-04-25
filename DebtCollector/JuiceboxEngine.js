/**
 * @compiler H5 0.0.15365
 */
H5.assemblyVersion("JuiceboxEngine","0.2.0.0");
H5.assembly("JuiceboxEngine", function ($asm, globals) {
    "use strict";

    /** @namespace JuiceboxEngine.Resources */

    /**
     * Resource interface.
     *
     * @abstract
     * @public
     * @class JuiceboxEngine.Resources.IResource
     */
    H5.define("JuiceboxEngine.Resources.IResource", {
        $kind: "interface"
    });

    H5.define("JuiceboxEngine.Animations.AnimationFrame", {
        fields: {
            /**
             * Duration in seconds of this frame.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Animations.AnimationFrame
             * @function Duration
             * @type number
             */
            Duration: 0,
            /**
             * Source rectangle of the animation.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Animations.AnimationFrame
             * @function SourceRectangle
             * @type JuiceboxEngine.Math.Rectangle
             */
            SourceRectangle: null
        },
        ctors: {
            init: function () {
                this.SourceRectangle = new JuiceboxEngine.Math.Rectangle();
            }
        }
    });

    /** @namespace JuiceboxEngine.Animations */

    /**
     * Animator class, responsible for handling animations.
     *
     * @public
     * @class JuiceboxEngine.Animations.Animator
     */
    H5.define("JuiceboxEngine.Animations.Animator", {
        fields: {
            /**
             * All available animations.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Animations.Animator
             * @function Animations
             * @type System.Collections.Generic.List$1
             */
            Animations: null,
            /**
             * Currently playing animation.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Animations.Animator
             * @function PlayingAnimation
             * @type JuiceboxEngine.Animations.Animation
             */
            PlayingAnimation: null,
            /**
             * Current source rectangle.
             *
             * @instance
             * @memberof JuiceboxEngine.Animations.Animator
             * @function SourceRectangle
             * @type JuiceboxEngine.Math.Rectangle
             */
            SourceRectangle: null,
            /**
             * Animation playing speed.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Animations.Animator
             * @function Speed
             * @type number
             */
            Speed: 0,
            _progress: 0,
            _curFrame: 0
        },
        props: {
            /**
             * Current animation frame.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Animations.Animator
             * @function CurrentFrame
             * @type number
             */
            CurrentFrame: {
                get: function () {
                    return this._curFrame;
                }
            }
        },
        ctors: {
            init: function () {
                this.SourceRectangle = new JuiceboxEngine.Math.Rectangle();
            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Animations.Animator
             * @memberof JuiceboxEngine.Animations.Animator
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.Animations = new (System.Collections.Generic.List$1(JuiceboxEngine.Animations.Animation)).ctor();
                this.Speed = 1.0;
            }
        },
        methods: {
            /**
             * Get all available animations.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Animations.Animator
             * @memberof JuiceboxEngine.Animations.Animator
             * @return  {Array.<string>}        The available animations.
             */
            GetAnimations: function () {
                return System.Linq.Enumerable.from(this.Animations, JuiceboxEngine.Animations.Animation).select(function (x) {
                        return x.Name;
                    }).ToArray(System.String);
            },
            /**
             * Set animation to play.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Animations.Animator
             * @memberof JuiceboxEngine.Animations.Animator
             * @param   {string}    animation    The animation to play.
             * @return  {void}
             */
            SetAnimation$1: function (animation) {
                if (this.PlayingAnimation != null && System.String.equals(this.PlayingAnimation.Name, animation)) {
                    return;
                }

                this.PlayingAnimation = System.Linq.Enumerable.from(this.Animations, JuiceboxEngine.Animations.Animation).where(function (x) {
                        return System.String.equals(x.Name, animation);
                    }).firstOrDefault(null, null);

                this._progress = 0;
                this._curFrame = 0;

                if (this.PlayingAnimation == null) {
                    System.Console.WriteLine("Unable to find animation with name " + (animation || ""));
                } else {
                    this.SourceRectangle = this.PlayingAnimation.Frames.getItem(this._curFrame).SourceRectangle.$clone();
                }
            },
            /**
             * Set animation to play.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Animations.Animator
             * @memberof JuiceboxEngine.Animations.Animator
             * @param   {JuiceboxEngine.Animations.Animation}    animation    The animation to play.
             * @return  {void}
             */
            SetAnimation: function (animation) {
                if (animation == null) {
                    return;
                }

                this.PlayingAnimation = animation;

                this._progress = 0;
                this._curFrame = 0;

                if (this.PlayingAnimation == null) {
                    System.Console.WriteLine(System.String.concat("Unable to find animation with name ", animation));
                } else {
                    this.SourceRectangle = this.PlayingAnimation.Frames.getItem(this._curFrame).SourceRectangle.$clone();
                }
            },
            /**
             * Update animation logic.
             *
             * @instance
             * @this JuiceboxEngine.Animations.Animator
             * @memberof JuiceboxEngine.Animations.Animator
             * @return  {void}
             */
            Update: function () {
                if (this.PlayingAnimation == null) {
                    this.SetAnimation(System.Linq.Enumerable.from(this.Animations, JuiceboxEngine.Animations.Animation).firstOrDefault(null, null));
                }

                this._progress += JuiceboxEngine.Util.Time.DeltaTime * this.Speed;

                if (this.PlayingAnimation != null) {
                    if (this._progress >= this.PlayingAnimation.Frames.getItem(this._curFrame).Duration) {
                        this.SourceRectangle = this.PlayingAnimation.Frames.getItem(this._curFrame).SourceRectangle.$clone();
                        this._curFrame = (((this._curFrame + 1) | 0)) % this.PlayingAnimation.Frames.Count;
                        this._progress = 0;
                    }
                }
            }
        }
    });

    /**
     * Abstract resource loader.
     *
     * @abstract
     * @public
     * @class JuiceboxEngine.Resources.ResourceLoader
     */
    H5.define("JuiceboxEngine.Resources.ResourceLoader", {
        fields: {
            /**
             * Extension of the file this loader loads.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Resources.ResourceLoader
             * @function Extension
             * @type string
             */
            Extension: null,
            /**
             * Name of the resource loader.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Resources.ResourceLoader
             * @function Name
             * @type string
             */
            Name: null
        },
        ctors: {
            /**
             * Resourceloader Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Resources.ResourceLoader
             * @memberof JuiceboxEngine.Resources.ResourceLoader
             * @param   {string}    name         Name of the resource loader.
             * @param   {string}    extension    Extension the loader loads. ex: "png", "anim".
             * @return  {void}
             */
            ctor: function (name, extension) {
                this.$initialize();
                this.Extension = extension;
                this.Name = name;
            }
        }
    });

    /** @namespace JuiceboxEngine */

    /**
     * An abstract component for Gameobjects.
     *
     * @abstract
     * @public
     * @class JuiceboxEngine.Component
     */
    H5.define("JuiceboxEngine.Component", {
        fields: {
            /**
             * Disabled components do nothing.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Component
             * @function Enabled
             * @type boolean
             */
            Enabled: false,
            /**
             * Parent game object.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Component
             * @function Parent
             * @type JuiceboxEngine.GameObject
             */
            Parent: null
        }
    });

    H5.define("JuiceboxEngine.Audio.AudioManager", {
        ctors: {
            ctor: function () {
                this.$initialize();
                Howler.autoSuspend = false;
                Howler.mobileAutoEnable = false;

                Howler.volume(1.0);
            }
        },
        methods: {
            /**
             * Set global volume.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Audio.AudioManager
             * @memberof JuiceboxEngine.Audio.AudioManager
             * @param   {number}    volume    Volume ranging from 0 to 1.
             * @return  {void}
             */
            SetVolume: function (volume) {
                Howler.volume(volume);
            },
            /**
             * Mute all sounds.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Audio.AudioManager
             * @memberof JuiceboxEngine.Audio.AudioManager
             * @param   {boolean}    mute    True to mute, false to un-mute.
             * @return  {void}
             */
            Mute: function (mute) {
                Howler.mute(mute);
            }
        }
    });

    /** @namespace JuiceboxEngine.Coroutines */

    /**
     * Coroutine class for managing co-routines.
     *
     * @public
     * @class JuiceboxEngine.Coroutines.Coroutine
     */
    H5.define("JuiceboxEngine.Coroutines.Coroutine", {
        fields: {
            /**
             * The enumerator to execute.
             *
             * @instance
             * @memberof JuiceboxEngine.Coroutines.Coroutine
             * @function Enumerator
             * @type System.Collections.IEnumerator
             */
            Enumerator: null,
            /**
             * The yield instruction to obey to.
             *
             * @instance
             * @memberof JuiceboxEngine.Coroutines.Coroutine
             * @function YieldInstruction
             * @type JuiceboxEngine.Coroutines.YieldInstruction
             */
            YieldInstruction: null,
            /**
             * Result from most recent Move().
             *
             * @instance
             * @memberof JuiceboxEngine.Coroutines.Coroutine
             * @function MoveNextResult
             * @type boolean
             */
            MoveNextResult: false,
            /**
             * Indicates if the co-routine is stopped by the manager.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Coroutines.Coroutine
             * @type boolean
             */
            _stopped: false
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @this JuiceboxEngine.Coroutines.Coroutine
             * @memberof JuiceboxEngine.Coroutines.Coroutine
             * @param   {System.Collections.IEnumerator}    routine    The IEnumerator method to execture.
             * @return  {void}
             */
            ctor: function (routine) {
                this.$initialize();
                this.Enumerator = routine;
                this._stopped = false;
            }
        },
        methods: {
            /**
             * Stops the co-routine from continuing.
             *
             * @instance
             * @this JuiceboxEngine.Coroutines.Coroutine
             * @memberof JuiceboxEngine.Coroutines.Coroutine
             * @return  {void}
             */
            StopCoroutine: function () {
                this._stopped = true;

                if (this.YieldInstruction != null) {
                    this.YieldInstruction.Stop();
                }
            },
            /**
             * Move to next yield statement (or not, to finish routine)
             *
             * @instance
             * @this JuiceboxEngine.Coroutines.Coroutine
             * @memberof JuiceboxEngine.Coroutines.Coroutine
             * @return  {boolean}        True if it found a new yield, false otherwise.
             */
            Move: function () {
                if (this._stopped) {
                    this.MoveNextResult = false;
                    return false;
                }

                this.MoveNextResult = this.Enumerator.System$Collections$IEnumerator$moveNext();
                this.YieldInstruction = H5.cast(this.Enumerator.System$Collections$IEnumerator$Current, JuiceboxEngine.Coroutines.YieldInstruction);
                return this.MoveNextResult;
            }
        }
    });

    /**
     * Manages co-routines.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Coroutines.CoroutineManager
     */
    H5.define("JuiceboxEngine.Coroutines.CoroutineManager", {
        statics: {
            fields: {
                _coroutines: null,
                _toAdd: null,
                _toRemove: null
            },
            ctors: {
                ctor: function () {
                    JuiceboxEngine.Coroutines.CoroutineManager._coroutines = new (System.Collections.Generic.List$1(JuiceboxEngine.Coroutines.Coroutine)).ctor();
                    JuiceboxEngine.Coroutines.CoroutineManager._toAdd = new (System.Collections.Generic.List$1(JuiceboxEngine.Coroutines.Coroutine)).ctor();
                    JuiceboxEngine.Coroutines.CoroutineManager._toRemove = new (System.Collections.Generic.List$1(JuiceboxEngine.Coroutines.Coroutine)).ctor();
                }
            },
            methods: {
                /**
                 * Starts and manages a co-routine.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Coroutines.CoroutineManager
                 * @memberof JuiceboxEngine.Coroutines.CoroutineManager
                 * @param   {System.Collections.IEnumerator}         coroutine    The co-routine to start.
                 * @return  {JuiceboxEngine.Coroutines.Coroutine}
                 */
                StartCoroutine: function (coroutine) {
                    var routine = new JuiceboxEngine.Coroutines.Coroutine(coroutine);

                    JuiceboxEngine.Coroutines.CoroutineManager._toAdd.insert(0, routine);

                    routine.Move();

                    return routine;
                },
                /**
                 * Stops a co-routine from executing.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Coroutines.CoroutineManager
                 * @memberof JuiceboxEngine.Coroutines.CoroutineManager
                 * @param   {JuiceboxEngine.Coroutines.Coroutine}    coroutine    The coroutine to stop.
                 * @return  {void}
                 */
                StopCoroutine: function (coroutine) {
                    coroutine.StopCoroutine();
                },
                /**
                 * Update the co-routine manager.
                 *
                 * @static
                 * @this JuiceboxEngine.Coroutines.CoroutineManager
                 * @memberof JuiceboxEngine.Coroutines.CoroutineManager
                 * @return  {void}
                 */
                Update: function () {
                    for (var i = 0; i < JuiceboxEngine.Coroutines.CoroutineManager._toAdd.Count; i = (i + 1) | 0) {
                        var cr = JuiceboxEngine.Coroutines.CoroutineManager._toAdd.getItem(i);
                        JuiceboxEngine.Coroutines.CoroutineManager._coroutines.add(cr);
                    }

                    JuiceboxEngine.Coroutines.CoroutineManager._toAdd.clear();

                    for (var i1 = 0; i1 < JuiceboxEngine.Coroutines.CoroutineManager._coroutines.Count; i1 = (i1 + 1) | 0) {
                        var coroutine = JuiceboxEngine.Coroutines.CoroutineManager._coroutines.getItem(i1);
                        if (coroutine.YieldInstruction == null || coroutine.YieldInstruction.CanContinue()) {
                            if (!coroutine.Move()) {
                                JuiceboxEngine.Coroutines.CoroutineManager._toRemove.add(coroutine);
                            }
                        }
                    }

                    for (var i2 = 0; i2 < JuiceboxEngine.Coroutines.CoroutineManager._toRemove.Count; i2 = (i2 + 1) | 0) {
                        var cr1 = JuiceboxEngine.Coroutines.CoroutineManager._toRemove.getItem(i2);
                        JuiceboxEngine.Coroutines.CoroutineManager._coroutines.remove(cr1);
                    }

                    JuiceboxEngine.Coroutines.CoroutineManager._toRemove.clear();
                }
            }
        }
    });

    /**
     * @memberof JuiceboxEngine.Coroutines
     * @callback JuiceboxEngine.Coroutines.OnStep
     * @param   {number}    progress
     * @return  {void}
     */

    /**
     * Default frequently used coroutines.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Coroutines.DefaultRoutines
     */
    H5.define("JuiceboxEngine.Coroutines.DefaultRoutines", {
        statics: {
            methods: {
                /**
                 * Linearly step for a given duration, giving a normalized value for each step.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Coroutines.DefaultRoutines
                 * @memberof JuiceboxEngine.Coroutines.DefaultRoutines
                 * @param   {number}                              duration    The duration in seconds.
                 * @param   {JuiceboxEngine.Coroutines.OnStep}    action      The action to do.
                 * @param   {boolean}                             realTime    Use realtime time or simulated time (impacted by timescale).
                 * @return  {System.Collections.IEnumerator}
                 */
                Linear: function (duration, action, realTime) {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        progress,
                        $async_e;

                    var $enumerator = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        if (realTime === void 0) { realTime = false; }
                                            progress = 0.0;
                                        $step = 1;
                                        continue;
                                    }
                                    case 1: {
                                        if ( true ) {
                                                $step = 2;
                                                continue;
                                            } 
                                            $step = 4;
                                            continue;
                                    }
                                    case 2: {
                                        progress += (realTime ? JuiceboxEngine.Util.Time.DeltaTimeRealTime : JuiceboxEngine.Util.Time.DeltaTime);

                                            if (progress >= duration) {
                                                action(1.0);
                                                $step = 4;
                                                continue;
                                            }

                                            action(progress / duration);

                                            $enumerator.current = null;
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        
                                            $step = 1;
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
                },
                /**
                 * Linearly step for a given duration, giving a normalized value for each step.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Coroutines.DefaultRoutines
                 * @memberof JuiceboxEngine.Coroutines.DefaultRoutines
                 * @param   {number}                              duration    The duration in seconds.
                 * @param   {JuiceboxEngine.Coroutines.OnStep}    action      The action to do.
                 * @param   {boolean}                             realTime    Use realtime time or simulated time (impacted by timescale).
                 * @return  {System.Collections.IEnumerator}
                 */
                LinearRepeat: function (duration, action, realTime) {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        progress,
                        $async_e;

                    var $enumerator = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        if (realTime === void 0) { realTime = false; }
                                            progress = 0.0;
                                        $step = 1;
                                        continue;
                                    }
                                    case 1: {
                                        if ( true ) {
                                                $step = 2;
                                                continue;
                                            } 
                                            $step = 4;
                                            continue;
                                    }
                                    case 2: {
                                        progress += (realTime ? JuiceboxEngine.Util.Time.DeltaTimeRealTime : JuiceboxEngine.Util.Time.DeltaTime);

                                            progress = progress % duration;

                                            action(progress / duration);

                                            $enumerator.current = null;
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        
                                            $step = 1;
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
        }
    });

    /**
     * Abstract yield intruction for custom waits in coroutines.
     *
     * @abstract
     * @public
     * @class JuiceboxEngine.Coroutines.YieldInstruction
     */
    H5.define("JuiceboxEngine.Coroutines.YieldInstruction", {
        methods: {
            /**
             * Stop the YieldInstruction.
             By default nothing happens.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Coroutines.YieldInstruction
             * @memberof JuiceboxEngine.Coroutines.YieldInstruction
             * @return  {void}
             */
            Stop: function () {
                return;
            }
        }
    });

    /** @namespace JuiceboxEngine.Debugging */

    /**
     * Renderer for drawing debug information.
     *
     * @public
     * @class JuiceboxEngine.Debugging.DebugRenderer
     */
    H5.define("JuiceboxEngine.Debugging.DebugRenderer", {
        statics: {
            fields: {
                _instance: null,
                _instanceGUI: null
            },
            props: {
                /**
                 * Instance of the debug renderer for world space rendering.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Debugging.DebugRenderer
                 * @function Instance
                 * @type JuiceboxEngine.Debugging.DebugRenderer
                 */
                Instance: {
                    get: function () {
                        if (JuiceboxEngine.Debugging.DebugRenderer._instance == null) {
                            JuiceboxEngine.Debugging.DebugRenderer._instance = new JuiceboxEngine.Debugging.DebugRenderer();
                        }
                        return JuiceboxEngine.Debugging.DebugRenderer._instance;
                    }
                },
                /**
                 * Instance of the debug renderer for screen space rendering
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Debugging.DebugRenderer
                 * @function InstanceGUI
                 * @type JuiceboxEngine.Debugging.DebugRenderer
                 */
                InstanceGUI: {
                    get: function () {
                        if (JuiceboxEngine.Debugging.DebugRenderer._instanceGUI == null) {
                            JuiceboxEngine.Debugging.DebugRenderer._instanceGUI = new JuiceboxEngine.Debugging.DebugRenderer();
                        }
                        return JuiceboxEngine.Debugging.DebugRenderer._instanceGUI;
                    }
                }
            }
        },
        fields: {
            /**
             * The debug renderer has his own resrouce manager.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Debugging.DebugRenderer
             * @type JuiceboxEngine.Resources.ResourceManager
             */
            _manager: null,
            _debugSpriteBatch: null,
            _defaultTexture: null,
            /**
             * List of lines to render.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Debugging.DebugRenderer
             * @type System.Collections.Generic.List$1
             */
            _lines: null
        },
        ctors: {
            /**
             * Private contructor.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Debugging.DebugRenderer
             * @memberof JuiceboxEngine.Debugging.DebugRenderer
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this._manager = new JuiceboxEngine.Resources.ResourceManager();
                this._manager.RegisterResourceManager(new JuiceboxEngine.Graphics.ShaderResourceLoader());
                this._manager.RegisterResourceManager(new JuiceboxEngine.Graphics.TextureResourceLoader());

                this._debugSpriteBatch = new JuiceboxEngine.Graphics.Spritebatch(this._manager);
                this._defaultTexture = new JuiceboxEngine.Graphics.Texture2D.ctor();

                this._lines = new (System.Collections.Generic.List$1(JuiceboxEngine.Debugging.DebugRenderer.Line)).ctor();
            }
        },
        methods: {
            /**
             * Draws a rectangle in world space for debugging purposes.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Debugging.DebugRenderer
             * @memberof JuiceboxEngine.Debugging.DebugRenderer
             * @param   {JuiceboxEngine.Math.RectangleF}    rect     The rectangle to draw.
             * @param   {JuiceboxEngine.Math.Color}         color    The color of the lines.
             * @param   {number}                            width    Width of the lines.
             * @return  {void}
             */
            DrawRect: function (rect, color, width) {
                this.DrawLine(new JuiceboxEngine.Math.Vector2.$ctor3(rect.X, rect.Y), new JuiceboxEngine.Math.Vector2.$ctor3(rect.X + rect.Width, rect.Y), color.$clone(), width);
                this.DrawLine(new JuiceboxEngine.Math.Vector2.$ctor3(rect.X, rect.Y), new JuiceboxEngine.Math.Vector2.$ctor3(rect.X, rect.Y + rect.Height), color.$clone(), width);
                this.DrawLine(new JuiceboxEngine.Math.Vector2.$ctor3(rect.X, rect.Y + rect.Height), new JuiceboxEngine.Math.Vector2.$ctor3(rect.X + rect.Width, rect.Y + rect.Height), color.$clone(), width);
                this.DrawLine(new JuiceboxEngine.Math.Vector2.$ctor3(rect.X + rect.Width, rect.Y), new JuiceboxEngine.Math.Vector2.$ctor3(rect.X + rect.Width, rect.Y + rect.Height), color.$clone(), width);
            },
            /**
             * Draws a straight line between two points in world space for debugging purposes.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Debugging.DebugRenderer
             * @memberof JuiceboxEngine.Debugging.DebugRenderer
             * @param   {JuiceboxEngine.Math.Vector2}    start    The starting point.
             * @param   {JuiceboxEngine.Math.Vector2}    end      The end point.
             * @param   {JuiceboxEngine.Math.Color}      color    Color of the line.
             * @param   {number}                         width    Width of the line.
             * @return  {void}
             */
            DrawLine: function (start, end, color, width) {
                if (width === void 0) { width = 1.0; }
                var line = new JuiceboxEngine.Debugging.DebugRenderer.Line.$ctor1(start.$clone(), end.$clone(), color.$clone(), width);

                this._lines.add(line);
            },
            /**
             * Draw a rectangle filled with one color, in world space.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Debugging.DebugRenderer
             * @memberof JuiceboxEngine.Debugging.DebugRenderer
             * @param   {JuiceboxEngine.Math.RectangleF}    rect     The rectangle to draw.
             * @param   {JuiceboxEngine.Math.Color}         color    The color of the rectangle.
             * @return  {void}
             */
            DrawRectFilled: function (rect, color) {
                var start = new JuiceboxEngine.Math.Vector2.$ctor3(rect.X + JuiceboxEngine.Math.JMath.Ceiling(rect.Width / 2.0), rect.Y);
                var end = new JuiceboxEngine.Math.Vector2.$ctor3(rect.X + JuiceboxEngine.Math.JMath.Ceiling(rect.Width / 2.0), rect.Y + rect.Height);

                var line = new JuiceboxEngine.Debugging.DebugRenderer.Line.$ctor1(start.$clone(), end.$clone(), color.$clone(), rect.Width);

                this._lines.add(line);
            },
            /**
             * Render all called debug calls.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Debugging.DebugRenderer
             * @memberof JuiceboxEngine.Debugging.DebugRenderer
             * @return  {void}
             */
            RenderDebugLines: function () {
                var $t;
                var useDepth = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UsingDepth;

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(false);

                var context = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context;

                this._debugSpriteBatch.Begin();

                $t = H5.getEnumerator(this._lines);
                try {
                    while ($t.moveNext()) {
                        var line = $t.Current;
                        var dist = JuiceboxEngine.Math.Vector2.Distance(line.p0.$clone(), line.p1.$clone());

                        this._debugSpriteBatch.Draw$1(this._defaultTexture, new JuiceboxEngine.Math.RectangleF.$ctor2(line.p0.$clone().X, line.p0.$clone().Y, dist, line.width), new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, 1, 1), line.color.$clone(), JuiceboxEngine.Math.JMath.ATan2(line.p1.$clone().Y - line.p0.$clone().Y, line.p1.$clone().X - line.p0.$clone().X), new JuiceboxEngine.Math.Vector2.$ctor3(0.0, -line.width / 2.0), 0.0, JuiceboxEngine.Sprite.SpriteFlip.None);
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                this._debugSpriteBatch.End();

                this._lines.clear();

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(useDepth);
            }
        }
    });

    /**
     * Line object, for storing calls to the Debug Renderer.
     *
     * @private
     * @class JuiceboxEngine.Debugging.DebugRenderer.Line
     */
    H5.define("JuiceboxEngine.Debugging.DebugRenderer.Line", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new JuiceboxEngine.Debugging.DebugRenderer.Line(); }
            }
        },
        fields: {
            p0: null,
            p1: null,
            color: null,
            width: 0
        },
        ctors: {
            init: function () {
                this.p0 = new JuiceboxEngine.Math.Vector2();
                this.p1 = new JuiceboxEngine.Math.Vector2();
                this.color = new JuiceboxEngine.Math.Color();
            },
            $ctor1: function (p0, p1, color, width) {
                this.$initialize();
                this.p0 = p0.$clone();
                this.p1 = p1.$clone();
                this.color = color.$clone();
                this.width = width;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = H5.addHash([1701734732, this.p0, this.p1, this.color, this.width]);
                return h;
            },
            equals: function (o) {
                if (!H5.is(o, JuiceboxEngine.Debugging.DebugRenderer.Line)) {
                    return false;
                }
                return H5.equals(this.p0, o.p0) && H5.equals(this.p1, o.p1) && H5.equals(this.color, o.color) && H5.equals(this.width, o.width);
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Debugging.DebugRenderer.Line();
                s.p0 = this.p0.$clone();
                s.p1 = this.p1.$clone();
                s.color = this.color.$clone();
                s.width = this.width;
                return s;
            }
        }
    });

    /**
     * An gameobject, has a transform and can have multiple components. Is always part of a scene.
     *
     * @public
     * @class JuiceboxEngine.GameObject
     */
    H5.define("JuiceboxEngine.GameObject", {
        fields: {
            /**
             * The name of the game object.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GameObject
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * Disabled game objects won't receive any updates. They won't update their components.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GameObject
             * @function Enabled
             * @type boolean
             */
            Enabled: false,
            /**
             * The transform of the gameobject.
             Every object has a transform.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GameObject
             * @function Transform
             * @type JuiceboxEngine.Transform
             */
            Transform: null,
            /**
             * Game specific object that can be attached to a gameobject.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GameObject
             * @type System.Object
             */
            UserData: null,
            /**
             * All components on this gameobject.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.GameObject
             * @type System.Collections.Generic.List$1
             */
            _components: null,
            /**
             * All graphics components on this gameobject.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.GameObject
             * @type System.Collections.Generic.List$1
             */
            _graphicsComponents: null,
            /**
             * The scene this object is currently in.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.GameObject
             * @type JuiceboxEngine.Scene
             */
            _currentScene: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @this JuiceboxEngine.GameObject
             * @memberof JuiceboxEngine.GameObject
             * @param   {JuiceboxEngine.Scene}    parent    The scene this object is in.
             * @return  {void}
             */
            ctor: function (parent) {
                this.$initialize();
                this._currentScene = parent;
                this.Name = "GameObject";
                this._components = new (System.Collections.Generic.List$1(JuiceboxEngine.Component)).ctor();
                this._graphicsComponents = new (System.Collections.Generic.List$1(JuiceboxEngine.GraphicsComponent)).ctor();
                this.Transform = this.AddComponent(JuiceboxEngine.Transform);
                this.Enabled = true;
            },
            /**
             * Constructor.
             *
             * @instance
             * @this JuiceboxEngine.GameObject
             * @memberof JuiceboxEngine.GameObject
             * @param   {JuiceboxEngine.Scene}    parent    The scene this object is in.
             * @param   {string}                  name      The name of the game object.
             * @return  {void}
             */
            $ctor1: function (parent, name) {
                JuiceboxEngine.GameObject.ctor.call(this, parent);
                this.Name = name;
            }
        },
        methods: {
            /**
             * Destroy and remove this gameobject with all of its components from the scene.
             *
             * @instance
             * @this JuiceboxEngine.GameObject
             * @memberof JuiceboxEngine.GameObject
             * @return  {void}
             */
            Destroy: function () {
                for (var i = 0; i < this._components.Count; i = (i + 1) | 0) {
                    var comp = this._components.getItem(i);
                    comp.Destroy();
                }
            },
            /**
             * Called every frame to update all components.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameObject
             * @memberof JuiceboxEngine.GameObject
             * @return  {void}
             */
            Update: function () {
                var comp = null;
                for (var i = 0; i < this._components.Count; i = (i + 1) | 0) {
                    comp = this._components.getItem(i);
                    if (comp.Enabled) {
                        comp.Update();
                    }
                }
            },
            /**
             * Called every frame for rendering.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameObject
             * @memberof JuiceboxEngine.GameObject
             * @param   {JuiceboxEngine.Graphics.Spritebatch}    spritebatch
             * @return  {void}
             */
            Render: function (spritebatch) {
                var comp = null;
                for (var i = 0; i < this._graphicsComponents.Count; i = (i + 1) | 0) {
                    comp = this._graphicsComponents.getItem(i);
                    if (comp.Enabled) {
                        comp.Render(spritebatch);
                    }
                }
            },
            /**
             * Adds component T to the gameobject.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameObject
             * @memberof JuiceboxEngine.GameObject
             * @param   {Function}    T    The type to add, must be a IComponent.
             * @return  {T}                The newly created component. Null if the object could not be added.
             */
            AddComponent: function (T) {
                var val = this.GetComponent(T);
                if (val == null || !val.Unique()) {
                    var newComp = H5.createInstance(T);

                    this._components.add(newComp);
                    newComp.Parent = this;
                    newComp.Enabled = true;

                    if (H5.is(newComp, JuiceboxEngine.GraphicsComponent)) {
                        this._graphicsComponents.add(newComp);
                    }

                    if (H5.is(newComp, JuiceboxEngine.Camera)) {
                        this._currentScene.AddCamera(newComp);
                    }

                    if (H5.is(newComp, JuiceboxEngine.Physics.BodyP2)) {
                        this._currentScene.PhysicsWorld.AddBody(newComp);
                    }

                    newComp.Initialize(this._currentScene.ResourceManager);

                    return newComp;
                }

                return null;
            },
            /**
             * Remove a component from the gameobject.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameObject
             * @memberof JuiceboxEngine.GameObject
             * @param   {Function}    T    The component to remove.
             * @return  {void}
             */
            RemoveComponent: function (T) {
                var component = this.GetComponent(T);

                if (component == null) {
                    return;
                }

                this._components.remove(component);
                if (H5.is(component, JuiceboxEngine.GraphicsComponent)) {
                    this._graphicsComponents.remove(H5.as(component, JuiceboxEngine.GraphicsComponent));
                }

                component.Destroy();
            },
            /**
             * Gets the component from a gameobject.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameObject
             * @memberof JuiceboxEngine.GameObject
             * @param   {Function}    T    The component type to get.
             * @return  {T}                The component, or null if not found.
             */
            GetComponent: function (T) {
                var comp = null;

                for (var i = 0; i < this._components.Count; i = (i + 1) | 0) {
                    comp = this._components.getItem(i);
                    if (H5.is(this._components.getItem(i), T)) {
                        return H5.cast(comp, T);
                    }
                }

                return null;
            },
            /**
             * Gets the components from a gameobject.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GameObject
             * @memberof JuiceboxEngine.GameObject
             * @param   {Function}     T    The component type to get.
             * @return  {Array.<T>}         The components, or null if not found.
             */
            GetComponents: function (T) {
                return H5.cast(System.Linq.Enumerable.from(this._components, JuiceboxEngine.Component).where(function (x) {
                        return H5.is(x, T);
                    }).ToArray(JuiceboxEngine.Component), System.Array.type(T));
            }
        }
    });

    /** @namespace JuiceboxEngine.Graphics */

    /**
     * Default shader values for usage in the shader.
     *
     * @public
     * @class JuiceboxEngine.Graphics.DefaultShaderValues
     */
    H5.define("JuiceboxEngine.Graphics.DefaultShaderValues", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * The time in seconds of type {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 0
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                TIME: 0,
                /**
                 * The time since last frame. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 1
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                DELTATIME: 1,
                /**
                 * The position of the mouse ranging [0-1] on both axis of type {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 2
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                MOUSEPOS: 2,
                /**
                 * The current world matrix. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 3
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                WORLD: 3,
                /**
                 * The current view matrix. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 4
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                VIEW: 4,
                /**
                 * The current projection matrix. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 5
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                PROJ: 5,
                /**
                 * PROJ * VIEW * WORLD matrix.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 6
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                WORLDVIEWPROJ: 6,
                /**
                 * Size of the canvas. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 7
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                CANVASSIZE: 7,
                /**
                 * Current size of the viewport. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 8
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                VIEWPORTSIZE: 8,
                /**
                 * Current position of the camera. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 9
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                CAMERAPOSITION: 9,
                /**
                 * Current zoom of the camera currently rendering. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 10
                 * @type JuiceboxEngine.Graphics.DefaultShaderValues
                 */
                ZOOM: 10
            }
        }
    });

    /**
     * A command to send to the {@link } contains all necessary information.
     *
     * @public
     * @class JuiceboxEngine.Graphics.GraphicsCommand
     */
    H5.define("JuiceboxEngine.Graphics.GraphicsCommand", {
        fields: {
            /**
             * The shader to use.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.GraphicsCommand
             * @function Program
             * @type JuiceboxEngine.Graphics.ShaderProgram
             */
            Program: null,
            /**
             * The vertexbuffer to use.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.GraphicsCommand
             * @function VertexBuffer
             * @type JuiceboxEngine.Graphics.VertexBuffer
             */
            VertexBuffer: null,
            /**
             * Extra data for the shader.
             *
             * @instance
             * @memberof JuiceboxEngine.Graphics.GraphicsCommand
             * @function Data
             * @type System.Collections.Generic.List$1
             */
            Data: null,
            _data: null
        },
        ctors: {
            /**
             * Default constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsCommand
             * @memberof JuiceboxEngine.Graphics.GraphicsCommand
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.Data = new (System.Collections.Generic.List$1(JuiceboxEngine.Graphics.Uniform)).ctor();
                this._data = new (System.Collections.Generic.Dictionary$2(System.String,JuiceboxEngine.Graphics.Uniform)).ctor();

                this.VertexBuffer = null;
                this.Program = null;
            }
        },
        methods: {
            /**
             * Set value in the shader.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsCommand
             * @memberof JuiceboxEngine.Graphics.GraphicsCommand
             * @param   {string}           key      The shader value name.
             * @param   {System.Object}    value    The shader value.
             * @param   {number}           type     Type of the parameter. If none it will be done automaticly. (assuming value is NOT {@link })
             * @return  {void}
             */
            SetShaderValue: function (key, value, type) {
                if (type === void 0) { type = 0; }
                var uniform = { };
                this._data.tryGetValue(key, uniform);

                if (uniform.v == null) {
                    if (type === JuiceboxEngine.Graphics.Uniform.UniformType.NONE) {
                        uniform.v = new JuiceboxEngine.Graphics.Uniform.ctor(key, value);
                    } else {
                        uniform.v = new JuiceboxEngine.Graphics.Uniform.$ctor1(key, value, type);
                    }

                    this._data.add(key, uniform.v);
                    this.Data.add(uniform.v);
                }

                uniform.v.value = value;
            }
        }
    });

    /**
     * Responsible for all rendering calls to WebGL.
     *
     * @public
     * @class JuiceboxEngine.Graphics.GraphicsContext
     */
    H5.define("JuiceboxEngine.Graphics.GraphicsContext", {
        fields: {
            /**
             * The GL context for a canvas.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @type H5.Core..WebGLRenderingContext
             */
            _gl: null,
            /**
             * The canvas to render to.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @type H5.Core..HTMLCanvasElement
             */
            _canvas: null,
            /**
             * The default shader values.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @type Array.<JuiceboxEngine.Graphics.Uniform>
             */
            _shaderValues: null,
            /**
             * Cache the strings of the enum to significantly improve performance.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @type Array.<string>
             */
            _defaultNamesCache: null,
            /**
             * Current count of set textures.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @type number
             */
            _textureCount: 0,
            _curActiveTexture: 0,
            /**
             * Currently bound program.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @type JuiceboxEngine.Graphics.ShaderProgram
             */
            _curProgram: null,
            /**
             * Current count of set vertex attributes.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @type number
             */
            _setAttributes: 0,
            /**
             * Default texture.
             *
             * @instance
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @function DefaultTexture
             * @type H5.Core..WebGLTexture
             */
            DefaultTexture: null,
            /**
             * Indicates if the context uses depth test.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @function UsingDepth
             * @type boolean
             */
            UsingDepth: false
        },
        ctors: {
            /**
             * Constructor, initializes GL context.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {H5.Core..HTMLCanvasElement}    canvas
             * @return  {void}
             */
            ctor: function (canvas) {
                this.$initialize();
                this._canvas = canvas;
                this._gl = this.GetContext(canvas);

                if (this._gl == null) {
                    System.Console.WriteLine("Unable to initialize WebGL context!");
                } else {
                    System.Console.WriteLine("Initialized WebGL!");
                }

                this._defaultNamesCache = System.Enum.getNames(JuiceboxEngine.Graphics.DefaultShaderValues);
                this._shaderValues = System.Array.init(this._defaultNamesCache.length, null, JuiceboxEngine.Graphics.Uniform);

                for (var i = 0; i < this._defaultNamesCache.length; i = (i + 1) | 0) {
                    this._shaderValues[i] = new JuiceboxEngine.Graphics.Uniform.$ctor1(this._defaultNamesCache[i], null, JuiceboxEngine.Graphics.Uniform.UniformType.NONE);
                }


                this._curProgram = null;
                this._setAttributes = 0;

                this.DefaultTexture = this.CreateTexture$1(1, 1, System.Array.init([255, 255, 255, 255], System.Byte));

                this._gl.enable(this._gl.BLEND);
                this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
                this._gl.enable(this._gl.DEPTH_TEST);
            }
        },
        methods: {
            /**
             * Gets the WebGL context.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {H5.Core..HTMLCanvasElement}        canvas    The canvas to get the context on.
             * @return  {H5.Core..WebGLRenderingContext}              A {@link } or null if it fails.
             */
            GetContext: function (canvas) {
                var $t;
                var context = null;

                var names = System.Array.init(["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], System.String);

                $t = H5.getEnumerator(names);
                try {
                    while ($t.moveNext()) {
                        var name = $t.Current;
                        try {
                            context = canvas.getContext(name);
                        } catch (ex) {
                            ex = System.Exception.create(ex);
                            System.Console.WriteLine(H5.toString(ex));
                        }

                        if (context != null) {
                            break;
                        }
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                return context;
            },
            /**
             * Clear the currently bound framebuffer and depth buffer.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Math.Color}    color    The color to clear to.
             * @return  {void}
             */
            Clear: function (color) {
                this._gl.clearColor(color.R, color.G, color.B, color.A);
                this._gl.clear(((this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT) >>> 0));
            },
            /**
             * Set pixels in a texture.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.Texture2D}    texture    The texture write the pixels to.
             * @param   {JuiceboxEngine.Math.Rectangle}        rect       The region to write pixels to. (0,0) is the top right of the texture.
             * @param   {Array.<JuiceboxEngine.Math.Color>}    data       The color data per pixel,
             * @return  {void}
             */
            SetPixels: function (texture, rect, data) {
                var rawData = new (Uint8Array)(H5.Int.umul(((data.length) >>> 0), 4));

                for (var i = 0; System.Int64(i).lt(System.Int64(data.length)); i = (i + 1) >>> 0) {
                    rawData[((H5.Int.umul(i, 4) + 0) >>> 0)] = H5.Int.clipu8(data[i].R * 255);
                    rawData[((H5.Int.umul(i, 4) + 1) >>> 0)] = H5.Int.clipu8(data[i].G * 255);
                    rawData[((H5.Int.umul(i, 4) + 2) >>> 0)] = H5.Int.clipu8(data[i].B * 255);
                    rawData[((H5.Int.umul(i, 4) + 3) >>> 0)] = H5.Int.clipu8(data[i].A * 255);
                }

                var view = rawData;

                this._gl.bindTexture(this._gl.TEXTURE_2D, texture.Texture);
                this._gl.texSubImage2D(this._gl.TEXTURE_2D, 0, rect.X, rect.Y, rect.Width, rect.Height, this._gl.RGBA, this._gl.UNSIGNED_BYTE, view);
                this._gl.bindTexture(this._gl.TEXTURE_2D, null);
            },
            /**
             * Get pixels of a texture.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.Texture2D}    texture    The texture to get pixels from.
             * @param   {JuiceboxEngine.Math.Rectangle}        rect       An rectangle representing the area of pixels to get.
             * @return  {Array.<number>}                                  Array of bytes represenging colors (RGBA), or null when the operation failed.
             */
            GetPixels: function (texture, rect) {
                this._gl.bindTexture(this._gl.TEXTURE_2D, texture.Texture);

                var colors = null;

                var frameBuffer = this._gl.createFramebuffer();
                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, frameBuffer);
                this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, texture.Texture, 0);

                if (this._gl.checkFramebufferStatus(this._gl.FRAMEBUFFER) === this._gl.FRAMEBUFFER_COMPLETE) {
                    var data = new (Uint8Array)(H5.Int.umul(H5.Int.umul((rect.Width >>> 0), (rect.Height >>> 0)), 4));

                    this._gl.readPixels(rect.X, rect.Y, rect.Width, rect.Height, this._gl.RGBA, this._gl.UNSIGNED_BYTE, data);

                    colors = System.Array.init(data.length, 0, System.Byte);
                    for (var i = 0; System.Int64(i).lt(System.Int64(colors.length)); i = (i + 1) >>> 0) {
                        colors[i] = data[i];
                    }
                }

                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
                this._gl.deleteFramebuffer(frameBuffer);

                return colors;
            },
            /**
             * Set a global shader value.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.DefaultShaderValues}    key      
             * @param   {System.Object}                                  value
             * @return  {void}
             */
            SetGlobalShaderValue: function (key, value) {
                this._shaderValues[key].value = value;
            },
            /**
             * Get string representing the enum value.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.DefaultShaderValues}    dsv    The default shader value enum entry.
             * @return  {string}                                                String representing
             */
            GetDefaultShaderParamString: function (dsv) {
                return this._defaultNamesCache[dsv];
            },
            /**
             * Render a command.
             Commands need at least a valid vertexbuffer and shader program.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.GraphicsCommand}    command    The command to render.
             * @return  {void}
             */
            Command: function (command) {
                if (command.VertexBuffer.VertCount === 0) {
                    return;
                }

                if (!H5.referenceEquals(this._curProgram, command.Program)) {
                    this._curProgram = command.Program;

                    this._gl.useProgram(command.Program.Program);
                }

                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, command.VertexBuffer.Buffer);

                var attribs = command.VertexBuffer.Attributes;

                var maxAttribs = JuiceboxEngine.Math.JMath.Max(this._setAttributes, attribs.Count);

                for (var i = 0; i < maxAttribs; i = (i + 1) | 0) {
                    if (i < attribs.Count) {
                        var attrib = attribs.getItem(i);

                        var loc = this._gl.getAttribLocation(command.Program.Program, attrib.Name);
                        this._gl.vertexAttribPointer(loc, attrib.Components, this._gl.FLOAT, attrib.Normalize, attrib.Stride, attrib.Offset);
                        this._gl.enableVertexAttribArray(i);
                    } else {
                        this._gl.disableVertexAttribArray(i);
                    }
                }

                this._setAttributes = attribs.Count;

                this._textureCount = 0;

                for (var i1 = 0; i1 < command.Data.Count; i1 = (i1 + 1) | 0) {
                    this.SetUniform(command.Program, command.Data.getItem(i1));
                }

                var defaultValuesArray = command.Program.DefaultShaderValues;

                for (var i2 = 0; i2 < defaultValuesArray.length; i2 = (i2 + 1) | 0) {
                    var defaultShaderValue = defaultValuesArray[i2];

                    if (defaultValuesArray[i2] === JuiceboxEngine.Graphics.DefaultShaderValues.WORLDVIEWPROJ) {
                        var world = H5.cast(this._shaderValues[JuiceboxEngine.Graphics.DefaultShaderValues.WORLD].value, JuiceboxEngine.Math.Matrix4);
                        var view = H5.cast(this._shaderValues[JuiceboxEngine.Graphics.DefaultShaderValues.VIEW].value, JuiceboxEngine.Math.Matrix4);
                        var proj = H5.cast(this._shaderValues[JuiceboxEngine.Graphics.DefaultShaderValues.PROJ].value, JuiceboxEngine.Math.Matrix4);
                        this.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.WORLDVIEWPROJ, JuiceboxEngine.Math.Matrix4.Multiply(JuiceboxEngine.Math.Matrix4.Multiply(world.$clone(), view.$clone()), proj.$clone()));
                    }

                    this.SetUniform(command.Program, this._shaderValues[defaultShaderValue]);
                }

                this._gl.drawArrays(this._gl.TRIANGLES, command.VertexBuffer.StartIndex, command.VertexBuffer.VertexRange === 0 ? command.VertexBuffer.VertCount : command.VertexBuffer.VertexRange);
            },
            SetUniform: function (program, uniform) {
                var $t;
                if (uniform.value == null) {
                    return;
                }

                var value = uniform.value;

                if (uniform.type === JuiceboxEngine.Graphics.Uniform.UniformType.NONE) {
                    uniform.type = JuiceboxEngine.Graphics.Uniform.GetType(value);
                }

                var location = { };

                if (!program.UniformLocations.tryGetValue(uniform.name, location)) {
                    var loc = this._gl.getUniformLocation(program.Program, uniform.name);

                    if (loc != null) {
                        location.v = ($t = new JuiceboxEngine.Graphics.ShaderProgram.UniformLocation(), $t.location = loc, $t);
                    }

                    program.UniformLocations.add(uniform.name, location.v);
                }

                if (location.v == null) {
                    return;
                }

                switch (uniform.type) {
                    case JuiceboxEngine.Graphics.Uniform.UniformType.FLOAT: 
                        this._gl.uniform1f(location.v.location, H5.cast(value, System.Single));
                        break;
                    case JuiceboxEngine.Graphics.Uniform.UniformType.DOUBLE: 
                        this._gl.uniform1f(location.v.location, H5.cast(value, System.Single));
                        break;
                    case JuiceboxEngine.Graphics.Uniform.UniformType.INT: 
                        this._gl.uniform1f(location.v.location, H5.cast(value, System.Single));
                        break;
                    case JuiceboxEngine.Graphics.Uniform.UniformType.VECTOR2: 
                        var vec2 = H5.cast(value, JuiceboxEngine.Math.Vector2);
                        this._gl.uniform2f(location.v.location, vec2.X, vec2.Y);
                        break;
                    case JuiceboxEngine.Graphics.Uniform.UniformType.VECTOR3: 
                        var vec3 = H5.cast(value, JuiceboxEngine.Math.Vector3);
                        this._gl.uniform3f(location.v.location, vec3.X, vec3.Y, vec3.Z);
                        break;
                    case JuiceboxEngine.Graphics.Uniform.UniformType.VECTOR4: 
                        var vec4 = H5.cast(value, JuiceboxEngine.Math.Vector4);
                        this._gl.uniform4f(location.v.location, vec4.X, vec4.Y, vec4.Z, vec4.W);
                        break;
                    case JuiceboxEngine.Graphics.Uniform.UniformType.COLOR: 
                        var color = H5.cast(value, JuiceboxEngine.Math.Color);
                        this._gl.uniform4f(location.v.location, color.R, color.G, color.B, color.A);
                        break;
                    case JuiceboxEngine.Graphics.Uniform.UniformType.MATRIX4: 
                        var matrix = H5.cast(value, JuiceboxEngine.Math.Matrix4);
                        var data = new (Float32Array)(16);
                        for (var j = 0; j < data.length; j = (j + 1) >>> 0) {
                            data[j] = matrix.getItem((j | 0));
                        }
                        this._gl.uniformMatrix4fv(location.v.location, false, data);
                        break;
                    case JuiceboxEngine.Graphics.Uniform.UniformType.TEXTURE2D: 
                        this.SetTextureUniform(location.v.location, H5.as(value, JuiceboxEngine.Graphics.Texture2D));
                        break;
                    case JuiceboxEngine.Graphics.Uniform.UniformType.RENDERTARGET: 
                        this.SetTextureUniform(location.v.location, H5.as(value, JuiceboxEngine.Graphics.Texture2D));
                        break;
                    default: 
                        break;
                }
            },
            SetTextureUniform: function (location, val) {
                if (this._curActiveTexture !== this._textureCount) {
                    this._gl.activeTexture(System.Int64.toNumber(System.Int64(this._gl.TEXTURE0).add(System.Int64(this._textureCount))));
                }

                this._gl.bindTexture(this._gl.TEXTURE_2D, val.Texture);

                this._gl.uniform1i(location, this._textureCount);

                this._curActiveTexture = this._textureCount;
                this._textureCount = (this._textureCount + 1) | 0;
            },
            UpdateTexture: function (texture) {
                this._gl.bindTexture(this._gl.TEXTURE_2D, texture.Texture);

                var sample = texture.Sample === JuiceboxEngine.Graphics.Texture2D.SampleMode.Point ? this._gl.NEAREST : this._gl.LINEAR;
                var wrap = this._gl.CLAMP_TO_EDGE;

                switch (texture.Wrap) {
                    case JuiceboxEngine.Graphics.Texture2D.WrapMode.Clamp: 
                        wrap = this._gl.CLAMP_TO_EDGE;
                        break;
                    case JuiceboxEngine.Graphics.Texture2D.WrapMode.Repeat: 
                        wrap = this._gl.REPEAT;
                        break;
                    case JuiceboxEngine.Graphics.Texture2D.WrapMode.MirrorRepeat: 
                        wrap = this._gl.MIRRORED_REPEAT;
                        break;
                }

                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, sample);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, sample);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, wrap);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, wrap);

                this._gl.bindTexture(this._gl.TEXTURE_2D, null);
            },
            /**
             * Create a OpenGL vertexbuffer.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {Array.<number>}          data    The buffer to use.
             * @return  {H5.Core..WebGLBuffer}
             */
            CreateVertexBuffer: function (data) {
                var buffer = this._gl.createBuffer();
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);

                var platformData = new (Float32Array)(data);

                this._gl.bufferData(this._gl.ARRAY_BUFFER, platformData, this._gl.DYNAMIC_DRAW);

                return buffer;
            },
            /**
             * Updates data in a existing VBO.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.VertexBuffer}    buffer    The buffer to update data in.
             * @param   {number}                                  offset    Offset of the data in floats.
             * @param   {Array.<number>}                          data      The data buffer.
             * @return  {void}
             */
            UpdateVertexBufferData: function (buffer, offset, data) {
                var platformData = new (Float32Array)(data);

                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer.Buffer);
                this._gl.bufferSubData(this._gl.ARRAY_BUFFER, offset * Float32Array.BYTES_PER_ELEMENT, platformData);
            },
            /**
             * Deletes a buffer. If it was already deleted it has no effect.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {H5.Core..WebGLBuffer}    buffer    The buffer to delete.
             * @return  {void}
             */
            DeleteBuffer: function (buffer) {
                this._gl.deleteBuffer(buffer);
            },
            /**
             * Creates a render target.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {number}                               width      Target width.
             * @param   {number}                               height     Target Height.
             * @param   {JuiceboxEngine.Graphics.Texture2D}    texture    The texture to use for this target.
             * @return  {H5.Core..WebGLFramebuffer}
             */
            CreateRenderTarget: function (width, height, texture) {
                var frameBuffer = this._gl.createFramebuffer();
                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, frameBuffer);

                var renderBuffer = this._gl.createRenderbuffer();
                this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, renderBuffer);
                this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT16, width, height);

                this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, texture.Texture, 0);
                this._gl.framebufferRenderbuffer(this._gl.FRAMEBUFFER, this._gl.DEPTH_ATTACHMENT, this._gl.RENDERBUFFER, renderBuffer);

                var status = this._gl.checkFramebufferStatus(this._gl.FRAMEBUFFER);

                if (status !== this._gl.FRAMEBUFFER_COMPLETE) {
                    System.Console.WriteLine("Something went wrong creating the frame buffer!");
                }

                this._gl.bindTexture(this._gl.TEXTURE_2D, null);
                this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, null);
                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);

                return frameBuffer;
            },
            /**
             * Sets a render target to draw to.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.RenderTarget}    target    The render target.
             * @return  {void}
             */
            SetRenderTarget: function (target) {
                if (target == null) {
                    this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
                    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
                    this.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.VIEWPORTSIZE, new JuiceboxEngine.Math.Vector2.$ctor3(this._canvas.width, this._canvas.height));
                } else {
                    this._gl.viewport(0, 0, target.Width, target.Height);
                    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, target.Target);
                    this.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.VIEWPORTSIZE, new JuiceboxEngine.Math.Vector2.$ctor3(target.Width, target.Height));
                }

                this.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.CANVASSIZE, new JuiceboxEngine.Math.Vector2.$ctor3(this._canvas.width, this._canvas.height));
            },
            /**
             * Destroy the given render target, and the texture.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.RenderTarget}    target    The render target to destroy.
             * @return  {void}
             */
            DeleteRenderTarget: function (target) {
                this._gl.deleteFramebuffer(target.Target);
                this._gl.deleteTexture(target.Texture);
            },
            /**
             * Delete the given render target from graphis memory.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.Texture2D}    texture    The texture to remove from graphics memory.
             * @return  {void}
             */
            DeleteTexture: function (texture) {
                this._gl.deleteTexture(texture.Texture);
            },
            /**
             * Delete a shader program from graphics memory.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.ShaderProgram}    shader    The shader to remove from graphics memory.
             * @return  {void}
             */
            DeleteShader: function (shader) {
                this._gl.deleteProgram(shader.Program);
            },
            /**
             * Create a texture from a HTML Image element.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {H5.Core..HTMLImageElement}    image    The loaded image element.
             * @return  {H5.Core..WebGLTexture}                 A WebGL texture.
             */
            CreateTexture: function (image) {
                var texture = this._gl.createTexture();
                this._gl.bindTexture(this._gl.TEXTURE_2D, texture);

                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);

                this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, image);

                this._gl.bindTexture(this._gl.TEXTURE_2D, null);

                return texture;
            },
            /**
             * Create a texture from a HTML Image element.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {number}                   width     
             * @param   {number}                   height    
             * @param   {Array.<number>}           data
             * @return  {H5.Core..WebGLTexture}              A WebGL texture.
             */
            CreateTexture$1: function (width, height, data) {
                var texture = this._gl.createTexture();
                this._gl.bindTexture(this._gl.TEXTURE_2D, texture);

                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);

                var platformData = new (Uint8Array)(data);

                var view = platformData;

                if (data != null) {
                    this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, width, height, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, view);
                } else {
                    this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, width, height, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, null);
                }

                this._gl.bindTexture(this._gl.TEXTURE_2D, null);

                return texture;
            },
            /**
             * Disable or enable depth testing.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {boolean}    use    True to use, false to disable depth testing.
             * @return  {void}
             */
            UseDepth: function ($use) {
                if ($use) {
                    this._gl.enable(this._gl.DEPTH_TEST);
                } else {
                    this._gl.disable(this._gl.DEPTH_TEST);
                }

                this.UsingDepth = $use;
            },
            /**
             * Discard all pixels outside of scissor area.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Math.Rectangle}    rect      All pixels outside this rect will be discarded.
             * @param   {boolean}                          enable    Enable scissor testing.
             * @return  {void}
             */
            ScissorTest: function (rect, enable) {
                if (enable === void 0) { enable = true; }
                if (enable) {
                    this._gl.enable(this._gl.SCISSOR_TEST);
                    this._gl.scissor(rect.X, ((JuiceboxEngine.Graphics.GraphicsManager.Instance.Height - rect.Y) | 0), rect.Width, rect.Height);
                } else {
                    this._gl.disable(this._gl.SCISSOR_TEST);
                }
            },
            /**
             * Create and compile shaders to use for rendering.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {string}                   vertSource    The vertex shader.
             * @param   {string}                   fragSource    The fragment shader.
             * @return  {H5.Core..WebGLProgram}                  A linked program ready for use.
             */
            CompileShader: function (vertSource, fragSource) {
                var vertexShader = this._gl.createShader(this._gl.VERTEX_SHADER);

                this._gl.shaderSource(vertexShader, vertSource);
                this._gl.compileShader(vertexShader);

                var vertError = this._gl.getShaderInfoLog(vertexShader);
                if (!System.String.isNullOrEmpty(vertError)) {
                    System.Console.WriteLine(vertError);
                }

                var fragmentShader = this._gl.createShader(this._gl.FRAGMENT_SHADER);

                this._gl.shaderSource(fragmentShader, fragSource);
                this._gl.compileShader(fragmentShader);

                var fragError = this._gl.getShaderInfoLog(fragmentShader);
                if (!System.String.isNullOrEmpty(fragError)) {
                    System.Console.WriteLine(fragError);
                }

                var program = this._gl.createProgram();
                this._gl.attachShader(program, vertexShader);
                this._gl.attachShader(program, fragmentShader);

                this._gl.linkProgram(program);

                this._gl.deleteShader(vertexShader);
                this._gl.deleteShader(fragmentShader);

                return program;
            },
            /**
             * Cache locations of shader program.
             *
             * @instance
             * @this JuiceboxEngine.Graphics.GraphicsContext
             * @memberof JuiceboxEngine.Graphics.GraphicsContext
             * @param   {JuiceboxEngine.Graphics.ShaderProgram}    program    The program to cache locations for.
             * @return  {void}
             */
            CacheLocations: function (program) {
                var $t;
                var values = new (System.Collections.Generic.List$1(JuiceboxEngine.Graphics.DefaultShaderValues)).ctor();

                $t = H5.getEnumerator(System.Enum.getValues(JuiceboxEngine.Graphics.DefaultShaderValues));
                try {
                    while ($t.moveNext()) {
                        var dsv = H5.cast($t.Current, JuiceboxEngine.Graphics.DefaultShaderValues);
                        var location = this._gl.getUniformLocation(program.Program, this.GetDefaultShaderParamString(dsv));

                        if (location != null) {
                            values.add(dsv);
                        }
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                program.DefaultShaderValues = values.ToArray();
            }
        }
    });

    /**
     * @memberof JuiceboxEngine.Graphics
     * @callback JuiceboxEngine.Graphics.GraphicsManager.ResizeCallback
     * @param   {number}    width     
     * @param   {number}    height
     * @return  {void}
     */

    /**
     * Manager of the graphics, handles rendering systems.
     *
     * @public
     * @class JuiceboxEngine.Graphics.GraphicsManager
     */
    H5.define("JuiceboxEngine.Graphics.GraphicsManager", {
        statics: {
            fields: {
                _instance: null
            },
            props: {
                /**
                 * Singleton patern.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Graphics.GraphicsManager
                 * @function Instance
                 * @type JuiceboxEngine.Graphics.GraphicsManager
                 */
                Instance: {
                    get: function () {
                        if (JuiceboxEngine.Graphics.GraphicsManager._instance != null) {
                            return JuiceboxEngine.Graphics.GraphicsManager._instance;
                        }

                        System.Console.WriteLine("Graphics Manager is not initialized!");
                        return null;
                    }
                }
            }
        },
        fields: {
            /**
             * The renderer responsible for all platform specific calls.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @type JuiceboxEngine.Graphics.GraphicsContext
             */
            Context: null,
            /**
             * Current width of the backbuffer. (canvas)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @function Width
             * @type number
             */
            Width: 0,
            /**
             * Current height of the backbuffer. (canvas)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @function Height
             * @type number
             */
            Height: 0,
            /**
             * Client's Device Pixel Ratio.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @type number
             */
            DPR: 0,
            /**
             * Size of the pixels (in screen pixels).
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @type number
             */
            _pixelSize: 0,
            _canvas: null,
            _fullScreenQuad: null,
            _fullScreenQuadShader: null
        },
        events: {
            /**
             * On resize event. Called when the window changes size.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsManager
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @function addOnResize
             * @param   {JuiceboxEngine.Graphics.GraphicsManager.ResizeCallback}    value
             * @return  {void}
             */
            /**
             * On resize event. Called when the window changes size.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsManager
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @function removeOnResize
             * @param   {JuiceboxEngine.Graphics.GraphicsManager.ResizeCallback}    value
             * @return  {void}
             */
            OnResize: null
        },
        ctors: {
            /**
             * Initialize the graphics manager.
             *
             * @instance
             * @this JuiceboxEngine.Graphics.GraphicsManager
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this._canvas = this.GetCanvas();

                if (JuiceboxEngine.Util.Config.ConfigValues.Fullscreen) {
                    this.GoFullscreen();
                    var thisWindow = window;

                    var action = H5.fn.cacheBind(this, this.GoFullscreen);
                    thisWindow.addEventListener("resize", action);
                }

                this.Context = new JuiceboxEngine.Graphics.GraphicsContext(this._canvas);
                JuiceboxEngine.Graphics.GraphicsManager._instance = this;

                this._pixelSize = JuiceboxEngine.Util.Config.ConfigValues.PixelSize;

                this.Width = this._canvas.clientWidth;
                this.Height = this._canvas.clientHeight;

                this.Context.UseDepth(false);

                var data = System.Array.init([-1.0, -1.0, 0.0, 0.0, 1.0, 1.0, -1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 0.0, 1.0, -1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0], System.Single);

                this._fullScreenQuad = new JuiceboxEngine.Graphics.VertexBuffer.$ctor1(data);

                this._fullScreenQuad.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 20, 0));
                this._fullScreenQuad.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 20, 12));
            }
        },
        methods: {
            GetCanvas: function () {
                var canvas = document.getElementById(JuiceboxEngine.Util.Config.ConfigValues.CanvasID);

                if (canvas == null) {
                    canvas = document.createElement("canvas");
                    canvas.width = 640;
                    canvas.height = 480;
                    canvas.id = JuiceboxEngine.Util.Config.ConfigValues.CanvasID;

                    document.body.style.margin = "0";
                    document.body.appendChild(canvas);
                }

                canvas.addEventListener("webglcontextlost", function () {
                    window.location.reload();
                });

                return canvas;
            },
            /**
             * Register graphics resource loaders to a given resource manager.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsManager
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager    The resourcemanager to register the loaders to.
             * @return  {void}
             */
            RegisterLoaders: function (resourceManager) {
                var trl = new JuiceboxEngine.Graphics.TextureResourceLoader();

                resourceManager.RegisterResourceManager(trl);
                resourceManager.RegisterResourceManager(new JuiceboxEngine.Graphics.ShaderResourceLoader());
                resourceManager.RegisterResourceManager(new JuiceboxEngine.Graphics.FontResourceLoader(trl));
                resourceManager.RegisterResourceManager(new JuiceboxEngine.Animations.AnimatorLoader());

                this._fullScreenQuadShader = resourceManager.Load(JuiceboxEngine.Graphics.ShaderProgram, "Shaders/FullScreen.vert");
            },
            /**
             * Render camera viewport to current framebuffer.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsManager
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @param   {JuiceboxEngine.Camera}    camera    The camera to use.
             * @param   {JuiceboxEngine.Scene}     scene
             * @return  {void}
             */
            RenderCamera: function (camera, scene) {
                var command = new JuiceboxEngine.Graphics.GraphicsCommand();
                command.VertexBuffer = this._fullScreenQuad;
                command.Program = this._fullScreenQuadShader;
                command.SetShaderValue("texture", camera.Target);
                command.SetShaderValue("pixelSize", this._pixelSize);
                command.SetShaderValue("fadeTexture", scene.SceneManager.CurFadeTexture);
                command.SetShaderValue("fadeProgress", scene.SceneManager.FadeProgress);


                this.Context.Command(command);
            },
            /**
             * Resize the canvas to fill the entire page.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Graphics.GraphicsManager
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @return  {void}
             */
            GoFullscreen: function () {
                var ratio = window.devicePixelRatio;

                var dpr = H5.Int.clip32(ratio);
                System.Console.WriteLine("Device Pixel Ratio: " + System.Double.format(ratio));

                this._canvas.width = H5.Int.umul(((window.innerWidth) >>> 0), (dpr >>> 0));
                this._canvas.height = H5.Int.umul(((window.innerHeight) >>> 0), (dpr >>> 0));

                this._canvas.style.width = "100%";
                this._canvas.style.height = "100%";

                this.Resize(((H5.Int.div(((this._canvas.width) | 0), dpr)) | 0), ((H5.Int.div(((this._canvas.height) | 0), dpr)) | 0), dpr);
            },
            /**
             * Resize the graphics systems.
             *
             * @instance
             * @this JuiceboxEngine.Graphics.GraphicsManager
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @param   {number}    width     The new width.
             * @param   {number}    height    The new height.
             * @param   {number}    dpr       Device pixel ratio.
             * @return  {void}
             */
            Resize: function (width, height, dpr) {
                this.Width = width;
                this.Height = height;

                this.DPR = dpr;

                !H5.staticEquals(this.OnResize, null) ? this.OnResize(width, height) : null;
            },
            /**
             * Update the graphics manager.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.GraphicsManager
             * @memberof JuiceboxEngine.Graphics.GraphicsManager
             * @return  {void}
             */
            Update: function () {
                this.Context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.TIME, JuiceboxEngine.Util.Time.TotalSeconds);
                this.Context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.DELTATIME, JuiceboxEngine.Util.Time.DeltaTime);
            }
        }
    });

    /**
     * Horizontal text alignment options.
     *
     * @public
     * @class JuiceboxEngine.Graphics.HorizontalAlignment
     */
    H5.define("JuiceboxEngine.Graphics.HorizontalAlignment", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * Align to left.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.HorizontalAlignment
                 * @constant
                 * @default 0
                 * @type JuiceboxEngine.Graphics.HorizontalAlignment
                 */
                LEFT: 0,
                /**
                 * Align to center.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.HorizontalAlignment
                 * @constant
                 * @default 1
                 * @type JuiceboxEngine.Graphics.HorizontalAlignment
                 */
                CENTER: 1,
                /**
                 * Align to right.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.HorizontalAlignment
                 * @constant
                 * @default 2
                 * @type JuiceboxEngine.Graphics.HorizontalAlignment
                 */
                RIGHT: 2
            }
        }
    });

    /**
     * Wrap WebGLUniformLocation to prevent Bridge.net errors.
     *
     * @class JuiceboxEngine.Graphics.ShaderProgram.UniformLocation
     */
    H5.define("JuiceboxEngine.Graphics.ShaderProgram.UniformLocation", {
        $kind: "nested class",
        fields: {
            location: null
        }
    });

    /**
     * The sprite batch class, responsible for batching sprites into a single draw call.
     *
     * @public
     * @class JuiceboxEngine.Graphics.Spritebatch
     */
    H5.define("JuiceboxEngine.Graphics.Spritebatch", {
        fields: {
            /**
             * Indicates if the sprite batch has already begun.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Spritebatch
             * @function Begun
             * @type boolean
             */
            Begun: false,
            _batcher: null,
            _frustumCulling: false,
            _frustum: null,
            /**
             * Culled sprites since begin.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Graphics.Spritebatch
             * @type number
             */
            _culled: 0,
            /**
             * Drawn sprites since begin.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Graphics.Spritebatch
             * @type number
             */
            _drawn: 0
        },
        ctors: {
            init: function () {
                this._frustum = new JuiceboxEngine.Math.RectangleF();
            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Spritebatch
             * @memberof JuiceboxEngine.Graphics.Spritebatch
             * @param   {JuiceboxEngine.Resources.ResourceManager}    manager
             * @return  {void}
             */
            ctor: function (manager) {
                this.$initialize();
                this._batcher = new JuiceboxEngine.Graphics.SpriteBatcher(manager);
            }
        },
        methods: {
            /**
             * Begin drawing.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Spritebatch
             * @memberof JuiceboxEngine.Graphics.Spritebatch
             * @param   {?JuiceboxEngine.Math.RectangleF}    frustum
             * @return  {void}
             */
            Begin: function (frustum) {
                if (frustum === void 0) { frustum = null; }
                if (this.Begun === true) {
                    System.Console.WriteLine("Spritebatch already begun! Skipping this Begin().");
                    return;
                }

                if (System.Nullable.hasValue(frustum)) {
                    this._frustum = System.Nullable.getValue(frustum).$clone();
                }

                this._frustumCulling = System.Nullable.hasValue(frustum);

                this._culled = 0;
                this._drawn = 0;

                this.Begun = true;
            },
            /**
             * End sprite batch, and draw all batch sprites.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Spritebatch
             * @memberof JuiceboxEngine.Graphics.Spritebatch
             * @return  {void}
             */
            End: function () {
                this.Begun = false;

                this._batcher.DrawBatch();
            },
            /**
             * Add a sprite to the sprite batch.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Spritebatch
             * @memberof JuiceboxEngine.Graphics.Spritebatch
             * @param   {JuiceboxEngine.Graphics.Texture2D}    texture                 The texture of the sprite.
             * @param   {JuiceboxEngine.Math.Rectangle}        destinationRectangle    The destination triangle of the sprite.
             * @param   {JuiceboxEngine.Math.Rectangle}        sourceRectangle         The source on the texture.
             * @param   {JuiceboxEngine.Math.Color}            color                   The color of the sprite.
             * @param   {number}                               rotation                The rotation of the sprite.
             * @param   {JuiceboxEngine.Math.Vector2}          pivot                   The pivot point of the sprite.
             * @param   {number}                               depth                   The sprite depth.
             * @param   {number}                               flip                    Sprite flipping parameters.
             * @return  {void}
             */
            Draw: function (texture, destinationRectangle, sourceRectangle, color, rotation, pivot, depth, flip) {
                var rect = new JuiceboxEngine.Math.RectangleF.$ctor2(destinationRectangle.X, destinationRectangle.Y, destinationRectangle.Width, destinationRectangle.Height);

                this.Draw$1(texture, rect.$clone(), sourceRectangle.$clone(), color.$clone(), rotation, pivot.$clone(), depth, flip);
            },
            /**
             * Add a sprite to the sprite batch.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Spritebatch
             * @memberof JuiceboxEngine.Graphics.Spritebatch
             * @param   {JuiceboxEngine.Graphics.Texture2D}    texture                 The texture of the sprite.
             * @param   {JuiceboxEngine.Math.RectangleF}       destinationRectangle    The destination triangle of the sprite.
             * @param   {JuiceboxEngine.Math.Rectangle}        sourceRectangle         The source on the texture.
             * @param   {JuiceboxEngine.Math.Color}            color                   The color of the sprite.
             * @param   {number}                               rotation                The rotation of the sprite.
             * @param   {JuiceboxEngine.Math.Vector2}          pivot                   The pivot point of the sprite.
             * @param   {number}                               depth                   The sprite depth.
             * @param   {number}                               flip                    Sprite flipping parameters.
             * @return  {void}
             */
            Draw$1: function (texture, destinationRectangle, sourceRectangle, color, rotation, pivot, depth, flip) {
                color = {v:color};
                if (this._frustumCulling) {
                    if ((this._frustum.Left > destinationRectangle.Right + pivot.X || this._frustum.Right < destinationRectangle.Left + pivot.X || this._frustum.Top < destinationRectangle.Bottom + pivot.Y || this._frustum.Bottom > destinationRectangle.Top + pivot.Y)) {
                        this._culled = (this._culled + 1) | 0;
                        return;
                    }

                }

                this._drawn = (this._drawn + 1) | 0;

                var item = this._batcher.CreateBatchItem();
                item.Texture2D = texture;
                item.Depth = depth;

                var sWidth = sourceRectangle.Width;
                var sHeight = sourceRectangle.Height;

                var tWidth = texture.Width;
                var tHeight = texture.Height;

                var upperLeft = { v : new JuiceboxEngine.Math.Vector2.$ctor3(sourceRectangle.X / tWidth, sourceRectangle.Y / tHeight) };
                var lowerRight = { v : new JuiceboxEngine.Math.Vector2.$ctor3(sourceRectangle.X / tWidth + sWidth / tWidth, sourceRectangle.Y / tHeight + sHeight / tHeight) };

                var flipVal = flip;

                if ((flipVal & 1) === 1) {
                    var temp = upperLeft.v.X;
                    upperLeft.v.X = lowerRight.v.X;
                    lowerRight.v.X = temp;
                }

                if ((flipVal & 2) === 2) {
                    var temp1 = upperLeft.v.Y;
                    upperLeft.v.Y = lowerRight.v.Y;
                    lowerRight.v.Y = temp1;
                }

                item.Set(destinationRectangle.X, destinationRectangle.Y, pivot.X, pivot.Y, destinationRectangle.Width, destinationRectangle.Height, JuiceboxEngine.Math.JMath.Sin(rotation), JuiceboxEngine.Math.JMath.Cos(rotation), color, upperLeft, lowerRight);
            }
        }
    });

    H5.define("JuiceboxEngine.Graphics.SpriteBatcher", {
        statics: {
            fields: {
                ELEMENTS_PER_TRIANGLE: 0,
                ELEMENTS_PER_SPRITE: 0
            },
            ctors: {
                init: function () {
                    this.ELEMENTS_PER_TRIANGLE = 27;
                    this.ELEMENTS_PER_SPRITE = 54;
                }
            }
        },
        fields: {
            _batchItemList: null,
            _freeBatchItemQueue: null,
            _vertexArray: null,
            _command: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.SpriteBatcher
             * @memberof JuiceboxEngine.Graphics.SpriteBatcher
             * @param   {JuiceboxEngine.Resources.ResourceManager}    manager    The resource manager to load shaders with.
             * @return  {void}
             */
            ctor: function (manager) {
                this.$initialize();
                this._batchItemList = new (System.Collections.Generic.List$1(JuiceboxEngine.Graphics.SpriteBatchItem)).$ctor2(256);
                this._freeBatchItemQueue = new (System.Collections.Generic.Queue$1(JuiceboxEngine.Graphics.SpriteBatchItem)).$ctor2(256);
                this._vertexArray = System.Array.init(13824, 0, System.Single);

                this._command = new JuiceboxEngine.Graphics.GraphicsCommand();
                this._command.VertexBuffer = new JuiceboxEngine.Graphics.VertexBuffer.ctor();
                this._command.VertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 36, 0));
                this._command.VertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 36, 12));
                this._command.VertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_col", 4, false, 36, 20));
                this._command.SetShaderValue("texture", null, JuiceboxEngine.Graphics.Uniform.UniformType.TEXTURE2D);
                this._command.Program = manager.Load(JuiceboxEngine.Graphics.ShaderProgram, "Shaders/Sprite.vert");
            }
        },
        methods: {
            /**
             * Create a sprite batch item.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.SpriteBatcher
             * @memberof JuiceboxEngine.Graphics.SpriteBatcher
             * @return  {JuiceboxEngine.Graphics.SpriteBatchItem}        The created sprite batch item.
             */
            CreateBatchItem: function () {
                var item;
                if (this._freeBatchItemQueue.Count > 0) {
                    item = this._freeBatchItemQueue.Dequeue();
                } else {
                    item = new JuiceboxEngine.Graphics.SpriteBatchItem();
                }

                this._batchItemList.add(item);

                return item;
            },
            /**
             * Compares depth values of two {@link }.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Graphics.SpriteBatcher
             * @memberof JuiceboxEngine.Graphics.SpriteBatcher
             * @param   {JuiceboxEngine.Graphics.SpriteBatchItem}    a    First sprite batch item.
             * @param   {JuiceboxEngine.Graphics.SpriteBatchItem}    b    Second sprite batch item.
             * @return  {number}                                          Difference between the depth.
             */
            CompareDepth: function (a, b) {
                return H5.compare(a.Depth, b.Depth);
            },
            /**
             * Compares depth values of two {@link }.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Graphics.SpriteBatcher
             * @memberof JuiceboxEngine.Graphics.SpriteBatcher
             * @param   {JuiceboxEngine.Graphics.SpriteBatchItem}    a    First sprite batch item.
             * @param   {JuiceboxEngine.Graphics.SpriteBatchItem}    b    Second sprite batch item.
             * @return  {number}                                          Difference between the depth.
             */
            CompareTexture: function (a, b) {
                return H5.compare(a.Texture2D.sortValue, b.Texture2D.sortValue);
            },
            /**
             * Draw batched sprites.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.SpriteBatcher
             * @memberof JuiceboxEngine.Graphics.SpriteBatcher
             * @return  {void}
             */
            DrawBatch: function () {
                this._batchItemList.Sort$2(H5.fn.cacheBind(this, this.CompareTexture));

                if (this._batchItemList.Count === 0) {
                    return;
                }

                if (H5.Int.mul(this._batchItemList.Count, JuiceboxEngine.Graphics.SpriteBatcher.ELEMENTS_PER_SPRITE) > this._vertexArray.length) {
                    this.ExpandVertexArray(this._batchItemList.Count);
                }

                var index = 0;
                var ind = 0;
                var startIndex = 0;

                var curTexture = this._batchItemList.getItem(0).Texture2D;
                this._command.SetShaderValue("texture", curTexture);

                for (var el = 0; el < this._batchItemList.Count; el = (el + 1) | 0) {
                    var item = this._batchItemList.getItem(el);
                    if (!H5.referenceEquals(item.Texture2D.Texture, curTexture.Texture)) {
                        this.Draw(startIndex, index);
                        curTexture = item.Texture2D;
                        startIndex = index;
                        this._command.SetShaderValue("texture", curTexture);
                    }

                    for (var i = 0; i < 6; i = (i + 1) | 0) {
                        this._vertexArray[H5.identity(ind, ((ind = (ind + 1) >>> 0)))] = item.positionX[i];
                        this._vertexArray[H5.identity(ind, ((ind = (ind + 1) >>> 0)))] = item.positionY[i];
                        this._vertexArray[H5.identity(ind, ((ind = (ind + 1) >>> 0)))] = item.Depth;
                        this._vertexArray[H5.identity(ind, ((ind = (ind + 1) >>> 0)))] = item.textureU[i];
                        this._vertexArray[H5.identity(ind, ((ind = (ind + 1) >>> 0)))] = item.textureV[i];
                        this._vertexArray[H5.identity(ind, ((ind = (ind + 1) >>> 0)))] = item.color.R;
                        this._vertexArray[H5.identity(ind, ((ind = (ind + 1) >>> 0)))] = item.color.G;
                        this._vertexArray[H5.identity(ind, ((ind = (ind + 1) >>> 0)))] = item.color.B;
                        this._vertexArray[H5.identity(ind, ((ind = (ind + 1) >>> 0)))] = item.color.A;
                    }

                    index = (index + 2) >>> 0;

                    this._freeBatchItemQueue.Enqueue(item);
                }

                this.Draw(startIndex, index);

                this._batchItemList.clear();
            },
            /**
             * Draw created buffers.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Graphics.SpriteBatcher
             * @memberof JuiceboxEngine.Graphics.SpriteBatcher
             * @param   {number}    start    
             * @param   {number}    end
             * @return  {void}
             */
            Draw: function (start, end) {
                var length = H5.Int.umul((((end - start) >>> 0)), JuiceboxEngine.Graphics.SpriteBatcher.ELEMENTS_PER_TRIANGLE);
                var startPos = H5.Int.umul(start, JuiceboxEngine.Graphics.SpriteBatcher.ELEMENTS_PER_TRIANGLE);

                var floatArray = System.Array.init(length, 0, System.Single);

                for (var i = 0; i < length; i = (i + 1) >>> 0) {
                    floatArray[i] = this._vertexArray[((startPos + i) >>> 0)];
                }

                this._command.VertexBuffer.UpdateData(floatArray, H5.Int.mul((start | 0), JuiceboxEngine.Graphics.SpriteBatcher.ELEMENTS_PER_TRIANGLE));
                this._command.VertexBuffer.StartIndex = H5.Int.mul((start | 0), 3);
                this._command.VertexBuffer.VertexRange = H5.Int.mul((((((end - start) >>> 0))) | 0), 3);

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.WORLD, JuiceboxEngine.Math.Matrix4.Identity.$clone());

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.Command(this._command);
            },
            /**
             * Increase vertex array size.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Graphics.SpriteBatcher
             * @memberof JuiceboxEngine.Graphics.SpriteBatcher
             * @param   {number}    size
             * @return  {void}
             */
            ExpandVertexArray: function (size) {
                var newCount = this._vertexArray.length;

                while (H5.Int.mul(size, JuiceboxEngine.Graphics.SpriteBatcher.ELEMENTS_PER_SPRITE) > newCount) {
                    newCount = (newCount + (6912)) | 0;
                }

                this._vertexArray = System.Array.init(newCount, 0, System.Single);
            }
        }
    });

    H5.define("JuiceboxEngine.Graphics.SpriteBatchItem", {
        fields: {
            Texture2D: null,
            Depth: 0,
            positionX: null,
            positionY: null,
            color: null,
            textureU: null,
            textureV: null
        },
        ctors: {
            init: function () {
                this.color = new JuiceboxEngine.Math.Color();
            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.SpriteBatchItem
             * @memberof JuiceboxEngine.Graphics.SpriteBatchItem
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.positionX = System.Array.init(6, 0, System.Single);
                this.positionY = System.Array.init(6, 0, System.Single);
                this.textureU = System.Array.init(6, 0, System.Single);
                this.textureV = System.Array.init(6, 0, System.Single);
            }
        },
        methods: {
            /**
             * Set values for Sprite Batch Item.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.SpriteBatchItem
             * @memberof JuiceboxEngine.Graphics.SpriteBatchItem
             * @param   {number}                         x             X Position.
             * @param   {number}                         y             Y Position.
             * @param   {number}                         dx            Pivot X
             * @param   {number}                         dy            Pivot Y
             * @param   {number}                         w             Width of the sprite.
             * @param   {number}                         h             Height of the sprite.
             * @param   {number}                         sin           Rotation.
             * @param   {number}                         cos           Rotation.
             * @param   {JuiceboxEngine.Math.Color}      color         Color of the sprite.
             * @param   {JuiceboxEngine.Math.Vector2}    texCoordUL    Upper Left texture coordinate.
             * @param   {JuiceboxEngine.Math.Vector2}    texCoordLR    Lower Right texture coordinate.
             * @return  {void}
             */
            Set: function (x, y, dx, dy, w, h, sin, cos, color, texCoordUL, texCoordLR) {
                this.color = color.v.$clone();

                this.positionX[0] = x + dx * cos - (dy + h) * sin;
                this.positionY[0] = y + dx * sin + (dy + h) * cos;
                this.textureU[0] = texCoordUL.v.X;
                this.textureV[0] = texCoordUL.v.Y;

                this.positionX[1] = x + (dx + w) * cos - (dy + h) * sin;
                this.positionY[1] = y + (dx + w) * sin + (dy + h) * cos;
                this.textureU[1] = texCoordLR.v.X;
                this.textureV[1] = texCoordUL.v.Y;

                this.positionX[2] = x + (dx + w) * cos - dy * sin;
                this.positionY[2] = y + (dx + w) * sin + dy * cos;
                this.textureU[2] = texCoordLR.v.X;
                this.textureV[2] = texCoordLR.v.Y;

                this.positionX[3] = this.positionX[0];
                this.positionY[3] = this.positionY[0];
                this.textureU[3] = this.textureU[0];
                this.textureV[3] = this.textureV[0];

                this.positionX[4] = x + dx * cos - dy * sin;
                this.positionY[4] = y + dx * sin + dy * cos;
                this.textureU[4] = texCoordUL.v.X;
                this.textureV[4] = texCoordLR.v.Y;

                this.positionX[5] = this.positionX[2];
                this.positionY[5] = this.positionY[2];
                this.textureU[5] = this.textureU[2];
                this.textureV[5] = this.textureV[2];

            }
        }
    });

    /**
     * Defines the way to sample the texture.
     *
     * @public
     * @class number
     */
    H5.define("JuiceboxEngine.Graphics.Texture2D.SampleMode", {
        $kind: "nested enum",
        statics: {
            fields: {
                /**
                 * Sample pixels nearest neighbour.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 0
                 * @type number
                 */
                Point: 0,
                /**
                 * Sample pixels linearly.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 1
                 * @type number
                 */
                Linear: 1
            }
        }
    });

    /**
     * Defines what happens with texture coordinates out of the 0-1 range.
     *
     * @public
     * @class number
     */
    H5.define("JuiceboxEngine.Graphics.Texture2D.WrapMode", {
        $kind: "nested enum",
        statics: {
            fields: {
                /**
                 * Clamp texture to edge.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 0
                 * @type number
                 */
                Clamp: 0,
                /**
                 * Keep repeating the texture.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 1
                 * @type number
                 */
                Repeat: 1,
                /**
                 * Repeat, with alternating a mirrored image.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 2
                 * @type number
                 */
                MirrorRepeat: 2
            }
        }
    });

    /**
     * Class representing a uniform value for rendering.
     *
     * @public
     * @class JuiceboxEngine.Graphics.Uniform
     */
    H5.define("JuiceboxEngine.Graphics.Uniform", {
        statics: {
            methods: {
                /**
                 * Get type from a object.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Graphics.Uniform
                 * @memberof JuiceboxEngine.Graphics.Uniform
                 * @param   {System.Object}    obj    The object to get the type from.
                 * @return  {number}                  The uniform type.
                 */
                GetType: function (obj) {
                    var type = JuiceboxEngine.Graphics.Uniform.UniformType.NONE;
                    do {
                        if (H5.is(obj, System.Single)) {
                            var f = H5.cast(obj, System.Single);
                            type = JuiceboxEngine.Graphics.Uniform.UniformType.FLOAT;
                            break;
                        }

                        if (H5.is(obj, System.Double)) {
                            var d = H5.cast(obj, System.Double);
                            type = JuiceboxEngine.Graphics.Uniform.UniformType.DOUBLE;
                            break;
                        }

                        if (H5.is(obj, System.Int32)) {
                            var i = H5.cast(obj, System.Int32);
                            type = JuiceboxEngine.Graphics.Uniform.UniformType.INT;
                            break;
                        }

                        if (H5.is(obj, JuiceboxEngine.Math.Vector2)) {
                            var v2 = H5.cast(obj, JuiceboxEngine.Math.Vector2);
                            type = JuiceboxEngine.Graphics.Uniform.UniformType.VECTOR2;
                            break;
                        }

                        if (H5.is(obj, JuiceboxEngine.Math.Vector3)) {
                            var v3 = H5.cast(obj, JuiceboxEngine.Math.Vector3);
                            type = JuiceboxEngine.Graphics.Uniform.UniformType.VECTOR3;
                            break;
                        }

                        if (H5.is(obj, JuiceboxEngine.Math.Vector4)) {
                            var v4 = H5.cast(obj, JuiceboxEngine.Math.Vector4);
                            type = JuiceboxEngine.Graphics.Uniform.UniformType.VECTOR4;
                            break;
                        }

                        if (H5.is(obj, JuiceboxEngine.Math.Color)) {
                            var c = H5.cast(obj, JuiceboxEngine.Math.Color);
                            type = JuiceboxEngine.Graphics.Uniform.UniformType.COLOR;
                            break;
                        }

                        if (H5.is(obj, JuiceboxEngine.Math.Matrix4)) {
                            var m = H5.cast(obj, JuiceboxEngine.Math.Matrix4);
                            type = JuiceboxEngine.Graphics.Uniform.UniformType.MATRIX4;
                            break;
                        }

                        if (H5.is(obj, JuiceboxEngine.Graphics.Texture2D)) {
                            var t = H5.cast(obj, JuiceboxEngine.Graphics.Texture2D);
                            if (H5.is(t, JuiceboxEngine.Graphics.RenderTarget)) {
                                type = JuiceboxEngine.Graphics.Uniform.UniformType.RENDERTARGET;
                            } else {
                                type = JuiceboxEngine.Graphics.Uniform.UniformType.TEXTURE2D;
                            }
                            break;
                        }
                    } while (false);
                    return type;
                }
            }
        },
        fields: {
            /**
             * Name of the parameter, must be same in the shader.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Uniform
             * @type string
             */
            name: null,
            /**
             * Value of the uniform.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Uniform
             * @type System.Object
             */
            value: null,
            /**
             * Type of the uniform.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Uniform
             * @type number
             */
            type: 0
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Uniform
             * @memberof JuiceboxEngine.Graphics.Uniform
             * @param   {string}           name     The uniform name (must be same in the shader)
             * @param   {System.Object}    value    The uniform value, must be of type given in the next parameter.
             * @param   {number}           type     The value type.
             * @return  {void}
             */
            $ctor1: function (name, value, type) {
                this.$initialize();
                this.name = name;
                this.value = value;
                this.type = type;
            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Uniform
             * @memberof JuiceboxEngine.Graphics.Uniform
             * @param   {string}           name     The uniform name (must be same in the shader)
             * @param   {System.Object}    value    The uniform value, must be of type given in the next parameter.
             * @return  {void}
             */
            ctor: function (name, value) {
                this.$initialize();
                this.name = name;
                this.value = value;

                this.type = JuiceboxEngine.Graphics.Uniform.GetType(value);
            }
        }
    });

    /**
     * Type of the value.
     *
     * @public
     * @class number
     */
    H5.define("JuiceboxEngine.Graphics.Uniform.UniformType", {
        $kind: "nested enum",
        statics: {
            fields: {
                /**
                 * None type, shoudn't be used.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 0
                 * @type number
                 */
                NONE: 0,
                /**
                 * Normal {@link } type.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 1
                 * @type number
                 */
                FLOAT: 1,
                /**
                 * {@link } type.
                 Note: This will be converted to a {@link }
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 2
                 * @type number
                 */
                DOUBLE: 2,
                /**
                 * {@link } type.
                 Note: This will be converted to a {@link }
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 3
                 * @type number
                 */
                INT: 3,
                /**
                 * {@link } type.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 4
                 * @type number
                 */
                VECTOR2: 4,
                /**
                 * {@link } type.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 5
                 * @type number
                 */
                VECTOR3: 5,
                /**
                 * {@link } type.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 6
                 * @type number
                 */
                VECTOR4: 6,
                /**
                 * {@link } type.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 7
                 * @type number
                 */
                COLOR: 7,
                /**
                 * {@link } type.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 8
                 * @type number
                 */
                MATRIX4: 8,
                /**
                 * {@link } type.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 9
                 * @type number
                 */
                TEXTURE2D: 9,
                /**
                 * {@link } type.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 10
                 * @type number
                 */
                RENDERTARGET: 10
            }
        }
    });

    /**
     * Data structure representing a vertex attribute.
     *
     * @public
     * @class JuiceboxEngine.Graphics.VertexAttribute
     */
    H5.define("JuiceboxEngine.Graphics.VertexAttribute", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new JuiceboxEngine.Graphics.VertexAttribute(); }
            }
        },
        fields: {
            /**
             * Name of the attribute.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Graphics.VertexAttribute
             * @type string
             */
            Name: null,
            /**
             * Amount of components of this specific attribute.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Graphics.VertexAttribute
             * @type number
             */
            Components: 0,
            /**
             * Normalizes the values, should be false as WebGL does not support this.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Graphics.VertexAttribute
             * @type boolean
             */
            Normalize: false,
            /**
             * The total stride of all attributes.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Graphics.VertexAttribute
             * @type number
             */
            Stride: 0,
            /**
             * The offset of this attribute.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Graphics.VertexAttribute
             * @type number
             */
            Offset: 0
        },
        ctors: {
            /**
             * Construct a vertex attribute.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.VertexAttribute
             * @memberof JuiceboxEngine.Graphics.VertexAttribute
             * @param   {string}     name          Name of the attribute.
             * @param   {number}     components    Amount of components of this specific attribute.
             * @param   {boolean}    normalize     Normalizes the values, should be false as WebGL does not support this.
             * @param   {number}     stride        The total stride of all attributes.
             * @param   {number}     offset        The offset of this attribute.
             * @return  {void}
             */
            $ctor1: function (name, components, normalize, stride, offset) {
                this.$initialize();
                this.Name = name;
                this.Components = components;
                this.Normalize = normalize;
                this.Stride = stride;
                this.Offset = offset;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = H5.addHash([5561828516, this.Name, this.Components, this.Normalize, this.Stride, this.Offset]);
                return h;
            },
            equals: function (o) {
                if (!H5.is(o, JuiceboxEngine.Graphics.VertexAttribute)) {
                    return false;
                }
                return H5.equals(this.Name, o.Name) && H5.equals(this.Components, o.Components) && H5.equals(this.Normalize, o.Normalize) && H5.equals(this.Stride, o.Stride) && H5.equals(this.Offset, o.Offset);
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Graphics.VertexAttribute();
                s.Name = this.Name;
                s.Components = this.Components;
                s.Normalize = this.Normalize;
                s.Stride = this.Stride;
                s.Offset = this.Offset;
                return s;
            }
        }
    });

    /**
     * Represents a VBO.
     *
     * @public
     * @class JuiceboxEngine.Graphics.VertexBuffer
     */
    H5.define("JuiceboxEngine.Graphics.VertexBuffer", {
        fields: {
            _context: null,
            Buffer: null,
            _vertexData: null,
            /**
             * The vertex attributes.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.VertexBuffer
             * @function Attributes
             * @type System.Collections.Generic.List$1
             */
            Attributes: null,
            /**
             * The amount of verts in this buffer.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.VertexBuffer
             * @function VertCount
             * @type number
             */
            VertCount: 0,
            /**
             * Start index of the vertex buffer. Defaults to zero.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.VertexBuffer
             * @function StartIndex
             * @type number
             */
            StartIndex: 0,
            /**
             * Amount of verts to render from this buffer. (TODO: move this in command?)
             If VertexRange is zero, it'll render the entire buffer.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.VertexBuffer
             * @function VertexRange
             * @type number
             */
            VertexRange: 0,
            _stride: 0
        },
        ctors: {
            /**
             * Default constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.VertexBuffer
             * @memberof JuiceboxEngine.Graphics.VertexBuffer
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this._context = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context;

                this.VertCount = 0;
                this.StartIndex = 0;
                this.VertexRange = 0;
                this._stride = 0;

                this.Attributes = new (System.Collections.Generic.List$1(JuiceboxEngine.Graphics.VertexAttribute)).ctor();
            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.VertexBuffer
             * @memberof JuiceboxEngine.Graphics.VertexBuffer
             * @param   {Array.<number>}    data    Data for the vertex buffer.
             * @return  {void}
             */
            $ctor1: function (data) {
                JuiceboxEngine.Graphics.VertexBuffer.ctor.call(this);
                this._vertexData = data;
                this.UpdateData(this._vertexData);
            }
        },
        methods: {
            /**
             * Set an attribute for the vertexbuffer.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.VertexBuffer
             * @memberof JuiceboxEngine.Graphics.VertexBuffer
             * @param   {JuiceboxEngine.Graphics.VertexAttribute}    attribute    The vertexattribute. Can be created trough {@link }
             * @return  {void}
             */
            SetAttribute: function (attribute) {
                this.Attributes.add(attribute);
                this._stride = attribute.Stride;

                if (this._vertexData != null) {
                    this.VertCount = this.CalculateVertexCount(this._vertexData.length);
                }
            },
            /**
             * Calculate vertex count from element count.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.VertexBuffer
             * @memberof JuiceboxEngine.Graphics.VertexBuffer
             * @param   {number}    length    Count of elements
             * @return  {number}              The vertex count from the given element amount.
             */
            CalculateVertexCount: function (length) {
                if (this.Attributes.Count === 0) {
                    return 0;
                }

                return ((H5.Int.div(length, (((H5.Int.div(this._stride, 4)) | 0)))) | 0);
            },
            /**
             * Update data in the vertex buffer.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.VertexBuffer
             * @memberof JuiceboxEngine.Graphics.VertexBuffer
             * @param   {Array.<number>}    data      The new vertex data. Size of this array
             * @param   {number}            offset    The offset to set the data.
             * @return  {void}
             */
            UpdateData: function (data, offset) {
                if (offset === void 0) { offset = 0; }
                if (this.Buffer == null) {
                    this._vertexData = data;
                    this.Buffer = this._context.CreateVertexBuffer(this._vertexData);
                } else if (((data.length + offset) | 0) > this._vertexData.length) {
                    this._context.DeleteBuffer(this.Buffer);

                    var newBuffer = System.Array.init(((offset + data.length) | 0), 0, System.Single);

                    System.Array.copy(this._vertexData, 0, newBuffer, 0, this._vertexData.length);
                    System.Array.copy(data, 0, newBuffer, offset, data.length);

                    this.Buffer = this._context.CreateVertexBuffer(newBuffer);
                    this._vertexData = newBuffer;
                } else {
                    this._context.UpdateVertexBufferData(this, offset, data);

                    System.Array.copy(data, 0, this._vertexData, offset, data.length);
                }

                this.VertCount = this.CalculateVertexCount(data.length);
            },
            /**
             * Destroy the vertex buffer. (Also in graphics memory)
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.VertexBuffer
             * @memberof JuiceboxEngine.Graphics.VertexBuffer
             * @return  {void}
             */
            Destroy: function () {
                this._context.DeleteBuffer(this.Buffer);
            }
        }
    });

    /**
     * Vertical text alignment options.
     *
     * @public
     * @class JuiceboxEngine.Graphics.VerticalAlignment
     */
    H5.define("JuiceboxEngine.Graphics.VerticalAlignment", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * Align to top.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.VerticalAlignment
                 * @constant
                 * @default 0
                 * @type JuiceboxEngine.Graphics.VerticalAlignment
                 */
                TOP: 0,
                /**
                 * Align to center.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.VerticalAlignment
                 * @constant
                 * @default 1
                 * @type JuiceboxEngine.Graphics.VerticalAlignment
                 */
                CENTER: 1,
                /**
                 * Align to bottom.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Graphics.VerticalAlignment
                 * @constant
                 * @default 2
                 * @type JuiceboxEngine.Graphics.VerticalAlignment
                 */
                BOTTOM: 2
            }
        }
    });

    /**
     * @memberof JuiceboxEngine.GUI
     * @callback JuiceboxEngine.GUI.UIDelegate
     * @param   {JuiceboxEngine.GUI.UIEvent}    ev
     * @return  {void}
     */

    /** @namespace JuiceboxEngine.GUI */

    /**
     * An UI element.
     *
     * @abstract
     * @public
     * @class JuiceboxEngine.GUI.UIElement
     */
    H5.define("JuiceboxEngine.GUI.UIElement", {
        fields: {
            /**
             * Enable or disable the UI element and its children.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function Enabled
             * @type boolean
             */
            Enabled: false,
            /**
             * World matrix of UI element.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function World
             * @type JuiceboxEngine.Math.Matrix4
             */
            World: null,
            /**
             * The parent of this element.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function Parent
             * @type JuiceboxEngine.GUI.UIElement
             */
            Parent: null,
            /**
             * The Children of this gameobject.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function Children
             * @type System.Collections.Generic.List$1
             */
            Children: null,
            /**
             * Show debug bounds of this UI element.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function ShowDebugBounds
             * @type boolean
             */
            ShowDebugBounds: false,
            /**
             * Set the input behaviour for this element.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function InputType
             * @type JuiceboxEngine.GUI.UIInput
             */
            InputType: 0,
            /**
             * The command to execute on render.
             *
             * @instance
             * @protected
             * @memberof JuiceboxEngine.GUI.UIElement
             * @type JuiceboxEngine.Graphics.GraphicsCommand
             */
            _command: null,
            _isDirty: false,
            _hovered: false,
            _resourceManager: null,
            _rotation: 0,
            _pivot: null,
            _position: null,
            _anchor: null,
            _dimensions: null,
            _color: null,
            _bounds: null
        },
        events: {
            /**
             * On mouse down (click) event.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function addOnMouseDown
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            /**
             * On mouse down (click) event.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function removeOnMouseDown
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            OnMouseDown: null,
            /**
             * On mouse up (click) event.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function addOnMouseUp
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            /**
             * On mouse up (click) event.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function removeOnMouseUp
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            OnMouseUp: null,
            /**
             * On mouse being held down, called every frame the mouse is down.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function addOnMouseHeld
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            /**
             * On mouse being held down, called every frame the mouse is down.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function removeOnMouseHeld
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            OnMouseHeld: null,
            /**
             * On mouse over event, called every frame the mouse is on top of this element.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function addOnMouseStay
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            /**
             * On mouse over event, called every frame the mouse is on top of this element.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function removeOnMouseStay
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            OnMouseStay: null,
            /**
             * On mouse enter event, called when mouse enters the object.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function addOnMouseEnter
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            /**
             * On mouse enter event, called when mouse enters the object.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function removeOnMouseEnter
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            OnMouseEnter: null,
            /**
             * On mouse exit event, called when mouse exits the object.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function addOnMouseExit
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            /**
             * On mouse exit event, called when mouse exits the object.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function removeOnMouseExit
             * @param   {JuiceboxEngine.GUI.UIDelegate}    value
             * @return  {void}
             */
            OnMouseExit: null
        },
        props: {
            /**
             * Position of this UI element relative to the parent.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function Position
             * @type JuiceboxEngine.Math.Vector2
             */
            Position: {
                get: function () {
                    return this._position.$clone();
                },
                set: function (value) {
                    this._position = value.$clone();
                    this.UpdatePosition();
                }
            },
            /**
             * Rotation of the UI element.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function Rotation
             * @type number
             */
            Rotation: {
                get: function () {
                    return this._rotation;
                },
                set: function (value) {
                    this._rotation = value;
                    this.UpdatePosition();
                }
            },
            /**
             * Get the absolute position of the UI element.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function AbsolutePosition
             * @type JuiceboxEngine.Math.Vector2
             */
            AbsolutePosition: {
                get: function () {
                    if (this.Parent == null) {
                        return this.Position.$clone();
                    }
                    return JuiceboxEngine.Math.Vector2.op_Subtraction(JuiceboxEngine.Math.Vector2.op_Addition(JuiceboxEngine.Math.Vector2.op_Addition(this.Position.$clone(), this.Parent.AbsolutePosition.$clone()), (JuiceboxEngine.Math.Vector2.op_Multiply(this.Anchor.$clone(), this.Parent.Dimensions.$clone()))), (JuiceboxEngine.Math.Vector2.op_Multiply(this.Pivot.$clone(), this.Dimensions.$clone())));
                }
            },
            /**
             * Pivot of this UI element.
             (0, 0) is bottom left, (1, 1) is upper right. (0.5, 0.5) is the center.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function Pivot
             * @type JuiceboxEngine.Math.Vector2
             */
            Pivot: {
                get: function () {
                    return this._pivot.$clone();
                },
                set: function (value) {
                    this._pivot = value.$clone();
                    this.UpdatePosition();
                }
            },
            /**
             * Anchor of this UI element. (where it is anchored in the parent)
             (0, 0) is the bottom left, (1, 1) is upper right.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function Anchor
             * @type JuiceboxEngine.Math.Vector2
             */
            Anchor: {
                get: function () {
                    return this._anchor.$clone();
                },
                set: function (value) {
                    this._anchor = value.$clone();
                    this.UpdatePosition();
                }
            },
            /**
             * Color of this GUI element.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function Color
             * @type JuiceboxEngine.Math.Color
             */
            Color: {
                get: function () {
                    return this._color.$clone();
                },
                set: function (value) {
                    this._color = value.$clone();
                    this.ForceUpdate();
                }
            },
            /**
             * Dimensions of this UI element.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function Dimensions
             * @type JuiceboxEngine.Math.Vector2
             */
            Dimensions: {
                get: function () {
                    return this._dimensions.$clone();
                },
                set: function (value) {
                    if (JuiceboxEngine.Math.Vector2.op_Inequality(value.$clone(), this._dimensions.$clone())) {
                        this._dimensions = value.$clone();
                        this.ForceUpdate();
                    }
                }
            },
            /**
             * Get the UI root of this element.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function RootElement
             * @type JuiceboxEngine.GUI.UIElement
             */
            RootElement: {
                get: function () {
                    if (this.Parent == null) {
                        return this;
                    }

                    return this.Parent.RootElement;
                }
            },
            /**
             * Get the UI element bounds.
             Frustum testing is done on this object.
             The UI element should not exceed these bounds.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function Bounds
             * @type JuiceboxEngine.Math.RectangleF
             */
            Bounds: {
                get: function () {
                    return this._bounds.$clone();
                }
            },
            /**
             * The resource manager for this component, finds the root resource manager.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIElement
             * @function ResourceManager
             * @type JuiceboxEngine.Resources.ResourceManager
             */
            ResourceManager: {
                get: function () {
                    if (this._resourceManager == null) {
                        return this.Parent.ResourceManager;
                    }
                    return this._resourceManager;
                },
                set: function (value) {
                    this._resourceManager = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.World = new JuiceboxEngine.Math.Matrix4();
                this._pivot = new JuiceboxEngine.Math.Vector2();
                this._position = new JuiceboxEngine.Math.Vector2();
                this._anchor = new JuiceboxEngine.Math.Vector2();
                this._dimensions = new JuiceboxEngine.Math.Vector2();
                this._color = new JuiceboxEngine.Math.Color();
                this._bounds = new JuiceboxEngine.Math.RectangleF();
            },
            /**
             * Constructor, creates the UI element.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @param   {JuiceboxEngine.GUI.UIElement}    parent    The parent UI element.
             * @return  {void}
             */
            ctor: function (parent) {
                JuiceboxEngine.GUI.UIElement.$ctor1.call(this, parent, null);

            },
            /**
             * Constructor.
             *
             * @instance
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @param   {JuiceboxEngine.GUI.UIElement}                parent             The parent UI element, null if the element is the root.
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager    The resource manager used for managing the UI.
             * @return  {void}
             */
            $ctor1: function (parent, resourceManager) {
                this.$initialize();
                this.Parent = parent;

                this._resourceManager = resourceManager;
                this._hovered = false;
                this._isDirty = true;

                if (parent != null) {
                    parent.Children.add(this);
                }

                this.Children = new (System.Collections.Generic.List$1(JuiceboxEngine.GUI.UIElement)).ctor();
                this._command = new JuiceboxEngine.Graphics.GraphicsCommand();

                this.Color = new JuiceboxEngine.Math.Color.$ctor3(1.0, 1.0, 1.0, 1.0);

                this._command.Program = this.ResourceManager.Load(JuiceboxEngine.Graphics.ShaderProgram, "Shaders/UI.vert");

                this._command.VertexBuffer = new JuiceboxEngine.Graphics.VertexBuffer.ctor();
                this._command.VertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 36, 0));
                this._command.VertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 36, 12));
                this._command.VertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_col", 4, false, 36, 20));

                this.Enabled = true;

                this.ShowDebugBounds = false;

                this.InputType = JuiceboxEngine.GUI.UIInput.ALL;
            }
        },
        methods: {
            /**
             * Check if the click hits something inside the UI element.
             Will give children priority.
             *
             * @instance
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @param   {JuiceboxEngine.Math.Vector2}     position    Position of the mouse, in screen pixels.
             * @return  {JuiceboxEngine.GUI.UIElement}                The UI element that is hovered, or null.
             */
            HandleMouse: function (position) {
                if (!this.Enabled || this.InputType === JuiceboxEngine.GUI.UIInput.NONE) {
                    return null;
                }

                if ((this.InputType & 1) === 1) {
                    for (var i = (this.Children.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                        var child = this.Children.getItem(i);
                        var focused = child.HandleMouse(position.$clone());
                        if (focused != null) {
                            return focused;
                        }
                    }
                }

                if ((this.InputType & 2) !== 2) {
                    return null;
                }

                var absolutePos = this.AbsolutePosition.$clone();
                var mouseEvent = new JuiceboxEngine.GUI.UIMouseEvent(this, JuiceboxEngine.Math.Vector2.op_Subtraction(position.$clone(), absolutePos.$clone()));

                if (position.X > absolutePos.X && position.Y > absolutePos.Y) {
                    if (position.X < absolutePos.X + this.Dimensions.X && position.Y < absolutePos.Y + this.Dimensions.Y) {
                        if (!this._hovered) {
                            !H5.staticEquals(this.OnMouseEnter, null) ? this.OnMouseEnter(mouseEvent) : null;
                            this._hovered = true;
                        }

                        !H5.staticEquals(this.OnMouseStay, null) ? this.OnMouseStay(mouseEvent) : null;

                        if (JuiceboxEngine.Input.InputManager.Instance.MouseKeyHeld(JuiceboxEngine.Input.MouseKey.LeftMouse)) {
                            !H5.staticEquals(this.OnMouseHeld, null) ? this.OnMouseHeld(mouseEvent) : null;
                        }

                        if (JuiceboxEngine.Input.InputManager.Instance.MouseKeyDown(JuiceboxEngine.Input.MouseKey.LeftMouse)) {
                            !H5.staticEquals(this.OnMouseDown, null) ? this.OnMouseDown(mouseEvent) : null;
                        }

                        if (JuiceboxEngine.Input.InputManager.Instance.MouseKeyReleased(JuiceboxEngine.Input.MouseKey.LeftMouse)) {
                            !H5.staticEquals(this.OnMouseUp, null) ? this.OnMouseUp(mouseEvent) : null;
                        }

                        return this;
                    }
                }

                return null;
            },
            /**
             * Called by User Interface when a new object has been focussed.
             *
             * @instance
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @param   {JuiceboxEngine.Math.Vector2}    position    The mouse position.
             * @return  {void}
             */
            LoseFocus: function (position) {
                !H5.staticEquals(this.OnMouseExit, null) ? this.OnMouseExit(new JuiceboxEngine.GUI.UIMouseEvent(this, JuiceboxEngine.Math.Vector2.op_Subtraction(position.$clone(), this.AbsolutePosition.$clone()))) : null;
                this._hovered = false;
            },
            /**
             * Removes an element from this object's children.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @param   {JuiceboxEngine.GUI.UIElement}    element    The object to remove.
             * @return  {void}
             */
            RemoveChild: function (element) {
                if (this.Children.contains(element)) {
                    this.Children.remove(element);
                }
            },
            /**
             * Render UI element and its children.
             *
             * @instance
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @param   {JuiceboxEngine.Math.RectangleF}    frustum
             * @return  {void}
             */
            RenderElement: function (frustum) {
                if (!this.Enabled) {
                    return;
                }

                var updated = false;

                if (this._isDirty) {
                    this.UpdateElement();
                    updated = true;
                    this._isDirty = false;
                }

                if (frustum.v.Intersects(this._bounds.$clone())) {
                    JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.WORLD, this.World.$clone());

                    this.Render();
                }

                if (this.ShowDebugBounds) {
                    this.DrawDebuggingShapes(updated);
                }

                for (var i = 0; i < this.Children.Count; i = (i + 1) | 0) {
                    this.Children.getItem(i).RenderElement(frustum);
                }
            },
            /**
             * Draws debug outlines and can fill the entire element with one color.
             *
             * @instance
             * @protected
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @param   {boolean}    fill    True to fill the entire element with one color.
             * @return  {void}
             */
            DrawDebuggingShapes: function (fill) {
                if (fill) {
                    JuiceboxEngine.Debugging.DebugRenderer.InstanceGUI.DrawRectFilled(this._bounds.$clone(), JuiceboxEngine.Math.Color.Blue.$clone());
                }

                JuiceboxEngine.Debugging.DebugRenderer.InstanceGUI.DrawRect(this._bounds.$clone(), JuiceboxEngine.Math.Color.Red.$clone(), 1.0);
            },
            /**
             * Update position matrix of UI element and children.
             Moving an UI element is fairly cheap performance wise.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @return  {void}
             */
            UpdatePosition: function () {
                var absolutePos = this.AbsolutePosition.$clone();

                this.World = JuiceboxEngine.Math.Matrix4.CreateTranslation(new JuiceboxEngine.Math.Vector3.$ctor2(absolutePos.X, absolutePos.Y, 0.0));
                this.World = JuiceboxEngine.Math.Matrix4.Multiply(JuiceboxEngine.Math.Matrix4.CreateRotationZ(this._rotation), this.World.$clone());

                this._bounds = new JuiceboxEngine.Math.RectangleF.$ctor2(absolutePos.X, absolutePos.Y, this.Dimensions.X, this.Dimensions.Y);

                for (var i = 0; i < this.Children.Count; i = (i + 1) | 0) {
                    var child = this.Children.getItem(i);
                    child.UpdatePosition();
                }
            },
            /**
             * Force an update of the element before it is drawn.
             Also calls {@link }.
             This is more expensive to call then {@link } since this recalculates everyting.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIElement
             * @memberof JuiceboxEngine.GUI.UIElement
             * @return  {void}
             */
            ForceUpdate: function () {
                this._isDirty = true;

                this.UpdatePosition();

                for (var i = 0; i < this.Children.Count; i = (i + 1) | 0) {
                    var child = this.Children.getItem(i);
                    child.ForceUpdate();
                }
            }
        }
    });

    /**
     * Defines where the text should align to.
     *
     * @public
     * @class JuiceboxEngine.GUI.TextAlignment
     */
    H5.define("JuiceboxEngine.GUI.TextAlignment", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * Align to the left.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.GUI.TextAlignment
                 * @constant
                 * @default 0
                 * @type JuiceboxEngine.GUI.TextAlignment
                 */
                Left: 0,
                /**
                 * Center text.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.GUI.TextAlignment
                 * @constant
                 * @default 1
                 * @type JuiceboxEngine.GUI.TextAlignment
                 */
                Center: 1,
                /**
                 * Align to the right.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.GUI.TextAlignment
                 * @constant
                 * @default 2
                 * @type JuiceboxEngine.GUI.TextAlignment
                 */
                Right: 2
            }
        }
    });

    /**
     * Class for default UI values.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.GUI.UIDefaults
     */
    H5.define("JuiceboxEngine.GUI.UIDefaults", {
        statics: {
            fields: {
                /**
                 * Anchor/pivot point. (0.0, 0.0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.GUI.UIDefaults
                 * @type JuiceboxEngine.Math.Vector2
                 */
                BottomLeft: null,
                /**
                 * Anchor/pivot point. (0.5, 0.0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.GUI.UIDefaults
                 * @type JuiceboxEngine.Math.Vector2
                 */
                BottomCenter: null,
                /**
                 * Anchor/pivot point. (1.0, 0.0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.GUI.UIDefaults
                 * @type JuiceboxEngine.Math.Vector2
                 */
                BottomRight: null,
                /**
                 * Anchor/pivot point. (0.0, 0.5)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.GUI.UIDefaults
                 * @type JuiceboxEngine.Math.Vector2
                 */
                CenterLeft: null,
                /**
                 * Anchor/pivot point. (0.5, 0.5)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.GUI.UIDefaults
                 * @type JuiceboxEngine.Math.Vector2
                 */
                Centered: null,
                /**
                 * Anchor/pivot point. (1.0, 0.5)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.GUI.UIDefaults
                 * @type JuiceboxEngine.Math.Vector2
                 */
                CenterRight: null,
                /**
                 * Anchor/pivot point. (0.0, 1.0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.GUI.UIDefaults
                 * @type JuiceboxEngine.Math.Vector2
                 */
                TopLeft: null,
                /**
                 * Anchor/pivot point. (0.5, 1.0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.GUI.UIDefaults
                 * @type JuiceboxEngine.Math.Vector2
                 */
                TopCenter: null,
                /**
                 * Anchor/pivot point. (1.0, 1.0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.GUI.UIDefaults
                 * @type JuiceboxEngine.Math.Vector2
                 */
                TopRight: null
            },
            ctors: {
                init: function () {
                    this.BottomLeft = new JuiceboxEngine.Math.Vector2();
                    this.BottomCenter = new JuiceboxEngine.Math.Vector2();
                    this.BottomRight = new JuiceboxEngine.Math.Vector2();
                    this.CenterLeft = new JuiceboxEngine.Math.Vector2();
                    this.Centered = new JuiceboxEngine.Math.Vector2();
                    this.CenterRight = new JuiceboxEngine.Math.Vector2();
                    this.TopLeft = new JuiceboxEngine.Math.Vector2();
                    this.TopCenter = new JuiceboxEngine.Math.Vector2();
                    this.TopRight = new JuiceboxEngine.Math.Vector2();
                    this.BottomLeft = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 0.0);
                    this.BottomCenter = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.0);
                    this.BottomRight = new JuiceboxEngine.Math.Vector2.$ctor3(1.0, 0.0);
                    this.CenterLeft = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 0.5);
                    this.Centered = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5);
                    this.CenterRight = new JuiceboxEngine.Math.Vector2.$ctor3(1.0, 0.5);
                    this.TopLeft = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 1.0);
                    this.TopCenter = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 1.0);
                    this.TopRight = new JuiceboxEngine.Math.Vector2.$ctor3(1.0, 1.0);
                }
            }
        }
    });

    /**
     * An UI event base class.
     *
     * @abstract
     * @public
     * @class JuiceboxEngine.GUI.UIEvent
     */
    H5.define("JuiceboxEngine.GUI.UIEvent", {
        fields: {
            /**
             * The element affected.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIEvent
             * @type JuiceboxEngine.GUI.UIElement
             */
            element: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIEvent
             * @memberof JuiceboxEngine.GUI.UIEvent
             * @param   {JuiceboxEngine.GUI.UIElement}    element    The affected element.
             * @return  {void}
             */
            ctor: function (element) {
                this.$initialize();
                this.element = element;
            }
        }
    });

    /**
     * Enum with types of input for UI clicks.
     *
     * @public
     * @class JuiceboxEngine.GUI.UIInput
     */
    H5.define("JuiceboxEngine.GUI.UIInput", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * Take no input at all. Can save performance on many elements that don't require input.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.GUI.UIInput
                 * @constant
                 * @default 0
                 * @type JuiceboxEngine.GUI.UIInput
                 */
                NONE: 0,
                /**
                 * Check input on the children of this UI element.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.GUI.UIInput
                 * @constant
                 * @default 1
                 * @type JuiceboxEngine.GUI.UIInput
                 */
                CHILDREN: 1,
                /**
                 * Check input on this object.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.GUI.UIInput
                 * @constant
                 * @default 2
                 * @type JuiceboxEngine.GUI.UIInput
                 */
                SELF: 2,
                /**
                 * Check input on self and children.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.GUI.UIInput
                 * @constant
                 * @default 3
                 * @type JuiceboxEngine.GUI.UIInput
                 */
                ALL: 3
            }
        }
    });

    /**
     * An user interface. 
     Controls the interface, and renders it.
     *
     * @public
     * @class JuiceboxEngine.GUI.UserInterface
     */
    H5.define("JuiceboxEngine.GUI.UserInterface", {
        fields: {
            /**
             * The root element of the  User Interface.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UserInterface
             * @function Root
             * @type JuiceboxEngine.GUI.UIElement
             */
            Root: null,
            /**
             * The currently focus element by mouse.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UserInterface
             * @function FocusedElement
             * @type JuiceboxEngine.GUI.UIElement
             */
            FocusedElement: null,
            _viewMatrix: null,
            _projMatrix: null
        },
        ctors: {
            init: function () {
                this._viewMatrix = new JuiceboxEngine.Math.Matrix4();
                this._projMatrix = new JuiceboxEngine.Math.Matrix4();
            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UserInterface
             * @memberof JuiceboxEngine.GUI.UserInterface
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager
             * @return  {void}
             */
            ctor: function (resourceManager) {
                this.$initialize();
                this._viewMatrix = new JuiceboxEngine.Math.Matrix4.$ctor1(1.0);

                this.Root = new JuiceboxEngine.GUI.EmptyUIElement.$ctor1(null, resourceManager);
                this.FocusedElement = this.Root;

                this.ResizeRoot(JuiceboxEngine.Graphics.GraphicsManager.Instance.Width, JuiceboxEngine.Graphics.GraphicsManager.Instance.Height);

                JuiceboxEngine.Graphics.GraphicsManager.Instance.addOnResize(H5.fn.cacheBind(this, this.ResizeRoot));
            }
        },
        methods: {
            /**
             * Resizes the root element.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.GUI.UserInterface
             * @memberof JuiceboxEngine.GUI.UserInterface
             * @param   {number}    width     
             * @param   {number}    height
             * @return  {void}
             */
            ResizeRoot: function (width, height) {
                this.Root.Position = new JuiceboxEngine.Math.Vector2.$ctor3(((-width) | 0) / 2.0, ((-height) | 0) / 2.0);
                this.Root.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(width, height);

                this._projMatrix = JuiceboxEngine.Math.Matrix4.CreateOrthographic(width, height, 0.0, 1.0);
            },
            /**
             * Click in the user interface, returns the clicked UI element.
             *
             * @instance
             * @this JuiceboxEngine.GUI.UserInterface
             * @memberof JuiceboxEngine.GUI.UserInterface
             * @param   {JuiceboxEngine.Math.Vector2}    position    The position of the click in screen space in pixels. (0, 0) is bottom left.
             * @return  {void}
             */
            HandleMouse: function (position) {
                var focused = this.Root.HandleMouse(JuiceboxEngine.Math.Vector2.op_Addition(position.$clone(), this.Root.Position.$clone()));

                if (this.FocusedElement != null && !H5.referenceEquals(this.FocusedElement, focused)) {
                    this.FocusedElement.LoseFocus(JuiceboxEngine.Math.Vector2.op_Addition(position.$clone(), this.Root.Position.$clone()));
                }

                this.FocusedElement = focused;
            },
            /**
             * Called every frame to render the UI over the game.
             *
             * @instance
             * @this JuiceboxEngine.GUI.UserInterface
             * @memberof JuiceboxEngine.GUI.UserInterface
             * @return  {void}
             */
            RenderUserInterface: function () {
                var usedDepth = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UsingDepth;

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(false);

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.VIEW, this._viewMatrix.$clone());
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.PROJ, this._projMatrix.$clone());

                var rect = { v : new JuiceboxEngine.Math.RectangleF.$ctor2(this.Root.Position.X, this.Root.Position.Y, this.Root.Dimensions.X, this.Root.Dimensions.Y) };

                this.Root.RenderElement(rect);

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(usedDepth);
            }
        }
    });

    /** @namespace JuiceboxEngine.Input */

    /**
     * Class resonsible for taking input from the web page.
     *
     * @public
     * @class JuiceboxEngine.Input.InputManager
     */
    H5.define("JuiceboxEngine.Input.InputManager", {
        statics: {
            fields: {
                /**
                 * Singleton like patern.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Input.InputManager
                 * @function Instance
                 * @type JuiceboxEngine.Input.InputManager
                 */
                Instance: null
            }
        },
        fields: {
            /**
             * The position of the mouse ranging from [0-1]. bottom left (0, 0)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Input.InputManager
             * @function MousePosition
             * @type JuiceboxEngine.Math.Vector2
             */
            MousePosition: null,
            /**
             * The delta of the mouse since previous frame.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Input.InputManager
             * @function MouseDelta
             * @type JuiceboxEngine.Math.Vector2
             */
            MouseDelta: null,
            _prevMousePos: null,
            /**
             * Keep track of pushed buttons.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Input.InputManager
             * @function KeyBoard
             * @type System.Collections.Generic.Dictionary$2
             */
            KeyBoard: null,
            /**
             * On release keyboard.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Input.InputManager
             * @function OnReleaseKeyboard
             * @type System.Collections.Generic.Dictionary$2
             */
            OnReleaseKeyboard: null,
            /**
             * On press keyboard.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Input.InputManager
             * @function OnPressKeyboard
             * @type System.Collections.Generic.Dictionary$2
             */
            OnPressKeyboard: null,
            /**
             * Mouse buttons are tracked here.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Input.InputManager
             * @type JuiceboxEngine.Input.MouseKeyStatus
             */
            _leftClick: 0,
            _rightClick: 0,
            _middleClick: 0,
            /**
             * The canvas to take input from.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Input.InputManager
             * @type H5.Core..HTMLCanvasElement
             */
            _canvas: null,
            /**
             * String representing the given input for this frame.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Input.InputManager
             * @function InputString
             * @type string
             */
            InputString: null,
            /**
             * Indicates if the input was from a touch event.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Input.InputManager
             * @function InputIsTouch
             * @type boolean
             */
            InputIsTouch: false,
            /**
             * Indicates if any key was pressed this frame.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Input.InputManager
             * @function AnyKeyPressed
             * @type boolean
             */
            AnyKeyPressed: false
        },
        events: {
            OnAnyInteraction: null
        },
        ctors: {
            init: function () {
                this.MousePosition = new JuiceboxEngine.Math.Vector2();
                this.MouseDelta = new JuiceboxEngine.Math.Vector2();
                this._prevMousePos = new JuiceboxEngine.Math.Vector2();
            },
            /**
             * Initialize the input manager.
             *
             * @instance
             * @this JuiceboxEngine.Input.InputManager
             * @memberof JuiceboxEngine.Input.InputManager
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this._canvas = document.getElementById(JuiceboxEngine.Util.Config.ConfigValues.CanvasID);

                JuiceboxEngine.Input.InputManager.Instance = this;

                this.AnyKeyPressed = false;

                this.KeyBoard = new (System.Collections.Generic.Dictionary$2(System.String,System.Boolean)).ctor();
                this.OnPressKeyboard = new (System.Collections.Generic.Dictionary$2(System.String,System.Boolean)).ctor();
                this.OnReleaseKeyboard = new (System.Collections.Generic.Dictionary$2(System.String,System.Boolean)).ctor();

                this.MousePosition = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 0.5);

                this._canvas.addEventListener("mousemove", H5.fn.cacheBind(this, this.UpdateMouse));
                this._canvas.addEventListener("mousedown", H5.fn.cacheBind(this, this.MouseDown));
                this._canvas.addEventListener("mouseup", H5.fn.cacheBind(this, this.MouseUp));
                this._canvas.addEventListener("touchstart", H5.fn.cacheBind(this, this.TouchStart));
                this._canvas.addEventListener("touchmove", H5.fn.cacheBind(this, this.TouchMove));
                this._canvas.addEventListener("touchcancel", H5.fn.cacheBind(this, this.TouchEnd));
                this._canvas.addEventListener("touchleave", H5.fn.cacheBind(this, this.TouchEnd));
                this._canvas.addEventListener("touchend", H5.fn.cacheBind(this, this.TouchEnd));

                document.addEventListener("keydown", H5.fn.cacheBind(this, this.KeyDown$1));
                document.addEventListener("keyup", H5.fn.cacheBind(this, this.KeyUp));
            }
        },
        methods: {
            /**
             * Check if the mouse button is being held down.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Input.InputManager
             * @memberof JuiceboxEngine.Input.InputManager
             * @param   {JuiceboxEngine.Input.MouseKey}    mouseKey    The key to check.
             * @return  {boolean}                                      True if held down, false if not.
             */
            MouseKeyHeld: function (mouseKey) {
                switch (mouseKey) {
                    case JuiceboxEngine.Input.MouseKey.LeftMouse: 
                        return this._leftClick === JuiceboxEngine.Input.MouseKeyStatus.Pressed || this._leftClick === JuiceboxEngine.Input.MouseKeyStatus.Down;
                    case JuiceboxEngine.Input.MouseKey.RightMouse: 
                        return this._rightClick === JuiceboxEngine.Input.MouseKeyStatus.Pressed || this._rightClick === JuiceboxEngine.Input.MouseKeyStatus.Down;
                    case JuiceboxEngine.Input.MouseKey.MiddleMouse: 
                        return this._middleClick === JuiceboxEngine.Input.MouseKeyStatus.Pressed || this._middleClick === JuiceboxEngine.Input.MouseKeyStatus.Down;
                    default: 
                        return false;
                }
            },
            /**
             * Check if the mouse button is being pressed.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Input.InputManager
             * @memberof JuiceboxEngine.Input.InputManager
             * @param   {JuiceboxEngine.Input.MouseKey}    mouseKey    The key to check.
             * @return  {boolean}                                      True if the key is pressed this frame, false otherwise.
             */
            MouseKeyDown: function (mouseKey) {
                switch (mouseKey) {
                    case JuiceboxEngine.Input.MouseKey.LeftMouse: 
                        return this._leftClick === JuiceboxEngine.Input.MouseKeyStatus.Pressed;
                    case JuiceboxEngine.Input.MouseKey.RightMouse: 
                        return this._rightClick === JuiceboxEngine.Input.MouseKeyStatus.Pressed;
                    case JuiceboxEngine.Input.MouseKey.MiddleMouse: 
                        return this._middleClick === JuiceboxEngine.Input.MouseKeyStatus.Pressed;
                    default: 
                        return false;
                }
            },
            /**
             * Check if the mouse button is being released.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Input.InputManager
             * @memberof JuiceboxEngine.Input.InputManager
             * @param   {JuiceboxEngine.Input.MouseKey}    mouseKey    The key to check.
             * @return  {boolean}                                      True if the key is released this frame, false otherwise.
             */
            MouseKeyReleased: function (mouseKey) {
                switch (mouseKey) {
                    case JuiceboxEngine.Input.MouseKey.LeftMouse: 
                        return this._leftClick === JuiceboxEngine.Input.MouseKeyStatus.Released;
                    case JuiceboxEngine.Input.MouseKey.RightMouse: 
                        return this._rightClick === JuiceboxEngine.Input.MouseKeyStatus.Released;
                    case JuiceboxEngine.Input.MouseKey.MiddleMouse: 
                        return this._middleClick === JuiceboxEngine.Input.MouseKeyStatus.Released;
                    default: 
                        return false;
                }
            },
            /**
             * Update the input manager.
             *
             * @instance
             * @this JuiceboxEngine.Input.InputManager
             * @memberof JuiceboxEngine.Input.InputManager
             * @return  {void}
             */
            UpdateInput: function () {
                this.InputString = "";

                this.MouseDelta = JuiceboxEngine.Math.Vector2.op_Subtraction(this._prevMousePos.$clone(), this.MousePosition.$clone());

                for (var i = 0; i < this.OnPressKeyboard.Keys.Count; i = (i + 1) | 0) {
                    this.OnPressKeyboard.setItem(System.Linq.Enumerable.from(this.OnPressKeyboard, System.Collections.Generic.KeyValuePair$2(System.String,System.Boolean)).elementAt(i).key, false);
                }

                for (var i1 = 0; i1 < this.OnReleaseKeyboard.Keys.Count; i1 = (i1 + 1) | 0) {
                    this.OnPressKeyboard.setItem(System.Linq.Enumerable.from(this.OnReleaseKeyboard, System.Collections.Generic.KeyValuePair$2(System.String,System.Boolean)).elementAt(i1).key, false);
                }

                this.AnyKeyPressed = false;

                if (this._leftClick === JuiceboxEngine.Input.MouseKeyStatus.Pressed) {
                    this._leftClick = JuiceboxEngine.Input.MouseKeyStatus.Down;
                }
                if (this._rightClick === JuiceboxEngine.Input.MouseKeyStatus.Pressed) {
                    this._rightClick = JuiceboxEngine.Input.MouseKeyStatus.Down;
                }
                if (this._middleClick === JuiceboxEngine.Input.MouseKeyStatus.Pressed) {
                    this._middleClick = JuiceboxEngine.Input.MouseKeyStatus.Down;
                }

                if (this._leftClick === JuiceboxEngine.Input.MouseKeyStatus.Released) {
                    this._leftClick = JuiceboxEngine.Input.MouseKeyStatus.None;
                }
                if (this._rightClick === JuiceboxEngine.Input.MouseKeyStatus.Released) {
                    this._rightClick = JuiceboxEngine.Input.MouseKeyStatus.None;
                }
                if (this._middleClick === JuiceboxEngine.Input.MouseKeyStatus.Released) {
                    this._middleClick = JuiceboxEngine.Input.MouseKeyStatus.None;
                }

                this._prevMousePos = this.MousePosition.$clone();
            },
            /**
             * Check if a key is down.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Input.InputManager
             * @memberof JuiceboxEngine.Input.InputManager
             * @param   {string}     key    The key to check.
             * @return  {boolean}           False if not pressed, true if pressed.
             */
            KeyDown: function (key) {
                key = key.toLowerCase();

                if (!this.KeyBoard.containsKey(key)) {
                    return false;
                }

                return this.KeyBoard.getItem(key);
            },
            KeyDown$1: function (e) {
                var ev = e;

                this.InputString = (this.InputString || "") + (ev.key || "");

                var key = ev.key.toLowerCase();

                if (!this.KeyDown(key)) {
                    if (this.OnPressKeyboard.containsKey(key)) {
                        this.OnPressKeyboard.setItem(key, true);
                    } else {
                        this.OnPressKeyboard.add(key, true);
                    }
                }

                if (this.KeyBoard.containsKey(key)) {
                    this.KeyBoard.setItem(key, true);
                } else {
                    this.KeyBoard.add(key, true);
                }

                this.AnyKeyPressed = true;
            },
            /**
             * Check if the key is pressed in this frame.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Input.InputManager
             * @memberof JuiceboxEngine.Input.InputManager
             * @param   {string}     key    The key to check.
             * @return  {boolean}           False if not pressed this frame, true if this is the frame the key was pressed.
             */
            KeyPressed: function (key) {
                key = key.toLowerCase();

                if (!this.OnPressKeyboard.containsKey(key)) {
                    return false;
                }

                return this.OnPressKeyboard.getItem(key);
            },
            /**
             * Check if the key is released in this frame.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Input.InputManager
             * @memberof JuiceboxEngine.Input.InputManager
             * @param   {string}     key    The key to check.
             * @return  {boolean}           False if the key was not released this frame, true if the key was released this frame.
             */
            KeyReleased: function (key) {
                key = key.toLowerCase();

                if (!this.OnReleaseKeyboard.containsKey(key)) {
                    return false;
                }

                return this.OnReleaseKeyboard.getItem(key);
            },
            KeyUp: function (e) {
                var ev = e;

                var key = ev.key.toLowerCase();

                if (this.KeyBoard.containsKey(key)) {
                    this.KeyBoard.setItem(key, false);
                } else {
                    this.KeyBoard.add(key, false);
                }

                if (this.OnReleaseKeyboard.containsKey(key)) {
                    this.OnReleaseKeyboard.setItem(key, true);
                } else {
                    this.OnReleaseKeyboard.add(key, true);
                }
            },
            MouseDown: function (e) {
                var ev = e;
                if (ev.button === 0) {
                    this._leftClick = JuiceboxEngine.Input.MouseKeyStatus.Pressed;
                }
                if (ev.button === 2) {
                    this._rightClick = JuiceboxEngine.Input.MouseKeyStatus.Pressed;
                }
                if (ev.button === 1) {
                    this._middleClick = JuiceboxEngine.Input.MouseKeyStatus.Pressed;
                }

                this.InputIsTouch = false;
            },
            MouseUp: function (e) {
                var ev = e;
                if (ev.button === 0) {
                    this._leftClick = JuiceboxEngine.Input.MouseKeyStatus.Released;
                }
                if (ev.button === 2) {
                    this._rightClick = JuiceboxEngine.Input.MouseKeyStatus.Released;
                }
                if (ev.button === 1) {
                    this._middleClick = JuiceboxEngine.Input.MouseKeyStatus.Released;
                }

                this.InputIsTouch = false;
            },
            UpdateMouse: function (e) {
                var rect = this._canvas.getBoundingClientRect();
                var ev = e;

                var width = this._canvas.clientWidth;
                var height = this._canvas.clientHeight;

                var xPos = (H5.Int.clip32(ev.clientX) - H5.Int.clip32(rect.left)) | 0;
                var yPos = (H5.Int.clip32(rect.bottom) - H5.Int.clip32(ev.clientY)) | 0;
                this.MousePosition = new JuiceboxEngine.Math.Vector2.$ctor3(xPos / width, yPos / height);

                this.InputIsTouch = false;
            },
            TouchStart: function (e) {
                var rect = this._canvas.getBoundingClientRect();
                var ev = e;
                e.preventDefault();

                var width = this._canvas.clientWidth;
                var height = this._canvas.clientHeight;

                var xPos = (H5.Int.clip32(ev.touches[0].clientX) - H5.Int.clip32(rect.left)) | 0;
                var yPos = (H5.Int.clip32(rect.bottom) - H5.Int.clip32(ev.touches[0].clientY)) | 0;

                this.MousePosition = new JuiceboxEngine.Math.Vector2.$ctor3(xPos / width, yPos / height);

                if (this._leftClick === JuiceboxEngine.Input.MouseKeyStatus.None) {
                    this._prevMousePos = this.MousePosition.$clone();
                }

                this._leftClick = JuiceboxEngine.Input.MouseKeyStatus.Pressed;

                this.InputIsTouch = true;
            },
            TouchMove: function (e) {
                var rect = this._canvas.getBoundingClientRect();
                var ev = e;
                e.preventDefault();

                var width = this._canvas.clientWidth;
                var height = this._canvas.clientHeight;

                var xPos = (H5.Int.clip32(ev.touches[0].clientX) - H5.Int.clip32(rect.left)) | 0;
                var yPos = (H5.Int.clip32(rect.bottom) - H5.Int.clip32(ev.touches[0].clientY)) | 0;

                this.MousePosition = new JuiceboxEngine.Math.Vector2.$ctor3(xPos / width, yPos / height);

                if (this._leftClick === JuiceboxEngine.Input.MouseKeyStatus.None) {
                    this._prevMousePos = this.MousePosition.$clone();
                }

                this._leftClick = JuiceboxEngine.Input.MouseKeyStatus.Down;

                this.InputIsTouch = true;
            },
            TouchEnd: function (e) {
                var rect = this._canvas.getBoundingClientRect();
                var ev = e;

                e.preventDefault();

                this._leftClick = JuiceboxEngine.Input.MouseKeyStatus.Released;

                this.InputIsTouch = true;
            }
        }
    });

    /**
     * The different mouse keys.
     *
     * @public
     * @class JuiceboxEngine.Input.MouseKey
     */
    H5.define("JuiceboxEngine.Input.MouseKey", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * The left mouse button.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Input.MouseKey
                 * @constant
                 * @default 0
                 * @type JuiceboxEngine.Input.MouseKey
                 */
                LeftMouse: 0,
                /**
                 * The right mouse button.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Input.MouseKey
                 * @constant
                 * @default 1
                 * @type JuiceboxEngine.Input.MouseKey
                 */
                RightMouse: 1,
                /**
                 * The middle mouse button.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Input.MouseKey
                 * @constant
                 * @default 2
                 * @type JuiceboxEngine.Input.MouseKey
                 */
                MiddleMouse: 2
            }
        }
    });

    /**
     * All different mouse click states.
     *
     * @class JuiceboxEngine.Input.MouseKeyStatus
     */
    H5.define("JuiceboxEngine.Input.MouseKeyStatus", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * No interaction.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Input.MouseKeyStatus
                 * @constant
                 * @default 0
                 * @type JuiceboxEngine.Input.MouseKeyStatus
                 */
                None: 0,
                /**
                 * The key is pressed this frame.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Input.MouseKeyStatus
                 * @constant
                 * @default 1
                 * @type JuiceboxEngine.Input.MouseKeyStatus
                 */
                Pressed: 1,
                /**
                 * The key is pressed down.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Input.MouseKeyStatus
                 * @constant
                 * @default 2
                 * @type JuiceboxEngine.Input.MouseKeyStatus
                 */
                Down: 2,
                /**
                 * The key is released this frame.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Input.MouseKeyStatus
                 * @constant
                 * @default 3
                 * @type JuiceboxEngine.Input.MouseKeyStatus
                 */
                Released: 3
            }
        }
    });

    /**
     * Base game class.
     *
     * @public
     * @class JuiceboxEngine.JuiceboxGame
     */
    H5.define("JuiceboxEngine.JuiceboxGame", {
        fields: {
            /**
             * The default resource manager.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.JuiceboxGame
             * @function ResourceManager
             * @type JuiceboxEngine.Resources.ResourceManager
             */
            ResourceManager: null,
            AudioManager: null,
            _preloader: null,
            _graphicsManager: null,
            _inputManager: null,
            _sceneManager: null,
            /**
             * The currently active scene.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.JuiceboxGame
             * @function CurrentScene
             * @type JuiceboxEngine.Scene
             */
            CurrentScene: null
        },
        ctors: {
            /**
             * Initializes the Juicebox engine.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.JuiceboxGame
             * @memberof JuiceboxEngine.JuiceboxGame
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this._graphicsManager = new JuiceboxEngine.Graphics.GraphicsManager();

                this._inputManager = new JuiceboxEngine.Input.InputManager();

                this.AudioManager = new JuiceboxEngine.Audio.AudioManager();

                this.ResourceManager = new JuiceboxEngine.Resources.ResourceManager();
                this.RegisterLoaders(this.ResourceManager);

                this._sceneManager = new JuiceboxEngine.SceneManager(this);

                this._preloader = new JuiceboxEngine.Resources.Preloader();

                this._preloader.Preload(this.ResourceManager, System.Array.init(["Textures/ScreenFade.png", "Textures/JuiceboxIcon.png", "Shaders/Debug.vert", "Shaders/FullScreen.vert", "Shaders/Sprite.vert", "Shaders/TileMap.vert", "Shaders/Mesh.vert", "Shaders/UI.vert", "Fonts/Arial.bff"], System.String));
            }
        },
        methods: {
            /**
             * Called to start the game engine.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.JuiceboxGame
             * @memberof JuiceboxEngine.JuiceboxGame
             * @param   {JuiceboxEngine.Scene}    startScene    The scene to start with.
             * @return  {void}
             */
            Run: function (startScene) {
                if (startScene === void 0) { startScene = null; }
                this.CurrentScene = new JuiceboxEngine.SplashScene(this.ResourceManager, startScene);
                this.CurrentScene.Start();

                this.CurrentScene.SceneManager = this._sceneManager;

                this.EngineUpdate(0);
            },
            /**
             * Register default resourceloaders to the given resource manager.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.JuiceboxGame
             * @memberof JuiceboxEngine.JuiceboxGame
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager    The resource manager to register all the loaders to.
             * @return  {void}
             */
            RegisterLoaders: function (resourceManager) {
                this._graphicsManager.RegisterLoaders(resourceManager);

                resourceManager.RegisterResourceManager(new JuiceboxEngine.Audio.AudioLoader(this.AudioManager));
            },
            /**
             * Update the engine.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.JuiceboxGame
             * @memberof JuiceboxEngine.JuiceboxGame
             * @param   {number}    time
             * @return  {void}
             */
            EngineUpdate: function (time) {
                JuiceboxEngine.Util.Time.UpdateTime();

                this._graphicsManager.Update();

                this._sceneManager.Update();

                this.CurrentScene.UpdateScene();

                this.CurrentScene.RenderScene();

                JuiceboxEngine.Coroutines.CoroutineManager.Update();

                this._inputManager.UpdateInput();

                window.requestAnimationFrame(H5.fn.cacheBind(this, this.EngineUpdate));
            }
        }
    });

    /** @namespace JuiceboxEngine.Math */

    /**
     * A data structure representing a color with 4 byte components.
     *
     * @public
     * @class JuiceboxEngine.Math.Color
     * @implements  System.IEquatable$1
     */
    H5.define("JuiceboxEngine.Math.Color", {
        inherits: function () { return [System.IEquatable$1(JuiceboxEngine.Math.Color)]; },
        $kind: "struct",
        statics: {
            fields: {
                /**
                 * The color red. (#FF0000FF)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Color
                 * @type JuiceboxEngine.Math.Color
                 */
                Red: null,
                /**
                 * The color green. (#00FF00FF)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Color
                 * @type JuiceboxEngine.Math.Color
                 */
                Green: null,
                /**
                 * The color blue. (#0000FFFF)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Color
                 * @type JuiceboxEngine.Math.Color
                 */
                Blue: null,
                /**
                 * The color white. (#FFFFFFFF)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Color
                 * @type JuiceboxEngine.Math.Color
                 */
                White: null,
                /**
                 * The color black. (#000000FF)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Color
                 * @type JuiceboxEngine.Math.Color
                 */
                Black: null
            },
            ctors: {
                init: function () {
                    this.Red = new JuiceboxEngine.Math.Color();
                    this.Green = new JuiceboxEngine.Math.Color();
                    this.Blue = new JuiceboxEngine.Math.Color();
                    this.White = new JuiceboxEngine.Math.Color();
                    this.Black = new JuiceboxEngine.Math.Color();
                    this.Red = new JuiceboxEngine.Math.Color.$ctor2(255, 0, 0, 255);
                    this.Green = new JuiceboxEngine.Math.Color.$ctor2(0, 255, 0, 255);
                    this.Blue = new JuiceboxEngine.Math.Color.$ctor2(0, 0, 255, 255);
                    this.White = new JuiceboxEngine.Math.Color.$ctor2(255, 255, 255, 255);
                    this.Black = new JuiceboxEngine.Math.Color.$ctor2(0, 0, 0, 255);
                }
            },
            methods: {
                /**
                 * Linearly interpolate two colors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Color
                 * @memberof JuiceboxEngine.Math.Color
                 * @param   {JuiceboxEngine.Math.Color}    min         Start color, at gradient = 0.
                 * @param   {JuiceboxEngine.Math.Color}    max         Start color, at gradient = 1.
                 * @param   {number}                       gradient    The gradient.
                 * @return  {JuiceboxEngine.Math.Color}
                 */
                Interpolate: function (min, max, gradient) {
                    return new JuiceboxEngine.Math.Color.$ctor3(JuiceboxEngine.Math.JMath.Interpolate(min.R, max.R, gradient), JuiceboxEngine.Math.JMath.Interpolate(min.G, max.G, gradient), JuiceboxEngine.Math.JMath.Interpolate(min.B, max.B, gradient), JuiceboxEngine.Math.JMath.Interpolate(min.A, max.A, gradient));
                },
                /**
                 * Convert HSL to RGB colors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Color
                 * @memberof JuiceboxEngine.Math.Color
                 * @param   {number}                       h     Hue value.
                 * @param   {number}                       sl    Saturation value.
                 * @param   {number}                       l     luminance value.
                 * @return  {JuiceboxEngine.Math.Color}
                 */
                FromHSL: function (h, sl, l) {
                    var v;

                    var r = 1;
                    var g = 1;
                    var b = 1;

                    v = (l <= 0.5) ? (l * (1.0 + sl)) : (l + sl - l * sl);

                    if (v > 0) {
                        var m;
                        var sv;
                        var sextant;
                        var fract, vsf, mid1, mid2;
                        m = l + l - v;
                        sv = (v - m) / v;
                        h *= 6.0;
                        sextant = H5.Int.clip32(h);
                        fract = h - sextant;
                        vsf = v * sv * fract;
                        mid1 = m + vsf;
                        mid2 = v - vsf;

                        switch (sextant) {
                            case 0: 
                                r = v;
                                g = mid1;
                                b = m;
                                break;
                            case 1: 
                                r = mid2;
                                g = v;
                                b = m;
                                break;
                            case 2: 
                                r = m;
                                g = v;
                                b = mid1;
                                break;
                            case 3: 
                                r = m;
                                g = mid2;
                                b = v;
                                break;
                            case 4: 
                                r = mid1;
                                g = m;
                                b = v;
                                break;
                            case 5: 
                                r = v;
                                g = m;
                                b = mid2;
                                break;
                        }
                    }

                    return new JuiceboxEngine.Math.Color.$ctor3(r, g, b, 1.0);
                }/**
                 * Check if two colors are the same.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Color
                 * @memberof JuiceboxEngine.Math.Color
                 * @param   {JuiceboxEngine.Math.Color}    color1    First color.
                 * @param   {JuiceboxEngine.Math.Color}    color2    Second color.
                 * @return  {boolean}                                True if equal, false if not.
                 */
                ,
                op_Equality: function (color1, color2) {
                    return color1.equalsT(color2.$clone());
                }/**
                 * Check if two colors are not the same.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Color
                 * @memberof JuiceboxEngine.Math.Color
                 * @param   {JuiceboxEngine.Math.Color}    color1    First color.
                 * @param   {JuiceboxEngine.Math.Color}    color2    Second color.
                 * @return  {boolean}                                True if not equal, false if equal.
                 */
                ,
                op_Inequality: function (color1, color2) {
                    return !(color1.equalsT(color2.$clone()));
                },
                getDefaultValue: function () { return new JuiceboxEngine.Math.Color(); }
            }
        },
        fields: {
            /**
             * The red color value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Color
             * @type number
             */
            R: 0,
            /**
             * The green color value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Color
             * @type number
             */
            G: 0,
            /**
             * The blue color value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Color
             * @type number
             */
            B: 0,
            /**
             * The alpha color value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Color
             * @type number
             */
            A: 0
        },
        alias: ["equalsT", "System$IEquatable$1$JuiceboxEngine$Math$Color$equalsT"],
        ctors: {
            /**
             * Constructs a color.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Color
             * @memberof JuiceboxEngine.Math.Color
             * @param   {number}    r    Red value, ranging 0-1.
             * @param   {number}    g    Green value, ranging 0-1.
             * @param   {number}    b    Blue value, ranging 0-1.
             * @param   {number}    a    Alpha value, ranging 0-1.
             * @return  {void}
             */
            $ctor3: function (r, g, b, a) {
                this.$initialize();
                this.R = r;
                this.G = g;
                this.B = b;
                this.A = a;
            },
            /**
             * Constructs a color from int values.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Color
             * @memberof JuiceboxEngine.Math.Color
             * @param   {number}    r    R value ranging from 0 to 255.
             * @param   {number}    g    G value ranging from 0 to 255.
             * @param   {number}    b    B value ranging from 0 to 255.
             * @param   {number}    a    RA value ranging from 0 to 255.
             * @return  {void}
             */
            $ctor2: function (r, g, b, a) {
                this.$initialize();
                this.R = r / 255.0;
                this.G = g / 255.0;
                this.B = b / 255.0;
                this.A = a / 255.0;
            },
            /**
             * Constructs a color from byte values.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Color
             * @memberof JuiceboxEngine.Math.Color
             * @param   {number}    r    R value ranging from 0 to 255.
             * @param   {number}    g    G value ranging from 0 to 255.
             * @param   {number}    b    B value ranging from 0 to 255.
             * @param   {number}    a    RA value ranging from 0 to 255.
             * @return  {void}
             */
            $ctor1: function (r, g, b, a) {
                this.$initialize();
                this.R = r / 255.0;
                this.G = g / 255.0;
                this.B = b / 255.0;
                this.A = a / 255.0;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Check if a object is equal to Color.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Color
             * @memberof JuiceboxEngine.Math.Color
             * @param   {System.Object}    obj    The object to check.
             * @return  {boolean}                 True if equal, false if not.
             */
            equals: function (obj) {
                return H5.is(obj, JuiceboxEngine.Math.Color) && this.equalsT(H5.cast(obj, JuiceboxEngine.Math.Color));
            },
            /**
             * Check if two colors are equal.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Color
             * @memberof JuiceboxEngine.Math.Color
             * @param   {JuiceboxEngine.Math.Color}    other    The color to check.
             * @return  {boolean}                               True if equal, false if not.
             */
            equalsT: function (other) {
                return this.R === other.R && this.G === other.G && this.B === other.B && this.A === other.A;
            },
            /**
             * Returns a hash for this object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Color
             * @memberof JuiceboxEngine.Math.Color
             * @return  {number}        A hash for this object.
             */
            getHashCode: function () {
                var hashCode = 1960784236;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + System.Single.getHashCode(this.R)) | 0;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + System.Single.getHashCode(this.G)) | 0;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + System.Single.getHashCode(this.B)) | 0;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + System.Single.getHashCode(this.A)) | 0;
                return hashCode;
            },
            /**
             * Create a string representing the Color struct.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Color
             * @memberof JuiceboxEngine.Math.Color
             * @return  {string}        A string representing the Color struct.
             */
            toString: function () {
                return System.String.format("Color({0}, {1}, {2}, {3})", this.R, this.G, this.B, this.A);
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Math.Color();
                s.R = this.R;
                s.G = this.G;
                s.B = this.B;
                s.A = this.A;
                return s;
            }
        }
    });

    /**
     * Class with easing functions.
     Source from: https://github.com/acron0/Easings/blob/master/Easings.cs, slightly modified version.
     Based on Robert Penner's easing functions.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Math.Easings
     */
    H5.define("JuiceboxEngine.Math.Easings", {
        statics: {
            fields: {
                /**
                 * Constant Pi.
                 *
                 * @static
                 * @private
                 * @memberof JuiceboxEngine.Math.Easings
                 * @constant
                 * @default 3.1415927
                 * @type number
                 */
                PI: 0,
                /**
                 * Constant Pi / 2.
                 *
                 * @static
                 * @private
                 * @memberof JuiceboxEngine.Math.Easings
                 * @constant
                 * @default 1.5707964
                 * @type number
                 */
                HALFPI: 0
            },
            ctors: {
                init: function () {
                    this.PI = 3.1415927;
                    this.HALFPI = 1.5707964;
                }
            },
            methods: {
                /**
                 * Interpolate using the specified function.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p           
                 * @param   {number}    function
                 * @return  {number}
                 */
                Interpolate: function (p, $function) {
                    switch ($function) {
                        default: 
                        case JuiceboxEngine.Math.Easings.Functions.Linear: 
                            return JuiceboxEngine.Math.Easings.Linear(p);
                        case JuiceboxEngine.Math.Easings.Functions.QuadraticEaseOut: 
                            return JuiceboxEngine.Math.Easings.QuadraticEaseOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.QuadraticEaseIn: 
                            return JuiceboxEngine.Math.Easings.QuadraticEaseIn(p);
                        case JuiceboxEngine.Math.Easings.Functions.QuadraticEaseInOut: 
                            return JuiceboxEngine.Math.Easings.QuadraticEaseInOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.CubicEaseIn: 
                            return JuiceboxEngine.Math.Easings.CubicEaseIn(p);
                        case JuiceboxEngine.Math.Easings.Functions.CubicEaseOut: 
                            return JuiceboxEngine.Math.Easings.CubicEaseOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.CubicEaseInOut: 
                            return JuiceboxEngine.Math.Easings.CubicEaseInOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.QuarticEaseIn: 
                            return JuiceboxEngine.Math.Easings.QuarticEaseIn(p);
                        case JuiceboxEngine.Math.Easings.Functions.QuarticEaseOut: 
                            return JuiceboxEngine.Math.Easings.QuarticEaseOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.QuarticEaseInOut: 
                            return JuiceboxEngine.Math.Easings.QuarticEaseInOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.QuinticEaseIn: 
                            return JuiceboxEngine.Math.Easings.QuinticEaseIn(p);
                        case JuiceboxEngine.Math.Easings.Functions.QuinticEaseOut: 
                            return JuiceboxEngine.Math.Easings.QuinticEaseOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.QuinticEaseInOut: 
                            return JuiceboxEngine.Math.Easings.QuinticEaseInOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.SineEaseIn: 
                            return JuiceboxEngine.Math.Easings.SineEaseIn(p);
                        case JuiceboxEngine.Math.Easings.Functions.SineEaseOut: 
                            return JuiceboxEngine.Math.Easings.SineEaseOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.SineEaseInOut: 
                            return JuiceboxEngine.Math.Easings.SineEaseInOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.CircularEaseIn: 
                            return JuiceboxEngine.Math.Easings.CircularEaseIn(p);
                        case JuiceboxEngine.Math.Easings.Functions.CircularEaseOut: 
                            return JuiceboxEngine.Math.Easings.CircularEaseOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.CircularEaseInOut: 
                            return JuiceboxEngine.Math.Easings.CircularEaseInOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.ExponentialEaseIn: 
                            return JuiceboxEngine.Math.Easings.ExponentialEaseIn(p);
                        case JuiceboxEngine.Math.Easings.Functions.ExponentialEaseOut: 
                            return JuiceboxEngine.Math.Easings.ExponentialEaseOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.ExponentialEaseInOut: 
                            return JuiceboxEngine.Math.Easings.ExponentialEaseInOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.ElasticEaseIn: 
                            return JuiceboxEngine.Math.Easings.ElasticEaseIn(p);
                        case JuiceboxEngine.Math.Easings.Functions.ElasticEaseOut: 
                            return JuiceboxEngine.Math.Easings.ElasticEaseOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.ElasticEaseInOut: 
                            return JuiceboxEngine.Math.Easings.ElasticEaseInOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.BackEaseIn: 
                            return JuiceboxEngine.Math.Easings.BackEaseIn(p);
                        case JuiceboxEngine.Math.Easings.Functions.BackEaseOut: 
                            return JuiceboxEngine.Math.Easings.BackEaseOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.BackEaseInOut: 
                            return JuiceboxEngine.Math.Easings.BackEaseInOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.BounceEaseIn: 
                            return JuiceboxEngine.Math.Easings.BounceEaseIn(p);
                        case JuiceboxEngine.Math.Easings.Functions.BounceEaseOut: 
                            return JuiceboxEngine.Math.Easings.BounceEaseOut(p);
                        case JuiceboxEngine.Math.Easings.Functions.BounceEaseInOut: 
                            return JuiceboxEngine.Math.Easings.BounceEaseInOut(p);
                    }
                },
                /**
                 * Modeled after the line y = x
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                Linear: function (p) {
                    return p;
                },
                /**
                 * Modeled after the parabola y = x^2
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                QuadraticEaseIn: function (p) {
                    return p * p;
                },
                /**
                 * Modeled after the parabola y = -x^2 + 2x
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                QuadraticEaseOut: function (p) {
                    return -(p * (p - 2));
                },
                /**
                 * Modeled after the piecewise quadratic
                 y = (1/2)((2x)^2)             ; [0, 0.5)
                 y = -(1/2)((2x-1)*(2x-3) - 1) ; [0.5, 1]
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                QuadraticEaseInOut: function (p) {
                    if (p < 0.5) {
                        return 2 * p * p;
                    } else {
                        return (-2 * p * p) + (4 * p) - 1;
                    }
                },
                /**
                 * Modeled after the cubic y = x^3
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                CubicEaseIn: function (p) {
                    return p * p * p;
                },
                /**
                 * Modeled after the cubic y = (x - 1)^3 + 1
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                CubicEaseOut: function (p) {
                    var f = (p - 1);
                    return f * f * f + 1;
                },
                /**
                 * Modeled after the piecewise cubic
                 y = (1/2)((2x)^3)       ; [0, 0.5)
                 y = (1/2)((2x-2)^3 + 2) ; [0.5, 1]
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                CubicEaseInOut: function (p) {
                    if (p < 0.5) {
                        return 4 * p * p * p;
                    } else {
                        var f = ((2 * p) - 2);
                        return 0.5 * f * f * f + 1;
                    }
                },
                /**
                 * Modeled after the quartic x^4
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                QuarticEaseIn: function (p) {
                    return p * p * p * p;
                },
                /**
                 * Modeled after the quartic y = 1 - (x - 1)^4
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                QuarticEaseOut: function (p) {
                    var f = (p - 1);
                    return f * f * f * (1 - p) + 1;
                },
                /**
                 * Modeled after the piecewise quartic
                 y = (1/2)((2x)^4)        ; [0, 0.5)
                 y = -(1/2)((2x-2)^4 - 2) ; [0.5, 1]
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                QuarticEaseInOut: function (p) {
                    if (p < 0.5) {
                        return 8 * p * p * p * p;
                    } else {
                        var f = (p - 1);
                        return -8 * f * f * f * f + 1;
                    }
                },
                /**
                 * Modeled after the quintic y = x^5
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                QuinticEaseIn: function (p) {
                    return p * p * p * p * p;
                },
                /**
                 * Modeled after the quintic y = (x - 1)^5 + 1
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                QuinticEaseOut: function (p) {
                    var f = (p - 1);
                    return f * f * f * f * f + 1;
                },
                /**
                 * Modeled after the piecewise quintic
                 y = (1/2)((2x)^5)       ; [0, 0.5)
                 y = (1/2)((2x-2)^5 + 2) ; [0.5, 1]
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                QuinticEaseInOut: function (p) {
                    if (p < 0.5) {
                        return 16 * p * p * p * p * p;
                    } else {
                        var f = ((2 * p) - 2);
                        return 0.5 * f * f * f * f * f + 1;
                    }
                },
                /**
                 * Modeled after quarter-cycle of sine wave
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                SineEaseIn: function (p) {
                    return JuiceboxEngine.Math.JMath.Sin((p - 1) * JuiceboxEngine.Math.Easings.HALFPI) + 1;
                },
                /**
                 * Modeled after quarter-cycle of sine wave (different phase)
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                SineEaseOut: function (p) {
                    return JuiceboxEngine.Math.JMath.Sin(p * JuiceboxEngine.Math.Easings.HALFPI);
                },
                /**
                 * Modeled after half sine wave
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                SineEaseInOut: function (p) {
                    return 0.5 * (1 - JuiceboxEngine.Math.JMath.Cos(p * JuiceboxEngine.Math.Easings.PI));
                },
                /**
                 * Modeled after shifted quadrant IV of unit circle
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                CircularEaseIn: function (p) {
                    return 1 - JuiceboxEngine.Math.JMath.Sqrt(1 - (p * p));
                },
                /**
                 * Modeled after shifted quadrant II of unit circle
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                CircularEaseOut: function (p) {
                    return JuiceboxEngine.Math.JMath.Sqrt((2 - p) * p);
                },
                /**
                 * Modeled after the piecewise circular function
                 y = (1/2)(1 - Math.Sqrt(1 - 4x^2))           ; [0, 0.5)
                 y = (1/2)(Math.Sqrt(-(2x - 3)*(2x - 1)) + 1) ; [0.5, 1]
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                CircularEaseInOut: function (p) {
                    if (p < 0.5) {
                        return 0.5 * (1 - JuiceboxEngine.Math.JMath.Sqrt(1 - 4 * (p * p)));
                    } else {
                        return 0.5 * (JuiceboxEngine.Math.JMath.Sqrt(-((2 * p) - 3) * ((2 * p) - 1)) + 1);
                    }
                },
                /**
                 * Modeled after the exponential function y = 2^(10(x - 1))
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                ExponentialEaseIn: function (p) {
                    return (p === 0.0) ? p : JuiceboxEngine.Math.JMath.Pow(2, 10 * (p - 1));
                },
                /**
                 * Modeled after the exponential function y = -2^(-10x) + 1
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                ExponentialEaseOut: function (p) {
                    return (p === 1.0) ? p : 1 - JuiceboxEngine.Math.JMath.Pow(2, -10 * p);
                },
                /**
                 * Modeled after the piecewise exponential
                 y = (1/2)2^(10(2x - 1))         ; [0,0.5)
                 y = -(1/2)*2^(-10(2x - 1))) + 1 ; [0.5,1]
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                ExponentialEaseInOut: function (p) {
                    if (p === 0.0 || p === 1.0) {
                        return p;
                    }

                    if (p < 0.5) {
                        return 0.5 * JuiceboxEngine.Math.JMath.Pow(2, (20 * p) - 10);
                    } else {
                        return -0.5 * JuiceboxEngine.Math.JMath.Pow(2, (-20 * p) + 10) + 1;
                    }
                },
                /**
                 * Modeled after the damped sine wave y = sin(13pi/2*x)*Math.Pow(2, 10 * (x - 1))
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                ElasticEaseIn: function (p) {
                    return JuiceboxEngine.Math.JMath.Sin(20.420353 * p) * JuiceboxEngine.Math.JMath.Pow(2, 10 * (p - 1));
                },
                /**
                 * Modeled after the damped sine wave y = sin(-13pi/2*(x + 1))*Math.Pow(2, -10x) + 1
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                ElasticEaseOut: function (p) {
                    return JuiceboxEngine.Math.JMath.Sin(-20.420353 * (p + 1)) * JuiceboxEngine.Math.JMath.Pow(2, -10 * p) + 1;
                },
                /**
                 * Modeled after the piecewise exponentially-damped sine wave
                 y = (1/2)*sin(13pi/2*(2*x))*Math.Pow(2, 10 * ((2*x) - 1))      ; [0,0.5)
                 y = (1/2)*(sin(-13pi/2*((2x-1)+1))*Math.Pow(2,-10(2*x-1)) + 2) ; [0.5, 1]
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                ElasticEaseInOut: function (p) {
                    if (p < 0.5) {
                        return 0.5 * JuiceboxEngine.Math.JMath.Sin(20.420353 * (2 * p)) * JuiceboxEngine.Math.JMath.Pow(2, 10 * ((2 * p) - 1));
                    } else {
                        return 0.5 * (JuiceboxEngine.Math.JMath.Sin(-20.420353 * ((2 * p - 1) + 1)) * JuiceboxEngine.Math.JMath.Pow(2, -10 * (2 * p - 1)) + 2);
                    }
                },
                /**
                 * Modeled after the overshooting cubic y = x^3-x*sin(x*pi)
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                BackEaseIn: function (p) {
                    return p * p * p - p * JuiceboxEngine.Math.JMath.Sin(p * JuiceboxEngine.Math.Easings.PI);
                },
                /**
                 * Modeled after overshooting cubic y = 1-((1-x)^3-(1-x)*sin((1-x)*pi))
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                BackEaseOut: function (p) {
                    var f = (1 - p);
                    return 1 - (f * f * f - f * JuiceboxEngine.Math.JMath.Sin(f * JuiceboxEngine.Math.Easings.PI));
                },
                /**
                 * Modeled after the piecewise overshooting cubic function
                 y = (1/2)*((2x)^3-(2x)*sin(2*x*pi))           ; [0, 0.5)
                 y = (1/2)*(1-((1-x)^3-(1-x)*sin((1-x)*pi))+1) ; [0.5, 1]
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                BackEaseInOut: function (p) {
                    if (p < 0.5) {
                        var f = 2 * p;
                        return 0.5 * (f * f * f - f * JuiceboxEngine.Math.JMath.Sin(f * JuiceboxEngine.Math.Easings.PI));
                    } else {
                        var f1 = (1 - (2 * p - 1));
                        return 0.5 * (1 - (f1 * f1 * f1 - f1 * JuiceboxEngine.Math.JMath.Sin(f1 * JuiceboxEngine.Math.Easings.PI))) + 0.5;
                    }
                },
                /**
                 * Bounce in
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                BounceEaseIn: function (p) {
                    return 1 - JuiceboxEngine.Math.Easings.BounceEaseOut(1 - p);
                },
                /**
                 * Bounce out
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                BounceEaseOut: function (p) {
                    if (p < 0.36363637) {
                        return (121 * p * p) / 16.0;
                    } else if (p < 0.72727275) {
                        return (9.075 * p * p) - (9.9 * p) + 3.4;
                    } else if (p < 0.9) {
                        return (12.066482 * p * p) - (19.635458 * p) + 8.898061;
                    } else {
                        return (10.8 * p * p) - (20.52 * p) + 10.72;
                    }
                },
                /**
                 * Bounce in out
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Easings
                 * @memberof JuiceboxEngine.Math.Easings
                 * @param   {number}    p
                 * @return  {number}
                 */
                BounceEaseInOut: function (p) {
                    if (p < 0.5) {
                        return 0.5 * JuiceboxEngine.Math.Easings.BounceEaseIn(p * 2);
                    } else {
                        return 0.5 * JuiceboxEngine.Math.Easings.BounceEaseOut(p * 2 - 1) + 0.5;
                    }
                }
            }
        }
    });

    /**
     * Easing Functions enumeration
     *
     * @public
     * @class number
     */
    H5.define("JuiceboxEngine.Math.Easings.Functions", {
        $kind: "nested enum",
        statics: {
            fields: {
                /**
                 * Modeled after the line y = x
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 0
                 * @type number
                 */
                Linear: 0,
                /**
                 * Modeled after the parabola y = x^2
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 1
                 * @type number
                 */
                QuadraticEaseIn: 1,
                /**
                 * Modeled after the parabola y = -x^2 + 2x
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 2
                 * @type number
                 */
                QuadraticEaseOut: 2,
                /**
                 * Modeled after the piecewise quadratic
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 3
                 * @type number
                 */
                QuadraticEaseInOut: 3,
                /**
                 * Modeled after the cubic y = x^3
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 4
                 * @type number
                 */
                CubicEaseIn: 4,
                /**
                 * Modeled after the cubic y = (x - 1)^3 + 1
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 5
                 * @type number
                 */
                CubicEaseOut: 5,
                /**
                 * Modeled after the piecewise cubic
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 6
                 * @type number
                 */
                CubicEaseInOut: 6,
                /**
                 * Modeled after the quartic x^4
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 7
                 * @type number
                 */
                QuarticEaseIn: 7,
                /**
                 * Modeled after the quartic y = 1 - (x - 1)^4
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 8
                 * @type number
                 */
                QuarticEaseOut: 8,
                /**
                 * Modeled after the piecewise quartic
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 9
                 * @type number
                 */
                QuarticEaseInOut: 9,
                /**
                 * Modeled after the quintic y = x^5
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 10
                 * @type number
                 */
                QuinticEaseIn: 10,
                /**
                 * Modeled after the quintic y = (x - 1)^5 + 1
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 11
                 * @type number
                 */
                QuinticEaseOut: 11,
                /**
                 * Modeled after the piecewise quintic
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 12
                 * @type number
                 */
                QuinticEaseInOut: 12,
                /**
                 * Modeled after quarter-cycle of sine wave
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 13
                 * @type number
                 */
                SineEaseIn: 13,
                /**
                 * Modeled after quarter-cycle of sine wave (different phase)
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 14
                 * @type number
                 */
                SineEaseOut: 14,
                /**
                 * Modeled after half sine wave
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 15
                 * @type number
                 */
                SineEaseInOut: 15,
                /**
                 * Modeled after shifted quadrant IV of unit circle
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 16
                 * @type number
                 */
                CircularEaseIn: 16,
                /**
                 * Modeled after shifted quadrant II of unit circle
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 17
                 * @type number
                 */
                CircularEaseOut: 17,
                /**
                 * Modeled after the piecewise circular function
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 18
                 * @type number
                 */
                CircularEaseInOut: 18,
                /**
                 * Modeled after the exponential function y = 2^(10(x - 1))
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 19
                 * @type number
                 */
                ExponentialEaseIn: 19,
                /**
                 * Modeled after the exponential function y = -2^(-10x) + 1
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 20
                 * @type number
                 */
                ExponentialEaseOut: 20,
                /**
                 * Modeled after the piecewise exponential
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 21
                 * @type number
                 */
                ExponentialEaseInOut: 21,
                /**
                 * Modeled after the damped sine wave y = sin(13pi/2*x)*Math.Pow(2, 10 * (x - 1))
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 22
                 * @type number
                 */
                ElasticEaseIn: 22,
                /**
                 * Modeled after the damped sine wave y = sin(-13pi/2*(x + 1))*Math.Pow(2, -10x) + 1
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 23
                 * @type number
                 */
                ElasticEaseOut: 23,
                /**
                 * Modeled after the piecewise exponentially-damped sine wave
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 24
                 * @type number
                 */
                ElasticEaseInOut: 24,
                /**
                 * Modeled after the overshooting cubic y = x^3-x*sin(x*pi)
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 25
                 * @type number
                 */
                BackEaseIn: 25,
                /**
                 * Modeled after overshooting cubic y = 1-((1-x)^3-(1-x)*sin((1-x)*pi))
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 26
                 * @type number
                 */
                BackEaseOut: 26,
                /**
                 * Modeled after the piecewise overshooting cubic function
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 27
                 * @type number
                 */
                BackEaseInOut: 27,
                /**
                 * Bounce in
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 28
                 * @type number
                 */
                BounceEaseIn: 28,
                /**
                 * Bounce out
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 29
                 * @type number
                 */
                BounceEaseOut: 29,
                /**
                 * Bounce in out
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 30
                 * @type number
                 */
                BounceEaseInOut: 30
            }
        }
    });

    /**
     * Juicebox math class. Containing lots of basic functions and constants.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Math.JMath
     */
    H5.define("JuiceboxEngine.Math.JMath", {
        statics: {
            fields: {
                /**
                 * Value of pi.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Math.JMath
                 * @constant
                 * @default 3.1415927
                 * @type number
                 */
                PI: 0,
                /**
                 * Value of (pi / 2).
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Math.JMath
                 * @constant
                 * @default 1.5707964
                 * @type number
                 */
                PI_OVER_TWO: 0,
                /**
                 * Value of (pi / 4).
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Math.JMath
                 * @constant
                 * @default 0.7853982
                 * @type number
                 */
                PI_OVER_FOUR: 0,
                /**
                 * Value of (2 * pi).
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Math.JMath
                 * @constant
                 * @default 6.2831855
                 * @type number
                 */
                TWO_PI: 0
            },
            ctors: {
                init: function () {
                    this.PI = 3.1415927;
                    this.PI_OVER_TWO = 1.5707964;
                    this.PI_OVER_FOUR = 0.7853982;
                    this.TWO_PI = 6.2831855;
                }
            },
            methods: {
                /**
                 * Calculates the square root of a number.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    The value to get the square root from.
                 * @return  {number}             The square root of a given number.
                 */
                Sqrt: function (value) {
                    return Math.sqrt(value);
                },
                /**
                 * Calculates b to the power p. (b^p)
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    b    The base.
                 * @param   {number}    p    The power.
                 * @return  {number}
                 */
                Pow: function (b, p) {
                    return Math.pow(b, p);
                },
                /**
                 * Sin function.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    Value for the sin function.
                 * @return  {number}             A value from the sin function.
                 */
                Sin: function (value) {
                    return Math.sin(value);
                },
                /**
                 * Cos function.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    Value for the cos function.
                 * @return  {number}             A value from the cos function.
                 */
                Cos: function (value) {
                    return Math.cos(value);
                },
                /**
                 * Tan function.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    Value for the tan function.
                 * @return  {number}             A value from the tan function.
                 */
                Tan: function (value) {
                    return Math.tan(value);
                },
                /**
                 * Inverse cosine
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    The value for the acos function.
                 * @return  {number}             A value from the acos function.
                 */
                ACos: function (value) {
                    return Math.acos(value);
                },
                /**
                 * Inverse tan.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    Value for the atan function.
                 * @return  {number}             A value from the atan function.
                 */
                ATan: function (value) {
                    return Math.atan(value);
                },
                /**
                 * Inverse tan.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    x    Value for the atan2 function.
                 * @param   {number}    y    Value for the atan2 function.
                 * @return  {number}         A value from the atan2 function.
                 */
                ATan2: function (x, y) {
                    return Math.atan2(x, y);
                },
                /**
                 * Returns the absolute value.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    The value.
                 * @return  {number}             The absolute value of the given value.
                 */
                Abs: function (value) {
                    if (value < 0.0) {
                        value = -value;
                    }
                    return value;
                },
                /**
                 * Round the given value to the nearest integer.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    The value to round.
                 * @return  {number}             The rounded value closest to the given value.
                 */
                Round: function (value) {
                    return H5.Math.round(value, 0, 6);
                },
                /**
                 * Round the given value up to the nearest integer.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    The value to round.
                 * @return  {number}             The ceiling value closest to the given value.
                 */
                Ceiling: function (value) {
                    return Math.ceil(value);
                },
                /**
                 * Round the given value down to the nearest integer.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    The value to round.
                 * @return  {number}             The floored value closest to the given value.
                 */
                Floor: function (value) {
                    return Math.floor(value);
                },
                /**
                 * Ping pong a value between 0 and length
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    t         The time.
                 * @param   {number}    length    Max length of the ping pong.
                 * @return  {number}              A value always ping-ponging between 0 and length.
                 */
                PingPong: function (t, length) {
                    var l = 2 * length;
                    var T = t % l;

                    if (0 <= T && T < length) {
                        return T;
                    } else {
                        return l - T;
                    }
                },
                /**
                 * Clamp a value between two values.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    The value to clamp.
                 * @param   {number}    min      The minimal return value.
                 * @param   {number}    max      The maximum return value.
                 * @return  {number}             Clamped value between min-max.
                 */
                Clamp$1: function (value, min, max) {
                    return Math.max(min, Math.min(value, max));
                },
                /**
                 * Clamp a value between two values.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    The value to clamp.
                 * @param   {number}    min      The minimal return value.
                 * @param   {number}    max      The maximum return value.
                 * @return  {number}             Clamped value between min-max.
                 */
                Clamp: function (value, min, max) {
                    return Math.max(min, Math.min(value, max));
                },
                /**
                 * Interpolate a value.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    min         Minimal value.
                 * @param   {number}    max         Maximum value.
                 * @param   {number}    gradient    The gradient, is a percentage between min and max.
                 0.0f is equal to min,
                 1.0f is equal to max,
                 0.5f is in the center of min and max.
                 * @return  {number}                Interpolated value between min-max.
                 */
                Interpolate: function (min, max, gradient) {
                    return min + (max - min) * JuiceboxEngine.Math.JMath.Clamp$1(gradient, 0.0, 1.0);
                },
                /**
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    min         Minimal value.
                 * @param   {number}    max         Maximum value.
                 * @param   {number}    gradient    The gradient, a percentage between min and max.
                 * @return  {number}                Interpolated angle between min and max.
                 */
                AngleInterpolate: function (min, max, gradient) {
                    var maximum = 6.2831855;
                    var da = (max - min) % maximum;
                    var sad = 2 * da % maximum - da;
                    return min + sad * gradient;
                },
                /**
                 * Wraps a value around some significant range.
                 Similar to modulo, but works in a unary direction over any range (including negative values).
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    value    value to wrap
                 * @param   {number}    max      max in range
                 * @param   {number}    min      min in range
                 * @return  {number}             A value wrapped around min to max
                 */
                Wrap: function (value, max, min) {
                    if (min === void 0) { min = 0.0; }
                    value -= min;
                    max -= min;
                    if (max === 0) {
                        return min;
                    }

                    value = value % max;
                    value += min;
                    while (value < min) {
                        value += max;
                    }

                    return value;
                },
                /**
                 * Get the bigger value of the two given values.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    x    First value.
                 * @param   {number}    y    Second value.
                 * @return  {number}         The biggest value.
                 */
                Max: function (x, y) {
                    return x > y ? x : y;
                },
                /**
                 * Get the bigger value of the two given values.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    x    First value.
                 * @param   {number}    y    Second value.
                 * @return  {number}         The biggest value.
                 */
                Max$1: function (x, y) {
                    return x > y ? x : y;
                },
                /**
                 * Get the smaller value of the two given values.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    x    First value.
                 * @param   {number}    y    Second value.
                 * @return  {number}         The smallest value.
                 */
                Min: function (x, y) {
                    return x < y ? x : y;
                },
                /**
                 * Get the smaller value of the two given values.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    x    First value.
                 * @param   {number}    y    Second value.
                 * @return  {number}         The smallest value.
                 */
                Min$1: function (x, y) {
                    return x < y ? x : y;
                },
                /**
                 * Get the log of a given number.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.JMath
                 * @memberof JuiceboxEngine.Math.JMath
                 * @param   {number}    x    The number to get the log of.
                 * @return  {number}         Log(x)
                 */
                Log: function (x) {
                    return H5.Math.log(x);
                }
            }
        }
    });

    /**
     * Matrix class representing a 4x4 matrix. Mostly from MonoGame.
     *
     * @public
     * @class JuiceboxEngine.Math.Matrix4
     */
    H5.define("JuiceboxEngine.Math.Matrix4", {
        $kind: "struct",
        statics: {
            fields: {
                /**
                 * An Identity matrix.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @type JuiceboxEngine.Math.Matrix4
                 */
                Identity: null
            },
            ctors: {
                init: function () {
                    this.Identity = new JuiceboxEngine.Math.Matrix4();
                    this.Identity = new JuiceboxEngine.Math.Matrix4.$ctor2(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
                }
            },
            methods: {
                /**
                 * Transpose the given matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {JuiceboxEngine.Math.Matrix4}    matrix    The matrix to transpose.
                 * @return  {JuiceboxEngine.Math.Matrix4}              A matrix tranposed to the given matrix.
                 */
                Transpose: function (matrix) {
                    var mat = new JuiceboxEngine.Math.Matrix4.ctor();

                    mat.M11 = matrix.M11;
                    mat.M12 = matrix.M21;
                    mat.M13 = matrix.M31;
                    mat.M14 = matrix.M41;

                    mat.M21 = matrix.M12;
                    mat.M22 = matrix.M22;
                    mat.M23 = matrix.M32;
                    mat.M24 = matrix.M42;

                    mat.M31 = matrix.M13;
                    mat.M32 = matrix.M23;
                    mat.M33 = matrix.M33;
                    mat.M34 = matrix.M43;

                    mat.M41 = matrix.M14;
                    mat.M42 = matrix.M24;
                    mat.M43 = matrix.M34;
                    mat.M44 = matrix.M44;

                    return mat.$clone();
                },
                /**
                 * Add to matrixes to each other.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {JuiceboxEngine.Math.Matrix4}    matrix1    The first matrix.
                 * @param   {JuiceboxEngine.Math.Matrix4}    matrix2    The second matrix.
                 * @return  {JuiceboxEngine.Math.Matrix4}               A matrix containing the sum of the given matrixes.
                 */
                Add: function (matrix1, matrix2) {
                    matrix1.M11 += matrix2.M11;
                    matrix1.M12 += matrix2.M12;
                    matrix1.M13 += matrix2.M13;
                    matrix1.M14 += matrix2.M14;
                    matrix1.M21 += matrix2.M21;
                    matrix1.M22 += matrix2.M22;
                    matrix1.M23 += matrix2.M23;
                    matrix1.M24 += matrix2.M24;
                    matrix1.M31 += matrix2.M31;
                    matrix1.M32 += matrix2.M32;
                    matrix1.M33 += matrix2.M33;
                    matrix1.M34 += matrix2.M34;
                    matrix1.M41 += matrix2.M41;
                    matrix1.M42 += matrix2.M42;
                    matrix1.M43 += matrix2.M43;
                    matrix1.M44 += matrix2.M44;
                    return matrix1.$clone();
                },
                /**
                 * Multiply two matrices.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {JuiceboxEngine.Math.Matrix4}    matrix1    The first matrix, on the right side of the operation.
                 * @param   {JuiceboxEngine.Math.Matrix4}    matrix2    The second matrix, on the left side of the operation.
                 * @return  {JuiceboxEngine.Math.Matrix4}
                 */
                Multiply: function (matrix1, matrix2) {
                    var m11 = (((matrix1.M11 * matrix2.M11) + (matrix1.M12 * matrix2.M21)) + (matrix1.M13 * matrix2.M31)) + (matrix1.M14 * matrix2.M41);
                    var m12 = (((matrix1.M11 * matrix2.M12) + (matrix1.M12 * matrix2.M22)) + (matrix1.M13 * matrix2.M32)) + (matrix1.M14 * matrix2.M42);
                    var m13 = (((matrix1.M11 * matrix2.M13) + (matrix1.M12 * matrix2.M23)) + (matrix1.M13 * matrix2.M33)) + (matrix1.M14 * matrix2.M43);
                    var m14 = (((matrix1.M11 * matrix2.M14) + (matrix1.M12 * matrix2.M24)) + (matrix1.M13 * matrix2.M34)) + (matrix1.M14 * matrix2.M44);
                    var m21 = (((matrix1.M21 * matrix2.M11) + (matrix1.M22 * matrix2.M21)) + (matrix1.M23 * matrix2.M31)) + (matrix1.M24 * matrix2.M41);
                    var m22 = (((matrix1.M21 * matrix2.M12) + (matrix1.M22 * matrix2.M22)) + (matrix1.M23 * matrix2.M32)) + (matrix1.M24 * matrix2.M42);
                    var m23 = (((matrix1.M21 * matrix2.M13) + (matrix1.M22 * matrix2.M23)) + (matrix1.M23 * matrix2.M33)) + (matrix1.M24 * matrix2.M43);
                    var m24 = (((matrix1.M21 * matrix2.M14) + (matrix1.M22 * matrix2.M24)) + (matrix1.M23 * matrix2.M34)) + (matrix1.M24 * matrix2.M44);
                    var m31 = (((matrix1.M31 * matrix2.M11) + (matrix1.M32 * matrix2.M21)) + (matrix1.M33 * matrix2.M31)) + (matrix1.M34 * matrix2.M41);
                    var m32 = (((matrix1.M31 * matrix2.M12) + (matrix1.M32 * matrix2.M22)) + (matrix1.M33 * matrix2.M32)) + (matrix1.M34 * matrix2.M42);
                    var m33 = (((matrix1.M31 * matrix2.M13) + (matrix1.M32 * matrix2.M23)) + (matrix1.M33 * matrix2.M33)) + (matrix1.M34 * matrix2.M43);
                    var m34 = (((matrix1.M31 * matrix2.M14) + (matrix1.M32 * matrix2.M24)) + (matrix1.M33 * matrix2.M34)) + (matrix1.M34 * matrix2.M44);
                    var m41 = (((matrix1.M41 * matrix2.M11) + (matrix1.M42 * matrix2.M21)) + (matrix1.M43 * matrix2.M31)) + (matrix1.M44 * matrix2.M41);
                    var m42 = (((matrix1.M41 * matrix2.M12) + (matrix1.M42 * matrix2.M22)) + (matrix1.M43 * matrix2.M32)) + (matrix1.M44 * matrix2.M42);
                    var m43 = (((matrix1.M41 * matrix2.M13) + (matrix1.M42 * matrix2.M23)) + (matrix1.M43 * matrix2.M33)) + (matrix1.M44 * matrix2.M43);
                    var m44 = (((matrix1.M41 * matrix2.M14) + (matrix1.M42 * matrix2.M24)) + (matrix1.M43 * matrix2.M34)) + (matrix1.M44 * matrix2.M44);
                    matrix1.M11 = m11;
                    matrix1.M12 = m12;
                    matrix1.M13 = m13;
                    matrix1.M14 = m14;
                    matrix1.M21 = m21;
                    matrix1.M22 = m22;
                    matrix1.M23 = m23;
                    matrix1.M24 = m24;
                    matrix1.M31 = m31;
                    matrix1.M32 = m32;
                    matrix1.M33 = m33;
                    matrix1.M34 = m34;
                    matrix1.M41 = m41;
                    matrix1.M42 = m42;
                    matrix1.M43 = m43;
                    matrix1.M44 = m44;
                    return matrix1.$clone();
                },
                /**
                 * Create a matrix which contains the rotation moment around a given axis.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {JuiceboxEngine.Math.Vector3}    axis     The axis of rotation.
                 * @param   {number}                         angle    The angle of rotation.
                 * @return  {JuiceboxEngine.Math.Matrix4}             The rotaion matrix.
                 */
                CreateFromAxisAngle: function (axis, angle) {
                    var result = new JuiceboxEngine.Math.Matrix4();

                    var x = axis.X;
                    var y = axis.Y;
                    var z = axis.Z;
                    var num2 = JuiceboxEngine.Math.JMath.Sin(angle);
                    var num = JuiceboxEngine.Math.JMath.Cos(angle);
                    var num11 = x * x;
                    var num10 = y * y;
                    var num9 = z * z;
                    var num8 = x * y;
                    var num7 = x * z;
                    var num6 = y * z;

                    result.M11 = num11 + (num * (1.0 - num11));
                    result.M12 = (num8 - (num * num8)) + (num2 * z);
                    result.M13 = (num7 - (num * num7)) - (num2 * y);
                    result.M14 = 0;
                    result.M21 = (num8 - (num * num8)) - (num2 * z);
                    result.M22 = num10 + (num * (1.0 - num10));
                    result.M23 = (num6 - (num * num6)) + (num2 * x);
                    result.M24 = 0;
                    result.M31 = (num7 - (num * num7)) + (num2 * y);
                    result.M32 = (num6 - (num * num6)) - (num2 * x);
                    result.M33 = num9 + (num * (1.0 - num9));
                    result.M34 = 0;
                    result.M41 = 0;
                    result.M42 = 0;
                    result.M43 = 0;
                    result.M44 = 1;

                    return result.$clone();
                },
                /**
                 * Create a view-matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {JuiceboxEngine.Math.Vector3}    cameraPosition    Position of the camera in world space.
                 * @param   {JuiceboxEngine.Math.Vector3}    cameraTarget      Lookup vector of the camera.
                 * @param   {JuiceboxEngine.Math.Vector3}    cameraUpVector    Direction of the upper edge of the camera.
                 * @return  {JuiceboxEngine.Math.Matrix4}
                 */
                CreateLookAt: function (cameraPosition, cameraTarget, cameraUpVector) {
                    var matrix = new JuiceboxEngine.Math.Matrix4.ctor();

                    var vector = JuiceboxEngine.Math.Vector3.Normalize(JuiceboxEngine.Math.Vector3.op_Subtraction(cameraPosition.$clone(), cameraTarget.$clone()));
                    var vector2 = JuiceboxEngine.Math.Vector3.Normalize(JuiceboxEngine.Math.Vector3.Cross(cameraUpVector.$clone(), vector.$clone()));
                    var vector3 = JuiceboxEngine.Math.Vector3.Cross(vector.$clone(), vector2.$clone());

                    matrix.M11 = vector2.X;
                    matrix.M12 = vector3.X;
                    matrix.M13 = vector.X;
                    matrix.M14 = 0.0;
                    matrix.M21 = vector2.Y;
                    matrix.M22 = vector3.Y;
                    matrix.M23 = vector.Y;
                    matrix.M24 = 0.0;
                    matrix.M31 = vector2.Z;
                    matrix.M32 = vector3.Z;
                    matrix.M33 = vector.Z;
                    matrix.M34 = 0.0;
                    matrix.M41 = -JuiceboxEngine.Math.Vector3.Dot(vector2.$clone(), cameraPosition.$clone());
                    matrix.M42 = -JuiceboxEngine.Math.Vector3.Dot(vector3.$clone(), cameraPosition.$clone());
                    matrix.M43 = -JuiceboxEngine.Math.Vector3.Dot(vector.$clone(), cameraPosition.$clone());
                    matrix.M44 = 1.0;

                    return matrix.$clone();
                },
                /**
                 * Create an orthographic projection matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {number}                         width         Width of viewing volume.
                 * @param   {number}                         height        Height of viewing volume.
                 * @param   {number}                         zNearPlane    Near clipping plane.
                 * @param   {number}                         zFarPlane     Far clipping plane.
                 * @return  {JuiceboxEngine.Math.Matrix4}                  An orthographic projection matrix.
                 */
                CreateOrthographic: function (width, height, zNearPlane, zFarPlane) {
                    var matrix = new JuiceboxEngine.Math.Matrix4.ctor();

                    matrix.M11 = 2.0 / width;
                    matrix.M12 = (matrix.M13 = (matrix.M14 = 0.0));
                    matrix.M22 = 2.0 / height;
                    matrix.M21 = (matrix.M23 = (matrix.M24 = 0.0));
                    matrix.M33 = 1.0 / (zNearPlane - zFarPlane);
                    matrix.M31 = (matrix.M32 = (matrix.M34 = 0.0));
                    matrix.M41 = (matrix.M42 = 0.0);
                    matrix.M43 = zNearPlane / (zNearPlane - zFarPlane);
                    matrix.M44 = 1.0;

                    return matrix.$clone();
                },
                /**
                 * Create a perspective projection matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {number}                         fieldOfView          The field of view of the perspective projection matrix (in radians).
                 * @param   {number}                         aspectRatio          The aspect ratio.
                 * @param   {number}                         nearPlaneDistance    The near clipping plane.
                 * @param   {number}                         farPlaneDistance     The far clipping plane.
                 * @return  {JuiceboxEngine.Math.Matrix4}                         A perspective projection matrix.
                 */
                CreatePerspectiveFieldOfView: function (fieldOfView, aspectRatio, nearPlaneDistance, farPlaneDistance) {
                    var matrix = new JuiceboxEngine.Math.Matrix4.ctor();

                    var num = 1.0 / (JuiceboxEngine.Math.JMath.Tan((fieldOfView * 0.5)));
                    var num9 = num / aspectRatio;

                    matrix.M11 = num9;
                    matrix.M12 = (matrix.M13 = (matrix.M14 = 0));
                    matrix.M22 = num;
                    matrix.M21 = (matrix.M23 = (matrix.M24 = 0));
                    matrix.M31 = (matrix.M32 = 0.0);
                    matrix.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
                    matrix.M34 = -1.0;
                    matrix.M41 = (matrix.M42 = (matrix.M44 = 0));
                    matrix.M43 = (nearPlaneDistance * farPlaneDistance) / (nearPlaneDistance - farPlaneDistance);

                    return matrix.$clone();
                },
                /**
                 * Create rotation on the X-Axis.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {number}                         radians    Angle in radians.
                 * @return  {JuiceboxEngine.Math.Matrix4}               The rotation matrix.
                 */
                CreateRotationX: function (radians) {
                    var result = new JuiceboxEngine.Math.Matrix4.$ctor1(1.0);

                    var val1 = JuiceboxEngine.Math.JMath.Cos(radians);
                    var val2 = JuiceboxEngine.Math.JMath.Sin(radians);

                    result.M22 = val1;
                    result.M23 = val2;
                    result.M32 = -val2;
                    result.M33 = val1;

                    return result.$clone();
                },
                /**
                 * Create rotation on the Y-Axis.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {number}                         radians    Angle in radians.
                 * @return  {JuiceboxEngine.Math.Matrix4}               The rotation matrix.
                 */
                CreateRotationY: function (radians) {
                    var result = new JuiceboxEngine.Math.Matrix4.$ctor1(1.0);

                    var val1 = JuiceboxEngine.Math.JMath.Cos(radians);
                    var val2 = JuiceboxEngine.Math.JMath.Sin(radians);

                    result.M11 = val1;
                    result.M13 = -val2;
                    result.M31 = val2;
                    result.M33 = val1;

                    return result.$clone();
                },
                /**
                 * Create rotation on the Z-Axis.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {number}                         radians    Angle in radians.
                 * @return  {JuiceboxEngine.Math.Matrix4}               The rotation matrix.
                 */
                CreateRotationZ: function (radians) {
                    var result = new JuiceboxEngine.Math.Matrix4.$ctor1(1.0);

                    var val1 = JuiceboxEngine.Math.JMath.Cos(radians);
                    var val2 = JuiceboxEngine.Math.JMath.Sin(radians);

                    result.M11 = val1;
                    result.M12 = val2;
                    result.M21 = -val2;
                    result.M22 = val1;

                    return result.$clone();
                },
                /**
                 * Creates a new rotation Matrix from the specified yaw, pitch and roll values.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {number}                         yaw      The yaw rotation value in radians.
                 * @param   {number}                         pitch    The pitch rotation value in radians.
                 * @param   {number}                         roll     The roll rotation value in radians.
                 * @return  {JuiceboxEngine.Math.Matrix4}
                 */
                CreateFromYawPitchRoll: function (yaw, pitch, roll) {
                    var quaternion = JuiceboxEngine.Math.Quaternion.CreateFromYawPitchRoll(yaw, pitch, roll);
                    return JuiceboxEngine.Math.Matrix4.CreateFromQuaternion(quaternion.$clone());
                },
                /**
                 * Creates a new rotation matrix from a Quaternion.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {JuiceboxEngine.Math.Quaternion}    quaternion    Quaternion of rotation moment.
                 * @return  {JuiceboxEngine.Math.Matrix4}
                 */
                CreateFromQuaternion: function (quaternion) {
                    var result = new JuiceboxEngine.Math.Matrix4();
                    var num9 = quaternion.X * quaternion.X;
                    var num8 = quaternion.Y * quaternion.Y;
                    var num7 = quaternion.Z * quaternion.Z;
                    var num6 = quaternion.X * quaternion.Y;
                    var num5 = quaternion.Z * quaternion.W;
                    var num4 = quaternion.Z * quaternion.X;
                    var num3 = quaternion.Y * quaternion.W;
                    var num2 = quaternion.Y * quaternion.Z;
                    var num = quaternion.X * quaternion.W;
                    result.M11 = 1.0 - (2.0 * (num8 + num7));
                    result.M12 = 2.0 * (num6 + num5);
                    result.M13 = 2.0 * (num4 - num3);
                    result.M14 = 0.0;
                    result.M21 = 2.0 * (num6 - num5);
                    result.M22 = 1.0 - (2.0 * (num7 + num9));
                    result.M23 = 2.0 * (num2 + num);
                    result.M24 = 0.0;
                    result.M31 = 2.0 * (num4 + num3);
                    result.M32 = 2.0 * (num2 - num);
                    result.M33 = 1.0 - (2.0 * (num8 + num9));
                    result.M34 = 0.0;
                    result.M41 = 0.0;
                    result.M42 = 0.0;
                    result.M43 = 0.0;
                    result.M44 = 1.0;
                    return result.$clone();
                },
                /**
                 * Create a scaling matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {JuiceboxEngine.Math.Vector3}    scale    The scale on the x, y and z axis.
                 * @return  {JuiceboxEngine.Math.Matrix4}             A scaling matrix.
                 */
                CreateScale: function (scale) {
                    var result = new JuiceboxEngine.Math.Matrix4.ctor();
                    result.M11 = scale.X;
                    result.M12 = 0;
                    result.M13 = 0;
                    result.M14 = 0;
                    result.M21 = 0;
                    result.M22 = scale.Y;
                    result.M23 = 0;
                    result.M24 = 0;
                    result.M31 = 0;
                    result.M32 = 0;
                    result.M33 = scale.Z;
                    result.M34 = 0;
                    result.M41 = 0;
                    result.M42 = 0;
                    result.M43 = 0;
                    result.M44 = 1;
                    return result.$clone();
                },
                /**
                 * Create a translation matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Matrix4
                 * @memberof JuiceboxEngine.Math.Matrix4
                 * @param   {JuiceboxEngine.Math.Vector3}    translation    Translation.
                 * @return  {JuiceboxEngine.Math.Matrix4}
                 */
                CreateTranslation: function (translation) {
                    var result = new JuiceboxEngine.Math.Matrix4.$ctor1(1.0);
                    result.M41 = translation.X;
                    result.M42 = translation.Y;
                    result.M43 = translation.Z;
                    return result.$clone();
                },
                getDefaultValue: function () { return new JuiceboxEngine.Math.Matrix4(); }
            }
        },
        fields: {
            /**
             * First row and first column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M11: 0,
            /**
             * First row and second column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M12: 0,
            /**
             * First row and third column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M13: 0,
            /**
             * First row and fouth column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M14: 0,
            /**
             * Second row and first column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M21: 0,
            /**
             * Second row and second column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M22: 0,
            /**
             * Second row and third column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M23: 0,
            /**
             * Second row and fouth column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M24: 0,
            /**
             * Third row and first column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M31: 0,
            /**
             * Third row and second column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M32: 0,
            /**
             * Third row and third column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M33: 0,
            /**
             * Third row and fouth column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M34: 0,
            /**
             * Fourth row and first column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M41: 0,
            /**
             * Fourth row and second column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M42: 0,
            /**
             * Fourth row and third column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M43: 0,
            /**
             * Fourth row and fouth column value.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Matrix4
             * @type number
             */
            M44: 0
        },
        ctors: {
            /**
             * Constructs a matrix with a diagonal with the given value.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Matrix4
             * @memberof JuiceboxEngine.Math.Matrix4
             * @param   {number}    value    The value for the diagonal in the matrix.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.M11 = value;
                this.M12 = 0.0;
                this.M13 = 0.0;
                this.M14 = 0.0;
                this.M21 = 0.0;
                this.M22 = value;
                this.M23 = 0.0;
                this.M24 = 0.0;
                this.M31 = 0.0;
                this.M32 = 0.0;
                this.M33 = value;
                this.M34 = 0.0;
                this.M41 = 0.0;
                this.M42 = 0.0;
                this.M43 = 0.0;
                this.M44 = value;
            },
            /**
             * Constructs a matrix with the given values.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Matrix4
             * @memberof JuiceboxEngine.Math.Matrix4
             * @param   {number}    m11    First row and first column value.
             * @param   {number}    m12    First row and second column value.
             * @param   {number}    m13    First row and third column value.
             * @param   {number}    m14    First row and fourth column value.
             * @param   {number}    m21    Second row and first column value.
             * @param   {number}    m22    Second row and second column value.
             * @param   {number}    m23    Second row and third column value.
             * @param   {number}    m24    Second row and fourth column value.
             * @param   {number}    m31    Third row and first column value.
             * @param   {number}    m32    Third row and second column value.
             * @param   {number}    m33    Third row and third column value.
             * @param   {number}    m34    Third row and fourth column value.
             * @param   {number}    m41    Fourth row and first column value.
             * @param   {number}    m42    Fourth row and second column value.
             * @param   {number}    m43    Fourth row and third column value.
             * @param   {number}    m44    Fourth row and fourth column value.
             * @return  {void}
             */
            $ctor2: function (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
                this.$initialize();
                this.M11 = m11;
                this.M12 = m12;
                this.M13 = m13;
                this.M14 = m14;
                this.M21 = m21;
                this.M22 = m22;
                this.M23 = m23;
                this.M24 = m24;
                this.M31 = m31;
                this.M32 = m32;
                this.M33 = m33;
                this.M34 = m34;
                this.M41 = m41;
                this.M42 = m42;
                this.M43 = m43;
                this.M44 = m44;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Read and write the data inside the matrix. Stored row-major.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Matrix4
             * @memberof JuiceboxEngine.Math.Matrix4
             * @param   {number}    index    A value ranging [0, 15] (inclusive).
             * @return  {number}             The value stored in the matrix.
             */
            getItem: function (index) {
                switch (index) {
                    case 0: 
                        return this.M11;
                    case 1: 
                        return this.M12;
                    case 2: 
                        return this.M13;
                    case 3: 
                        return this.M14;
                    case 4: 
                        return this.M21;
                    case 5: 
                        return this.M22;
                    case 6: 
                        return this.M23;
                    case 7: 
                        return this.M24;
                    case 8: 
                        return this.M31;
                    case 9: 
                        return this.M32;
                    case 10: 
                        return this.M33;
                    case 11: 
                        return this.M34;
                    case 12: 
                        return this.M41;
                    case 13: 
                        return this.M42;
                    case 14: 
                        return this.M43;
                    case 15: 
                        return this.M44;
                }
                throw new System.ArgumentOutOfRangeException.ctor();
            },
            /**
             * Read and write the data inside the matrix. Stored row-major.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Matrix4
             * @memberof JuiceboxEngine.Math.Matrix4
             * @param   {number}    index    A value ranging [0, 15] (inclusive).
             * @param   {number}    value
             * @return  {void}               The value stored in the matrix.
             */
            setItem: function (index, value) {
                switch (index) {
                    case 0: 
                        this.M11 = value;
                        break;
                    case 1: 
                        this.M12 = value;
                        break;
                    case 2: 
                        this.M13 = value;
                        break;
                    case 3: 
                        this.M14 = value;
                        break;
                    case 4: 
                        this.M21 = value;
                        break;
                    case 5: 
                        this.M22 = value;
                        break;
                    case 6: 
                        this.M23 = value;
                        break;
                    case 7: 
                        this.M24 = value;
                        break;
                    case 8: 
                        this.M31 = value;
                        break;
                    case 9: 
                        this.M32 = value;
                        break;
                    case 10: 
                        this.M33 = value;
                        break;
                    case 11: 
                        this.M34 = value;
                        break;
                    case 12: 
                        this.M41 = value;
                        break;
                    case 13: 
                        this.M42 = value;
                        break;
                    case 14: 
                        this.M43 = value;
                        break;
                    case 15: 
                        this.M44 = value;
                        break;
                    default: 
                        throw new System.ArgumentOutOfRangeException.ctor();
                }
            },
            /**
             * Read and write the data inside the matrix. Stored row-major.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Matrix4
             * @memberof JuiceboxEngine.Math.Matrix4
             * @param   {number}    row       The row to get ranging [0, 4] (inclusive)
             * @param   {number}    column    The column to get ranging [0, 4] (inclusive)
             * @return  {number}
             */
            getItem$1: function (row, column) {
                return this.getItem((((H5.Int.mul(row, 4)) + column) | 0));
            },
            /**
             * Read and write the data inside the matrix. Stored row-major.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Matrix4
             * @memberof JuiceboxEngine.Math.Matrix4
             * @param   {number}    row       The row to get ranging [0, 4] (inclusive)
             * @param   {number}    column    The column to get ranging [0, 4] (inclusive)
             * @param   {number}    value
             * @return  {void}
             */
            setItem$1: function (row, column, value) {
                this.setItem((((H5.Int.mul(row, 4)) + column) | 0), value);
            },
            /**
             * Copy the values of specified {@link } to the float array.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Matrix4
             * @memberof JuiceboxEngine.Math.Matrix4
             * @return  {Array.<number>}        The array which matrix values will be stored.
             */
            ToFloatArray: function () {
                var matarray = System.Array.init([
                    this.M11, 
                    this.M12, 
                    this.M13, 
                    this.M14, 
                    this.M21, 
                    this.M22, 
                    this.M23, 
                    this.M24, 
                    this.M31, 
                    this.M32, 
                    this.M33, 
                    this.M34, 
                    this.M41, 
                    this.M42, 
                    this.M43, 
                    this.M44
                ], System.Single);
                return matarray;
            },
            /**
             * Creates a string representing the matrix.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Matrix4
             * @memberof JuiceboxEngine.Math.Matrix4
             * @return  {string}        A string representing the matrix.
             */
            toString: function () {
                var retval = new System.Text.StringBuilder();
                retval.append("{ ");
                for (var i = 0; i < 15; i = (i + 1) | 0) {
                    retval.append((System.Single.format(this.getItem(i)) || "") + ", ");
                }
                retval.append(System.Single.format(this.getItem(15)) + " }");
                return retval.toString();
            },
            getHashCode: function () {
                var h = H5.addHash([1923668406, this.M11, this.M12, this.M13, this.M14, this.M21, this.M22, this.M23, this.M24, this.M31, this.M32, this.M33, this.M34, this.M41, this.M42, this.M43, this.M44]);
                return h;
            },
            equals: function (o) {
                if (!H5.is(o, JuiceboxEngine.Math.Matrix4)) {
                    return false;
                }
                return H5.equals(this.M11, o.M11) && H5.equals(this.M12, o.M12) && H5.equals(this.M13, o.M13) && H5.equals(this.M14, o.M14) && H5.equals(this.M21, o.M21) && H5.equals(this.M22, o.M22) && H5.equals(this.M23, o.M23) && H5.equals(this.M24, o.M24) && H5.equals(this.M31, o.M31) && H5.equals(this.M32, o.M32) && H5.equals(this.M33, o.M33) && H5.equals(this.M34, o.M34) && H5.equals(this.M41, o.M41) && H5.equals(this.M42, o.M42) && H5.equals(this.M43, o.M43) && H5.equals(this.M44, o.M44);
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Math.Matrix4();
                s.M11 = this.M11;
                s.M12 = this.M12;
                s.M13 = this.M13;
                s.M14 = this.M14;
                s.M21 = this.M21;
                s.M22 = this.M22;
                s.M23 = this.M23;
                s.M24 = this.M24;
                s.M31 = this.M31;
                s.M32 = this.M32;
                s.M33 = this.M33;
                s.M34 = this.M34;
                s.M41 = this.M41;
                s.M42 = this.M42;
                s.M43 = this.M43;
                s.M44 = this.M44;
                return s;
            }
        }
    });

    /**
     * A 2D integer point in space.
     *
     * @public
     * @class JuiceboxEngine.Math.Point
     * @implements  System.IEquatable$1
     */
    H5.define("JuiceboxEngine.Math.Point", {
        inherits: function () { return [System.IEquatable$1(JuiceboxEngine.Math.Point)]; },
        $kind: "struct",
        statics: {
            fields: {
                /**
                 * Point with the value (0, 0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Point
                 * @type JuiceboxEngine.Math.Point
                 */
                Zero: null
            },
            ctors: {
                init: function () {
                    this.Zero = new JuiceboxEngine.Math.Point();
                    this.Zero = new JuiceboxEngine.Math.Point.$ctor1(0, 0);
                }
            },
            methods: {
                /**
                 * Returns the distance between two points.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Point
                 * @memberof JuiceboxEngine.Math.Point
                 * @param   {JuiceboxEngine.Math.Point}    value1    The first point.
                 * @param   {JuiceboxEngine.Math.Point}    value2    The second point.
                 * @return  {number}                                 The distance between two points.
                 */
                Distance: function (value1, value2) {
                    return JuiceboxEngine.Math.JMath.Sqrt(JuiceboxEngine.Math.Point.DistanceSquared(value1.$clone(), value2.$clone()));
                },
                /**
                 * Returns the squared distance between two points.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Point
                 * @memberof JuiceboxEngine.Math.Point
                 * @param   {JuiceboxEngine.Math.Point}    value1    The first Point.
                 * @param   {JuiceboxEngine.Math.Point}    value2    The second Point.
                 * @return  {number}                                 The squared distance between two points.
                 */
                DistanceSquared: function (value1, value2) {
                    return ((H5.Int.mul((((value1.X - value2.X) | 0)), (((value1.X - value2.X) | 0))) + H5.Int.mul((((value1.Y - value2.Y) | 0)), (((value1.Y - value2.Y) | 0)))) | 0);
                }/**
                 * Check if two points are the same.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Point
                 * @memberof JuiceboxEngine.Math.Point
                 * @param   {JuiceboxEngine.Math.Point}    point1    The first point.
                 * @param   {JuiceboxEngine.Math.Point}    point2    The second point.
                 * @return  {boolean}                                True if equal, false otherwise.
                 */
                ,
                op_Equality: function (point1, point2) {
                    return point1.equalsT(point2.$clone());
                }/**
                 * Multiplies a point by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Point
                 * @memberof JuiceboxEngine.Math.Point
                 * @param   {JuiceboxEngine.Math.Point}    point     The point.
                 * @param   {number}                       scalar    The scalar.
                 * @return  {JuiceboxEngine.Math.Point}              A point multiplied by the given scalar.
                 */
                ,
                op_Multiply$1: function (point, scalar) {
                    return new JuiceboxEngine.Math.Point.$ctor1(H5.Int.mul(point.X, scalar), H5.Int.mul(point.Y, scalar));
                }/**
                 * Multiplies a point with another point.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Point
                 * @memberof JuiceboxEngine.Math.Point
                 * @param   {JuiceboxEngine.Math.Point}    point1    The first point.
                 * @param   {JuiceboxEngine.Math.Point}    point2    The second point.
                 * @return  {JuiceboxEngine.Math.Point}              The product of the two given points.
                 */
                ,
                op_Multiply: function (point1, point2) {
                    return new JuiceboxEngine.Math.Point.$ctor1(H5.Int.mul(point1.X, point2.X), H5.Int.mul(point1.Y, point2.Y));
                }/**
                 * Adds a point with another point.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Point
                 * @memberof JuiceboxEngine.Math.Point
                 * @param   {JuiceboxEngine.Math.Point}    point1    The first point.
                 * @param   {JuiceboxEngine.Math.Point}    point2    The second point.
                 * @return  {JuiceboxEngine.Math.Point}              point1 + point2
                 */
                ,
                op_Subtraction: function (point1, point2) {
                    return new JuiceboxEngine.Math.Point.$ctor1(((point1.X - point2.X) | 0), ((point1.Y - point2.Y) | 0));
                }/**
                 * Subtracts a point with another point.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Point
                 * @memberof JuiceboxEngine.Math.Point
                 * @param   {JuiceboxEngine.Math.Point}    point1    The first point.
                 * @param   {JuiceboxEngine.Math.Point}    point2    The second point.
                 * @return  {JuiceboxEngine.Math.Point}              point1 - point2
                 */
                ,
                op_Addition: function (point1, point2) {
                    return new JuiceboxEngine.Math.Point.$ctor1(((point1.X + point2.X) | 0), ((point1.Y + point2.Y) | 0));
                }/**
                 * Divide a point by a given value.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Point
                 * @memberof JuiceboxEngine.Math.Point
                 * @param   {JuiceboxEngine.Math.Point}    point    The point.
                 * @param   {number}                       value    The value.
                 * @return  {JuiceboxEngine.Math.Point}             A point divided by the given value.
                 */
                ,
                op_Division$1: function (point, value) {
                    return new JuiceboxEngine.Math.Point.$ctor1(((H5.Int.div(point.X, value)) | 0), ((H5.Int.div(point.Y, value)) | 0));
                }/**
                 * Divide a point by an other point.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Point
                 * @memberof JuiceboxEngine.Math.Point
                 * @param   {JuiceboxEngine.Math.Point}    point1    The point.
                 * @param   {JuiceboxEngine.Math.Point}    point2    The point to divide by.
                 * @return  {JuiceboxEngine.Math.Point}              A point divided by the given value.
                 */
                ,
                op_Division: function (point1, point2) {
                    return new JuiceboxEngine.Math.Point.$ctor1(((H5.Int.div(point1.X, point2.X)) | 0), ((H5.Int.div(point1.Y, point2.Y)) | 0));
                }/**
                 * Check if two points are not the same.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Point
                 * @memberof JuiceboxEngine.Math.Point
                 * @param   {JuiceboxEngine.Math.Point}    point1    The first point.
                 * @param   {JuiceboxEngine.Math.Point}    point2    The second point.
                 * @return  {boolean}                                True if equal, false otherwise.
                 */
                ,
                op_Inequality: function (point1, point2) {
                    return !(JuiceboxEngine.Math.Point.op_Equality(point1.$clone(), point2.$clone()));
                },
                getDefaultValue: function () { return new JuiceboxEngine.Math.Point(); }
            }
        },
        fields: {
            /**
             * The X component of the point.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Point
             * @type number
             */
            X: 0,
            /**
             * The Y component of the point.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Point
             * @type number
             */
            Y: 0
        },
        alias: ["equalsT", "System$IEquatable$1$JuiceboxEngine$Math$Point$equalsT"],
        ctors: {
            /**
             * Default Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Point
             * @memberof JuiceboxEngine.Math.Point
             * @param   {number}    x    The x value of the point.
             * @param   {number}    y    The y value of the point.
             * @return  {void}
             */
            $ctor1: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Check if two points are equal.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Point
             * @memberof JuiceboxEngine.Math.Point
             * @param   {JuiceboxEngine.Math.Point}    other    The point to check against.
             * @return  {boolean}                               True if equal, false otherwise.
             */
            equalsT: function (other) {
                return (this.X === other.X && this.Y === other.Y);
            },
            /**
             * Check if a point is equal to the given object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Point
             * @memberof JuiceboxEngine.Math.Point
             * @param   {System.Object}    other    The object to compare against.
             * @return  {boolean}                   True if equal, false otherwise.
             */
            equals: function (other) {
                return H5.is(other, JuiceboxEngine.Math.Point) && this.equalsT(H5.cast(other, JuiceboxEngine.Math.Point));
            },
            /**
             * Gets an unique hash code.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Point
             * @memberof JuiceboxEngine.Math.Point
             * @return  {number}        An unique hash code.
             */
            getHashCode: function () {
                var hashCode = 1861411795;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + H5.getHashCode(this.X)) | 0;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + H5.getHashCode(this.Y)) | 0;
                return hashCode;
            },
            /**
             * Get a string representing the point.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Point
             * @memberof JuiceboxEngine.Math.Point
             * @return  {string}        A string representing the point.
             */
            toString: function () {
                return System.String.format("Point({0}, {1})", this.X, this.Y);
            },
            /**
             * Create a Vector2 from this point.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Point
             * @memberof JuiceboxEngine.Math.Point
             * @return  {JuiceboxEngine.Math.Vector2}        A Vector2.
             */
            ToVector2: function () {
                return new JuiceboxEngine.Math.Vector2.$ctor3(this.X, this.Y);
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Math.Point();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    /**
     * A data structure representing Quaternion.
     *
     * @public
     * @class JuiceboxEngine.Math.Quaternion
     */
    H5.define("JuiceboxEngine.Math.Quaternion", {
        $kind: "struct",
        statics: {
            methods: {
                /**
                 * Creates a new Quaternion from the specified yaw, pitch and roll angles.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Quaternion
                 * @memberof JuiceboxEngine.Math.Quaternion
                 * @param   {number}                            yaw      Yaw around the y axis in radians.
                 * @param   {number}                            pitch    Pitch around the x axis in radians.
                 * @param   {number}                            roll     Roll around the z axis in radians.
                 * @return  {JuiceboxEngine.Math.Quaternion}             A new quaternion from the concatenated yaw, pitch, and roll angles.
                 */
                CreateFromYawPitchRoll: function (yaw, pitch, roll) {
                    var halfRoll = roll * 0.5;
                    var halfPitch = pitch * 0.5;
                    var halfYaw = yaw * 0.5;

                    var sinRoll = JuiceboxEngine.Math.JMath.Sin(halfRoll);
                    var cosRoll = JuiceboxEngine.Math.JMath.Cos(halfRoll);
                    var sinPitch = JuiceboxEngine.Math.JMath.Sin(halfPitch);
                    var cosPitch = JuiceboxEngine.Math.JMath.Cos(halfPitch);
                    var sinYaw = JuiceboxEngine.Math.JMath.Sin(halfYaw);
                    var cosYaw = JuiceboxEngine.Math.JMath.Cos(halfYaw);

                    return new JuiceboxEngine.Math.Quaternion.$ctor3((cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll), (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll), (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll), (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll));
                },
                getDefaultValue: function () { return new JuiceboxEngine.Math.Quaternion(); }
            }
        },
        fields: {
            /**
             * The x coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Quaternion
             * @type number
             */
            X: 0,
            /**
             * The y coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Quaternion
             * @type number
             */
            Y: 0,
            /**
             * The z coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Quaternion
             * @type number
             */
            Z: 0,
            /**
             * The rotation component.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Quaternion
             * @type number
             */
            W: 0
        },
        ctors: {
            /**
             * Constructs a quaternion with X, Y, Z and W from four values.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Quaternion
             * @memberof JuiceboxEngine.Math.Quaternion
             * @param   {number}    x    The x coordinate in 3d-space.
             * @param   {number}    y    The y coordinate in 3d-space.
             * @param   {number}    z    The z coordinate in 3d-space.
             * @param   {number}    w    The rotation component.
             * @return  {void}
             */
            $ctor3: function (x, y, z, w) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
                this.W = w;
            },
            /**
             * Constructs a quaternion with X, Y, Z from {@link } and rotation component from a scalar.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Quaternion
             * @memberof JuiceboxEngine.Math.Quaternion
             * @param   {JuiceboxEngine.Math.Vector3}    value    The x, y, z coordinates in 3d-space.
             * @param   {number}                         w        The rotation component.
             * @return  {void}
             */
            $ctor1: function (value, w) {
                this.$initialize();
                this.X = value.X;
                this.Y = value.Y;
                this.Z = value.Z;
                this.W = w;
            },
            /**
             * Constructs a quaternion from {@link }.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Quaternion
             * @memberof JuiceboxEngine.Math.Quaternion
             * @param   {JuiceboxEngine.Math.Vector4}    value    The x, y, z coordinates in 3d-space and the rotation component.
             * @return  {void}
             */
            $ctor2: function (value) {
                this.$initialize();
                this.X = value.X;
                this.Y = value.Y;
                this.Z = value.Z;
                this.W = value.W;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = H5.addHash([3721418277, this.X, this.Y, this.Z, this.W]);
                return h;
            },
            equals: function (o) {
                if (!H5.is(o, JuiceboxEngine.Math.Quaternion)) {
                    return false;
                }
                return H5.equals(this.X, o.X) && H5.equals(this.Y, o.Y) && H5.equals(this.Z, o.Z) && H5.equals(this.W, o.W);
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Math.Quaternion();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                s.W = this.W;
                return s;
            }
        }
    });

    /**
     * Data structure representing a rectangle in space of integer values.
     *
     * @public
     * @class JuiceboxEngine.Math.Rectangle
     * @implements  System.IEquatable$1
     */
    H5.define("JuiceboxEngine.Math.Rectangle", {
        inherits: function () { return [System.IEquatable$1(JuiceboxEngine.Math.Rectangle)]; },
        $kind: "struct",
        statics: {
            methods: {
                /**
                 * Implicit conversion to RectangleF.
                 RectangleF to Rectangle cannot be implicit.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Rectangle
                 * @memberof JuiceboxEngine.Math.Rectangle
                 * @param   {JuiceboxEngine.Math.Rectangle}     rect    The rectangle to make RectangleF.
                 * @return  {JuiceboxEngine.Math.RectangleF}
                 */
                op_Implicit: function (rect) {
                    return new JuiceboxEngine.Math.RectangleF.$ctor2(rect.X, rect.Y, rect.Width, rect.Height);
                }/**
                 * Check if two rectangles are the same.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Rectangle
                 * @memberof JuiceboxEngine.Math.Rectangle
                 * @param   {JuiceboxEngine.Math.Rectangle}    rectangle1    First rectangle.
                 * @param   {JuiceboxEngine.Math.Rectangle}    rectangle2    Second rectangle.
                 * @return  {boolean}                                        True if equal, false otherwise.
                 */
                ,
                op_Equality: function (rectangle1, rectangle2) {
                    return rectangle1.equalsT(rectangle2.$clone());
                }/**
                 * Check if two rectangles are not the same.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Rectangle
                 * @memberof JuiceboxEngine.Math.Rectangle
                 * @param   {JuiceboxEngine.Math.Rectangle}    rectangle1    First rectangle.
                 * @param   {JuiceboxEngine.Math.Rectangle}    rectangle2    Second rectangle.
                 * @return  {boolean}                                        True if not equal, false otherwise.
                 */
                ,
                op_Inequality: function (rectangle1, rectangle2) {
                    return !rectangle1.equalsT(rectangle2.$clone());
                },
                getDefaultValue: function () { return new JuiceboxEngine.Math.Rectangle(); }
            }
        },
        fields: {
            /**
             * X position of the rectangle.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Rectangle
             * @type number
             */
            X: 0,
            /**
             * Y position of the rectangle.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Rectangle
             * @type number
             */
            Y: 0,
            /**
             * Width of the rectangle.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Rectangle
             * @type number
             */
            Width: 0,
            /**
             * Height of the rectangle.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Rectangle
             * @type number
             */
            Height: 0
        },
        props: {
            /**
             * Left X coordinate.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Math.Rectangle
             * @function Left
             * @type number
             */
            Left: {
                get: function () {
                    return this.X;
                }
            },
            /**
             * Right X coordinate.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Math.Rectangle
             * @function Right
             * @type number
             */
            Right: {
                get: function () {
                    return ((this.X + this.Width) | 0);
                }
            },
            /**
             * Bottom Y coordinate.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Math.Rectangle
             * @function Bottom
             * @type number
             */
            Bottom: {
                get: function () {
                    return this.Y;
                }
            },
            /**
             * Top Y coordinate.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Math.Rectangle
             * @function Top
             * @type number
             */
            Top: {
                get: function () {
                    return ((this.Y + this.Height) | 0);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$JuiceboxEngine$Math$Rectangle$equalsT"],
        ctors: {
            /**
             * Rectangle Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Rectangle
             * @memberof JuiceboxEngine.Math.Rectangle
             * @param   {number}    x         X position.
             * @param   {number}    y         Y position.
             * @param   {number}    width     Width of the rectangle.
             * @param   {number}    height    Height of the rectangle.
             * @return  {void}
             */
            $ctor2: function (x, y, width, height) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Width = width;
                this.Height = height;
            },
            /**
             * Rectangle Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Rectangle
             * @memberof JuiceboxEngine.Math.Rectangle
             * @param   {JuiceboxEngine.Math.Point}    position    The x and y position of the rectangle.
             * @param   {number}                       width       Width of the rectangle.
             * @param   {number}                       height      Height of the rectangle.
             * @return  {void}
             */
            $ctor1: function (position, width, height) {
                this.$initialize();
                this.X = position.X;
                this.Y = position.Y;
                this.Width = width;
                this.Height = height;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Tests if an other rectangle intersects with this rectangle.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Rectangle
             * @memberof JuiceboxEngine.Math.Rectangle
             * @param   {JuiceboxEngine.Math.Rectangle}    r2    the other rectangle.
             * @return  {boolean}                                True if it intersects, false otherwise.
             */
            Intersects: function (r2) {
                return !(r2.X > ((this.X + this.Width) | 0) || ((r2.X + r2.Width) | 0) < this.X || ((r2.Y + r2.Height) | 0) < this.Y || r2.Y > ((this.Y + this.Height) | 0));
            },
            /**
             * Tests if a point intersects the rectangle.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Rectangle
             * @memberof JuiceboxEngine.Math.Rectangle
             * @param   {JuiceboxEngine.Math.Vector2}    point    The point to test.
             * @return  {boolean}                                 True if it intersects, false otherwise.
             */
            Intersects$1: function (point) {
                return (point.X >= this.X && point.Y >= this.Y && point.X <= ((this.X + this.Width) | 0) && point.Y <= ((this.Y + this.Height) | 0));
            },
            /**
             * Check if a object is equal to rectangle.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Rectangle
             * @memberof JuiceboxEngine.Math.Rectangle
             * @param   {System.Object}    obj    The object to check.
             * @return  {boolean}                 True if equal, false otherwise.
             */
            equals: function (obj) {
                return H5.is(obj, JuiceboxEngine.Math.Rectangle) && this.equalsT(H5.cast(obj, JuiceboxEngine.Math.Rectangle));
            },
            /**
             * Check if a rectangle is equal this rectangle.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Rectangle
             * @memberof JuiceboxEngine.Math.Rectangle
             * @param   {JuiceboxEngine.Math.Rectangle}    other    The rectangle to check.
             * @return  {boolean}                                   True if equal, false otherwise.
             */
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y && this.Width === other.Width && this.Height === other.Height;
            },
            /**
             * Gets an unique hash code.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Rectangle
             * @memberof JuiceboxEngine.Math.Rectangle
             * @return  {number}        An unique hash code.
             */
            getHashCode: function () {
                var hashCode = 466501756;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + H5.getHashCode(this.X)) | 0;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + H5.getHashCode(this.Y)) | 0;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + H5.getHashCode(this.Width)) | 0;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + H5.getHashCode(this.Height)) | 0;
                return hashCode;
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Math.Rectangle();
                s.X = this.X;
                s.Y = this.Y;
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
            }
        }
    });

    /**
     * Data structure representing a rectangle in space with float values.
     *
     * @public
     * @class JuiceboxEngine.Math.RectangleF
     * @implements  System.IEquatable$1
     */
    H5.define("JuiceboxEngine.Math.RectangleF", {
        inherits: function () { return [System.IEquatable$1(JuiceboxEngine.Math.RectangleF)]; },
        $kind: "struct",
        statics: {
            methods: {
                /**
                 * Check if two rectangles are the same.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.RectangleF
                 * @memberof JuiceboxEngine.Math.RectangleF
                 * @param   {JuiceboxEngine.Math.RectangleF}    rectangle1    First rectangle.
                 * @param   {JuiceboxEngine.Math.RectangleF}    rectangle2    Second rectangle.
                 * @return  {boolean}                                         True if equal, false otherwise.
                 */
                op_Equality: function (rectangle1, rectangle2) {
                    return rectangle1.equalsT(rectangle2.$clone());
                }/**
                 * Check if two rectangles are not the same.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.RectangleF
                 * @memberof JuiceboxEngine.Math.RectangleF
                 * @param   {JuiceboxEngine.Math.RectangleF}    rectangle1    First rectangle.
                 * @param   {JuiceboxEngine.Math.RectangleF}    rectangle2    Second rectangle.
                 * @return  {boolean}                                         True if not equal, false otherwise.
                 */
                ,
                op_Inequality: function (rectangle1, rectangle2) {
                    return !rectangle1.equalsT(rectangle2.$clone());
                },
                getDefaultValue: function () { return new JuiceboxEngine.Math.RectangleF(); }
            }
        },
        fields: {
            /**
             * X position of the rectangle.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.RectangleF
             * @type number
             */
            X: 0,
            /**
             * Y position of the rectangle.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.RectangleF
             * @type number
             */
            Y: 0,
            /**
             * Width of the rectangle.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.RectangleF
             * @type number
             */
            Width: 0,
            /**
             * Height of the rectangle.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.RectangleF
             * @type number
             */
            Height: 0
        },
        props: {
            /**
             * Left X coordinate.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Math.RectangleF
             * @function Left
             * @type number
             */
            Left: {
                get: function () {
                    return this.X;
                }
            },
            /**
             * Right X coordinate.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Math.RectangleF
             * @function Right
             * @type number
             */
            Right: {
                get: function () {
                    return this.X + this.Width;
                }
            },
            /**
             * Bottom Y coordinate.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Math.RectangleF
             * @function Bottom
             * @type number
             */
            Bottom: {
                get: function () {
                    return this.Y;
                }
            },
            /**
             * Top Y coordinate.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Math.RectangleF
             * @function Top
             * @type number
             */
            Top: {
                get: function () {
                    return this.Y + this.Height;
                }
            },
            /**
             * Center of the rectangle.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Math.RectangleF
             * @function Center
             * @type JuiceboxEngine.Math.Vector2
             */
            Center: {
                get: function () {
                    return new JuiceboxEngine.Math.Vector2.$ctor3(this.X + this.Width / 2, this.Y + this.Height / 2);
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$JuiceboxEngine$Math$RectangleF$equalsT"],
        ctors: {
            /**
             * Rectangle Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.RectangleF
             * @memberof JuiceboxEngine.Math.RectangleF
             * @param   {number}    x         X position.
             * @param   {number}    y         Y position.
             * @param   {number}    width     Width of the rectangle.
             * @param   {number}    height    Height of the rectangle.
             * @return  {void}
             */
            $ctor2: function (x, y, width, height) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Width = width;
                this.Height = height;
            },
            /**
             * Rectangle Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.RectangleF
             * @memberof JuiceboxEngine.Math.RectangleF
             * @param   {JuiceboxEngine.Math.Vector2}    position    The x and y position of the rectangle.
             * @param   {number}                         width       Width of the rectangle.
             * @param   {number}                         height      Height of the rectangle.
             * @return  {void}
             */
            $ctor1: function (position, width, height) {
                this.$initialize();
                this.X = position.X;
                this.Y = position.Y;
                this.Width = width;
                this.Height = height;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Indicates if a rectangle intersects with this rectangle.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.RectangleF
             * @memberof JuiceboxEngine.Math.RectangleF
             * @param   {JuiceboxEngine.Math.RectangleF}    r2    the other rectangle.
             * @return  {boolean}                                 True if it intersects, false otherwise.
             */
            Intersects: function (r2) {
                return !(r2.X > this.X + this.Width || r2.X + r2.Width < this.X || r2.Y + r2.Height < this.Y || r2.Y > this.Y + this.Height);
            },
            /**
             * Tests if a point intersects the rectangle.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.RectangleF
             * @memberof JuiceboxEngine.Math.RectangleF
             * @param   {JuiceboxEngine.Math.Vector2}    point    The point to test.
             * @return  {boolean}                                 True if it intersects, false otherwise.
             */
            Intersects$1: function (point) {
                return (point.X >= this.X && point.Y >= this.Y && point.X <= this.X + this.Width && point.Y <= this.Y + this.Height);
            },
            /**
             * Check if a object is equal to rectangle.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.RectangleF
             * @memberof JuiceboxEngine.Math.RectangleF
             * @param   {System.Object}    obj    The object to check.
             * @return  {boolean}                 True if equal, false otherwise.
             */
            equals: function (obj) {
                return H5.is(obj, JuiceboxEngine.Math.RectangleF) && this.equalsT(H5.cast(obj, JuiceboxEngine.Math.RectangleF));
            },
            /**
             * Check if a rectangle is equal this rectangle.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.RectangleF
             * @memberof JuiceboxEngine.Math.RectangleF
             * @param   {JuiceboxEngine.Math.RectangleF}    other    The rectangle to check.
             * @return  {boolean}                                    True if equal, false otherwise.
             */
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y && this.Width === other.Width && this.Height === other.Height;
            },
            /**
             * Gets an unique hash code.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.RectangleF
             * @memberof JuiceboxEngine.Math.RectangleF
             * @return  {number}        An unique hash code.
             */
            getHashCode: function () {
                var hashCode = 466501756;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + System.Single.getHashCode(this.X)) | 0;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + System.Single.getHashCode(this.Y)) | 0;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + System.Single.getHashCode(this.Width)) | 0;
                hashCode = (H5.Int.mul(hashCode, -1521134295) + System.Single.getHashCode(this.Height)) | 0;
                return hashCode;
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Math.RectangleF();
                s.X = this.X;
                s.Y = this.Y;
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
            }
        }
    });

    /**
     * Represents a 2 dimensional vector in space.
     *
     * @public
     * @class JuiceboxEngine.Math.Vector2
     * @implements  System.IEquatable$1
     */
    H5.define("JuiceboxEngine.Math.Vector2", {
        inherits: function () { return [System.IEquatable$1(JuiceboxEngine.Math.Vector2)]; },
        $kind: "struct",
        statics: {
            fields: {
                /**
                 * Two dimensional up vector. (0, 1)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @type JuiceboxEngine.Math.Vector2
                 */
                Up: null,
                /**
                 * Two dimensional down vector. (0, -1)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @type JuiceboxEngine.Math.Vector2
                 */
                Down: null,
                /**
                 * Two dimensional right vector. (1, 0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @type JuiceboxEngine.Math.Vector2
                 */
                Right: null,
                /**
                 * Two dimensional left vector. (-1, 0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @type JuiceboxEngine.Math.Vector2
                 */
                Left: null,
                /**
                 * Vector2 with all zeros.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @type JuiceboxEngine.Math.Vector2
                 */
                Zero: null
            },
            ctors: {
                init: function () {
                    this.Up = new JuiceboxEngine.Math.Vector2();
                    this.Down = new JuiceboxEngine.Math.Vector2();
                    this.Right = new JuiceboxEngine.Math.Vector2();
                    this.Left = new JuiceboxEngine.Math.Vector2();
                    this.Zero = new JuiceboxEngine.Math.Vector2();
                    this.Up = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 1.0);
                    this.Down = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 1.0);
                    this.Right = new JuiceboxEngine.Math.Vector2.$ctor3(1.0, 0.0);
                    this.Left = new JuiceboxEngine.Math.Vector2.$ctor3(-1.0, 0.0);
                    this.Zero = new JuiceboxEngine.Math.Vector2.$ctor3(0.0, 0.0);
                }
            },
            methods: {
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {number}                                   The distance between two vectors.
                 */
                Distance: function (value1, value2) {
                    return JuiceboxEngine.Math.JMath.Sqrt(JuiceboxEngine.Math.Vector2.DistanceSquared(value1.$clone(), value2.$clone()));
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {number}                                   The squared distance between two vectors.
                 */
                DistanceSquared: function (value1, value2) {
                    return (value1.X - value2.X) * (value1.X - value2.X) + (value1.Y - value2.Y) * (value1.Y - value2.Y);
                },
                /**
                 * Normalizes the given vector.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    vector    The vector to normalize.
                 * @return  {JuiceboxEngine.Math.Vector2}              A normalized vector.
                 */
                Normalize: function (vector) {
                    vector.Normalize();
                    return vector.$clone();
                },
                /**
                 * Calculates the dot product.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    vector1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector2}    vector2    The second vector.
                 * @return  {number}                                    The dot product of two vectors.
                 */
                Dot: function (vector1, vector2) {
                    return vector1.X * vector2.X + vector1.Y * vector2.Y;
                },
                /**
                 * Linearly interpolate two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    start       Start vector, at gradient = 0.
                 * @param   {JuiceboxEngine.Math.Vector2}    end         End vector, at gradient = 1.
                 * @param   {number}                         gradient    The gradient.
                 * @return  {JuiceboxEngine.Math.Vector2}
                 */
                Interpolate: function (start, end, gradient) {
                    return new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Math.JMath.Interpolate(start.X, end.X, gradient), JuiceboxEngine.Math.JMath.Interpolate(start.Y, end.Y, gradient));
                },
                /**
                 * Rotate the vector with given radians.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    vector     Vector to rotate.
                 * @param   {number}                         radians    Rotation in radians.
                 * @return  {JuiceboxEngine.Math.Vector2}               A rotated vector.
                 */
                Rotate: function (vector, radians) {
                    var sin = JuiceboxEngine.Math.JMath.Sin(radians);
                    var cos = JuiceboxEngine.Math.JMath.Cos(radians);
                    var tx = vector.X;
                    var ty = vector.Y;
                    vector.X = (cos * tx) - (sin * ty);
                    vector.Y = (sin * tx) + (cos * ty);
                    return vector.$clone();
                }/**
                 * Inverts the vector values.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value    The vector to invert.
                 * @return  {JuiceboxEngine.Math.Vector2}             Inverted vector.
                 */
                ,
                op_UnaryNegation: function (value) {
                    return new JuiceboxEngine.Math.Vector2.$ctor3(-value.X, -value.Y);
                }/**
                 * Checks if two vectors are equal.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are equal true, otherwise false.
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y;
                }/**
                 * Checks if the two vectors are not equal
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are not equal true, otherwise false.
                 */
                ,
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X || value1.Y !== value2.Y;
                }/**
                 * Adds two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {JuiceboxEngine.Math.Vector2}              The sum of the two vectors.
                 */
                ,
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                }/**
                 * Subtracts two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value1    The first vector, on the left side.
                 * @param   {JuiceboxEngine.Math.Vector2}    value2    The second vector, on the right side.
                 * @return  {JuiceboxEngine.Math.Vector2}              The result of the substraction between the two vectors.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                }/**
                 * Multiplies two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {JuiceboxEngine.Math.Vector2}              The multiplication between the given vectors.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value1    The vector.
                 * @param   {number}                         scalar    The scaler value.
                 * @return  {JuiceboxEngine.Math.Vector2}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$1: function (value1, scalar) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {number}                         scalar    The scaler value.
                 * @param   {JuiceboxEngine.Math.Vector2}    value1    The vector.
                 * @return  {JuiceboxEngine.Math.Vector2}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$2: function (scalar, value1) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    return value1.$clone();
                }/**
                 * Divide two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value1    The first vector, on the left side.
                 * @param   {JuiceboxEngine.Math.Vector2}    value2    The first vector, on the right side.
                 * @return  {JuiceboxEngine.Math.Vector2}              The devision between two vectors.
                 */
                ,
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                }/**
                 * Divide a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector2
                 * @memberof JuiceboxEngine.Math.Vector2
                 * @param   {JuiceboxEngine.Math.Vector2}    value1     The vector, on the left side.
                 * @param   {number}                         divider    The value to divide by.
                 * @return  {JuiceboxEngine.Math.Vector2}               The devision the vector and the scalar.
                 */
                ,
                op_Division$1: function (value1, divider) {
                    value1.X /= divider;
                    value1.Y /= divider;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new JuiceboxEngine.Math.Vector2(); }
            }
        },
        fields: {
            /**
             * The X-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Vector2
             * @type number
             */
            X: 0,
            /**
             * The Y-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Vector2
             * @type number
             */
            Y: 0
        },
        alias: ["equalsT", "System$IEquatable$1$JuiceboxEngine$Math$Vector2$equalsT"],
        ctors: {
            /**
             * Constructors 2D vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @param   {number}    x    The X coordinate.
             * @param   {number}    y    The Y coordinate.
             * @return  {void}
             */
            $ctor3: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            /**
             * Constructs a 2D vector, all values equal to the given value.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @param   {number}    value    The value for all axis.
             * @return  {void}
             */
            $ctor2: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
            },
            /**
             * Constructs a 2D vector, taking the X and Y component of a 3 component vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @param   {JuiceboxEngine.Math.Vector3}    value    The {@link } to use.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.X = value.X;
                this.Y = value.Y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Returns the length of this vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @return  {number}        The length.
             */
            Length: function () {
                return JuiceboxEngine.Math.JMath.Sqrt((this.X * this.X) + (this.Y * this.Y));
            },
            /**
             * Returns the squared length of this vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @return  {number}        The squared length.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y);
            },
            /**
             * Makes this vector a normalized one.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @return  {void}
             */
            Normalize: function () {
                var factor = JuiceboxEngine.Math.JMath.Sqrt((this.X * this.X) + (this.Y * this.Y));
                factor = 1.0 / factor;
                this.X *= factor;
                this.Y *= factor;
            },
            /**
             * Gives a string representing the vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @return  {string}        String representation of this vector.
             */
            toString: function () {
                return System.String.format("Vector2({0}, {1})", this.X, this.Y);
            },
            /**
             * Convert this Vector2 to a Point, by casting the float values to ints.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @return  {JuiceboxEngine.Math.Point}        A Point representing the Vector2.
             */
            ToPoint: function () {
                return new JuiceboxEngine.Math.Point.$ctor1(H5.Int.clip32(this.X), H5.Int.clip32(this.Y));
            },
            /**
             * Check if the vector is equal to an other vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @param   {JuiceboxEngine.Math.Vector2}    other    The vector to check against.
             * @return  {boolean}                                 False if not equal, true if the vectors are equal.
             */
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y;
            },
            /**
             * Check if the vector is equal to the other object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @param   {System.Object}    o    The object to check against.
             * @return  {boolean}               False if not equal, true if the vectors are equal.
             */
            equals: function (o) {
                if (H5.is(o, JuiceboxEngine.Math.Vector2)) {
                    return this.equalsT(H5.cast(o, JuiceboxEngine.Math.Vector2));
                }
                return false;
            },
            /**
             * Gets the hash code of this vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Vector2
             * @memberof JuiceboxEngine.Math.Vector2
             * @return  {number}        Hash code of this vector.
             */
            getHashCode: function () {
                var hashCode = System.Single.getHashCode(this.X);
                hashCode = (H5.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Y);
                return hashCode;
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Math.Vector2();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    /**
     * Represents a 3 dimensional vector in space.
     *
     * @public
     * @class JuiceboxEngine.Math.Vector3
     * @implements  System.IEquatable$1
     */
    H5.define("JuiceboxEngine.Math.Vector3", {
        inherits: function () { return [System.IEquatable$1(JuiceboxEngine.Math.Vector3)]; },
        $kind: "struct",
        statics: {
            fields: {
                /**
                 * Three dimensional up vector. (0, 1, 0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @type JuiceboxEngine.Math.Vector3
                 */
                Up: null,
                /**
                 * Three dimensional down vector. (0, -1, 0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @type JuiceboxEngine.Math.Vector3
                 */
                Down: null,
                /**
                 * Three dimensional right vector. (1, 0, 0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @type JuiceboxEngine.Math.Vector3
                 */
                Right: null,
                /**
                 * Three dimensional left vector. (-1, 0, 0)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @type JuiceboxEngine.Math.Vector3
                 */
                Left: null,
                /**
                 * Three dimensional forward vector. (0, 0, -1)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @type JuiceboxEngine.Math.Vector3
                 */
                Forward: null,
                /**
                 * Three dimensional backward vector. (0, 0, -1)
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @type JuiceboxEngine.Math.Vector3
                 */
                Backward: null
            },
            ctors: {
                init: function () {
                    this.Up = new JuiceboxEngine.Math.Vector3();
                    this.Down = new JuiceboxEngine.Math.Vector3();
                    this.Right = new JuiceboxEngine.Math.Vector3();
                    this.Left = new JuiceboxEngine.Math.Vector3();
                    this.Forward = new JuiceboxEngine.Math.Vector3();
                    this.Backward = new JuiceboxEngine.Math.Vector3();
                    this.Up = new JuiceboxEngine.Math.Vector3.$ctor2(0.0, 1.0, 0.0);
                    this.Down = new JuiceboxEngine.Math.Vector3.$ctor2(0.0, 1.0, 0.0);
                    this.Right = new JuiceboxEngine.Math.Vector3.$ctor2(1.0, 0.0, 0.0);
                    this.Left = new JuiceboxEngine.Math.Vector3.$ctor2(-1.0, 0.0, 0.0);
                    this.Forward = new JuiceboxEngine.Math.Vector3.$ctor2(0.0, 0.0, 1.0);
                    this.Backward = new JuiceboxEngine.Math.Vector3.$ctor2(0.0, 0.0, -1.0);
                }
            },
            methods: {
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {number}                                   The distance between two vectors.
                 */
                Distance: function (value1, value2) {
                    return JuiceboxEngine.Math.JMath.Sqrt(JuiceboxEngine.Math.Vector3.DistanceSquared(value1.$clone(), value2.$clone()));
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {number}                                   The squared distance between two vectors.
                 */
                DistanceSquared: function (value1, value2) {
                    return (value1.X - value2.X) * (value1.X - value2.X) + (value1.Y - value2.Y) * (value1.Y - value2.Y) + (value1.Z - value2.Z) * (value1.Z - value2.Z);
                },
                /**
                 * Normalizes the given vector.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    vector    The vector to normalize.
                 * @return  {JuiceboxEngine.Math.Vector3}              A normalized vector.
                 */
                Normalize: function (vector) {
                    vector.Normalize();
                    return vector.$clone();
                },
                /**
                 * Calculates the dot product.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    vector1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector3}    vector2    The second vector.
                 * @return  {number}                                    The dot product of two vectors.
                 */
                Dot: function (vector1, vector2) {
                    return vector1.X * vector2.X + vector1.Y * vector2.Y + vector1.Z * vector2.Z;
                },
                /**
                 * Calculate the cross product.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    vector1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector3}    vector2    The second vector.
                 * @return  {JuiceboxEngine.Math.Vector3}               The cross product of the two vectors.
                 */
                Cross: function (vector1, vector2) {
                    var x = vector1.Y * vector2.Z - vector2.Y * vector1.Z;
                    var y = -(vector1.X * vector2.Z - vector2.X * vector1.Z);
                    var z = vector1.X * vector2.Y - vector2.X * vector1.Y;
                    vector1.X = x;
                    vector1.Y = y;
                    vector1.Z = z;
                    return vector1.$clone();
                }/**
                 * Inverts the vector values.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value    The vector to invert.
                 * @return  {JuiceboxEngine.Math.Vector3}             Inverted vector.
                 */
                ,
                op_UnaryNegation: function (value) {
                    return new JuiceboxEngine.Math.Vector3.$ctor2(-value.X, -value.Y, -value.Z);
                }/**
                 * Checks if two vectors are equal.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are equal true, otherwise false.
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y && value1.Z === value2.Z;
                }/**
                 * Checks if the two vectors are not equal
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are not equal true, otherwise false.
                 */
                ,
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X || value1.Y !== value2.Y || value1.Z !== value2.Z;
                }/**
                 * Adds two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {JuiceboxEngine.Math.Vector3}              The sum of the two vectors.
                 */
                ,
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    value1.Z += value2.Z;
                    return value1.$clone();
                }/**
                 * Subtracts two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value1    The first vector, on the left side.
                 * @param   {JuiceboxEngine.Math.Vector3}    value2    The second vector, on the right side.
                 * @return  {JuiceboxEngine.Math.Vector3}              The result of the substraction between the two vectors.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    value1.Z -= value2.Z;
                    return value1.$clone();
                }/**
                 * Multiplies two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {JuiceboxEngine.Math.Vector3}              The multiplication between the given vectors.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    value1.Z *= value2.Z;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value1    The vector.
                 * @param   {number}                         scalar    The scaler value.
                 * @return  {JuiceboxEngine.Math.Vector3}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$1: function (value1, scalar) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    value1.Z *= scalar;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {number}                         scalar    The scaler value.
                 * @param   {JuiceboxEngine.Math.Vector3}    value1    The vector.
                 * @return  {JuiceboxEngine.Math.Vector3}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$2: function (scalar, value1) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    value1.Z *= scalar;
                    return value1.$clone();
                }/**
                 * Divide two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value1    The first vector, on the left side.
                 * @param   {JuiceboxEngine.Math.Vector3}    value2    The first vector, on the right side.
                 * @return  {JuiceboxEngine.Math.Vector3}              The devision between two vectors.
                 */
                ,
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    value1.Z /= value2.Z;
                    return value1.$clone();
                }/**
                 * Divide a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector3
                 * @memberof JuiceboxEngine.Math.Vector3
                 * @param   {JuiceboxEngine.Math.Vector3}    value1     The vector, on the left side.
                 * @param   {number}                         divider    The value to divide by.
                 * @return  {JuiceboxEngine.Math.Vector3}               The devision the vector and the scalar.
                 */
                ,
                op_Division$1: function (value1, divider) {
                    value1.X /= divider;
                    value1.Y /= divider;
                    value1.Z /= divider;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new JuiceboxEngine.Math.Vector3(); }
            }
        },
        fields: {
            /**
             * The X-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Vector3
             * @type number
             */
            X: 0,
            /**
             * The Y-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Vector3
             * @type number
             */
            Y: 0,
            /**
             * The Z-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Vector3
             * @type number
             */
            Z: 0
        },
        alias: ["equalsT", "System$IEquatable$1$JuiceboxEngine$Math$Vector3$equalsT"],
        ctors: {
            /**
             * Constructors 3D vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector3
             * @memberof JuiceboxEngine.Math.Vector3
             * @param   {number}    x    The X coordinate.
             * @param   {number}    y    The Y coordinate.
             * @param   {number}    z    The Z coordinate.
             * @return  {void}
             */
            $ctor2: function (x, y, z) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
            },
            /**
             * Constructs a 3D vector, all values equal to the given value.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector3
             * @memberof JuiceboxEngine.Math.Vector3
             * @param   {number}    value    The value for all axis.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
                this.Z = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Returns the length of this vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector3
             * @memberof JuiceboxEngine.Math.Vector3
             * @return  {number}        The length.
             */
            Length: function () {
                return JuiceboxEngine.Math.JMath.Sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z));
            },
            /**
             * Returns the squared length of this vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector3
             * @memberof JuiceboxEngine.Math.Vector3
             * @return  {number}        The squared length.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z);
            },
            /**
             * Makes this vector a normalized one.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector3
             * @memberof JuiceboxEngine.Math.Vector3
             * @return  {void}
             */
            Normalize: function () {
                var factor = JuiceboxEngine.Math.JMath.Sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z));
                factor = 1.0 / factor;
                this.X *= factor;
                this.Y *= factor;
                this.Z *= factor;
            },
            /**
             * Gives a string representing the vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Vector3
             * @memberof JuiceboxEngine.Math.Vector3
             * @return  {string}        String representation of this vector.
             */
            toString: function () {
                return System.String.format("Vector3({0}, {1}, {2})", this.X, this.Y, this.Z);
            },
            /**
             * Check if the vector is equal to an other vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector3
             * @memberof JuiceboxEngine.Math.Vector3
             * @param   {JuiceboxEngine.Math.Vector3}    other    The vector to check against.
             * @return  {boolean}                                 False if not equal, true if the vectors are equal.
             */
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y && this.Z === other.Z;
            },
            /**
             * Check if the vector is equal to the other object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Vector3
             * @memberof JuiceboxEngine.Math.Vector3
             * @param   {System.Object}    o    The object to check against.
             * @return  {boolean}               False if not equal, true if the vectors are equal.
             */
            equals: function (o) {
                if (H5.is(o, JuiceboxEngine.Math.Vector3)) {
                    return this.equalsT(H5.cast(o, JuiceboxEngine.Math.Vector3));
                }
                return false;
            },
            /**
             * Gets the hash code of this vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Vector3
             * @memberof JuiceboxEngine.Math.Vector3
             * @return  {number}        Hash code of this vector.
             */
            getHashCode: function () {
                var hashCode = System.Single.getHashCode(this.X);
                hashCode = (H5.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Y);
                hashCode = (H5.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Z);
                return hashCode;
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Math.Vector3();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                return s;
            }
        }
    });

    /**
     * Represents a 4 dimensional vector in space.
     *
     * @public
     * @class JuiceboxEngine.Math.Vector4
     * @implements  System.IEquatable$1
     */
    H5.define("JuiceboxEngine.Math.Vector4", {
        inherits: function () { return [System.IEquatable$1(JuiceboxEngine.Math.Vector4)]; },
        $kind: "struct",
        statics: {
            methods: {
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {number}                                   The distance between two vectors.
                 */
                Distance: function (value1, value2) {
                    return JuiceboxEngine.Math.JMath.Sqrt(JuiceboxEngine.Math.Vector4.DistanceSquared(value1.$clone(), value2.$clone()));
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {number}                                   The squared distance between two vectors.
                 */
                DistanceSquared: function (value1, value2) {
                    return (value1.W - value2.W) * (value1.W - value2.W) + (value1.X - value2.X) * (value1.X - value2.X) + (value1.Y - value2.Y) * (value1.Y - value2.Y) + (value1.Z - value2.Z) * (value1.Z - value2.Z);
                },
                /**
                 * Normalizes the given vector.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    vector    The vector to normalize.
                 * @return  {JuiceboxEngine.Math.Vector4}              A normalized vector.
                 */
                Normalize: function (vector) {
                    vector.Normalize();
                    return vector.$clone();
                },
                /**
                 * Calculates the dot product.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    vector1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector4}    vector2    The second vector.
                 * @return  {number}                                    The dot product of two vectors.
                 */
                Dot: function (vector1, vector2) {
                    return vector1.X * vector2.X + vector1.Y * vector2.Y + vector1.Z * vector2.Z + vector1.W * vector2.W;
                }/**
                 * Inverts the vector values.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value    The vector to invert.
                 * @return  {JuiceboxEngine.Math.Vector4}             Inverted vector.
                 */
                ,
                op_UnaryNegation: function (value) {
                    return new JuiceboxEngine.Math.Vector4.$ctor2(-value.X, -value.Y, -value.Z, -value.W);
                }/**
                 * Checks if two vectors are equal.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are equal true, otherwise false.
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y && value1.Z === value2.Z && value1.W === value2.W;
                }/**
                 * Checks if the two vectors are not equal
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are not equal true, otherwise false.
                 */
                ,
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X || value1.Y !== value2.Y || value1.Z !== value2.Z || value1.W !== value2.W;
                }/**
                 * Adds two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {JuiceboxEngine.Math.Vector4}              The sum of the two vectors.
                 */
                ,
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    value1.Z += value2.Z;
                    value1.W += value2.W;
                    return value1.$clone();
                }/**
                 * Subtracts two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value1    The first vector, on the left side.
                 * @param   {JuiceboxEngine.Math.Vector4}    value2    The second vector, on the right side.
                 * @return  {JuiceboxEngine.Math.Vector4}              The result of the substraction between the two vectors.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    value1.Z -= value2.Z;
                    value1.W -= value2.W;
                    return value1.$clone();
                }/**
                 * Multiplies two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceboxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {JuiceboxEngine.Math.Vector4}              The multiplication between the given vectors.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    value1.Z *= value2.Z;
                    value1.W *= value2.W;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value1    The vector.
                 * @param   {number}                         scalar    The scaler value.
                 * @return  {JuiceboxEngine.Math.Vector4}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$1: function (value1, scalar) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    value1.Z *= scalar;
                    value1.W *= scalar;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {number}                         scalar    The scaler value.
                 * @param   {JuiceboxEngine.Math.Vector4}    value1    The vector.
                 * @return  {JuiceboxEngine.Math.Vector4}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$2: function (scalar, value1) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    value1.Z *= scalar;
                    value1.W *= scalar;
                    return value1.$clone();
                }/**
                 * Divide two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value1    The first vector, on the left side.
                 * @param   {JuiceboxEngine.Math.Vector4}    value2    The first vector, on the right side.
                 * @return  {JuiceboxEngine.Math.Vector4}              The devision between two vectors.
                 */
                ,
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    value1.Z /= value2.Z;
                    value1.W /= value2.W;
                    return value1.$clone();
                }/**
                 * Divide a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Math.Vector4
                 * @memberof JuiceboxEngine.Math.Vector4
                 * @param   {JuiceboxEngine.Math.Vector4}    value1     The vector, on the left side.
                 * @param   {number}                         divider    The value to divide by.
                 * @return  {JuiceboxEngine.Math.Vector4}               The devision the vector and the scalar.
                 */
                ,
                op_Division$1: function (value1, divider) {
                    value1.X /= divider;
                    value1.Y /= divider;
                    value1.Z /= divider;
                    value1.W /= divider;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new JuiceboxEngine.Math.Vector4(); }
            }
        },
        fields: {
            /**
             * The X-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Vector4
             * @type number
             */
            X: 0,
            /**
             * The Y-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Vector4
             * @type number
             */
            Y: 0,
            /**
             * The Z-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Vector4
             * @type number
             */
            Z: 0,
            /**
             * The W-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Math.Vector4
             * @type number
             */
            W: 0
        },
        alias: ["equalsT", "System$IEquatable$1$JuiceboxEngine$Math$Vector4$equalsT"],
        ctors: {
            /**
             * Constructors 4D vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector4
             * @memberof JuiceboxEngine.Math.Vector4
             * @param   {number}    x    The X coordinate.
             * @param   {number}    y    The Y coordinate.
             * @param   {number}    z    The Z coordinate.
             * @param   {number}    w    The W coordinate.
             * @return  {void}
             */
            $ctor2: function (x, y, z, w) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
                this.W = w;
            },
            /**
             * Constructs a 4D vector, all values equal to the given value.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector4
             * @memberof JuiceboxEngine.Math.Vector4
             * @param   {number}    value    The value for all axis.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
                this.Z = value;
                this.W = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Returns the length of this vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector4
             * @memberof JuiceboxEngine.Math.Vector4
             * @return  {number}        The length.
             */
            Length: function () {
                return JuiceboxEngine.Math.JMath.Sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W));
            },
            /**
             * Returns the squared length of this vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector4
             * @memberof JuiceboxEngine.Math.Vector4
             * @return  {number}        The squared length.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W);
            },
            /**
             * Makes this vector a normalized one.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector4
             * @memberof JuiceboxEngine.Math.Vector4
             * @return  {void}
             */
            Normalize: function () {
                var factor = JuiceboxEngine.Math.JMath.Sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W));
                factor = 1.0 / factor;
                this.X *= factor;
                this.Y *= factor;
                this.Z *= factor;
                this.W *= factor;
            },
            /**
             * Gives a string representing the vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Vector4
             * @memberof JuiceboxEngine.Math.Vector4
             * @return  {string}        String representation of this vector.
             */
            toString: function () {
                return System.String.format("Vector4({0}, {1}, {2}, {3})", this.X, this.Y, this.Z, this.W);
            },
            /**
             * Check if the vector is equal to an other vector.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Math.Vector4
             * @memberof JuiceboxEngine.Math.Vector4
             * @param   {JuiceboxEngine.Math.Vector4}    other    The vector to check against.
             * @return  {boolean}                                 False if not equal, true if the vectors are equal.
             */
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y && this.Z === other.Z && this.W === other.W;
            },
            /**
             * Check if the vector is equal to the other object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Vector4
             * @memberof JuiceboxEngine.Math.Vector4
             * @param   {System.Object}    o    The object to check against.
             * @return  {boolean}               False if not equal, true if the vectors are equal.
             */
            equals: function (o) {
                if (H5.is(o, JuiceboxEngine.Math.Vector4)) {
                    return this.equalsT(H5.cast(o, JuiceboxEngine.Math.Vector4));
                }
                return false;
            },
            /**
             * Gets the hash code of this vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Math.Vector4
             * @memberof JuiceboxEngine.Math.Vector4
             * @return  {number}        Hash code of this vector.
             */
            getHashCode: function () {
                var hashCode = System.Single.getHashCode(this.X);
                hashCode = (H5.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Y);
                hashCode = (H5.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Z);
                hashCode = (H5.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.W);
                return hashCode;
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Math.Vector4();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                s.W = this.W;
                return s;
            }
        }
    });

    H5.define("JuiceboxEngine.Particles.Particle", {
        fields: {
            position: null,
            rotation: 0,
            size: null,
            sourceRectangles: null,
            particleFrames: 0,
            velocity: null,
            color: null,
            lifeTime: 0,
            totalLifeTime: 0
        },
        ctors: {
            init: function () {
                this.position = new JuiceboxEngine.Math.Vector2();
                this.size = new JuiceboxEngine.Math.Vector2();
                this.velocity = new JuiceboxEngine.Math.Vector2();
                this.color = new JuiceboxEngine.Math.Color();
            }
        }
    });

    H5.define("JuiceboxEngine.Physics.WorldP2", {
        fields: {
            _world: null,
            /**
             * Fixed time step for the simulation.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Physics.WorldP2
             * @function FixedTimeStep
             * @type number
             */
            FixedTimeStep: 0
        },
        ctors: {
            /**
             * World constructor.
             Default gravity is (0, -9.81).
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.WorldP2
             * @memberof JuiceboxEngine.Physics.WorldP2
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                var config = { };
                config.gravity = System.Array.init([0, -9.81], System.Double);

                this.FixedTimeStep = 0.016666668;

                this._world = new (H5.virtualc("p2.World"))(config);

                this._world.on("beginContact", H5.fn.bind(this, function () {
                    this.BeginContact(this._world.beginContactEvent.bodyA, this._world.beginContactEvent.bodyB);
                }), null);
                this._world.on("endContact", H5.fn.bind(this, function () {
                    this.EndContact(this._world.endContactEvent.bodyA, this._world.endContactEvent.bodyB);
                }), null);
            }
        },
        methods: {
            BeginContact: function (bodyA, bodyB) {
                var bodyP2A = bodyA.bodyp2;
                var bodyP2B = bodyB.bodyp2;

                bodyP2A.StartCollision(bodyP2B);
                bodyP2B.StartCollision(bodyP2A);
            },
            EndContact: function (bodyA, bodyB) {
                var bodyP2A = bodyA.bodyp2;
                var bodyP2B = bodyB.bodyp2;

                bodyP2A.EndCollision(bodyP2B);
                bodyP2B.EndCollision(bodyP2A);
            },
            AddBody: function (body) {
                this._world.addBody(body.body);
            },
            HitTest: function (position) {
                var pos = System.Array.init([position.X, position.Y], System.Double);

                var bodies = this._world.hitTest(pos, this._world.bodies, 0.0);

                if (bodies.length > 0) {
                    bodies[0].bodyp2.MouseHover();
                }
            },
            /**
             * Set the global world gravity.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.WorldP2
             * @memberof JuiceboxEngine.Physics.WorldP2
             * @param   {JuiceboxEngine.Math.Vector2}    gravity
             * @return  {void}
             */
            SetGravity: function (gravity) {
                this._world.gravity = System.Array.init([gravity.X, gravity.Y], System.Double);
            },
            /**
             * Simulate the world and all its bodies.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.WorldP2
             * @memberof JuiceboxEngine.Physics.WorldP2
             * @return  {void}
             */
            Update: function () {
                this._world.step(this.FixedTimeStep);
            }
        }
    });

    /** @namespace JuiceboxEngine.Playfab */

    /**
     * Leaderboard class, containing general leaderboard info and entries.
     *
     * @public
     * @class JuiceboxEngine.Playfab.Leaderboard
     */
    H5.define("JuiceboxEngine.Playfab.Leaderboard", {
        fields: {
            /**
             * Leaderboard entries.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.Leaderboard
             * @function Entries
             * @type System.Collections.Generic.List$1
             */
            Entries: null,
            /**
             * Name of the leaderboard statistic.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.Leaderboard
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * Indicates if this leaderboard has retrieved any data.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.Leaderboard
             * @function HasLeaderboardData
             * @type boolean
             */
            HasLeaderboardData: false,
            /**
             * Leaderboard start position.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.Leaderboard
             * @function StartPosition
             * @type number
             */
            StartPosition: 0,
            /**
             * Maximum results in the leaderboard.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.Leaderboard
             * @function MaxResults
             * @type number
             */
            MaxResults: 0,
            /**
             * Next leaderboard reset.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.Leaderboard
             * @function NextReset
             * @type System.DateTime
             */
            NextReset: null,
            /**
             * Indicates whether or not this leaderboard will reset.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.Leaderboard
             * @function WillReset
             * @type boolean
             */
            WillReset: false
        },
        ctors: {
            init: function () {
                this.NextReset = System.DateTime.getDefaultValue();
            },
            /**
             * Leaderboard constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.Leaderboard
             * @memberof JuiceboxEngine.Playfab.Leaderboard
             * @param   {string}    statisticName    Statistics name as in Playfab.
             * @param   {number}    startPos         Start position to get leaderboard data from.
             * @param   {number}    amount           Amount of entries to get.
             * @return  {void}
             */
            ctor: function (statisticName, startPos, amount) {
                this.$initialize();
                this.Name = statisticName;
                this.HasLeaderboardData = false;
                this.StartPosition = startPos;
                this.MaxResults = amount;

                this.WillReset = false;

                this.Entries = new (System.Collections.Generic.List$1(JuiceboxEngine.Playfab.LeaderboardEntry)).ctor();
            }
        }
    });

    /**
     * Leaderboard entry, part of a leaderboard.
     *
     * @public
     * @class JuiceboxEngine.Playfab.LeaderboardEntry
     */
    H5.define("JuiceboxEngine.Playfab.LeaderboardEntry", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new JuiceboxEngine.Playfab.LeaderboardEntry(); }
            }
        },
        fields: {
            /**
             * User display name.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.LeaderboardEntry
             * @type string
             */
            displayName: null,
            /**
             * User Playfab ID.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.LeaderboardEntry
             * @type string
             */
            playfabId: null,
            /**
             * Position in the leaderboard.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.LeaderboardEntry
             * @type number
             */
            position: 0,
            /**
             * Value of the stat.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.LeaderboardEntry
             * @type number
             */
            value: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = H5.addHash([6754582144, this.displayName, this.playfabId, this.position, this.value]);
                return h;
            },
            equals: function (o) {
                if (!H5.is(o, JuiceboxEngine.Playfab.LeaderboardEntry)) {
                    return false;
                }
                return H5.equals(this.displayName, o.displayName) && H5.equals(this.playfabId, o.playfabId) && H5.equals(this.position, o.position) && H5.equals(this.value, o.value);
            },
            $clone: function (to) {
                var s = to || new JuiceboxEngine.Playfab.LeaderboardEntry();
                s.displayName = this.displayName;
                s.playfabId = this.playfabId;
                s.position = this.position;
                s.value = this.value;
                return s;
            }
        }
    });

    /**
     * Playfab news item.
     *
     * @public
     * @class JuiceboxEngine.Playfab.NewsItem
     */
    H5.define("JuiceboxEngine.Playfab.NewsItem", {
        fields: {
            /**
             * News item title.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.NewsItem
             * @function Title
             * @type string
             */
            Title: null,
            /**
             * News item body.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.NewsItem
             * @function Body
             * @type string
             */
            Body: null,
            /**
             * News item id.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.NewsItem
             * @function NewsId
             * @type string
             */
            NewsId: null,
            /**
             * News item timestamp.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.NewsItem
             * @function Timestamp
             * @type string
             */
            Timestamp: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.NewsItem
             * @memberof JuiceboxEngine.Playfab.NewsItem
             * @param   {object}    json    News item json from the server.
             * @return  {void}
             */
            ctor: function (json) {
                this.$initialize();
                this.Title = json.Title;
                this.Body = json.Body;
                this.NewsId = json.NewsId;
                this.Timestamp = json.Timestamp;
            }
        }
    });

    /**
     * Deals with Playfab authorization. 
     Takes care of the {@link }.
     *
     * @public
     * @class JuiceboxEngine.Playfab.PlayfabIdentity
     */
    H5.define("JuiceboxEngine.Playfab.PlayfabIdentity", {
        fields: {
            /**
             * Logged in or not.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabIdentity
             * @function LoggedIn
             * @type boolean
             */
            LoggedIn: false,
            /**
             * Player user name, if logged in. {@link }
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabIdentity
             * @function Username
             * @type string
             */
            Username: null,
            /**
             * Player Playfab ID, if logged in. {@link }
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabIdentity
             * @function PlayfabId
             * @type string
             */
            PlayfabId: null,
            /**
             * Task that gets the user profile after signing in.
             Player profile data can be retrieved here if it succeeds.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabIdentity
             * @function GetDisplayNameTask
             * @type JuiceboxEngine.Playfab.PlayfabTask
             */
            GetDisplayNameTask: null,
            /**
             * Task that is used for login or register.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabIdentity
             * @function LoginTask
             * @type JuiceboxEngine.Playfab.PlayfabTask
             */
            LoginTask: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabIdentity
             * @memberof JuiceboxEngine.Playfab.PlayfabIdentity
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.LoggedIn = false;
                this.Username = "";
                this.PlayfabId = "";
            }
        },
        methods: {
            /**
             * Login witn a custom ID.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabIdentity
             * @memberof JuiceboxEngine.Playfab.PlayfabIdentity
             * @param   {string}                                ID               The custom ID.
             * @param   {boolean}                               createAccount    Create a new account?
             * @return  {JuiceboxEngine.Playfab.PlayfabTask}
             */
            LoginWithCustomID: function (ID, createAccount) {
                var request = { };
                request.CreateAccount = createAccount;
                request.CustomId = ID;
                request.TitleId = JuiceboxEngine.Playfab.PlayfabManager.TitleId;

                var task = new JuiceboxEngine.Playfab.PlayfabTask();
                task.addOnTaskCompleted(H5.fn.cacheBind(this, this.OnLoginWithCustomIDComplete));

                JuiceboxEngine.Playfab.PlayfabManager.PlayfabClient.LoginWithCustomID(request, task.callback);

                this.LoginTask = task;
                return task;
            },
            OnLoginWithCustomIDComplete: function (task) {
                if (task.Success) {
                    this.LoggedIn = true;
                    this.Username = "";
                    this.PlayfabId = task.Response.PlayFabId;
                }

                this.GetDisplayNameTask = this.GetDisplayName(this.PlayfabId);
                this.GetDisplayNameTask.addOnTaskCompleted(H5.fn.cacheBind(this, this.OnGetDisplayNameCompleted));
            },
            OnGetDisplayNameCompleted: function (task) {
                if (task.Success) {
                    this.Username = task.Response.InfoResultPayload.AccountInfo.TitleInfo.DisplayName;
                }
            },
            /**
             * Register a new player.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabIdentity
             * @memberof JuiceboxEngine.Playfab.PlayfabIdentity
             * @param   {string}                                username    Player unique username.
             * @param   {string}                                email       Player unique email.
             * @param   {string}                                password    Player password.
             * @return  {JuiceboxEngine.Playfab.PlayfabTask}
             */
            RegisterPlayer: function (username, email, password) {
                var request = { };
                request.Email = email;
                request.DisplayName = username;
                request.Password = password;
                request.TitleId = JuiceboxEngine.Playfab.PlayfabManager.TitleId;
                request.Username = username;

                var task = new JuiceboxEngine.Playfab.PlayfabTask();
                task.addOnTaskCompleted(H5.fn.cacheBind(this, this.OnRegisterPlayerComplete));

                JuiceboxEngine.Playfab.PlayfabManager.PlayfabClient.RegisterPlayFabUser(request, task.callback);

                this.LoginTask = task;
                return task;
            },
            OnRegisterPlayerComplete: function (task) {
                if (task.Success) {
                    this.LoggedIn = true;
                    this.Username = task.Response.Username;
                    this.PlayfabId = task.Response.PlayFabId;
                }
            },
            /**
             * Update the logged in user display name.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabIdentity
             * @memberof JuiceboxEngine.Playfab.PlayfabIdentity
             * @param   {string}                                displayName    The new display name.
             * @return  {JuiceboxEngine.Playfab.PlayfabTask}
             */
            UpdateDisplayName: function (displayName) {
                var request = { };
                request.DisplayName = displayName;

                var task = new JuiceboxEngine.Playfab.PlayfabTask();
                task.addOnTaskCompleted(H5.fn.cacheBind(this, this.OnUpdateDisplayNameComplete));

                JuiceboxEngine.Playfab.PlayfabManager.PlayfabClient.UpdateUserTitleDisplayName(request, task.callback);
                return task;
            },
            OnUpdateDisplayNameComplete: function (task) {
                if (task.Success) {
                    this.Username = task.Response.DisplayName;
                }
            },
            /**
             * Get the display name from a PlayfabID.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabIdentity
             * @memberof JuiceboxEngine.Playfab.PlayfabIdentity
             * @param   {string}                                playfabID    The Playfab ID to get the display name for.
             * @return  {JuiceboxEngine.Playfab.PlayfabTask}
             */
            GetDisplayName: function (playfabID) {
                var request = { };
                request.PlayFabId = playfabID;

                request.InfoRequestParameters = { };
                request.InfoRequestParameters.GetUserAccountInfo = true;

                var task = new JuiceboxEngine.Playfab.PlayfabTask();

                JuiceboxEngine.Playfab.PlayfabManager.PlayfabClient.GetPlayerCombinedInfo(request, task.callback);
                return task;
            }
        }
    });

    /**
     * Playfab leaderboard management.
     *
     * @public
     * @class JuiceboxEngine.Playfab.PlayfabLeaderboard
     */
    H5.define("JuiceboxEngine.Playfab.PlayfabLeaderboard", {
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabLeaderboard
             * @memberof JuiceboxEngine.Playfab.PlayfabLeaderboard
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();

            }
        },
        methods: {
            SetLeaderboardEntry: function (leaderboardNames, values) {
                var request = { };
                request.Statistics = System.Array.init(leaderboardNames.length, null, System.Object);

                for (var i = 0; i < leaderboardNames.length; i = (i + 1) | 0) {
                    request.Statistics[i] = { };
                    request.Statistics[i].StatisticName = leaderboardNames[i];
                    request.Statistics[i].Value = values[i];
                }

                var task = new JuiceboxEngine.Playfab.PlayfabTask();

                JuiceboxEngine.Playfab.PlayfabManager.PlayfabClient.UpdatePlayerStatistics(request, task.callback);

                return task;
            },
            /**
             * Start retrieving leaderboard data.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabLeaderboard
             * @memberof JuiceboxEngine.Playfab.PlayfabLeaderboard
             * @param   {string}                                           leaderboardName    The name of the statistic to get.
             * @param   {number}                                           startPos           Position in the leaderboard to start listing from.
             * @param   {number}                                           maxCount           Maximum amount of entries to retrieve. Maximum is 100.
             * @return  {JuiceboxEngine.Playfab.PlayfabTaskLeaderboard}                       Leaderboard, with no entries. On
             */
            GetLeaderboard: function (leaderboardName, startPos, maxCount) {
                var request = { };
                request.MaxResultsCount = maxCount;
                request.StartPosition = startPos;
                request.StatisticName = leaderboardName;

                var leaderboard = new JuiceboxEngine.Playfab.Leaderboard(leaderboardName, startPos, maxCount);

                var task = new JuiceboxEngine.Playfab.PlayfabTaskLeaderboard(leaderboard);
                task.addOnTaskCompleted(H5.fn.cacheBind(this, this.OnGetLeaderboardComplete));

                JuiceboxEngine.Playfab.PlayfabManager.PlayfabClient.GetLeaderboard(request, task.callback);

                return task;
            },
            OnGetLeaderboardComplete: function (task) {
                var $t;
                if (task.Success) {
                    var leaderboardTask = H5.as(task, JuiceboxEngine.Playfab.PlayfabTaskLeaderboard);

                    $t = H5.getEnumerator(task.Response.Leaderboard);
                    try {
                        while ($t.moveNext()) {
                            var entry = H5.cast($t.Current, System.Object);
                            var leaderboardEntry = new JuiceboxEngine.Playfab.LeaderboardEntry();
                            leaderboardEntry.displayName = entry.DisplayName;
                            leaderboardEntry.playfabId = entry.PlayFabId;
                            leaderboardEntry.position = (entry.Position + 1) | 0;
                            leaderboardEntry.value = entry.StatValue;

                            leaderboardTask.Leaderboard.Entries.add(leaderboardEntry.$clone());
                        }
                    } finally {
                        if (H5.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }

                    if (task.Response.NextReset != null) {
                        leaderboardTask.Leaderboard.NextReset = System.Convert.toDateTime(task.Response.NextReset);
                        leaderboardTask.Leaderboard.WillReset = true;
                    }
                }
            }
        }
    });

    /**
     * Playfab manager.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Playfab.PlayfabManager
     */
    H5.define("JuiceboxEngine.Playfab.PlayfabManager", {
        statics: {
            fields: {
                /**
                 * Playfab title ID.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Playfab.PlayfabManager
                 * @type string
                 */
                TitleId: null,
                /**
                 * Playfab identity management.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Playfab.PlayfabManager
                 * @function Identity
                 * @type JuiceboxEngine.Playfab.PlayfabIdentity
                 */
                Identity: null,
                /**
                 * Playfab title news.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Playfab.PlayfabManager
                 * @function TitleNews
                 * @type JuiceboxEngine.Playfab.PlayfabTitleNews
                 */
                TitleNews: null,
                /**
                 * Playfab leaderboards.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Playfab.PlayfabManager
                 * @function Leaderboard
                 * @type JuiceboxEngine.Playfab.PlayfabLeaderboard
                 */
                Leaderboard: null,
                /**
                 * Session ticket if logged in.
                 *
                 * @static
                 * @memberof JuiceboxEngine.Playfab.PlayfabManager
                 * @function SessionTicket
                 * @type string
                 */
                SessionTicket: null,
                PlayfabClient: null
            },
            ctors: {
                ctor: function () {
                    if (System.String.isNullOrEmpty(JuiceboxEngine.Util.Config.ConfigValues.PlayfabTitleID)) {
                        System.Console.WriteLine("No valid PlayfabTitleID set in config.");
                        return;
                    }

                    JuiceboxEngine.Playfab.PlayfabManager.TitleId = JuiceboxEngine.Util.Config.ConfigValues.PlayfabTitleID;
                    window.PlayFab.settings.titleId = JuiceboxEngine.Playfab.PlayfabManager.TitleId;

                    JuiceboxEngine.Playfab.PlayfabManager.PlayfabClient = window.PlayFabClientSDK;

                    JuiceboxEngine.Playfab.PlayfabManager.Identity = new JuiceboxEngine.Playfab.PlayfabIdentity();
                    JuiceboxEngine.Playfab.PlayfabManager.TitleNews = new JuiceboxEngine.Playfab.PlayfabTitleNews();
                    JuiceboxEngine.Playfab.PlayfabManager.Leaderboard = new JuiceboxEngine.Playfab.PlayfabLeaderboard();
                }
            }
        }
    });

    /**
     * @memberof JuiceboxEngine.Playfab
     * @callback JuiceboxEngine.Playfab.PlayfabTask.TaskCompletedDelegate
     * @param   {JuiceboxEngine.Playfab.PlayfabTask}    task
     * @return  {void}
     */

    /**
     * @memberof JuiceboxEngine.Playfab
     * @callback JuiceboxEngine.Playfab.InternalPlayfabResponse
     * @param   {object}    result    
     * @param   {object}    error
     * @return  {void}
     */

    /**
     * Class managing async Playfab calls.
     *
     * @public
     * @class JuiceboxEngine.Playfab.PlayfabTask
     */
    H5.define("JuiceboxEngine.Playfab.PlayfabTask", {
        fields: {
            /**
             * Indicates if the task has finished or not.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabTask
             * @function Finished
             * @type boolean
             */
            Finished: false,
            /**
             * Indicates if the task was successful.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabTask
             * @function Success
             * @type boolean
             */
            Success: false,
            /**
             * Response from PlayFab. If {@link } is false, it will be the error body.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabTask
             * @function Response
             * @type object
             */
            Response: null,
            /**
             * Error message if available.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabTask
             * @function ErrorMessage
             * @type string
             */
            ErrorMessage: null,
            /**
             * Callback for this task.
             *
             * @instance
             * @memberof JuiceboxEngine.Playfab.PlayfabTask
             * @type JuiceboxEngine.Playfab.InternalPlayfabResponse
             */
            callback: null
        },
        events: {
            /**
             * Task completed event.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabTask
             * @memberof JuiceboxEngine.Playfab.PlayfabTask
             * @function addOnTaskCompleted
             * @param   {JuiceboxEngine.Playfab.PlayfabTask.TaskCompletedDelegate}    value
             * @return  {void}
             */
            /**
             * Task completed event.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabTask
             * @memberof JuiceboxEngine.Playfab.PlayfabTask
             * @function removeOnTaskCompleted
             * @param   {JuiceboxEngine.Playfab.PlayfabTask.TaskCompletedDelegate}    value
             * @return  {void}
             */
            OnTaskCompleted: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabTask
             * @memberof JuiceboxEngine.Playfab.PlayfabTask
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.Finished = false;
                this.Success = false;
                this.callback = H5.fn.cacheBind(this, this.TaskFinished);
            }
        },
        methods: {
            TaskFinished: function (response, error) {
                if (error == null) {
                    this.Response = response.data;
                    this.FinishTask(true);
                } else {
                    this.Response = error;
                    this.ErrorMessage = error.errorMessage;
                    this.FinishTask(false);
                }
            },
            /**
             * Finish task.
             *
             * @instance
             * @this JuiceboxEngine.Playfab.PlayfabTask
             * @memberof JuiceboxEngine.Playfab.PlayfabTask
             * @param   {boolean}    success    Did the task succeed?
             * @return  {void}
             */
            FinishTask: function (success) {
                this.Finished = true;
                this.Success = success;

                !H5.staticEquals(this.OnTaskCompleted, null) ? this.OnTaskCompleted(this) : null;
            }
        }
    });

    /**
     * @memberof JuiceboxEngine.Playfab
     * @callback JuiceboxEngine.Playfab.OnPlayfabResponse
     * @param   {boolean}    success     
     * @param   {object}     response    
     * @param   {string}     error
     * @return  {void}
     */

    /**
     * Retrieves title news.
     *
     * @public
     * @class JuiceboxEngine.Playfab.PlayfabTitleNews
     */
    H5.define("JuiceboxEngine.Playfab.PlayfabTitleNews", {
        fields: {
            /**
             * Indicates if news has been downloaded before.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabTitleNews
             * @function Downloaded
             * @type boolean
             */
            Downloaded: false,
            NewsItems: null
        },
        events: {
            /**
             * Called on {@link } response.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabTitleNews
             * @memberof JuiceboxEngine.Playfab.PlayfabTitleNews
             * @function addOnGetTitleNews
             * @param   {JuiceboxEngine.Playfab.OnPlayfabResponse}    value
             * @return  {void}
             */
            /**
             * Called on {@link } response.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabTitleNews
             * @memberof JuiceboxEngine.Playfab.PlayfabTitleNews
             * @function removeOnGetTitleNews
             * @param   {JuiceboxEngine.Playfab.OnPlayfabResponse}    value
             * @return  {void}
             */
            OnGetTitleNews: null
        },
        ctors: {
            /**
             * Title news constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabTitleNews
             * @memberof JuiceboxEngine.Playfab.PlayfabTitleNews
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.Downloaded = false;
                this.NewsItems = new (System.Collections.Generic.List$1(JuiceboxEngine.Playfab.NewsItem)).ctor();
            }
        },
        methods: {
            /**
             * Download title news.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabTitleNews
             * @memberof JuiceboxEngine.Playfab.PlayfabTitleNews
             * @param   {number}    count    Amount of news items.
             * @return  {void}
             */
            GetTitleNews: function (count) {
                var request = { };
                request.Count = count;

                var callback = H5.fn.cacheBind(this, this.OnGetTitleNewsComplete);
                window.PlayFabClientSDK.GetTitleNews(request, callback);
            },
            OnGetTitleNewsComplete: function (result, error) {
                var $t;
                if (error != null) {
                    !H5.staticEquals(this.OnGetTitleNews, null) ? this.OnGetTitleNews(false, error, error.errorDetails) : null;
                    return;
                }

                this.NewsItems = new (System.Collections.Generic.List$1(JuiceboxEngine.Playfab.NewsItem)).ctor();

                $t = H5.getEnumerator(result.data.News);
                try {
                    while ($t.moveNext()) {
                        var item = H5.cast($t.Current, System.Object);
                        this.NewsItems.add(new JuiceboxEngine.Playfab.NewsItem(item));
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                !H5.staticEquals(this.OnGetTitleNews, null) ? this.OnGetTitleNews(true, result, null) : null;
                this.Downloaded = true;
            }
        }
    });

    H5.define("JuiceboxEngine.Resources.Preloader", {
        fields: {
            _resources: null,
            /**
             * Items to preload.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Resources.Preloader
             * @function ToPreload
             * @type number
             */
            ToPreload: 0,
            /**
             * Items preloaded.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Resources.Preloader
             * @function Preloaded
             * @type number
             */
            Preloaded: 0,
            /**
             * Indicates is the preloader is still loading.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Resources.Preloader
             * @function Busy
             * @type boolean
             */
            Busy: false,
            /**
             * The resource that is being loaded now.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Resources.Preloader
             * @function ResourceLoading
             * @type string
             */
            ResourceLoading: null
        },
        methods: {
            /**
             * Preload items from a string collection.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Resources.Preloader
             * @memberof JuiceboxEngine.Resources.Preloader
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager    
             * @param   {Array.<string>}                              files
             * @return  {void}
             */
            Preload: function (resourceManager, files) {
                if (this.Busy) {
                    System.Console.WriteLine("Already preloading!");
                    return;
                }

                this.Busy = true;

                this.PreloadItems(resourceManager, files);

                this.Busy = false;
            },
            /**
             * Preload as a coroutine.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Resources.Preloader
             * @memberof JuiceboxEngine.Resources.Preloader
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager    
             * @param   {Array.<string>}                              files
             * @return  {System.Collections.IEnumerator}
             */
            PreloadCoroutine: function (resourceManager, files) {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $t,
                    s,
                    resource,
                    time,
                    $async_e;

                var $enumerator = new H5.GeneratorEnumerator(H5.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    this._resources = new (System.Collections.Generic.List$1(JuiceboxEngine.Resources.IResource)).ctor();

                                        this.ToPreload = files.length;

                                        this.Busy = true;

                                        $t = H5.getEnumerator(files);
                                        $step = 1;
                                        continue;
                                }
                                case 1: {
                                    if ($t.moveNext()) {
                                            s = { v : $t.Current };
                                            $step = 2;
                                            continue;
                                        }
                                    $step = 4;
                                    continue;
                                }
                                case 2: {
                                    this.ResourceLoading = s.v;
                                        this.Preloaded = (this.Preloaded + 1) | 0;

                                        resource = { v : resourceManager.Load$1(s.v) };

                                        time = { v : 0 };

                                        $enumerator.current = new JuiceboxEngine.Coroutines.WaitUntilTrue((function ($me, time, s, resource) {
                                            return function () {
                                                time.v += JuiceboxEngine.Util.Time.DeltaTimeRealTime;

                                                if (time.v > 5.0) {
                                                    System.Console.WriteLine(System.String.format("{0} took too long to pre-load, skipping it for now.", [s.v]));
                                                    return true;
                                                }

                                                return resource.v.JuiceboxEngine$Resources$IResource$Loaded;
                                            };
                                        })(this, time, s, resource));
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    $step = 1;
                                    continue;
                                }
                                case 4: {
                                    this.Busy = false;

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
            PreloadItems: function (resourceManager, files) {
                var $t;
                this._resources = new (System.Collections.Generic.List$1(JuiceboxEngine.Resources.IResource)).ctor();

                this.ToPreload = files.length;

                $t = H5.getEnumerator(files);
                try {
                    while ($t.moveNext()) {
                        var s = $t.Current;
                        System.Console.WriteLine("Preloading " + (s || ""));
                        var resource = resourceManager.Load$1(s);
                        this.Preloaded = (this.Preloaded + 1) | 0;
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        }
    });

    /**
     * The resource manager. Multiple can exists, and they all need loaders.
     *
     * @public
     * @class JuiceboxEngine.Resources.ResourceManager
     */
    H5.define("JuiceboxEngine.Resources.ResourceManager", {
        fields: {
            _resources: null,
            _resourceManagers: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Resources.ResourceManager
             * @memberof JuiceboxEngine.Resources.ResourceManager
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this._resources = new (System.Collections.Generic.Dictionary$2(System.String,JuiceboxEngine.Resources.IResource)).ctor();
                this._resourceManagers = new (System.Collections.Generic.Dictionary$2(System.String,JuiceboxEngine.Resources.ResourceLoader)).ctor();
            }
        },
        methods: {
            /**
             * Register an resource manager.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Resources.ResourceManager
             * @memberof JuiceboxEngine.Resources.ResourceManager
             * @param   {JuiceboxEngine.Resources.ResourceLoader}    manager    The resource manager to register.
             * @return  {void}
             */
            RegisterResourceManager: function (manager) {
                this._resourceManagers.add(manager.Extension, manager);

            },
            /**
             * Load a resource with the registered {@link }s.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Resources.ResourceManager
             * @memberof JuiceboxEngine.Resources.ResourceManager
             * @param   {Function}    T       The type to load.
             * @param   {string}      path    The path to the resource with extension.
             * @return  {T}                   Null if it could not be loaded, or the loaded resource.
             */
            Load: function (T, path) {
                return H5.cast(this.Load$1(path), T);
            },
            /**
             * Load a resource with all registered {@link }s.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Resources.ResourceManager
             * @memberof JuiceboxEngine.Resources.ResourceManager
             * @param   {string}                                path    The path to the resource with extension.
             * @return  {JuiceboxEngine.Resources.IResource}            Null if it could not be loaded, or the loaded resource.
             */
            Load$1: function (path) {
                var $t;
                if (this._resources.containsKey(path)) {
                    return this._resources.getItem(path);
                }

                try {
                    var extension = ($t = System.String.split(path, [46].map(function (i) {{ return String.fromCharCode(i); }})))[1];
                    var resource = this._resourceManagers.getItem(extension).Load(path);

                    if (resource == null) {
                        throw new System.Exception("File " + (path || "") + " not found!");
                    }

                    this._resources.add(path, resource);

                    return resource;
                } catch (e) {
                    e = System.Exception.create(e);
                    System.Console.WriteLine("Unable to load " + (path || "") + ", reason: " + (H5.toString(e) || ""));
                }

                return null;
            }
        }
    });

    /**
     * A scene with gameobjects.
     *
     * @abstract
     * @public
     * @class JuiceboxEngine.Scene
     */
    H5.define("JuiceboxEngine.Scene", {
        fields: {
            /**
             * All Gameobjects of this scene are stored here.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Scene
             * @type System.Collections.Generic.List$1
             */
            _objects: null,
            /**
             * All camera components of the scene are cached here.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Scene
             * @type System.Collections.Generic.List$1
             */
            _cameras: null,
            /**
             * This scene's spritebatch.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Scene
             * @type JuiceboxEngine.Graphics.Spritebatch
             */
            _spritebatch: null,
            /**
             * The default camera of this scene.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Scene
             * @function DefaultCamera
             * @type JuiceboxEngine.Camera
             */
            DefaultCamera: null,
            /**
             * The resource manager for this scene.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Scene
             * @function ResourceManager
             * @type JuiceboxEngine.Resources.ResourceManager
             */
            ResourceManager: null,
            /**
             * UI root of this scene.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Scene
             * @function GUI
             * @type JuiceboxEngine.GUI.UserInterface
             */
            GUI: null,
            /**
             * The scene manager this scene is managed by.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Scene
             * @function SceneManager
             * @type JuiceboxEngine.SceneManager
             */
            SceneManager: null,
            /**
             * World doing the physics simulation.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Scene
             * @type JuiceboxEngine.Physics.WorldP2
             */
            PhysicsWorld: null
        },
        ctors: {
            /**
             * Default constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Scene
             * @memberof JuiceboxEngine.Scene
             * @param   {JuiceboxEngine.Resources.ResourceManager}    manager
             * @return  {void}
             */
            ctor: function (manager) {
                this.$initialize();
                this._objects = new (System.Collections.Generic.List$1(JuiceboxEngine.GameObject)).ctor();
                this._cameras = new (System.Collections.Generic.List$1(JuiceboxEngine.Camera)).ctor();

                this.ResourceManager = manager;
                this.GUI = new JuiceboxEngine.GUI.UserInterface(this.ResourceManager);

                this.PhysicsWorld = new JuiceboxEngine.Physics.WorldP2();

                var cameraObj = this.AddGameObject$1("Camera");
                this.DefaultCamera = cameraObj.AddComponent(JuiceboxEngine.Camera);
                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor3(0.1, 0.1, 0.1, 1.0);
            }
        },
        methods: {
            /**
             * Add an empty gameobject to the scene.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Scene
             * @memberof JuiceboxEngine.Scene
             * @return  {JuiceboxEngine.GameObject}        The created gameobject.
             */
            AddGameObject: function () {
                return this.AddGameObject$1("Gameobject");
            },
            /**
             * Add an empty gameobject to the scene.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Scene
             * @memberof JuiceboxEngine.Scene
             * @param   {string}                       name    Name of the object.
             * @return  {JuiceboxEngine.GameObject}            The created gameobject.
             */
            AddGameObject$1: function (name) {
                var obj = new JuiceboxEngine.GameObject.$ctor1(this, name);
                this._objects.add(obj);

                return obj;
            },
            /**
             * Remove gameobject from scene.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Scene
             * @memberof JuiceboxEngine.Scene
             * @param   {JuiceboxEngine.GameObject}    obj
             * @return  {void}
             */
            DestroyGameObject: function (obj) {
                if (this._objects.contains(obj)) {
                    obj.Destroy();
                    this._objects.remove(obj);
                }
            },
            /**
             * Get an object by name.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Scene
             * @memberof JuiceboxEngine.Scene
             * @param   {string}                       name    The name of the object.
             * @return  {JuiceboxEngine.GameObject}            The object with the given name, null if no object was found.
             */
            GetObjectByName: function (name) {
                return System.Linq.Enumerable.from(this._objects, JuiceboxEngine.GameObject).where(function (x) {
                        return System.String.equals(x.Name, name);
                    }).firstOrDefault(null, null);
            },
            /**
             * Register a camera to the scene. (this is done automaticly by GameObject).
             *
             * @instance
             * @this JuiceboxEngine.Scene
             * @memberof JuiceboxEngine.Scene
             * @param   {JuiceboxEngine.Camera}    cam
             * @return  {void}
             */
            AddCamera: function (cam) {
                this._cameras.add(cam);
            },
            /**
             * Called on the start of the scene.
             *
             * @instance
             * @this JuiceboxEngine.Scene
             * @memberof JuiceboxEngine.Scene
             * @return  {void}
             */
            Start: function () {
                this._spritebatch = new JuiceboxEngine.Graphics.Spritebatch(this.ResourceManager);
                this.InitializeScene();
            },
            /**
             * Destroy the scene and all its game objects.
             *
             * @instance
             * @this JuiceboxEngine.Scene
             * @memberof JuiceboxEngine.Scene
             * @return  {void}
             */
            Destroy: function () {
                for (var i = 0; i < this._objects.Count; i = (i + 1) | 0) {
                    this._objects.getItem(i).Destroy();
                }

                this._objects.clear();

                this.FinalizeScene();
            },
            /**
             * Update the scene, and all of its gameobjects.
             *
             * @instance
             * @this JuiceboxEngine.Scene
             * @memberof JuiceboxEngine.Scene
             * @return  {void}
             */
            UpdateScene: function () {
                this.PreUpdate();

                var obj = null;

                for (var i = 0; i < this._objects.Count; i = (i + 1) | 0) {
                    obj = this._objects.getItem(i);
                    if (obj.Enabled) {
                        obj.Update();
                    }
                }

                this.GUI.HandleMouse(JuiceboxEngine.Math.Vector2.op_Multiply(JuiceboxEngine.Input.InputManager.Instance.MousePosition.$clone(), new JuiceboxEngine.Math.Vector2.$ctor3(JuiceboxEngine.Graphics.GraphicsManager.Instance.Width, JuiceboxEngine.Graphics.GraphicsManager.Instance.Height)));

                this.PhysicsWorld.Update();

                this.PhysicsWorld.HitTest(this.DefaultCamera.ScreenPointToWorld(JuiceboxEngine.Input.InputManager.Instance.MousePosition.$clone()));

                this.LateUpdate();
            },
            /**
             * Render the scene.
             *
             * @instance
             * @this JuiceboxEngine.Scene
             * @memberof JuiceboxEngine.Scene
             * @return  {void}
             */
            RenderScene: function () {
                var $t;
                var context = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context;

                for (var i = 0; i < this._cameras.Count; i = (i + 1) | 0) {
                    var cam = this._cameras.getItem(i);

                    if (!cam.Enabled) {
                        continue;
                    }

                    context.SetRenderTarget(cam.Target);

                    if (cam.Clear) {
                        context.Clear(cam.ClearColor.$clone());
                    }

                    var transform = cam.Parent.Transform;

                    context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.VIEW, cam.ViewMatrix.$clone());
                    context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.PROJ, cam.ProjMatrix.$clone());
                    context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.CAMERAPOSITION, transform.Position.$clone());
                    context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.ZOOM, cam.Zoom);

                    this._spritebatch.Begin(cam.Frustum.$clone());

                    $t = H5.getEnumerator(this._objects);
                    try {
                        while ($t.moveNext()) {
                            var go = $t.Current;
                            if (go.Enabled) {
                                go.Render(this._spritebatch);
                            }
                        }
                    } finally {
                        if (H5.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }

                    this._spritebatch.End();

                    JuiceboxEngine.Debugging.DebugRenderer.Instance.RenderDebugLines();
                }

                context.SetRenderTarget(null);

                JuiceboxEngine.Graphics.GraphicsManager.Instance.RenderCamera(this.DefaultCamera, this);

                if (!this.SceneManager.Fading) {
                    this.GUI.RenderUserInterface();
                    JuiceboxEngine.Debugging.DebugRenderer.InstanceGUI.RenderDebugLines();
                }
            }
        }
    });

    /**
     * Manages scene loading and transitions.
     *
     * @public
     * @class JuiceboxEngine.SceneManager
     */
    H5.define("JuiceboxEngine.SceneManager", {
        fields: {
            /**
             * The target scene (while switching scenes)
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.SceneManager
             * @type JuiceboxEngine.Scene
             */
            _target: null,
            /**
             * The fade in texture, used to animate fades.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.SceneManager
             * @function FadeInTexture
             * @type JuiceboxEngine.Graphics.Texture2D
             */
            FadeInTexture: null,
            /**
             * The fade out texture, used to animate fades.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.SceneManager
             * @function FadeOutTexture
             * @type JuiceboxEngine.Graphics.Texture2D
             */
            FadeOutTexture: null,
            /**
             * Set the fade in duration.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.SceneManager
             * @function FadeInDuration
             * @type number
             */
            FadeInDuration: 0,
            /**
             * Set the fade out duration.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.SceneManager
             * @function FadeOutDuration
             * @type number
             */
            FadeOutDuration: 0,
            /**
             * True if the scene manager is currently fading.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.SceneManager
             * @function Fading
             * @type boolean
             */
            Fading: false,
            /**
             * Current fade progress. (0 = no fade, 1 = fully faded)
             *
             * @instance
             * @memberof JuiceboxEngine.SceneManager
             * @function FadeProgress
             * @type number
             */
            FadeProgress: 0,
            /**
             * The current fade texture to use.
             *
             * @instance
             * @memberof JuiceboxEngine.SceneManager
             * @function CurFadeTexture
             * @type JuiceboxEngine.Graphics.Texture2D
             */
            CurFadeTexture: null,
            /**
             * The currently active scene.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.SceneManager
             * @function CurrentScene
             * @type JuiceboxEngine.Scene
             */
            CurrentScene: null,
            _game: null,
            _delay: 0,
            _switched: false,
            _progress: 0
        },
        props: {
            /**
             * Get the total duration of the fade in and out.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.SceneManager
             * @function FadeDuration
             * @type number
             */
            FadeDuration: {
                get: function () {
                    return this.FadeInDuration + this.FadeOutDuration;
                }
            }
        },
        ctors: {
            /**
             * Initialize the scene manager.
             *
             * @instance
             * @this JuiceboxEngine.SceneManager
             * @memberof JuiceboxEngine.SceneManager
             * @param   {JuiceboxEngine.JuiceboxGame}    game
             * @return  {void}
             */
            ctor: function (game) {
                this.$initialize();
                this._game = game;

                this.FadeOutDuration = 1.0;
                this.FadeInDuration = 1.0;
                this._delay = 0.0;
                this.Fading = false;
                this._progress = 0.0;
                this.FadeOutTexture = this._game.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/ScreenFade.png");
                this.FadeInTexture = this._game.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/ScreenFade.png");
            }
        },
        methods: {
            /**
             * Switch to a specified scene, using the set parameters.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.SceneManager
             * @memberof JuiceboxEngine.SceneManager
             * @param   {JuiceboxEngine.Scene}    scene    The scene to switch to.
             * @param   {number}                  delay    The amount of seconds to wait before switching.
             * @return  {void}
             */
            SwitchToScene: function (scene, delay) {
                if (delay === void 0) { delay = 0.0; }
                this._delay = delay;
                this._target = scene;

                scene.SceneManager = this;
            },
            /**
             * Update the scene manager.
             *
             * @instance
             * @this JuiceboxEngine.SceneManager
             * @memberof JuiceboxEngine.SceneManager
             * @return  {void}
             */
            Update: function () {
                this.FadeProgress = 0.0;

                if (this.Fading) {
                    this._progress += JuiceboxEngine.Util.Time.DeltaTimeRealTime;

                    if (this._progress < this.FadeOutDuration) {
                        this.CurFadeTexture = this.FadeOutTexture;
                        this.FadeProgress = this._progress / this.FadeOutDuration;
                    } else {
                        this.CurFadeTexture = this.FadeInTexture;
                        this.FadeProgress = 1.0 - (this._progress - this.FadeOutDuration) / this.FadeInDuration;

                        if (!this._switched) {
                            this._switched = true;
                            this.FadeProgress = 1.0;

                            this._game.CurrentScene.Destroy();

                            this._game.CurrentScene = this._target;
                            this.CurrentScene = this._target;

                            this._game.CurrentScene.Start();

                            this._target = null;
                        }
                    }

                    if (this._progress > this.FadeDuration) {
                        this.Fading = false;
                        this._switched = false;
                        this._progress = 0.0;
                    }
                } else if (this._target != null) {
                    this._delay -= JuiceboxEngine.Util.Time.DeltaTimeRealTime;

                    if (this._delay <= 0.0 && !this.Fading) {
                        this.Fading = true;
                    }
                }
            }
        }
    });

    /**
     * Sprite effects used for flipping texture coordinates.
     *
     * @public
     * @class number
     */
    H5.define("JuiceboxEngine.Sprite.SpriteFlip", {
        $kind: "nested enum",
        statics: {
            fields: {
                /**
                 * No effects.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 0
                 * @type number
                 */
                None: 0,
                /**
                 * Flip horizontally.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 1
                 * @type number
                 */
                HorizontalFlip: 1,
                /**
                 * Flip vertically.
                 *
                 * @static
                 * @public
                 * @memberof number
                 * @constant
                 * @default 2
                 * @type number
                 */
                VerticalFlip: 2
            }
        }
    });

    /** @namespace JuiceboxEngine.Util */

    /**
     * Browser specific utilities.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Util.Browser
     */
    H5.define("JuiceboxEngine.Util.Browser", {
        statics: {
            methods: {
                /**
                 * Open a new window with a given URL.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.Browser
                 * @memberof JuiceboxEngine.Util.Browser
                 * @param   {string}    url    The url to open.
                 * @return  {void}
                 */
                OpenWindow: function (url) {
                    window.open(url);
                },
                /**
                 * Alert the user with an alert dialog.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.Browser
                 * @memberof JuiceboxEngine.Util.Browser
                 * @param   {string}    msg    The message to display.
                 * @return  {void}
                 */
                Alert: function (msg) {
                    window.alert(msg);
                },
                /**
                 * Set the title of this tab.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.Browser
                 * @memberof JuiceboxEngine.Util.Browser
                 * @param   {string}    title    The title to set.
                 * @return  {void}
                 */
                SetTitle: function (title) {
                    document.title = title;
                },
                /**
                 * Promt the user with a text dialog.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.Browser
                 * @memberof JuiceboxEngine.Util.Browser
                 * @param   {string}    msg      The message to show.
                 * @param   {string}    value    Default value in the text box.
                 * @return  {string}
                 */
                Prompt: function (msg, value) {
                    return window.prompt(msg, value);
                },
                /**
                 * Check if the client is on a mobile device.
                 From: http://detectmobilebrowsers.com/
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.Browser
                 * @memberof JuiceboxEngine.Util.Browser
                 * @return  {boolean}        True if a mobile device, false otherwise.
                 */
                IsMobile: function () {
                    var u = window.navigator.userAgent;
                    var b = new System.Text.RegularExpressions.Regex.ctor("(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino", 3);
                    var v = new System.Text.RegularExpressions.Regex.ctor("1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-", 3);
                    return ((b.isMatch(u) || v.isMatch(u.substr(0, 4))));
                },
                ScreenshotToClipboard: function () {
                    var worked = document.execCommand("copy");
                },
                /**
                 * Get host name of this window.
                 (JS = window.location.hostname)
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.Browser
                 * @memberof JuiceboxEngine.Util.Browser
                 * @return  {string}        The host name.
                 */
                GetHostName: function () {
                    return window.location.hostname;
                }
            }
        }
    });

    /**
     * Config class, holds all config data.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Util.Config
     */
    H5.define("JuiceboxEngine.Util.Config", {
        statics: {
            fields: {
                /**
                 * The config values.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Util.Config
                 * @function ConfigValues
                 * @type JuiceboxEngine.Util.ConfigModel
                 */
                ConfigValues: null
            },
            ctors: {
                ctor: function () {
                    var config = JuiceboxEngine.Util.JSON.GetDynamicFromJSON(System.IO.File.ReadAllText("config.txt"));

                    JuiceboxEngine.Util.Config.ConfigValues = new JuiceboxEngine.Util.ConfigModel(config);
                }
            }
        }
    });

    /**
     * A model representing the config file.
     *
     * @public
     * @class JuiceboxEngine.Util.ConfigModel
     */
    H5.define("JuiceboxEngine.Util.ConfigModel", {
        fields: {
            /**
             * Size of the on screen pixels.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Util.ConfigModel
             * @function PixelSize
             * @type number
             */
            PixelSize: 0,
            /**
             * Default pixel perfect value. (Camera and sprites)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Util.ConfigModel
             * @function PixelPerfect
             * @type boolean
             */
            PixelPerfect: false,
            /**
             * List containing files to preload.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Util.ConfigModel
             * @function PreloadList
             * @type string
             */
            PreloadList: null,
            /**
             * Go full screen?
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Util.ConfigModel
             * @function Fullscreen
             * @type boolean
             */
            Fullscreen: false,
            /**
             * The ID of the canvas to use for rendering.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Util.ConfigModel
             * @function CanvasID
             * @type string
             */
            CanvasID: null,
            /**
             * Server IP for multiplayer (if used)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Util.ConfigModel
             * @function WebSocketServer
             * @type string
             */
            WebSocketServer: null,
            /**
             * Playfab title ID.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Util.ConfigModel
             * @function PlayfabTitleID
             * @type string
             */
            PlayfabTitleID: null
        },
        ctors: {
            ctor: function (json) {
                this.$initialize();
                this.PixelSize = json.PixelSize;
                this.PixelPerfect = json.PixelPerfect;
                this.PreloadList = json.PreloadList;
                this.CanvasID = json.CanvasID;
                this.Fullscreen = json.Fullscreen;
                this.PlayfabTitleID = json.PlayfabTitleID;
                this.WebSocketServer = json.WebSocketServer;
            }
        }
    });

    /**
     * JSON utility functions.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Util.JSON
     */
    H5.define("JuiceboxEngine.Util.JSON", {
        statics: {
            methods: {
                /**
                 * Get a dynamic object representing the JSON object from a json string.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.JSON
                 * @memberof JuiceboxEngine.Util.JSON
                 * @param   {string}    json    The string to parse.
                 * @return  {object}            The json object as a dynamic.
                 */
                GetDynamicFromJSON: function (json) {
                    return JSON.parse(json);
                },
                /**
                 * Get a dynamic object representing the JSON object from a file.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.JSON
                 * @memberof JuiceboxEngine.Util.JSON
                 * @param   {string}    file    The file to load.
                 * @return  {object}            The json object as a dynamic.
                 */
                GetDynamicFromFile: function (file) {
                    try {
                        var json = System.IO.File.ReadAllText(file);
                        return JuiceboxEngine.Util.JSON.GetDynamicFromJSON(json);
                    } catch ($e1) {
                        $e1 = System.Exception.create($e1);
                        System.Console.WriteLine("Failed to read " + (file || ""));
                        return null;
                    }
                },
                /**
                 * Convert a given object to a JSON string.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.JSON
                 * @memberof JuiceboxEngine.Util.JSON
                 * @param   {System.Object}    obj    The object to stringify.
                 * @return  {string}                  A string representing the object.
                 */
                ObjectToJSON: function (obj) {
                    return JSON.stringify(obj);
                }
            }
        }
    });

    /**
     * Juicebox config file. These values stay the same during the game.
     *
     * @public
     * @class JuiceboxEngine.Util.JuiceboxConfig
     */
    H5.define("JuiceboxEngine.Util.JuiceboxConfig", {
        fields: {
            /**
             * Game title.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Util.JuiceboxConfig
             * @function Title
             * @type string
             */
            Title: null
        }
    });

    /**
     * Used to access the local storage.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Util.LocalStorage
     */
    H5.define("JuiceboxEngine.Util.LocalStorage", {
        statics: {
            methods: {
                /**
                 * Store a object to the local storage.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.LocalStorage
                 * @memberof JuiceboxEngine.Util.LocalStorage
                 * @param   {string}           key      The key to store it on.
                 * @param   {System.Object}    value    The object or value to store.
                 * @return  {void}
                 */
                StoreValue: function (key, value) {
                    window.localStorage.setItem(key, H5.toString(value));
                },
                /**
                 * Get item from local storage.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.LocalStorage
                 * @memberof JuiceboxEngine.Util.LocalStorage
                 * @param   {string}           key    The key to get it from.
                 * @return  {System.Object}           The object stored if available, {@link } otherwise.
                 */
                GetValue: function (key) {
                    return window.localStorage[key];
                }
            }
        }
    });

    /**
     * Class used for generating random numbers.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Util.Random
     */
    H5.define("JuiceboxEngine.Util.Random", {
        statics: {
            fields: {
                _random: null
            },
            ctors: {
                ctor: function () {
                    JuiceboxEngine.Util.Random._random = new System.Random.ctor();
                }
            },
            methods: {
                /**
                 * Returns a random value between 0 and 1.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.Random
                 * @memberof JuiceboxEngine.Util.Random
                 * @return  {number}        A random value between 0 and 1.
                 */
                Next: function () {
                    return JuiceboxEngine.Util.Random._random.NextDouble();
                },
                /**
                 * Get a random int ranging from a minimum and maximum value.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.Random
                 * @memberof JuiceboxEngine.Util.Random
                 * @param   {number}    min    The minimum value. (inclusive)
                 * @param   {number}    max    The maximum value. (exclusive)
                 * @return  {number}           A random number in range min and max.
                 */
                NextRange: function (min, max) {
                    return JuiceboxEngine.Util.Random._random.Next$2(min, max);
                },
                /**
                 * Get a random float ranging from a minimum and maximum value.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.Random
                 * @memberof JuiceboxEngine.Util.Random
                 * @param   {number}    min    The minimum value. (inclusive)
                 * @param   {number}    max    The maximum value. (exclusive)
                 * @return  {number}           A random number in range min and max.
                 */
                NextRange$1: function (min, max) {
                    return JuiceboxEngine.Math.JMath.Interpolate(min, max, JuiceboxEngine.Util.Random.Next());
                },
                /**
                 * Generate random numbers that are normally distibuted.
                 *
                 * @static
                 * @public
                 * @this JuiceboxEngine.Util.Random
                 * @memberof JuiceboxEngine.Util.Random
                 * @param   {number}    mean      Mean of the distribution.
                 * @param   {number}    stddiv    Standard deviation.
                 * @return  {number}              A normally distributed number.
                 */
                NextGaussian: function (mean, stddiv) {
                    var first = JuiceboxEngine.Util.Random.Next();
                    var second = JuiceboxEngine.Util.Random.Next();

                    var normal = JuiceboxEngine.Math.JMath.Sqrt(-2.0 * JuiceboxEngine.Math.JMath.Log(first)) * JuiceboxEngine.Math.JMath.Sin(6.2831855 * second);

                    return mean + stddiv * normal;
                }
            }
        }
    });

    /**
     * Time info for engine and game systems.
     *
     * @static
     * @abstract
     * @public
     * @class JuiceboxEngine.Util.Time
     */
    H5.define("JuiceboxEngine.Util.Time", {
        statics: {
            fields: {
                /**
                 * Total amount of seconds gone by since startup.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Util.Time
                 * @function TotalSeconds
                 * @type number
                 */
                TotalSeconds: 0,
                /**
                 * Time of the previous frame.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Util.Time
                 * @function DeltaTime
                 * @type number
                 */
                DeltaTime: 0,
                /**
                 * The real time delta time.
                 No timescale or max time stap is applied.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Util.Time
                 * @function DeltaTimeRealTime
                 * @type number
                 */
                DeltaTimeRealTime: 0,
                /**
                 * The current rate of time.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Util.Time
                 * @function TimeScale
                 * @type number
                 */
                TimeScale: 0,
                /**
                 * Maximum amount of time to pass per update.
                 Only applies to {@link }. 
                 {@link } will always be true to the real time passed.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Util.Time
                 * @function MaxTimeStep
                 * @type number
                 */
                MaxTimeStep: 0,
                /**
                 * Constant time step, if not 0 the Deltatime will always be this value.
                 *
                 * @static
                 * @public
                 * @memberof JuiceboxEngine.Util.Time
                 * @function ConstantTimeStep
                 * @type number
                 */
                ConstantTimeStep: 0,
                _previous: null
            },
            props: {
                /**
                 * Get the current DateTime.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceboxEngine.Util.Time
                 * @function CurDateTime
                 * @type System.DateTime
                 */
                CurDateTime: {
                    get: function () {
                        return System.DateTime.getNow();
                    }
                }
            },
            ctors: {
                init: function () {
                    this._previous = System.DateTime.getDefaultValue();
                    this.TimeScale = 1;
                },
                ctor: function () {
                    JuiceboxEngine.Util.Time._previous = System.DateTime.getNow();
                    JuiceboxEngine.Util.Time.MaxTimeStep = 0.033333335;
                    JuiceboxEngine.Util.Time.ConstantTimeStep = 0.0;
                }
            },
            methods: {
                /**
                 * Update the time.
                 *
                 * @static
                 * @this JuiceboxEngine.Util.Time
                 * @memberof JuiceboxEngine.Util.Time
                 * @return  {void}
                 */
                UpdateTime: function () {
                    if (H5.equals(JuiceboxEngine.Util.Time._previous, null)) {
                        JuiceboxEngine.Util.Time._previous = System.DateTime.getNow();
                    }

                    var now = System.DateTime.getNow();

                    var span = System.DateTime.subdd(now, JuiceboxEngine.Util.Time._previous);

                    JuiceboxEngine.Util.Time.TotalSeconds += span.getTotalSeconds();
                    JuiceboxEngine.Util.Time.DeltaTime = span.getTotalSeconds() * JuiceboxEngine.Util.Time.TimeScale;
                    JuiceboxEngine.Util.Time.DeltaTimeRealTime = span.getTotalSeconds();


                    if (JuiceboxEngine.Util.Time.ConstantTimeStep !== 0.0) {
                        JuiceboxEngine.Util.Time.DeltaTime = JuiceboxEngine.Util.Time.ConstantTimeStep;
                    } else {
                        if (JuiceboxEngine.Util.Time.DeltaTime > JuiceboxEngine.Util.Time.MaxTimeStep) {
                            JuiceboxEngine.Util.Time.DeltaTime = JuiceboxEngine.Util.Time.MaxTimeStep;
                        }
                    }

                    JuiceboxEngine.Util.Time._previous = now;
                }
            }
        }
    });

    /**
     * Class for storing a single sprite animation.
     *
     * @public
     * @class JuiceboxEngine.Animations.Animation
     * @implements  JuiceboxEngine.Resources.IResource
     */
    H5.define("JuiceboxEngine.Animations.Animation", {
        inherits: [JuiceboxEngine.Resources.IResource],
        fields: {
            /**
             * Name of the animation.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Animations.Animation
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * Frames this animation contains.
             *
             * @instance
             * @memberof JuiceboxEngine.Animations.Animation
             * @function Frames
             * @type System.Collections.Generic.List$1
             */
            Frames: null,
            /**
             * Indicates if the resource is loaded.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Animations.Animation
             * @function Loaded
             * @type boolean
             */
            Loaded: false,
            /**
             * Amount of frames in the animation.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Animations.Animation
             * @function FrameCount
             * @type number
             */
            FrameCount: 0
        },
        alias: [
            "Name", "JuiceboxEngine$Resources$IResource$Name",
            "Loaded", "JuiceboxEngine$Resources$IResource$Loaded",
            "Unload", "JuiceboxEngine$Resources$IResource$Unload"
        ],
        ctors: {
            /**
             * Animation constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Animations.Animation
             * @memberof JuiceboxEngine.Animations.Animation
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.Frames = new (System.Collections.Generic.List$1(JuiceboxEngine.Animations.AnimationFrame)).ctor();
                this.FrameCount = 0;
            }
        },
        methods: {
            /**
             * Unload the animation.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Animations.Animation
             * @memberof JuiceboxEngine.Animations.Animation
             * @return  {void}
             */
            Unload: function () { }
        }
    });

    /**
     * Class responsible for loading animations.
     *
     * @public
     * @class JuiceboxEngine.Animations.AnimatorLoader
     * @augments JuiceboxEngine.Resources.ResourceLoader
     */
    H5.define("JuiceboxEngine.Animations.AnimatorLoader", {
        inherits: [JuiceboxEngine.Resources.ResourceLoader],
        ctors: {
            /**
             * Default Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Animations.AnimatorLoader
             * @memberof JuiceboxEngine.Animations.AnimatorLoader
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                JuiceboxEngine.Resources.ResourceLoader.ctor.call(this, "AnimationLoader", "anim");
            }
        },
        methods: {
            /**
             * Loads a animation from a .anim file.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Animations.AnimatorLoader
             * @memberof JuiceboxEngine.Animations.AnimatorLoader
             * @param   {string}                                path    Path to the file to load.
             * @return  {JuiceboxEngine.Resources.IResource}            Null if loading fails, or an {@link } when the operation succeeds.
             */
            Load: function (path) {
                var $t;
                var anim = new JuiceboxEngine.Animations.Animation();

                var data = JuiceboxEngine.Util.JSON.GetDynamicFromJSON(System.IO.File.ReadAllText(path));

                $t = H5.getEnumerator(data.frames);
                try {
                    while ($t.moveNext()) {
                        var frame = H5.cast($t.Current, System.Object);
                        var animFrame = new JuiceboxEngine.Animations.AnimationFrame();

                        var sourceRect = frame.frame;

                        animFrame.Duration = frame.duration / 1000.0;
                        animFrame.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h);

                        anim.Frames.add(animFrame);
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                anim.Loaded = true;
                anim.Name = path;
                anim.FrameCount = anim.Frames.Count;

                return anim;
            }
        }
    });

    H5.define("JuiceboxEngine.Audio.AudioClip", {
        inherits: [JuiceboxEngine.Resources.IResource],
        fields: {
            Name: null,
            Loaded: false,
            _howl: null
        },
        alias: [
            "Name", "JuiceboxEngine$Resources$IResource$Name",
            "Loaded", "JuiceboxEngine$Resources$IResource$Loaded",
            "Unload", "JuiceboxEngine$Resources$IResource$Unload"
        ],
        ctors: {
            ctor: function (howl) {
                this.$initialize();
                this._howl = howl;
            }
        },
        methods: {
            Play: function () {
                return this._howl.play();
            },
            Play$1: function (id) {
                this._howl.play(id);
            },
            Pause: function (id) {
                this._howl.pause(id);
            },
            Stop: function (id) {
                this._howl.stop(id);
            },
            Loop: function (id, loop) {
                this._howl.loop(loop, id);
            },
            Volume: function (id, volume) {
                this._howl.volume(volume, id);
            },
            SetPlaybackSpeed: function (id, speed) {
                this._howl.rate(speed, id);
            },
            Unload: function () {

            }
        }
    });

    H5.define("JuiceboxEngine.Audio.AudioComponent", {
        inherits: [JuiceboxEngine.Component],
        fields: {
            _clip: null,
            _id: 0,
            _hasID: false
        },
        methods: {
            Initialize: function (resourceManager) {

            },
            /**
             * The audio clip to use for this component.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Audio.AudioComponent
             * @memberof JuiceboxEngine.Audio.AudioComponent
             * @param   {JuiceboxEngine.Audio.AudioClip}    clip    The audio clip.
             * @return  {void}
             */
            SetAudioClip: function (clip) {
                this._clip = clip;
            },
            /**
             * Start playing the audio.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Audio.AudioComponent
             * @memberof JuiceboxEngine.Audio.AudioComponent
             * @return  {void}
             */
            Play: function () {
                if (this._clip == null) {
                    return;
                }

                if (!this._hasID) {
                    this._id = this._clip.Play();
                    this._hasID = true;
                } else {
                    this._clip.Play$1(this._id);
                }
            },
            /**
             * Stop playing audio.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Audio.AudioComponent
             * @memberof JuiceboxEngine.Audio.AudioComponent
             * @return  {void}
             */
            Stop: function () {
                if (this._clip == null) {
                    return;
                }

                this._clip.Stop(this._id);
            },
            /**
             * Pause the audio clip.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Audio.AudioComponent
             * @memberof JuiceboxEngine.Audio.AudioComponent
             * @return  {void}
             */
            Pause: function () {
                if (this._clip == null) {
                    return;
                }

                this._clip.Pause(this._id);
            },
            /**
             * Loop the audio?
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Audio.AudioComponent
             * @memberof JuiceboxEngine.Audio.AudioComponent
             * @param   {boolean}    loop    True to loop, false to only play once.
             * @return  {void}
             */
            Loop: function (loop) {
                if (this._clip == null) {
                    return;
                }

                this._clip.Loop(this._id, loop);
            },
            /**
             * Set the audio volume.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Audio.AudioComponent
             * @memberof JuiceboxEngine.Audio.AudioComponent
             * @param   {number}    volume
             * @return  {void}
             */
            SetVolume: function (volume) {
                if (this._clip == null) {
                    return;
                }

                this._clip.Volume(this._id, volume);
            },
            /**
             * Change the playback rate of the audio.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Audio.AudioComponent
             * @memberof JuiceboxEngine.Audio.AudioComponent
             * @param   {number}    rate    The rate to play at. Default is 1.0.
             * @return  {void}
             */
            SetPlaybackRate: function (rate) {
                if (this._clip == null) {
                    return;
                }

                this._clip.SetPlaybackSpeed(this._id, rate);
            },
            /**
             * Audio component is not unique to a gameobject.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Audio.AudioComponent
             * @memberof JuiceboxEngine.Audio.AudioComponent
             * @return  {boolean}        False.
             */
            Unique: function () {
                return false;
            },
            /**
             * Called every frame.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Audio.AudioComponent
             * @memberof JuiceboxEngine.Audio.AudioComponent
             * @return  {void}
             */
            Update: function () {

            },
            /**
             * Clean up object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Audio.AudioComponent
             * @memberof JuiceboxEngine.Audio.AudioComponent
             * @return  {void}
             */
            Destroy: function () {

            }
        }
    });

    H5.define("JuiceboxEngine.Audio.AudioLoader", {
        inherits: [JuiceboxEngine.Resources.ResourceLoader],
        fields: {
            _manager: null
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Resources.ResourceLoader.ctor.call(this, "AudioLoader", "mp3");
                this._manager = manager;
            }
        },
        methods: {
            Load: function (path) {
                var props = { };
                props.src = path;
                props.autoplay = false;
                props.loop = false;
                props.html5 = true;

                var howl = new (Howl)(props);

                var clip = new JuiceboxEngine.Audio.AudioClip(howl);

                howl.on("load", function () {
                    clip.Loaded = true;
                });

                return clip;
            }
        }
    });

    /**
     * The camera components renders the scene from a game object perspective.
     *
     * @public
     * @class JuiceboxEngine.Camera
     * @augments JuiceboxEngine.Component
     */
    H5.define("JuiceboxEngine.Camera", {
        inherits: [JuiceboxEngine.Component],
        fields: {
            /**
             * Color to clear the rendertarget to.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Camera
             * @function ClearColor
             * @type JuiceboxEngine.Math.Color
             */
            ClearColor: null,
            /**
             * Is the camera perspective or orthographic?
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Camera
             * @function PerspectiveCamera
             * @type boolean
             */
            PerspectiveCamera: false,
            /**
             * When true, the camera snaps to the pixel grid.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Camera
             * @function PixelPerfect
             * @type boolean
             */
            PixelPerfect: false,
            /**
             * The camera render target.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Camera
             * @function Target
             * @type JuiceboxEngine.Graphics.RenderTarget
             */
            Target: null,
            /**
             * Size of the pixels. (e.g. 1 is the same resolution as the canvas, 4 gives you pixels the size of 4 canvas pixels)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Camera
             * @function PixelSize
             * @type number
             */
            PixelSize: 0,
            /**
             * Zoom amount of this camera. 1.0f = 100%, 2.0f = 200% zoom, 0.5f = 50% zoom etc.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Camera
             * @function Zoom
             * @type number
             */
            Zoom: 0,
            /**
             * Clear the camera render buffer or not.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Camera
             * @function Clear
             * @type boolean
             */
            Clear: false
        },
        props: {
            /**
             * The camera view matrix.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Camera
             * @function ViewMatrix
             * @type JuiceboxEngine.Math.Matrix4
             */
            ViewMatrix: {
                get: function () {
                    var pos = this.Parent.Transform.Position.$clone();

                    if (this.PixelPerfect) {
                        pos = new JuiceboxEngine.Math.Vector3.$ctor2(JuiceboxEngine.Math.JMath.Round(this.Parent.Transform.Position.X), JuiceboxEngine.Math.JMath.Round(this.Parent.Transform.Position.Y), H5.Int.clip32(this.Parent.Transform.Position.Z));
                    }

                    if (!this.PerspectiveCamera) {
                        return JuiceboxEngine.Math.Matrix4.CreateLookAt(pos.$clone(), new JuiceboxEngine.Math.Vector3.$ctor2(pos.X, pos.Y, 1.0), new JuiceboxEngine.Math.Vector3.$ctor2(0.0, -1.0, 0.0));
                    }

                    return JuiceboxEngine.Math.Matrix4.CreateLookAt(pos.$clone(), new JuiceboxEngine.Math.Vector3.$ctor2(0.0, 0.0, 0.0), new JuiceboxEngine.Math.Vector3.$ctor2(0.0, 1.0, 0.0));
                }
            },
            /**
             * The camera projection matrix.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Camera
             * @function ProjMatrix
             * @type JuiceboxEngine.Math.Matrix4
             */
            ProjMatrix: {
                get: function () {
                    if (this.PerspectiveCamera) {
                        return JuiceboxEngine.Math.Matrix4.CreatePerspectiveFieldOfView(1.5707964, this.Target.Width / this.Target.Height, 0.1, 1000.0);
                    } else {
                        return JuiceboxEngine.Math.Matrix4.CreateOrthographic(this.Target.Width / this.Zoom, this.Target.Height / this.Zoom, 0.0, 100.0);
                    }
                }
            },
            /**
             * Get frustum of this camera. 
             Only makes sense for a orthographic camera. {@link } should be false.
             *
             * @instance
             * @public
             * @readonly
             * @memberof JuiceboxEngine.Camera
             * @function Frustum
             * @type JuiceboxEngine.Math.RectangleF
             */
            Frustum: {
                get: function () {
                    var width = this.Target.Width / this.Zoom;
                    var height = this.Target.Height / this.Zoom;

                    return new JuiceboxEngine.Math.RectangleF.$ctor2(this.Parent.Transform.Position2D.X - width / 2, this.Parent.Transform.Position2D.Y - height / 2, width, height);
                }
            }
        },
        ctors: {
            init: function () {
                this.ClearColor = new JuiceboxEngine.Math.Color();
            }
        },
        methods: {
            /**
             * Initialize the camera component.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Camera
             * @memberof JuiceboxEngine.Camera
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager
             * @return  {void}
             */
            Initialize: function (resourceManager) {
                this.PixelSize = JuiceboxEngine.Util.Config.ConfigValues.PixelSize;
                this.PixelPerfect = JuiceboxEngine.Util.Config.ConfigValues.PixelPerfect;
                this.PerspectiveCamera = false;
                this.Zoom = 1.0;
                this.Clear = true;

                this.CreateRenderTarget();

                JuiceboxEngine.Graphics.GraphicsManager.Instance.addOnResize(H5.fn.cacheBind(this, this.Resize));
            },
            /**
             * Resize the render target.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Camera
             * @memberof JuiceboxEngine.Camera
             * @param   {number}    width     The new width.
             * @param   {number}    height    The new height.
             * @return  {void}
             */
            Resize: function (width, height) {
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.DeleteRenderTarget(this.Target);
                this.CreateRenderTarget();
            },
            /**
             * Create a render target for the camera.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Camera
             * @memberof JuiceboxEngine.Camera
             * @return  {void}
             */
            CreateRenderTarget: function () {
                this.Target = new JuiceboxEngine.Graphics.RenderTarget(((H5.Int.div(JuiceboxEngine.Graphics.GraphicsManager.Instance.Width, this.PixelSize)) | 0), ((H5.Int.div(JuiceboxEngine.Graphics.GraphicsManager.Instance.Height, this.PixelSize)) | 0));
            },
            /**
             * There can only be one camera to a game object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Camera
             * @memberof JuiceboxEngine.Camera
             * @return  {boolean}        True
             */
            Unique: function () {
                return true;
            },
            /**
             * Converts a screen point to a world position.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Camera
             * @memberof JuiceboxEngine.Camera
             * @param   {JuiceboxEngine.Math.Vector2}    point    The screen coordinate, ranging from 0 to 1 on both axis.
             * @return  {JuiceboxEngine.Math.Vector2}             The world coordiante for the given screen coordinate.
             */
            ScreenPointToWorld: function (point) {
                return new JuiceboxEngine.Math.Vector2.$ctor3(((point.X * 2.0 - 1.0) / this.Zoom) * this.Target.Width / 2.0 + this.Parent.Transform.Position.X, ((point.Y * 2.0 - 1.0) / this.Zoom) * this.Target.Height / 2.0 + this.Parent.Transform.Position.Y);
            },
            /**
             * Convert world position to screen space position.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Camera
             * @memberof JuiceboxEngine.Camera
             * @param   {JuiceboxEngine.Math.Vector2}    world    The world space position.
             * @return  {JuiceboxEngine.Math.Vector2}             The screen space position.
             */
            WorldToScreenPoint: function (world) {
                var x = (((world.X - this.Parent.Transform.Position.X) / (this.Target.Width / 2.0)) * this.Zoom + 1.0) / 2.0;
                var y = (((world.Y - this.Parent.Transform.Position.Y) / (this.Target.Height / 2.0)) * this.Zoom + 1.0) / 2.0;

                return new JuiceboxEngine.Math.Vector2.$ctor3(x, y);
            },
            /**
             * Update the camera.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Camera
             * @memberof JuiceboxEngine.Camera
             * @return  {void}
             */
            Update: function () {

            },
            /**
             * TODO: Destroy camera render targets here.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Camera
             * @memberof JuiceboxEngine.Camera
             * @return  {void}
             */
            Destroy: function () {
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.DeleteRenderTarget(this.Target);
            }
        }
    });

    /**
     * Wait for multiple co-routines at the same time. They can run in parallel.
     *
     * @public
     * @class JuiceboxEngine.Coroutines.WaitForAllCoroutines
     * @augments JuiceboxEngine.Coroutines.YieldInstruction
     */
    H5.define("JuiceboxEngine.Coroutines.WaitForAllCoroutines", {
        inherits: [JuiceboxEngine.Coroutines.YieldInstruction],
        fields: {
            /**
             * All co-routines to wait for.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Coroutines.WaitForAllCoroutines
             * @type Array.<JuiceboxEngine.Coroutines.Coroutine>
             */
            _coroutines: null
        },
        ctors: {
            /**
             * Wait for multiple co-routines at the same time. They can run in parallel.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Coroutines.WaitForAllCoroutines
             * @memberof JuiceboxEngine.Coroutines.WaitForAllCoroutines
             * @param   {Array.<JuiceboxEngine.Coroutines.Coroutine>}    coroutines    The co-routines to wait on.
             * @return  {void}
             */
            ctor: function (coroutines) {
                if (coroutines === void 0) { coroutines = []; }

                this.$initialize();
                JuiceboxEngine.Coroutines.YieldInstruction.ctor.call(this);
                this._coroutines = coroutines;
            },
            /**
             * Wait for multiple co-routines at the same time. They can run in parallel.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Coroutines.WaitForAllCoroutines
             * @memberof JuiceboxEngine.Coroutines.WaitForAllCoroutines
             * @param   {Array.<System.Collections.IEnumerator>}    coroutines    The co-routines to wait on.
             * @return  {void}
             */
            $ctor1: function (coroutines) {
                if (coroutines === void 0) { coroutines = []; }

                this.$initialize();
                JuiceboxEngine.Coroutines.YieldInstruction.ctor.call(this);
                this._coroutines = System.Array.init(coroutines.length, null, JuiceboxEngine.Coroutines.Coroutine);

                for (var i = 0; i < coroutines.length; i = (i + 1) | 0) {
                    this._coroutines[i] = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(coroutines[i]);
                }
            }
        },
        methods: {
            /**
             * Stop all still running coroutines when this instruction is being stopped.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Coroutines.WaitForAllCoroutines
             * @memberof JuiceboxEngine.Coroutines.WaitForAllCoroutines
             * @return  {void}
             */
            Stop: function () {
                var $t;
                $t = H5.getEnumerator(this._coroutines);
                try {
                    while ($t.moveNext()) {
                        var coroutine = $t.Current;
                        if (coroutine != null) {
                            JuiceboxEngine.Coroutines.CoroutineManager.StopCoroutine(coroutine);
                        }
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /**
             * Logic to define if a co-routine can continue.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Coroutines.WaitForAllCoroutines
             * @memberof JuiceboxEngine.Coroutines.WaitForAllCoroutines
             * @return  {boolean}        Returns true when it can continue, false if not.
             */
            CanContinue: function () {
                var $t;
                var canContinue = true;

                $t = H5.getEnumerator(this._coroutines);
                try {
                    while ($t.moveNext()) {
                        var coroutine = $t.Current;
                        canContinue = !!(canContinue & !coroutine.MoveNextResult);
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                return canContinue;
            }
        }
    });

    /**
     * Wait on another coroutine to finish.
     *
     * @public
     * @class JuiceboxEngine.Coroutines.WaitForCoroutine
     * @augments JuiceboxEngine.Coroutines.YieldInstruction
     */
    H5.define("JuiceboxEngine.Coroutines.WaitForCoroutine", {
        inherits: [JuiceboxEngine.Coroutines.YieldInstruction],
        fields: {
            _coroutine: null
        },
        ctors: {
            /**
             * Wait on another coroutine to finish.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Coroutines.WaitForCoroutine
             * @memberof JuiceboxEngine.Coroutines.WaitForCoroutine
             * @param   {JuiceboxEngine.Coroutines.Coroutine}    coroutine    The co-routine to wait for.
             * @return  {void}
             */
            ctor: function (coroutine) {
                this.$initialize();
                JuiceboxEngine.Coroutines.YieldInstruction.ctor.call(this);
                this._coroutine = coroutine;
            },
            /**
             * Wait on another coroutine to finish.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Coroutines.WaitForCoroutine
             * @memberof JuiceboxEngine.Coroutines.WaitForCoroutine
             * @param   {System.Collections.IEnumerator}    coroutine    The coroutine function.
             * @return  {void}
             */
            $ctor1: function (coroutine) {
                this.$initialize();
                JuiceboxEngine.Coroutines.YieldInstruction.ctor.call(this);
                this._coroutine = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(coroutine);
            }
        },
        methods: {
            /**
             * Stop the coroutine from executing.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Coroutines.WaitForCoroutine
             * @memberof JuiceboxEngine.Coroutines.WaitForCoroutine
             * @return  {void}
             */
            Stop: function () {
                if (this._coroutine != null) {
                    JuiceboxEngine.Coroutines.CoroutineManager.StopCoroutine(this._coroutine);
                }
            },
            /**
             * Logic to define if a co-routine can continue.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Coroutines.WaitForCoroutine
             * @memberof JuiceboxEngine.Coroutines.WaitForCoroutine
             * @return  {boolean}        Returns true when it can continue, false if not.
             */
            CanContinue: function () {
                return !this._coroutine.MoveNextResult;
            }
        }
    });

    /**
     * Wait for one of the given co-routines.
     *
     * @public
     * @class JuiceboxEngine.Coroutines.WaitForFirstRoutine
     * @augments JuiceboxEngine.Coroutines.YieldInstruction
     */
    H5.define("JuiceboxEngine.Coroutines.WaitForFirstRoutine", {
        inherits: [JuiceboxEngine.Coroutines.YieldInstruction],
        fields: {
            /**
             * Co-routines to wait for.
             *
             * @instance
             * @private
             * @memberof JuiceboxEngine.Coroutines.WaitForFirstRoutine
             * @type Array.<JuiceboxEngine.Coroutines.Coroutine>
             */
            _coroutines: null
        },
        ctors: {
            /**
             * Wait for multiple co-routines at the same time. They can run in parallel.
             Once one is done, the others won't continue.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Coroutines.WaitForFirstRoutine
             * @memberof JuiceboxEngine.Coroutines.WaitForFirstRoutine
             * @param   {Array.<JuiceboxEngine.Coroutines.Coroutine>}    coroutines    The co-routines to wait on.
             * @return  {void}
             */
            ctor: function (coroutines) {
                if (coroutines === void 0) { coroutines = []; }

                this.$initialize();
                JuiceboxEngine.Coroutines.YieldInstruction.ctor.call(this);
                this._coroutines = coroutines;
            },
            /**
             * Wait for multiple co-routines at the same time. They can run in parallel.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Coroutines.WaitForFirstRoutine
             * @memberof JuiceboxEngine.Coroutines.WaitForFirstRoutine
             * @param   {Array.<System.Collections.IEnumerator>}    coroutines    The co-routines to wait on.
             * @return  {void}
             */
            $ctor1: function (coroutines) {
                if (coroutines === void 0) { coroutines = []; }

                this.$initialize();
                JuiceboxEngine.Coroutines.YieldInstruction.ctor.call(this);
                this._coroutines = System.Array.init(coroutines.length, null, JuiceboxEngine.Coroutines.Coroutine);

                for (var i = 0; i < coroutines.length; i = (i + 1) | 0) {
                    this._coroutines[i] = JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(coroutines[i]);
                }
            }
        },
        methods: {
            Stop: function () {
                var $t;
                $t = H5.getEnumerator(this._coroutines);
                try {
                    while ($t.moveNext()) {
                        var coroutine = $t.Current;
                        if (coroutine != null) {
                            JuiceboxEngine.Coroutines.CoroutineManager.StopCoroutine(coroutine);
                        }
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            /**
             * Logic to define if a co-routine can continue.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Coroutines.WaitForFirstRoutine
             * @memberof JuiceboxEngine.Coroutines.WaitForFirstRoutine
             * @return  {boolean}        Returns true when it can continue, false if not.
             */
            CanContinue: function () {
                var $t;
                $t = H5.getEnumerator(this._coroutines);
                try {
                    while ($t.moveNext()) {
                        var coroutine = $t.Current;
                        if (!coroutine.MoveNextResult) {
                            return false;
                        }
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                return true;
            }
        }
    });

    /**
     * Wait for a frame before continuing coroutine.
     Same effect as 'yield return null;'
     *
     * @public
     * @class JuiceboxEngine.Coroutines.WaitForFrame
     * @augments JuiceboxEngine.Coroutines.YieldInstruction
     */
    H5.define("JuiceboxEngine.Coroutines.WaitForFrame", {
        inherits: [JuiceboxEngine.Coroutines.YieldInstruction],
        methods: {
            /**
             * Logic to define if a co-routine can continue.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Coroutines.WaitForFrame
             * @memberof JuiceboxEngine.Coroutines.WaitForFrame
             * @return  {boolean}        Returns true when it can continue, false if not.
             */
            CanContinue: function () {
                return true;
            }
        }
    });

    /**
     * Wait for a given amount of seconds in a co-routine.
     *
     * @public
     * @class JuiceboxEngine.Coroutines.WaitForSeconds
     * @augments JuiceboxEngine.Coroutines.YieldInstruction
     */
    H5.define("JuiceboxEngine.Coroutines.WaitForSeconds", {
        inherits: [JuiceboxEngine.Coroutines.YieldInstruction],
        fields: {
            _secondsToWait: 0
        },
        ctors: {
            /**
             * Wait for a given amount of seconds in a co-routine.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Coroutines.WaitForSeconds
             * @memberof JuiceboxEngine.Coroutines.WaitForSeconds
             * @param   {number}    seconds    The seconds to wait.
             * @return  {void}
             */
            ctor: function (seconds) {
                this.$initialize();
                JuiceboxEngine.Coroutines.YieldInstruction.ctor.call(this);
                this._secondsToWait = seconds;
            }
        },
        methods: {
            /**
             * Logic to define if a co-routine can continue.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Coroutines.WaitForSeconds
             * @memberof JuiceboxEngine.Coroutines.WaitForSeconds
             * @return  {boolean}        Returns true when it can continue, false if not.
             */
            CanContinue: function () {
                this._secondsToWait -= JuiceboxEngine.Util.Time.DeltaTime;
                return this._secondsToWait <= 0.0;
            }
        }
    });

    /**
     * Wait for a given amount of seconds in a co-routine.
     *
     * @public
     * @class JuiceboxEngine.Coroutines.WaitForSecondsRealTime
     * @augments JuiceboxEngine.Coroutines.YieldInstruction
     */
    H5.define("JuiceboxEngine.Coroutines.WaitForSecondsRealTime", {
        inherits: [JuiceboxEngine.Coroutines.YieldInstruction],
        fields: {
            _secondsToWait: 0
        },
        ctors: {
            /**
             * Wait for a given amount of seconds in a co-routine.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Coroutines.WaitForSecondsRealTime
             * @memberof JuiceboxEngine.Coroutines.WaitForSecondsRealTime
             * @param   {number}    seconds    The seconds to wait.
             * @return  {void}
             */
            ctor: function (seconds) {
                this.$initialize();
                JuiceboxEngine.Coroutines.YieldInstruction.ctor.call(this);
                this._secondsToWait = seconds;
            }
        },
        methods: {
            /**
             * Logic to define if a co-routine can continue.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Coroutines.WaitForSecondsRealTime
             * @memberof JuiceboxEngine.Coroutines.WaitForSecondsRealTime
             * @return  {boolean}        Returns true when it can continue, false if not.
             */
            CanContinue: function () {
                this._secondsToWait -= JuiceboxEngine.Util.Time.DeltaTimeRealTime;
                return this._secondsToWait <= 0.0;
            }
        }
    });

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Func
     * @return  {boolean}
     */

    /**
     * Wait the coroutine until a given condition is true.
     *
     * @public
     * @class JuiceboxEngine.Coroutines.WaitUntilTrue
     * @augments JuiceboxEngine.Coroutines.YieldInstruction
     */
    H5.define("JuiceboxEngine.Coroutines.WaitUntilTrue", {
        inherits: [JuiceboxEngine.Coroutines.YieldInstruction],
        fields: {
            _fn: null
        },
        ctors: {
            /**
             * Wait the coroutine until a given condition is true.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Coroutines.WaitUntilTrue
             * @memberof JuiceboxEngine.Coroutines.WaitUntilTrue
             * @param   {System.Func}    fn    The condition to evaluate.
             * @return  {void}
             */
            ctor: function (fn) {
                this.$initialize();
                JuiceboxEngine.Coroutines.YieldInstruction.ctor.call(this);
                this._fn = fn;
            }
        },
        methods: {
            /**
             * Logic to define if a co-routine can continue.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Coroutines.WaitUntilTrue
             * @memberof JuiceboxEngine.Coroutines.WaitUntilTrue
             * @return  {boolean}        Returns true when it can continue, false if not.
             */
            CanContinue: function () {
                return this._fn();
            }
        }
    });

    /**
     * Represents a font, generated using Codehead's Bitmap Font Generator.
     *
     * @public
     * @class JuiceboxEngine.Graphics.Font
     * @implements  JuiceboxEngine.Resources.IResource
     */
    H5.define("JuiceboxEngine.Graphics.Font", {
        inherits: [JuiceboxEngine.Resources.IResource],
        fields: {
            /**
             * Name of this resource.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Font
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * True if the resource is loaded, false otherwise.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Font
             * @function Loaded
             * @type boolean
             */
            Loaded: false,
            /**
             * Texture belonging to this font.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Font
             * @function Texture
             * @type JuiceboxEngine.Graphics.Texture2D
             */
            Texture: null,
            _width: 0,
            _height: 0,
            _charOffset: 0,
            _charWidths: null,
            _cellWidth: 0,
            _cellHeight: 0,
            _rowCount: 0
        },
        alias: [
            "Name", "JuiceboxEngine$Resources$IResource$Name",
            "Loaded", "JuiceboxEngine$Resources$IResource$Loaded",
            "Unload", "JuiceboxEngine$Resources$IResource$Unload"
        ],
        ctors: {
            /**
             * Font constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Font
             * @memberof JuiceboxEngine.Graphics.Font
             * @param   {number}                               width         Width of characters.
             * @param   {number}                               height        Height of characters.
             * @param   {number}                               charOffset    Offset.
             * @param   {Array.<number>}                       charWidths    Character widths.
             * @param   {number}                               cellWidth     Width of one cell.
             * @param   {number}                               cellHeight    Height of one cell.
             * @param   {JuiceboxEngine.Graphics.Texture2D}    texture       Font texture.
             * @return  {void}
             */
            ctor: function (width, height, charOffset, charWidths, cellWidth, cellHeight, texture) {
                this.$initialize();
                this._width = width;
                this._height = height;
                this._charOffset = charOffset;
                this._charWidths = charWidths;
                this._cellWidth = cellWidth;
                this._cellHeight = cellHeight;
                this._rowCount = (H5.Int.div(width, this._cellWidth)) | 0;

                this.Texture = texture;
            }
        },
        methods: {
            /**
             * Generate a font vertex buffer, that fits a given rectangle. Seperated by words.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Font
             * @memberof JuiceboxEngine.Graphics.Font
             * @param   {string}                           text         The text to display.
             * @param   {JuiceboxEngine.Math.Color}        color        The color of the text.
             * @param   {JuiceboxEngine.Math.Rectangle}    rectangle    The rectangle to fit the text in.
             * @return  {Array.<number>}
             */
            GenerateBufferInRect: function (text, color, rectangle) {
                var $t;
                if (System.String.isNullOrEmpty(text)) {
                    return System.Array.init(0, 0, System.Single);
                }

                var currentLine = "";
                var realText = "";
                var words = System.String.split(text, [32].map(function (i) {{ return String.fromCharCode(i); }}));

                $t = H5.getEnumerator(words);
                try {
                    while ($t.moveNext()) {
                        var word = $t.Current;
                        var width = this.GetWidth((currentLine || "") + (word || ""));

                        if (width > rectangle.Width) {
                            realText = (realText || "") + (((currentLine || "") + String.fromCharCode(10)) || "");
                            currentLine = (word || "") + " ";
                        } else {
                            currentLine = (currentLine || "") + (((word || "") + " ") || "");
                        }
                    }
                } finally {
                    if (H5.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                realText = (realText || "") + (currentLine || "");

                return this.GenerateBuffer(realText, color.$clone(), new JuiceboxEngine.Math.Vector3.$ctor2(rectangle.Left, ((rectangle.Top - this._cellHeight) | 0), 0.5));
            },
            /**
             * Generate a font vertex buffer.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Font
             * @memberof JuiceboxEngine.Graphics.Font
             * @param   {string}                         text      The text.
             * @param   {JuiceboxEngine.Math.Color}      color     The color of the text.
             * @param   {JuiceboxEngine.Math.Vector3}    offset    The offset from the origin. (object space)
             * @return  {Array.<number>}                           A float buffer with vertex data.
             */
            GenerateBuffer: function (text, color, offset) {
                var rawData = System.Array.init(H5.Int.mul(H5.Int.mul(text.length, 9), 6), 0, System.Single);

                var colorR = color.R;
                var colorG = color.G;
                var colorB = color.B;
                var colorA = color.A;

                var curPos = offset.$clone();

                for (var i = 0; i < text.length; i = (i + 1) | 0) {
                    var c = text.charCodeAt(i);

                    if (c === 10) {
                        curPos = new JuiceboxEngine.Math.Vector3.$ctor2(offset.X, curPos.Y - this._cellHeight, offset.Z);
                        continue;
                    }

                    if (c < this._charOffset) {
                        continue;
                    }

                    var no = (c - this._charOffset) | 0;
                    var texWidth = this._charWidths[c];
                    var texHeight = this._cellHeight;

                    var yCell = (H5.Int.div(no, (((H5.Int.div(this._height, this._cellHeight)) | 0)))) | 0;
                    var xCell = (no - H5.Int.mul(yCell, (((H5.Int.div(this._width, this._cellWidth)) | 0)))) | 0;

                    var charTexWidth = this._charWidths[c] / this._width;
                    var charTexHeight = this._cellHeight / this._height;

                    var texX = (xCell) * (this._cellWidth / this._width);
                    var texY = (((yCell + 1) | 0)) * (this._cellHeight / this._height);

                    this.BufferVertex(rawData, ((H5.Int.mul(H5.Int.mul(i, 9), 6) + 0) | 0), [curPos.X, curPos.Y, curPos.Z, texX, texY, colorR, colorG, colorB, colorA]);

                    this.BufferVertex(rawData, ((H5.Int.mul(H5.Int.mul(i, 9), 6) + 9) | 0), [curPos.X + texWidth, curPos.Y, curPos.Z, texX + charTexWidth, texY, colorR, colorG, colorB, colorA]);

                    this.BufferVertex(rawData, ((H5.Int.mul(H5.Int.mul(i, 9), 6) + 18) | 0), [curPos.X, curPos.Y + texHeight, curPos.Z, texX, texY - charTexHeight, colorR, colorG, colorB, colorA]);

                    this.BufferVertex(rawData, ((H5.Int.mul(H5.Int.mul(i, 9), 6) + 27) | 0), [curPos.X + texWidth, curPos.Y, curPos.Z, texX + charTexWidth, texY, colorR, colorG, colorB, colorA]);

                    this.BufferVertex(rawData, ((H5.Int.mul(H5.Int.mul(i, 9), 6) + 36) | 0), [curPos.X, curPos.Y + texHeight, curPos.Z, texX, texY - charTexHeight, colorR, colorG, colorB, colorA]);

                    this.BufferVertex(rawData, ((H5.Int.mul(H5.Int.mul(i, 9), 6) + 45) | 0), [curPos.X + texWidth, curPos.Y + texHeight, curPos.Z, texX + charTexWidth, texY - charTexHeight, colorR, colorG, colorB, colorA]);

                    curPos = new JuiceboxEngine.Math.Vector3.$ctor2(curPos.X + texWidth, curPos.Y, curPos.Z);
                }

                return rawData;
            },
            /**
             * Gets the width of how big the given string will be.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Font
             * @memberof JuiceboxEngine.Graphics.Font
             * @param   {string}    text    The text
             * @return  {number}            The width of the string.
             */
            GetWidth: function (text) {
                var width = 0.0;

                for (var i = 0; i < text.length; i = (i + 1) | 0) {
                    var c = text.charCodeAt(i);

                    if (c === 10) {
                        width = 0.0;
                        continue;
                    }

                    if (c < this._charOffset) {
                        continue;
                    }

                    var no = (c - this._charOffset) | 0;
                    var texWidth = this._charWidths[c];

                    width += texWidth;
                }

                return width;
            },
            BufferVertex: function (buffer, offset, data) {
                if (data === void 0) { data = []; }
                buffer[((offset + 0) | 0)] = data[0];
                buffer[((offset + 1) | 0)] = data[1];
                buffer[((offset + 2) | 0)] = data[2];
                buffer[((offset + 3) | 0)] = data[3];
                buffer[((offset + 4) | 0)] = data[4];
                buffer[((offset + 5) | 0)] = data[5];
                buffer[((offset + 6) | 0)] = data[6];
                buffer[((offset + 7) | 0)] = data[7];
                buffer[((offset + 8) | 0)] = data[8];
            },
            /**
             * Unload the font from memory.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Font
             * @memberof JuiceboxEngine.Graphics.Font
             * @return  {void}
             */
            Unload: function () {
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.DeleteTexture(this.Texture);
                this.Loaded = false;
            }
        }
    });

    /**
     * Loads a .bff font.
     *
     * @public
     * @class JuiceboxEngine.Graphics.FontResourceLoader
     * @augments JuiceboxEngine.Resources.ResourceLoader
     */
    H5.define("JuiceboxEngine.Graphics.FontResourceLoader", {
        inherits: [JuiceboxEngine.Resources.ResourceLoader],
        fields: {
            _textureLoader: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.FontResourceLoader
             * @memberof JuiceboxEngine.Graphics.FontResourceLoader
             * @param   {JuiceboxEngine.Graphics.TextureResourceLoader}    textureLoader    The texture resource loader.
             * @return  {void}
             */
            ctor: function (textureLoader) {
                this.$initialize();
                JuiceboxEngine.Resources.ResourceLoader.ctor.call(this, "FontLoader", "bff");
                this._textureLoader = textureLoader;
            }
        },
        methods: {
            /**
             * Loads a .bff file.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Graphics.FontResourceLoader
             * @memberof JuiceboxEngine.Graphics.FontResourceLoader
             * @param   {string}                                path
             * @return  {JuiceboxEngine.Resources.IResource}            A font or null if loading failed.
             */
            Load: function (path) {
                var textureWidth;
                var textureHeight;
                var charOffset;
                var charWidths;
                var cellWidth;
                var cellHeight;

                var filestream = new System.IO.FileStream.$ctor1(path, 3);

                var reader = new System.IO.BinaryReader.ctor(filestream);

                var h0 = reader.ReadByte();
                var h1 = reader.ReadByte();

                if (h0 !== 191 || h1 !== 242) {
                    System.Console.WriteLine("Unable to load font format. Make sure it is a .bff file. This file should be generated from CBFG.");
                    return null;
                }

                textureWidth = reader.ReadInt32();
                textureHeight = reader.ReadInt32();

                cellWidth = reader.ReadInt32();
                cellHeight = reader.ReadInt32();

                reader.ReadByte();

                charOffset = reader.ReadByte();
                charWidths = reader.ReadBytes(256);

                var texture = H5.cast(this._textureLoader.Load(System.String.replaceAll(path, ".bff", ".png")), JuiceboxEngine.Graphics.Texture2D);

                reader.Close();

                var font = new JuiceboxEngine.Graphics.Font(textureWidth, textureHeight, charOffset, charWidths, cellWidth, cellHeight, texture);
                font.Loaded = true;
                return font;
            }
        }
    });

    /**
     * @memberof System
     * @callback System.EventHandler
     * @param   {System.Object}    sender    
     * @param   {System.Object}    e
     * @return  {void}
     */

    /**
     * A texture resource.
     *
     * @public
     * @class JuiceboxEngine.Graphics.Texture2D
     * @implements  JuiceboxEngine.Resources.IResource
     */
    H5.define("JuiceboxEngine.Graphics.Texture2D", {
        inherits: [JuiceboxEngine.Resources.IResource],
        fields: {
            _sample: 0,
            _wrap: 0,
            /**
             * Width in pixels.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @function Width
             * @type number
             */
            Width: 0,
            /**
             * Height in pixels.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @function Height
             * @type number
             */
            Height: 0,
            /**
             * The platform specific texture.
             *
             * @instance
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @function Texture
             * @type H5.Core..WebGLTexture
             */
            Texture: null,
            /**
             * The texture name.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * Value used for sorting textures.
             *
             * @instance
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @type number
             */
            sortValue: 0,
            /**
             * True if the texture is loaded.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @function Loaded
             * @type boolean
             */
            Loaded: false
        },
        events: {
            /**
             * On load event.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Texture2D
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @function addonLoad
             * @param   {System.EventHandler}    value
             * @return  {void}
             */
            /**
             * On load event.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Texture2D
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @function removeonLoad
             * @param   {System.EventHandler}    value
             * @return  {void}
             */
            onLoad: null
        },
        props: {
            /**
             * Defines the way to sample the texture.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @function Sample
             * @type number
             */
            Sample: {
                get: function () {
                    return this._sample;
                },
                set: function (value) {
                    this._sample = value;
                    JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UpdateTexture(this);
                }
            },
            Wrap: {
                get: function () {
                    return this._wrap;
                },
                set: function (value) {
                    this._wrap = value;
                    JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.UpdateTexture(this);
                }
            }
        },
        alias: [
            "Name", "JuiceboxEngine$Resources$IResource$Name",
            "Loaded", "JuiceboxEngine$Resources$IResource$Loaded",
            "Unload", "JuiceboxEngine$Resources$IResource$Unload"
        ],
        ctors: {
            /**
             * Default constructor.
             Returns a white 1x1 texture.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Texture2D
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.Width = 1;
                this.Height = 1;
                this.Texture = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.DefaultTexture;
                this.Loaded = true;
            },
            /**
             * Constructor with byte array.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Texture2D
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @param   {number}            width     Width of the texture.
             * @param   {number}            height    Height of the texture.
             * @param   {Array.<number>}    data      The image data. Top left to bottom right.
             * @return  {void}
             */
            $ctor1: function (width, height, data) {
                this.$initialize();
                this.Width = width;
                this.Height = height;
                this.Texture = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.CreateTexture$1(width, height, data);
                this.Loaded = true;
            }
        },
        methods: {
            /**
             * Get pixel data from this texture.
             Note: This operation might be slow.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Texture2D
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @param   {JuiceboxEngine.Math.Rectangle}    rect    An rectangle representing the area of pixels to get.
             * @return  {Array.<number>}                           Array of bytes represenging colors (RGBA), or null when the operation failed.
             */
            GetPixels: function (rect) {
                if (!this.Loaded) {
                    return null;
                }

                return JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.GetPixels(this, rect.$clone());
            },
            /**
             * Finish up loading the texture.
             *
             * @instance
             * @this JuiceboxEngine.Graphics.Texture2D
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @return  {void}
             */
            FinishLoad: function () {
                !H5.staticEquals(this.onLoad, null) ? this.onLoad(this, null) : null;
                this.Loaded = true;
            },
            /**
             * Delete texture from graphics memory.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.Texture2D
             * @memberof JuiceboxEngine.Graphics.Texture2D
             * @return  {void}
             */
            Unload: function () {
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.DeleteTexture(this);
                this.Loaded = false;
            }
        }
    });

    /**
     * A shader program resource. Contians both vertex and fragment shaders.
     *
     * @public
     * @class JuiceboxEngine.Graphics.ShaderProgram
     * @implements  JuiceboxEngine.Resources.IResource
     */
    H5.define("JuiceboxEngine.Graphics.ShaderProgram", {
        inherits: [JuiceboxEngine.Resources.IResource],
        fields: {
            /**
             * The name of this shader, mostly for debugging purposes.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.ShaderProgram
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * The platform specific shader program.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.ShaderProgram
             * @function Program
             * @type H5.Core..WebGLProgram
             */
            Program: null,
            /**
             * Cached uniform locations.
             *
             * @instance
             * @memberof JuiceboxEngine.Graphics.ShaderProgram
             * @function UniformLocations
             * @type System.Collections.Generic.Dictionary$2
             */
            UniformLocations: null,
            /**
             * Cached vertex attribute locations.
             *
             * @instance
             * @memberof JuiceboxEngine.Graphics.ShaderProgram
             * @function VertexAttribLocations
             * @type System.Collections.Generic.Dictionary$2
             */
            VertexAttribLocations: null,
            DefaultShaderValues: null,
            /**
             * Is the shader loaded?
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.ShaderProgram
             * @function Loaded
             * @type boolean
             */
            Loaded: false
        },
        alias: [
            "Name", "JuiceboxEngine$Resources$IResource$Name",
            "Loaded", "JuiceboxEngine$Resources$IResource$Loaded",
            "Unload", "JuiceboxEngine$Resources$IResource$Unload"
        ],
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.ShaderProgram
             * @memberof JuiceboxEngine.Graphics.ShaderProgram
             * @param   {string}    vertSource    The vertex shader code.
             * @param   {string}    fragSource    The fragment shader code.
             * @return  {void}
             */
            ctor: function (vertSource, fragSource) {
                this.$initialize();
                this.Program = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.CompileShader(vertSource, fragSource);

                this.UniformLocations = new (System.Collections.Generic.Dictionary$2(System.String,JuiceboxEngine.Graphics.ShaderProgram.UniformLocation)).ctor();
                this.VertexAttribLocations = new (System.Collections.Generic.Dictionary$2(System.String,System.Int32)).ctor();

                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.CacheLocations(this);
            }
        },
        methods: {
            /**
             * Remove shader from graphics memory.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.ShaderProgram
             * @memberof JuiceboxEngine.Graphics.ShaderProgram
             * @return  {void}
             */
            Unload: function () {
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.DeleteShader(this);
                this.Loaded = false;
            }
        }
    });

    /**
     * Loader responsible for loading shaders.
     *
     * @public
     * @class JuiceboxEngine.Graphics.ShaderResourceLoader
     * @augments JuiceboxEngine.Resources.ResourceLoader
     */
    H5.define("JuiceboxEngine.Graphics.ShaderResourceLoader", {
        inherits: [JuiceboxEngine.Resources.ResourceLoader],
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.ShaderResourceLoader
             * @memberof JuiceboxEngine.Graphics.ShaderResourceLoader
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                JuiceboxEngine.Resources.ResourceLoader.ctor.call(this, "ShaderLoader", "vert");
            }
        },
        methods: {
            /**
             * Load a shader program.(.vert and .frag combination)
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Graphics.ShaderResourceLoader
             * @memberof JuiceboxEngine.Graphics.ShaderResourceLoader
             * @param   {string}                                path    Path to the vert or fragment shader.
             * @return  {JuiceboxEngine.Resources.IResource}            A shader likely to be compiled. (if all goes well)
             */
            Load: function (path) {
                var $t, $t1;
                if (!System.String.contains(path,".")) {
                    path = (path || "") + ".";
                }

                var vertPath = (($t = System.String.split(path, System.Array.init([46], System.Char).map(function (i) {{ return String.fromCharCode(i); }}), null, 1))[0] || "") + ".vert";
                var fragPath = (($t1 = System.String.split(path, System.Array.init([46], System.Char).map(function (i) {{ return String.fromCharCode(i); }}), null, 1))[0] || "") + ".frag";

                var vertSource = System.IO.File.ReadAllText(vertPath);
                var fragSource = System.IO.File.ReadAllText(fragPath);

                var program = new JuiceboxEngine.Graphics.ShaderProgram(vertSource, fragSource);
                program.Loaded = true;

                return program;
            }
        }
    });

    /**
     * Loader that loads .png files to a {@link }.
     *
     * @public
     * @class JuiceboxEngine.Graphics.TextureResourceLoader
     * @augments JuiceboxEngine.Resources.ResourceLoader
     */
    H5.define("JuiceboxEngine.Graphics.TextureResourceLoader", {
        inherits: [JuiceboxEngine.Resources.ResourceLoader],
        fields: {
            _sortValue: 0
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.TextureResourceLoader
             * @memberof JuiceboxEngine.Graphics.TextureResourceLoader
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                JuiceboxEngine.Resources.ResourceLoader.ctor.call(this, "TextureLoader", "png");
                this._sortValue = 0;
            }
        },
        methods: {
            /**
             * Load in a 2D texture.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Graphics.TextureResourceLoader
             * @memberof JuiceboxEngine.Graphics.TextureResourceLoader
             * @param   {string}                                path
             * @return  {JuiceboxEngine.Resources.IResource}
             */
            Load: function (path) {
                var texture = new JuiceboxEngine.Graphics.Texture2D.ctor();
                texture.Name = path;
                texture.Loaded = false;

                var image = document.createElement("img");
                image.onload = H5.fn.bind(this, function (x) {
                    texture.Texture = this.OnDataLoaded(image);
                    texture.Width = (image.width) | 0;
                    texture.Height = (image.height) | 0;
                    texture.sortValue = this._sortValue;
                    texture.FinishLoad();

                    this._sortValue = (this._sortValue + 1) | 0;
                });

                image.addEventListener("error", function () {
                    System.Console.WriteLine(System.String.format("Failed to load image {0}!", [path]));
                    texture.FinishLoad();
                });

                image.src = path;

                return texture;
            },
            OnDataLoaded: function (element) {
                return JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.CreateTexture(element);
            }
        }
    });

    /**
     * An abstract graphics component class.
     GraphicsComponents have a render function that is called when the scene is rendered.
     *
     * @abstract
     * @public
     * @class JuiceboxEngine.GraphicsComponent
     * @augments JuiceboxEngine.Component
     */
    H5.define("JuiceboxEngine.GraphicsComponent", {
        inherits: [JuiceboxEngine.Component]
    });

    /**
     * A plain UI element, does not render anything but can be used for scaling.
     *
     * @public
     * @class JuiceboxEngine.GUI.EmptyUIElement
     * @augments JuiceboxEngine.GUI.UIElement
     */
    H5.define("JuiceboxEngine.GUI.EmptyUIElement", {
        inherits: [JuiceboxEngine.GUI.UIElement],
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @this JuiceboxEngine.GUI.EmptyUIElement
             * @memberof JuiceboxEngine.GUI.EmptyUIElement
             * @param   {JuiceboxEngine.GUI.UIElement}                parent             The parent UI element.
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager    The resource manager to use.
             * @return  {void}
             */
            $ctor1: function (parent, resourceManager) {
                if (resourceManager === void 0) { resourceManager = null; }

                this.$initialize();
                JuiceboxEngine.GUI.UIElement.$ctor1.call(this, parent, resourceManager);

            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.EmptyUIElement
             * @memberof JuiceboxEngine.GUI.EmptyUIElement
             * @param   {JuiceboxEngine.GUI.UIElement}    parent    The parent UI element.
             * @return  {void}
             */
            ctor: function (parent) {
                JuiceboxEngine.GUI.EmptyUIElement.$ctor1.call(this, parent, null);

            }
        },
        methods: {
            /**
             * Render the UI element.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.GUI.EmptyUIElement
             * @memberof JuiceboxEngine.GUI.EmptyUIElement
             * @return  {void}
             */
            Render: function () {
                return;
            },
            /**
             * Don't do anything here.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.GUI.EmptyUIElement
             * @memberof JuiceboxEngine.GUI.EmptyUIElement
             * @return  {void}
             */
            UpdateElement: function () {
                return;
            }
        }
    });

    /**
     * UI element showing an image.
     *
     * @public
     * @class JuiceboxEngine.GUI.Image
     * @augments JuiceboxEngine.GUI.UIElement
     */
    H5.define("JuiceboxEngine.GUI.Image", {
        inherits: [JuiceboxEngine.GUI.UIElement],
        fields: {
            _displayImage: null
        },
        props: {
            /**
             * The image to show.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.Image
             * @function DisplayImage
             * @type JuiceboxEngine.Graphics.Texture2D
             */
            DisplayImage: {
                get: function () {
                    return this._displayImage;
                },
                set: function (value) {
                    this._displayImage = value;
                    this.ForceUpdate();
                }
            }
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.Image
             * @memberof JuiceboxEngine.GUI.Image
             * @param   {JuiceboxEngine.GUI.UIElement}    parent    The parent UI element.
             * @return  {void}
             */
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.UIElement.ctor.call(this, parent);
                this._displayImage = new JuiceboxEngine.Graphics.Texture2D.ctor();
                this._command.SetShaderValue("texture", new JuiceboxEngine.Graphics.Texture2D.ctor());
            }
        },
        methods: {
            /**
             * Render a image.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.GUI.Image
             * @memberof JuiceboxEngine.GUI.Image
             * @return  {void}
             */
            Render: function () {
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.Command(this._command);
            },
            /**
             * Update image vertex buffer and texture.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.GUI.Image
             * @memberof JuiceboxEngine.GUI.Image
             * @return  {void}
             */
            UpdateElement: function () {
                var data = System.Array.init([0.0, 0.0, 0.5, 0.0, 1.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A, 0.0 + this.Dimensions.X, 0.0, 0.5, 1.0, 1.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A, 0.0 + this.Dimensions.X, 0.0 + this.Dimensions.Y, 0.5, 1.0, 0.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A, 0.0, 0.0, 0.5, 0.0, 1.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A, 0.0, 0.0 + this.Dimensions.Y, 0.5, 0.0, 0.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A, 0.0 + this.Dimensions.X, 0.0 + this.Dimensions.Y, 0.5, 1.0, 0.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A], System.Single);

                this._command.SetShaderValue("texture", this.DisplayImage);
                this._command.VertexBuffer.UpdateData(data);
            }
        }
    });

    /**
     * UI panel, is a colored rectangle.
     *
     * @public
     * @class JuiceboxEngine.GUI.Panel
     * @augments JuiceboxEngine.GUI.UIElement
     */
    H5.define("JuiceboxEngine.GUI.Panel", {
        inherits: [JuiceboxEngine.GUI.UIElement],
        ctors: {
            /**
             * A panel UI element. Only has a color, and no texture.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.Panel
             * @memberof JuiceboxEngine.GUI.Panel
             * @param   {JuiceboxEngine.GUI.UIElement}    parent    The UI element parent.
             * @return  {void}
             */
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.UIElement.ctor.call(this, parent);
                this._command.SetShaderValue("texture", new JuiceboxEngine.Graphics.Texture2D.ctor());
            }
        },
        methods: {
            /**
             * Render the panel rectangle.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.GUI.Panel
             * @memberof JuiceboxEngine.GUI.Panel
             * @return  {void}
             */
            Render: function () {
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.Command(this._command);
            },
            /**
             * Update panel vertex buffer.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.GUI.Panel
             * @memberof JuiceboxEngine.GUI.Panel
             * @return  {void}
             */
            UpdateElement: function () {
                var data = System.Array.init([0.0, 0.0, 0.5, 0.0, 0.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A, 0.0 + this.Dimensions.X, 0.0, 0.5, 1.0, 0.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A, 0.0 + this.Dimensions.X, 0.0 + this.Dimensions.Y, 0.5, 1.0, 1.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A, 0.0, 0.0, 0.5, 0.0, 0.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A, 0.0, 0.0 + this.Dimensions.Y, 0.5, 0.0, 1.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A, 0.0 + this.Dimensions.X, 0.0 + this.Dimensions.Y, 0.5, 1.0, 1.0, this.Color.R, this.Color.G, this.Color.B, this.Color.A], System.Single);

                this._command.VertexBuffer.UpdateData(data);
            }
        }
    });

    /**
     * A text UI element, used for displaying strings of text.
     *
     * @public
     * @class JuiceboxEngine.GUI.Text
     * @augments JuiceboxEngine.GUI.UIElement
     */
    H5.define("JuiceboxEngine.GUI.Text", {
        inherits: [JuiceboxEngine.GUI.UIElement],
        fields: {
            shadowColor: null,
            _shadow: null,
            _displayText: null,
            _font: null,
            _textAlignment: 0,
            _shadowBuffer: null
        },
        props: {
            /**
             * The font to use in this element.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.Text
             * @function Font
             * @type JuiceboxEngine.Graphics.Font
             */
            Font: {
                get: function () {
                    return this._font;
                },
                set: function (value) {
                    this._font = value;
                    this.ForceUpdate();
                }
            },
            /**
             * The text to display.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.Text
             * @function DisplayText
             * @type string
             */
            DisplayText: {
                get: function () {
                    return this._displayText;
                },
                set: function (value) {
                    if (!H5.referenceEquals(this._displayText, value)) {
                        this._displayText = value;
                        this.ForceUpdate();
                    }
                }
            },
            /**
             * Set the text alignment.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.Text
             * @function TextAlignment
             * @type JuiceboxEngine.GUI.TextAlignment
             */
            TextAlignment: {
                get: function () {
                    return this._textAlignment;
                },
                set: function (value) {
                    this._textAlignment = value;
                    this.ForceUpdate();
                }
            },
            /**
             * Text shadow, if point is zero, zero no shadow will be applied.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.Text
             * @function ShadowOffset
             * @type JuiceboxEngine.Math.Point
             */
            ShadowOffset: {
                get: function () {
                    return this._shadow.$clone();
                },
                set: function (value) {
                    this._shadow = value.$clone();

                    if (this._shadowBuffer == null) {
                        this._shadowBuffer = new JuiceboxEngine.Graphics.VertexBuffer.ctor();
                        this._shadowBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 36, 0));
                        this._shadowBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 36, 12));
                        this._shadowBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_col", 4, false, 36, 20));
                    }

                    this.ForceUpdate();
                }
            },
            /**
             * Color of the text shadow.
             Enable shadow using {@link }
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.Text
             * @function ShadowColor
             * @type JuiceboxEngine.Math.Color
             */
            ShadowColor: {
                get: function () {
                    return this.shadowColor.$clone();
                },
                set: function (value) {
                    this.shadowColor = value.$clone();
                    this.ForceUpdate();
                }
            }
        },
        ctors: {
            init: function () {
                this.shadowColor = new JuiceboxEngine.Math.Color();
                this._shadow = new JuiceboxEngine.Math.Point();
            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.Text
             * @memberof JuiceboxEngine.GUI.Text
             * @param   {JuiceboxEngine.GUI.UIElement}    parent
             * @return  {void}
             */
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.UIElement.ctor.call(this, parent);
                this.Font = this.ResourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/Arial.bff");

                this.TextAlignment = JuiceboxEngine.GUI.TextAlignment.Left;
                this.ShadowColor = JuiceboxEngine.Math.Color.Black.$clone();

                this._command.SetShaderValue("texture", this.Font.Texture);
            }
        },
        methods: {
            /**
             * Generate and render the text.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.GUI.Text
             * @memberof JuiceboxEngine.GUI.Text
             * @return  {void}
             */
            Render: function () {
                if (System.String.isNullOrEmpty(this.DisplayText)) {
                    return;
                }

                var vertexBuffer = this._command.VertexBuffer;
                if (JuiceboxEngine.Math.Point.op_Inequality(this._shadow.$clone(), JuiceboxEngine.Math.Point.Zero.$clone())) {
                    this._command.VertexBuffer = this._shadowBuffer;
                    JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.Command(this._command);
                }

                this._command.VertexBuffer = vertexBuffer;
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.Command(this._command);
            },
            /**
             * Resize the element to fit the text.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.Text
             * @memberof JuiceboxEngine.GUI.Text
             * @param   {number}    height    Text box height. If 0, the height remains untouched.
             * @return  {void}
             */
            ResizeToText: function (height) {
                if (height === void 0) { height = 0.0; }
                this.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this.Font.GetWidth(this.DisplayText), height === 0 ? this.Dimensions.Y : height);
            },
            /**
             * Update display text and vertex buffer.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.GUI.Text
             * @memberof JuiceboxEngine.GUI.Text
             * @return  {void}
             */
            UpdateElement: function () {
                this._command.SetShaderValue("texture", this.Font.Texture);
                var rectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, H5.Int.clip32(this.Dimensions.X), H5.Int.clip32(this.Dimensions.Y));

                var data = this.Font.GenerateBufferInRect(this.DisplayText, this.Color.$clone(), rectangle.$clone());
                this._command.VertexBuffer.UpdateData(data);
                this._command.VertexBuffer.VertexRange = this._command.VertexBuffer.CalculateVertexCount(data.length);

                if (JuiceboxEngine.Math.Point.op_Inequality(this._shadow.$clone(), JuiceboxEngine.Math.Point.Zero.$clone())) {
                    var rectangleShadow = new JuiceboxEngine.Math.Rectangle.$ctor2(((rectangle.X + this._shadow.X) | 0), ((rectangle.Y + this._shadow.Y) | 0), rectangle.Width, rectangle.Height);
                    var shadowData = this.Font.GenerateBufferInRect(this.DisplayText, this.ShadowColor.$clone(), rectangleShadow.$clone());
                    this._shadowBuffer.UpdateData(shadowData);
                    this._shadowBuffer.VertexRange = this._command.VertexBuffer.CalculateVertexCount(shadowData.length);
                }
            }
        }
    });

    /**
     * A UI mouse event.
     *
     * @public
     * @class JuiceboxEngine.GUI.UIMouseEvent
     * @augments JuiceboxEngine.GUI.UIEvent
     */
    H5.define("JuiceboxEngine.GUI.UIMouseEvent", {
        inherits: [JuiceboxEngine.GUI.UIEvent],
        fields: {
            /**
             * The mouse position.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIMouseEvent
             * @type JuiceboxEngine.Math.Vector2
             */
            position: null,
            /**
             * Absolute position of the mouse.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.UIMouseEvent
             * @type JuiceboxEngine.Math.Vector2
             */
            absolutePosition: null
        },
        ctors: {
            init: function () {
                this.position = new JuiceboxEngine.Math.Vector2();
                this.absolutePosition = new JuiceboxEngine.Math.Vector2();
            },
            /**
             * Contructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.UIMouseEvent
             * @memberof JuiceboxEngine.GUI.UIMouseEvent
             * @param   {JuiceboxEngine.GUI.UIElement}    element     The affected UI element.
             * @param   {JuiceboxEngine.Math.Vector2}     position    The mouse position.
             * @return  {void}
             */
            ctor: function (element, position) {
                this.$initialize();
                JuiceboxEngine.GUI.UIEvent.ctor.call(this, element);
                this.position = position.$clone();
                this.absolutePosition = JuiceboxEngine.Math.Vector2.op_Subtraction(JuiceboxEngine.Math.Vector2.op_Addition(position.$clone(), element.AbsolutePosition.$clone()), element.RootElement.Position.$clone());
            }
        }
    });

    /**
     * @memberof JuiceboxEngine.Physics
     * @callback JuiceboxEngine.Physics.BodyP2.MouseHoverEvent
     * @return  {void}
     */

    /** @namespace JuiceboxEngine.Physics */

    /**
     * @memberof JuiceboxEngine.Physics
     * @callback JuiceboxEngine.Physics.BodyP2.CollisionEvent
     * @param   {JuiceboxEngine.Physics.BodyP2}    OtherBody
     * @return  {void}
     */

    H5.define("JuiceboxEngine.Physics.BodyP2", {
        inherits: [JuiceboxEngine.Component],
        fields: {
            body: null,
            _mass: 0,
            _lockRotation: false,
            _triggerOnly: false,
            _collisionMask: 0,
            _collisionGroup: 0,
            _collisions: null
        },
        events: {
            /**
             * Called when collision starts.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function addOnCollisionStart
             * @param   {JuiceboxEngine.Physics.BodyP2.CollisionEvent}    value
             * @return  {void}
             */
            /**
             * Called when collision starts.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function removeOnCollisionStart
             * @param   {JuiceboxEngine.Physics.BodyP2.CollisionEvent}    value
             * @return  {void}
             */
            OnCollisionStart: null,
            /**
             * Called every frame while colliding with another object.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function addOnCollisionStay
             * @param   {JuiceboxEngine.Physics.BodyP2.CollisionEvent}    value
             * @return  {void}
             */
            /**
             * Called every frame while colliding with another object.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function removeOnCollisionStay
             * @param   {JuiceboxEngine.Physics.BodyP2.CollisionEvent}    value
             * @return  {void}
             */
            OnCollisionStay: null,
            /**
             * Called when collision ends.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function addOnCollisionEnd
             * @param   {JuiceboxEngine.Physics.BodyP2.CollisionEvent}    value
             * @return  {void}
             */
            /**
             * Called when collision ends.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function removeOnCollisionEnd
             * @param   {JuiceboxEngine.Physics.BodyP2.CollisionEvent}    value
             * @return  {void}
             */
            OnCollisionEnd: null,
            /**
             * Called when mouse is hovering this object.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function addOnMouseHover
             * @param   {JuiceboxEngine.Physics.BodyP2.MouseHoverEvent}    value
             * @return  {void}
             */
            /**
             * Called when mouse is hovering this object.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function removeOnMouseHover
             * @param   {JuiceboxEngine.Physics.BodyP2.MouseHoverEvent}    value
             * @return  {void}
             */
            OnMouseHover: null
        },
        props: {
            /**
             * Mass of the body. Must be &gt;= to 0. If 0, the body will be static.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function Mass
             * @type number
             */
            Mass: {
                get: function () {
                    return this._mass;
                },
                set: function (value) {
                    this._mass = value;
                    this.body.mass = this._mass;
                    this.body.updateMassProperties();
                }
            },
            /**
             * Lock the rotation of the object.
             Any forces applied won't cause the object to rotate.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function LockRotation
             * @type boolean
             */
            LockRotation: {
                get: function () {
                    return this._lockRotation;
                },
                set: function (value) {
                    this._lockRotation = value;
                    this.body.fixedRotation = value === false ? 0 : 1;
                }
            },
            /**
             * Make this body a trigger only.
             It will still fire collision events, but will move through other bodies.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function TriggerOnly
             * @type boolean
             */
            TriggerOnly: {
                get: function () {
                    return this._triggerOnly;
                },
                set: function (value) {
                    this._triggerOnly = value;
                    this.body.collisionResponse = !value;
                }
            },
            /**
             * Collision group this body belongs to. (and all the shapes)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function CollisionGroup
             * @type number
             */
            CollisionGroup: {
                get: function () {
                    return this._collisionGroup;
                },
                set: function (value) {
                    var $t;
                    this._collisionGroup = value;

                    $t = H5.getEnumerator(this.body.shapes);
                    try {
                        while ($t.moveNext()) {
                            var shape = $t.Current;
                            shape.collisionGroup = this._collisionGroup;
                        }
                    } finally {
                        if (H5.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }
            },
            /**
             * Collision mask for this body. (and all the shapes)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @function CollisionMask
             * @type number
             */
            CollisionMask: {
                get: function () {
                    return this._collisionMask;
                },
                set: function (value) {
                    var $t;
                    this._collisionMask = value;

                    $t = H5.getEnumerator(this.body.shapes);
                    try {
                        while ($t.moveNext()) {
                            var shape = $t.Current;
                            shape.collisionMask = this._collisionMask;
                        }
                    } finally {
                        if (H5.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                JuiceboxEngine.Component.ctor.call(this);
                var options = { };
                options.mass = 1;
                options.angle = 0;
                options.velocity = System.Array.init([0, 0], System.Double);
                options.angularVelocity = 0;

                this.body = new (H5.virtualc("p2.Body"))(options);

                this._collisions = new (System.Collections.Generic.List$1(JuiceboxEngine.Physics.BodyP2)).ctor();

                this.body.bodyp2 = this;
            }
        },
        methods: {
            Initialize: function (resourceManager) {
                this.body.position = System.Array.init([this.Parent.Transform.Position2D.X, this.Parent.Transform.Position2D.Y], System.Double);
            },
            /**
             * Apply force to the body.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @param   {JuiceboxEngine.Math.Vector2}    force    The force applied to the body.
             * @return  {void}
             */
            ApplyForce: function (force) {
                this.body.applyForce(System.Array.init([force.X, force.Y], System.Double));
            },
            /**
             * Add circle shape to the body.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @param   {number}                         radius    Radius of the circle.
             * @param   {JuiceboxEngine.Math.Vector2}    offset    Offset from the GameObject center.
             * @return  {void}
             */
            AddCircle: function (radius, offset) {
                var options = { };
                options.position = System.Array.init([offset.X, offset.Y], System.Double);
                options.radius = radius;

                var circle = new (H5.virtualc("p2.Circle"))(options);
                this.body.addShape(circle);
            },
            /**
             * Add rectangle to the body.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @param   {JuiceboxEngine.Math.RectangleF}    rect
             * @return  {void}
             */
            AddRectangle: function (rect) {
                var options = { };
                options.width = rect.Width;
                options.height = rect.Height;

                var box = new (H5.virtualc("p2.Box"))(options);
                box.position = System.Array.init([rect.X, rect.Y], System.Double);

                this.body.addShape(box);
            },
            StartCollision: function (other) {
                this._collisions.add(other);
                !H5.staticEquals(this.OnCollisionStart, null) ? this.OnCollisionStart(other) : null;
            },
            EndCollision: function (other) {
                this._collisions.remove(other);
                !H5.staticEquals(this.OnCollisionEnd, null) ? this.OnCollisionEnd(other) : null;
            },
            MouseHover: function () {
                !H5.staticEquals(this.OnMouseHover, null) ? this.OnMouseHover() : null;
            },
            Update: function () {
                var position = this.body.position;

                this.Parent.Transform.Position2D = new JuiceboxEngine.Math.Vector2.$ctor3(position[0], position[1]);
                this.Parent.Transform.Rotation = new JuiceboxEngine.Math.Vector3.$ctor2(this.Parent.Transform.Rotation.X, this.Parent.Transform.Rotation.Y, this.body.angle);

                for (var i = 0; i < this._collisions.Count; i = (i + 1) | 0) {
                    !H5.staticEquals(this.OnCollisionStay, null) ? this.OnCollisionStay(this._collisions.getItem(i)) : null;
                }
            },
            Destroy: function () {

            },
            /**
             * Only one body component allowed per gameobject.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Physics.BodyP2
             * @memberof JuiceboxEngine.Physics.BodyP2
             * @return  {boolean}        True.
             */
            Unique: function () {
                return true;
            }
        }
    });

    /**
     * Task for leaderboard data.
     *
     * @public
     * @class JuiceboxEngine.Playfab.PlayfabTaskLeaderboard
     * @augments JuiceboxEngine.Playfab.PlayfabTask
     */
    H5.define("JuiceboxEngine.Playfab.PlayfabTaskLeaderboard", {
        inherits: [JuiceboxEngine.Playfab.PlayfabTask],
        fields: {
            /**
             * The leaderboard. Only has data when task has finished.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Playfab.PlayfabTaskLeaderboard
             * @function Leaderboard
             * @type JuiceboxEngine.Playfab.Leaderboard
             */
            Leaderboard: null
        },
        ctors: {
            /**
             * Leaderboard task constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Playfab.PlayfabTaskLeaderboard
             * @memberof JuiceboxEngine.Playfab.PlayfabTaskLeaderboard
             * @param   {JuiceboxEngine.Playfab.Leaderboard}    leaderboard    Leaderboard to write to.
             * @return  {void}
             */
            ctor: function (leaderboard) {
                this.$initialize();
                JuiceboxEngine.Playfab.PlayfabTask.ctor.call(this);
                this.Leaderboard = leaderboard;
            }
        }
    });

    /**
     * Default splash screen for loading.
     *
     * @class JuiceboxEngine.SplashScene
     * @augments JuiceboxEngine.Scene
     */
    H5.define("JuiceboxEngine.SplashScene", {
        inherits: [JuiceboxEngine.Scene],
        fields: {
            _switchTo: null,
            _preloader: null,
            _done: false,
            _info: null,
            _icon: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.SplashScene
             * @memberof JuiceboxEngine.SplashScene
             * @param   {JuiceboxEngine.Resources.ResourceManager}    manager     The resource manager.
             * @param   {JuiceboxEngine.Scene}                        switchTo    Scene to start with.
             * @return  {void}
             */
            ctor: function (manager, switchTo) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);
                this._switchTo = switchTo;
                this._done = false;

                this._preloader = new JuiceboxEngine.Resources.Preloader();

                var preloadList = System.IO.File.ReadAllLines(JuiceboxEngine.Util.Config.ConfigValues.PreloadList);

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(this._preloader.PreloadCoroutine(this.ResourceManager, preloadList));
            }
        },
        methods: {
            InitializeScene: function () {
                this.DefaultCamera.Zoom = (H5.Int.div(4, JuiceboxEngine.Util.Config.ConfigValues.PixelSize)) | 0;
                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(15, 15, 15, 255);

                var icon = this.AddGameObject$1("Icon");
                icon.Transform.Position = new JuiceboxEngine.Math.Vector3.$ctor2(0, 0, 1.0);
                this._icon = icon.AddComponent(JuiceboxEngine.Sprite);
                this._icon.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-8.0, 16.0);
                this._icon.Color = JuiceboxEngine.Math.Color.White.$clone();
                this._icon.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/JuiceboxIcon.png");

                var textComponent = icon.AddComponent(JuiceboxEngine.TextComponent);
                textComponent.DisplayText = "Juicebox Engine";
                textComponent.Alignment = JuiceboxEngine.GUI.TextAlignment.Center;

                this._info = new JuiceboxEngine.GUI.Text(this.GUI.Root);
                this._info.DisplayText = "";
                this._info.Pivot = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 1);
                this._info.Anchor = new JuiceboxEngine.Math.Vector2.$ctor3(0.5, 1);
                this._info.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(0, 16);

                JuiceboxEngine.Coroutines.CoroutineManager.StartCoroutine(JuiceboxEngine.Coroutines.DefaultRoutines.Linear(1.0, H5.fn.bind(this, function (x) {
                    this._icon.Size = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(1, 1), (1 + JuiceboxEngine.Math.Easings.ElasticEaseIn(1.0 - x)));
                    this._icon.Offset = JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(-8.0, 16.0), (1 + JuiceboxEngine.Math.Easings.ElasticEaseIn(1.0 - x)));
                })));
            },
            /**
             * Called every frame before gameobject updates.
             *
             * @instance
             * @protected
             * @override
             * @this JuiceboxEngine.SplashScene
             * @memberof JuiceboxEngine.SplashScene
             * @return  {void}
             */
            PreUpdate: function () {
                var percentage = JuiceboxEngine.Math.JMath.Round(this._preloader.Preloaded / this._preloader.ToPreload * 100);

                if (percentage === Number.NaN) {
                    percentage = 0;
                }

                this._info.DisplayText = System.String.format("Loading {0}%", [percentage]);
                this._info.Dimensions = new JuiceboxEngine.Math.Vector2.$ctor3(this._info.Font.GetWidth(this._info.DisplayText), this._info.Dimensions.Y);

                if (this._preloader.Preloaded === this._preloader.ToPreload && !this._done) {
                    this._done = true;

                    if (this._switchTo != null) {
                        this.SceneManager.SwitchToScene(this._switchTo);
                    } else {
                        System.Console.WriteLine("No scene to switch to.");
                    }
                }
            },
            /**
             * Called every frame after gameobject updates.
             *
             * @instance
             * @protected
             * @override
             * @this JuiceboxEngine.SplashScene
             * @memberof JuiceboxEngine.SplashScene
             * @return  {void}
             */
            LateUpdate: function () {

            },
            /**
             * Called when the scene gets destroyed.
             *
             * @instance
             * @protected
             * @override
             * @this JuiceboxEngine.SplashScene
             * @memberof JuiceboxEngine.SplashScene
             * @return  {void}
             */
            FinalizeScene: function () {

            }
        }
    });

    H5.define("JuiceboxEngine.TestScene", {
        inherits: [JuiceboxEngine.Scene],
        fields: {
            _fps: null,
            _ballCount: 0
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                JuiceboxEngine.Scene.ctor.call(this, manager);
                this._ballCount = 0;
            }
        },
        methods: {
            InitializeScene: function () {
                this.DefaultCamera.ClearColor = new JuiceboxEngine.Math.Color.$ctor2(125, 91, 166, 255);
                this.DefaultCamera.Zoom = 2;

                this.PhysicsWorld.SetGravity(new JuiceboxEngine.Math.Vector2.$ctor3(0, -100));

                this._fps = new JuiceboxEngine.GUI.Text(this.GUI.Root);
                this._fps.DisplayText = "fps counter";
                this._fps.ResizeToText(16);

            },
            PreUpdate: function () {
                if (JuiceboxEngine.Input.InputManager.Instance.MouseKeyDown(JuiceboxEngine.Input.MouseKey.LeftMouse)) {
                    var obj = this.AddGameObject$1(System.String.format("ball {0}", [this._ballCount]));
                    this._ballCount = (this._ballCount + 1) | 0;

                    obj.Transform.Position2D = this.DefaultCamera.ScreenPointToWorld(JuiceboxEngine.Input.InputManager.Instance.MousePosition.$clone());


                    var body = obj.AddComponent(JuiceboxEngine.Physics.BodyP2);
                    body.Mass = 1;
                    body.AddCircle(8, new JuiceboxEngine.Math.Vector2.$ctor3(0, 0));
                    body.LockRotation = false;

                    var sprite = obj.AddComponent(JuiceboxEngine.Sprite);
                    sprite.Texture = this.ResourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/masterball.png");
                    sprite.Offset = new JuiceboxEngine.Math.Vector2.$ctor3(-12, -12);
                    sprite.Flip = JuiceboxEngine.Util.Random.NextRange$1(0.0, 1.0) < 0.5 ? JuiceboxEngine.Sprite.SpriteFlip.None : JuiceboxEngine.Sprite.SpriteFlip.HorizontalFlip;

                    var particles = obj.AddComponent(JuiceboxEngine.Particles.BurstParticleComponent);
                    particles.BurstAmount = 200;
                    particles.Burst();
                }
            },
            LateUpdate: function () {
                this._fps.DisplayText = System.String.format("frame time: {0}ms ({1} fps)", JuiceboxEngine.Util.Time.DeltaTimeRealTime * 1000, JuiceboxEngine.Math.JMath.Round(1.0 / JuiceboxEngine.Util.Time.DeltaTimeRealTime));
                this._fps.ResizeToText(16);
            },
            FinalizeScene: function () {

            }
        }
    });

    /**
     * Transform component of a gameobject. Every gameobject has one.
     *
     * @public
     * @class JuiceboxEngine.Transform
     * @augments JuiceboxEngine.Component
     */
    H5.define("JuiceboxEngine.Transform", {
        inherits: [JuiceboxEngine.Component],
        fields: {
            /**
             * The position in 3D space.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Transform
             * @function Position
             * @type JuiceboxEngine.Math.Vector3
             */
            Position: null,
            /**
             * The rotation in 3D space.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Transform
             * @function Rotation
             * @type JuiceboxEngine.Math.Vector3
             */
            Rotation: null,
            /**
             * The scale in 3D space.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Transform
             * @function Scale
             * @type JuiceboxEngine.Math.Vector3
             */
            Scale: null
        },
        props: {
            /**
             * Hides the Component.Enabled. The transform component cannot be disabled.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Transform
             * @function Enabled$1
             * @type boolean
             */
            Enabled$1: {
                get: function () {
                    return true;
                },
                set: function (value) { }
            },
            /**
             * Gets or sets a position with a 2D Vector.
             The Z component is unchanged.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Transform
             * @function Position2D
             * @type JuiceboxEngine.Math.Vector2
             */
            Position2D: {
                get: function () {
                    return new JuiceboxEngine.Math.Vector2.$ctor3(this.Position.X, this.Position.Y);
                },
                set: function (value) {
                    this.Position = new JuiceboxEngine.Math.Vector3.$ctor2(value.X, value.Y, this.Position.Z);
                }
            },
            Rotation2D: {
                get: function () {
                    return this.Rotation.Z;
                },
                set: function (value) {
                    this.Rotation = new JuiceboxEngine.Math.Vector3.$ctor2(this.Rotation.X, this.Rotation.Y, value);
                }
            }
        },
        ctors: {
            init: function () {
                this.Position = new JuiceboxEngine.Math.Vector3();
                this.Rotation = new JuiceboxEngine.Math.Vector3();
                this.Scale = new JuiceboxEngine.Math.Vector3();
            },
            /**
             * Default constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Transform
             * @memberof JuiceboxEngine.Transform
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                JuiceboxEngine.Component.ctor.call(this);
                this.Position = new JuiceboxEngine.Math.Vector3.$ctor2(0.0, 0.0, 0.0);
                this.Scale = new JuiceboxEngine.Math.Vector3.$ctor1(1.0);
            }
        },
        methods: {
            /**
             * This function is called every frame.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Transform
             * @memberof JuiceboxEngine.Transform
             * @return  {void}
             */
            Update: function () {

            },
            /**
             * Translate the game object.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Transform
             * @memberof JuiceboxEngine.Transform
             * @param   {JuiceboxEngine.Math.Vector3}    translation
             * @return  {void}
             */
            Translate: function (translation) {
                this.Position = JuiceboxEngine.Math.Vector3.op_Addition(this.Position.$clone(), translation.$clone());
            },
            /**
             * Translate the game object.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Transform
             * @memberof JuiceboxEngine.Transform
             * @param   {JuiceboxEngine.Math.Vector2}    translation
             * @return  {void}
             */
            Translate2D: function (translation) {
                this.Position = JuiceboxEngine.Math.Vector3.op_Addition(this.Position.$clone(), new JuiceboxEngine.Math.Vector3.$ctor2(translation.X, translation.Y, 0));
            },
            /**
             * Get the world matrix.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Transform
             * @memberof JuiceboxEngine.Transform
             * @return  {JuiceboxEngine.Math.Matrix4}        A world matrix based on position, rotation and scale.
             */
            GetWorldMatrix: function () {
                return JuiceboxEngine.Math.Matrix4.Multiply(JuiceboxEngine.Math.Matrix4.Multiply(JuiceboxEngine.Math.Matrix4.CreateScale(this.Scale.$clone()), JuiceboxEngine.Math.Matrix4.CreateFromYawPitchRoll(this.Rotation.X, this.Rotation.Y, this.Rotation.Z)), JuiceboxEngine.Math.Matrix4.CreateTranslation(this.Position.$clone()));
            },
            /**
             * Gets the world matrix of this object for 2D rendering. (no rotation on x and y axis) Rounded down to the nearest pixel on the x and y axis. (assuming 1 unit = 1 pixel)
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Transform
             * @memberof JuiceboxEngine.Transform
             * @return  {JuiceboxEngine.Math.Matrix4}        An world matrix for 2D rendering.
             */
            GetWorldMatrix2D: function () {
                return JuiceboxEngine.Math.Matrix4.Multiply(JuiceboxEngine.Math.Matrix4.Multiply(JuiceboxEngine.Math.Matrix4.CreateScale(this.Scale.$clone()), JuiceboxEngine.Math.Matrix4.CreateRotationZ(this.Rotation.Z)), JuiceboxEngine.Math.Matrix4.CreateTranslation(this.Position.$clone()));
            },
            /**
             * Gets the world matrix of this object for 2D rendering. (no rotation on x and y axis)
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Transform
             * @memberof JuiceboxEngine.Transform
             * @return  {JuiceboxEngine.Math.Matrix4}        An world matrix for 2D rendering.
             */
            GetWorldMatrixPixelPerfect2D: function () {
                return JuiceboxEngine.Math.Matrix4.Multiply(JuiceboxEngine.Math.Matrix4.Multiply(JuiceboxEngine.Math.Matrix4.CreateScale(this.Scale.$clone()), JuiceboxEngine.Math.Matrix4.CreateRotationZ(this.Rotation.Z)), JuiceboxEngine.Math.Matrix4.CreateTranslation(new JuiceboxEngine.Math.Vector3.$ctor2(JuiceboxEngine.Math.JMath.Round(this.Position.X), JuiceboxEngine.Math.JMath.Round(this.Position.Y), this.Position.Z)));
            },
            /**
             * If the component is unique, only one can be on a gameobject.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Transform
             * @memberof JuiceboxEngine.Transform
             * @return  {boolean}        A boolean, true if it is unique, false if multiple component may be on a gameobject.
             */
            Unique: function () {
                return true;
            },
            /**
             * Called on component initialisation.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Transform
             * @memberof JuiceboxEngine.Transform
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager
             * @return  {void}
             */
            Initialize: function (resourceManager) {

            },
            /**
             * Called when the component needs to be destroyed.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Transform
             * @memberof JuiceboxEngine.Transform
             * @return  {void}
             */
            Destroy: function () {

            }
        }
    });

    /**
     * Component moving an empty UI element with the object.
     Usefull for allowing clicks or UI elements on objects.
     *
     * @public
     * @class JuiceboxEngine.UIComponent
     * @augments JuiceboxEngine.Component
     */
    H5.define("JuiceboxEngine.UIComponent", {
        inherits: [JuiceboxEngine.Component],
        fields: {
            /**
             * UI element moved by the object.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.UIComponent
             * @function UIElement
             * @type JuiceboxEngine.GUI.UIElement
             */
            UIElement: null,
            _scene: null
        },
        methods: {
            /**
             * Initialize the component.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.UIComponent
             * @memberof JuiceboxEngine.UIComponent
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager    The resource manager.
             * @return  {void}
             */
            Initialize: function (resourceManager) {

                this.UIElement = null;
                this._scene = null;
            },
            /**
             * Setup or update the UI element.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.UIComponent
             * @memberof JuiceboxEngine.UIComponent
             * @param   {JuiceboxEngine.GUI.UIElement}    element    Element to add to the object. The component will take ownership.
             * @param   {JuiceboxEngine.Scene}            scene      The scene the gameobject is in.
             * @return  {void}
             */
            Setup: function (element, scene) {
                if (this.UIElement != null) {
                    this.UIElement.Parent.RemoveChild(this.UIElement);
                }

                this.UIElement = element;
                this._scene = scene;
            },
            /**
             * Update the component.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.UIComponent
             * @memberof JuiceboxEngine.UIComponent
             * @return  {void}
             */
            Update: function () {
                this.UIElement.Anchor = this._scene.DefaultCamera.WorldToScreenPoint(this.Parent.Transform.Position2D.$clone());
            },
            /**
             * UI components are not unique to an object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.UIComponent
             * @memberof JuiceboxEngine.UIComponent
             * @return  {boolean}        False.
             */
            Unique: function () {
                return false;
            },
            /**
             * Destroy the component and UI element.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.UIComponent
             * @memberof JuiceboxEngine.UIComponent
             * @return  {void}
             */
            Destroy: function () {

            }
        }
    });

    /**
     * A texture that can be rendered to.
     *
     * @public
     * @class JuiceboxEngine.Graphics.RenderTarget
     * @augments JuiceboxEngine.Graphics.Texture2D
     */
    H5.define("JuiceboxEngine.Graphics.RenderTarget", {
        inherits: [JuiceboxEngine.Graphics.Texture2D],
        fields: {
            /**
             * The platform specific render target.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Graphics.RenderTarget
             * @function Target
             * @type H5.Core..WebGLFramebuffer
             */
            Target: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Graphics.RenderTarget
             * @memberof JuiceboxEngine.Graphics.RenderTarget
             * @param   {number}    width     Width of the render target.
             * @param   {number}    height    Height of the render target.
             * @return  {void}
             */
            ctor: function (width, height) {
                this.$initialize();
                JuiceboxEngine.Graphics.Texture2D.ctor.call(this);
                this.Width = width;
                this.Height = height;

                this.Texture = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.CreateTexture$1(width, height, null);

                this.Target = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.CreateRenderTarget(width, height, this);
            }
        }
    });

    /**
     * A nine-sliced image.
     *
     * @public
     * @class JuiceboxEngine.GUI.SlicedImage
     * @augments JuiceboxEngine.GUI.Image
     */
    H5.define("JuiceboxEngine.GUI.SlicedImage", {
        inherits: [JuiceboxEngine.GUI.Image],
        fields: {
            _border: 0
        },
        props: {
            /**
             * Border in pixels. This will not stretch when the image is scaled.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.GUI.SlicedImage
             * @function Border
             * @type number
             */
            Border: {
                get: function () {
                    return this._border;
                },
                set: function (value) {
                    this._border = value;
                    this.ForceUpdate();
                }
            }
        },
        ctors: {
            /**
             * Sliced image constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.GUI.SlicedImage
             * @memberof JuiceboxEngine.GUI.SlicedImage
             * @param   {JuiceboxEngine.GUI.UIElement}    parent    The parent UI element.
             * @return  {void}
             */
            ctor: function (parent) {
                this.$initialize();
                JuiceboxEngine.GUI.Image.ctor.call(this, parent);
            }
        },
        methods: {
            /**
             * Draw debugging shape for 9 slice.
             *
             * @instance
             * @protected
             * @override
             * @this JuiceboxEngine.GUI.SlicedImage
             * @memberof JuiceboxEngine.GUI.SlicedImage
             * @param   {boolean}    fill    Should rectangle be filed?
             * @return  {void}
             */
            DrawDebuggingShapes: function (fill) {
                JuiceboxEngine.GUI.Image.prototype.DrawDebuggingShapes.call(this, fill);

                JuiceboxEngine.Debugging.DebugRenderer.InstanceGUI.DrawLine(new JuiceboxEngine.Math.Vector2.$ctor3(this.Bounds.Left + this.Border, this.Bounds.Bottom), new JuiceboxEngine.Math.Vector2.$ctor3(this.Bounds.Left + this.Border, this.Bounds.Top), JuiceboxEngine.Math.Color.Green.$clone(), 1);
                JuiceboxEngine.Debugging.DebugRenderer.InstanceGUI.DrawLine(new JuiceboxEngine.Math.Vector2.$ctor3(this.Bounds.Right - this.Border, this.Bounds.Bottom), new JuiceboxEngine.Math.Vector2.$ctor3(this.Bounds.Right - this.Border, this.Bounds.Top), JuiceboxEngine.Math.Color.Green.$clone(), 1);
                JuiceboxEngine.Debugging.DebugRenderer.InstanceGUI.DrawLine(new JuiceboxEngine.Math.Vector2.$ctor3(this.Bounds.Left, this.Bounds.Bottom + this.Border), new JuiceboxEngine.Math.Vector2.$ctor3(this.Bounds.Right, this.Bounds.Bottom + this.Border), JuiceboxEngine.Math.Color.Green.$clone(), 1);
                JuiceboxEngine.Debugging.DebugRenderer.InstanceGUI.DrawLine(new JuiceboxEngine.Math.Vector2.$ctor3(this.Bounds.Left, this.Bounds.Top - this.Border), new JuiceboxEngine.Math.Vector2.$ctor3(this.Bounds.Right, this.Bounds.Top - this.Border), JuiceboxEngine.Math.Color.Green.$clone(), 1);
            },
            /**
             * Update sliced image.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.GUI.SlicedImage
             * @memberof JuiceboxEngine.GUI.SlicedImage
             * @return  {void}
             */
            UpdateElement: function () {
                var uvBorder = new JuiceboxEngine.Math.Vector2.$ctor3(this.Border / this.DisplayImage.Width, this.Border / this.DisplayImage.Height);

                var positionRects = System.Array.init(9, function (){
                    return new JuiceboxEngine.Math.RectangleF();
                }, JuiceboxEngine.Math.RectangleF);
                positionRects[0] = new JuiceboxEngine.Math.RectangleF.$ctor2(0.0, 0.0, this._border, this._border);
                positionRects[1] = new JuiceboxEngine.Math.RectangleF.$ctor2(0.0, this._border, this._border, this.Dimensions.Y - this._border * 2);
                positionRects[2] = new JuiceboxEngine.Math.RectangleF.$ctor2(0.0, this.Dimensions.Y - this._border, this._border, this._border);
                positionRects[3] = new JuiceboxEngine.Math.RectangleF.$ctor2(this._border, 0.0, this.Dimensions.X - this._border * 2, this._border);
                positionRects[4] = new JuiceboxEngine.Math.RectangleF.$ctor2(this._border, this._border, this.Dimensions.X - this._border * 2, this.Dimensions.Y - this._border * 2);
                positionRects[5] = new JuiceboxEngine.Math.RectangleF.$ctor2(this._border, this.Dimensions.Y - this._border, this.Dimensions.X - this._border * 2, this._border);
                positionRects[6] = new JuiceboxEngine.Math.RectangleF.$ctor2(this.Dimensions.X - this._border, 0.0, this._border, this._border);
                positionRects[7] = new JuiceboxEngine.Math.RectangleF.$ctor2(this.Dimensions.X - this._border, this._border, this._border, this.Dimensions.Y - this._border * 2);
                positionRects[8] = new JuiceboxEngine.Math.RectangleF.$ctor2(this.Dimensions.X - this._border, this.Dimensions.Y - this._border, this._border, this._border);

                var uvRects = System.Array.init(9, function (){
                    return new JuiceboxEngine.Math.RectangleF();
                }, JuiceboxEngine.Math.RectangleF);
                uvRects[0] = new JuiceboxEngine.Math.RectangleF.$ctor2(0.0, 1.0, uvBorder.X, -uvBorder.Y);
                uvRects[1] = new JuiceboxEngine.Math.RectangleF.$ctor2(0.0, 1.0 - uvBorder.Y, uvBorder.X, -1.0 + uvBorder.Y * 2);
                uvRects[2] = new JuiceboxEngine.Math.RectangleF.$ctor2(0.0, uvBorder.Y, uvBorder.X, -uvBorder.Y);
                uvRects[3] = new JuiceboxEngine.Math.RectangleF.$ctor2(uvBorder.X, 1.0, 1.0 - uvBorder.X * 2, -uvBorder.Y);
                uvRects[4] = new JuiceboxEngine.Math.RectangleF.$ctor2(uvBorder.X, 1.0 - uvBorder.Y, 1.0 - uvBorder.X * 2, -1.0 + uvBorder.Y * 2);
                uvRects[5] = new JuiceboxEngine.Math.RectangleF.$ctor2(uvBorder.X, uvBorder.Y, 1.0 - uvBorder.X * 2, -uvBorder.Y);
                uvRects[6] = new JuiceboxEngine.Math.RectangleF.$ctor2(1.0 - uvBorder.X, 1.0, uvBorder.X, -uvBorder.Y);
                uvRects[7] = new JuiceboxEngine.Math.RectangleF.$ctor2(1.0 - uvBorder.X, 1.0 - uvBorder.Y, uvBorder.X, -1.0 + uvBorder.Y * 2);
                uvRects[8] = new JuiceboxEngine.Math.RectangleF.$ctor2(1.0 - uvBorder.X, uvBorder.Y, uvBorder.X, -uvBorder.Y);

                var data = System.Array.init(486, 0, System.Single);

                for (var i = 0; i < 9; i = (i + 1) | 0) {
                    System.Array.copy(this.GetFloats(positionRects[i].$clone(), uvRects[i].$clone()), 0, data, H5.Int.mul(H5.Int.mul(i, 9), 6), 54);
                }

                this._command.SetShaderValue("texture", this.DisplayImage);
                this._command.VertexBuffer.UpdateData(data);
            },
            GetFloats: function (posRect, uvRect) {
                var R = this.Color.R;
                var G = this.Color.G;
                var B = this.Color.B;
                var A = this.Color.A;

                return System.Array.init([posRect.Left, posRect.Bottom, 0.5, uvRect.Left, uvRect.Bottom, R, G, B, A, posRect.Right, posRect.Bottom, 0.5, uvRect.Right, uvRect.Bottom, R, G, B, A, posRect.Right, posRect.Top, 0.5, uvRect.Right, uvRect.Top, R, G, B, A, posRect.Left, posRect.Bottom, 0.5, uvRect.Left, uvRect.Bottom, R, G, B, A, posRect.Left, posRect.Top, 0.5, uvRect.Left, uvRect.Top, R, G, B, A, posRect.Right, posRect.Top, 0.5, uvRect.Right, uvRect.Top, R, G, B, A], System.Single);
            }
        }
    });

    /**
     * Layered sprite draws multiple sprites on top of each other for a 3D effect.
     *
     * @public
     * @class JuiceboxEngine.LayeredSprite
     * @augments JuiceboxEngine.GraphicsComponent
     */
    H5.define("JuiceboxEngine.LayeredSprite", {
        inherits: [JuiceboxEngine.GraphicsComponent],
        fields: {
            /**
             * Pixel perfect sprites round their position to the nearest integer.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function PixelPerfect
             * @type boolean
             */
            PixelPerfect: false,
            /**
             * Color of the sprite. Default is white.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Color
             * @type JuiceboxEngine.Math.Color
             */
            Color: null,
            /**
             * Addative color for the sprite.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function AddativeColor
             * @type JuiceboxEngine.Math.Color
             */
            AddativeColor: null,
            /**
             * Scale the sprite with a given size.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Size
             * @type JuiceboxEngine.Math.Vector2
             */
            Size: null,
            /**
             * The offset of the sprite relative to the game object center.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Offset
             * @type JuiceboxEngine.Math.Vector2
             */
            Offset: null,
            /**
             * Sliced sprite rotation.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Rotation
             * @type number
             */
            Rotation: 0,
            /**
             * The sprite texture.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Texture
             * @type JuiceboxEngine.Graphics.Texture2D
             */
            Texture: null,
            /**
             * Priority of the sprite, higher values means it will be drawn first.
             If priority is 0, the Y value of the gameobject will be used to determine what sprite gets drawn first.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Priority
             * @type number
             */
            Priority: 0,
            /**
             * Dimensions of one slice.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Dimensions
             * @type JuiceboxEngine.Math.Point
             */
            Dimensions: null,
            /**
             * Amount of layers for the current sprite.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Layers
             * @type number
             */
            Layers: 0,
            /**
             * Row from the texture to use. (Default is 0).
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Row
             * @type number
             */
            Row: 0,
            /**
             * The distance between layers.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function LayerHeight
             * @type number
             */
            LayerHeight: 0,
            /**
             * The layer index to start from.
             Note: this also affects height.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function StartLayer
             * @type number
             */
            StartLayer: 0,
            /**
             * Layers to skip up or down.
             Default is 0.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @type number
             */
            LayerOffset: 0,
            /**
             * Substract this value from the color from each layer starting at the top.
             Helps to make shapes more readable.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function ColorStep
             * @type number
             */
            ColorStep: 0,
            /**
             * Snap rotation of the layered sprite to give it a more 'pre-rendered' look.
             If it's 0.0f or lower, no snapping will be applied.
             This value represents the amount of snap positions. (4 will result in rotation steps of 0.5 PI)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function SnapRotation
             * @type number
             */
            SnapRotation: 0,
            /**
             * Amount of outline for this object in pixels.
             If 0 or lower, no outline will be rendered.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Outline
             * @type number
             */
            Outline: 0,
            /**
             * Shadow direction.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function ShadowDirection
             * @type JuiceboxEngine.Math.Vector2
             */
            ShadowDirection: null,
            /**
             * Depth offset added to the depth value.
             Usefull for objects 'higher' or 'lower'.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function DepthOffset
             * @type number
             */
            DepthOffset: 0,
            /**
             * Layer resolution determines how many layers are for each 'slice'.
             Scaled objects might need a higher resolution to hide the different layers.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function LayerResolution
             * @type number
             */
            LayerResolution: 0,
            /**
             * Sprite effect used for flipping.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.LayeredSprite
             * @function Flip
             * @type number
             */
            Flip: 0,
            _initialized: false
        },
        ctors: {
            init: function () {
                this.Color = new JuiceboxEngine.Math.Color();
                this.AddativeColor = new JuiceboxEngine.Math.Color();
                this.Size = new JuiceboxEngine.Math.Vector2();
                this.Offset = new JuiceboxEngine.Math.Vector2();
                this.Dimensions = new JuiceboxEngine.Math.Point();
                this.ShadowDirection = new JuiceboxEngine.Math.Vector2();
            },
            /**
             * Default constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.LayeredSprite
             * @memberof JuiceboxEngine.LayeredSprite
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                JuiceboxEngine.GraphicsComponent.ctor.call(this);
                this.PixelPerfect = JuiceboxEngine.Util.Config.ConfigValues.PixelPerfect;
                this.Size = new JuiceboxEngine.Math.Vector2.$ctor3(1, 1);
                this.Color = JuiceboxEngine.Math.Color.White.$clone();
                this.LayerResolution = 1;

                this._initialized = false;
            }
        },
        methods: {
            /**
             * Initialize the layered sprite.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.LayeredSprite
             * @memberof JuiceboxEngine.LayeredSprite
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager
             * @return  {void}
             */
            Initialize: function (resourceManager) {

            },
            /**
             * Setup a layered sprite.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.LayeredSprite
             * @memberof JuiceboxEngine.LayeredSprite
             * @param   {JuiceboxEngine.Graphics.Texture2D}    texture        The texture to use.
             * @param   {number}                               width          Width of one layer.
             * @param   {number}                               height         Height of one layer.
             * @param   {number}                               layers         The amount of layers to draw.
             * @param   {number}                               layerHeight    Amount of space between layers.
             * @param   {number}                               row            The row to use. (Default is 0)
             * @return  {void}
             */
            SetSlicedSprite: function (texture, width, height, layers, layerHeight, row) {
                if (row === void 0) { row = 0; }
                this.Texture = texture;
                this.Dimensions = new JuiceboxEngine.Math.Point.$ctor1(width, height);
                this.LayerHeight = layerHeight;
                this.Layers = layers;
                this.Row = row;

                this._initialized = true;
            },
            /**
             * Called every frame.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.LayeredSprite
             * @memberof JuiceboxEngine.LayeredSprite
             * @return  {void}
             */
            Update: function () {

            },
            /**
             * Render the layered sprite.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.LayeredSprite
             * @memberof JuiceboxEngine.LayeredSprite
             * @param   {JuiceboxEngine.Graphics.Spritebatch}    spritebatch
             * @return  {void}
             */
            Render: function (spritebatch) {
                if (!this._initialized || this.Texture == null || !this.Texture.Loaded) {
                    return;
                }

                var xPos;
                var yPos;

                var pos = this.Parent.Transform.Position.$clone();

                if (this.PixelPerfect) {
                    xPos = H5.Int.clip32(JuiceboxEngine.Math.JMath.Round(pos.X));
                    yPos = H5.Int.clip32(JuiceboxEngine.Math.JMath.Round(pos.Y));
                } else {
                    xPos = pos.X;
                    yPos = pos.Y;
                }

                var outline = false;
                var outlineDimensions = JuiceboxEngine.Math.Vector2.Zero.$clone();
                var outlineOffset = JuiceboxEngine.Math.Vector2.Zero.$clone();

                if (this.Outline > 0.0) {
                    outline = true;
                    outlineDimensions = JuiceboxEngine.Math.Vector2.op_Division((JuiceboxEngine.Math.Vector2.op_Addition((JuiceboxEngine.Math.Vector2.op_Multiply(this.Dimensions.ToVector2(), this.Size.$clone())), JuiceboxEngine.Math.Vector2.op_Multiply$1(new JuiceboxEngine.Math.Vector2.$ctor3(2, 2), this.Outline))), this.Dimensions.ToVector2());
                    outlineOffset = JuiceboxEngine.Math.Vector2.op_Multiply(this.Offset.$clone(), outlineDimensions.$clone());
                    outlineDimensions = JuiceboxEngine.Math.Vector2.op_Multiply(outlineDimensions.$clone(), this.Dimensions.ToVector2());
                }

                var source = new JuiceboxEngine.Math.Rectangle.$ctor2(0, H5.Int.mul(this.Row, this.Dimensions.Y), this.Dimensions.X, this.Dimensions.Y);

                var destination = new JuiceboxEngine.Math.RectangleF.$ctor2(xPos, 0, (this.Dimensions.X * this.Size.X), (this.Dimensions.Y * this.Size.Y));

                for (var layerIndex = this.StartLayer; layerIndex < this.Layers; layerIndex = (layerIndex + 1) | 0) {
                    source.X = H5.Int.mul(this.Dimensions.X, layerIndex);

                    for (var extraLayers = 0; extraLayers < this.LayerResolution; extraLayers = (extraLayers + 1) | 0) {
                        destination.Y = yPos + (this.Size.Y * this.LayerHeight * (layerIndex + this.LayerOffset));

                        destination.Y -= extraLayers / (this.LayerResolution) * this.Size.Y * this.LayerHeight;

                        var colorStep = ((((this.Layers - layerIndex) | 0)) * this.ColorStep);
                        var finalColor = new JuiceboxEngine.Math.Color.$ctor3(this.Color.R - colorStep, this.Color.G - colorStep, this.Color.B - colorStep, 255);

                        var rotation = this.Rotation;

                        if (this.SnapRotation > 0.0) {
                            var stepSize = JuiceboxEngine.Math.JMath.TWO_PI / this.SnapRotation;
                            var steps = JuiceboxEngine.Math.JMath.Round(rotation / stepSize);
                            rotation = steps * stepSize;
                        }

                        spritebatch.Draw$1(this.Texture, destination.$clone(), source.$clone(), finalColor.$clone(), rotation, JuiceboxEngine.Math.Vector2.op_Multiply(this.Offset.$clone(), this.Size.$clone()), this.Priority === 0 ? (layerIndex + this.LayerOffset) * -0.1 - this.DepthOffset : this.Priority, this.Flip);

                        if (outline) {
                            var outlineDest = new JuiceboxEngine.Math.RectangleF.$ctor2(xPos, yPos + (this.Size.Y * this.LayerHeight * (layerIndex + this.LayerOffset)), outlineDimensions.X, outlineDimensions.Y);

                            spritebatch.Draw$1(this.Texture, outlineDest.$clone(), source.$clone(), JuiceboxEngine.Math.Color.Black.$clone(), rotation, outlineOffset.$clone(), 0.01, this.Flip);
                        }
                    }


                }
            },
            /**
             * Multiple layered sprites may be on one object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.LayeredSprite
             * @memberof JuiceboxEngine.LayeredSprite
             * @return  {boolean}        False.
             */
            Unique: function () {
                return false;
            },
            /**
             * Destroy the layered sprite.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.LayeredSprite
             * @memberof JuiceboxEngine.LayeredSprite
             * @return  {void}
             */
            Destroy: function () {

            }
        }
    });

    H5.define("JuiceboxEngine.Particles.ParticleComponent", {
        inherits: [JuiceboxEngine.GraphicsComponent],
        fields: {
            /**
             * Particle spawn color.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Particles.ParticleComponent
             * @function Color
             * @type JuiceboxEngine.Math.Color
             */
            Color: null,
            /**
             * Texture used for the particles.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Particles.ParticleComponent
             * @function Texture
             * @type JuiceboxEngine.Graphics.Texture2D
             */
            Texture: null,
            Gravity: null,
            /**
             * List of all the current particles.
             *
             * @instance
             * @protected
             * @memberof JuiceboxEngine.Particles.ParticleComponent
             * @type System.Collections.Generic.List$1
             */
            _particles: null
        },
        events: {
            OnRequestParticle: null,
            OnParticleUpdate: null
        },
        ctors: {
            init: function () {
                this.Color = new JuiceboxEngine.Math.Color();
                this.Gravity = new JuiceboxEngine.Math.Vector2();
            }
        },
        methods: {
            /**
             * Initialize particle system.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Particles.ParticleComponent
             * @memberof JuiceboxEngine.Particles.ParticleComponent
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager    The resource manager.
             * @return  {void}
             */
            Initialize: function (resourceManager) {
                this._particles = new (System.Collections.Generic.List$1(JuiceboxEngine.Particles.Particle)).ctor();

                this.Texture = resourceManager.Load(JuiceboxEngine.Graphics.Texture2D, "Textures/ParticleDefault.png");
                this.Color = JuiceboxEngine.Math.Color.White.$clone();
            },
            /**
             * Update the particle system.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Particles.ParticleComponent
             * @memberof JuiceboxEngine.Particles.ParticleComponent
             * @return  {void}
             */
            Update: function () {
                for (var i = 0; i < this._particles.Count; i = (i + 1) | 0) {
                    var particle = { v : this._particles.getItem(i) };
                    particle.v.position = JuiceboxEngine.Math.Vector2.op_Addition(particle.v.position.$clone(), particle.v.velocity.$clone());

                    particle.v.velocity = JuiceboxEngine.Math.Vector2.op_Addition(particle.v.velocity.$clone(), JuiceboxEngine.Math.Vector2.op_Multiply$1(this.Gravity.$clone(), JuiceboxEngine.Util.Time.DeltaTime));

                    particle.v.lifeTime -= JuiceboxEngine.Util.Time.DeltaTime;

                    if (particle.v.lifeTime <= 0.0) {
                        i = (i - 1) | 0;
                        this._particles.remove(particle.v);
                    } else {
                        !H5.staticEquals(this.OnParticleUpdate, null) ? this.OnParticleUpdate(particle.v) : null;
                    }
                }
            },
            /**
             * Render the particle system.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Particles.ParticleComponent
             * @memberof JuiceboxEngine.Particles.ParticleComponent
             * @param   {JuiceboxEngine.Graphics.Spritebatch}    batch    The sprite batch to draw to.
             * @return  {void}
             */
            Render: function (batch) {

                for (var i = 0; i < this._particles.Count; i = (i + 1) | 0) {
                    var particle = this._particles.getItem(i);

                    var source = particle.sourceRectangles[H5.Int.clip32((particle.lifeTime * 10) % particle.particleFrames)].$clone();
                    var destination = new JuiceboxEngine.Math.RectangleF.$ctor2(particle.position.X, particle.position.Y, source.Width * particle.size.X, source.Height * particle.size.Y);

                    batch.Draw$1(this.Texture, destination.$clone(), source.$clone(), particle.color.$clone(), particle.rotation, new JuiceboxEngine.Math.Vector2.$ctor3(0, 0), 0.0, JuiceboxEngine.Sprite.SpriteFlip.None);
                }
            },
            /**
             * Create a particle.
             *
             * @instance
             * @protected
             * @this JuiceboxEngine.Particles.ParticleComponent
             * @memberof JuiceboxEngine.Particles.ParticleComponent
             * @return  {void}
             */
            CreateParticle: function () {




                var particle = !H5.staticEquals(this.OnRequestParticle, null) ? this.OnRequestParticle() : null;

                particle.position = JuiceboxEngine.Math.Vector2.op_Addition(particle.position.$clone(), this.Parent.Transform.Position2D.$clone());

                this._particles.add(particle);
            },
            /**
             * Particle systems are not unique to an object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Particles.ParticleComponent
             * @memberof JuiceboxEngine.Particles.ParticleComponent
             * @return  {boolean}        False.
             */
            Unique: function () {
                return false;
            },
            /**
             * Destroy particle system.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Particles.ParticleComponent
             * @memberof JuiceboxEngine.Particles.ParticleComponent
             * @return  {void}
             */
            Destroy: function () {

            }
        }
    });

    /**
     * Sprite component, used for 2D rendering in the scene.
     *
     * @public
     * @class JuiceboxEngine.Sprite
     * @augments JuiceboxEngine.GraphicsComponent
     */
    H5.define("JuiceboxEngine.Sprite", {
        inherits: [JuiceboxEngine.GraphicsComponent],
        fields: {
            _texture: null,
            /**
             * Pixel perfect sprites round their position to the nearest integer.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function PixelPerfect
             * @type boolean
             */
            PixelPerfect: false,
            /**
             * The rectangle in the texture of the sprite to render. (in pixels).
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function SourceRectangle
             * @type JuiceboxEngine.Math.Rectangle
             */
            SourceRectangle: null,
            /**
             * The offset of the sprite relative to the game object center.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function Offset
             * @type JuiceboxEngine.Math.Vector2
             */
            Offset: null,
            /**
             * Scale the sprite with a given size.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function Size
             * @type JuiceboxEngine.Math.Vector2
             */
            Size: null,
            /**
             * Color of the sprite. Default is white.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function Color
             * @type JuiceboxEngine.Math.Color
             */
            Color: null,
            /**
             * Addative color for the sprite.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function AddativeColor
             * @type JuiceboxEngine.Math.Color
             */
            AddativeColor: null,
            /**
             * Rotation of the sprite. (in radians)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function Rotation
             * @type number
             */
            Rotation: 0,
            /**
             * Animator for this sprite.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function Animator
             * @type JuiceboxEngine.Animations.Animator
             */
            Animator: null,
            /**
             * Priority of the sprite, higher values means it will be drawn first.
             If priority is 0, the Y value of the gameobject will be used to determine what sprite gets drawn first.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function Priority
             * @type number
             */
            Priority: 0,
            /**
             * Sprite effect used for flipping.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function Flip
             * @type number
             */
            Flip: 0
        },
        props: {
            /**
             * The texture to use.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Sprite
             * @function Texture
             * @type JuiceboxEngine.Graphics.Texture2D
             */
            Texture: {
                get: function () {
                    return this._texture;
                },
                set: function (value) {
                    this._texture = value;
                    this._texture.addonLoad(H5.fn.bind(this, function (x, y) {
                        this.OnTextureLoad();
                    }));

                    this.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, this._texture.Width, this._texture.Height);
                }
            }
        },
        ctors: {
            init: function () {
                this.SourceRectangle = new JuiceboxEngine.Math.Rectangle();
                this.Offset = new JuiceboxEngine.Math.Vector2();
                this.Size = new JuiceboxEngine.Math.Vector2();
                this.Color = new JuiceboxEngine.Math.Color();
                this.AddativeColor = new JuiceboxEngine.Math.Color();
            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceboxEngine.Sprite
             * @memberof JuiceboxEngine.Sprite
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                JuiceboxEngine.GraphicsComponent.ctor.call(this);
                this.PixelPerfect = JuiceboxEngine.Util.Config.ConfigValues.PixelPerfect;
                this.Color = JuiceboxEngine.Math.Color.White.$clone();
                this.Size = new JuiceboxEngine.Math.Vector2.$ctor3(1.0, 1.0);
                this.Rotation = 0.0;
            }
        },
        methods: {
            /**
             * Called on component initialisation.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Sprite
             * @memberof JuiceboxEngine.Sprite
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager    The resource manager.
             * @return  {void}
             */
            Initialize: function (resourceManager) {
                this._texture = new JuiceboxEngine.Graphics.Texture2D.ctor();
                this.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, 1, 1);
            },
            /**
             * Render the sprite.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Sprite
             * @memberof JuiceboxEngine.Sprite
             * @param   {JuiceboxEngine.Graphics.Spritebatch}    spriteBatch
             * @return  {void}
             */
            Render: function (spriteBatch) {
                if (this._texture == null || !this._texture.Loaded) {
                    return;
                }

                var x;
                var y;

                var pos = this.Parent.Transform.Position.$clone();

                if (this.PixelPerfect) {
                    x = H5.Int.clip32(JuiceboxEngine.Math.JMath.Round(pos.X));
                    y = H5.Int.clip32(JuiceboxEngine.Math.JMath.Round(pos.Y));
                } else {
                    x = pos.X;
                    y = pos.Y;
                }

                var source = this.Animator != null ? this.Animator.SourceRectangle : this.SourceRectangle;
                var dest = new JuiceboxEngine.Math.RectangleF.$ctor2(x, y, H5.Int.clip32(source.Width * this.Size.X), H5.Int.clip32(source.Height * this.Size.Y));

                var rotation = this.Rotation + this.Parent.Transform.Rotation.Z;

                spriteBatch.Draw$1(this.Texture, dest.$clone(), source.$clone(), this.Color.$clone(), rotation, JuiceboxEngine.Math.Vector2.op_Multiply(this.Offset.$clone(), this.Size.$clone()), this.Priority === 0 ? pos.Y * 0.01 : this.Priority, this.Flip);
            },
            /**
             * Multiple sprites may be on one object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Sprite
             * @memberof JuiceboxEngine.Sprite
             * @return  {boolean}        False.
             */
            Unique: function () {
                return false;
            },
            /**
             * Called every frame.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Sprite
             * @memberof JuiceboxEngine.Sprite
             * @return  {void}
             */
            Update: function () {
                if (this.Animator != null) {
                    this.Animator.Update();
                }
            },
            /**
             * Called on texture load.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.Sprite
             * @memberof JuiceboxEngine.Sprite
             * @return  {void}
             */
            OnTextureLoad: function () {
                if (JuiceboxEngine.Math.Rectangle.op_Equality(this.SourceRectangle.$clone(), new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, 1, 1))) {
                    this.SourceRectangle = new JuiceboxEngine.Math.Rectangle.$ctor2(0, 0, this.Texture.Width, this.Texture.Height);
                }
            },
            /**
             * Destroy the sprite.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.Sprite
             * @memberof JuiceboxEngine.Sprite
             * @return  {void}
             */
            Destroy: function () { }
        }
    });

    /**
     * Component used for rendering text in the scene, on an object.
     *
     * @public
     * @class JuiceboxEngine.TextComponent
     * @augments JuiceboxEngine.GraphicsComponent
     */
    H5.define("JuiceboxEngine.TextComponent", {
        inherits: [JuiceboxEngine.GraphicsComponent],
        fields: {
            _text: null,
            _alignment: 0,
            _color: null,
            _font: null,
            Offset: null,
            _command: null
        },
        props: {
            /**
             * The text this component should display.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.TextComponent
             * @function DisplayText
             * @type string
             */
            DisplayText: {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    if (!System.String.equals(this._text, value)) {
                        this._text = value;
                        this.UpdateText();
                    }
                }
            },
            /**
             * Alignment of the text.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.TextComponent
             * @function Alignment
             * @type JuiceboxEngine.GUI.TextAlignment
             */
            Alignment: {
                get: function () {
                    return this._alignment;
                },
                set: function (value) {
                    if (this._alignment !== value) {
                        this._alignment = value;
                        this.UpdateText();
                    }
                }
            },
            /**
             * Color of the text.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.TextComponent
             * @function Color
             * @type JuiceboxEngine.Math.Color
             */
            Color: {
                get: function () {
                    return this._color.$clone();
                },
                set: function (value) {
                    if (!this._color.equalsT(value.$clone())) {
                        this._color = value.$clone();
                        this.UpdateText();
                    }
                }
            },
            /**
             * The font to use.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.TextComponent
             * @function Font
             * @type JuiceboxEngine.Graphics.Font
             */
            Font: {
                get: function () {
                    return this._font;
                },
                set: function (value) {
                    this._font = value;
                    this.UpdateText();
                }
            }
        },
        ctors: {
            init: function () {
                this._color = new JuiceboxEngine.Math.Color();
                this.Offset = new JuiceboxEngine.Math.Vector2();
            }
        },
        methods: {
            /**
             * Initialize the Text component.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.TextComponent
             * @memberof JuiceboxEngine.TextComponent
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager    The resource manager.
             * @return  {void}
             */
            Initialize: function (resourceManager) {
                this._alignment = JuiceboxEngine.GUI.TextAlignment.Left;
                this._color = JuiceboxEngine.Math.Color.White.$clone();

                this.Font = resourceManager.Load(JuiceboxEngine.Graphics.Font, "Fonts/Arial.bff");

                this._command = new JuiceboxEngine.Graphics.GraphicsCommand();
                this._command.Program = H5.as(resourceManager.Load$1("Shaders/Sprite.vert"), JuiceboxEngine.Graphics.ShaderProgram);

                this._command.VertexBuffer = new JuiceboxEngine.Graphics.VertexBuffer.ctor();
                this._command.VertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 36, 0));
                this._command.VertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 36, 12));
                this._command.VertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_col", 4, false, 36, 20));

                this._command.SetShaderValue("texture", this.Font.Texture);
            },
            /**
             * Generate new text vertex buffers.
             *
             * @instance
             * @private
             * @this JuiceboxEngine.TextComponent
             * @memberof JuiceboxEngine.TextComponent
             * @return  {void}
             */
            UpdateText: function () {
                if (System.String.isNullOrEmpty(this._text)) {
                    return;
                }

                var offset = this.Font.GetWidth(this._text);
                switch (this._alignment) {
                    case JuiceboxEngine.GUI.TextAlignment.Left: 
                        offset = 0;
                        break;
                    case JuiceboxEngine.GUI.TextAlignment.Right: 
                        offset = -offset;
                        break;
                    case JuiceboxEngine.GUI.TextAlignment.Center: 
                        offset /= -2.0;
                        break;
                }

                var offsetVec = JuiceboxEngine.Math.Vector3.op_Addition(new JuiceboxEngine.Math.Vector3.$ctor2(offset, 0.0, 0.0), new JuiceboxEngine.Math.Vector3.$ctor2(this.Offset.X, this.Offset.Y, 0.0));

                this._command.SetShaderValue("texture", this.Font.Texture);
                this._command.VertexBuffer.UpdateData(this.Font.GenerateBuffer(this._text, this._color.$clone(), offsetVec.$clone()));
            },
            /**
             * Render the text component.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.TextComponent
             * @memberof JuiceboxEngine.TextComponent
             * @param   {JuiceboxEngine.Graphics.Spritebatch}    spritebatch
             * @return  {void}
             */
            Render: function (spritebatch) {
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.SetGlobalShaderValue(JuiceboxEngine.Graphics.DefaultShaderValues.WORLD, this.Parent.Transform.GetWorldMatrixPixelPerfect2D());
                JuiceboxEngine.Graphics.GraphicsManager.Instance.Context.Command(this._command);
            },
            /**
             * The text component is not unique to a gameobject.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.TextComponent
             * @memberof JuiceboxEngine.TextComponent
             * @return  {boolean}        False
             */
            Unique: function () {
                return false;
            },
            /**
             * Called every frame.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.TextComponent
             * @memberof JuiceboxEngine.TextComponent
             * @return  {void}
             */
            Update: function () {

            },
            /**
             * Destroy the Text Component.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.TextComponent
             * @memberof JuiceboxEngine.TextComponent
             * @return  {void}
             */
            Destroy: function () {
                this._command.VertexBuffer.Destroy();
            }
        }
    });

    /**
     * A component creating a tile map. Great for rendering terrains in 2D very fast.
     *
     * @public
     * @class JuiceboxEngine.TileMap
     * @augments JuiceboxEngine.GraphicsComponent
     */
    H5.define("JuiceboxEngine.TileMap", {
        inherits: [JuiceboxEngine.GraphicsComponent],
        fields: {
            /**
             * Tilemap sprites.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.TileMap
             * @function Sprites
             * @type JuiceboxEngine.Graphics.Texture2D
             */
            Sprites: null,
            /**
             * Tilemap map data. 
             R channel is the x-position of the tile in the spritemap.
             G channel is the y-position of the tile in the spritemap.
             B channel is the amount of animation frames to the right of the original position (R and G).
             A channel is the speed of the animation.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.TileMap
             * @function MapData
             * @type JuiceboxEngine.Graphics.Texture2D
             */
            MapData: null,
            /**
             * Paralax effect. 1 will yield no paralax, 2 will 'slow' the movement down relative to the camera.
             Default is 1.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.TileMap
             * @function Parallax
             * @type number
             */
            Parallax: 0,
            /**
             * The size of one tile in the sheet. (All tiles MUST be of same size)
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.TileMap
             * @function TileSize
             * @type number
             */
            TileSize: 0,
            _context: null,
            _vertexBuffer: null,
            _program: null,
            _command: null
        },
        methods: {
            /**
             * Intializes the Tilemap.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.TileMap
             * @memberof JuiceboxEngine.TileMap
             * @param   {JuiceboxEngine.Resources.ResourceManager}    resourceManager
             * @return  {void}
             */
            Initialize: function (resourceManager) {
                var data = System.Array.init([-1.0, -1.0, this.Parent.Transform.Position.Z, 0.0, 0.0, 1.0, -1.0, this.Parent.Transform.Position.Z, 1.0, 0.0, 1.0, 1.0, this.Parent.Transform.Position.Z, 1.0, 1.0, -1.0, -1.0, this.Parent.Transform.Position.Z, 0.0, 0.0, -1.0, 1.0, this.Parent.Transform.Position.Z, 0.0, 1.0, 1.0, 1.0, this.Parent.Transform.Position.Z, 1.0, 1.0], System.Single);


                this._context = JuiceboxEngine.Graphics.GraphicsManager.Instance.Context;
                this._vertexBuffer = new JuiceboxEngine.Graphics.VertexBuffer.$ctor1(data);

                this._vertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 20, 0));
                this._vertexBuffer.SetAttribute(new JuiceboxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 20, 12));

                this._program = H5.cast(resourceManager.Load$1("Shaders/TileMap.vert"), JuiceboxEngine.Graphics.ShaderProgram);

                this._command = new JuiceboxEngine.Graphics.GraphicsCommand();
                this._command.SetShaderValue("sprites", null, JuiceboxEngine.Graphics.Uniform.UniformType.TEXTURE2D);
                this._command.SetShaderValue("map", null, JuiceboxEngine.Graphics.Uniform.UniformType.TEXTURE2D);

                this._command.VertexBuffer = this._vertexBuffer;
                this._command.Program = this._program;

                this.TileSize = 16;
                this.Parallax = 1;
            },
            /**
             * Render the tilemap.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.TileMap
             * @memberof JuiceboxEngine.TileMap
             * @param   {JuiceboxEngine.Graphics.Spritebatch}    batch
             * @return  {void}
             */
            Render: function (batch) {
                if (this.Sprites != null && this.MapData != null) {
                    this._command.SetShaderValue("sprites", this.Sprites);
                    this._command.SetShaderValue("spritesSize", new JuiceboxEngine.Math.Vector2.$ctor3(this.Sprites.Width, this.Sprites.Height));
                    this._command.SetShaderValue("mapSize", new JuiceboxEngine.Math.Vector2.$ctor3(this.MapData.Width, this.MapData.Height));
                    this._command.SetShaderValue("tileSize", this.TileSize);
                    this._command.SetShaderValue("parallax", this.Parallax);
                    this._command.SetShaderValue("offset", this.Parent.Transform.Position2D.$clone());
                    this._command.SetShaderValue("map", this.MapData);

                    this._context.UseDepth(false);
                    this._context.Command(this._command);
                    this._context.UseDepth(true);
                }
            },
            /**
             * Object can have multiple tilemap components.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.TileMap
             * @memberof JuiceboxEngine.TileMap
             * @return  {boolean}        False
             */
            Unique: function () {
                return false;
            },
            /**
             * Called every frame.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.TileMap
             * @memberof JuiceboxEngine.TileMap
             * @return  {void}
             */
            Update: function () {

            },
            /**
             * Destroy the vertexbuffer.
             *
             * @instance
             * @public
             * @override
             * @this JuiceboxEngine.TileMap
             * @memberof JuiceboxEngine.TileMap
             * @return  {void}
             */
            Destroy: function () {
                this._vertexBuffer.Destroy();
            }
        }
    });

    H5.define("JuiceboxEngine.Particles.BurstParticleComponent", {
        inherits: [JuiceboxEngine.Particles.ParticleComponent],
        fields: {
            /**
             * Amount of particles per burst.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Particles.BurstParticleComponent
             * @function BurstAmount
             * @type number
             */
            BurstAmount: 0
        },
        methods: {
            Initialize: function (resourceManager) {
                JuiceboxEngine.Particles.ParticleComponent.prototype.Initialize.call(this, resourceManager);
            },
            Burst: function () {
                for (var i = 0; i < this.BurstAmount; i = (i + 1) | 0) {
                    this.CreateParticle();
                }
            }
        }
    });

    H5.define("JuiceboxEngine.Particles.ContinuousParticleComponent", {
        inherits: [JuiceboxEngine.Particles.ParticleComponent],
        fields: {
            /**
             * The rate at which particles spawn.
             *
             * @instance
             * @public
             * @memberof JuiceboxEngine.Particles.ContinuousParticleComponent
             * @function EmmisionRate
             * @type number
             */
            EmmisionRate: 0,
            _timer: 0
        },
        methods: {
            Initialize: function (resourceManager) {
                JuiceboxEngine.Particles.ParticleComponent.prototype.Initialize.call(this, resourceManager);

                this._timer = this.EmmisionRate;

                this.EmmisionRate = 0.0025;
            },
            Update: function () {
                if (this._timer > this.EmmisionRate) {
                    this._timer = this.EmmisionRate;
                }

                this._timer -= JuiceboxEngine.Util.Time.DeltaTime;

                while (this._timer <= 0.0) {
                    this.CreateParticle();
                    this._timer += this.EmmisionRate;
                }

                JuiceboxEngine.Particles.ParticleComponent.prototype.Update.call(this);
            }
        }
    });
});
