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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewShaoZhuActSingleLog = (function (_super) {
    __extends(ViewShaoZhuActSingleLog, _super);
    function ViewShaoZhuActSingleLog() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewShaoZhuActSingleLog.createInstance = function () {
        return (fairygui.UIPackage.createObject("shaozhuAct", "ViewShaoZhuActSingleLog"));
    };
    ViewShaoZhuActSingleLog.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("shaozhuAct");
        self.view = fairygui.UIPackage.createObject("shaozhuAct", "ViewShaoZhuActSingleLog").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewShaoZhuActSingleLog.prototype.updateLog = function () {
        var str = "";
        var data = GGlobal.modelShaoZhuAct.single_logData;
        var cfg = Config.scdnfl_272;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var itemname = ConfigHelp.getItemColorName(JSON.parse(cfg[item[0]].reward)[0][1]);
            str += BroadCastManager.reTxt("消耗{0}，抽中了<font color='#ffc334'>{1}倍</font>返利", itemname, item[1] / 100) + "\n";
        }
        this.n6.setText(str);
        this.n6.reScroll();
    };
    ViewShaoZhuActSingleLog.prototype.closeHd = function () {
        GGlobal.layerMgr.close2(UIConst.SHAOZHU_SINGLE_LOG);
    };
    ViewShaoZhuActSingleLog.prototype.onShown = function () {
        this.updateLog();
        GGlobal.modelShaoZhuAct.CG_LOG_SINGLE();
        this.n3.addClickListener(this.closeHd, this);
        GGlobal.control.listen(UIConst.SHAOZHU_SINGLE_LOG, this.updateLog, this);
    };
    ViewShaoZhuActSingleLog.prototype.onHide = function () {
        this.n3.removeClickListener(this.closeHd, this);
        GGlobal.control.remove(UIConst.SHAOZHU_SINGLE_LOG, this.updateLog, this);
        GGlobal.layerMgr.close(UIConst.SHAOZHU_SINGLE_LOG);
    };
    ViewShaoZhuActSingleLog.URL = "ui://w5ll6n5jhsa2d";
    return ViewShaoZhuActSingleLog;
}(UIModalPanel));
__reflect(ViewShaoZhuActSingleLog.prototype, "ViewShaoZhuActSingleLog");
