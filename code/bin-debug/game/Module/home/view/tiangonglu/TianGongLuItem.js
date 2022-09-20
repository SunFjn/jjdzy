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
var TianGongLuItem = (function (_super) {
    __extends(TianGongLuItem, _super);
    function TianGongLuItem() {
        return _super.call(this) || this;
    }
    TianGongLuItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "TianGongLuItem"));
    };
    TianGongLuItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    TianGongLuItem.prototype.showBg = function (v) {
        this.bg.visible = v;
    };
    TianGongLuItem.URL = "ui://y0plc878hvvjc";
    return TianGongLuItem;
}(fairygui.GComponent));
__reflect(TianGongLuItem.prototype, "TianGongLuItem");
