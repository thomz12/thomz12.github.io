/**
 * @compiler H5 0.0.25007
 */
H5.assemblyVersion("LD50","1.0.0.0");
H5.assembly("LD50", function ($asm, globals) {
    "use strict";

    /** @namespace LD50 */

    /**
     * Example of a scene.
     *
     * @class LD50.MainScene
     * @augments JuiceboxEngine.Scene
     */
    H5.define("LD50.MainScene", {
        inherits: [JuiceboxEngine.Scene],
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
                var signin = new LD50.PlayfabSignin();
                signin.AutoLogin();
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
