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
var ViewSanGuoDes = (function (_super) {
    __extends(ViewSanGuoDes, _super);
    function ViewSanGuoDes() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        _this.isShowOpenAnimation = false;
        return _this;
    }
    ViewSanGuoDes.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewSanGuoDes"));
    };
    ViewSanGuoDes.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        var a = this;
        a.view = fairygui.UIPackage.createObject("Arena", "ViewSanGuoDes").asCom;
        var b = a.contentPane = a.view;
        this.frame = (b.getChild("frame"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewSanGuoDes.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.SGWS_DESC);
    };
    ViewSanGuoDes.URL = "ui://me1skowl608at";
    return ViewSanGuoDes;
}(UIModalPanel));
__reflect(ViewSanGuoDes.prototype, "ViewSanGuoDes");
