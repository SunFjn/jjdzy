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
var frame4 = (function (_super) {
    __extends(frame4, _super);
    function frame4() {
        return _super.call(this) || this;
    }
    frame4.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "frame4"));
    };
    frame4.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.backImg = (this.getChild("backImg"));
        this.closeButton = (this.getChild("closeButton"));
        IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "bg.jpg");
        // this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
        // this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.displayObject.cacheAsBitmap = true;
    };
    frame4.URL = "ui://jvxpx9emfsg93cj";
    return frame4;
}(fairygui.GLabel));
__reflect(frame4.prototype, "frame4");
