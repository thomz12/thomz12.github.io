H5.assemblyVersion("LD51","1.0.0.0");
H5.assembly("LD51", function ($asm, globals) {
    "use strict";


    var $m = H5.setMetadata,
        $n = ["JuiceboxEngine.Resources","System"];
    $m("LD51.MainScene", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].ResourceManager],"pi":[{"n":"manager","pt":$n[0].ResourceManager,"ps":0}],"sn":"ctor"},{"ov":true,"a":3,"n":"FinalizeScene","t":8,"sn":"FinalizeScene","rt":$n[1].Void},{"ov":true,"a":3,"n":"InitializeScene","t":8,"sn":"InitializeScene","rt":$n[1].Void},{"ov":true,"a":3,"n":"PostUpdate","t":8,"sn":"PostUpdate","rt":$n[1].Void},{"ov":true,"a":3,"n":"PreUpdate","t":8,"sn":"PreUpdate","rt":$n[1].Void}]}; }, $n);
    $m("LD51.Program", function () { return {"att":1048576,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[1].Void}]}; }, $n);
});
