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
var SanGuoItem = (function (_super) {
    __extends(SanGuoItem, _super);
    function SanGuoItem() {
        return _super.call(this) || this;
    }
    SanGuoItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "SanGuoItem"));
    };
    SanGuoItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.nameLb = (this.getChild("nameLb"));
        this.imgYaZhu = (this.getChild("imgYaZhu"));
    };
    SanGuoItem.prototype.setVo = function (v) {
        this.vo = v;
        this.nameLb.text = v.name;
        this.imgYaZhu.visible = v.lun == GGlobal.modelsgws.lun && v.xiazhu == 1;
    };
    SanGuoItem.prototype.resetView = function () {
        this.nameLb.text = "";
        this.imgYaZhu.visible = false;
    };
    SanGuoItem.URL = "ui://me1skowlk8h12g";
    return SanGuoItem;
}(fairygui.GComponent));
__reflect(SanGuoItem.prototype, "SanGuoItem");
