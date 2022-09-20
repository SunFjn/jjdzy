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
var ViewLvBu = (function (_super) {
    __extends(ViewLvBu, _super);
    function ViewLvBu() {
        var _this = _super.call(this) || this;
        _this.isShowOpenAnimation = false;
        _this.setSkin("Boss", "Boss_atlas0", "ViewLvBu");
        return _this;
    }
    ViewLvBu.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ViewLvBu"));
    };
    ViewLvBu.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(LvBuItem.URL, LvBuItem);
        f(LvBuSceneInfo.URL, LvBuSceneInfo);
        f(ChildLvBu.URL, ChildLvBu);
    };
    ViewLvBu.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.frame = (this.getChild("frame"));
        this.n1 = (this.getChild("n1"));
        this.n2 = (this.getChild("n2"));
    };
    ViewLvBu.prototype.onShown = function () {
        var s = this;
        this.n1.open();
    };
    ViewLvBu.prototype.onHide = function () {
        var s = this;
        this.n1.close();
        GGlobal.layerMgr.close(UIConst.LBBOSS);
    };
    ViewLvBu.URL = "ui://47jfyc6esx3836";
    return ViewLvBu;
}(UIPanelBase));
__reflect(ViewLvBu.prototype, "ViewLvBu");
