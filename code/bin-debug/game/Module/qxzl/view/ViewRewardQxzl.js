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
 * 驻守奖励领取界面
 * @author: lujiahao
 * @date: 2019-10-10 15:26:04
 */
var ViewRewardQxzl = (function (_super) {
    __extends(ViewRewardQxzl, _super);
    function ViewRewardQxzl() {
        var _this = _super.call(this) || this;
        _this.loadRes("qxzl", "qxzl_atlas0");
        return _this;
    }
    ViewRewardQxzl.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "ViewRewardQxzl"));
    };
    ViewRewardQxzl.prototype.childrenCreated = function () {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewRewardQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewRewardQxzl.prototype.initView = function () {
        var t = this;
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        // t.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    ViewRewardQxzl.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
        GGlobal.modelQxzl.CG_QunXiongZhuLu_getDefendAwardInfo_8977();
    };
    ViewRewardQxzl.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.itemList.numItems = 0;
    };
    ViewRewardQxzl.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewRewardQxzl.prototype.onItemRender = function (pIndex, pItem) {
        var t_dataList = GGlobal.modelQxzl.rewardList;
        if (t_dataList) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_dataList[pIndex];
        }
    };
    ViewRewardQxzl.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelQxzl;
        t.itemList.numItems = t_model.rewardList.length;
        t.tfDes.visible = false;
        if (t_model.rewardList.length < 1) {
            t.tfDes.visible = true;
        }
        var t_state = 0;
        if (t_model.rewardList.length > 0) {
            for (var _i = 0, _a = t_model.rewardList; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v && v.count > 0) {
                    t_state = 1;
                    break;
                }
            }
        }
        t.stateCtrl.selectedIndex = t_state;
    };
    ViewRewardQxzl.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_REWARD_UPDATE, t.onReawrdUpdate, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewRewardQxzl.prototype.onReawrdUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ViewRewardQxzl.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnGet:
                GGlobal.modelQxzl.CG_QunXiongZhuLu_gotDefendAward_8979();
                break;
        }
    };
    //>>>>end
    ViewRewardQxzl.URL = "ui://6d8dzzdgi2j21h";
    return ViewRewardQxzl;
}(UIModalPanel));
__reflect(ViewRewardQxzl.prototype, "ViewRewardQxzl");
