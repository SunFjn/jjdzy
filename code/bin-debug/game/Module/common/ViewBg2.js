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
var ViewBg2 = (function (_super) {
    __extends(ViewBg2, _super);
    function ViewBg2() {
        return _super.call(this) || this;
    }
    ViewBg2.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewBg2"));
    };
    ViewBg2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.iconImg = (this.getChild("iconImg"));
        this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    ViewBg2.prototype.onAdd = function () {
        // ImageLoader.instance.loader(Enum_Path.BACK_URL + "bg2.jpg", this.iconImg);
        IconUtil.setImg(this.iconImg, Enum_Path.BACK_URL + "bg2.jpg");
    };
    ViewBg2.prototype.onRemove = function () {
        IconUtil.setImg(this.iconImg, null);
    };
    ViewBg2.URL = "ui://jvxpx9em9c6t73";
    return ViewBg2;
}(fairygui.GComponent));
__reflect(ViewBg2.prototype, "ViewBg2");
