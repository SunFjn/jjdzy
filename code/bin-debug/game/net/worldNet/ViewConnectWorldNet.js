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
var ViewConnectWorldNet = (function (_super) {
    __extends(ViewConnectWorldNet, _super);
    function ViewConnectWorldNet() {
        var _this = _super.call(this) || this;
        _this.oldTime = 0;
        _this.loadRes();
        return _this;
    }
    ViewConnectWorldNet.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "ViewConnectWorldNet"));
    };
    ViewConnectWorldNet.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("MainUI", "ViewConnectWorldNet").asCom;
        s.contentPane = s.view;
        s.isShowMask = s.isShowOpenAnimation = false;
        s.tip = (s.view.getChild("tip"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewConnectWorldNet.prototype.timeRun = function () {
        var s = this;
        if (s.index > 3)
            s.index = 0;
        var str = "";
        for (var i = 0; i < s.index; i++) {
            str += "。";
        }
        str = "正在链接中央服" + str;
        s.tip.text = str;
        s.index += 1;
        var now = egret.getTimer();
        if (now - s.oldTime >= 30000) {
            Timer.instance.remove(this.timeRun, this);
            GGlobal.layerMgr.close2(UIConst.CONNECT_WORLD);
            WorldSocketMgr.instance.close(true);
        }
    };
    ViewConnectWorldNet.prototype.onShown = function () {
        var s = this;
        if (s.oldTime <= 0) {
            s.oldTime = egret.getTimer();
            s.index = 0;
            Timer.instance.listen(s.timeRun, s, 200);
        }
    };
    ViewConnectWorldNet.prototype.onHide = function () {
        this.oldTime = 0;
        Timer.instance.remove(this.timeRun, this);
        GGlobal.layerMgr.close(UIConst.CONNECT_WORLD);
    };
    ViewConnectWorldNet.URL = "ui://7gxkx46wrjjf2y";
    return ViewConnectWorldNet;
}(UIModalPanel));
__reflect(ViewConnectWorldNet.prototype, "ViewConnectWorldNet");
