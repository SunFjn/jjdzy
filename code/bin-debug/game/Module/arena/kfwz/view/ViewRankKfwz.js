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
 * 跨服王者排行榜界面
 * @author: lujiahao
 * @date: 2019-12-09 14:51:52
 */
var ViewRankKfwz = (function (_super) {
    __extends(ViewRankKfwz, _super);
    function ViewRankKfwz() {
        var _this = _super.call(this) || this;
        _this.loadRes("Arena", "Arena_atlas0");
        return _this;
    }
    ViewRankKfwz.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewRankKfwz"));
    };
    ViewRankKfwz.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewRankKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewRankKfwz.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewRankKfwz.prototype.onShown = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t.registerEvent(true);
        var t_rangeId = t_model.getRangeId();
        var t_selectedIndex = t_rangeId - 1;
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = t_selectedIndex;
        var t_tabBtn = t["tab" + t_selectedIndex];
        if (t_tabBtn) {
            t.imageMyFlag.visible = true;
            t.imageMyFlag.x = t_tabBtn.x + t_tabBtn.width - t.imageMyFlag.width;
            t.imageMyFlag.y = t_tabBtn.y;
        }
        else {
            t.imageMyFlag.visible = false;
        }
    };
    ViewRankKfwz.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t._dataList = null;
        t.list.numItems = 0;
    };
    ViewRankKfwz.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewRankKfwz.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewRankKfwz.prototype.refreshDataByTabIndex = function (pTabIndex) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        var t_rangeId = pTabIndex + 1;
        var t_myRangeId = t_model.getRangeId();
        var t_isMyRange = t_rangeId == t_myRangeId;
        t.myCtrl.selectedIndex = t_isMyRange ? 1 : 0;
        if (t_isMyRange) {
            t.gradeCtrl.selectedIndex = t_model.myGrade - 1;
            var t_strMyRank = "未上榜";
            if (t_model.myRank > 0) {
                t_strMyRank = t_model.myRank + "";
            }
            t.tfMyRank.text = "\u6211\u7684\u6392\u540D\uFF1A" + t_strMyRank;
        }
        t._dataList = t_model.getRankCfgListByRangeId(t_rangeId);
        t.list.numItems = t._dataList.length;
    };
    ViewRankKfwz.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_RANK_UPDATE, t.onRankUpdate, t);
        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabChange, t);
    };
    //======================================== handler =========================================
    ViewRankKfwz.prototype.onRankUpdate = function (pData) {
        var t = this;
        if (pData.rangeId == t.tabCtrl.selectedIndex + 1)
            t.refreshDataByTabIndex(t.tabCtrl.selectedIndex);
    };
    ViewRankKfwz.prototype.onTabChange = function (e) {
        var t = this;
        if (t.tabCtrl.selectedIndex < 0)
            return;
        var t_model = GGlobal.modelKfwz;
        t_model.CG_CrossTeamKing_openRank_10847(t.tabCtrl.selectedIndex + 1);
        t.refreshDataByTabIndex(t.tabCtrl.selectedIndex);
        t.list.scrollToView(0);
    };
    //>>>>end
    ViewRankKfwz.URL = "ui://me1skowlpmqq77";
    return ViewRankKfwz;
}(UIModalPanel));
__reflect(ViewRankKfwz.prototype, "ViewRankKfwz");
