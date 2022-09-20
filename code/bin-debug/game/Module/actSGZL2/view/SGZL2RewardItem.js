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
 * @date: 2019-11-15 10:44:12
 */
var SGZL2RewardItem = (function (_super) {
    __extends(SGZL2RewardItem, _super);
    function SGZL2RewardItem() {
        return _super.call(this) || this;
    }
    SGZL2RewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComSgzl2", "SGZL2RewardItem"));
    };
    SGZL2RewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.itemList0.itemRenderer = this.onItemRender0;
        this.itemList0.callbackThisObj = this;
        this.itemList1.itemRenderer = this.onItemRender1;
        this.itemList1.callbackThisObj = this;
    };
    //=========================================== API ==========================================
    SGZL2RewardItem.prototype.setData = function (pData) {
        this._curData = pData;
        if (pData) {
            this.tfIndex.text = pData.cfg.dengji + "";
            if (GGlobal.modelSGZL2.levelId >= pData.cfg.dengji)
                this.imageState.grayed = false;
            else
                this.imageState.grayed = true;
            this.state0Ctrl.selectedIndex = pData.state0;
            this.state1Ctrl.selectedIndex = pData.state1;
            this.itemList0.numItems = pData.rewardList0.length;
            this.itemList1.numItems = pData.rewardList1.length;
            this.registerEvent(true);
        }
        else {
        }
    };
    SGZL2RewardItem.prototype.clean = function () {
        this.registerEvent(false);
        _super.prototype.clean.call(this);
    };
    SGZL2RewardItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    SGZL2RewardItem.prototype.onItemRender0 = function (pIndex, pItem) {
        if (this._curData && this._curData.rewardList0) {
            var t_list = this._curData.rewardList0;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    SGZL2RewardItem.prototype.onItemRender1 = function (pIndex, pItem) {
        if (this._curData && this._curData.rewardList1) {
            var t_list = this._curData.rewardList1;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    SGZL2RewardItem.prototype.registerEvent = function (pFlag) {
        EventUtil.register(pFlag, this.btnGet0, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        EventUtil.register(pFlag, this.btnGet1, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    SGZL2RewardItem.prototype.onBtnClick = function (e) {
        if (!this._curData)
            return;
        switch (e.currentTarget) {
            case this.btnGet0:
                GGlobal.modelSGZL2.cmdSendGetReward(0, 0, this._curData.cfg.dengji);
                break;
            case this.btnGet1:
                GGlobal.modelSGZL2.cmdSendGetReward(0, 1, this._curData.cfg.dengji);
                break;
        }
    };
    //>>>>end
    SGZL2RewardItem.URL = "ui://ggwi8wepqhoci";
    return SGZL2RewardItem;
}(fairygui.GComponent));
__reflect(SGZL2RewardItem.prototype, "SGZL2RewardItem");
