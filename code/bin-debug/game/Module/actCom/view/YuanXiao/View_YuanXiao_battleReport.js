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
var View_YuanXiao_battleReport = (function (_super) {
    __extends(View_YuanXiao_battleReport, _super);
    function View_YuanXiao_battleReport() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_YuanXiao_battleReport.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_YuanXiao", "View_YuanXiao_battleReport"));
    };
    View_YuanXiao_battleReport.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActCom_YuanXiao", "View_YuanXiao_battleReport").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        _super.prototype.childrenCreated.call(this);
    };
    View_YuanXiao_battleReport.prototype.renderHandler = function (index, item) {
        item.onShown(GGlobal.modelyuanxiao.battleReportArr[index]);
    };
    View_YuanXiao_battleReport.prototype.updateShow = function () {
        var self = this;
        self.list.numItems = GGlobal.modelyuanxiao.battleReportArr.length;
    };
    View_YuanXiao_battleReport.prototype.onShown = function () {
        var self = this;
        GGlobal.control.listen(UIConst.ACTCOM_YUANXIAO_REPORT, self.updateShow, self);
        GGlobal.modelzssf.CG_GuardArea_openReportUI_10915();
    };
    View_YuanXiao_battleReport.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.ACTCOM_YUANXIAO_REPORT, self.updateShow, self);
    };
    View_YuanXiao_battleReport.URL = "ui://ajaichn8qc9hr";
    return View_YuanXiao_battleReport;
}(UIModalPanel));
__reflect(View_YuanXiao_battleReport.prototype, "View_YuanXiao_battleReport");
