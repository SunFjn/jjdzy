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
var XFZDGrid = (function (_super) {
    __extends(XFZDGrid, _super);
    function XFZDGrid() {
        return _super.call(this) || this;
    }
    XFZDGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_XFZD", "XFZDGrid"));
    };
    XFZDGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.drawImg.visible = false;
    };
    XFZDGrid.prototype.setVo = function (vo) {
        var self = this;
        self.grid.isShowEff = true;
        self.grid.tipEnabled = true;
        self.grid.vo = vo;
    };
    XFZDGrid.prototype.setDraw = function (value) {
        this.drawImg.visible = value;
    };
    XFZDGrid.prototype.clean = function () {
        var self = this;
        self.grid.clean();
        self.drawImg.visible = false;
    };
    XFZDGrid.URL = "ui://nshesk1rmm9s8";
    return XFZDGrid;
}(fairygui.GComponent));
__reflect(XFZDGrid.prototype, "XFZDGrid");
