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
var JinShengGrid = (function (_super) {
    __extends(JinShengGrid, _super);
    function JinShengGrid() {
        return _super.call(this) || this;
    }
    JinShengGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "JinShengGrid"));
    };
    JinShengGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
        this.grid.isShowEff = true;
        this.limitImg = (this.getChild("limitImg"));
    };
    JinShengGrid.prototype.setVo = function (vo, isLimit) {
        this.grid.vo = vo;
        this.grid.tipEnabled = true;
        this.limitImg.visible = isLimit;
    };
    JinShengGrid.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.grid);
    };
    JinShengGrid.URL = "ui://dllc71i9elpxf";
    return JinShengGrid;
}(fairygui.GComponent));
__reflect(JinShengGrid.prototype, "JinShengGrid");
