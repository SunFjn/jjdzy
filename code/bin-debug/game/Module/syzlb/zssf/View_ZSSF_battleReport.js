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
var View_ZSSF_battleReport = (function (_super) {
    __extends(View_ZSSF_battleReport, _super);
    function View_ZSSF_battleReport() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_ZSSF_battleReport.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "View_ZSSF_battleReport"));
    };
    View_ZSSF_battleReport.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("syzlb", "View_ZSSF_battleReport").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        _super.prototype.childrenCreated.call(this);
    };
    View_ZSSF_battleReport.prototype.renderHandler = function (index, item) {
        item.onShown(GGlobal.modelzssf.battleReportArr[index]);
    };
    View_ZSSF_battleReport.prototype.updateShow = function () {
        var self = this;
        self.list.numItems = GGlobal.modelzssf.battleReportArr.length;
    };
    View_ZSSF_battleReport.prototype.onShown = function () {
        var self = this;
        GGlobal.control.listen(UIConst.ZSSF_BATTLEREPORT, self.updateShow, self);
        GGlobal.modelzssf.CG_GuardArea_openReportUI_10915();
    };
    View_ZSSF_battleReport.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.ZSSF_BATTLEREPORT, self.updateShow, self);
    };
    View_ZSSF_battleReport.URL = "ui://3o8q23uucenr1e";
    return View_ZSSF_battleReport;
}(UIModalPanel));
__reflect(View_ZSSF_battleReport.prototype, "View_ZSSF_battleReport");
