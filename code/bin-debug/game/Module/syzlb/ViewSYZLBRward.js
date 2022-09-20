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
var ViewSYZLBRward = (function (_super) {
    __extends(ViewSYZLBRward, _super);
    function ViewSYZLBRward() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewSYZLBRward.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ViewSYZLBRward"));
    };
    ViewSYZLBRward.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("syzlb", "ViewSYZLBRward").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.listRew.callbackThisObj = s;
        s.listRew.itemRenderer = s.renderRew;
        s.isShowOpenAnimation = false;
        s.isShowMask = false;
        _super.prototype.childrenCreated.call(this);
    };
    ViewSYZLBRward.prototype.onShown = function () {
        var s = this;
        s.update();
    };
    ViewSYZLBRward.prototype.onHide = function () {
        var s = this;
        s.listRew.numItems = 0;
    };
    ViewSYZLBRward.prototype.resetPosition = function () {
        _super.prototype.resetPosition.call(this);
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, 100);
    };
    ViewSYZLBRward.prototype.update = function () {
        var s = this;
        var m = GGlobal.model_Syzlb;
        s.lb.text = "第" + m.batId % 1000 + "战";
        var cfg = Config.syzlb_762[m.batId];
        s.rewArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.tgjl));
        s.listRew.numItems = s.rewArr.length;
    };
    ViewSYZLBRward.prototype.renderRew = function (index, obj) {
        obj.tipEnabled = true;
        obj.isShowEff = true;
        obj.vo = this.rewArr[index];
    };
    ViewSYZLBRward.URL = "ui://3o8q23uuqqnwc";
    return ViewSYZLBRward;
}(UIModalPanel));
__reflect(ViewSYZLBRward.prototype, "ViewSYZLBRward");
