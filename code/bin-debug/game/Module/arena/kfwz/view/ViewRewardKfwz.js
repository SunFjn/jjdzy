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
 * 跨服王者目标奖励预览界面
 * @author: lujiahao
 * @date: 2019-12-07 13:53:25
 */
var ViewRewardKfwz = (function (_super) {
    __extends(ViewRewardKfwz, _super);
    function ViewRewardKfwz() {
        var _this = _super.call(this) || this;
        _this.loadRes("Arena", "Arena_atlas0");
        return _this;
    }
    ViewRewardKfwz.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewRewardKfwz"));
    };
    ViewRewardKfwz.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewRewardKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewRewardKfwz.prototype.initView = function () {
        var t = this;
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    ViewRewardKfwz.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t._curData = t._args;
        t.refreshData();
    };
    ViewRewardKfwz.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.itemList.numItems = 0;
    };
    ViewRewardKfwz.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewRewardKfwz.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (!t._curData)
            return;
        var t_dataList = t._curData.rewardList;
        if (t_dataList) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_dataList[pIndex];
        }
    };
    ViewRewardKfwz.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        if (t._curData) {
            var t_cur = t_model.winCount;
            var t_max = t._curData.cfg.cs;
            var t_color = Color.GREENSTR;
            if (t_cur < t_max) {
                t_color = Color.REDSTR;
            }
            t.tfDes.text = "\u4ECA\u65E5\u80DC\u573A" + t_max + "\u573A\u53EF\u9886\u53D6<font color='" + t_color + "'>\uFF08" + t_cur + "/" + t_max + "\uFF09</font>";
            t.itemList.numItems = t._curData.rewardList.length;
            t.stateCtrl.selectedIndex = t._curData.state;
        }
        else {
        }
    };
    ViewRewardKfwz.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_UPDATE, t.onUpdate, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewRewardKfwz.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ViewRewardKfwz.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        switch (e.currentTarget) {
            case t.btnGet:
                //领取奖励
                if (t._curData) {
                    t_model.CG_CrossTeamKing_getReward_10849(t._curData.id);
                }
                break;
        }
    };
    //>>>>end
    ViewRewardKfwz.URL = "ui://me1skowls0r579";
    return ViewRewardKfwz;
}(UIModalPanel));
__reflect(ViewRewardKfwz.prototype, "ViewRewardKfwz");
