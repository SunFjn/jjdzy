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
var ViewBzptReward = (function (_super) {
    __extends(ViewBzptReward, _super);
    function ViewBzptReward() {
        var _this = _super.call(this) || this;
        _this.loadRes("actBzpt", "actBzpt_atlas0");
        return _this;
    }
    ViewBzptReward.prototype.childrenCreated = function () {
        GGlobal.createPack("actBzpt");
        this.view = fairygui.UIPackage.createObject("actBzpt", "ViewBzptReward").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewBzptReward.prototype.initView = function () {
        this.itemList.itemRenderer = this.onItemRender;
        this.itemList.callbackThisObj = this;
        // this.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    ViewBzptReward.prototype.onShown = function () {
        var t = this;
        t._curVo = t._args;
        t.refreshData();
        t.registerEvent(true);
    };
    ViewBzptReward.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.itemList.numItems = 0;
    };
    //===================================== private method =====================================
    ViewBzptReward.prototype.refreshData = function () {
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
    ViewBzptReward.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._curVo && t._curVo.rewardList) {
            var t_list = t._curVo.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    ViewBzptReward.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.BZPT_BOX_OPEN, t.onRewardUpdate, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewBzptReward.prototype.onRewardUpdate = function () {
        this.refreshData();
    };
    ViewBzptReward.prototype.onBtnClick = function (e) {
        var t = this;
        if (!t._curVo)
            return;
        switch (e.currentTarget) {
            case t.btnGo:
                // t.closeView();
                ViewCommonWarn.text("领取条件不足");
                break;
            case t.btnGet:
                GGlobal.modelBzpt.CG_BaoZangPinTu_gotAward_10653(t._curVo.id);
                break;
        }
    };
    //>>>>end
    ViewBzptReward.URL = "ui://twm3bfyglploc";
    return ViewBzptReward;
}(UIModalPanel));
__reflect(ViewBzptReward.prototype, "ViewBzptReward");
