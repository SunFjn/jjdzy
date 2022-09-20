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
var YuanXiaoGrid = (function (_super) {
    __extends(YuanXiaoGrid, _super);
    function YuanXiaoGrid() {
        return _super.call(this) || this;
    }
    YuanXiaoGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_YuanXiao", "YuanXiaoGrid"));
    };
    YuanXiaoGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YuanXiaoGrid.prototype.setVo = function (vo, count) {
        var self = this;
        self.numLb.text = "剩余" + count;
        self.grid.isShowEff = self.grid.tipEnabled = true;
        self.grid.vo = vo;
        self.title = vo.name + "*" + vo.count;
    };
    YuanXiaoGrid.prototype.clean = function () {
        var self = this;
        self.grid.clean();
    };
    YuanXiaoGrid.URL = "ui://ajaichn8wtx2o";
    return YuanXiaoGrid;
}(fairygui.GLabel));
__reflect(YuanXiaoGrid.prototype, "YuanXiaoGrid");
