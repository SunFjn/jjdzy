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
var ViewCaoCaoBox = (function (_super) {
    __extends(ViewCaoCaoBox, _super);
    function ViewCaoCaoBox() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        _this.loadRes();
        return _this;
    }
    ViewCaoCaoBox.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("CaoCaoLaiXi", "ViewCaoCaoBox").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewCaoCaoBox.prototype.showAward = function (awards) {
        var self = this;
        ConfigHelp.cleanGridview(self.grids);
        self.grids = ConfigHelp.addGridview(awards, self, 132, 140, true, false, 3, 120);
        ConfigHelp.centerGrid(self.grids, 60, 140, 4, 120);
    };
    ViewCaoCaoBox.prototype.onShown = function () {
        var self = this;
        var id = self._args.rank;
        self.lbCondition.text = " 排名达到第" + id + "名可领取";
        var vos = ConfigHelp.makeItemListArr(self._args.data);
        self.showAward(vos);
    };
    ViewCaoCaoBox.prototype.onHide = function () {
        var self = this;
        ConfigHelp.cleanGridview(self.grids);
        GGlobal.layerMgr.close(UIConst.CAOCAO_LAIXI_BOX);
    };
    ViewCaoCaoBox.URL = "ui://n6fub9ddeq415";
    return ViewCaoCaoBox;
}(UIModalPanel));
__reflect(ViewCaoCaoBox.prototype, "ViewCaoCaoBox");
