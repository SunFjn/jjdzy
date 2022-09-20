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
var ViewCrossKingReport = (function (_super) {
    __extends(ViewCrossKingReport, _super);
    function ViewCrossKingReport() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewCrossKingReport.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossKingReport"));
    };
    ViewCrossKingReport.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewCrossKingReport").asCom;
        this.contentPane = this.view;
        this.c1 = this.getController("c1");
        this.lbTitle = (this.view.getChild("lbTitle"));
        this.list = (this.view.getChild("list"));
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = this.renderListItem;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    ViewCrossKingReport.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewCrossKingReport.prototype.onShown = function () {
        this.addListen();
        this.update();
        GGlobal.modelCrossKing.CG_OPEN_HIS();
    };
    ViewCrossKingReport.prototype.onHide = function () {
        this.removeListen();
    };
    ViewCrossKingReport.prototype.addListen = function () {
        GGlobal.control.listen(Enum_MsgType.CROSSKING_REPORT_ARR, this.update, this);
    };
    ViewCrossKingReport.prototype.removeListen = function () {
        GGlobal.control.remove(Enum_MsgType.CROSSKING_REPORT_ARR, this.update, this);
        GGlobal.layerMgr.close(UIConst.CROSS_KING_REPORT);
        this.list.numItems = 0;
    };
    ViewCrossKingReport.prototype.update = function () {
        this.list.numItems = Model_CrossKing.reportArr.length;
    };
    ViewCrossKingReport.prototype.renderListItem = function (index, obj) {
        var item = obj;
        item.vo = Model_CrossKing.reportArr[index];
    };
    ViewCrossKingReport.URL = "ui://yqpfulefj9wf7";
    return ViewCrossKingReport;
}(UIModalPanel));
__reflect(ViewCrossKingReport.prototype, "ViewCrossKingReport");
