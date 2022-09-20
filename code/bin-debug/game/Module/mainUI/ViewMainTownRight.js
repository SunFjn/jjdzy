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
var ViewMainTownRight = (function (_super) {
    __extends(ViewMainTownRight, _super);
    function ViewMainTownRight() {
        return _super.call(this) || this;
    }
    ViewMainTownRight.prototype.initUI = function () {
        this.bg1 = new fairygui.GLoader();
        this.bg1.setSize(88, 357);
        this.bg1.fill = fairygui.LoaderFillType.ScaleFree;
        this.bg1.url = "ui://7gxkx46ww6ro5n";
        this.bg1.setXY(0, 6);
        this.bg1.visible = false;
        this.addChild(this.bg1);
        _super.prototype.initUI.call(this);
        this.btnContainer.setXY(5, 6);
        this.LayoutType = fairygui.GroupLayoutType.Vertical;
    };
    ViewMainTownRight.prototype.resetPosition = function () {
        this.setXY(fairygui.GRoot.inst.width - 100 + GGlobal.layerMgr.offx, fairygui.GRoot.inst.height - 320);
    };
    Object.defineProperty(ViewMainTownRight, "instance", {
        get: function () {
            if (!ViewMainTownRight._instance)
                ViewMainTownRight._instance = new ViewMainTownRight();
            return ViewMainTownRight._instance;
        },
        enumerable: true,
        configurable: true
    });
    return ViewMainTownRight;
}(BaseSceneUI));
__reflect(ViewMainTownRight.prototype, "ViewMainTownRight");
