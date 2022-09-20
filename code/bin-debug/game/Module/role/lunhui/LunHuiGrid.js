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
var LunHuiGrid = (function (_super) {
    __extends(LunHuiGrid, _super);
    function LunHuiGrid() {
        return _super.call(this) || this;
    }
    LunHuiGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "LunHuiGrid"));
    };
    LunHuiGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
    };
    LunHuiGrid.prototype.setVo = function (vo) {
        var s = this;
        s.grid.isShowEff = true;
        s.grid.vo = vo;
        s.grid.tipEnabled = true;
    };
    LunHuiGrid.URL = "ui://ehelf5bhxzzhh";
    return LunHuiGrid;
}(fairygui.GComponent));
__reflect(LunHuiGrid.prototype, "LunHuiGrid");
