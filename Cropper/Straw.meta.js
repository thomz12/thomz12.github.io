Bridge.assembly("Straw", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,JuiceBoxEngine.Scene,JuiceBoxEngine.Math,Straw,System.Collections.Generic,JuiceBoxEngine.Graphics,JuiceBoxEngine.Resources];
    $m("Straw.App", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[0].Void}]}; });
    $m("Straw.AutoUpgrade", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].String,$n[0].Int64,$n[0].Int32],"pi":[{"n":"name","pt":$n[0].String,"ps":0},{"n":"cost","pt":$n[0].Int64,"ps":1},{"n":"crop","pt":$n[0].Int32,"ps":2}],"sn":"ctor"},{"a":2,"n":"cost","t":4,"rt":$n[0].Int64,"sn":"cost"},{"a":2,"n":"crop","t":4,"rt":$n[0].Int32,"sn":"crop","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"name","t":4,"rt":$n[0].String,"sn":"name"}]}; });
    $m("Straw.CropData", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].Int32,$n[0].String,$n[0].Int64,$n[0].Int64,$n[0].Int32,$n[0].Int32,$n[0].String],"pi":[{"n":"index","pt":$n[0].Int32,"ps":0},{"n":"name","pt":$n[0].String,"ps":1},{"n":"cost","pt":$n[0].Int64,"ps":2},{"n":"value","pt":$n[0].Int64,"ps":3},{"n":"maxGrowth","pt":$n[0].Int32,"ps":4},{"n":"growTime","pt":$n[0].Int32,"ps":5},{"n":"sprite","pt":$n[0].String,"ps":6}],"sn":"ctor"},{"a":2,"n":"growTime","t":4,"rt":$n[0].Int32,"sn":"growTime","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"index","t":4,"rt":$n[0].Int32,"sn":"index","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"initialCost","t":4,"rt":$n[0].Int64,"sn":"initialCost"},{"a":2,"n":"maxGrowth","t":4,"rt":$n[0].Int32,"sn":"maxGrowth","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"name","t":4,"rt":$n[0].String,"sn":"name"},{"a":2,"n":"sprite","t":4,"rt":$n[0].String,"sn":"sprite"},{"a":2,"n":"value","t":4,"rt":$n[0].Int64,"sn":"value"}]}; });
    $m("Straw.Farm", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].Scene,$n[2].Vector2,$n[0].Int32,$n[0].Int32],"pi":[{"n":"scene","pt":$n[1].Scene,"ps":0},{"n":"offset","pt":$n[2].Vector2,"ps":1},{"n":"x","pt":$n[0].Int32,"ps":2},{"n":"y","pt":$n[0].Int32,"ps":3}],"sn":"ctor"},{"a":2,"n":"GetCrop","t":8,"pi":[{"n":"x","pt":$n[0].Int32,"ps":0},{"n":"y","pt":$n[0].Int32,"ps":1}],"sn":"GetCrop","rt":$n[3].CropData,"p":[$n[0].Int32,$n[0].Int32]},{"a":2,"n":"GetTile","t":8,"pi":[{"n":"x","out":true,"pt":$n[0].Int32,"ps":0},{"n":"y","out":true,"pt":$n[0].Int32,"ps":1},{"n":"position","pt":$n[2].Vector2,"ps":2}],"sn":"GetTile","rt":$n[0].Void,"p":[$n[0].Int32,$n[0].Int32,$n[2].Vector2]},{"a":2,"n":"HarvestTile","t":8,"pi":[{"n":"x","pt":$n[0].Int32,"ps":0},{"n":"y","pt":$n[0].Int32,"ps":1}],"sn":"HarvestTile","rt":$n[3].CropData,"p":[$n[0].Int32,$n[0].Int32]},{"a":2,"n":"LoadFarm","t":8,"pi":[{"n":"cropData","pt":$n[4].List$1(Straw.CropData),"ps":0}],"sn":"LoadFarm","rt":$n[0].Void,"p":[$n[4].List$1(Straw.CropData)]},{"a":2,"n":"PlantCrop","t":8,"pi":[{"n":"x","pt":$n[0].Int32,"ps":0},{"n":"y","pt":$n[0].Int32,"ps":1},{"n":"crop","pt":$n[3].CropData,"ps":2}],"sn":"PlantCrop","rt":$n[0].Void,"p":[$n[0].Int32,$n[0].Int32,$n[3].CropData]},{"a":2,"n":"SaveFarm","t":8,"sn":"SaveFarm","rt":$n[0].Void},{"a":2,"n":"Update","t":8,"pi":[{"n":"upgrades","pt":$n[4].List$1(Straw.ValueUpgrade),"ps":0},{"n":"curUpgrade","pt":$n[0].Int32,"ps":1}],"sn":"Update","rt":$n[0].Void,"p":[$n[4].List$1(Straw.ValueUpgrade),$n[0].Int32]},{"a":1,"n":"UpdateCrop","t":8,"pi":[{"n":"x","pt":$n[0].Int32,"ps":0},{"n":"y","pt":$n[0].Int32,"ps":1}],"sn":"UpdateCrop","rt":$n[0].Void,"p":[$n[0].Int32,$n[0].Int32]},{"a":2,"n":"Offset","t":4,"rt":$n[2].Vector2,"sn":"Offset"},{"a":1,"n":"_objects","t":4,"rt":System.Array.type(JuiceBoxEngine.Scene.GameObject, 2),"sn":"_objects"},{"a":1,"n":"_prevUpdate","t":4,"rt":$n[0].Single,"sn":"_prevUpdate","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"_scene","t":4,"rt":$n[1].Scene,"sn":"_scene"},{"a":2,"n":"crops","t":4,"rt":System.Array.type(Straw.CropData, 2),"sn":"crops"},{"a":2,"n":"growRate","t":4,"rt":$n[0].Single,"sn":"growRate","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"growchance","t":4,"rt":$n[0].Int32,"sn":"growchance","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"height","t":4,"rt":$n[0].Int32,"sn":"height","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"progress","t":4,"rt":$n[0].Array.type(System.Int32, 2),"sn":"progress"},{"a":2,"n":"width","t":4,"rt":$n[0].Int32,"sn":"width","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; });
    $m("Straw.Farmer", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].Scene],"pi":[{"n":"scene","pt":$n[1].Scene,"ps":0}],"sn":"ctor"},{"a":2,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"_collider","t":4,"rt":$n[1].Collider,"sn":"_collider"},{"a":1,"n":"_looksRight","t":4,"rt":$n[0].Boolean,"sn":"_looksRight","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"_scene","t":4,"rt":$n[1].Scene,"sn":"_scene"},{"a":1,"n":"_sprite","t":4,"rt":$n[5].Sprite,"sn":"_sprite"},{"a":2,"n":"farmerObject","t":4,"rt":$n[1].GameObject,"sn":"farmerObject"},{"a":2,"n":"moveSpeed","t":4,"rt":$n[0].Single,"sn":"moveSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; });
    $m("Straw.Game", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":2,"n":"Run","t":8,"sn":"Run","rt":$n[0].Void},{"ov":true,"a":2,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void}]}; });
    $m("Straw.GameSaver", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"GetFloatOrDefault","is":true,"t":8,"pi":[{"n":"name","pt":$n[0].String,"ps":0},{"n":"defaultVal","pt":$n[0].Single,"ps":1}],"sn":"GetFloatOrDefault","rt":$n[0].Single,"p":[$n[0].String,$n[0].Single],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"GetIntOrDefault","is":true,"t":8,"pi":[{"n":"name","pt":$n[0].String,"ps":0},{"n":"defaultVal","pt":$n[0].Int32,"ps":1}],"sn":"GetIntOrDefault","rt":$n[0].Int32,"p":[$n[0].String,$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"GetLongOrDefault","is":true,"t":8,"pi":[{"n":"name","pt":$n[0].String,"ps":0},{"n":"defaultVal","pt":$n[0].Int64,"ps":1}],"sn":"GetLongOrDefault","rt":$n[0].Int64,"p":[$n[0].String,$n[0].Int64]}]}; });
    $m("Straw.GameScene", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[6].ResourceManager],"pi":[{"n":"manager","pt":$n[6].ResourceManager,"ps":0}],"sn":"ctor"},{"a":1,"n":"HarvestCrop","t":8,"pi":[{"n":"x","pt":$n[0].Int32,"ps":0},{"n":"y","pt":$n[0].Int32,"ps":1}],"sn":"HarvestCrop","rt":$n[0].Void,"p":[$n[0].Int32,$n[0].Int32]},{"a":2,"n":"SaveGame","t":8,"sn":"SaveGame","rt":$n[0].Void},{"ov":true,"a":2,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"ov":true,"a":2,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"UpdateFarmedPlants","t":8,"sn":"UpdateFarmedPlants","rt":$n[0].Void},{"a":1,"n":"UpdateIcons","t":8,"sn":"UpdateIcons","rt":$n[0].Void},{"a":1,"n":"_autoUpgrades","t":4,"rt":$n[4].List$1(Straw.AutoUpgrade),"sn":"_autoUpgrades"},{"a":1,"n":"_automagicUpgrade","t":4,"rt":$n[1].GameObject,"sn":"_automagicUpgrade"},{"a":1,"n":"_background","t":4,"rt":$n[1].GameObject,"sn":"_background"},{"a":1,"n":"_bestCrop","t":4,"rt":$n[0].Int32,"sn":"_bestCrop","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"_curAutoPosX","t":4,"rt":$n[0].Int32,"sn":"_curAutoPosX","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"_curAutoPosY","t":4,"rt":$n[0].Int32,"sn":"_curAutoPosY","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"_curAutoUpgrade","t":4,"rt":$n[0].Int32,"sn":"_curAutoUpgrade","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"_curDiscorveredCrop","t":4,"rt":$n[0].Int32,"sn":"_curDiscorveredCrop","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"_curPlant","t":4,"rt":$n[0].Int32,"sn":"_curPlant","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"_curValueUpgrade","t":4,"rt":$n[0].Int32,"sn":"_curValueUpgrade","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"_helpBtn","t":4,"rt":$n[1].GameObject,"sn":"_helpBtn"},{"a":1,"n":"_mutedPressed","t":4,"rt":$n[0].Boolean,"sn":"_mutedPressed","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"_plantIcons","t":4,"rt":System.Array.type(JuiceBoxEngine.Scene.GameObject),"sn":"_plantIcons"},{"a":1,"n":"_plantPoolSize","t":4,"rt":$n[0].Int32,"sn":"_plantPoolSize","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"_plantsPool","t":4,"rt":System.Array.type(JuiceBoxEngine.Scene.GameObject),"sn":"_plantsPool"},{"a":1,"n":"_releasedButton","t":4,"rt":$n[0].Boolean,"sn":"_releasedButton","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"_salesDude","t":4,"rt":$n[5].Sprite,"sn":"_salesDude"},{"a":1,"n":"_saveInterval","t":4,"rt":$n[0].Single,"sn":"_saveInterval","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"_saveProgress","t":4,"rt":$n[0].Single,"sn":"_saveProgress","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"_timeHarvested","t":4,"rt":$n[0].Array.type(System.Single),"sn":"_timeHarvested"},{"a":1,"n":"_toolbarheight","t":4,"rt":$n[0].Single,"sn":"_toolbarheight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"_valueUpgrade","t":4,"rt":$n[1].GameObject,"sn":"_valueUpgrade"},{"a":1,"n":"_valueUpgrades","t":4,"rt":$n[4].List$1(Straw.ValueUpgrade),"sn":"_valueUpgrades"},{"a":2,"n":"_wizard","t":4,"rt":$n[5].Sprite,"sn":"_wizard"},{"a":2,"n":"borders","t":4,"rt":$n[1].GameObject,"sn":"borders"},{"a":2,"n":"crops","t":4,"rt":$n[4].List$1(Straw.CropData),"sn":"crops"},{"a":2,"n":"currentCrop","t":4,"rt":$n[0].Int32,"sn":"currentCrop","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"farm","t":4,"rt":$n[3].Farm,"sn":"farm"},{"a":2,"n":"farmer","t":4,"rt":$n[3].Farmer,"sn":"farmer"},{"a":2,"n":"highestMoney","t":4,"rt":$n[0].Int64,"sn":"highestMoney"},{"a":2,"n":"money","t":4,"rt":$n[0].Int64,"sn":"money"},{"a":2,"n":"moneyText","t":4,"rt":$n[1].GameObject,"sn":"moneyText"},{"a":2,"n":"moneyTextBack","t":4,"rt":$n[1].GameObject,"sn":"moneyTextBack"},{"a":2,"n":"muted","t":4,"rt":$n[0].Boolean,"sn":"muted","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"showToolbar","t":4,"rt":$n[0].Single,"sn":"showToolbar","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"toolTip","t":4,"rt":$n[1].GameObject,"sn":"toolTip"},{"a":2,"n":"toolTipBack","t":4,"rt":$n[1].GameObject,"sn":"toolTipBack"}]}; });
    $m("Straw.MainScene", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[6].ResourceManager,$n[3].Game],"pi":[{"n":"manager","pt":$n[6].ResourceManager,"ps":0},{"n":"game","pt":$n[3].Game,"ps":1}],"sn":"ctor"},{"ov":true,"a":2,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"ov":true,"a":2,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"_game","t":4,"rt":$n[3].Game,"sn":"_game"},{"a":1,"n":"crops","t":4,"rt":System.Array.type(JuiceBoxEngine.Scene.GameObject),"sn":"crops"},{"a":2,"n":"loading","t":4,"rt":$n[0].Boolean,"sn":"loading","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"logo","t":4,"rt":$n[1].GameObject,"sn":"logo"},{"a":1,"n":"logoback","t":4,"rt":$n[1].GameObject,"sn":"logoback"},{"a":1,"n":"txt","t":4,"rt":$n[5].Text,"sn":"txt"},{"a":1,"n":"txtback","t":4,"rt":$n[5].Text,"sn":"txtback"}]}; });
    $m("Straw.SplashScene", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[6].ResourceManager],"pi":[{"n":"manager","pt":$n[6].ResourceManager,"ps":0}],"sn":"ctor"},{"a":2,"n":"SplashScreen","t":8,"pi":[{"n":"game","pt":$n[3].Game,"ps":0},{"n":"duration","pt":$n[0].Single,"ps":1},{"n":"scene","pt":$n[1].Scene,"ps":2}],"sn":"SplashScreen","rt":$n[0].Void,"p":[$n[3].Game,$n[0].Single,$n[1].Scene]},{"ov":true,"a":2,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"ov":true,"a":2,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"_game","t":4,"rt":$n[3].Game,"sn":"_game"},{"a":1,"n":"_juiceboxIcon","t":4,"rt":$n[1].GameObject,"sn":"_juiceboxIcon"},{"a":1,"n":"_juiceboxText","t":4,"rt":$n[1].GameObject,"sn":"_juiceboxText"},{"a":1,"n":"_time","t":4,"rt":$n[0].Single,"sn":"_time","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"_toScene","t":4,"rt":$n[1].Scene,"sn":"_toScene"}]}; });
    $m("Straw.ValueUpgrade", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].Int64,$n[0].Int32,$n[0].Int32],"pi":[{"n":"cost","pt":$n[0].Int64,"ps":0},{"n":"crop","pt":$n[0].Int32,"ps":1},{"n":"newValue","pt":$n[0].Int32,"ps":2}],"sn":"ctor"},{"a":2,"n":"cost","t":4,"rt":$n[0].Int64,"sn":"cost"},{"a":2,"n":"crop","t":4,"rt":$n[0].Int32,"sn":"crop","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"newValue","t":4,"rt":$n[0].Int32,"sn":"newValue","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; });
});