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
var MHTab = (function (_super) {
    __extends(MHTab, _super);
    function MHTab() {
        return _super.call(this) || this;
    }
    MHTab.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "MHTab"));
    };
    MHTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.sg = (s.getChild("sg"));
        s.head = (s.getChild("head"));
        s.head.ng.visible = false;
        s.head.g1.y = 90;
    };
    MHTab.prototype.setSel = function (val) {
        this.sg.visible = val;
        this.grayed = !val;
    };
    MHTab.prototype.setVO = function (v) {
        this._vo = v;
        this.head.setdata(RoleUtil.getHeadImg(v.head + ""), -1, v.level, 0, true);
    };
    MHTab.URL = "ui://47jfyc6erjjf14";
    return MHTab;
}(fairygui.GComponent));
__reflect(MHTab.prototype, "MHTab");
