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
 * @date: 2019-11-21 20:21:03
 */
var CJSRewardItem = (function (_super) {
    __extends(CJSRewardItem, _super);
    function CJSRewardItem() {
        return _super.call(this) || this;
    }
    CJSRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCJS", "CJSRewardItem"));
    };
    CJSRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList1.itemRenderer = t.onItemRender;
        t.itemList1.callbackThisObj = t;
        t.itemList1.setVirtual();
    };
    //=========================================== API ==========================================
    CJSRewardItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.stateCtrl.selectedIndex = pData.state;
            var t_strLayer = ConfigHelp.NumberToChinese(pData.cfg.cs);
            t.tfLayer.text = "\u70B9\u4EAE\u7B2C" + t_strLayer + "\u5C42";
            t.itemList1.numItems = pData.rewardList.length;
        }
        else {
            t.registerEvent(false);
            t.itemList1.numItems = 0;
        }
    };
    CJSRewardItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    CJSRewardItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    CJSRewardItem.prototype.onItemRender = function (pIndex, pItem) {
        if (this._curData && this._curData.rewardList) {
            var t_list = this._curData.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    CJSRewardItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    CJSRewardItem.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelCJS;
        switch (e.currentTarget) {
            case t.btnGo:
                break;
            case t.btnGet:
                if (t._curData) {
                    t_model.CG_AchievementTree_getReward_10573(t._curData.id);
                }
                break;
        }
    };
    //>>>>end
    CJSRewardItem.URL = "ui://ehocr0vupwnzd";
    return CJSRewardItem;
}(fairygui.GComponent));
__reflect(CJSRewardItem.prototype, "CJSRewardItem");
