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
