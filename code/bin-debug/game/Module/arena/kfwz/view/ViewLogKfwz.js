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
 * 跨服王者日志界面
 * @author: lujiahao
 * @date: 2019-12-11 11:03:41
 */
var ViewLogKfwz = (function (_super) {
    __extends(ViewLogKfwz, _super);
    function ViewLogKfwz() {
        var _this = _super.call(this) || this;
        _this.loadRes("Arena", "Arena_atlas0");
        return _this;
    }
    ViewLogKfwz.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewLogKfwz"));
    };
    ViewLogKfwz.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewLogKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewLogKfwz.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewLogKfwz.prototype.onShown = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t.registerEvent(true);
        t.refreshData();
        t_model.CG_CrossTeamKing_getLog_10851();
        t.list.scrollToView(0);
    };
    ViewLogKfwz.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t._dataList = null;
        t.list.numItems = 0;
    };
    ViewLogKfwz.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewLogKfwz.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewLogKfwz.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        var t_list = t_model.logVoList.concat();
        for (var _i = 0, t_list_1 = t_list; _i < t_list_1.length; _i++) {
            var v = t_list_1[_i];
            v.isFold = true; //折叠所有数据
        }
        t._dataList = t_list;
        t.list.numItems = t_list.length;
    };
    ViewLogKfwz.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_LOG_UPDATE, t.onLogUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_LOG_CHANGE_SIZE, t.onLogSizeChange, t);
    };
    //======================================== handler =========================================
    ViewLogKfwz.prototype.onLogUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ViewLogKfwz.prototype.onLogSizeChange = function () {
        var t = this;
        t.list.refreshVirtualList();
    };
    //>>>>end
    ViewLogKfwz.URL = "ui://me1skowls0r57k";
    return ViewLogKfwz;
}(UIModalPanel));
__reflect(ViewLogKfwz.prototype, "ViewLogKfwz");
