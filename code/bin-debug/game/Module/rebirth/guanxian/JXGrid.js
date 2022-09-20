/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var JXGrid = (function (_super) {
    __extends(JXGrid, _super);
    function JXGrid() {
        return _super.call(this) || this;
    }
    JXGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "JXGrid"));
    };
    JXGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.bg = (this.getChild("bg"));
        this.iconImg = (this.getChild("iconImg"));
        this.nameLv = (this.getChild("nameLv"));
        this.imgAct = (this.getChild("imgAct"));
    };
    JXGrid.prototype.setCFG = function (item) {
        if (item) {
            this.nameLv.text = item.name;
            IconUtil.setImg(this.iconImg, Enum_Path.ICON70_URL + item.tupian + ".png");
            IconUtil.setImg(this.bg, Enum_Path.ICON70_URL + "BmG_" + item.pinzhi + ".png");
        }
        else {
            this.nameLv.text = '';
        }
    };
    JXGrid.URL = "ui://dllc71i9g7t31n";
    return JXGrid;
}(fairygui.GComponent));
__reflect(JXGrid.prototype, "JXGrid");
