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
var FengHuoLYUI = (function (_super) {
    __extends(FengHuoLYUI, _super);
    function FengHuoLYUI() {
        return _super.call(this) || this;
    }
    FengHuoLYUI.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLYUI"));
    };
    FengHuoLYUI.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        sf.n0 = (sf.getChild("n0"));
        sf.n2 = (sf.getChild("n2"));
        sf.n4 = (sf.getChild("n4"));
        sf.n6 = (sf.getChild("n6"));
        sf.n7 = (sf.getChild("n7"));
    };
    FengHuoLYUI.prototype.onExite = function () {
        var sf = this;
        ViewAlert.show("退出后30秒不可进入\n是否退出", Handler.create(sf, sf.exiteAct), ViewAlert.OKANDCANCEL);
    };
    FengHuoLYUI.prototype.exiteAct = function () {
        GGlobal.modelFengHuoLY.exite();
    };
    FengHuoLYUI.prototype.CameraHD = function () {
        var sf = this;
        GGlobal.modelFengHuoLY.camera = sf.n0.selected ? 1 : 0;
    };
    FengHuoLYUI.prototype.onRank = function () {
        GGlobal.layerMgr.open(UIConst.FHLY_RANK);
    };
    FengHuoLYUI.prototype.addRedot = function () {
        this.n4.checkNotice = GGlobal.reddot.checkCondition(UIConst.FHLY);
    };
    FengHuoLYUI.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, fairygui.GRoot.inst.height - this.height);
    };
    FengHuoLYUI.prototype.enter = function () {
        var sf = this;
        var b = GGlobal.layerMgr.UI_MainBottom;
        b.addChild(this);
        sf.resetPosition();
        sf.n0.addClickListener(sf.CameraHD, sf);
        sf.n2.addClickListener(sf.onExite, sf);
        sf.n4.addClickListener(sf.onRank, sf);
        sf.addRedot();
        GGlobal.reddot.listen(UIConst.FHLY, sf.addRedot, sf);
    };
    FengHuoLYUI.prototype.exite = function () {
        var sf = this;
        this.removeFromParent();
        sf.n0.removeClickListener(sf.CameraHD, sf);
        sf.n2.removeClickListener(sf.onExite, sf);
        sf.n4.removeClickListener(sf.onRank, sf);
        GGlobal.reddot.remove(UIConst.FHLY, sf.addRedot, sf);
    };
    FengHuoLYUI.URL = "ui://edvdots4srrs0";
    return FengHuoLYUI;
}(fairygui.GComponent));
__reflect(FengHuoLYUI.prototype, "FengHuoLYUI");
