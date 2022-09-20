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
var ZhiGouGrid = (function (_super) {
    __extends(ZhiGouGrid, _super);
    function ZhiGouGrid() {
        return _super.call(this) || this;
    }
    ZhiGouGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("zhigou", "ZhiGouGrid"));
    };
    ZhiGouGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
    };
    ZhiGouGrid.prototype.setVo = function (vo) {
        var s = this;
        s.grid.isShowEff = true;
        s.grid.vo = vo;
        s.grid.tipEnabled = true;
    };
    ZhiGouGrid.prototype.clean = function () {
        var s = this;
        s.grid.vo = null;
    };
    ZhiGouGrid.URL = "ui://42sp9wgrrquie";
    return ZhiGouGrid;
}(fairygui.GComponent));
__reflect(ZhiGouGrid.prototype, "ZhiGouGrid");
