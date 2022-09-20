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
var ViewMainTownTop = (function (_super) {
    __extends(ViewMainTownTop, _super);
    function ViewMainTownTop() {
        return _super.call(this) || this;
    }
    ViewMainTownTop.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var a = this;
        a.LayoutType = fairygui.GroupLayoutType.Horizontal;
        a.btnContainer.setXY(20, 0);
    };
    ViewMainTownTop.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign);
    };
    Object.defineProperty(ViewMainTownTop, "instance", {
        get: function () {
            if (!ViewMainTownTop._instance)
                ViewMainTownTop._instance = new ViewMainTownTop();
            return ViewMainTownTop._instance;
        },
        enumerable: true,
        configurable: true
    });
    return ViewMainTownTop;
}(BaseSceneUI));
__reflect(ViewMainTownTop.prototype, "ViewMainTownTop");
