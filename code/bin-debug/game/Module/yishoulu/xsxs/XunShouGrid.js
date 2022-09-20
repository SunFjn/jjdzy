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
var XunShouGrid = (function (_super) {
    __extends(XunShouGrid, _super);
    function XunShouGrid() {
        return _super.call(this) || this;
    }
    XunShouGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("YiShouLu", "XuShouGrid"));
    };
    XunShouGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    XunShouGrid.prototype.setVo = function (vo) {
        var self = this;
        self.grid.isShowEff = true;
        self.grid.tipEnabled = true;
        self.grid.vo = vo;
        self.showImg.visible = !vo;
    };
    XunShouGrid.prototype.clean = function () {
        this.grid.clean();
    };
    XunShouGrid.URL = "ui://7y83phvnjw42m";
    return XunShouGrid;
}(fairygui.GLabel));
__reflect(XunShouGrid.prototype, "XunShouGrid");
