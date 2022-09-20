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
 * 群雄逐鹿
 * @author: lujiahao
 * @date: 2019-10-09 19:27:40
 */
var ViewEventQxzl = (function (_super) {
    __extends(ViewEventQxzl, _super);
    function ViewEventQxzl() {
        var _this = _super.call(this) || this;
        _this.loadRes("qxzl", "qxzl_atlas0");
        return _this;
    }
    ViewEventQxzl.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "ViewEventQxzl"));
    };
    ViewEventQxzl.prototype.childrenCreated = function () {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewEventQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewEventQxzl.prototype.initView = function () {
        var t = this;
    };
    //=========================================== API ==========================================
    ViewEventQxzl.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        ReddotMgr.ins().register(UIConst.QXZL + "|" + 4, t.tab1.noticeImg);
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;
        GGlobal.modelQxzl.CG_QunXiongZhuLu_openRecord_8959();
        //打开界面s就清除红点
        GGlobal.reddot.setCondition(UIConst.QXZL, 4, false);
    };
    ViewEventQxzl.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        ReddotMgr.ins().unregister(t.tab1.noticeImg);
    };
    ViewEventQxzl.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewEventQxzl.prototype.refreshData = function (pTabIndex) {
        var t = this;
        var t_model = GGlobal.modelQxzl;
        var t_dataList = t_model.getEventVoByTabType(pTabIndex);
        var t_str = "";
        for (var _i = 0, t_dataList_1 = t_dataList; _i < t_dataList_1.length; _i++) {
            var v = t_dataList_1[_i];
            t_str += v.content + "\n";
        }
        t.logCom.tfContent.text = t_str;
    };
    ViewEventQxzl.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_EVENT_UPDATE, t.onEventUpdate, t);
        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabChange, t);
    };
    //======================================== handler =========================================
    ViewEventQxzl.prototype.onTabChange = function (e) {
        var t = this;
        var t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        t.refreshData(t_tabIndex);
        t.logCom.ensureSizeCorrect();
        t.logCom.ensureBoundsCorrect();
        t.logCom.scrollPane.scrollToView(0);
    };
    ViewEventQxzl.prototype.onEventUpdate = function () {
        var t = this;
        var t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        t.refreshData(t_tabIndex);
    };
    //>>>>end
    ViewEventQxzl.URL = "ui://6d8dzzdgg6cv1f";
    return ViewEventQxzl;
}(UIModalPanel));
__reflect(ViewEventQxzl.prototype, "ViewEventQxzl");
