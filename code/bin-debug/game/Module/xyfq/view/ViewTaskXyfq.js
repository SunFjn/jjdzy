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
 * @author: lujiahao
 * @date: 2020-04-09 10:20:22
 */
var ViewTaskXyfq = (function (_super) {
    __extends(ViewTaskXyfq, _super);
    function ViewTaskXyfq() {
        var _this = _super.call(this) || this;
        _this._typeList = [2, 1];
        _this.loadRes("xyfq", "xyfq_atlas0");
        return _this;
    }
    ViewTaskXyfq.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "ViewTaskXyfq"));
    };
    ViewTaskXyfq.prototype.childrenCreated = function () {
        GGlobal.createPack("xyfq");
        this.view = fairygui.UIPackage.createObject("xyfq", "ViewTaskXyfq").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewTaskXyfq.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewTaskXyfq.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;
        t.list.scrollToView(0);
    };
    ViewTaskXyfq.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
    };
    ViewTaskXyfq.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewTaskXyfq.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewTaskXyfq.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        var t_tabIndex = t.tabCtrl.selectedIndex;
        var t_type = t.getTypeByTab(t_tabIndex);
        var t_dataList = t_model.getTaskVoListByType(t_type).concat();
        t_dataList.sort(function (pA, pB) {
            return pB.sortValue - pA.sortValue;
        });
        t._dataList = t_dataList;
        t.list.numItems = t_dataList.length;
        switch (t_type) {
            case 1://总目标
                t.tfCount.text = "\u603B\u62BD\u7B7E\u6570\uFF1A" + t_model.countTotal + "\u6B21";
                break;
            case 2://每日目标
                t.tfCount.text = "\u4ECA\u65E5\u62BD\u7B7E\u6570\uFF1A" + t_model.countDaily + "\u6B21";
                break;
        }
    };
    ViewTaskXyfq.prototype.getTypeByTab = function (pTabIndex) {
        return this._typeList[pTabIndex];
    };
    ViewTaskXyfq.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.XYFQ_TASK_UPDATE, t.onTaskUpdate, t);
        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabChange, t);
        if (pFlag) {
            ReddotMgr.ins().register(ReddotEnum.VALUE_XYFQ_TASK_DAILY, t.tab0.noticeImg);
            ReddotMgr.ins().register(ReddotEnum.VALUE_XYFQ_TASK_TOTAL, t.tab1.noticeImg);
        }
        else {
            ReddotMgr.ins().unregister(t.tab0.noticeImg);
            ReddotMgr.ins().unregister(t.tab1.noticeImg);
        }
    };
    //======================================== handler =========================================
    ViewTaskXyfq.prototype.onTaskUpdate = function (pData) {
        var t = this;
        var t_curType = t.getTypeByTab(t.tabCtrl.selectedIndex);
        if (pData.type == t_curType) {
            t.refreshData();
        }
    };
    ViewTaskXyfq.prototype.onTabChange = function (e) {
        var t = this;
        var t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        t.refreshData();
    };
    //>>>>end
    ViewTaskXyfq.URL = "ui://7hwmix0gbnypq";
    return ViewTaskXyfq;
}(UIModalPanel));
__reflect(ViewTaskXyfq.prototype, "ViewTaskXyfq");
