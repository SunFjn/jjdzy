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
var ViewVipDes = (function (_super) {
    __extends(ViewVipDes, _super);
    function ViewVipDes() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewVipDes.createInstance = function () {
        return (fairygui.UIPackage.createObject("vip", "ViewVipDes"));
    };
    ViewVipDes.prototype.childrenCreated = function () {
        GGlobal.createPack("vip");
        this.view = fairygui.UIPackage.createObject("vip", "ViewVipDes").asCom;
        this.contentPane = this.view;
        this.frame = (this.view.getChild("frame"));
        this.lb = (this.view.getChild("lb"));
        _super.prototype.resetPosition.call(this);
        _super.prototype.childrenCreated.call(this);
    };
    ViewVipDes.prototype.onShown = function () {
        var s = this;
        var vip = this._args;
        var lib = Config.VIP_710[vip];
        if (vip > 1)
            var lastLib = Config.VIP_710[vip - 1];
        this.frame.text = "VIP" + (vip - 1) + "特权";
        s.i = 0;
        var str = lib.shuoming;
        this.lb.text = str;
    };
    ViewVipDes.prototype.addTxt = function (str, num, isb) {
        if (num == 0)
            return "";
        var s = this;
        s.i++;
        if (!isb)
            return s.i + ConfigHelp.reTxt(str, num) + "\n";
        return s.i + str + "\n";
    };
    ViewVipDes.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.VIPDESC);
    };
    ViewVipDes.URL = "ui://w4xdcvn7nvyw1";
    return ViewVipDes;
}(UIModalPanel));
__reflect(ViewVipDes.prototype, "ViewVipDes");
