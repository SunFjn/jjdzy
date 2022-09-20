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
var ViewSGRankWard = (function (_super) {
    __extends(ViewSGRankWard, _super);
    function ViewSGRankWard() {
        var _this = _super.call(this) || this;
        _this.maxL = 0;
        _this.loadRes();
        _this.isShowOpenAnimation = false;
        return _this;
    }
    ViewSGRankWard.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewSGRankWard"));
    };
    ViewSGRankWard.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        var a = this;
        a.view = fairygui.UIPackage.createObject("Arena", "ViewSGRankWard").asCom;
        var b = a.contentPane = a.view;
        a.frame = (b.getChild("frame"));
        a.lst = (b.getChild("lst"));
        a.lst.itemRenderer = a.itemRender;
        a.lst.callbackThisObj = a;
        _super.prototype.childrenCreated.call(this);
    };
    ViewSGRankWard.prototype.itemRender = function (i, o) {
        var it = o;
        it.setIndex(i, this.maxL);
    };
    ViewSGRankWard.prototype.onShown = function () {
        var s = this;
        if (s.maxL == 0) {
            var lb = Config.double_230;
            for (var i in lb) {
                s.maxL++;
            }
        }
        s.lst.numItems = s.maxL;
    };
    ViewSGRankWard.prototype.onHide = function () {
        this.lst.numItems = 0;
        GGlobal.layerMgr.close(UIConst.SGWS_RANK);
    };
    ViewSGRankWard.URL = "ui://me1skowl608au";
    return ViewSGRankWard;
}(UIModalPanel));
__reflect(ViewSGRankWard.prototype, "ViewSGRankWard");
