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
 * 跨服矿藏-战报界面
 */
var ViewCrossMineralReport = (function (_super) {
    __extends(ViewCrossMineralReport, _super);
    function ViewCrossMineralReport() {
        var _this = _super.call(this) || this;
        _this._listData = [];
        fairygui.UIObjectFactory.setPackageItemExtension(VCrossMineralReport.URL, VCrossMineralReport);
        _this.loadRes();
        return _this;
    }
    ViewCrossMineralReport.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralReport"));
    };
    ViewCrossMineralReport.prototype.childrenCreated = function () {
        GGlobal.createPack("crossKing");
        this.view = fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralReport").asCom;
        this.contentPane = this.view;
        this.n2 = (this.view.getChild("n2"));
        this.n2.callbackThisObj = this;
        this.n2.itemRenderer = this.itemRender;
        this.n2.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewCrossMineralReport.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._listData[idx], idx);
    };
    ViewCrossMineralReport.prototype.onShown = function () {
        GGlobal.modelCrossMineral.CG_OPEN_REPORT();
        this.addListen();
    };
    ViewCrossMineralReport.prototype.onHide = function () {
        this.removeListen();
    };
    ViewCrossMineralReport.prototype.listUpdate = function (data) {
        this._listData = data;
        this.n2.numItems = data.length;
    };
    ViewCrossMineralReport.prototype.addListen = function () {
        GGlobal.control.listen(UIConst.CROSS_MINERAL_REPORT, this.listUpdate, this);
    };
    ViewCrossMineralReport.prototype.removeListen = function () {
        GGlobal.control.remove(UIConst.CROSS_MINERAL_REPORT, this.listUpdate, this);
        GGlobal.layerMgr.close(UIConst.CROSS_MINERAL_REPORT);
        this.n2.numItems = 0;
    };
    ViewCrossMineralReport.URL = "ui://yqpfulefnyv75b";
    return ViewCrossMineralReport;
}(UIModalPanel));
__reflect(ViewCrossMineralReport.prototype, "ViewCrossMineralReport");
