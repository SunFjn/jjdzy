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
var ViewHomeMaidAttr = (function (_super) {
    __extends(ViewHomeMaidAttr, _super);
    function ViewHomeMaidAttr() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewHomeMaidAttr.createInstance = function () {
        return (fairygui.UIPackage.createObject("homeMaid", "ViewHomeMaidAttr"));
    };
    ViewHomeMaidAttr.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("homeMaid", "ViewHomeMaidAttr").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    ViewHomeMaidAttr.prototype.onShown = function () {
        this.updateView();
    };
    ViewHomeMaidAttr.prototype.updateView = function () {
        var s = this;
        var v = s._args;
        s.lbStar.text = ConfigHelp.attrString(JSON.parse(v.cfgStar.attr), "+");
        s.lbLv.text = ConfigHelp.attrString(JSON.parse(v.cfgLv.sx), "+");
    };
    ViewHomeMaidAttr.URL = "ui://qqn3a7vxfs5a6e";
    return ViewHomeMaidAttr;
}(UIModalPanel));
__reflect(ViewHomeMaidAttr.prototype, "ViewHomeMaidAttr");
