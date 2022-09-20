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
 * 活跃度奖励面板
 * @author: lujiahao
 * @date: 2019-09-16 11:29:27
 */
var ViewXiandingReward = (function (_super) {
    __extends(ViewXiandingReward, _super);
    function ViewXiandingReward() {
        var _this = _super.call(this) || this;
        _this.loadRes("actComXianding", "actComXianding_atlas0");
        return _this;
    }
    ViewXiandingReward.prototype.childrenCreated = function () {
        GGlobal.createPack("actComXianding");
        this.view = fairygui.UIPackage.createObject("actComXianding", "ViewXiandingReward").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewXiandingReward.prototype.initView = function () {
        this.itemList.itemRenderer = this.onItemRender;
        this.itemList.callbackThisObj = this;
        // this.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    ViewXiandingReward.prototype.onShown = function () {
        var t = this;
        t._curVo = t._args;
        this.refreshData();
        this.registerEvent(true);
    };
    ViewXiandingReward.prototype.onHide = function () {
        this.registerEvent(false);
        this.itemList.numItems = 0;
    };
    //===================================== private method =====================================
    ViewXiandingReward.prototype.refreshData = function () {
        var t = this;
        if (t._curVo) {
            this.itemList.numItems = t._curVo.rewardList.length;
            this.stateCtrl.selectedIndex = t._curVo.state;
            if (t._curVo.state == Enum_Xianding.TASK_STATE_CAN_GET)
                this.btnGet.noticeImg.visible = true;
            else
                this.btnGet.noticeImg.visible = false;
        }
        else {
        }
    };
    ViewXiandingReward.prototype.onItemRender = function (pIndex, pItem) {
        if (this._curVo && this._curVo.rewardList) {
            var t_list = this._curVo.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    ViewXiandingReward.prototype.registerEvent = function (pFlag) {
        GGlobal.control.register(pFlag, Enum_MsgType.XIANDING_REWARD_UPDATE, this.onRewardUpdate, this);
        EventUtil.register(pFlag, this.btnGet, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    ViewXiandingReward.prototype.onRewardUpdate = function () {
        this.refreshData();
    };
    ViewXiandingReward.prototype.onBtnClick = function (e) {
        if (!this._curVo)
            return;
        switch (e.currentTarget) {
            case this.btnGo:
                // this.closeView();
                ViewCommonWarn.text("领取条件不足");
                break;
            case this.btnGet:
                GGlobal.modelXianding.cmdSendGetScoreReward(this._curVo.id);
                break;
        }
    };
    //>>>>end
    ViewXiandingReward.URL = "ui://s98a5pruucru6";
    return ViewXiandingReward;
}(UIModalPanel));
__reflect(ViewXiandingReward.prototype, "ViewXiandingReward");
