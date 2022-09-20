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
 * @date: 2019-11-08 18:13:30
 */
var AchieveRewardItem = (function (_super) {
    __extends(AchieveRewardItem, _super);
    function AchieveRewardItem() {
        return _super.call(this) || this;
    }
    AchieveRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "AchieveRewardItem"));
    };
    AchieveRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList1.itemRenderer = this.onItemRender;
        t.itemList1.callbackThisObj = this;
        t.itemList1.setVirtual();
    };
    //=========================================== API ==========================================
    AchieveRewardItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            var t_model = GGlobal.modelAchievement;
            t.stateCtrl.selectedIndex = pData.state;
            if (pData.state == EnumAchievement.STATE_CAN_GET) {
                t.btnGet.noticeImg.visible = true;
            }
            else {
                t.btnGet.noticeImg.visible = false;
            }
            if (t_model.level >= pData.id) {
                var t_color = Color.GREENSTR;
            }
            else {
                t_color = Color.REDSTR;
            }
            var t_strCount = HtmlUtil.font(" (" + t_model.level + "/" + pData.id + ")", t_color);
            t.tfName.text = "\u6210\u5C31\u5927\u5E08" + pData.id + "\u9636\u53EF\u9886\u53D6" + t_strCount;
            t.tfLimit.text = pData.id + "\u9636\u53EF\u9886\u53D6";
            t.itemList1.numItems = pData.rewardList.length;
        }
        else {
            t.registerEvent(false);
            t.itemList1.numItems = 0;
        }
    };
    AchieveRewardItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    AchieveRewardItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    AchieveRewardItem.prototype.onItemRender = function (pIndex, pItem) {
        if (this._curData && this._curData.rewardList) {
            var t_list = this._curData.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    AchieveRewardItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    AchieveRewardItem.prototype.onBtnClick = function (e) {
        var t = this;
        if (!t._curData)
            return;
        switch (e.currentTarget) {
            case t.btnGet:
                GGlobal.modelAchievement.CG_Achievement_getGoalReward_10327(t._curData.id);
                break;
        }
    };
    //>>>>end
    AchieveRewardItem.URL = "ui://dllc71i9g7h32d";
    return AchieveRewardItem;
}(fairygui.GComponent));
__reflect(AchieveRewardItem.prototype, "AchieveRewardItem");
