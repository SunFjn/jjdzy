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
/**
 * 少主护送战报界面
 */
var ShaoZhuEscReportView = (function (_super) {
    __extends(ShaoZhuEscReportView, _super);
    function ShaoZhuEscReportView() {
        var _this = _super.call(this) || this;
        _this._listData = [];
        fairygui.UIObjectFactory.setPackageItemExtension(EscortRewardItem.URL, EscortRewardItem);
        fairygui.UIObjectFactory.setPackageItemExtension(ShaoZhuEscReportInter.URL, ShaoZhuEscReportInter);
        fairygui.UIObjectFactory.setPackageItemExtension(ShaoZhuEscReportItem.URL, ShaoZhuEscReportItem);
        _this.loadRes();
        return _this;
    }
    ShaoZhuEscReportView.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscReportView"));
    };
    ShaoZhuEscReportView.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("ShaoZhuEscort");
        self.view = fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscReportView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ShaoZhuEscReportView.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(Model_ShaoZhuEscort.dt[idx], idx);
    };
    ShaoZhuEscReportView.prototype.onShown = function () {
        var self = this;
        self.addListen();
        GGlobal.modelShaoZhuEscort.CG_OPEN_BATTLERECORD_UI();
    };
    ShaoZhuEscReportView.prototype.onHide = function () {
        this.removeListen();
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_REWARD);
        this.list.numItems = 0;
    };
    ShaoZhuEscReportView.prototype.addListen = function () {
        var self = this;
        GGlobal.control.listen(UIConst.SHAOZHU_ESCORT_REPORT, self.listUpdate, self);
    };
    ShaoZhuEscReportView.prototype.removeListen = function () {
        var self = this;
        GGlobal.control.remove(UIConst.SHAOZHU_ESCORT_REPORT, self.listUpdate, self);
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_REPORT);
    };
    ShaoZhuEscReportView.prototype.listUpdate = function () {
        var self = this;
        self.list.numItems = Model_ShaoZhuEscort.dt.length;
    };
    ShaoZhuEscReportView.URL = "ui://lnw94ki2lnitm";
    return ShaoZhuEscReportView;
}(UIModalPanel));
__reflect(ShaoZhuEscReportView.prototype, "ShaoZhuEscReportView");
