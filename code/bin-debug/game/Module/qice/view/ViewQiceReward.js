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
 * @date: 2019-10-25 13:55:50
 */
var ViewQiceReward = (function (_super) {
    __extends(ViewQiceReward, _super);
    function ViewQiceReward() {
        var _this = _super.call(this) || this;
        _this.loadRes("qice", "qice_atlas0");
        return _this;
    }
    ViewQiceReward.prototype.childrenCreated = function () {
        GGlobal.createPack("qice");
        this.view = fairygui.UIPackage.createObject("qice", "ViewQiceReward").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewQiceReward.prototype.initView = function () {
        this.itemList.itemRenderer = this.onItemRender;
        this.itemList.callbackThisObj = this;
        // this.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    ViewQiceReward.prototype.onShown = function () {
        var t = this;
        t._curVo = t._args;
        this.refreshData();
        this.registerEvent(true);
    };
    ViewQiceReward.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.itemList.numItems = 0;
    };
    //===================================== private method =====================================
    ViewQiceReward.prototype.refreshData = function () {
        var t = this;
        if (t._curVo) {
            t.itemList.numItems = t._curVo.rewardList.length;
            t.stateCtrl.selectedIndex = t._curVo.state;
            if (t._curVo.state == 1)
                t.btnGet.noticeImg.visible = true;
            else
                t.btnGet.noticeImg.visible = false;
        }
        else {
        }
    };
    ViewQiceReward.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._curVo && t._curVo.rewardList) {
            var t_list = t._curVo.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    ViewQiceReward.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_TARGET_UPDATE, t.onRewardUpdate, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewQiceReward.prototype.onRewardUpdate = function () {
        this.refreshData();
    };
    ViewQiceReward.prototype.onBtnClick = function (e) {
        var t = this;
        if (!t._curVo)
            return;
        switch (e.currentTarget) {
            case t.btnGo:
                // t.closeView();
                ViewCommonWarn.text("领取条件不足");
                break;
            case t.btnGet:
                GGlobal.modelQice.CG_QiCeDraw_getAward_9755(t._curVo.id);
                break;
        }
    };
    //>>>>end
    ViewQiceReward.URL = "ui://cokk050npi6u19";
    return ViewQiceReward;
}(UIModalPanel));
__reflect(ViewQiceReward.prototype, "ViewQiceReward");
