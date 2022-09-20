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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewMainTopUI2 = (function (_super) {
    __extends(ViewMainTopUI2, _super);
    function ViewMainTopUI2() {
        return _super.call(this) || this;
    }
    ViewMainTopUI2.prototype.initUI = function () {
        this.setSize(640, 100);
        _super.prototype.initUI.call(this);
        var a = this;
        a.LayoutType = fairygui.GroupLayoutType.Horizontal;
        a.btnContainer.setXY(20, 0);
        GGlobal.control.listen(Enum_MsgType.ENTER_SCENE, a.aglin, a);
    };
    ViewMainTopUI2.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign - 20);
    };
    Object.defineProperty(ViewMainTopUI2, "instance", {
        get: function () {
            if (!ViewMainTopUI2._instance)
                ViewMainTopUI2._instance = new ViewMainTopUI2();
            return ViewMainTopUI2._instance;
        },
        enumerable: true,
        configurable: true
    });
    return ViewMainTopUI2;
}(BaseSceneUI));
__reflect(ViewMainTopUI2.prototype, "ViewMainTopUI2");
