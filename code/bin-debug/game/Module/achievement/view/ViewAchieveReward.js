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
 * 成就奖励界面
 * @author: lujiahao
 * @date: 2019-11-08 18:16:58
 */
var ViewAchieveReward = (function (_super) {
    __extends(ViewAchieveReward, _super);
    function ViewAchieveReward() {
        var _this = _super.call(this) || this;
        _this._dataList = [];
        _this.loadRes("rebirth", "rebirth_atlas0");
        return _this;
    }
    ViewAchieveReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "ViewAchieveReward"));
    };
    ViewAchieveReward.prototype.childrenCreated = function () {
        GGlobal.createPack("rebirth");
        this.view = fairygui.UIPackage.createObject("rebirth", "ViewAchieveReward").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewAchieveReward.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.foldInvisibleItems = true;
    };
    //=========================================== API ==========================================
    ViewAchieveReward.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelAchievement.CG_Achievement_openGoalUI_10325();
        t.refreshData();
        t.list.selectedIndex = -1;
        t.list.selectedIndex = 0;
    };
    ViewAchieveReward.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
    };
    ViewAchieveReward.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewAchieveReward.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewAchieveReward.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelAchievement;
        t._dataList.length = 0;
        var t_sourceList = t_model.getMasterVoList();
        for (var _i = 0, t_sourceList_1 = t_sourceList; _i < t_sourceList_1.length; _i++) {
            var v = t_sourceList_1[_i];
            var t_rewardList = v.rewardList;
            if (t_rewardList && t_rewardList.length > 0) {
                t._dataList.push(v);
            }
        }
        t._dataList.sort(function (pA, pB) {
            return pB.sortValue - pA.sortValue;
        });
        t.list.numItems = t._dataList.length;
    };
    ViewAchieveReward.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.ACHIEVEMENT_REWARD_UPDATE, t.onUpdate, t);
    };
    //======================================== handler =========================================
    ViewAchieveReward.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    //>>>>end
    ViewAchieveReward.URL = "ui://dllc71i9g7h32b";
    return ViewAchieveReward;
}(UIModalPanel));
__reflect(ViewAchieveReward.prototype, "ViewAchieveReward");
