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
var WindowFrame1 = (function (_super) {
    __extends(WindowFrame1, _super);
    function WindowFrame1() {
        return _super.call(this) || this;
    }
    WindowFrame1.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "WindowFrame1"));
    };
    WindowFrame1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.backImg = (this.getChild("backImg"));
        this.bgImg = (this.getChild("bgImg"));
        this.closeButton = (this.getChild("closeButton"));
        IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "bg.jpg");
        IconUtil.setImg(this.bgImg, Enum_Path.BACK_URL + "frameBg3.jpg");
        // this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
        // this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.displayObject.cacheAsBitmap = true;
    };
    WindowFrame1.URL = "ui://jvxpx9emv3t93c3";
    return WindowFrame1;
}(fairygui.GLabel));
__reflect(WindowFrame1.prototype, "WindowFrame1");
