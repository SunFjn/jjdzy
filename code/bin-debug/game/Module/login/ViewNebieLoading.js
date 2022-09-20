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
/**新手加载页*/ var ViewNebieLoading = (function (_super) {
    __extends(ViewNebieLoading, _super);
    function ViewNebieLoading() {
        var _this = _super.call(this) || this;
        _this.start = 0;
        _this.isShowOpenAnimation = false;
        _this.setSkin("createRole", "createRole_atlas0", "ViewNebieLoading");
        return _this;
    }
    ViewNebieLoading.createInstance = function () {
        return (fairygui.UIPackage.createObject("createRole", "ViewNebieLoading"));
    };
    ViewNebieLoading.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var sc = LayerManager.getFullScreenSc();
        this.setScale(sc, sc);
        var xx = (App.stage.stageWidth - this.width * sc) >> 1;
        var yy = (App.stage.stageHeight - this.height * sc) >> 1;
        this.setXY(xx, yy); //不考虑横屏
    };
    ViewNebieLoading.prototype.drawBlackBg = function () {
        var shap = new fairygui.GGraph();
        shap.setSize(App.stage.stageWidth, App.stage.stageHeight);
        shap.drawRect(0, 0, 0, 0x0, 1);
        this._bgGraph = shap;
        GGlobal.main.addChildAt(shap.displayObject, 2);
    };
    ViewNebieLoading.prototype.onShown = function () {
        this.start = egret.getTimer();
        this.drawBlackBg();
        IconUtil.setImg(this.n1, Enum_Path.BACK_URL + "jjjad.jpg");
        this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
    };
    ViewNebieLoading.prototype.onHide = function () {
        if (this._bgGraph)
            GGlobal.main.removeChild(this._bgGraph.displayObject);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
        RESManager.destoryRes("createRole_atlas0");
        this.clearTextureAndUIPackage();
        IconUtil.setImg(this.n1, null);
    };
    ViewNebieLoading.prototype.onframe = function () {
        var now = egret.getTimer();
        var len = (now - this.start) / 100 >> 0;
        var str = "汉建安十六年冬，孙权趁刘备入蜀之际意图挟持阿斗换回荆州...";
        if (str.length >= len) {
            this.n0.text = str.slice(0, len);
        }
    };
    ViewNebieLoading.URL = "ui://hpazy1telkx8z";
    return ViewNebieLoading;
}(UIPanelBase));
__reflect(ViewNebieLoading.prototype, "ViewNebieLoading");
