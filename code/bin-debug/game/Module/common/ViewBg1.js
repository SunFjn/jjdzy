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
var ViewBg1 = (function (_super) {
    __extends(ViewBg1, _super);
    function ViewBg1() {
        return _super.call(this) || this;
    }
    ViewBg1.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewBg1"));
    };
    ViewBg1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.bg1 = (this.getChild("bg1"));
        this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    ViewBg1.prototype.onAdd = function () {
        // ImageLoader.instance.loader(Enum_Path.BACK_URL + "bg1.png", this.bg1);
        IconUtil.setImg(this.bg1, Enum_Path.BACK_URL + "bg1.png");
    };
    ViewBg1.prototype.onRemove = function () {
        IconUtil.setImg(this.bg1, null);
    };
    ViewBg1.URL = "ui://jvxpx9emd2iu9v";
    return ViewBg1;
}(fairygui.GComponent));
__reflect(ViewBg1.prototype, "ViewBg1");
