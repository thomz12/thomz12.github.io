/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.8.2
 */
Bridge.assembly("Straw", function ($asm, globals) {
    "use strict";

    /** @namespace Straw */

    /**
     * This is at the start of every frame.
     *
     * @public
     * @class Straw.App
     */
    Bridge.define("Straw.App", {
        main: function Main () {
            var game = new Straw.Game();
            game.Run();

            //System.Console.WriteLine("Initializing Juicebox Engine...");

            //HTMLCanvasElement canvas = new HTMLCanvasElement()
            //{
            //    InnerHTML = "Your browser does not support WebGL! :(",
            //    Width = 640,
            //    Height = 480,
            //    Id = "Juicebox",
            //    Hidden = false
            //};

            //Document.Body.AppendChild(canvas);

            //_engine = new JuiceboxEngine(canvas);
            //ResourceManager manager = new ResourceManager();
            //_engine.RegisterLoaders(manager);

            //_engine.CurrentScene = new Scene(manager);
            //GameObject map = _engine.CurrentScene.AddGameObject("Map");
            //TileMap tMap = map.AddComponent<TileMap>();
            //tMap.Sprites = manager.Load("Textures/RPGTilemapSprites.png") as Texture2D;
            //tMap.Map = manager.Load("Textures/RPGTilemapData.png") as Texture2D;
            //tMap.TileSize = 16.0f;

            //int pixelSize = 4;

            //GameObject cam = _engine.CurrentScene.AddGameObject("Camera");
            //Camera camera = cam.AddComponent<Camera>();
            //cameraComp = camera;
            //camera.Target = new RenderTarget(canvas.Width / pixelSize, canvas.Height / pixelSize);
            //camera.PixelSize = pixelSize;
            //camera.ClearColor = new Color32(14.0f / 255.0f, 94.0f / 255.0f, 241.0f / 255.0f, 1.0f);
            //camera.AddEffect(new GrayScale(manager));

            //objects = new List<GameObject>();

            //GameObject obj = _engine.CurrentScene.AddGameObject("Sprite player");
            //obj.GetComponent<Transform>().Position = new Vector3(32, 32, 1.0f);
            //obj.GetComponent<Transform>().Scale = new Vector3(1, 1, 1);
            //Sprite sprite = obj.AddComponent<Sprite>();
            //sprite.Texture = manager.Load("Textures/HunterRunRight.png") as Texture2D;
            //sprite.Offset = new Vector2(0, 8);
            //Collider c = obj.AddComponent<Collider>();
            //c.AABB = new Rectangle(4, 0, 8, 8);

            //objects.Add(obj);

            //manager.Load<Texture2D>("Textures/HunterRunRight.png");
            //manager.Load<Texture2D>("Textures/HunterRunLeft.png");
            //manager.Load<Texture2D>("Textures/hunterIdle.png");

            //obj = _engine.CurrentScene.AddGameObject("Sprite player");
            //obj.GetComponent<Transform>().Position = new Vector3(0, 0, 1.0f);
            //obj.GetComponent<Transform>().Scale = new Vector3(1, 1, 1);
            //obj.AddComponent<JuiceBoxEngine.Graphics.Text>().DisplayText = "woosh";
            //sprite = obj.AddComponent<Sprite>();
            //sprite.Texture = manager.Load("Textures/Sword.png") as Texture2D;

            //objects.Add(obj);

            //obj = _engine.CurrentScene.AddGameObject("Building 1");
            //building = obj;
            //obj.GetComponent<Transform>().Position = new Vector3(120.0f, 128.0f, 2.0f);
            //obj.GetComponent<Transform>().Scale = new Vector3(1, 1, 1);
            //c = obj.AddComponent<Collider>();
            //c.AABB = new Rectangle(-22, 0, 44, 28);
            //sprite = obj.AddComponent<Sprite>();
            //sprite.Texture = manager.Load("Textures/LootBuilding.png") as Texture2D;
            //sprite.Offset = new Vector2(0, 16);

            //obj = _engine.CurrentScene.AddGameObject("Building 2");
            //obj.GetComponent<Transform>().Position = new Vector3(42.0f, 32.0f, 2.0f);
            //obj.GetComponent<Transform>().Scale = new Vector3(1, 1, 1);
            //c = obj.AddComponent<Collider>();
            //c.AABB = new Rectangle(-22, 0, 44, 28);
            //sprite = obj.AddComponent<Sprite>();
            //sprite.Texture = manager.Load("Textures/LootBuilding.png") as Texture2D;
            //sprite.Offset = new Vector2(0, 16);

            //Font font = manager.Load("Arial.bff") as Font;
            //_manager = manager;

            //obj = _engine.CurrentScene.AddGameObject("Font");
            //obj.GetComponent<Transform>().Position = new Vector3(0, 0, 3.0f);
            //obj.GetComponent<Transform>().Scale = new Vector3(1, 1, 1);
            //text = obj.AddComponent<JuiceBoxEngine.Graphics.Text>();

            //objects.Add(obj);

            //JuiceBoxEngine.Graphics.Debugging.DebugRenderer.Instance.DrawLine(new Vector2(0, 0), new Vector2(5, 5), new Color32(1.0f, 0.0f, 0.0f, 1.0f));

            //Update();
        }
    });

    Bridge.define("Straw.AutoUpgrade", {
        fields: {
            name: null,
            cost: System.Int64(0),
            crop: 0
        },
        ctors: {
            ctor: function (name, cost, crop) {
                this.$initialize();
                this.name = name;
                this.cost = cost;
                this.crop = crop;
            }
        }
    });

    Bridge.define("Straw.CropData", {
        fields: {
            name: null,
            index: 0,
            initialCost: System.Int64(0),
            value: System.Int64(0),
            maxGrowth: 0,
            growTime: 0,
            sprite: null
        },
        ctors: {
            ctor: function (index, name, cost, value, maxGrowth, growTime, sprite) {
                this.$initialize();
                this.name = name;
                this.index = index;
                this.initialCost = cost;
                this.value = value;
                this.maxGrowth = maxGrowth;
                this.sprite = sprite;
                this.growTime = growTime;
            }
        }
    });

    Bridge.define("Straw.Farm", {
        fields: {
            crops: null,
            progress: null,
            _objects: null,
            _scene: null,
            Offset: null,
            width: 0,
            height: 0,
            growRate: 0,
            /**
             * change is every growrate (in seconds) 1/growChange. 1 = guaranteed every crop grows. 2 = half, 3 = third, etc.
             *
             * @instance
             * @public
             * @memberof Straw.Farm
             * @type number
             */
            growchance: 0,
            _prevUpdate: 0
        },
        ctors: {
            init: function () {
                this.Offset = new JuiceBoxEngine.Math.Vector2();
            },
            ctor: function (scene, offset, x, y) {
                this.$initialize();
                this._scene = scene;
                this._objects = System.Array.create(null, null, JuiceBoxEngine.Scene.GameObject, x, y);
                this.crops = System.Array.create(null, null, Straw.CropData, x, y);
                this.progress = System.Array.create(0, null, System.Int32, x, y);
                this.Offset = offset.$clone();

                this.width = x;
                this.height = y;

                this.growRate = 1.0;
            }
        },
        methods: {
            LoadFarm: function (cropData) {
                for (var i = 0; i < this.width; i = (i + 1) | 0) {
                    for (var j = 0; j < this.height; j = (j + 1) | 0) {
                        var crop = Straw.GameSaver.GetIntOrDefault("crops(" + i + "," + j + ")", -1);

                        this.progress.set([i, j], Straw.GameSaver.GetIntOrDefault("progress(" + i + "," + j + ")", 0));
                        if (crop > -1) {
                            this.PlantCrop(i, j, System.Linq.Enumerable.from(cropData).elementAt(crop));
                            this.progress.set([i, j], Straw.GameSaver.GetIntOrDefault("progress(" + i + "," + j + ")", 0));
                            this.UpdateCrop(i, j);
                        }
                    }
                }
            },
            PlantCrop: function (x, y, crop) {
                this.crops.set([x, y], crop);
                if (this._objects.get([x, y]) == null) {
                    var obj = this._scene.AddGameObject$1("Crop" + x + "," + y);
                    var pos = JuiceBoxEngine.Math.Vector2.op_Addition(this.Offset.$clone(), new JuiceBoxEngine.Math.Vector2.$ctor2(Bridge.Int.mul(16, x) + 8.0, Bridge.Int.mul(16, y)));
                    obj.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(pos.X, pos.Y, 0.0);
                    var objSprite = obj.AddComponent(JuiceBoxEngine.Graphics.Sprite);
                    objSprite.Texture = this._scene.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, crop.sprite);
                    objSprite.Offset = new JuiceBoxEngine.Math.Vector2.$ctor2(0.0, 8.0);

                    this._objects.set([x, y], obj);
                }
                this._objects.get([x, y]).Enabled = true;
                this._objects.get([x, y]).GetComponent(JuiceBoxEngine.Graphics.Sprite).Texture = this._scene.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, crop.sprite);
                this.progress.set([x, y], 1);
                this.UpdateCrop(x, y);
            },
            UpdateCrop: function (x, y) {
                var frame = this.progress.get([x, y]);
                this._objects.get([x, y]).GetComponent(JuiceBoxEngine.Graphics.Sprite).SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(Bridge.Int.mul(frame, 16), 0, 16, 16);
            },
            GetTile: function (x, y, position) {
                position = JuiceBoxEngine.Math.Vector2.op_Subtraction(position.$clone(), this.Offset.$clone());
                x.v = Bridge.Int.clip32(position.X / 16.0);
                y.v = Bridge.Int.clip32(position.Y / 16.0);
            },
            GetCrop: function (x, y) {
                if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
                    return null;
                }

                return this.crops.get([x, y]);
            },
            SaveFarm: function () {
                for (var i = 0; i < this.width; i = (i + 1) | 0) {
                    for (var j = 0; j < this.height; j = (j + 1) | 0) {
                        var data = this.crops.get([i, j]);
                        window.localStorage.setItem("crops(" + i + "," + j + ")", data != null ? data.index : -1);
                        window.localStorage.setItem("progress(" + i + "," + j + ")", this.progress.get([i, j]));
                    }
                }
            },
            HarvestTile: function (x, y) {
                // out of range.
                if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
                    return null;
                }

                // nothing to harvest.
                if (this.crops.get([x, y]) == null) {
                    return null;
                }

                if (this.progress.get([x, y]) === this.crops.get([x, y]).maxGrowth) {
                    var retval = this.crops.get([x, y]);
                    this.progress.set([x, y], 1);
                    this.UpdateCrop(x, y);

                    return retval;
                }

                return null;
            },
            Update: function (upgrades, curUpgrade) {
                if (JuiceBoxEngine.Util.Time.TotalSeconds - this._prevUpdate > this.growRate) {
                    this._prevUpdate = JuiceBoxEngine.Util.Time.TotalSeconds;

                    // Grow random plants.
                    var random = new System.Random.ctor();
                    for (var i = 0; i < this.width; i = (i + 1) | 0) {
                        for (var j = 0; j < this.height; j = (j + 1) | 0) {
                            if (this.crops.get([i, j]) != null) {
                                var upgrade = 1;
                                if (curUpgrade > this.crops.get([i, j]).index) {
                                    upgrade = upgrades.getItem(this.crops.get([i, j]).index).newValue;
                                }

                                if (random.next$2(0, Bridge.Int.mul(this.growchance, (((Bridge.Int.div(this.crops.get([i, j]).growTime, upgrade)) | 0)))) === 0) {
                                    if (this.progress.get([i, j]) < this.crops.get([i, j]).maxGrowth) {
                                        this.progress.set([i, j], (this.progress.get([i, j]) + 1) | 0);
                                        this.UpdateCrop(i, j);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    Bridge.define("Straw.Farmer", {
        fields: {
            farmerObject: null,
            moveSpeed: 0,
            _collider: null,
            _sprite: null,
            _scene: null,
            _looksRight: false
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                this.farmerObject = scene.AddGameObject$1("Farmer");
                this.farmerObject.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(Straw.GameSaver.GetFloatOrDefault("playerX", 256.0), Straw.GameSaver.GetFloatOrDefault("playerY", 310.0), 0.0);

                this._sprite = this.farmerObject.AddComponent(JuiceBoxEngine.Graphics.Sprite);
                this._sprite.Texture = scene.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/FarmerIdle.png");
                this._sprite.Offset = new JuiceBoxEngine.Math.Vector2.$ctor2(0.0, 8.0);

                this._collider = this.farmerObject.AddComponent(JuiceBoxEngine.Scene.Collider);
                this._collider.AABB = new JuiceBoxEngine.Math.Rectangle.$ctor1(4, 0, 8, 8);

                this._scene = scene;

                this._looksRight = true;
                this.moveSpeed = 50.0;
            }
        },
        methods: {
            Update: function () {
                if (JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("Escape")) {
                    // Quit? pause?
                }
                var direction = new JuiceBoxEngine.Math.Vector2.ctor();
                if (JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("ArrowLeft") || JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("Left")) {
                    direction = JuiceBoxEngine.Math.Vector2.op_Addition(direction.$clone(), new JuiceBoxEngine.Math.Vector2.$ctor2(-1.0, 0.0));
                    this._looksRight = false;
                }
                if (JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("ArrowRight") || JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("Right")) {
                    direction = JuiceBoxEngine.Math.Vector2.op_Addition(direction.$clone(), new JuiceBoxEngine.Math.Vector2.$ctor2(1.0, 0.0));
                    this._looksRight = true;
                }
                if (JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("ArrowDown") || JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("Down")) {
                    direction = JuiceBoxEngine.Math.Vector2.op_Addition(direction.$clone(), new JuiceBoxEngine.Math.Vector2.$ctor2(0.0, -1.0));
                }
                if (JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("ArrowUp") || JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("Up")) {
                    direction = JuiceBoxEngine.Math.Vector2.op_Addition(direction.$clone(), new JuiceBoxEngine.Math.Vector2.$ctor2(0.0, 1.0));
                }
                //direction.Normalize();
                this._collider.Translate(JuiceBoxEngine.Math.Vector2.op_Multiply$1(JuiceBoxEngine.Math.Vector2.op_Multiply$1(direction.$clone(), this.moveSpeed), JuiceBoxEngine.Util.Time.DeltaTime));

                if (direction.X === 0.0 && direction.Y === 0.0) {
                    this._sprite.Texture = this._scene.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/FarmerIdle.png");

                    // idle animation
                    var frame = Bridge.Int.clip32((JuiceBoxEngine.Util.Time.TotalSeconds * 10)) % 9;
                    this._sprite.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(Bridge.Int.mul(frame, 16), 0, 16, 16);
                    this.farmerObject.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(1, 1, 1);
                } else {
                    this._sprite.Texture = this._scene.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/FarmerRun.png");

                    // run animation
                    var frame1 = Bridge.Int.clip32((JuiceBoxEngine.Util.Time.TotalSeconds * 10)) % 8;
                    this._sprite.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(Bridge.Int.mul(frame1, 16), 0, 16, 16);
                    this.farmerObject.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(this._looksRight ? 1 : -1, 1, 1);
                }
            }
        }
    });

    Bridge.define("Straw.Game", {
        inherits: [JuiceBoxEngine.JuiceboxEngine],
        ctors: {
            ctor: function () {
                this.$initialize();
                JuiceBoxEngine.JuiceboxEngine.ctor.call(this);

            }
        },
        methods: {
            Run: function () {
                JuiceBoxEngine.JuiceboxEngine.prototype.Run.call(this);

                document.title = "Ludum Dare 41";

                var splashScreen = new Straw.SplashScene(this._defaultManager);
                this.SetScene(splashScreen);

                splashScreen.SplashScreen(this, 5.0, new Straw.MainScene(this._defaultManager, this));
            },
            Update: function () {
                JuiceBoxEngine.JuiceboxEngine.prototype.Update.call(this);
            }
        }
    });

    Bridge.define("Straw.GameSaver", {
        statics: {
            methods: {
                GetLongOrDefault: function (name, defaultVal) {
                    var retval = { v : defaultVal };

                    try {
                        System.Int64.tryParse(Bridge.toString(window.localStorage[name]), retval);
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);
                    }

                    return retval.v;
                },
                GetFloatOrDefault: function (name, defaultVal) {
                    var retval = { v : defaultVal };

                    try {
                        System.Single.tryParse(Bridge.toString(window.localStorage[name]), null, retval);
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);
                    }

                    return retval.v;
                },
                GetIntOrDefault: function (name, defaultVal) {
                    var retval = { v : defaultVal };

                    try {
                        System.Int32.tryParse(Bridge.toString(window.localStorage[name]), retval);
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);
                    }

                    return retval.v;
                }
            }
        }
    });

    Bridge.define("Straw.GameScene", {
        inherits: [JuiceBoxEngine.Scene.Scene],
        fields: {
            farmer: null,
            farm: null,
            crops: null,
            currentCrop: 0,
            moneyText: null,
            moneyTextBack: null,
            toolTip: null,
            toolTipBack: null,
            borders: null,
            _background: null,
            _plantIcons: null,
            money: System.Int64(0),
            highestMoney: System.Int64(0),
            _bestCrop: 0,
            _plantsPool: null,
            _timeHarvested: null,
            _plantPoolSize: 0,
            _curPlant: 0,
            _releasedButton: false,
            _toolbarheight: 0,
            _curDiscorveredCrop: 0,
            showToolbar: 0,
            _helpBtn: null,
            _wizard: null,
            _salesDude: null,
            muted: false,
            _mutedPressed: false,
            _automagicUpgrade: null,
            _autoUpgrades: null,
            _curAutoPosX: 0,
            _curAutoPosY: 0,
            _curAutoUpgrade: 0,
            _valueUpgrade: null,
            _valueUpgrades: null,
            _curValueUpgrade: 0,
            _saveInterval: 0,
            _saveProgress: 0
        },
        ctors: {
            init: function () {
                this.showToolbar = 0.0;
            },
            ctor: function (manager) {
                this.$initialize();
                JuiceBoxEngine.Scene.Scene.ctor.call(this, manager);
                this.crops = new (System.Collections.Generic.List$1(Straw.CropData)).ctor();
                this.crops.add(new Straw.CropData(0, "onion", System.Int64(5), System.Int64(2), 5, 1, "Textures/Onion.png"));
                this.crops.add(new Straw.CropData(1, "carrot", System.Int64(25), System.Int64(6), 5, 2, "Textures/Carrot.png"));
                this.crops.add(new Straw.CropData(2, "potato", System.Int64(100), System.Int64(25), 5, 3, "Textures/Potato.png"));
                this.crops.add(new Straw.CropData(3, "beetroot", System.Int64(500), System.Int64(120), 5, 4, "Textures/BeetRoot.png"));
                this.crops.add(new Straw.CropData(4, "pumpkin", System.Int64(2500), System.Int64(750), 5, 5, "Textures/Pumpkin.png"));
                this.crops.add(new Straw.CropData(5, "wheat", System.Int64(10000), System.Int64(2500), 5, 6, "Textures/Wheat.png"));
                this.crops.add(new Straw.CropData(6, "corn", System.Int64(100000), System.Int64(25000), 5, 7, "Textures/Corn.png"));
                this.crops.add(new Straw.CropData(7, "mana", System.Int64(1000000), System.Int64(250000), 5, 8, "Textures/Mana.png"));
                this.crops.add(new Straw.CropData(8, "gold", System.Int64(10000000), System.Int64(2500000), 5, 9, "Textures/Gold.png"));

                this._autoUpgrades = new (System.Collections.Generic.List$1(Straw.AutoUpgrade)).ctor();
                for (var i = 0; i < this.crops.Count; i = (i + 1) | 0) {
                    this._autoUpgrades.add(new Straw.AutoUpgrade("auto-" + (System.Linq.Enumerable.from(this.crops).elementAt(i).name || ""), System.Linq.Enumerable.from(this.crops).elementAt(i).initialCost.mul(System.Int64(20)), i));
                }

                this._valueUpgrades = new (System.Collections.Generic.List$1(Straw.ValueUpgrade)).ctor();
                for (var i1 = 0; i1 < this.crops.Count; i1 = (i1 + 1) | 0) {
                    var data = System.Linq.Enumerable.from(this.crops).elementAt(i1);
                    this._valueUpgrades.add(new Straw.ValueUpgrade(data.initialCost.mul(System.Int64(40)), i1, 2));
                }

                this._curAutoUpgrade = Straw.GameSaver.GetIntOrDefault("curAutoUpgrade", 0);
                this._curValueUpgrade = Straw.GameSaver.GetIntOrDefault("curValueUpgrade", 0);

                this.currentCrop = Straw.GameSaver.GetIntOrDefault("curPlant", 0);
                this._bestCrop = Straw.GameSaver.GetIntOrDefault("bestCrop", 0);
                this._curAutoPosX = 0;
                this._curAutoPosY = 0;

                this._plantPoolSize = 15;

                // Save every 10 seconds.
                this._saveInterval = 10.0;

                this.money = Straw.GameSaver.GetLongOrDefault("money", System.Int64(20));
                this.highestMoney = Straw.GameSaver.GetLongOrDefault("highestMoney", this.money);

                this.muted = false;
            }
        },
        methods: {
            Start: function () {
                JuiceBoxEngine.Scene.Scene.prototype.Start.call(this);

                this.DefaultCamera.ClearColor = new JuiceBoxEngine.Math.Color32.$ctor1(65, 105, 225, 255);
                this.DefaultCamera.Parent.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0, 310.0, 0.0);
                this.DefaultCamera.PixelPerfect = true;

                // Load in a tilemap.
                var tilemapObj = this.AddGameObject$1("Tilemap");
                var map = tilemapObj.AddComponent(JuiceBoxEngine.Graphics.TileMap);
                map.Depth = 100.0;
                map.Map = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/FarmMapData.png");
                map.Sprites = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/FarmMapSprites.png");

                this._automagicUpgrade = this.AddGameObject$1("Auto Upgrade");
                this._automagicUpgrade.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(216.0, 350.0, 0.0);
                var upgradeSprite = this._automagicUpgrade.AddComponent(JuiceBoxEngine.Graphics.Sprite);
                upgradeSprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/Lightning.png");
                upgradeSprite.Offset = new JuiceBoxEngine.Math.Vector2.$ctor2(0.0, 8.0);

                var wizard = this.AddGameObject$1("Wizard");
                wizard.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(200.0, 350.0, 0.0);
                this._wizard = wizard.AddComponent(JuiceBoxEngine.Graphics.Sprite);
                this._wizard.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/Wizard.png");
                this._wizard.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 0, 16, 16);

                var salesDude = this.AddGameObject$1("Sales Dude");
                salesDude.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(314.0, 350.0, 0.0);
                this._salesDude = salesDude.AddComponent(JuiceBoxEngine.Graphics.Sprite);
                this._salesDude.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/Salesman.png");
                this._salesDude.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 0, 16, 16);

                this._valueUpgrade = this.AddGameObject$1("Value Upgrade");
                this._valueUpgrade.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(298.0, 350.0, 0.0);
                upgradeSprite = this._valueUpgrade.AddComponent(JuiceBoxEngine.Graphics.Sprite);
                upgradeSprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/Coin.png");
                upgradeSprite.Offset = new JuiceBoxEngine.Math.Vector2.$ctor2(0.0, 8.0);

                this.moneyText = this.AddGameObject$1("Money Text");
                var txt = this.moneyText.AddComponent(JuiceBoxEngine.Graphics.Text);
                txt.DisplayText = "$" + (Bridge.toString(this.money) || "");
                txt.Alignment = JuiceBoxEngine.Graphics.TextAlignment.Center;

                this.moneyTextBack = this.AddGameObject$1("Money Text");
                txt = this.moneyTextBack.AddComponent(JuiceBoxEngine.Graphics.Text);
                txt.DisplayText = "$" + (Bridge.toString(this.money) || "");
                txt.Alignment = JuiceBoxEngine.Graphics.TextAlignment.Center;
                txt.Color = new JuiceBoxEngine.Math.Color32.$ctor2(0.0, 0.0, 0.0, 1.0);

                this._background = this.AddGameObject$1("Background");
                var bgSprite = this._background.AddComponent(JuiceBoxEngine.Graphics.Sprite);
                bgSprite.UsePositionForDepth = false;
                bgSprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/Background.png");
                this._background.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(10.0, 1.0, 1.0);

                this._helpBtn = this.AddGameObject$1("Help Btn");
                var helpSprite = this._helpBtn.AddComponent(JuiceBoxEngine.Graphics.Sprite);
                helpSprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/Buttons.png");
                helpSprite.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 32, 32, 16);
                helpSprite.Offset = new JuiceBoxEngine.Math.Vector2.$ctor2(0.0, 24.0);

                this._plantIcons = System.Array.init(this.crops.Count, null, JuiceBoxEngine.Scene.GameObject);
                for (var i = 0; i < this.crops.Count; i = (i + 1) | 0) {
                    this._plantIcons[System.Array.index(i, this._plantIcons)] = this.AddGameObject();
                    var piSprite = this._plantIcons[System.Array.index(i, this._plantIcons)].AddComponent(JuiceBoxEngine.Graphics.Sprite);
                    piSprite.UsePositionForDepth = false;
                    piSprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, this.crops.getItem(i).sprite);
                    piSprite.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 0, 16, 16);
                }

                this.UpdateIcons();

                this.toolTip = this.AddGameObject$1("Tooltip");
                var tooltipElement = this.toolTip.AddComponent(JuiceBoxEngine.Graphics.Text);
                tooltipElement.DisplayText = "<z> to plant " + (System.Linq.Enumerable.from(this.crops).elementAt(0).name || "");
                bgSprite.UsePositionForDepth = false;
                tooltipElement.Alignment = JuiceBoxEngine.Graphics.TextAlignment.Center;

                this.toolTipBack = this.AddGameObject$1("Tooltip back");
                tooltipElement = this.toolTipBack.AddComponent(JuiceBoxEngine.Graphics.Text);
                tooltipElement.DisplayText = "<z> to plant " + (System.Linq.Enumerable.from(this.crops).elementAt(0).name || "");
                bgSprite.UsePositionForDepth = false;
                tooltipElement.Alignment = JuiceBoxEngine.Graphics.TextAlignment.Center;
                tooltipElement.Color = new JuiceBoxEngine.Math.Color32.$ctor2(0.0, 0.0, 0.0, 1.0);

                this.borders = this.AddGameObject$1("Borders");
                this.borders.AddComponent(JuiceBoxEngine.Scene.Collider).AABB = new JuiceBoxEngine.Math.Rectangle.$ctor1(192, 176, 128, 16);
                this.borders.AddComponent(JuiceBoxEngine.Scene.Collider).AABB = new JuiceBoxEngine.Math.Rectangle.$ctor1(176, 176, 16, 256);
                this.borders.AddComponent(JuiceBoxEngine.Scene.Collider).AABB = new JuiceBoxEngine.Math.Rectangle.$ctor1(320, 176, 16, 256);
                this.borders.AddComponent(JuiceBoxEngine.Scene.Collider).AABB = new JuiceBoxEngine.Math.Rectangle.$ctor1(192, 384, 128, 16);
                this.borders.AddComponent(JuiceBoxEngine.Scene.Collider).AABB = new JuiceBoxEngine.Math.Rectangle.$ctor1(192, 326, 48, 8);
                this.borders.AddComponent(JuiceBoxEngine.Scene.Collider).AABB = new JuiceBoxEngine.Math.Rectangle.$ctor1(272, 326, 48, 8);

                this.farmer = new Straw.Farmer(this);
                this.farm = new Straw.Farm(this, new JuiceBoxEngine.Math.Vector2.$ctor2(192.0, 192.0), 8, 8);
                this.farm.LoadFarm(this.crops);
                this.farm.growchance = 2;

                this._plantsPool = System.Array.init(this._plantPoolSize, null, JuiceBoxEngine.Scene.GameObject);
                this._timeHarvested = System.Array.init(this._plantPoolSize, 0, System.Single);

                this._curDiscorveredCrop = Straw.GameSaver.GetIntOrDefault("bestDiscovered", 0);

                for (var i1 = 0; i1 < this._plantPoolSize; i1 = (i1 + 1) | 0) {
                    this._plantsPool[System.Array.index(i1, this._plantsPool)] = this.AddGameObject();
                    var plantSprite = this._plantsPool[System.Array.index(i1, this._plantsPool)].AddComponent(JuiceBoxEngine.Graphics.Sprite);
                    this._plantsPool[System.Array.index(i1, this._plantsPool)].Enabled = false;
                    this._plantsPool[System.Array.index(i1, this._plantsPool)].AddComponent(JuiceBoxEngine.Sound.AudioSource).SetAudio(this.ResourceManager.Load(JuiceBoxEngine.Sound.Sound, "plop.wav"));
                }

                window.onbeforeunload = Bridge.fn.bind(this, function (x) {
                    this.SaveGame();
                });
            },
            Update: function () {
                this.showToolbar -= JuiceBoxEngine.Util.Time.DeltaTime;

                this.farmer.Update();
                this.farm.Update(this._valueUpgrades, this._curValueUpgrade);

                this._saveProgress -= JuiceBoxEngine.Util.Time.DeltaTime;
                if (this._saveProgress <= 0) {
                    this.SaveGame();
                    this._saveProgress = this._saveInterval;
                }

                var x = { };
                var y = { };

                var farmerPos = this.farmer.farmerObject.Transform.Position.$clone();
                this.farm.GetTile(x, y, new JuiceBoxEngine.Math.Vector2.$ctor2(farmerPos.X, farmerPos.Y));

                this._helpBtn.Transform.Position = farmerPos.$clone();

                this.DefaultCamera.Parent.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0, farmerPos.Y, 0.0);

                if (JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("m") && !this._mutedPressed) {
                    this.muted = !this.muted;
                    this._mutedPressed = true;
                } else if (!JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("m")) {
                    this._mutedPressed = false;
                }

                // move toolbar.
                if (this.showToolbar < 0.0) {
                    this._toolbarheight -= JuiceBoxEngine.Util.Time.DeltaTime * 60.0;
                } else {
                    this._toolbarheight += JuiceBoxEngine.Util.Time.DeltaTime * 60.0;
                }

                // clamp toolbar.
                if (this._toolbarheight < -16.0) {
                    this._toolbarheight = -16.0;
                }
                if (this._toolbarheight > 0.0) {
                    this._toolbarheight = 0.0;
                }

                // Hacky UI.
                this.moneyText.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0, farmerPos.Y + 32.0, 80.0);
                this.moneyTextBack.Transform.Position = JuiceBoxEngine.Math.Vector3.op_Addition(this.moneyText.Transform.Position.$clone(), new JuiceBoxEngine.Math.Vector3.$ctor2(1.0, -1.0, -1.0));
                this.toolTip.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0, this._toolbarheight + farmerPos.Y - 46.0, 80.0);
                this.toolTipBack.Transform.Position = JuiceBoxEngine.Math.Vector3.op_Addition(this.toolTip.Transform.Position.$clone(), new JuiceBoxEngine.Math.Vector3.$ctor2(1.0, -1.0, -1.0));
                this._background.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0, this._toolbarheight + farmerPos.Y - 52.0, 49.0);

                // wizard & sales dude
                var frame = Bridge.Int.clip32((JuiceBoxEngine.Util.Time.TotalSeconds * 8)) % 9;
                this._wizard.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(Bridge.Int.mul(frame, 16), 0, 16, 16);

                frame = Bridge.Int.clip32((JuiceBoxEngine.Util.Time.TotalSeconds * 9)) % 8;
                this._salesDude.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(Bridge.Int.mul(frame, 16), 0, 16, 16);

                for (var i = 0; i < this.crops.Count; i = (i + 1) | 0) {
                    this._plantIcons[System.Array.index(i, this._plantIcons)].Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(188.0 + Bridge.Int.mul(17, i), this._toolbarheight + farmerPos.Y - 52.0, 50.0);

                    // Highlight current crop.
                    if (i === this.currentCrop) {
                        var curRot = this._plantIcons[System.Array.index(i, this._plantIcons)].Transform.Rotation.Z;
                        this._plantIcons[System.Array.index(i, this._plantIcons)].Transform.Rotation = new JuiceBoxEngine.Math.Vector3.$ctor2(0.0, 0.0, curRot + 2.0 * JuiceBoxEngine.Util.Time.DeltaTime);
                    } else {
                        this._plantIcons[System.Array.index(i, this._plantIcons)].Transform.Rotation = new JuiceBoxEngine.Math.Vector3.ctor();
                    }
                }

                this.UpdateFarmedPlants();

                // If the player is inside the farm.
                if (x.v >= 0 && x.v < this.farm.width && y.v >= 0 && y.v < this.farm.height) {
                    if (JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("x") && this._releasedButton) {
                        this._releasedButton = false;
                        this.showToolbar = 5.0;
                        this.currentCrop = (((this.currentCrop + 1) | 0)) % (((this._bestCrop + 1) | 0));
                    } else if (!JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("x")) {
                        this._releasedButton = true;
                    }

                    // Check for crops.
                    var data = this.farm.HarvestTile(x.v, y.v);
                    if (data != null) {
                        // Harvested a crop.
                        this.HarvestCrop(x.v, y.v);
                    }

                    data = this.farm.GetCrop(x.v, y.v);

                    if (data == null || data.index !== System.Linq.Enumerable.from(this.crops).elementAt(this.currentCrop).index) {
                        // Plant crop.
                        if ((JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown(" ") || JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("z")) && this.money.gte(System.Linq.Enumerable.from(this.crops).elementAt(this.currentCrop).initialCost)) {
                            this.money = this.money.sub(System.Linq.Enumerable.from(this.crops).elementAt(this.currentCrop).initialCost);
                            this.farm.PlantCrop(x.v, y.v, System.Linq.Enumerable.from(this.crops).elementAt(this.currentCrop));
                            this.moneyText.GetComponent(JuiceBoxEngine.Graphics.Text).DisplayText = "$" + this.money;
                            this.moneyTextBack.GetComponent(JuiceBoxEngine.Graphics.Text).DisplayText = "$" + this.money;
                            this.SaveGame();
                        }
                    }
                }

                if (this._curAutoUpgrade !== this._autoUpgrades.Count) {
                    this._automagicUpgrade.Transform.Rotation = new JuiceBoxEngine.Math.Vector3.$ctor2(0.0, 0.0, JuiceBoxEngine.Math.Math.Sin(JuiceBoxEngine.Util.Time.TotalSeconds * 3.0) * 0.5);
                    this._automagicUpgrade.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(1.0, 1.0, 1.0);
                } else {
                    this._automagicUpgrade.Enabled = false;
                }

                if (this._curValueUpgrade !== this._valueUpgrades.Count) {
                    this._valueUpgrade.Transform.Rotation = new JuiceBoxEngine.Math.Vector3.$ctor2(0.0, 0.0, JuiceBoxEngine.Math.Math.Sin(JuiceBoxEngine.Util.Time.TotalSeconds * 3.0) * 0.5);
                    this._valueUpgrade.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(1.0, 1.0, 1.0);
                } else {
                    this._valueUpgrade.Enabled = false;
                }

                var tooltipElement = this.toolTip.GetComponent(JuiceBoxEngine.Graphics.Text);
                var tooltipElementback = this.toolTipBack.GetComponent(JuiceBoxEngine.Graphics.Text);
                if (farmerPos.Y > 320.0) {
                    this.showToolbar = 0.0;
                    this._helpBtn.GetComponent(JuiceBoxEngine.Graphics.Sprite).SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 0, 32, 16);
                    if (farmerPos.X < 256.0 && this._curAutoUpgrade !== this._autoUpgrades.Count) {
                        var upgrade = System.Linq.Enumerable.from(this._autoUpgrades).elementAt(this._curAutoUpgrade);
                        tooltipElement.DisplayText = (upgrade.name || "") + " $" + upgrade.cost;
                        tooltipElementback.DisplayText = (upgrade.name || "") + " $" + upgrade.cost;

                        this._automagicUpgrade.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(1.5, 1.5, 1.0);

                        if (JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("x") && this._releasedButton) {
                            this._releasedButton = false;
                            if (this.money.gte(this._autoUpgrades.getItem(this._curAutoUpgrade).cost)) {
                                this.money = this.money.sub(this._autoUpgrades.getItem(this._curAutoUpgrade).cost);
                                this._curAutoUpgrade = (this._curAutoUpgrade + 1) | 0;
                            }
                        } else if (!JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("x")) {
                            this._releasedButton = true;
                        }
                    } else if (this._curValueUpgrade !== this._valueUpgrades.Count) {
                        var upgrade1 = System.Linq.Enumerable.from(this._valueUpgrades).elementAt(this._curValueUpgrade);
                        tooltipElement.DisplayText = (System.Linq.Enumerable.from(this.crops).elementAt(upgrade1.crop).name || "") + "+ $" + upgrade1.cost;
                        tooltipElementback.DisplayText = (System.Linq.Enumerable.from(this.crops).elementAt(upgrade1.crop).name || "") + "+ $" + upgrade1.cost;

                        this._valueUpgrade.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(1.5, 1.5, 1.0);

                        if (JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("x") && this._releasedButton) {
                            this._releasedButton = false;
                            if (this.money.gte(this._valueUpgrades.getItem(this._curValueUpgrade).cost)) {
                                this.money = this.money.sub(this._valueUpgrades.getItem(this._curValueUpgrade).cost);
                                this._curValueUpgrade = (this._curValueUpgrade + 1) | 0;
                            }
                        } else if (!JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("x")) {
                            this._releasedButton = true;
                        }
                    }
                } else {
                    tooltipElement.DisplayText = (System.Linq.Enumerable.from(this.crops).elementAt(this.currentCrop).name || "") + " $" + System.Linq.Enumerable.from(this.crops).elementAt(this.currentCrop).initialCost;
                    tooltipElementback.DisplayText = (System.Linq.Enumerable.from(this.crops).elementAt(this.currentCrop).name || "") + " $" + System.Linq.Enumerable.from(this.crops).elementAt(this.currentCrop).initialCost;

                    if (this._curDiscorveredCrop < this._bestCrop) {
                        this._helpBtn.GetComponent(JuiceBoxEngine.Graphics.Sprite).SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 16, 32, 16);

                        if (this.currentCrop > this._curDiscorveredCrop) {
                            this._curDiscorveredCrop = this.currentCrop;
                        }
                    } else if (this.money.gte(System.Linq.Enumerable.from(this.crops).elementAt(this.currentCrop).initialCost) && this.farm.GetCrop(x.v, y.v) == null) {
                        var helpSprite = this._helpBtn.GetComponent(JuiceBoxEngine.Graphics.Sprite);
                        helpSprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/Buttons.png");
                        helpSprite.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 32, 32, 16);
                    } else {
                        this._helpBtn.GetComponent(JuiceBoxEngine.Graphics.Sprite).SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 0, 1, 1);
                    }
                }

                this._curAutoPosX = (this._curAutoPosX + 1) | 0;
                if (this._curAutoPosX >= this.farm.width) {
                    this._curAutoPosX = 0;
                    this._curAutoPosY = (this._curAutoPosY + 1) | 0;
                    if (this._curAutoPosY >= this.farm.height) {
                        this._curAutoPosY = 0;
                    }
                }

                var crop = this.farm.GetCrop(this._curAutoPosX, this._curAutoPosY);
                if (crop != null) {
                    if (crop.index < this._curAutoUpgrade) {
                        crop = this.farm.HarvestTile(this._curAutoPosX, this._curAutoPosY);
                        if (crop != null) {
                            this.HarvestCrop(this._curAutoPosX, this._curAutoPosY);
                        }
                    }
                }

                JuiceBoxEngine.Scene.Scene.prototype.Update.call(this);
            },
            /**
             * Save game to local storage.
             *
             * @instance
             * @public
             * @this Straw.GameScene
             * @memberof Straw.GameScene
             * @return  {void}
             */
            SaveGame: function () {
                window.localStorage.setItem("money", this.money);
                window.localStorage.setItem("highestMoney", this.highestMoney);
                window.localStorage.setItem("curAutoUpgrade", this._curAutoUpgrade);
                window.localStorage.setItem("curValueUpgrade", this._curValueUpgrade);
                window.localStorage.setItem("curPlant", this.currentCrop);
                window.localStorage.setItem("bestCrop", this._bestCrop);
                window.localStorage.setItem("bestDiscovered", this._curDiscorveredCrop);
                window.localStorage.setItem("playerX", this.farmer.farmerObject.Transform.Position.X);
                window.localStorage.setItem("playerY", this.farmer.farmerObject.Transform.Position.Y);
                this.farm.SaveFarm();
            },
            HarvestCrop: function (x, y) {
                var data = this.farm.GetCrop(x, y);

                this.money = this.money.add(data.value);

                if (this.money.gt(this.highestMoney)) {
                    this.highestMoney = this.money;
                    this.UpdateIcons();
                }
                this.moneyText.GetComponent(JuiceBoxEngine.Graphics.Text).DisplayText = "$" + this.money;
                this.moneyTextBack.GetComponent(JuiceBoxEngine.Graphics.Text).DisplayText = "$" + this.money;

                // Visualize crop being harvested.
                this._plantsPool[System.Array.index(this._curPlant, this._plantsPool)].Enabled = true;
                var plantSprite = this._plantsPool[System.Array.index(this._curPlant, this._plantsPool)].GetComponent(JuiceBoxEngine.Graphics.Sprite);
                plantSprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, data.sprite);
                plantSprite.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 0, 16, 16);

                if (!this.muted) {
                    this._plantsPool[System.Array.index(this._curPlant, this._plantsPool)].GetComponent(JuiceBoxEngine.Sound.AudioSource).Play();
                }

                this._plantsPool[System.Array.index(this._curPlant, this._plantsPool)].Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(this.farm.Offset.X + Bridge.Int.mul(16, x) + 8, this.farm.Offset.Y + Bridge.Int.mul(16, y), 0.0);
                this._plantsPool[System.Array.index(this._curPlant, this._plantsPool)].Transform.Rotation = new JuiceBoxEngine.Math.Vector3.ctor();
                this._timeHarvested[System.Array.index(this._curPlant, this._timeHarvested)] = JuiceBoxEngine.Util.Time.TotalSeconds;

                this._curPlant = (((this._curPlant + 1) | 0)) % this._plantPoolSize;
            },
            UpdateIcons: function () {
                // Update icons
                for (var i = 0; i < this.crops.Count; i = (i + 1) | 0) {
                    var piSprite = this._plantIcons[System.Array.index(i, this._plantIcons)].GetComponent(JuiceBoxEngine.Graphics.Sprite);
                    if (this.highestMoney.gte(this.crops.getItem(i).initialCost)) {
                        piSprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, this.crops.getItem(i).sprite);
                        this._bestCrop = i;
                    } else {
                        piSprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/QuestionMark.png");
                    }
                    piSprite.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 0, 16, 16);
                }
            },
            UpdateFarmedPlants: function () {
                for (var i = 0; i < this._plantPoolSize; i = (i + 1) | 0) {
                    if (this._plantsPool[System.Array.index(i, this._plantsPool)].Enabled) {
                        var timeInAir = JuiceBoxEngine.Util.Time.TotalSeconds - this._timeHarvested[System.Array.index(i, this._timeHarvested)];
                        var curPos = this._plantsPool[System.Array.index(i, this._plantsPool)].Transform.Position.$clone();
                        this._plantsPool[System.Array.index(i, this._plantsPool)].Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(curPos.X + (40 * JuiceBoxEngine.Math.Math.Sin(this._timeHarvested[System.Array.index(i, this._timeHarvested)]) * JuiceBoxEngine.Util.Time.DeltaTime), curPos.Y + (80 * JuiceBoxEngine.Math.Math.Cos(timeInAir * 4.0) * JuiceBoxEngine.Util.Time.DeltaTime), curPos.Z);

                        var curRot = this._plantsPool[System.Array.index(i, this._plantsPool)].Transform.Rotation.Z;
                        this._plantsPool[System.Array.index(i, this._plantsPool)].Transform.Rotation = new JuiceBoxEngine.Math.Vector3.$ctor2(0.0, 0.0, curRot + 2.0 * JuiceBoxEngine.Math.Math.Sin(this._timeHarvested[System.Array.index(i, this._timeHarvested)]) * JuiceBoxEngine.Util.Time.DeltaTime);

                        if (timeInAir > 1.0) {
                            this._plantsPool[System.Array.index(i, this._plantsPool)].Enabled = false;
                        }
                    }
                }
            }
        }
    });

    Bridge.define("Straw.MainScene", {
        inherits: [JuiceBoxEngine.Scene.Scene],
        fields: {
            _game: null,
            loading: false,
            txt: null,
            txtback: null,
            logo: null,
            logoback: null,
            crops: null
        },
        ctors: {
            init: function () {
                this.loading = false;
            },
            ctor: function (manager, game) {
                this.$initialize();
                JuiceBoxEngine.Scene.Scene.ctor.call(this, manager);
                this._game = game;
            }
        },
        methods: {
            Start: function () {
                JuiceBoxEngine.Scene.Scene.prototype.Start.call(this);

                this.DefaultCamera.ClearColor = new JuiceBoxEngine.Math.Color32.$ctor1(99, 155, 255, 255);
                this.DefaultCamera.Parent.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0, 256.0, 0.0);

                var tilemapObj = this.AddGameObject$1("Tilemap");
                var map = tilemapObj.AddComponent(JuiceBoxEngine.Graphics.TileMap);
                map.Depth = 0.0;
                map.Map = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/FarmMapData.png");
                map.Sprites = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/FarmMapSprites.png");

                var textObj = this.AddGameObject$1("Text");
                textObj.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0, 224.0, 80.0);
                this.txt = textObj.AddComponent(JuiceBoxEngine.Graphics.Text);
                this.txt.DisplayText = "press x to start";
                this.txt.Alignment = JuiceBoxEngine.Graphics.TextAlignment.Center;

                textObj = this.AddGameObject$1("Text Back");
                textObj.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(257.0, 223.0, 78.0);
                this.txtback = textObj.AddComponent(JuiceBoxEngine.Graphics.Text);
                this.txtback.DisplayText = "press x to start";
                this.txtback.Alignment = JuiceBoxEngine.Graphics.TextAlignment.Center;
                this.txtback.Color = new JuiceBoxEngine.Math.Color32.$ctor2(0.0, 0.0, 0.0, 1.0);

                textObj = this.AddGameObject$1("Text");
                textObj.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0, 192.0, 80.0);
                var text = textObj.AddComponent(JuiceBoxEngine.Graphics.Text);
                text.DisplayText = "by thom zeilstra";
                text.Alignment = JuiceBoxEngine.Graphics.TextAlignment.Center;

                this.logo = this.AddGameObject$1("Logo");
                this.logo.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0, 272.0, 80.0);
                this.logo.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(2.0, 2.0, 1.0);
                var logotxt = this.logo.AddComponent(JuiceBoxEngine.Graphics.Text);
                logotxt.DisplayText = "cropper";
                logotxt.Alignment = JuiceBoxEngine.Graphics.TextAlignment.Center;
                logotxt.Color = new JuiceBoxEngine.Math.Color32.$ctor1(106, 190, 48, 255);

                this.logoback = this.AddGameObject$1("Logo Back");
                this.logoback.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(257.0, 271.0, 5.0);
                this.logoback.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(2.0, 2.0, 1.0);
                logotxt = this.logoback.AddComponent(JuiceBoxEngine.Graphics.Text);
                logotxt.DisplayText = "cropper";
                logotxt.Alignment = JuiceBoxEngine.Graphics.TextAlignment.Center;
                logotxt.Color = new JuiceBoxEngine.Math.Color32.$ctor2(0.0, 0.0, 0.0, 1.0);

                var random = new System.Random.ctor();

                var cropSprites = System.Array.init(["Textures/Onion.png", "Textures/Carrot.png", "Textures/Potato.png", "Textures/BeetRoot.png", "Textures/Pumpkin.png", "Textures/Wheat.png", "Textures/Corn.png"], System.String);


                this.crops = System.Array.init(35, null, JuiceBoxEngine.Scene.GameObject);
                for (var i = 0; i < this.crops.length; i = (i + 1) | 0) {
                    var crop = this.AddGameObject$1("crop" + i);
                    crop.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0 + random.next$2(-80, 80), 256.0 + random.next$2(-60, 100), 0.0);
                    var cropSprite = crop.AddComponent(JuiceBoxEngine.Graphics.Sprite);
                    cropSprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, cropSprites[System.Array.index(random.next$2(0, cropSprites.length), cropSprites)]);
                    cropSprite.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 0, 16, 16);

                    this.crops[System.Array.index(i, this.crops)] = crop;
                }
            },
            Update: function () {
                var random = new System.Random.ctor();
                this.txt.Enabled = Bridge.Int.clip32((JuiceBoxEngine.Util.Time.TotalSeconds * 4.0)) % 2 === 0;
                this.txtback.Enabled = this.txt.Enabled;

                for (var i = 0; i < this.crops.length; i = (i + 1) | 0) {
                    var pos = this.crops[System.Array.index(i, this.crops)].Transform.Position.$clone();
                    this.crops[System.Array.index(i, this.crops)].Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(pos.X, pos.Y - 100.0 * JuiceBoxEngine.Util.Time.DeltaTime, 0.0);
                    this.crops[System.Array.index(i, this.crops)].Transform.Rotation = new JuiceBoxEngine.Math.Vector3.$ctor2(0.0, 0.0, this.crops[System.Array.index(i, this.crops)].Transform.Rotation.Z + JuiceBoxEngine.Math.Math.Sin(i * 1231.564) * 4.0 * JuiceBoxEngine.Util.Time.DeltaTime);

                    if (pos.Y < 176.0) {
                        this.crops[System.Array.index(i, this.crops)].Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(256.0 + random.next$2(-80, 80), 256.0 + random.next$2(64, 80), 0.0);
                    }
                }

                if (JuiceBoxEngine.Input.InputManager.Instance.IsKeyDown("x") && !this.loading) {
                    this._game.SetScene$1(new Straw.GameScene(this.ResourceManager), 1.0, this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/ScreenFade.png"));
                    this.loading = true;
                }

                JuiceBoxEngine.Scene.Scene.prototype.Update.call(this);
            }
        }
    });

    Bridge.define("Straw.SplashScene", {
        inherits: [JuiceBoxEngine.Scene.Scene],
        fields: {
            _time: 0,
            _game: null,
            _toScene: null,
            _juiceboxIcon: null,
            _juiceboxText: null
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                JuiceBoxEngine.Scene.Scene.ctor.call(this, manager);

            }
        },
        methods: {
            Start: function () {
                this._time = 3.0;
                JuiceBoxEngine.Scene.Scene.prototype.Start.call(this);

                this.DefaultCamera.ClearColor = new JuiceBoxEngine.Math.Color32.$ctor1(42, 42, 42, 255);

                this._juiceboxIcon = this.AddGameObject$1("Juicebox");
                var sprite = this._juiceboxIcon.AddComponent(JuiceBoxEngine.Graphics.Sprite);
                sprite.Texture = this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/JuiceboxIcon.png");

                this._juiceboxText = this.AddGameObject$1("Juicebox Text");
                this._juiceboxText.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(0.0, -30.0, 0.0);
                var textComp = this._juiceboxText.AddComponent(JuiceBoxEngine.Graphics.Text);
                textComp.DisplayText = "Juicebox engine";
                textComp.Color = new JuiceBoxEngine.Math.Color32.$ctor1(255, 165, 0, 255);
                textComp.Alignment = JuiceBoxEngine.Graphics.TextAlignment.Center;
            },
            SplashScreen: function (game, duration, scene) {
                this._game = game;
                this._time = duration;
                this._toScene = scene;
            },
            Update: function () {
                this._juiceboxIcon.Transform.Rotation = new JuiceBoxEngine.Math.Vector3.$ctor2(0.0, 0.0, 0.5 * JuiceBoxEngine.Math.Math.Sin(JuiceBoxEngine.Util.Time.TotalSeconds * 5.0));
                this._juiceboxIcon.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(JuiceBoxEngine.Math.Math.Sin(JuiceBoxEngine.Util.Time.TotalSeconds * 5.0) + 3.0, 0.5 * JuiceBoxEngine.Math.Math.Sin(JuiceBoxEngine.Util.Time.TotalSeconds * 5.0) + 3.0, 1.0);

                this._juiceboxText.Transform.Rotation = new JuiceBoxEngine.Math.Vector3.$ctor2(0.0, 0.0, 0.2 * JuiceBoxEngine.Math.Math.Sin(JuiceBoxEngine.Util.Time.TotalSeconds * 2.0));
                this._juiceboxIcon.Transform.Scale = new JuiceBoxEngine.Math.Vector3.$ctor2(JuiceBoxEngine.Math.Math.Sin(JuiceBoxEngine.Util.Time.TotalSeconds * 2.0) + 2.0, JuiceBoxEngine.Math.Math.Sin(JuiceBoxEngine.Util.Time.TotalSeconds * 2.0) + 2.0, 1.0);

                // Switch to other scene when time has elapsed.
                this._time -= JuiceBoxEngine.Util.Time.DeltaTimeRealTime;
                if (this._time <= 0.0) {
                    this._game.SetScene$1(this._toScene, 1.0, this.ResourceManager.Load(JuiceBoxEngine.Graphics.Texture2D, "Textures/ScreenFade.png"));
                }

                JuiceBoxEngine.Scene.Scene.prototype.Update.call(this);
            }
        }
    });

    Bridge.define("Straw.ValueUpgrade", {
        fields: {
            cost: System.Int64(0),
            crop: 0,
            newValue: 0
        },
        ctors: {
            ctor: function (cost, crop, newValue) {
                this.$initialize();
                this.cost = cost;
                this.crop = crop;
                this.newValue = newValue;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTdHJhdy5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiQXV0b1VwZ3JhZGUuY3MiLCJDcm9wRGF0YS5jcyIsIkZhcm0uY3MiLCJGYXJtZXIuY3MiLCJHYW1lLmNzIiwiR2FtZVNhdmVyLmNzIiwiR2FtZVNjZW5lLmNzIiwiTWFpblNjZW5lLmNzIiwiU3BsYXNoU2NlbmUuY3MiLCJWYWx1ZVVwZ3JhZGUuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQW9CWUEsV0FBWUEsSUFBSUE7WUFDaEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNQZUEsTUFBYUEsTUFBV0E7O2dCQUV2Q0EsWUFBWUE7Z0JBQ1pBLFlBQVlBO2dCQUNaQSxZQUFZQTs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNDQUEsT0FBV0EsTUFBYUEsTUFBV0EsT0FBWUEsV0FBZUEsVUFBY0E7O2dCQUV4RkEsWUFBWUE7Z0JBQ1pBLGFBQWFBO2dCQUNiQSxtQkFBbUJBO2dCQUNuQkEsYUFBYUE7Z0JBQ2JBLGlCQUFpQkE7Z0JBQ2pCQSxjQUFjQTtnQkFDZEEsZ0JBQWdCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQ0lSQSxPQUFhQSxRQUFnQkEsR0FBT0E7O2dCQUU1Q0EsY0FBU0E7Z0JBQ1RBLGdCQUFXQSxpRUFBZUEsR0FBR0E7Z0JBQzdCQSxhQUFRQSxnREFBYUEsR0FBR0E7Z0JBQ3hCQSxnQkFBV0EsMkNBQVFBLEdBQUdBO2dCQUN0QkEsY0FBU0E7O2dCQUVUQSxhQUFRQTtnQkFDUkEsY0FBU0E7O2dCQUVUQTs7OztnQ0FHaUJBO2dCQUVqQkEsS0FBSUEsV0FBV0EsSUFBSUEsWUFBU0E7b0JBRXhCQSxLQUFJQSxXQUFXQSxJQUFJQSxhQUFV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Q0FBa0NBO2dCQUN6RUEsZUFBd0NBO2dCQUN4Q0E7Z0JBQ0FBLGlCQUFpQkEsSUFBSUE7Z0JBQ3JCQSxxQkFBcUJBOztvQ0FHQUEsTUFBV0EsVUFBZ0JBO2dCQUVoREEsYUFBUUE7Z0JBQ1JBLGFBQVFBO2dCQUNSQSxnQkFBV0E7OztnQkFLWEEsd0NBQW1DQSxJQUFJQSw2Q0FBb0JBLE1BQU9BLDZCQUE2QkE7Z0JBQy9GQSxxQ0FBZ0NBLElBQUlBLG1DQUFRQSw2QkFBNkJBLG9EQUFrQ0EsTUFBT0EsNkJBQTZCQTs7Z0JBRS9JQSx3Q0FBbUNBLElBQUlBLDZDQUFvQkEsTUFBT0EsNkJBQTZCQTtnQkFDL0ZBLHFDQUFnQ0EsSUFBSUEsbUNBQVFBLDZCQUE2QkEsb0RBQWtDQSw2QkFBNkJBOzs7Z0JBR3hJQSxjQUFTQTtnQkFDVEEsSUFBSUE7b0JBQ0FBLHNCQUFlQSxvQkFBZ0JBOzs7Z0JBRW5DQTs7Ozs7Ozs7Ozs7OzRCQ3ZEZ0JBLE1BQVdBLE1BQVVBOztnQkFFckNBLFlBQVlBO2dCQUNaQSxZQUFZQTtnQkFDWkEsZ0JBQWdCQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmU7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlNjZW5lO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5HcmFwaGljcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5NYXRoO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5JbnB1dDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuVXRpbDtcclxuXHJcbm5hbWVzcGFjZSBTdHJhd1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZSBnYW1lID0gbmV3IEdhbWUoKTtcclxuICAgICAgICAgICAgZ2FtZS5SdW4oKTtcclxuXHJcbiAgICAgICAgICAgIC8vU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiSW5pdGlhbGl6aW5nIEp1aWNlYm94IEVuZ2luZS4uLlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vLy8gQ3JlYXRlIGEgY2FudmFzIGZvciBkcmF3aW5nLlxyXG4gICAgICAgICAgICAvL0hUTUxDYW52YXNFbGVtZW50IGNhbnZhcyA9IG5ldyBIVE1MQ2FudmFzRWxlbWVudCgpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBJbm5lckhUTUwgPSBcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYkdMISA6KFwiLFxyXG4gICAgICAgICAgICAvLyAgICBXaWR0aCA9IDY0MCxcclxuICAgICAgICAgICAgLy8gICAgSGVpZ2h0ID0gNDgwLFxyXG4gICAgICAgICAgICAvLyAgICBJZCA9IFwiSnVpY2Vib3hcIixcclxuICAgICAgICAgICAgLy8gICAgSGlkZGVuID0gZmFsc2VcclxuICAgICAgICAgICAgLy99O1xyXG5cclxuICAgICAgICAgICAgLy8vLyBBZGQgdGhlIGNhbnZhcyB0byB0aGUgZG9jdW1lbnQuXHJcbiAgICAgICAgICAgIC8vRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChjYW52YXMpO1xyXG5cclxuICAgICAgICAgICAgLy9fZW5naW5lID0gbmV3IEp1aWNlYm94RW5naW5lKGNhbnZhcyk7XHJcbiAgICAgICAgICAgIC8vUmVzb3VyY2VNYW5hZ2VyIG1hbmFnZXIgPSBuZXcgUmVzb3VyY2VNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIC8vX2VuZ2luZS5SZWdpc3RlckxvYWRlcnMobWFuYWdlcik7XHJcblxyXG4gICAgICAgICAgICAvLy8vIFRlc3Qgc2NlbmUuXHJcbiAgICAgICAgICAgIC8vX2VuZ2luZS5DdXJyZW50U2NlbmUgPSBuZXcgU2NlbmUobWFuYWdlcik7XHJcbiAgICAgICAgICAgIC8vR2FtZU9iamVjdCBtYXAgPSBfZW5naW5lLkN1cnJlbnRTY2VuZS5BZGRHYW1lT2JqZWN0KFwiTWFwXCIpO1xyXG4gICAgICAgICAgICAvL1RpbGVNYXAgdE1hcCA9IG1hcC5BZGRDb21wb25lbnQ8VGlsZU1hcD4oKTtcclxuICAgICAgICAgICAgLy90TWFwLlNwcml0ZXMgPSBtYW5hZ2VyLkxvYWQoXCJUZXh0dXJlcy9SUEdUaWxlbWFwU3ByaXRlcy5wbmdcIikgYXMgVGV4dHVyZTJEO1xyXG4gICAgICAgICAgICAvL3RNYXAuTWFwID0gbWFuYWdlci5Mb2FkKFwiVGV4dHVyZXMvUlBHVGlsZW1hcERhdGEucG5nXCIpIGFzIFRleHR1cmUyRDtcclxuICAgICAgICAgICAgLy90TWFwLlRpbGVTaXplID0gMTYuMGY7XHJcblxyXG4gICAgICAgICAgICAvL2ludCBwaXhlbFNpemUgPSA0O1xyXG5cclxuICAgICAgICAgICAgLy9HYW1lT2JqZWN0IGNhbSA9IF9lbmdpbmUuQ3VycmVudFNjZW5lLkFkZEdhbWVPYmplY3QoXCJDYW1lcmFcIik7XHJcbiAgICAgICAgICAgIC8vQ2FtZXJhIGNhbWVyYSA9IGNhbS5BZGRDb21wb25lbnQ8Q2FtZXJhPigpO1xyXG4gICAgICAgICAgICAvL2NhbWVyYUNvbXAgPSBjYW1lcmE7XHJcbiAgICAgICAgICAgIC8vY2FtZXJhLlRhcmdldCA9IG5ldyBSZW5kZXJUYXJnZXQoY2FudmFzLldpZHRoIC8gcGl4ZWxTaXplLCBjYW52YXMuSGVpZ2h0IC8gcGl4ZWxTaXplKTtcclxuICAgICAgICAgICAgLy9jYW1lcmEuUGl4ZWxTaXplID0gcGl4ZWxTaXplO1xyXG4gICAgICAgICAgICAvL2NhbWVyYS5DbGVhckNvbG9yID0gbmV3IENvbG9yMzIoMTQuMGYgLyAyNTUuMGYsIDk0LjBmIC8gMjU1LjBmLCAyNDEuMGYgLyAyNTUuMGYsIDEuMGYpO1xyXG4gICAgICAgICAgICAvL2NhbWVyYS5BZGRFZmZlY3QobmV3IEdyYXlTY2FsZShtYW5hZ2VyKSk7XHJcblxyXG4gICAgICAgICAgICAvL29iamVjdHMgPSBuZXcgTGlzdDxHYW1lT2JqZWN0PigpO1xyXG5cclxuICAgICAgICAgICAgLy9HYW1lT2JqZWN0IG9iaiA9IF9lbmdpbmUuQ3VycmVudFNjZW5lLkFkZEdhbWVPYmplY3QoXCJTcHJpdGUgcGxheWVyXCIpO1xyXG4gICAgICAgICAgICAvL29iai5HZXRDb21wb25lbnQ8VHJhbnNmb3JtPigpLlBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMzIsIDMyLCAxLjBmKTtcclxuICAgICAgICAgICAgLy9vYmouR2V0Q29tcG9uZW50PFRyYW5zZm9ybT4oKS5TY2FsZSA9IG5ldyBWZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgICAgICAvL1Nwcml0ZSBzcHJpdGUgPSBvYmouQWRkQ29tcG9uZW50PFNwcml0ZT4oKTtcclxuICAgICAgICAgICAgLy9zcHJpdGUuVGV4dHVyZSA9IG1hbmFnZXIuTG9hZChcIlRleHR1cmVzL0h1bnRlclJ1blJpZ2h0LnBuZ1wiKSBhcyBUZXh0dXJlMkQ7XHJcbiAgICAgICAgICAgIC8vc3ByaXRlLk9mZnNldCA9IG5ldyBWZWN0b3IyKDAsIDgpO1xyXG4gICAgICAgICAgICAvL0NvbGxpZGVyIGMgPSBvYmouQWRkQ29tcG9uZW50PENvbGxpZGVyPigpO1xyXG4gICAgICAgICAgICAvL2MuQUFCQiA9IG5ldyBSZWN0YW5nbGUoNCwgMCwgOCwgOCk7XHJcblxyXG4gICAgICAgICAgICAvL29iamVjdHMuQWRkKG9iaik7XHJcblxyXG4gICAgICAgICAgICAvL21hbmFnZXIuTG9hZDxUZXh0dXJlMkQ+KFwiVGV4dHVyZXMvSHVudGVyUnVuUmlnaHQucG5nXCIpO1xyXG4gICAgICAgICAgICAvL21hbmFnZXIuTG9hZDxUZXh0dXJlMkQ+KFwiVGV4dHVyZXMvSHVudGVyUnVuTGVmdC5wbmdcIik7XHJcbiAgICAgICAgICAgIC8vbWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oXCJUZXh0dXJlcy9odW50ZXJJZGxlLnBuZ1wiKTtcclxuXHJcbiAgICAgICAgICAgIC8vb2JqID0gX2VuZ2luZS5DdXJyZW50U2NlbmUuQWRkR2FtZU9iamVjdChcIlNwcml0ZSBwbGF5ZXJcIik7XHJcbiAgICAgICAgICAgIC8vb2JqLkdldENvbXBvbmVudDxUcmFuc2Zvcm0+KCkuUG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAxLjBmKTtcclxuICAgICAgICAgICAgLy9vYmouR2V0Q29tcG9uZW50PFRyYW5zZm9ybT4oKS5TY2FsZSA9IG5ldyBWZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgICAgICAvL29iai5BZGRDb21wb25lbnQ8SnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuVGV4dD4oKS5EaXNwbGF5VGV4dCA9IFwid29vc2hcIjtcclxuICAgICAgICAgICAgLy9zcHJpdGUgPSBvYmouQWRkQ29tcG9uZW50PFNwcml0ZT4oKTtcclxuICAgICAgICAgICAgLy9zcHJpdGUuVGV4dHVyZSA9IG1hbmFnZXIuTG9hZChcIlRleHR1cmVzL1N3b3JkLnBuZ1wiKSBhcyBUZXh0dXJlMkQ7XHJcblxyXG4gICAgICAgICAgICAvL29iamVjdHMuQWRkKG9iaik7XHJcblxyXG4gICAgICAgICAgICAvL29iaiA9IF9lbmdpbmUuQ3VycmVudFNjZW5lLkFkZEdhbWVPYmplY3QoXCJCdWlsZGluZyAxXCIpO1xyXG4gICAgICAgICAgICAvL2J1aWxkaW5nID0gb2JqO1xyXG4gICAgICAgICAgICAvL29iai5HZXRDb21wb25lbnQ8VHJhbnNmb3JtPigpLlBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMTIwLjBmLCAxMjguMGYsIDIuMGYpO1xyXG4gICAgICAgICAgICAvL29iai5HZXRDb21wb25lbnQ8VHJhbnNmb3JtPigpLlNjYWxlID0gbmV3IFZlY3RvcjMoMSwgMSwgMSk7XHJcbiAgICAgICAgICAgIC8vYyA9IG9iai5BZGRDb21wb25lbnQ8Q29sbGlkZXI+KCk7XHJcbiAgICAgICAgICAgIC8vYy5BQUJCID0gbmV3IFJlY3RhbmdsZSgtMjIsIDAsIDQ0LCAyOCk7XHJcbiAgICAgICAgICAgIC8vc3ByaXRlID0gb2JqLkFkZENvbXBvbmVudDxTcHJpdGU+KCk7XHJcbiAgICAgICAgICAgIC8vc3ByaXRlLlRleHR1cmUgPSBtYW5hZ2VyLkxvYWQoXCJUZXh0dXJlcy9Mb290QnVpbGRpbmcucG5nXCIpIGFzIFRleHR1cmUyRDtcclxuICAgICAgICAgICAgLy9zcHJpdGUuT2Zmc2V0ID0gbmV3IFZlY3RvcjIoMCwgMTYpO1xyXG5cclxuICAgICAgICAgICAgLy9vYmogPSBfZW5naW5lLkN1cnJlbnRTY2VuZS5BZGRHYW1lT2JqZWN0KFwiQnVpbGRpbmcgMlwiKTtcclxuICAgICAgICAgICAgLy9vYmouR2V0Q29tcG9uZW50PFRyYW5zZm9ybT4oKS5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDQyLjBmLCAzMi4wZiwgMi4wZik7XHJcbiAgICAgICAgICAgIC8vb2JqLkdldENvbXBvbmVudDxUcmFuc2Zvcm0+KCkuU2NhbGUgPSBuZXcgVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICAgICAgLy9jID0gb2JqLkFkZENvbXBvbmVudDxDb2xsaWRlcj4oKTtcclxuICAgICAgICAgICAgLy9jLkFBQkIgPSBuZXcgUmVjdGFuZ2xlKC0yMiwgMCwgNDQsIDI4KTtcclxuICAgICAgICAgICAgLy9zcHJpdGUgPSBvYmouQWRkQ29tcG9uZW50PFNwcml0ZT4oKTtcclxuICAgICAgICAgICAgLy9zcHJpdGUuVGV4dHVyZSA9IG1hbmFnZXIuTG9hZChcIlRleHR1cmVzL0xvb3RCdWlsZGluZy5wbmdcIikgYXMgVGV4dHVyZTJEO1xyXG4gICAgICAgICAgICAvL3Nwcml0ZS5PZmZzZXQgPSBuZXcgVmVjdG9yMigwLCAxNik7XHJcblxyXG4gICAgICAgICAgICAvL0ZvbnQgZm9udCA9IG1hbmFnZXIuTG9hZChcIkFyaWFsLmJmZlwiKSBhcyBGb250O1xyXG4gICAgICAgICAgICAvL19tYW5hZ2VyID0gbWFuYWdlcjtcclxuXHJcbiAgICAgICAgICAgIC8vb2JqID0gX2VuZ2luZS5DdXJyZW50U2NlbmUuQWRkR2FtZU9iamVjdChcIkZvbnRcIik7XHJcbiAgICAgICAgICAgIC8vb2JqLkdldENvbXBvbmVudDxUcmFuc2Zvcm0+KCkuUG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAzLjBmKTtcclxuICAgICAgICAgICAgLy9vYmouR2V0Q29tcG9uZW50PFRyYW5zZm9ybT4oKS5TY2FsZSA9IG5ldyBWZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgICAgICAvL3RleHQgPSBvYmouQWRkQ29tcG9uZW50PEp1aWNlQm94RW5naW5lLkdyYXBoaWNzLlRleHQ+KCk7XHJcblxyXG4gICAgICAgICAgICAvL29iamVjdHMuQWRkKG9iaik7XHJcblxyXG4gICAgICAgICAgICAvL0p1aWNlQm94RW5naW5lLkdyYXBoaWNzLkRlYnVnZ2luZy5EZWJ1Z1JlbmRlcmVyLkluc3RhbmNlLkRyYXdMaW5lKG5ldyBWZWN0b3IyKDAsIDApLCBuZXcgVmVjdG9yMig1LCA1KSwgbmV3IENvbG9yMzIoMS4wZiwgMC4wZiwgMC4wZiwgMS4wZikpO1xyXG5cclxuICAgICAgICAgICAgLy9VcGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vc3RhdGljIExpc3Q8R2FtZU9iamVjdD4gb2JqZWN0cztcclxuXHJcbiAgICAgICAgLy9zdGF0aWMgVmVjdG9yMiBwb3NpdGlvbiA9IG5ldyBWZWN0b3IyKDAsIDApO1xyXG4gICAgICAgIC8vc3RhdGljIFJlc291cmNlTWFuYWdlciBfbWFuYWdlcjtcclxuICAgICAgICAvL3N0YXRpYyBpbnQgZnJhbWU7XHJcbiAgICAgICAgLy9zdGF0aWMgaW50IG1heEZyYW1lcztcclxuICAgICAgICAvL3N0YXRpYyBKdWljZUJveEVuZ2luZS5HcmFwaGljcy5UZXh0IHRleHQ7XHJcbiAgICAgICAgLy9zdGF0aWMgYm9vbCBzbGFzaGluZztcclxuICAgICAgICAvL3N0YXRpYyBHYW1lT2JqZWN0IGJ1aWxkaW5nO1xyXG4gICAgICAgIC8vc3RhdGljIENhbWVyYSBjYW1lcmFDb21wO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoaXMgaXMgYXQgdGhlIHN0YXJ0IG9mIGV2ZXJ5IGZyYW1lLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy9zdGF0aWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIGlmIChzbGFzaGluZylcclxuICAgICAgICAvLyAgICAgICAgb2JqZWN0c1sxXS5HZXRDb21wb25lbnQ8VHJhbnNmb3JtPigpLlJvdGF0aW9uID0gbmV3IFZlY3RvcjMob2JqZWN0c1sxXS5HZXRDb21wb25lbnQ8VHJhbnNmb3JtPigpLlJvdGF0aW9uLlgsIG9iamVjdHNbMV0uR2V0Q29tcG9uZW50PFRyYW5zZm9ybT4oKS5Sb3RhdGlvbi5ZLCBvYmplY3RzWzFdLkdldENvbXBvbmVudDxUcmFuc2Zvcm0+KCkuUm90YXRpb24uWiArIEp1aWNlQm94RW5naW5lLlV0aWwuVGltZS5EZWx0YVRpbWUgKiAxNik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgIGlmIChvYmplY3RzWzFdLkdldENvbXBvbmVudDxUcmFuc2Zvcm0+KCkuUm90YXRpb24uWiA+IDMuMTQxNWYgJiYgc2xhc2hpbmcpXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICBvYmplY3RzWzFdLkdldENvbXBvbmVudDxUcmFuc2Zvcm0+KCkuUm90YXRpb24gPSBuZXcgVmVjdG9yMygwLCAwLCAwKTtcclxuICAgICAgICAvLyAgICAgICAgc2xhc2hpbmcgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgIC8vICAgIGlmIChJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwicVwiKSlcclxuICAgICAgICAvLyAgICAgICAgc2xhc2hpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyAgICBvYmplY3RzWzFdLkdldENvbXBvbmVudDxTcHJpdGU+KCkuRW5hYmxlZCA9IHNsYXNoaW5nO1xyXG5cclxuICAgICAgICAvLyAgICBUcmFuc2Zvcm0gdHJhbnMgPSBvYmplY3RzWzBdLkdldENvbXBvbmVudDxUcmFuc2Zvcm0+KCk7XHJcbiAgICAgICAgLy8gICAgU3ByaXRlIHNwcml0ZSA9IG9iamVjdHNbMF0uR2V0Q29tcG9uZW50PFNwcml0ZT4oKTtcclxuXHJcbiAgICAgICAgLy8gICAgVmVjdG9yMiBkaXIgPSBuZXcgVmVjdG9yMigpO1xyXG5cclxuICAgICAgICAvLyAgICBpZiAoSW5wdXRNYW5hZ2VyLkluc3RhbmNlLklzS2V5RG93bihcImFcIikpXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICBwb3NpdGlvbi5YIC09IEp1aWNlQm94RW5naW5lLlV0aWwuVGltZS5EZWx0YVRpbWUgKiA0MjtcclxuICAgICAgICAvLyAgICAgICAgZGlyLlggPSAtNDIgKiBUaW1lLkRlbHRhVGltZTtcclxuICAgICAgICAvLyAgICAgICAgc3ByaXRlLlRleHR1cmUgPSBfbWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oXCJUZXh0dXJlcy9IdW50ZXJSdW5MZWZ0LnBuZ1wiKTtcclxuICAgICAgICAvLyAgICAgICAgbWF4RnJhbWVzID0gNDtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgZWxzZSBpZiAoSW5wdXRNYW5hZ2VyLkluc3RhbmNlLklzS2V5RG93bihcImRcIikpXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICBwb3NpdGlvbi5YIC09IEp1aWNlQm94RW5naW5lLlV0aWwuVGltZS5EZWx0YVRpbWUgKiAtNDI7XHJcbiAgICAgICAgLy8gICAgICAgIGRpci5YID0gNDIgKiBUaW1lLkRlbHRhVGltZTtcclxuICAgICAgICAvLyAgICAgICAgc3ByaXRlLlRleHR1cmUgPSBfbWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oXCJUZXh0dXJlcy9IdW50ZXJSdW5SaWdodC5wbmdcIik7XHJcbiAgICAgICAgLy8gICAgICAgIG1heEZyYW1lcyA9IDQ7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICAgIGVsc2UgaWYgKElucHV0TWFuYWdlci5JbnN0YW5jZS5Jc0tleURvd24oXCJ3XCIpKVxyXG4gICAgICAgIC8vICAgIHtcclxuICAgICAgICAvLyAgICAgICAgcG9zaXRpb24uWSAtPSBKdWljZUJveEVuZ2luZS5VdGlsLlRpbWUuRGVsdGFUaW1lICogLTQyO1xyXG4gICAgICAgIC8vICAgICAgICBkaXIuWSA9IDQyICogVGltZS5EZWx0YVRpbWU7XHJcbiAgICAgICAgLy8gICAgICAgIHNwcml0ZS5UZXh0dXJlID0gX21hbmFnZXIuTG9hZDxUZXh0dXJlMkQ+KFwiVGV4dHVyZXMvSHVudGVyUnVuUmlnaHQucG5nXCIpO1xyXG4gICAgICAgIC8vICAgICAgICBtYXhGcmFtZXMgPSA0O1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICBlbHNlIGlmIChJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwic1wiKSlcclxuICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgLy8gICAgICAgIHBvc2l0aW9uLlkgLT0gSnVpY2VCb3hFbmdpbmUuVXRpbC5UaW1lLkRlbHRhVGltZSAqIDQyO1xyXG4gICAgICAgIC8vICAgICAgICBkaXIuWSA9IC00MiAqIFRpbWUuRGVsdGFUaW1lO1xyXG4gICAgICAgIC8vICAgICAgICBzcHJpdGUuVGV4dHVyZSA9IF9tYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihcIlRleHR1cmVzL0h1bnRlclJ1bkxlZnQucG5nXCIpO1xyXG4gICAgICAgIC8vICAgICAgICBtYXhGcmFtZXMgPSA0O1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICBlbHNlXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICBzcHJpdGUuVGV4dHVyZSA9IF9tYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihcIlRleHR1cmVzL2h1bnRlcklkbGUucG5nXCIpO1xyXG4gICAgICAgIC8vICAgICAgICBtYXhGcmFtZXMgPSA1O1xyXG4gICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgdGV4dC5EaXNwbGF5VGV4dCA9IFwiKFwiICsgb2JqZWN0c1swXS5UcmFuc2Zvcm0uUG9zaXRpb24uWCArIFwiLCBcIiArIG9iamVjdHNbMF0uVHJhbnNmb3JtLlBvc2l0aW9uLlkgKyBcIilcIjtcclxuICAgICAgICAvLyAgICB0ZXh0LlBhcmVudC5UcmFuc2Zvcm0uUm90YXRpb24gPSBuZXcgVmVjdG9yMygwLjBmLCAwLjBmLCB0ZXh0LlBhcmVudC5UcmFuc2Zvcm0uUm90YXRpb24uWiArIDAuMDFmKTtcclxuXHJcbiAgICAgICAgLy8gICAgZnJhbWUgPSAoaW50KShKdWljZUJveEVuZ2luZS5VdGlsLlRpbWUuVG90YWxTZWNvbmRzICogMTApICUgbWF4RnJhbWVzO1xyXG5cclxuICAgICAgICAvLyAgICBzcHJpdGUuU291cmNlUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZShmcmFtZSAqIDE2LCAwLCAxNiwgMTYpO1xyXG5cclxuICAgICAgICAvLyAgICB0cmFucy5QYXJlbnQuR2V0Q29tcG9uZW50PENvbGxpZGVyPigpLlRyYW5zbGF0ZShkaXIpO1xyXG5cclxuICAgICAgICAvLyAgICBvYmplY3RzWzFdLkdldENvbXBvbmVudDxUcmFuc2Zvcm0+KCkuUG9zaXRpb24gPSB0cmFucy5Qb3NpdGlvbjtcclxuXHJcbiAgICAgICAgLy8gICAgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuRGVidWdnaW5nLkRlYnVnUmVuZGVyZXIuSW5zdGFuY2UuRHJhd0xpbmUobmV3IFZlY3RvcjIoYnVpbGRpbmcuVHJhbnNmb3JtLlBvc2l0aW9uLlgsIGJ1aWxkaW5nLlRyYW5zZm9ybS5Qb3NpdGlvbi5ZKSwgY2FtZXJhQ29tcC5TY3JlZW5Qb2ludFRvV29ybGQoSW5wdXRNYW5hZ2VyLkluc3RhbmNlLk1vdXNlUG9zaXRpb24pLCBuZXcgQ29sb3IzMigxLjBmLCAwLjBmLCAwLjBmLCAxLjBmKSk7XHJcbiAgICAgICAgLy8gICAgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuRGVidWdnaW5nLkRlYnVnUmVuZGVyZXIuSW5zdGFuY2UuRHJhd0xpbmUobmV3IFZlY3RvcjIodHJhbnMuUG9zaXRpb24uWCwgdHJhbnMuUG9zaXRpb24uWSksIGNhbWVyYUNvbXAuU2NyZWVuUG9pbnRUb1dvcmxkKElucHV0TWFuYWdlci5JbnN0YW5jZS5Nb3VzZVBvc2l0aW9uKSwgbmV3IENvbG9yMzIoMS4wZiwgMC4wZiwgMC4wZiwgMS4wZikpO1xyXG4gICAgICAgIC8vICAgIF9lbmdpbmUuVXBkYXRlKCk7XHJcblxyXG4gICAgICAgIC8vICAgIEJyaWRnZS5IdG1sNS5XaW5kb3cuUmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IFVwZGF0ZSgpKTtcclxuICAgICAgICAvL31cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3RyYXdcclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgQXV0b1VwZ3JhZGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIG5hbWU7XHJcbiAgICAgICAgcHVibGljIGxvbmcgY29zdDtcclxuICAgICAgICBwdWJsaWMgaW50IGNyb3A7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBdXRvVXBncmFkZShzdHJpbmcgbmFtZSwgbG9uZyBjb3N0LCBpbnQgY3JvcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29zdCA9IGNvc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuY3JvcCA9IGNyb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEp1aWNlQm94RW5naW5lLlNjZW5lO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3RyYXdcclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgQ3JvcERhdGFcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIG5hbWU7XHJcbiAgICAgICAgcHVibGljIGludCBpbmRleDtcclxuICAgICAgICBwdWJsaWMgbG9uZyBpbml0aWFsQ29zdDtcclxuICAgICAgICBwdWJsaWMgbG9uZyB2YWx1ZTtcclxuICAgICAgICBwdWJsaWMgaW50IG1heEdyb3d0aDtcclxuICAgICAgICBwdWJsaWMgaW50IGdyb3dUaW1lO1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgc3ByaXRlO1xyXG5cclxuICAgICAgICBwdWJsaWMgQ3JvcERhdGEoaW50IGluZGV4LCBzdHJpbmcgbmFtZSwgbG9uZyBjb3N0LCBsb25nIHZhbHVlLCBpbnQgbWF4R3Jvd3RoLCBpbnQgZ3Jvd1RpbWUsIHN0cmluZyBzcHJpdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbENvc3QgPSBjb3N0O1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWF4R3Jvd3RoID0gbWF4R3Jvd3RoO1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcclxuICAgICAgICAgICAgdGhpcy5ncm93VGltZSA9IGdyb3dUaW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBKdWljZUJveEVuZ2luZS5HcmFwaGljcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuTWF0aDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuU2NlbmU7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlV0aWw7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTdHJhd1xyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBGYXJtXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIENyb3BEYXRhWyxdIGNyb3BzO1xyXG4gICAgICAgIHB1YmxpYyBpbnRbLF0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgcHJpdmF0ZSBHYW1lT2JqZWN0WyxdIF9vYmplY3RzO1xyXG5cclxuICAgICAgICBwcml2YXRlIFNjZW5lIF9zY2VuZTtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBPZmZzZXQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgd2lkdGg7XHJcbiAgICAgICAgcHVibGljIGludCBoZWlnaHQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBncm93UmF0ZTtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIGNoYW5nZSBpcyBldmVyeSBncm93cmF0ZSAoaW4gc2Vjb25kcykgMS9ncm93Q2hhbmdlLiAxID0gZ3VhcmFudGVlZCBldmVyeSBjcm9wIGdyb3dzLiAyID0gaGFsZiwgMyA9IHRoaXJkLCBldGMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgaW50IGdyb3djaGFuY2U7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBfcHJldlVwZGF0ZTtcclxuXHJcbiAgICAgICAgcHVibGljIEZhcm0oU2NlbmUgc2NlbmUsIFZlY3RvcjIgb2Zmc2V0LCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICAgICAgX29iamVjdHMgPSBuZXcgR2FtZU9iamVjdFt4LCB5XTtcclxuICAgICAgICAgICAgY3JvcHMgPSBuZXcgQ3JvcERhdGFbeCwgeV07XHJcbiAgICAgICAgICAgIHByb2dyZXNzID0gbmV3IGludFt4LCB5XTtcclxuICAgICAgICAgICAgT2Zmc2V0ID0gb2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgd2lkdGggPSB4O1xyXG4gICAgICAgICAgICBoZWlnaHQgPSB5O1xyXG5cclxuICAgICAgICAgICAgZ3Jvd1JhdGUgPSAxLjBmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTG9hZEZhcm0oTGlzdDxDcm9wRGF0YT4gY3JvcERhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IoaW50IGkgPSAwOyBpIDwgd2lkdGg7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yKGludCBqID0gMDsgaiA8IGhlaWdodDsgKytqKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBjcm9wID0gR2FtZVNhdmVyLkdldEludE9yRGVmYXVsdChcImNyb3BzKFwiICsgaSArIFwiLFwiICsgaiArIFwiKVwiLCAtMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzW2ksIGpdID0gR2FtZVNhdmVyLkdldEludE9yRGVmYXVsdChcInByb2dyZXNzKFwiICsgaSArIFwiLFwiICsgaiArIFwiKVwiLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjcm9wID4gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQbGFudENyb3AoaSwgaiwgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Z2xvYmFsOjpTdHJhdy5Dcm9wRGF0YT4oY3JvcERhdGEsY3JvcCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1tpLCBqXSA9IEdhbWVTYXZlci5HZXRJbnRPckRlZmF1bHQoXCJwcm9ncmVzcyhcIiArIGkgKyBcIixcIiArIGogKyBcIilcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVwZGF0ZUNyb3AoaSwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQbGFudENyb3AoaW50IHgsIGludCB5LCBDcm9wRGF0YSBjcm9wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3JvcHNbeCwgeV0gPSBjcm9wO1xyXG4gICAgICAgICAgICBpZiAoX29iamVjdHNbeCwgeV0gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZU9iamVjdCBvYmogPSBfc2NlbmUuQWRkR2FtZU9iamVjdChcIkNyb3BcIiArIHggKyBcIixcIiArIHkpO1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiBwb3MgPSBPZmZzZXQgKyBuZXcgVmVjdG9yMigxNiAqIHggKyA4LjBmLCAxNiAqIHkpO1xyXG4gICAgICAgICAgICAgICAgb2JqLlRyYW5zZm9ybS5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IzKHBvcy5YLCBwb3MuWSwgMC4wZik7XHJcbiAgICAgICAgICAgICAgICBTcHJpdGUgb2JqU3ByaXRlID0gb2JqLkFkZENvbXBvbmVudDxTcHJpdGU+KCk7XHJcbiAgICAgICAgICAgICAgICBvYmpTcHJpdGUuVGV4dHVyZSA9IF9zY2VuZS5SZXNvdXJjZU1hbmFnZXIuTG9hZDxUZXh0dXJlMkQ+KGNyb3Auc3ByaXRlKTtcclxuICAgICAgICAgICAgICAgIG9ialNwcml0ZS5PZmZzZXQgPSBuZXcgVmVjdG9yMigwLjBmLCA4LjBmKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfb2JqZWN0c1t4LCB5XSA9IG9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfb2JqZWN0c1t4LCB5XS5FbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgX29iamVjdHNbeCwgeV0uR2V0Q29tcG9uZW50PFNwcml0ZT4oKS5UZXh0dXJlID0gX3NjZW5lLlJlc291cmNlTWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oY3JvcC5zcHJpdGUpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc1t4LCB5XSA9IDE7XHJcbiAgICAgICAgICAgIFVwZGF0ZUNyb3AoeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlQ3JvcChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgZnJhbWUgPSBwcm9ncmVzc1t4LCB5XTtcclxuICAgICAgICAgICAgX29iamVjdHNbeCwgeV0uR2V0Q29tcG9uZW50PFNwcml0ZT4oKS5Tb3VyY2VSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKGZyYW1lICogMTYsIDAsIDE2LCAxNik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBHZXRUaWxlKG91dCBpbnQgeCwgb3V0IGludCB5LCBWZWN0b3IyIHBvc2l0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gLT0gT2Zmc2V0O1xyXG4gICAgICAgICAgICB4ID0gKGludCkocG9zaXRpb24uWCAvIDE2LjBmKTtcclxuICAgICAgICAgICAgeSA9IChpbnQpKHBvc2l0aW9uLlkgLyAxNi4wZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQ3JvcERhdGEgR2V0Q3JvcChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSB3aWR0aCB8fCB5ID49IGhlaWdodClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNyb3BzW3gsIHldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2F2ZUZhcm0oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGludCBpID0gMDsgaSA8IHdpZHRoOyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcihpbnQgaiA9IDA7IGogPCBoZWlnaHQ7ICsrailcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDcm9wRGF0YSBkYXRhID0gY3JvcHNbaSwgal07XHJcbiAgICAgICAgICAgICAgICAgICAgQnJpZGdlLkh0bWw1LldpbmRvdy5Mb2NhbFN0b3JhZ2UuU2V0SXRlbShcImNyb3BzKFwiICsgaSArIFwiLFwiICsgaiArIFwiKVwiLCBkYXRhICE9IG51bGwgPyBkYXRhLmluZGV4IDogLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIEJyaWRnZS5IdG1sNS5XaW5kb3cuTG9jYWxTdG9yYWdlLlNldEl0ZW0oXCJwcm9ncmVzcyhcIiArIGkgKyBcIixcIiArIGogKyBcIilcIiwgcHJvZ3Jlc3NbaSwgal0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQ3JvcERhdGEgSGFydmVzdFRpbGUoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gb3V0IG9mIHJhbmdlLlxyXG4gICAgICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSB3aWR0aCB8fCB5ID49IGhlaWdodClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gbm90aGluZyB0byBoYXJ2ZXN0LlxyXG4gICAgICAgICAgICBpZiAoY3JvcHNbeCwgeV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHByb2dyZXNzW3gsIHldID09IGNyb3BzW3gsIHldLm1heEdyb3d0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ3JvcERhdGEgcmV0dmFsID0gY3JvcHNbeCwgeV07XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1t4LCB5XSA9IDE7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVDcm9wKHgsIHkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXR2YWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKExpc3Q8VmFsdWVVcGdyYWRlPiB1cGdyYWRlcywgaW50IGN1clVwZ3JhZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoVGltZS5Ub3RhbFNlY29uZHMgLSBfcHJldlVwZGF0ZSA+IGdyb3dSYXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfcHJldlVwZGF0ZSA9IFRpbWUuVG90YWxTZWNvbmRzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdyb3cgcmFuZG9tIHBsYW50cy5cclxuICAgICAgICAgICAgICAgIFJhbmRvbSByYW5kb20gPSBuZXcgUmFuZG9tKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHdpZHRoOyArK2kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBoZWlnaHQ7ICsrailcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjcm9wc1tpLCBqXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnQgdXBncmFkZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVXBncmFkZSA+IGNyb3BzW2ksIGpdLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZ3JhZGUgPSB1cGdyYWRlc1tjcm9wc1tpLCBqXS5pbmRleF0ubmV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmRvbS5OZXh0KDAsIGdyb3djaGFuY2UgKiAoY3JvcHNbaSwgal0uZ3Jvd1RpbWUgLyB1cGdyYWRlKSkgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NbaSwgal0gPCBjcm9wc1tpLCBqXS5tYXhHcm93dGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1tpLCBqXSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVcGRhdGVDcm9wKGksIGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBKdWljZUJveEVuZ2luZS5HcmFwaGljcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuSW5wdXQ7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLk1hdGg7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuU2NlbmU7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlV0aWw7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTdHJhd1xyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBGYXJtZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgR2FtZU9iamVjdCBmYXJtZXJPYmplY3Q7XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBtb3ZlU3BlZWQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgQ29sbGlkZXIgX2NvbGxpZGVyO1xyXG4gICAgICAgIHByaXZhdGUgU3ByaXRlIF9zcHJpdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBTY2VuZSBfc2NlbmU7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBfbG9va3NSaWdodDtcclxuXHJcbiAgICAgICAgcHVibGljIEZhcm1lcihTY2VuZSBzY2VuZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZhcm1lck9iamVjdCA9IHNjZW5lLkFkZEdhbWVPYmplY3QoXCJGYXJtZXJcIik7XHJcbiAgICAgICAgICAgIGZhcm1lck9iamVjdC5UcmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgVmVjdG9yMyhcclxuICAgICAgICAgICAgICAgIEdhbWVTYXZlci5HZXRGbG9hdE9yRGVmYXVsdChcInBsYXllclhcIiwgMjU2LjBmKSxcclxuICAgICAgICAgICAgICAgIEdhbWVTYXZlci5HZXRGbG9hdE9yRGVmYXVsdChcInBsYXllcllcIiwgMzEwLjBmKSwgXHJcbiAgICAgICAgICAgICAgICAwLjBmKTtcclxuXHJcbiAgICAgICAgICAgIF9zcHJpdGUgPSBmYXJtZXJPYmplY3QuQWRkQ29tcG9uZW50PFNwcml0ZT4oKTtcclxuICAgICAgICAgICAgX3Nwcml0ZS5UZXh0dXJlID0gc2NlbmUuUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihcIlRleHR1cmVzL0Zhcm1lcklkbGUucG5nXCIpO1xyXG4gICAgICAgICAgICBfc3ByaXRlLk9mZnNldCA9IG5ldyBWZWN0b3IyKDAuMGYsIDguMGYpO1xyXG5cclxuICAgICAgICAgICAgX2NvbGxpZGVyID0gZmFybWVyT2JqZWN0LkFkZENvbXBvbmVudDxDb2xsaWRlcj4oKTtcclxuICAgICAgICAgICAgX2NvbGxpZGVyLkFBQkIgPSBuZXcgUmVjdGFuZ2xlKDQsIDAsIDgsIDgpO1xyXG5cclxuICAgICAgICAgICAgX3NjZW5lID0gc2NlbmU7XHJcblxyXG4gICAgICAgICAgICBfbG9va3NSaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgIG1vdmVTcGVlZCA9IDUwLjBmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwiRXNjYXBlXCIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBRdWl0PyBwYXVzZT9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBWZWN0b3IyIGRpcmVjdGlvbiA9IG5ldyBWZWN0b3IyKCk7XHJcbiAgICAgICAgICAgIGlmIChJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwiQXJyb3dMZWZ0XCIpIHx8IElucHV0TWFuYWdlci5JbnN0YW5jZS5Jc0tleURvd24oXCJMZWZ0XCIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gKz0gbmV3IFZlY3RvcjIoLTEuMGYsIDAuMGYpO1xyXG4gICAgICAgICAgICAgICAgX2xvb2tzUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoSW5wdXRNYW5hZ2VyLkluc3RhbmNlLklzS2V5RG93bihcIkFycm93UmlnaHRcIikgfHwgSW5wdXRNYW5hZ2VyLkluc3RhbmNlLklzS2V5RG93bihcIlJpZ2h0XCIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gKz0gbmV3IFZlY3RvcjIoIDEuMGYsIDAuMGYpO1xyXG4gICAgICAgICAgICAgICAgX2xvb2tzUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwiQXJyb3dEb3duXCIpIHx8IElucHV0TWFuYWdlci5JbnN0YW5jZS5Jc0tleURvd24oXCJEb3duXCIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gKz0gbmV3IFZlY3RvcjIoIDAuMGYsLTEuMGYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwiQXJyb3dVcFwiKSB8fCBJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwiVXBcIikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiArPSBuZXcgVmVjdG9yMiggMC4wZiwgMS4wZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9kaXJlY3Rpb24uTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIF9jb2xsaWRlci5UcmFuc2xhdGUoZGlyZWN0aW9uICogbW92ZVNwZWVkICogVGltZS5EZWx0YVRpbWUpO1xyXG5cclxuICAgICAgICAgICAgaWYoZGlyZWN0aW9uLlggPT0gMC4wZiAmJiBkaXJlY3Rpb24uWSA9PSAwLjBmKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfc3ByaXRlLlRleHR1cmUgPSBfc2NlbmUuUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihcIlRleHR1cmVzL0Zhcm1lcklkbGUucG5nXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlkbGUgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgICAgICBpbnQgZnJhbWUgPSAoaW50KShKdWljZUJveEVuZ2luZS5VdGlsLlRpbWUuVG90YWxTZWNvbmRzICogMTApICUgOTtcclxuICAgICAgICAgICAgICAgIF9zcHJpdGUuU291cmNlUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZShmcmFtZSAqIDE2LCAwLCAxNiwgMTYpO1xyXG4gICAgICAgICAgICAgICAgZmFybWVyT2JqZWN0LlRyYW5zZm9ybS5TY2FsZSA9IG5ldyBWZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3Nwcml0ZS5UZXh0dXJlID0gX3NjZW5lLlJlc291cmNlTWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oXCJUZXh0dXJlcy9GYXJtZXJSdW4ucG5nXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJ1biBhbmltYXRpb25cclxuICAgICAgICAgICAgICAgIGludCBmcmFtZSA9IChpbnQpKEp1aWNlQm94RW5naW5lLlV0aWwuVGltZS5Ub3RhbFNlY29uZHMgKiAxMCkgJSA4O1xyXG4gICAgICAgICAgICAgICAgX3Nwcml0ZS5Tb3VyY2VSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKGZyYW1lICogMTYsIDAsIDE2LCAxNik7XHJcbiAgICAgICAgICAgICAgICBmYXJtZXJPYmplY3QuVHJhbnNmb3JtLlNjYWxlID0gbmV3IFZlY3RvcjMoX2xvb2tzUmlnaHQgPyAxIDogLTEsIDEsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmU7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLk1hdGg7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLkdyYXBoaWNzLkRlYnVnZ2luZztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuU2NlbmU7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLklucHV0O1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5HcmFwaGljcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIFN0cmF3XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lIDogSnVpY2Vib3hFbmdpbmVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgR2FtZSgpXHJcbiAgICAgICAgICAgIDogYmFzZSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFJ1bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlJ1bigpO1xyXG5cclxuICAgICAgICAgICAgRG9jdW1lbnQuVGl0bGUgPSBcIkx1ZHVtIERhcmUgNDFcIjtcclxuXHJcbiAgICAgICAgICAgIFNwbGFzaFNjZW5lIHNwbGFzaFNjcmVlbiA9IG5ldyBTcGxhc2hTY2VuZShfZGVmYXVsdE1hbmFnZXIpO1xyXG4gICAgICAgICAgICBTZXRTY2VuZShzcGxhc2hTY3JlZW4pO1xyXG5cclxuICAgICAgICAgICAgc3BsYXNoU2NyZWVuLlNwbGFzaFNjcmVlbih0aGlzLCA1LjBmLCBuZXcgTWFpblNjZW5lKF9kZWZhdWx0TWFuYWdlciwgdGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFN0cmF3XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgR2FtZVNhdmVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBsb25nIEdldExvbmdPckRlZmF1bHQoc3RyaW5nIG5hbWUsIGxvbmcgZGVmYXVsdFZhbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxvbmcgcmV0dmFsID0gZGVmYXVsdFZhbDtcclxuXHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsb25nLlRyeVBhcnNlKFdpbmRvdy5Mb2NhbFN0b3JhZ2VbbmFtZV0uVG9TdHJpbmcoKSwgb3V0IHJldHZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggeyB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBHZXRGbG9hdE9yRGVmYXVsdChzdHJpbmcgbmFtZSwgZmxvYXQgZGVmYXVsdFZhbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHJldHZhbCA9IGRlZmF1bHRWYWw7XHJcblxyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmxvYXQuVHJ5UGFyc2UoV2luZG93LkxvY2FsU3RvcmFnZVtuYW1lXS5Ub1N0cmluZygpLCBvdXQgcmV0dmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCB7IH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXR2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBHZXRJbnRPckRlZmF1bHQoc3RyaW5nIG5hbWUsIGludCBkZWZhdWx0VmFsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHJldHZhbCA9IGRlZmF1bHRWYWw7XHJcblxyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50LlRyeVBhcnNlKFdpbmRvdy5Mb2NhbFN0b3JhZ2VbbmFtZV0uVG9TdHJpbmcoKSwgb3V0IHJldHZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggeyB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dmFsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBKdWljZUJveEVuZ2luZS5HcmFwaGljcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuRGVidWdnaW5nO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5JbnB1dDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuTWF0aDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5TY2VuZTtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuU291bmQ7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlV0aWw7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIFN0cmF3XHJcbntcclxuICAgIGNsYXNzIEdhbWVTY2VuZSA6IFNjZW5lXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEZhcm1lciBmYXJtZXI7XHJcbiAgICAgICAgcHVibGljIEZhcm0gZmFybTtcclxuICAgICAgICBwdWJsaWMgTGlzdDxDcm9wRGF0YT4gY3JvcHM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgY3VycmVudENyb3A7XHJcblxyXG4gICAgICAgIHB1YmxpYyBHYW1lT2JqZWN0IG1vbmV5VGV4dDtcclxuICAgICAgICBwdWJsaWMgR2FtZU9iamVjdCBtb25leVRleHRCYWNrO1xyXG4gICAgICAgIHB1YmxpYyBHYW1lT2JqZWN0IHRvb2xUaXA7XHJcbiAgICAgICAgcHVibGljIEdhbWVPYmplY3QgdG9vbFRpcEJhY2s7XHJcbiAgICAgICAgcHVibGljIEdhbWVPYmplY3QgYm9yZGVycztcclxuICAgICAgICBwcml2YXRlIEdhbWVPYmplY3QgX2JhY2tncm91bmQ7XHJcbiAgICAgICAgcHJpdmF0ZSBHYW1lT2JqZWN0W10gX3BsYW50SWNvbnM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBsb25nIG1vbmV5O1xyXG4gICAgICAgIHB1YmxpYyBsb25nIGhpZ2hlc3RNb25leTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2Jlc3RDcm9wO1xyXG5cclxuICAgICAgICBwcml2YXRlIEdhbWVPYmplY3RbXSBfcGxhbnRzUG9vbDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0W10gX3RpbWVIYXJ2ZXN0ZWQ7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX3BsYW50UG9vbFNpemU7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2N1clBsYW50O1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBfcmVsZWFzZWRCdXR0b247XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBfdG9vbGJhcmhlaWdodDtcclxuICAgICAgICBwcml2YXRlIGludCBfY3VyRGlzY29ydmVyZWRDcm9wO1xyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgc2hvd1Rvb2xiYXIgPSAwLjBmO1xyXG5cclxuICAgICAgICBwdWJsaWMgR2FtZU9iamVjdCBfaGVscEJ0bjtcclxuXHJcbiAgICAgICAgcHVibGljIFNwcml0ZSBfd2l6YXJkO1xyXG4gICAgICAgIHB1YmxpYyBTcHJpdGUgX3NhbGVzRHVkZTtcclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgbXV0ZWQ7XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIF9tdXRlZFByZXNzZWQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgR2FtZU9iamVjdCBfYXV0b21hZ2ljVXBncmFkZTtcclxuICAgICAgICBwcml2YXRlIExpc3Q8QXV0b1VwZ3JhZGU+IF9hdXRvVXBncmFkZXM7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2N1ckF1dG9Qb3NYO1xyXG4gICAgICAgIHByaXZhdGUgaW50IF9jdXJBdXRvUG9zWTtcclxuICAgICAgICBwcml2YXRlIGludCBfY3VyQXV0b1VwZ3JhZGU7XHJcblxyXG4gICAgICAgIHByaXZhdGUgR2FtZU9iamVjdCBfdmFsdWVVcGdyYWRlO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxWYWx1ZVVwZ3JhZGU+IF92YWx1ZVVwZ3JhZGVzO1xyXG4gICAgICAgIHByaXZhdGUgaW50IF9jdXJWYWx1ZVVwZ3JhZGU7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgX3NhdmVJbnRlcnZhbDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IF9zYXZlUHJvZ3Jlc3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBHYW1lU2NlbmUoUmVzb3VyY2VNYW5hZ2VyIG1hbmFnZXIpXHJcbiAgICAgICAgICAgIDogYmFzZShtYW5hZ2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3JvcHMgPSBuZXcgTGlzdDxDcm9wRGF0YT4oKTtcclxuICAgICAgICAgICAgY3JvcHMuQWRkKG5ldyBDcm9wRGF0YSgwLCBcIm9uaW9uXCIsIDUsIDIsIDUsIDEsIFwiVGV4dHVyZXMvT25pb24ucG5nXCIpKTtcclxuICAgICAgICAgICAgY3JvcHMuQWRkKG5ldyBDcm9wRGF0YSgxLCBcImNhcnJvdFwiLCAyNSwgNiwgNSwgMiwgXCJUZXh0dXJlcy9DYXJyb3QucG5nXCIpKTtcclxuICAgICAgICAgICAgY3JvcHMuQWRkKG5ldyBDcm9wRGF0YSgyLCBcInBvdGF0b1wiLCAxMDAsIDI1LCA1LCAzLCBcIlRleHR1cmVzL1BvdGF0by5wbmdcIikpO1xyXG4gICAgICAgICAgICBjcm9wcy5BZGQobmV3IENyb3BEYXRhKDMsIFwiYmVldHJvb3RcIiwgNTAwLCAxMjAsIDUsIDQsIFwiVGV4dHVyZXMvQmVldFJvb3QucG5nXCIpKTtcclxuICAgICAgICAgICAgY3JvcHMuQWRkKG5ldyBDcm9wRGF0YSg0LCBcInB1bXBraW5cIiwgIDI1MDAsIDc1MCwgNSwgNSwgXCJUZXh0dXJlcy9QdW1wa2luLnBuZ1wiKSk7XHJcbiAgICAgICAgICAgIGNyb3BzLkFkZChuZXcgQ3JvcERhdGEoNSwgXCJ3aGVhdFwiLCAgIDEwMDAwLCAyNTAwLCA1LCA2LCBcIlRleHR1cmVzL1doZWF0LnBuZ1wiKSk7XHJcbiAgICAgICAgICAgIGNyb3BzLkFkZChuZXcgQ3JvcERhdGEoNiwgXCJjb3JuXCIsICAgMTAwMDAwLCAyNTAwMCwgNSwgNywgXCJUZXh0dXJlcy9Db3JuLnBuZ1wiKSk7XHJcbiAgICAgICAgICAgIGNyb3BzLkFkZChuZXcgQ3JvcERhdGEoNywgXCJtYW5hXCIsICAxMDAwMDAwLCAyNTAwMDAsIDUsIDgsIFwiVGV4dHVyZXMvTWFuYS5wbmdcIikpO1xyXG4gICAgICAgICAgICBjcm9wcy5BZGQobmV3IENyb3BEYXRhKDgsIFwiZ29sZFwiLCAxMDAwMDAwMCwgMjUwMDAwMCwgNSwgOSwgXCJUZXh0dXJlcy9Hb2xkLnBuZ1wiKSk7XHJcblxyXG4gICAgICAgICAgICBfYXV0b1VwZ3JhZGVzID0gbmV3IExpc3Q8QXV0b1VwZ3JhZGU+KCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY3JvcHMuQ291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2F1dG9VcGdyYWRlcy5BZGQobmV3IEF1dG9VcGdyYWRlKFwiYXV0by1cIiArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGdsb2JhbDo6U3RyYXcuQ3JvcERhdGE+KGNyb3BzLGkpLm5hbWUsIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGdsb2JhbDo6U3RyYXcuQ3JvcERhdGE+KGNyb3BzLGkpLmluaXRpYWxDb3N0ICogMjAsIGkpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX3ZhbHVlVXBncmFkZXMgPSBuZXcgTGlzdDxWYWx1ZVVwZ3JhZGU+KCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY3JvcHMuQ291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ3JvcERhdGEgZGF0YSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGdsb2JhbDo6U3RyYXcuQ3JvcERhdGE+KGNyb3BzLGkpO1xyXG4gICAgICAgICAgICAgICAgX3ZhbHVlVXBncmFkZXMuQWRkKG5ldyBWYWx1ZVVwZ3JhZGUoZGF0YS5pbml0aWFsQ29zdCAqIDQwLCBpLCAyKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9jdXJBdXRvVXBncmFkZSA9IEdhbWVTYXZlci5HZXRJbnRPckRlZmF1bHQoXCJjdXJBdXRvVXBncmFkZVwiLCAwKTtcclxuICAgICAgICAgICAgX2N1clZhbHVlVXBncmFkZSA9IEdhbWVTYXZlci5HZXRJbnRPckRlZmF1bHQoXCJjdXJWYWx1ZVVwZ3JhZGVcIiwgMCk7XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50Q3JvcCA9IEdhbWVTYXZlci5HZXRJbnRPckRlZmF1bHQoXCJjdXJQbGFudFwiLCAwKTtcclxuICAgICAgICAgICAgX2Jlc3RDcm9wID0gR2FtZVNhdmVyLkdldEludE9yRGVmYXVsdChcImJlc3RDcm9wXCIsIDApO1xyXG4gICAgICAgICAgICBfY3VyQXV0b1Bvc1ggPSAwO1xyXG4gICAgICAgICAgICBfY3VyQXV0b1Bvc1kgPSAwO1xyXG5cclxuICAgICAgICAgICAgX3BsYW50UG9vbFNpemUgPSAxNTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgZXZlcnkgMTAgc2Vjb25kcy5cclxuICAgICAgICAgICAgX3NhdmVJbnRlcnZhbCA9IDEwLjBmO1xyXG5cclxuICAgICAgICAgICAgbW9uZXkgPSBHYW1lU2F2ZXIuR2V0TG9uZ09yRGVmYXVsdChcIm1vbmV5XCIsIDIwKTtcclxuICAgICAgICAgICAgaGlnaGVzdE1vbmV5ID0gR2FtZVNhdmVyLkdldExvbmdPckRlZmF1bHQoXCJoaWdoZXN0TW9uZXlcIiwgbW9uZXkpO1xyXG5cclxuICAgICAgICAgICAgbXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFN0YXJ0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuU3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIERlZmF1bHRDYW1lcmEuQ2xlYXJDb2xvciA9IG5ldyBDb2xvcjMyKDY1LCAxMDUsIDIyNSwgMjU1KTtcclxuICAgICAgICAgICAgRGVmYXVsdENhbWVyYS5QYXJlbnQuVHJhbnNmb3JtLlBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMjU2LjBmLCAzMTAuMGYsIDAuMGYpO1xyXG4gICAgICAgICAgICBEZWZhdWx0Q2FtZXJhLlBpeGVsUGVyZmVjdCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBMb2FkIGluIGEgdGlsZW1hcC5cclxuICAgICAgICAgICAgR2FtZU9iamVjdCB0aWxlbWFwT2JqID0gQWRkR2FtZU9iamVjdChcIlRpbGVtYXBcIik7XHJcbiAgICAgICAgICAgIFRpbGVNYXAgbWFwID0gdGlsZW1hcE9iai5BZGRDb21wb25lbnQ8VGlsZU1hcD4oKTtcclxuICAgICAgICAgICAgbWFwLkRlcHRoID0gMTAwLjBmO1xyXG4gICAgICAgICAgICBtYXAuTWFwID0gUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihcIlRleHR1cmVzL0Zhcm1NYXBEYXRhLnBuZ1wiKTtcclxuICAgICAgICAgICAgbWFwLlNwcml0ZXMgPSBSZXNvdXJjZU1hbmFnZXIuTG9hZDxUZXh0dXJlMkQ+KFwiVGV4dHVyZXMvRmFybU1hcFNwcml0ZXMucG5nXCIpO1xyXG5cclxuICAgICAgICAgICAgX2F1dG9tYWdpY1VwZ3JhZGUgPSBBZGRHYW1lT2JqZWN0KFwiQXV0byBVcGdyYWRlXCIpO1xyXG4gICAgICAgICAgICBfYXV0b21hZ2ljVXBncmFkZS5UcmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgVmVjdG9yMygyMTYuMGYsIDM1MC4wZiwgMC4wZik7XHJcbiAgICAgICAgICAgIFNwcml0ZSB1cGdyYWRlU3ByaXRlID0gX2F1dG9tYWdpY1VwZ3JhZGUuQWRkQ29tcG9uZW50PFNwcml0ZT4oKTtcclxuICAgICAgICAgICAgdXBncmFkZVNwcml0ZS5UZXh0dXJlID0gUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihcIlRleHR1cmVzL0xpZ2h0bmluZy5wbmdcIik7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVTcHJpdGUuT2Zmc2V0ID0gbmV3IFZlY3RvcjIoMC4wZiwgOC4wZik7XHJcblxyXG4gICAgICAgICAgICBHYW1lT2JqZWN0IHdpemFyZCA9IEFkZEdhbWVPYmplY3QoXCJXaXphcmRcIik7XHJcbiAgICAgICAgICAgIHdpemFyZC5UcmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgVmVjdG9yMygyMDAuMGYsIDM1MC4wZiwgMC4wZik7XHJcbiAgICAgICAgICAgIF93aXphcmQgPSB3aXphcmQuQWRkQ29tcG9uZW50PFNwcml0ZT4oKTtcclxuICAgICAgICAgICAgX3dpemFyZC5UZXh0dXJlID0gUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihcIlRleHR1cmVzL1dpemFyZC5wbmdcIik7XHJcbiAgICAgICAgICAgIF93aXphcmQuU291cmNlUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgwLCAwLCAxNiwgMTYpO1xyXG5cclxuICAgICAgICAgICAgR2FtZU9iamVjdCBzYWxlc0R1ZGUgPSBBZGRHYW1lT2JqZWN0KFwiU2FsZXMgRHVkZVwiKTtcclxuICAgICAgICAgICAgc2FsZXNEdWRlLlRyYW5zZm9ybS5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDMxNC4wZiwgMzUwLjBmLCAwLjBmKTtcclxuICAgICAgICAgICAgX3NhbGVzRHVkZSA9IHNhbGVzRHVkZS5BZGRDb21wb25lbnQ8U3ByaXRlPigpO1xyXG4gICAgICAgICAgICBfc2FsZXNEdWRlLlRleHR1cmUgPSBSZXNvdXJjZU1hbmFnZXIuTG9hZDxUZXh0dXJlMkQ+KFwiVGV4dHVyZXMvU2FsZXNtYW4ucG5nXCIpO1xyXG4gICAgICAgICAgICBfc2FsZXNEdWRlLlNvdXJjZVJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgMTYsIDE2KTtcclxuXHJcbiAgICAgICAgICAgIF92YWx1ZVVwZ3JhZGUgPSBBZGRHYW1lT2JqZWN0KFwiVmFsdWUgVXBncmFkZVwiKTtcclxuICAgICAgICAgICAgX3ZhbHVlVXBncmFkZS5UcmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgVmVjdG9yMygyOTguMGYsIDM1MC4wZiwgMC4wZik7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVTcHJpdGUgPSBfdmFsdWVVcGdyYWRlLkFkZENvbXBvbmVudDxTcHJpdGU+KCk7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVTcHJpdGUuVGV4dHVyZSA9IFJlc291cmNlTWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oXCJUZXh0dXJlcy9Db2luLnBuZ1wiKTtcclxuICAgICAgICAgICAgdXBncmFkZVNwcml0ZS5PZmZzZXQgPSBuZXcgVmVjdG9yMigwLjBmLCA4LjBmKTtcclxuXHJcbiAgICAgICAgICAgIG1vbmV5VGV4dCA9IEFkZEdhbWVPYmplY3QoXCJNb25leSBUZXh0XCIpO1xyXG4gICAgICAgICAgICBKdWljZUJveEVuZ2luZS5HcmFwaGljcy5UZXh0IHR4dCA9IG1vbmV5VGV4dC5BZGRDb21wb25lbnQ8SnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuVGV4dD4oKTtcclxuICAgICAgICAgICAgdHh0LkRpc3BsYXlUZXh0ID0gXCIkXCIgKyBtb25leS5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB0eHQuQWxpZ25tZW50ID0gVGV4dEFsaWdubWVudC5DZW50ZXI7XHJcblxyXG4gICAgICAgICAgICBtb25leVRleHRCYWNrID0gQWRkR2FtZU9iamVjdChcIk1vbmV5IFRleHRcIik7XHJcbiAgICAgICAgICAgIHR4dCA9IG1vbmV5VGV4dEJhY2suQWRkQ29tcG9uZW50PEp1aWNlQm94RW5naW5lLkdyYXBoaWNzLlRleHQ+KCk7XHJcbiAgICAgICAgICAgIHR4dC5EaXNwbGF5VGV4dCA9IFwiJFwiICsgbW9uZXkuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdHh0LkFsaWdubWVudCA9IFRleHRBbGlnbm1lbnQuQ2VudGVyO1xyXG4gICAgICAgICAgICB0eHQuQ29sb3IgPSBuZXcgQ29sb3IzMigwLjBmLCAwLjBmLCAwLjBmLCAxLjBmKTtcclxuXHJcbiAgICAgICAgICAgIF9iYWNrZ3JvdW5kID0gQWRkR2FtZU9iamVjdChcIkJhY2tncm91bmRcIik7XHJcbiAgICAgICAgICAgIFNwcml0ZSBiZ1Nwcml0ZSA9IF9iYWNrZ3JvdW5kLkFkZENvbXBvbmVudDxTcHJpdGU+KCk7XHJcbiAgICAgICAgICAgIGJnU3ByaXRlLlVzZVBvc2l0aW9uRm9yRGVwdGggPSBmYWxzZTtcclxuICAgICAgICAgICAgYmdTcHJpdGUuVGV4dHVyZSA9IFJlc291cmNlTWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oXCJUZXh0dXJlcy9CYWNrZ3JvdW5kLnBuZ1wiKTtcclxuICAgICAgICAgICAgX2JhY2tncm91bmQuVHJhbnNmb3JtLlNjYWxlID0gbmV3IFZlY3RvcjMoMTAuMGYsIDEuMGYsIDEuMGYpO1xyXG5cclxuICAgICAgICAgICAgX2hlbHBCdG4gPSBBZGRHYW1lT2JqZWN0KFwiSGVscCBCdG5cIik7XHJcbiAgICAgICAgICAgIFNwcml0ZSBoZWxwU3ByaXRlID0gX2hlbHBCdG4uQWRkQ29tcG9uZW50PFNwcml0ZT4oKTtcclxuICAgICAgICAgICAgaGVscFNwcml0ZS5UZXh0dXJlID0gUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihcIlRleHR1cmVzL0J1dHRvbnMucG5nXCIpO1xyXG4gICAgICAgICAgICBoZWxwU3ByaXRlLlNvdXJjZVJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoMCwgMzIsIDMyLCAxNik7XHJcbiAgICAgICAgICAgIGhlbHBTcHJpdGUuT2Zmc2V0ID0gbmV3IFZlY3RvcjIoMC4wZiwgMjQuMGYpO1xyXG5cclxuICAgICAgICAgICAgX3BsYW50SWNvbnMgPSBuZXcgR2FtZU9iamVjdFtjcm9wcy5Db3VudF07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgY3JvcHMuQ291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3BsYW50SWNvbnNbaV0gPSBBZGRHYW1lT2JqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBTcHJpdGUgcGlTcHJpdGUgPSBfcGxhbnRJY29uc1tpXS5BZGRDb21wb25lbnQ8U3ByaXRlPigpO1xyXG4gICAgICAgICAgICAgICAgcGlTcHJpdGUuVXNlUG9zaXRpb25Gb3JEZXB0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcGlTcHJpdGUuVGV4dHVyZSA9IFJlc291cmNlTWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oY3JvcHNbaV0uc3ByaXRlKTtcclxuICAgICAgICAgICAgICAgIHBpU3ByaXRlLlNvdXJjZVJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgMTYsIDE2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVXBkYXRlSWNvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIHRvb2xUaXAgPSBBZGRHYW1lT2JqZWN0KFwiVG9vbHRpcFwiKTtcclxuICAgICAgICAgICAgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuVGV4dCB0b29sdGlwRWxlbWVudCA9IHRvb2xUaXAuQWRkQ29tcG9uZW50PEp1aWNlQm94RW5naW5lLkdyYXBoaWNzLlRleHQ+KCk7XHJcbiAgICAgICAgICAgIHRvb2x0aXBFbGVtZW50LkRpc3BsYXlUZXh0ID0gXCI8ej4gdG8gcGxhbnQgXCIgKyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkVsZW1lbnRBdDxnbG9iYWw6OlN0cmF3LkNyb3BEYXRhPihjcm9wcywwKS5uYW1lO1xyXG4gICAgICAgICAgICBiZ1Nwcml0ZS5Vc2VQb3NpdGlvbkZvckRlcHRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRvb2x0aXBFbGVtZW50LkFsaWdubWVudCA9IFRleHRBbGlnbm1lbnQuQ2VudGVyO1xyXG5cclxuICAgICAgICAgICAgdG9vbFRpcEJhY2sgPSBBZGRHYW1lT2JqZWN0KFwiVG9vbHRpcCBiYWNrXCIpO1xyXG4gICAgICAgICAgICB0b29sdGlwRWxlbWVudCA9IHRvb2xUaXBCYWNrLkFkZENvbXBvbmVudDxKdWljZUJveEVuZ2luZS5HcmFwaGljcy5UZXh0PigpO1xyXG4gICAgICAgICAgICB0b29sdGlwRWxlbWVudC5EaXNwbGF5VGV4dCA9IFwiPHo+IHRvIHBsYW50IFwiICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Z2xvYmFsOjpTdHJhdy5Dcm9wRGF0YT4oY3JvcHMsMCkubmFtZTtcclxuICAgICAgICAgICAgYmdTcHJpdGUuVXNlUG9zaXRpb25Gb3JEZXB0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0b29sdGlwRWxlbWVudC5BbGlnbm1lbnQgPSBUZXh0QWxpZ25tZW50LkNlbnRlcjtcclxuICAgICAgICAgICAgdG9vbHRpcEVsZW1lbnQuQ29sb3IgPSBuZXcgQ29sb3IzMigwLjBmLCAwLjBmLCAwLjBmLCAxLjBmKTtcclxuXHJcbiAgICAgICAgICAgIGJvcmRlcnMgPSBBZGRHYW1lT2JqZWN0KFwiQm9yZGVyc1wiKTtcclxuICAgICAgICAgICAgYm9yZGVycy5BZGRDb21wb25lbnQ8Q29sbGlkZXI+KCkuQUFCQiA9IG5ldyBSZWN0YW5nbGUoMTkyLCAxOTIgLSAxNiwgMTI4LCAxNik7XHJcbiAgICAgICAgICAgIGJvcmRlcnMuQWRkQ29tcG9uZW50PENvbGxpZGVyPigpLkFBQkIgPSBuZXcgUmVjdGFuZ2xlKDE5MiAtIDE2LCAxOTIgLSAxNiwgMTYsIDI1Nik7XHJcbiAgICAgICAgICAgIGJvcmRlcnMuQWRkQ29tcG9uZW50PENvbGxpZGVyPigpLkFBQkIgPSBuZXcgUmVjdGFuZ2xlKDE5MiArIDEyOCwgMTkyIC0gMTYsIDE2LCAyNTYpO1xyXG4gICAgICAgICAgICBib3JkZXJzLkFkZENvbXBvbmVudDxDb2xsaWRlcj4oKS5BQUJCID0gbmV3IFJlY3RhbmdsZSgxOTIsIDE5MiArIDI1NiAtIDY0LCAxMjgsIDE2KTtcclxuICAgICAgICAgICAgYm9yZGVycy5BZGRDb21wb25lbnQ8Q29sbGlkZXI+KCkuQUFCQiA9IG5ldyBSZWN0YW5nbGUoMTkyLCAzMjYsIDQ4LCA4KTtcclxuICAgICAgICAgICAgYm9yZGVycy5BZGRDb21wb25lbnQ8Q29sbGlkZXI+KCkuQUFCQiA9IG5ldyBSZWN0YW5nbGUoMjcyLCAzMjYsIDQ4LCA4KTtcclxuXHJcbiAgICAgICAgICAgIGZhcm1lciA9IG5ldyBGYXJtZXIodGhpcyk7XHJcbiAgICAgICAgICAgIGZhcm0gPSBuZXcgRmFybSh0aGlzLCBuZXcgVmVjdG9yMigxOTIuMGYsIDE5Mi4wZiksIDgsIDgpO1xyXG4gICAgICAgICAgICBmYXJtLkxvYWRGYXJtKGNyb3BzKTtcclxuICAgICAgICAgICAgZmFybS5ncm93Y2hhbmNlID0gMjtcclxuXHJcbiAgICAgICAgICAgIF9wbGFudHNQb29sID0gbmV3IEdhbWVPYmplY3RbX3BsYW50UG9vbFNpemVdO1xyXG4gICAgICAgICAgICBfdGltZUhhcnZlc3RlZCA9IG5ldyBmbG9hdFtfcGxhbnRQb29sU2l6ZV07XHJcblxyXG4gICAgICAgICAgICBfY3VyRGlzY29ydmVyZWRDcm9wID0gR2FtZVNhdmVyLkdldEludE9yRGVmYXVsdChcImJlc3REaXNjb3ZlcmVkXCIsIDApO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBfcGxhbnRQb29sU2l6ZTsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfcGxhbnRzUG9vbFtpXSA9IEFkZEdhbWVPYmplY3QoKTtcclxuICAgICAgICAgICAgICAgIFNwcml0ZSBwbGFudFNwcml0ZSA9IF9wbGFudHNQb29sW2ldLkFkZENvbXBvbmVudDxTcHJpdGU+KCk7XHJcbiAgICAgICAgICAgICAgICBfcGxhbnRzUG9vbFtpXS5FbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBfcGxhbnRzUG9vbFtpXS5BZGRDb21wb25lbnQ8QXVkaW9Tb3VyY2U+KCkuU2V0QXVkaW8oUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8U291bmQ+KFwicGxvcC53YXZcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBCcmlkZ2UuSHRtbDUuV2luZG93Lk9uQmVmb3JlVW5sb2FkID0gKHgpID0+IFNhdmVHYW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2hvd1Rvb2xiYXIgLT0gVGltZS5EZWx0YVRpbWU7XHJcblxyXG4gICAgICAgICAgICBmYXJtZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGZhcm0uVXBkYXRlKF92YWx1ZVVwZ3JhZGVzLCBfY3VyVmFsdWVVcGdyYWRlKTtcclxuXHJcbiAgICAgICAgICAgIF9zYXZlUHJvZ3Jlc3MgLT0gVGltZS5EZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIGlmIChfc2F2ZVByb2dyZXNzIDw9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNhdmVHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICBfc2F2ZVByb2dyZXNzID0gX3NhdmVJbnRlcnZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50IHg7XHJcbiAgICAgICAgICAgIGludCB5O1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMyBmYXJtZXJQb3MgPSBmYXJtZXIuZmFybWVyT2JqZWN0LlRyYW5zZm9ybS5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgZmFybS5HZXRUaWxlKG91dCB4LCBvdXQgeSwgbmV3IFZlY3RvcjIoZmFybWVyUG9zLlgsIGZhcm1lclBvcy5ZKSk7XHJcblxyXG4gICAgICAgICAgICBfaGVscEJ0bi5UcmFuc2Zvcm0uUG9zaXRpb24gPSBmYXJtZXJQb3M7XHJcblxyXG4gICAgICAgICAgICBEZWZhdWx0Q2FtZXJhLlBhcmVudC5UcmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgVmVjdG9yMygyNTYuMGYsIGZhcm1lclBvcy5ZLCAwLjBmKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwibVwiKSAmJiAhX211dGVkUHJlc3NlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXV0ZWQgPSAhbXV0ZWQ7XHJcbiAgICAgICAgICAgICAgICBfbXV0ZWRQcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKCFJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwibVwiKSlcclxuICAgICAgICAgICAgICAgIF9tdXRlZFByZXNzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1vdmUgdG9vbGJhci5cclxuICAgICAgICAgICAgaWYgKHNob3dUb29sYmFyIDwgMC4wZilcclxuICAgICAgICAgICAgICAgIF90b29sYmFyaGVpZ2h0IC09IFRpbWUuRGVsdGFUaW1lICogNjAuMGY7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIF90b29sYmFyaGVpZ2h0ICs9IFRpbWUuRGVsdGFUaW1lICogNjAuMGY7XHJcblxyXG4gICAgICAgICAgICAvLyBjbGFtcCB0b29sYmFyLlxyXG4gICAgICAgICAgICBpZiAoX3Rvb2xiYXJoZWlnaHQgPCAtMTYuMGYpXHJcbiAgICAgICAgICAgICAgICBfdG9vbGJhcmhlaWdodCA9IC0xNi4wZjtcclxuICAgICAgICAgICAgaWYgKF90b29sYmFyaGVpZ2h0ID4gMC4wZilcclxuICAgICAgICAgICAgICAgIF90b29sYmFyaGVpZ2h0ID0gMC4wZjtcclxuXHJcbiAgICAgICAgICAgIC8vIEhhY2t5IFVJLlxyXG4gICAgICAgICAgICBtb25leVRleHQuVHJhbnNmb3JtLlBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMjU2LjBmLCBmYXJtZXJQb3MuWSArIDMyLjBmLCA4MC4wZik7XHJcbiAgICAgICAgICAgIG1vbmV5VGV4dEJhY2suVHJhbnNmb3JtLlBvc2l0aW9uID0gbW9uZXlUZXh0LlRyYW5zZm9ybS5Qb3NpdGlvbiArIG5ldyBWZWN0b3IzKDEuMGYsIC0xLjBmLCAtMS4wZik7XHJcbiAgICAgICAgICAgIHRvb2xUaXAuVHJhbnNmb3JtLlBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMjU2LjBmLCBfdG9vbGJhcmhlaWdodCArIGZhcm1lclBvcy5ZIC0gNDYuMGYsIDgwLjBmKTtcclxuICAgICAgICAgICAgdG9vbFRpcEJhY2suVHJhbnNmb3JtLlBvc2l0aW9uID0gdG9vbFRpcC5UcmFuc2Zvcm0uUG9zaXRpb24gKyBuZXcgVmVjdG9yMygxLjBmLCAtMS4wZiwgLTEuMGYpO1xyXG4gICAgICAgICAgICBfYmFja2dyb3VuZC5UcmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgVmVjdG9yMygyNTYuMGYsIF90b29sYmFyaGVpZ2h0ICsgZmFybWVyUG9zLlkgLSA1Mi4wZiwgNDkuMGYpO1xyXG5cclxuICAgICAgICAgICAgLy8gd2l6YXJkICYgc2FsZXMgZHVkZVxyXG4gICAgICAgICAgICBpbnQgZnJhbWUgPSAoaW50KShKdWljZUJveEVuZ2luZS5VdGlsLlRpbWUuVG90YWxTZWNvbmRzICogOCkgJSA5O1xyXG4gICAgICAgICAgICBfd2l6YXJkLlNvdXJjZVJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoZnJhbWUgKiAxNiwgMCwgMTYsIDE2KTtcclxuXHJcbiAgICAgICAgICAgIGZyYW1lID0gKGludCkoSnVpY2VCb3hFbmdpbmUuVXRpbC5UaW1lLlRvdGFsU2Vjb25kcyAqIDkpICUgODtcclxuICAgICAgICAgICAgX3NhbGVzRHVkZS5Tb3VyY2VSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKGZyYW1lICogMTYsIDAsIDE2LCAxNik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNyb3BzLkNvdW50OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9wbGFudEljb25zW2ldLlRyYW5zZm9ybS5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDE4OC4wZiArIDE3ICogaSwgX3Rvb2xiYXJoZWlnaHQgKyBmYXJtZXJQb3MuWSAtIDUyLjBmLCA1MC4wZik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSGlnaGxpZ2h0IGN1cnJlbnQgY3JvcC5cclxuICAgICAgICAgICAgICAgIGlmIChpID09IGN1cnJlbnRDcm9wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IGN1clJvdCA9IF9wbGFudEljb25zW2ldLlRyYW5zZm9ybS5Sb3RhdGlvbi5aO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGFudEljb25zW2ldLlRyYW5zZm9ybS5Sb3RhdGlvbiA9IG5ldyBWZWN0b3IzKDAuMGYsIDAuMGYsIGN1clJvdCArIDIuMGYgKiBUaW1lLkRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BsYW50SWNvbnNbaV0uVHJhbnNmb3JtLlJvdGF0aW9uID0gbmV3IFZlY3RvcjMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVXBkYXRlRmFybWVkUGxhbnRzKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgcGxheWVyIGlzIGluc2lkZSB0aGUgZmFybS5cclxuICAgICAgICAgICAgaWYgKHggPj0gMCAmJiB4IDwgZmFybS53aWR0aCAmJiB5ID49IDAgJiYgeSA8IGZhcm0uaGVpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSW5wdXRNYW5hZ2VyLkluc3RhbmNlLklzS2V5RG93bihcInhcIikgJiYgX3JlbGVhc2VkQnV0dG9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZWxlYXNlZEJ1dHRvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dUb29sYmFyID0gNS4wZjtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q3JvcCA9IChjdXJyZW50Q3JvcCArIDEpICUgKF9iZXN0Q3JvcCArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIUlucHV0TWFuYWdlci5JbnN0YW5jZS5Jc0tleURvd24oXCJ4XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIF9yZWxlYXNlZEJ1dHRvbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGNyb3BzLlxyXG4gICAgICAgICAgICAgICAgQ3JvcERhdGEgZGF0YSA9IGZhcm0uSGFydmVzdFRpbGUoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhhcnZlc3RlZCBhIGNyb3AuXHJcbiAgICAgICAgICAgICAgICAgICAgSGFydmVzdENyb3AoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGZhcm0uR2V0Q3JvcCh4LCB5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBudWxsIHx8IGRhdGEuaW5kZXggIT0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Z2xvYmFsOjpTdHJhdy5Dcm9wRGF0YT4oY3JvcHMsY3VycmVudENyb3ApLmluZGV4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBsYW50IGNyb3AuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwiIFwiKSB8fCBJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwielwiKSkgJiYgbW9uZXkgPj0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Z2xvYmFsOjpTdHJhdy5Dcm9wRGF0YT4oY3JvcHMsY3VycmVudENyb3ApLmluaXRpYWxDb3N0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uZXkgLT0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Z2xvYmFsOjpTdHJhdy5Dcm9wRGF0YT4oY3JvcHMsY3VycmVudENyb3ApLmluaXRpYWxDb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXJtLlBsYW50Q3JvcCh4LCB5LCBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkVsZW1lbnRBdDxnbG9iYWw6OlN0cmF3LkNyb3BEYXRhPihjcm9wcyxjdXJyZW50Q3JvcCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25leVRleHQuR2V0Q29tcG9uZW50PEp1aWNlQm94RW5naW5lLkdyYXBoaWNzLlRleHQ+KCkuRGlzcGxheVRleHQgPSBcIiRcIiArIG1vbmV5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25leVRleHRCYWNrLkdldENvbXBvbmVudDxKdWljZUJveEVuZ2luZS5HcmFwaGljcy5UZXh0PigpLkRpc3BsYXlUZXh0ID0gXCIkXCIgKyBtb25leTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2F2ZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfY3VyQXV0b1VwZ3JhZGUgIT0gX2F1dG9VcGdyYWRlcy5Db3VudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2F1dG9tYWdpY1VwZ3JhZGUuVHJhbnNmb3JtLlJvdGF0aW9uID0gbmV3IFZlY3RvcjMoMC4wZiwgMC4wZiwgSnVpY2VCb3hFbmdpbmUuTWF0aC5NYXRoLlNpbihUaW1lLlRvdGFsU2Vjb25kcyAqIDMuMGYpICogMC41Zik7XHJcbiAgICAgICAgICAgICAgICBfYXV0b21hZ2ljVXBncmFkZS5UcmFuc2Zvcm0uU2NhbGUgPSBuZXcgVmVjdG9yMygxLjBmLCAxLjBmLCAxLjBmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBfYXV0b21hZ2ljVXBncmFkZS5FbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoX2N1clZhbHVlVXBncmFkZSAhPSBfdmFsdWVVcGdyYWRlcy5Db3VudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3ZhbHVlVXBncmFkZS5UcmFuc2Zvcm0uUm90YXRpb24gPSBuZXcgVmVjdG9yMygwLjBmLCAwLjBmLCBKdWljZUJveEVuZ2luZS5NYXRoLk1hdGguU2luKFRpbWUuVG90YWxTZWNvbmRzICogMy4wZikgKiAwLjVmKTtcclxuICAgICAgICAgICAgICAgIF92YWx1ZVVwZ3JhZGUuVHJhbnNmb3JtLlNjYWxlID0gbmV3IFZlY3RvcjMoMS4wZiwgMS4wZiwgMS4wZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgX3ZhbHVlVXBncmFkZS5FbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBKdWljZUJveEVuZ2luZS5HcmFwaGljcy5UZXh0IHRvb2x0aXBFbGVtZW50ID0gdG9vbFRpcC5HZXRDb21wb25lbnQ8SnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuVGV4dD4oKTtcclxuICAgICAgICAgICAgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuVGV4dCB0b29sdGlwRWxlbWVudGJhY2sgPSB0b29sVGlwQmFjay5HZXRDb21wb25lbnQ8SnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuVGV4dD4oKTtcclxuICAgICAgICAgICAgaWYgKGZhcm1lclBvcy5ZID4gMzIwLjBmKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaG93VG9vbGJhciA9IDAuMGY7XHJcbiAgICAgICAgICAgICAgICBfaGVscEJ0bi5HZXRDb21wb25lbnQ8U3ByaXRlPigpLlNvdXJjZVJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgMzIsIDE2KTtcclxuICAgICAgICAgICAgICAgIGlmIChmYXJtZXJQb3MuWCA8IDI1Ni4wZiAmJiBfY3VyQXV0b1VwZ3JhZGUgIT0gX2F1dG9VcGdyYWRlcy5Db3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBdXRvVXBncmFkZSB1cGdyYWRlID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Z2xvYmFsOjpTdHJhdy5BdXRvVXBncmFkZT4oX2F1dG9VcGdyYWRlcyxfY3VyQXV0b1VwZ3JhZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBFbGVtZW50LkRpc3BsYXlUZXh0ID0gdXBncmFkZS5uYW1lICsgXCIgJFwiICsgdXBncmFkZS5jb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBFbGVtZW50YmFjay5EaXNwbGF5VGV4dCA9IHVwZ3JhZGUubmFtZSArIFwiICRcIiArIHVwZ3JhZGUuY29zdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX2F1dG9tYWdpY1VwZ3JhZGUuVHJhbnNmb3JtLlNjYWxlID0gbmV3IFZlY3RvcjMoMS41ZiwgMS41ZiwgMS4wZik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwieFwiKSAmJiBfcmVsZWFzZWRCdXR0b24pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVsZWFzZWRCdXR0b24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbmV5ID49IF9hdXRvVXBncmFkZXNbX2N1ckF1dG9VcGdyYWRlXS5jb3N0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25leSAtPSBfYXV0b1VwZ3JhZGVzW19jdXJBdXRvVXBncmFkZV0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jdXJBdXRvVXBncmFkZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFJbnB1dE1hbmFnZXIuSW5zdGFuY2UuSXNLZXlEb3duKFwieFwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlbGVhc2VkQnV0dG9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoX2N1clZhbHVlVXBncmFkZSAhPSBfdmFsdWVVcGdyYWRlcy5Db3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZVVwZ3JhZGUgdXBncmFkZSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGdsb2JhbDo6U3RyYXcuVmFsdWVVcGdyYWRlPihfdmFsdWVVcGdyYWRlcyxfY3VyVmFsdWVVcGdyYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwRWxlbWVudC5EaXNwbGF5VGV4dCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGdsb2JhbDo6U3RyYXcuQ3JvcERhdGE+KGNyb3BzLHVwZ3JhZGUuY3JvcCkubmFtZSArIFwiKyAkXCIgKyB1cGdyYWRlLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcEVsZW1lbnRiYWNrLkRpc3BsYXlUZXh0ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Z2xvYmFsOjpTdHJhdy5Dcm9wRGF0YT4oY3JvcHMsdXBncmFkZS5jcm9wKS5uYW1lICsgXCIrICRcIiArIHVwZ3JhZGUuY29zdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3ZhbHVlVXBncmFkZS5UcmFuc2Zvcm0uU2NhbGUgPSBuZXcgVmVjdG9yMygxLjVmLCAxLjVmLCAxLjBmKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElucHV0TWFuYWdlci5JbnN0YW5jZS5Jc0tleURvd24oXCJ4XCIpICYmIF9yZWxlYXNlZEJ1dHRvbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWxlYXNlZEJ1dHRvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9uZXkgPj0gX3ZhbHVlVXBncmFkZXNbX2N1clZhbHVlVXBncmFkZV0uY29zdClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uZXkgLT0gX3ZhbHVlVXBncmFkZXNbX2N1clZhbHVlVXBncmFkZV0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jdXJWYWx1ZVVwZ3JhZGUrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghSW5wdXRNYW5hZ2VyLkluc3RhbmNlLklzS2V5RG93bihcInhcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWxlYXNlZEJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwRWxlbWVudC5EaXNwbGF5VGV4dCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRWxlbWVudEF0PGdsb2JhbDo6U3RyYXcuQ3JvcERhdGE+KGNyb3BzLGN1cnJlbnRDcm9wKS5uYW1lICsgXCIgJFwiICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Z2xvYmFsOjpTdHJhdy5Dcm9wRGF0YT4oY3JvcHMsY3VycmVudENyb3ApLmluaXRpYWxDb3N0O1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcEVsZW1lbnRiYWNrLkRpc3BsYXlUZXh0ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FbGVtZW50QXQ8Z2xvYmFsOjpTdHJhdy5Dcm9wRGF0YT4oY3JvcHMsY3VycmVudENyb3ApLm5hbWUgKyBcIiAkXCIgKyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkVsZW1lbnRBdDxnbG9iYWw6OlN0cmF3LkNyb3BEYXRhPihjcm9wcyxjdXJyZW50Q3JvcCkuaW5pdGlhbENvc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9jdXJEaXNjb3J2ZXJlZENyb3AgPCBfYmVzdENyb3ApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2hlbHBCdG4uR2V0Q29tcG9uZW50PFNwcml0ZT4oKS5Tb3VyY2VSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKDAsIDE2LCAzMiwgMTYpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudENyb3AgPiBfY3VyRGlzY29ydmVyZWRDcm9wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3VyRGlzY29ydmVyZWRDcm9wID0gY3VycmVudENyb3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtb25leSA+PSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkVsZW1lbnRBdDxnbG9iYWw6OlN0cmF3LkNyb3BEYXRhPihjcm9wcyxjdXJyZW50Q3JvcCkuaW5pdGlhbENvc3QgJiYgZmFybS5HZXRDcm9wKHgsIHkpID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3ByaXRlIGhlbHBTcHJpdGUgPSBfaGVscEJ0bi5HZXRDb21wb25lbnQ8U3ByaXRlPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBTcHJpdGUuVGV4dHVyZSA9IFJlc291cmNlTWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oXCJUZXh0dXJlcy9CdXR0b25zLnBuZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBoZWxwU3ByaXRlLlNvdXJjZVJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoMCwgMzIsIDMyLCAxNik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2hlbHBCdG4uR2V0Q29tcG9uZW50PFNwcml0ZT4oKS5Tb3VyY2VSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKDAsIDAsIDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfY3VyQXV0b1Bvc1grKztcclxuICAgICAgICAgICAgaWYgKF9jdXJBdXRvUG9zWCA+PSBmYXJtLndpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfY3VyQXV0b1Bvc1ggPSAwO1xyXG4gICAgICAgICAgICAgICAgX2N1ckF1dG9Qb3NZKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2N1ckF1dG9Qb3NZID49IGZhcm0uaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIF9jdXJBdXRvUG9zWSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIENyb3BEYXRhIGNyb3AgPSBmYXJtLkdldENyb3AoX2N1ckF1dG9Qb3NYLCBfY3VyQXV0b1Bvc1kpO1xyXG4gICAgICAgICAgICBpZiAoY3JvcCAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3JvcC5pbmRleCA8IF9jdXJBdXRvVXBncmFkZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjcm9wID0gZmFybS5IYXJ2ZXN0VGlsZShfY3VyQXV0b1Bvc1gsIF9jdXJBdXRvUG9zWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNyb3AgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhhcnZlc3RDcm9wKF9jdXJBdXRvUG9zWCwgX2N1ckF1dG9Qb3NZKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJhc2UuVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFNhdmUgZ2FtZSB0byBsb2NhbCBzdG9yYWdlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZvaWQgU2F2ZUdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LldpbmRvdy5Mb2NhbFN0b3JhZ2UuU2V0SXRlbShcIm1vbmV5XCIsIG1vbmV5KTtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LldpbmRvdy5Mb2NhbFN0b3JhZ2UuU2V0SXRlbShcImhpZ2hlc3RNb25leVwiLCBoaWdoZXN0TW9uZXkpO1xyXG4gICAgICAgICAgICBCcmlkZ2UuSHRtbDUuV2luZG93LkxvY2FsU3RvcmFnZS5TZXRJdGVtKFwiY3VyQXV0b1VwZ3JhZGVcIiwgX2N1ckF1dG9VcGdyYWRlKTtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LldpbmRvdy5Mb2NhbFN0b3JhZ2UuU2V0SXRlbShcImN1clZhbHVlVXBncmFkZVwiLCBfY3VyVmFsdWVVcGdyYWRlKTtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LldpbmRvdy5Mb2NhbFN0b3JhZ2UuU2V0SXRlbShcImN1clBsYW50XCIsIGN1cnJlbnRDcm9wKTtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LldpbmRvdy5Mb2NhbFN0b3JhZ2UuU2V0SXRlbShcImJlc3RDcm9wXCIsIF9iZXN0Q3JvcCk7XHJcbiAgICAgICAgICAgIEJyaWRnZS5IdG1sNS5XaW5kb3cuTG9jYWxTdG9yYWdlLlNldEl0ZW0oXCJiZXN0RGlzY292ZXJlZFwiLCBfY3VyRGlzY29ydmVyZWRDcm9wKTtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LldpbmRvdy5Mb2NhbFN0b3JhZ2UuU2V0SXRlbShcInBsYXllclhcIiwgZmFybWVyLmZhcm1lck9iamVjdC5UcmFuc2Zvcm0uUG9zaXRpb24uWCk7XHJcbiAgICAgICAgICAgIEJyaWRnZS5IdG1sNS5XaW5kb3cuTG9jYWxTdG9yYWdlLlNldEl0ZW0oXCJwbGF5ZXJZXCIsIGZhcm1lci5mYXJtZXJPYmplY3QuVHJhbnNmb3JtLlBvc2l0aW9uLlkpO1xyXG4gICAgICAgICAgICBmYXJtLlNhdmVGYXJtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgSGFydmVzdENyb3AoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3JvcERhdGEgZGF0YSA9IGZhcm0uR2V0Q3JvcCh4LCB5KTtcclxuXHJcbiAgICAgICAgICAgIG1vbmV5ICs9IGRhdGEudmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAobW9uZXkgPiBoaWdoZXN0TW9uZXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhpZ2hlc3RNb25leSA9IG1vbmV5O1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlSWNvbnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb25leVRleHQuR2V0Q29tcG9uZW50PEp1aWNlQm94RW5naW5lLkdyYXBoaWNzLlRleHQ+KCkuRGlzcGxheVRleHQgPSBcIiRcIiArIG1vbmV5O1xyXG4gICAgICAgICAgICBtb25leVRleHRCYWNrLkdldENvbXBvbmVudDxKdWljZUJveEVuZ2luZS5HcmFwaGljcy5UZXh0PigpLkRpc3BsYXlUZXh0ID0gXCIkXCIgKyBtb25leTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZpc3VhbGl6ZSBjcm9wIGJlaW5nIGhhcnZlc3RlZC5cclxuICAgICAgICAgICAgX3BsYW50c1Bvb2xbX2N1clBsYW50XS5FbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgU3ByaXRlIHBsYW50U3ByaXRlID0gX3BsYW50c1Bvb2xbX2N1clBsYW50XS5HZXRDb21wb25lbnQ8U3ByaXRlPigpO1xyXG4gICAgICAgICAgICBwbGFudFNwcml0ZS5UZXh0dXJlID0gUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihkYXRhLnNwcml0ZSk7XHJcbiAgICAgICAgICAgIHBsYW50U3ByaXRlLlNvdXJjZVJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgMTYsIDE2KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbXV0ZWQpXHJcbiAgICAgICAgICAgICAgICBfcGxhbnRzUG9vbFtfY3VyUGxhbnRdLkdldENvbXBvbmVudDxBdWRpb1NvdXJjZT4oKS5QbGF5KCk7XHJcblxyXG4gICAgICAgICAgICBfcGxhbnRzUG9vbFtfY3VyUGxhbnRdLlRyYW5zZm9ybS5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IzKGZhcm0uT2Zmc2V0LlggKyAxNiAqIHggKyA4LCBmYXJtLk9mZnNldC5ZICsgMTYgKiB5LCAwLjBmKTtcclxuICAgICAgICAgICAgX3BsYW50c1Bvb2xbX2N1clBsYW50XS5UcmFuc2Zvcm0uUm90YXRpb24gPSBuZXcgVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBfdGltZUhhcnZlc3RlZFtfY3VyUGxhbnRdID0gVGltZS5Ub3RhbFNlY29uZHM7XHJcblxyXG4gICAgICAgICAgICBfY3VyUGxhbnQgPSAoX2N1clBsYW50ICsgMSkgJSBfcGxhbnRQb29sU2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVJY29ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgaWNvbnNcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjcm9wcy5Db3VudDsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTcHJpdGUgcGlTcHJpdGUgPSBfcGxhbnRJY29uc1tpXS5HZXRDb21wb25lbnQ8U3ByaXRlPigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhpZ2hlc3RNb25leSA+PSBjcm9wc1tpXS5pbml0aWFsQ29zdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwaVNwcml0ZS5UZXh0dXJlID0gUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihjcm9wc1tpXS5zcHJpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9iZXN0Q3JvcCA9IGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlTcHJpdGUuVGV4dHVyZSA9IFJlc291cmNlTWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oXCJUZXh0dXJlcy9RdWVzdGlvbk1hcmsucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGlTcHJpdGUuU291cmNlUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgwLCAwLCAxNiwgMTYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlRmFybWVkUGxhbnRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgX3BsYW50UG9vbFNpemU7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9wbGFudHNQb29sW2ldLkVuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgdGltZUluQWlyID0gVGltZS5Ub3RhbFNlY29uZHMgLSBfdGltZUhhcnZlc3RlZFtpXTtcclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IzIGN1clBvcyA9IF9wbGFudHNQb29sW2ldLlRyYW5zZm9ybS5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBfcGxhbnRzUG9vbFtpXS5UcmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgVmVjdG9yMyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyUG9zLlggKyAoNDAgKiBKdWljZUJveEVuZ2luZS5NYXRoLk1hdGguU2luKF90aW1lSGFydmVzdGVkW2ldKSAqIFRpbWUuRGVsdGFUaW1lKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyUG9zLlkgKyAoODAgKiBKdWljZUJveEVuZ2luZS5NYXRoLk1hdGguQ29zKHRpbWVJbkFpciAqIDQuMGYpICogVGltZS5EZWx0YVRpbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJQb3MuWik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IGN1clJvdCA9IF9wbGFudHNQb29sW2ldLlRyYW5zZm9ybS5Sb3RhdGlvbi5aO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGFudHNQb29sW2ldLlRyYW5zZm9ybS5Sb3RhdGlvbiA9IG5ldyBWZWN0b3IzKDAuMGYsIDAuMGYsIGN1clJvdCArIDIuMGYgKiBKdWljZUJveEVuZ2luZS5NYXRoLk1hdGguU2luKF90aW1lSGFydmVzdGVkW2ldKSAqIFRpbWUuRGVsdGFUaW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVJbkFpciA+IDEuMGYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9wbGFudHNQb29sW2ldLkVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBKdWljZUJveEVuZ2luZS5HcmFwaGljcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuSW5wdXQ7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLk1hdGg7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuU2NlbmU7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlV0aWw7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTdHJhd1xyXG57XHJcbiAgICBjbGFzcyBNYWluU2NlbmUgOiBTY2VuZVxyXG4gICAge1xyXG4gICAgICAgIEdhbWUgX2dhbWU7XHJcbiAgICAgICAgcHVibGljIGJvb2wgbG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBUZXh0IHR4dDtcclxuICAgICAgICBUZXh0IHR4dGJhY2s7XHJcblxyXG4gICAgICAgIEdhbWVPYmplY3QgbG9nbztcclxuICAgICAgICBHYW1lT2JqZWN0IGxvZ29iYWNrO1xyXG5cclxuICAgICAgICBHYW1lT2JqZWN0W10gY3JvcHM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNYWluU2NlbmUoUmVzb3VyY2VNYW5hZ2VyIG1hbmFnZXIsIEdhbWUgZ2FtZSlcclxuICAgICAgICAgICAgOiBiYXNlKG1hbmFnZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBTdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlN0YXJ0KCk7XHJcblxyXG4gICAgICAgICAgICBEZWZhdWx0Q2FtZXJhLkNsZWFyQ29sb3IgPSBuZXcgSnVpY2VCb3hFbmdpbmUuTWF0aC5Db2xvcjMyKDk5LCAxNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICAgICAgRGVmYXVsdENhbWVyYS5QYXJlbnQuVHJhbnNmb3JtLlBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMjU2LjBmLCAyNTYuMGYsIDAuMGYpO1xyXG5cclxuICAgICAgICAgICAgR2FtZU9iamVjdCB0aWxlbWFwT2JqID0gQWRkR2FtZU9iamVjdChcIlRpbGVtYXBcIik7XHJcbiAgICAgICAgICAgIFRpbGVNYXAgbWFwID0gdGlsZW1hcE9iai5BZGRDb21wb25lbnQ8VGlsZU1hcD4oKTtcclxuICAgICAgICAgICAgbWFwLkRlcHRoID0gMC4wZjtcclxuICAgICAgICAgICAgbWFwLk1hcCA9IFJlc291cmNlTWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oXCJUZXh0dXJlcy9GYXJtTWFwRGF0YS5wbmdcIik7XHJcbiAgICAgICAgICAgIG1hcC5TcHJpdGVzID0gUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihcIlRleHR1cmVzL0Zhcm1NYXBTcHJpdGVzLnBuZ1wiKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVPYmplY3QgdGV4dE9iaiA9IEFkZEdhbWVPYmplY3QoXCJUZXh0XCIpO1xyXG4gICAgICAgICAgICB0ZXh0T2JqLlRyYW5zZm9ybS5Qb3NpdGlvbiA9IG5ldyBKdWljZUJveEVuZ2luZS5NYXRoLlZlY3RvcjMoMjU2LjBmLCAyNTYuMGYgICsgLTMyLjBmLCA4MC4wZik7XHJcbiAgICAgICAgICAgIHR4dCA9IHRleHRPYmouQWRkQ29tcG9uZW50PFRleHQ+KCk7XHJcbiAgICAgICAgICAgIHR4dC5EaXNwbGF5VGV4dCA9IFwicHJlc3MgeCB0byBzdGFydFwiO1xyXG4gICAgICAgICAgICB0eHQuQWxpZ25tZW50ID0gVGV4dEFsaWdubWVudC5DZW50ZXI7XHJcblxyXG4gICAgICAgICAgICB0ZXh0T2JqID0gQWRkR2FtZU9iamVjdChcIlRleHQgQmFja1wiKTtcclxuICAgICAgICAgICAgdGV4dE9iai5UcmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgSnVpY2VCb3hFbmdpbmUuTWF0aC5WZWN0b3IzKDI1Ni4wZiArIDEuMGYsIDI1Ni4wZiAgKyAtMzMuMGYsIDc4LjBmKTtcclxuICAgICAgICAgICAgdHh0YmFjayA9IHRleHRPYmouQWRkQ29tcG9uZW50PFRleHQ+KCk7XHJcbiAgICAgICAgICAgIHR4dGJhY2suRGlzcGxheVRleHQgPSBcInByZXNzIHggdG8gc3RhcnRcIjtcclxuICAgICAgICAgICAgdHh0YmFjay5BbGlnbm1lbnQgPSBUZXh0QWxpZ25tZW50LkNlbnRlcjtcclxuICAgICAgICAgICAgdHh0YmFjay5Db2xvciA9IG5ldyBKdWljZUJveEVuZ2luZS5NYXRoLkNvbG9yMzIoMC4wZiwgMC4wZiwgMC4wZiwgMS4wZik7XHJcblxyXG4gICAgICAgICAgICB0ZXh0T2JqID0gQWRkR2FtZU9iamVjdChcIlRleHRcIik7XHJcbiAgICAgICAgICAgIHRleHRPYmouVHJhbnNmb3JtLlBvc2l0aW9uID0gbmV3IEp1aWNlQm94RW5naW5lLk1hdGguVmVjdG9yMygyNTYuMGYsIDI1Ni4wZiArIC02NC4wZiwgODAuMGYpO1xyXG4gICAgICAgICAgICBUZXh0IHRleHQgPSB0ZXh0T2JqLkFkZENvbXBvbmVudDxUZXh0PigpO1xyXG4gICAgICAgICAgICB0ZXh0LkRpc3BsYXlUZXh0ID0gXCJieSB0aG9tIHplaWxzdHJhXCI7XHJcbiAgICAgICAgICAgIHRleHQuQWxpZ25tZW50ID0gVGV4dEFsaWdubWVudC5DZW50ZXI7XHJcblxyXG4gICAgICAgICAgICBsb2dvID0gQWRkR2FtZU9iamVjdChcIkxvZ29cIik7XHJcbiAgICAgICAgICAgIGxvZ28uVHJhbnNmb3JtLlBvc2l0aW9uID0gbmV3IEp1aWNlQm94RW5naW5lLk1hdGguVmVjdG9yMygyNTYuMGYsIDI1Ni4wZiArIDE2LjBmLCA4MC4wZik7XHJcbiAgICAgICAgICAgIGxvZ28uVHJhbnNmb3JtLlNjYWxlID0gbmV3IFZlY3RvcjMoMi4wZiwgMi4wZiwgMS4wZik7XHJcbiAgICAgICAgICAgIFRleHQgbG9nb3R4dCA9IGxvZ28uQWRkQ29tcG9uZW50PFRleHQ+KCk7XHJcbiAgICAgICAgICAgIGxvZ290eHQuRGlzcGxheVRleHQgPSBcImNyb3BwZXJcIjtcclxuICAgICAgICAgICAgbG9nb3R4dC5BbGlnbm1lbnQgPSBUZXh0QWxpZ25tZW50LkNlbnRlcjtcclxuICAgICAgICAgICAgbG9nb3R4dC5Db2xvciA9IG5ldyBDb2xvcjMyKDEwNiwgMTkwLCA0OCwgMjU1KTtcclxuXHJcbiAgICAgICAgICAgIGxvZ29iYWNrID0gQWRkR2FtZU9iamVjdChcIkxvZ28gQmFja1wiKTtcclxuICAgICAgICAgICAgbG9nb2JhY2suVHJhbnNmb3JtLlBvc2l0aW9uID0gbmV3IEp1aWNlQm94RW5naW5lLk1hdGguVmVjdG9yMygyNTYuMGYgKyAxLjBmLCAyNTYuMGYgKyAxNS4wZiwgNS4wZik7XHJcbiAgICAgICAgICAgIGxvZ29iYWNrLlRyYW5zZm9ybS5TY2FsZSA9IG5ldyBWZWN0b3IzKDIuMGYsIDIuMGYsIDEuMGYpO1xyXG4gICAgICAgICAgICBsb2dvdHh0ID0gbG9nb2JhY2suQWRkQ29tcG9uZW50PFRleHQ+KCk7XHJcbiAgICAgICAgICAgIGxvZ290eHQuRGlzcGxheVRleHQgPSBcImNyb3BwZXJcIjtcclxuICAgICAgICAgICAgbG9nb3R4dC5BbGlnbm1lbnQgPSBUZXh0QWxpZ25tZW50LkNlbnRlcjtcclxuICAgICAgICAgICAgbG9nb3R4dC5Db2xvciA9IG5ldyBKdWljZUJveEVuZ2luZS5NYXRoLkNvbG9yMzIoMC4wZiwgMC4wZiwgMC4wZiwgMS4wZik7XHJcblxyXG4gICAgICAgICAgICBSYW5kb20gcmFuZG9tID0gbmV3IFJhbmRvbSgpO1xyXG5cclxuICAgICAgICAgICAgc3RyaW5nW10gY3JvcFNwcml0ZXMgPSBuZXcgc3RyaW5nW11cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIlRleHR1cmVzL09uaW9uLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVGV4dHVyZXMvQ2Fycm90LnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVGV4dHVyZXMvUG90YXRvLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVGV4dHVyZXMvQmVldFJvb3QucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUZXh0dXJlcy9QdW1wa2luLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVGV4dHVyZXMvV2hlYXQucG5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUZXh0dXJlcy9Db3JuLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICBjcm9wcyA9IG5ldyBHYW1lT2JqZWN0WzM1XTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjcm9wcy5MZW5ndGg7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZU9iamVjdCBjcm9wID0gQWRkR2FtZU9iamVjdChcImNyb3BcIiArIGkpO1xyXG4gICAgICAgICAgICAgICAgY3JvcC5UcmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgSnVpY2VCb3hFbmdpbmUuTWF0aC5WZWN0b3IzKDI1Ni4wZiArIHJhbmRvbS5OZXh0KC04MCwgODApLCAyNTYuMGYgKyByYW5kb20uTmV4dCgtNjAsIDEwMCksIDAuMGYpO1xyXG4gICAgICAgICAgICAgICAgU3ByaXRlIGNyb3BTcHJpdGUgPSBjcm9wLkFkZENvbXBvbmVudDxTcHJpdGU+KCk7XHJcbiAgICAgICAgICAgICAgICBjcm9wU3ByaXRlLlRleHR1cmUgPSBSZXNvdXJjZU1hbmFnZXIuTG9hZDxUZXh0dXJlMkQ+KGNyb3BTcHJpdGVzW3JhbmRvbS5OZXh0KDAsIGNyb3BTcHJpdGVzLkxlbmd0aCldKTtcclxuICAgICAgICAgICAgICAgIGNyb3BTcHJpdGUuU291cmNlUmVjdGFuZ2xlID0gbmV3IEp1aWNlQm94RW5naW5lLk1hdGguUmVjdGFuZ2xlKDAsIDAsIDE2LCAxNik7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JvcHNbaV0gPSBjcm9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmFuZG9tIHJhbmRvbSA9IG5ldyBSYW5kb20oKTtcclxuICAgICAgICAgICAgdHh0LkVuYWJsZWQgPSAoaW50KShUaW1lLlRvdGFsU2Vjb25kcyAqIDQuMGYpICUgMiA9PSAwO1xyXG4gICAgICAgICAgICB0eHRiYWNrLkVuYWJsZWQgPSB0eHQuRW5hYmxlZDtcclxuXHJcbiAgICAgICAgICAgIGZvcihpbnQgaSA9IDA7IGkgPCBjcm9wcy5MZW5ndGg7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMyBwb3MgPSBjcm9wc1tpXS5UcmFuc2Zvcm0uUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBjcm9wc1tpXS5UcmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgSnVpY2VCb3hFbmdpbmUuTWF0aC5WZWN0b3IzKHBvcy5YLCBwb3MuWSAtIDEwMC4wZiAqIFRpbWUuRGVsdGFUaW1lLCAwLjBmKTtcclxuICAgICAgICAgICAgICAgIGNyb3BzW2ldLlRyYW5zZm9ybS5Sb3RhdGlvbiA9IG5ldyBWZWN0b3IzKDAuMGYsIDAuMGYsIGNyb3BzW2ldLlRyYW5zZm9ybS5Sb3RhdGlvbi5aICsgSnVpY2VCb3hFbmdpbmUuTWF0aC5NYXRoLlNpbihpICogMTIzMS41NjRmKSAqIDQuMGYgKiBUaW1lLkRlbHRhVGltZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYocG9zLlkgPCAyNTYuMGYgICsgLTgwLjBmKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNyb3BzW2ldLlRyYW5zZm9ybS5Qb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDI1Ni4wZiArIHJhbmRvbS5OZXh0KC04MCwgODApLCAyNTYuMGYgKyByYW5kb20uTmV4dCg2NCwgODApLCAwLjBmKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKElucHV0TWFuYWdlci5JbnN0YW5jZS5Jc0tleURvd24oXCJ4XCIpICYmICFsb2FkaW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfZ2FtZS5TZXRTY2VuZShuZXcgR2FtZVNjZW5lKFJlc291cmNlTWFuYWdlciksIDEuMGYsIFJlc291cmNlTWFuYWdlci5Mb2FkPFRleHR1cmUyRD4oXCJUZXh0dXJlcy9TY3JlZW5GYWRlLnBuZ1wiKSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3M7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuU2NlbmU7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlV0aWw7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLk1hdGg7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5Tb3VuZDtcclxuXHJcbm5hbWVzcGFjZSBTdHJhd1xyXG57XHJcbiAgICBjbGFzcyBTcGxhc2hTY2VuZSA6IFNjZW5lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBfdGltZTtcclxuICAgICAgICBwcml2YXRlIEdhbWUgX2dhbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBTY2VuZSBfdG9TY2VuZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBHYW1lT2JqZWN0IF9qdWljZWJveEljb247XHJcbiAgICAgICAgcHJpdmF0ZSBHYW1lT2JqZWN0IF9qdWljZWJveFRleHQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGxhc2hTY2VuZShSZXNvdXJjZU1hbmFnZXIgbWFuYWdlcikgXHJcbiAgICAgICAgICAgIDogYmFzZShtYW5hZ2VyKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBTdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfdGltZSA9IDMuMGY7XHJcbiAgICAgICAgICAgIGJhc2UuU3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIERlZmF1bHRDYW1lcmEuQ2xlYXJDb2xvciA9IG5ldyBKdWljZUJveEVuZ2luZS5NYXRoLkNvbG9yMzIoNDIsIDQyLCA0MiwgMjU1KTtcclxuXHJcbiAgICAgICAgICAgIF9qdWljZWJveEljb24gPSBBZGRHYW1lT2JqZWN0KFwiSnVpY2Vib3hcIik7XHJcbiAgICAgICAgICAgIFNwcml0ZSBzcHJpdGUgPSBfanVpY2Vib3hJY29uLkFkZENvbXBvbmVudDxTcHJpdGU+KCk7XHJcbiAgICAgICAgICAgIHNwcml0ZS5UZXh0dXJlID0gUmVzb3VyY2VNYW5hZ2VyLkxvYWQ8VGV4dHVyZTJEPihcIlRleHR1cmVzL0p1aWNlYm94SWNvbi5wbmdcIik7XHJcblxyXG4gICAgICAgICAgICBfanVpY2Vib3hUZXh0ID0gQWRkR2FtZU9iamVjdChcIkp1aWNlYm94IFRleHRcIik7XHJcbiAgICAgICAgICAgIF9qdWljZWJveFRleHQuVHJhbnNmb3JtLlBvc2l0aW9uID0gbmV3IEp1aWNlQm94RW5naW5lLk1hdGguVmVjdG9yMygwLjBmLCAtMzAuMGYsIDAuMGYpO1xyXG4gICAgICAgICAgICBKdWljZUJveEVuZ2luZS5HcmFwaGljcy5UZXh0IHRleHRDb21wID0gX2p1aWNlYm94VGV4dC5BZGRDb21wb25lbnQ8SnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuVGV4dD4oKTtcclxuICAgICAgICAgICAgdGV4dENvbXAuRGlzcGxheVRleHQgPSBcIkp1aWNlYm94IGVuZ2luZVwiO1xyXG4gICAgICAgICAgICB0ZXh0Q29tcC5Db2xvciA9IG5ldyBDb2xvcjMyKDI1NSwgMTY1LCAwLCAyNTUpO1xyXG4gICAgICAgICAgICB0ZXh0Q29tcC5BbGlnbm1lbnQgPSBUZXh0QWxpZ25tZW50LkNlbnRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNwbGFzaFNjcmVlbihHYW1lIGdhbWUsIGZsb2F0IGR1cmF0aW9uLCBTY2VuZSBzY2VuZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9nYW1lID0gZ2FtZTtcclxuICAgICAgICAgICAgX3RpbWUgPSBkdXJhdGlvbjtcclxuICAgICAgICAgICAgX3RvU2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfanVpY2Vib3hJY29uLlRyYW5zZm9ybS5Sb3RhdGlvbiA9IG5ldyBWZWN0b3IzKDAuMGYsIDAuMGYsIDAuNWYgKiBKdWljZUJveEVuZ2luZS5NYXRoLk1hdGguU2luKFRpbWUuVG90YWxTZWNvbmRzICogNS4wZikpO1xyXG4gICAgICAgICAgICBfanVpY2Vib3hJY29uLlRyYW5zZm9ybS5TY2FsZSA9IG5ldyBWZWN0b3IzKEp1aWNlQm94RW5naW5lLk1hdGguTWF0aC5TaW4oVGltZS5Ub3RhbFNlY29uZHMgKiA1LjBmKSArIDMuMGYsIDAuNWYgKiBKdWljZUJveEVuZ2luZS5NYXRoLk1hdGguU2luKFRpbWUuVG90YWxTZWNvbmRzICogNS4wZikgKyAzLjBmLCAxLjBmKTtcclxuXHJcbiAgICAgICAgICAgIF9qdWljZWJveFRleHQuVHJhbnNmb3JtLlJvdGF0aW9uID0gbmV3IFZlY3RvcjMoMC4wZiwgMC4wZiwgMC4yZiAqIEp1aWNlQm94RW5naW5lLk1hdGguTWF0aC5TaW4oVGltZS5Ub3RhbFNlY29uZHMgKiAyLjBmKSk7XHJcbiAgICAgICAgICAgIF9qdWljZWJveEljb24uVHJhbnNmb3JtLlNjYWxlID0gbmV3IFZlY3RvcjMoSnVpY2VCb3hFbmdpbmUuTWF0aC5NYXRoLlNpbihUaW1lLlRvdGFsU2Vjb25kcyAqIDIuMGYpICsgMi4wZiwgSnVpY2VCb3hFbmdpbmUuTWF0aC5NYXRoLlNpbihUaW1lLlRvdGFsU2Vjb25kcyAqIDIuMGYpICsgMi4wZiwgMS4wZik7XHJcblxyXG4gICAgICAgICAgICAvLyBTd2l0Y2ggdG8gb3RoZXIgc2NlbmUgd2hlbiB0aW1lIGhhcyBlbGFwc2VkLlxyXG4gICAgICAgICAgICBfdGltZSAtPSBUaW1lLkRlbHRhVGltZVJlYWxUaW1lO1xyXG4gICAgICAgICAgICBpZiAoX3RpbWUgPD0gMC4wZilcclxuICAgICAgICAgICAgICAgIF9nYW1lLlNldFNjZW5lKF90b1NjZW5lLCAxLjBmLCBSZXNvdXJjZU1hbmFnZXIuTG9hZDxUZXh0dXJlMkQ+KFwiVGV4dHVyZXMvU2NyZWVuRmFkZS5wbmdcIikpO1xyXG5cclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFN0cmF3XHJcbntcclxuICAgIGludGVybmFsIGNsYXNzIFZhbHVlVXBncmFkZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBsb25nIGNvc3Q7XHJcbiAgICAgICAgcHVibGljIGludCBjcm9wO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgbmV3VmFsdWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBWYWx1ZVVwZ3JhZGUobG9uZyBjb3N0LCBpbnQgY3JvcCwgaW50IG5ld1ZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb3N0ID0gY29zdDtcclxuICAgICAgICAgICAgdGhpcy5jcm9wID0gY3JvcDtcclxuICAgICAgICAgICAgdGhpcy5uZXdWYWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
