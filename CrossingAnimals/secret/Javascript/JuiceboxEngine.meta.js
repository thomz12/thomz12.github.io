Bridge.assembly("JuiceboxEngine", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = ["System"];
    $m("Humper.Base.Vector2", function () { return {"at":[new System.Runtime.Serialization.DataContractAttribute()],"m":[{"at":[new System.Runtime.Serialization.DataMemberAttribute()],"a":2,"n":"X","t":4,"rt":$n[0].Single,"sn":"X","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new System.Runtime.Serialization.DataMemberAttribute()],"a":2,"n":"Y","t":4,"rt":$n[0].Single,"sn":"Y","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
});
