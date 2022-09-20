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
var View_GCBZ_BattleReport = (function (_super) {
    __extends(View_GCBZ_BattleReport, _super);
    function View_GCBZ_BattleReport() {
        var _this = _super.call(this) || this;
        _this.battleReportData = [];
        _this.childrenCreated();
        return _this;
    }
    View_GCBZ_BattleReport.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("GCBZ", "View_GCBZ_BattleReport").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_GCBZ_BattleReport.prototype.renderHandler = function (index, item) {
        item.setVo(this.battleReportData[index]);
    };
    View_GCBZ_BattleReport.prototype.updateShow = function () {
        var self = this;
        self.battleReportData = GGlobal.modelgcbz.battleReportData;
        self.list.numItems = self.battleReportData.length;
    };
    View_GCBZ_BattleReport.prototype.onShown = function () {
        var self = this;
        self.updateShow();
        GGlobal.control.listen(UIConst.GCBZ_BATTLEREPORT, self.updateShow, self);
        GGlobal.modelgcbz.CG_AttackCity_openReportUI_12069();
    };
    View_GCBZ_BattleReport.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.GCBZ_BATTLEREPORT, self.updateShow, self);
    };
    View_GCBZ_BattleReport.URL = "ui://vgiijkm8r5gep";
    return View_GCBZ_BattleReport;
}(UIModalPanel));
__reflect(View_GCBZ_BattleReport.prototype, "View_GCBZ_BattleReport");
