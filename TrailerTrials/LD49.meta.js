H5.assemblyVersion("LD49","1.0.0.0");
H5.assembly("LD49", function ($asm, globals) {
    "use strict";


    var $m = H5.setMetadata,
        $n = ["LD49","JuiceboxEngine.GUI","System","System.Collections","JuiceboxEngine.Playfab","JuiceboxEngine","JuiceboxEngine.Math","System.Collections.Generic","JuiceboxEngine.Resources","JuiceboxEngine.Audio"];
    $m("LD49.CompleteUI", function () { return {"nested":[$n[0].CompleteUI.CompleteUIResult,Function],"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].UIElement,$n[0].LevelProperties,$n[2].Int32,$n[2].Boolean],"pi":[{"n":"parent","pt":$n[1].UIElement,"ps":0},{"n":"level","pt":$n[0].LevelProperties,"ps":1},{"n":"time","pt":$n[2].Int32,"ps":2},{"n":"win","pt":$n[2].Boolean,"ps":3}],"sn":"ctor"},{"a":2,"n":"GetLeaderboards","t":8,"sn":"GetLeaderboards","rt":$n[2].Void},{"a":1,"n":"LeaderboardDelay","t":8,"sn":"LeaderboardDelay","rt":$n[3].IEnumerator},{"a":1,"n":"RetrievedLeaderboard","t":8,"pi":[{"n":"task","pt":$n[4].PlayfabTask,"ps":0}],"sn":"RetrievedLeaderboard","rt":$n[2].Void,"p":[$n[4].PlayfabTask]},{"a":1,"n":"_info","t":4,"rt":$n[1].Text,"sn":"_info"},{"a":1,"n":"_inner","t":4,"rt":$n[1].Text,"sn":"_inner"},{"a":1,"n":"_level","t":4,"rt":$n[0].LevelProperties,"sn":"_level"},{"a":4,"n":"OnComplete","t":2,"ad":{"a":4,"n":"add_OnComplete","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addOnComplete","rt":$n[2].Void,"p":[Function]},"r":{"a":4,"n":"remove_OnComplete","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeOnComplete","rt":$n[2].Void,"p":[Function]}}]}; }, $n);
    $m("LD49.CompleteUI.CompleteUIResult", function () { return {"td":$n[0].CompleteUI,"att":261,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"NEXT","is":true,"t":4,"rt":$n[0].CompleteUI.CompleteUIResult,"sn":"NEXT","box":function ($v) { return H5.box($v, LD49.CompleteUI.CompleteUIResult, System.Enum.toStringFn(LD49.CompleteUI.CompleteUIResult));}},{"a":2,"n":"QUIT","is":true,"t":4,"rt":$n[0].CompleteUI.CompleteUIResult,"sn":"QUIT","box":function ($v) { return H5.box($v, LD49.CompleteUI.CompleteUIResult, System.Enum.toStringFn(LD49.CompleteUI.CompleteUIResult));}},{"a":2,"n":"RETRY","is":true,"t":4,"rt":$n[0].CompleteUI.CompleteUIResult,"sn":"RETRY","box":function ($v) { return H5.box($v, LD49.CompleteUI.CompleteUIResult, System.Enum.toStringFn(LD49.CompleteUI.CompleteUIResult));}}]}; }, $n);
    $m("LD49.Goal", function () { return {"nested":[Function],"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[5].Scene,$n[6].Vector2,$n[2].Single,$n[0].Vehicle],"pi":[{"n":"scene","pt":$n[5].Scene,"ps":0},{"n":"position","pt":$n[6].Vector2,"ps":1},{"n":"rotation","pt":$n[2].Single,"ps":2},{"n":"player","pt":$n[0].Vehicle,"ps":3}],"sn":"ctor"},{"a":2,"n":"Update","t":8,"sn":"Update","rt":$n[2].Void},{"a":2,"n":"DISTANCE","is":true,"t":4,"rt":$n[2].Single,"sn":"DISTANCE","box":function ($v) { return H5.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"GOAL_LENGTH","is":true,"t":4,"rt":$n[2].Int32,"sn":"GOAL_LENGTH","box":function ($v) { return H5.box($v, System.Int32);}},{"a":2,"n":"GOAL_WIDTH","is":true,"t":4,"rt":$n[2].Int32,"sn":"GOAL_WIDTH","box":function ($v) { return H5.box($v, System.Int32);}},{"a":2,"n":"GameObj","t":4,"rt":$n[5].GameObject,"sn":"GameObj"},{"a":2,"n":"TRAILER_OFFSET","is":true,"t":4,"rt":$n[6].Vector2,"sn":"TRAILER_OFFSET"},{"a":2,"n":"TRUCK_OFFSET","is":true,"t":4,"rt":$n[6].Vector2,"sn":"TRUCK_OFFSET"},{"a":1,"n":"_hasBeenReached","t":4,"rt":$n[2].Boolean,"sn":"_hasBeenReached","box":function ($v) { return H5.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"_player","t":4,"rt":$n[0].Vehicle,"sn":"_player"},{"a":1,"n":"_sprite","t":4,"rt":$n[5].Sprite,"sn":"_sprite"},{"a":2,"n":"OnGoalReached","t":2,"ad":{"a":2,"n":"add_OnGoalReached","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addOnGoalReached","rt":$n[2].Void,"p":[Function]},"r":{"a":2,"n":"remove_OnGoalReached","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeOnGoalReached","rt":$n[2].Void,"p":[Function]}}]}; }, $n);
    $m("LD49.LeaderboardEntryUI", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].UIElement,$n[4].LeaderboardEntry],"pi":[{"n":"parent","pt":$n[1].UIElement,"ps":0},{"n":"entry","pt":$n[4].LeaderboardEntry,"ps":1}],"sn":"ctor"}]}; }, $n);
    $m("LD49.LevelProperties", function () { return {"att":1048576,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"LEVELS","is":true,"t":4,"rt":System.Array.type(LD49.LevelProperties),"sn":"LEVELS"},{"a":2,"n":"goalPosition","t":4,"rt":$n[6].Vector2,"sn":"goalPosition"},{"a":2,"n":"goalRotation","t":4,"rt":$n[2].Single,"sn":"goalRotation","box":function ($v) { return H5.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"level","t":4,"rt":$n[2].Int32,"sn":"level","box":function ($v) { return H5.box($v, System.Int32);}},{"a":2,"n":"levelDescription","t":4,"rt":$n[2].String,"sn":"levelDescription"},{"a":2,"n":"levelTitle","t":4,"rt":$n[2].String,"sn":"levelTitle"},{"a":2,"n":"trailerRotation","t":4,"rt":$n[2].Single,"sn":"trailerRotation","box":function ($v) { return H5.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"trailerStart","t":4,"rt":$n[6].Vector2,"sn":"trailerStart"},{"a":2,"n":"truckRotation","t":4,"rt":$n[2].Single,"sn":"truckRotation","box":function ($v) { return H5.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"truckStart","t":4,"rt":$n[6].Vector2,"sn":"truckStart"}]}; }, $n);
    $m("LD49.LevelUI", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].UIElement,$n[0].LevelProperties],"pi":[{"n":"parent","pt":$n[1].UIElement,"ps":0},{"n":"level","pt":$n[0].LevelProperties,"ps":1}],"sn":"ctor"},{"a":2,"n":"FadeOut","t":8,"sn":"FadeOut","rt":$n[2].Void},{"a":1,"n":"_levelInfo","t":4,"rt":$n[7].List$1(JuiceboxEngine.GUI.Text),"sn":"_levelInfo"}]}; }, $n);
    $m("LD49.MainMenu", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[8].ResourceManager],"pi":[{"n":"manager","pt":$n[8].ResourceManager,"ps":0}],"sn":"ctor"},{"a":1,"n":"AskUsername","t":8,"pi":[{"n":"msg","pt":$n[2].String,"ps":0}],"sn":"AskUsername","rt":$n[2].Void,"p":[$n[2].String]},{"ov":true,"a":3,"n":"FinalizeScene","t":8,"sn":"FinalizeScene","rt":$n[2].Void},{"a":1,"n":"GetLeaderboard","t":8,"pi":[{"n":"task","pt":$n[4].PlayfabTask,"ps":0}],"sn":"GetLeaderboard","rt":$n[2].Void,"p":[$n[4].PlayfabTask]},{"ov":true,"a":3,"n":"InitializeScene","t":8,"sn":"InitializeScene","rt":$n[2].Void},{"ov":true,"a":3,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[2].Void},{"a":1,"n":"Login","t":8,"sn":"Login","rt":$n[2].Void},{"a":1,"n":"LoginFinished","t":8,"pi":[{"n":"task","pt":$n[4].PlayfabTask,"ps":0}],"sn":"LoginFinished","rt":$n[2].Void,"p":[$n[4].PlayfabTask]},{"a":1,"n":"Opening","t":8,"sn":"Opening","rt":$n[3].IEnumerator},{"ov":true,"a":3,"n":"PreUpdate","t":8,"sn":"PreUpdate","rt":$n[2].Void},{"a":1,"n":"ResumeGame","t":8,"pi":[{"n":"selected","pt":$n[2].Int32,"ps":0}],"sn":"ResumeGame","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":1,"n":"SelectLevel","t":8,"pi":[{"n":"selected","pt":$n[2].Int32,"ps":0}],"sn":"SelectLevel","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":1,"n":"UpdateUsername","t":8,"pi":[{"n":"task","pt":$n[4].PlayfabTask,"ps":0}],"sn":"UpdateUsername","rt":$n[2].Void,"p":[$n[4].PlayfabTask]},{"a":1,"n":"_highestLevel","t":4,"rt":$n[2].Int32,"sn":"_highestLevel","box":function ($v) { return H5.box($v, System.Int32);}},{"a":1,"n":"_lbEntries","t":4,"rt":$n[7].List$1(LD49.LeaderboardEntryUI),"sn":"_lbEntries"},{"a":1,"n":"_levelName","t":4,"rt":$n[1].Text,"sn":"_levelName"},{"a":1,"n":"_loginID","t":4,"rt":$n[2].String,"sn":"_loginID"},{"a":1,"n":"_logo","t":4,"rt":$n[1].Image,"sn":"_logo"},{"a":1,"n":"_nameText","t":4,"rt":$n[1].Text,"sn":"_nameText"},{"a":1,"n":"_play","t":4,"rt":$n[1].Text,"sn":"_play"},{"a":1,"n":"_selectedLevel","t":4,"rt":$n[2].Int32,"sn":"_selectedLevel","box":function ($v) { return H5.box($v, System.Int32);}}]}; }, $n);
    $m("LD49.MainScene", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[8].ResourceManager,$n[2].Int32],"pi":[{"n":"manager","pt":$n[8].ResourceManager,"ps":0},{"n":"level","pt":$n[2].Int32,"ps":1}],"sn":"ctor"},{"a":1,"n":"Colliding","t":8,"pi":[{"n":"position","pt":$n[6].Vector2,"ps":0}],"sn":"Colliding","rt":$n[2].Boolean,"p":[$n[6].Vector2],"box":function ($v) { return H5.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"EndSequence","t":8,"pi":[{"n":"result","pt":$n[0].CompleteUI.CompleteUIResult,"ps":0}],"sn":"EndSequence","rt":$n[2].Void,"p":[$n[0].CompleteUI.CompleteUIResult]},{"ov":true,"a":3,"n":"FinalizeScene","t":8,"sn":"FinalizeScene","rt":$n[2].Void},{"a":2,"n":"GetCameraTargetPos","t":8,"sn":"GetCameraTargetPos","rt":$n[6].Vector2},{"a":1,"n":"GoalReached","t":8,"sn":"GoalReached","rt":$n[2].Void},{"ov":true,"a":3,"n":"InitializeScene","t":8,"sn":"InitializeScene","rt":$n[2].Void},{"ov":true,"a":3,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[2].Void},{"a":1,"n":"OnLeaderboardComplete","t":8,"pi":[{"n":"task","pt":$n[4].PlayfabTask,"ps":0}],"sn":"OnLeaderboardComplete","rt":$n[2].Void,"p":[$n[4].PlayfabTask]},{"ov":true,"a":3,"n":"PreUpdate","t":8,"sn":"PreUpdate","rt":$n[2].Void},{"a":1,"n":"StartSequence","t":8,"sn":"StartSequence","rt":$n[3].IEnumerator},{"a":1,"n":"_canTakeControl","t":4,"rt":$n[2].Boolean,"sn":"_canTakeControl","box":function ($v) { return H5.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"_completeUI","t":4,"rt":$n[0].CompleteUI,"sn":"_completeUI"},{"a":1,"n":"_goal","t":4,"rt":$n[0].Goal,"sn":"_goal"},{"a":1,"n":"_hasControl","t":4,"rt":$n[2].Boolean,"sn":"_hasControl","box":function ($v) { return H5.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"_level","t":4,"rt":$n[0].LevelProperties,"sn":"_level"},{"a":1,"n":"_mapBytes","t":4,"rt":$n[2].Array.type(System.Byte),"sn":"_mapBytes"},{"a":1,"n":"_soundFX","t":4,"rt":$n[9].AudioComponent,"sn":"_soundFX"},{"a":1,"n":"_tileMap","t":4,"rt":$n[5].TileMap,"sn":"_tileMap"},{"a":1,"n":"_time","t":4,"rt":$n[2].Single,"sn":"_time","box":function ($v) { return H5.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"_timer","t":4,"rt":$n[1].Text,"sn":"_timer"},{"a":1,"n":"_touch","t":4,"rt":$n[0].TouchUI,"sn":"_touch"},{"a":1,"n":"_trailer","t":4,"rt":$n[0].Vehicle,"sn":"_trailer"},{"a":1,"n":"_truck","t":4,"rt":$n[0].Vehicle,"sn":"_truck"},{"a":1,"n":"_ui","t":4,"rt":$n[0].LevelUI,"sn":"_ui"}]}; }, $n);
    $m("LD49.Program", function () { return {"att":1048576,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"FormatMS","is":true,"t":8,"pi":[{"n":"ms","pt":$n[2].Int32,"ps":0}],"sn":"FormatMS","rt":$n[2].String,"p":[$n[2].Int32]},{"a":1,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[2].Void}]}; }, $n);
    $m("LD49.TouchUI", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].UIElement],"pi":[{"n":"parent","pt":$n[1].UIElement,"ps":0}],"sn":"ctor"},{"a":1,"n":"UpdateChild","t":8,"pi":[{"n":"img","pt":$n[1].Image,"ps":0}],"sn":"UpdateChild","rt":$n[2].Void,"p":[$n[1].Image]},{"ov":true,"a":2,"n":"UpdateElement","t":8,"sn":"UpdateElement","rt":$n[2].Void},{"a":1,"n":"_backward","t":4,"rt":$n[1].Image,"sn":"_backward"},{"a":1,"n":"_forward","t":4,"rt":$n[1].Image,"sn":"_forward"},{"a":1,"n":"_left","t":4,"rt":$n[1].Image,"sn":"_left"},{"a":1,"n":"_right","t":4,"rt":$n[1].Image,"sn":"_right"}]}; }, $n);
    $m("LD49.Vehicle", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[5].Scene,$n[2].Int32,$n[6].Vector2,$n[2].Single],"pi":[{"n":"scene","pt":$n[5].Scene,"ps":0},{"n":"vehicle","pt":$n[2].Int32,"ps":1},{"n":"position","pt":$n[6].Vector2,"ps":2},{"n":"rotation","pt":$n[2].Single,"ps":3}],"sn":"ctor"},{"a":2,"n":"AttachVehicle","t":8,"pi":[{"n":"vehicle","pt":$n[0].Vehicle,"ps":0}],"sn":"AttachVehicle","rt":$n[2].Void,"p":[$n[0].Vehicle]},{"a":2,"n":"Control","t":8,"sn":"Control","rt":$n[2].Void},{"a":2,"n":"GetWorldAnchorPoint","t":8,"sn":"GetWorldAnchorPoint","rt":$n[6].Vector2},{"a":2,"n":"GetWorldAttachPoint","t":8,"sn":"GetWorldAttachPoint","rt":$n[6].Vector2},{"a":1,"n":"GetWorldWheelbasePoint","t":8,"sn":"GetWorldWheelbasePoint","rt":$n[6].Vector2},{"a":1,"n":"TrailParent","t":8,"sn":"TrailParent","rt":$n[2].Void},{"a":2,"n":"Update","t":8,"sn":"Update","rt":$n[2].Void},{"a":2,"n":"Attached","t":16,"rt":$n[0].Vehicle,"g":{"a":2,"n":"get_Attached","t":8,"rt":$n[0].Vehicle,"fg":"Attached"},"s":{"a":1,"n":"set_Attached","t":8,"p":[$n[0].Vehicle],"rt":$n[2].Void,"fs":"Attached"},"fn":"Attached"},{"a":2,"n":"GameObj","t":16,"rt":$n[5].GameObject,"g":{"a":2,"n":"get_GameObj","t":8,"rt":$n[5].GameObject,"fg":"GameObj"},"s":{"a":1,"n":"set_GameObj","t":8,"p":[$n[5].GameObject],"rt":$n[2].Void,"fs":"GameObj"},"fn":"GameObj"},{"a":2,"n":"Locked","t":16,"rt":$n[2].Boolean,"g":{"a":2,"n":"get_Locked","t":8,"rt":$n[2].Boolean,"fg":"Locked","box":function ($v) { return H5.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":1,"n":"set_Locked","t":8,"p":[$n[2].Boolean],"rt":$n[2].Void,"fs":"Locked"},"fn":"Locked"},{"a":2,"n":"Parent","t":16,"rt":$n[0].Vehicle,"g":{"a":2,"n":"get_Parent","t":8,"rt":$n[0].Vehicle,"fg":"Parent"},"s":{"a":1,"n":"set_Parent","t":8,"p":[$n[0].Vehicle],"rt":$n[2].Void,"fs":"Parent"},"fn":"Parent"},{"a":2,"n":"Position","t":16,"rt":$n[6].Vector2,"g":{"a":2,"n":"get_Position","t":8,"rt":$n[6].Vector2,"fg":"Position"},"s":{"a":1,"n":"set_Position","t":8,"p":[$n[6].Vector2],"rt":$n[2].Void,"fs":"Position"},"fn":"Position"},{"a":2,"n":"Rotation","t":16,"rt":$n[2].Single,"g":{"a":2,"n":"get_Rotation","t":8,"rt":$n[2].Single,"fg":"Rotation","box":function ($v) { return H5.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"s":{"a":1,"n":"set_Rotation","t":8,"p":[$n[2].Single],"rt":$n[2].Void,"fs":"Rotation"},"fn":"Rotation"},{"a":1,"n":"_props","t":4,"rt":$n[0].VehicleProperties,"sn":"_props"},{"a":1,"backing":true,"n":"<Attached>k__BackingField","t":4,"rt":$n[0].Vehicle,"sn":"Attached"},{"a":1,"backing":true,"n":"<GameObj>k__BackingField","t":4,"rt":$n[5].GameObject,"sn":"GameObj"},{"a":1,"backing":true,"n":"<Locked>k__BackingField","t":4,"rt":$n[2].Boolean,"sn":"Locked","box":function ($v) { return H5.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"backing":true,"n":"<Parent>k__BackingField","t":4,"rt":$n[0].Vehicle,"sn":"Parent"},{"a":1,"backing":true,"n":"<Position>k__BackingField","t":4,"rt":$n[6].Vector2,"sn":"Position"},{"a":1,"backing":true,"n":"<Rotation>k__BackingField","t":4,"rt":$n[2].Single,"sn":"Rotation","box":function ($v) { return H5.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    $m("LD49.VehicleProperties", function () { return {"att":1048576,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"VEHICLES","is":true,"t":4,"rt":System.Array.type(LD49.VehicleProperties),"sn":"VEHICLES"},{"a":2,"n":"anchorPoint","t":4,"rt":$n[6].Vector2,"sn":"anchorPoint"},{"a":2,"n":"attachPoint","t":4,"rt":$n[6].Vector2,"sn":"attachPoint"},{"a":2,"n":"name","t":4,"rt":$n[2].String,"sn":"name"},{"a":2,"n":"spriteHeight","t":4,"rt":$n[2].Int32,"sn":"spriteHeight","box":function ($v) { return H5.box($v, System.Int32);}},{"a":2,"n":"spriteLayers","t":4,"rt":$n[2].Int32,"sn":"spriteLayers","box":function ($v) { return H5.box($v, System.Int32);}},{"a":2,"n":"spriteWidth","t":4,"rt":$n[2].Int32,"sn":"spriteWidth","box":function ($v) { return H5.box($v, System.Int32);}},{"a":2,"n":"wheelBase","t":4,"rt":$n[6].Vector2,"sn":"wheelBase"}]}; }, $n);
});