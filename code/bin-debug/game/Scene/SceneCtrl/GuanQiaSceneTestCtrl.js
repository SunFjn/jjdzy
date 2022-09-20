var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GuanQiaSceneTestCtrl = (function (_super) {
    __extends(GuanQiaSceneTestCtrl, _super);
    function GuanQiaSceneTestCtrl() {
        return _super.call(this) || this;
    }
    GuanQiaSceneTestCtrl.prototype.onEnter = function (scene) {
        _super.prototype.onEnter.call(this, scene);
        this.scene = scene;
        //this.createTestRoles();
        // GGlobal.layerMgr.register(-111,ArenaEntry);
        // GGlobal.layerMgr.open(-111);
    };
    GuanQiaSceneTestCtrl.prototype.onExit = function (scene) {
        _super.prototype.onExit.call(this, scene);
        GGlobal.layerMgr.close(-111);
    };
    GuanQiaSceneTestCtrl.prototype.nextBGIndex = function () {
        var list = CFG_TestMapID.getLibList();
        var newindex = GuanQiaSceneTestCtrl.testbgindex + 1;
        if (newindex >= list.length) {
            newindex = 0;
        }
        GuanQiaSceneTestCtrl.testbgindex = newindex;
        var obj = list[newindex];
        this.scene.initWithID(obj.id);
        ViewCommonWarn.text("切换到:" + obj.n);
    };
    GuanQiaSceneTestCtrl.testbgindex = -1;
    return GuanQiaSceneTestCtrl;
}(GuanQiaSceneCtrl));
__reflect(GuanQiaSceneTestCtrl.prototype, "GuanQiaSceneTestCtrl");
