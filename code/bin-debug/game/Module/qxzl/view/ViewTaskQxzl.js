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
 * 群雄逐鹿任务面板
 * @author: lujiahao
 * @date: 2019-09-30 15:55:53
 */
var ViewTaskQxzl = (function (_super) {
    __extends(ViewTaskQxzl, _super);
    function ViewTaskQxzl() {
        var _this = _super.call(this) || this;
        _this.loadRes("qxzl", "qxzl_atlas0");
        return _this;
    }
    ViewTaskQxzl.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "ViewTaskQxzl"));
    };
    ViewTaskQxzl.prototype.childrenCreated = function () {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewTaskQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewTaskQxzl.prototype.initView = function () {
        this.list.itemRenderer = this.onItemRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.tab1.visible = false;
    };
    //=========================================== API ==========================================
    ViewTaskQxzl.prototype.onShown = function () {
        var t = this;
        GGlobal.modelQxzl.CG_QunXiongZhuLu_openTaskUI_8955();
        t.registerEvent(true);
        t.refreshReddot();
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;
    };
    ViewTaskQxzl.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
    };
    ViewTaskQxzl.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewTaskQxzl.prototype.onItemRender = function (pIndex, pItem) {
        if (this._dataList) {
            pItem.setData(this._dataList[pIndex]);
        }
    };
    ViewTaskQxzl.prototype.refreshData = function (pTabIndex) {
        var t = this;
        var t_model = GGlobal.modelQxzl;
        var t_tabType = t.getTabTypeByTabIndex(pTabIndex);
        var t_map = t_model.getTypeVoListMap(t_tabType);
        var t_showList = [];
        for (var k in t_map) {
            var t_voList = t_map[k];
            var t_showVo = t_voList[t_voList.length - 1];
            for (var i = t_voList.length - 1; i >= 0; i--) {
                var t_vo = t_voList[i];
                if (t_vo.state == EnumQxzl.STATE_DONE)
                    continue;
                t_showVo = t_vo;
            }
            t_showList.push(t_showVo);
        }
        t_showList.sort(function (pA, pB) {
            if (pA.sortValue > pB.sortValue)
                return -1;
            else if (pA.sortValue < pB.sortValue)
                return 1;
            else
                return pA.id - pB.id;
        });
        this._dataList = t_showList;
        t.list.numItems = t_showList.length;
    };
    ViewTaskQxzl.prototype.getTabTypeByTabIndex = function (pTabIndex) {
        return pTabIndex + 1;
    };
    ViewTaskQxzl.prototype.refreshReddot = function () {
        var t = this;
        var t_model = GGlobal.modelQxzl;
        var t_reddot = false;
        for (var i = 0; i < 2; i++) {
            var t_tabType = t.getTabTypeByTabIndex(i);
            var t_voList = t_model.getTaskVoListByTabType(t_tabType);
            for (var _i = 0, t_voList_1 = t_voList; _i < t_voList_1.length; _i++) {
                var v = t_voList_1[_i];
                if (v && v.state == EnumQxzl.STATE_CAN_GET) {
                    t_reddot = true;
                    break;
                }
            }
            t["tab" + i].noticeImg.visible = t_reddot;
        }
    };
    ViewTaskQxzl.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_TASK_UPDATE, t.onTaskUpdate, t);
        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabChange, t);
    };
    //======================================== handler =========================================
    ViewTaskQxzl.prototype.onTabChange = function (e) {
        var t = this;
        var t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        t.refreshData(t_tabIndex);
        t.list.scrollToView(0);
    };
    ViewTaskQxzl.prototype.onTaskUpdate = function () {
        this.refreshData(this.tabCtrl.selectedIndex);
        this.refreshReddot();
    };
    //>>>>end
    ViewTaskQxzl.URL = "ui://6d8dzzdgrak312";
    return ViewTaskQxzl;
}(UIModalPanel));
__reflect(ViewTaskQxzl.prototype, "ViewTaskQxzl");
