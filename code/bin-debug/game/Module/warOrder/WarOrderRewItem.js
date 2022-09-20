/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var WarOrderRewItem = (function (_super) {
    __extends(WarOrderRewItem, _super);
    function WarOrderRewItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WarOrderRewItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("warOrder", "WarOrderRewItem"));
    };
    WarOrderRewItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        this.itemList0.itemRenderer = this.onItemRender0;
        this.itemList0.callbackThisObj = this;
        this.itemList1.itemRenderer = this.onItemRender1;
        this.itemList1.callbackThisObj = this;
    };
    //=========================================== API ==========================================
    WarOrderRewItem.prototype.setData = function (pData, actVo) {
        var t = this;
        this._curData = pData;
        this._curAct = actVo;
        if (pData) {
            this.tfIndex.text = pData.cfg.lv + "";
            var voWarO = GGlobal.modelWarOrder.getWarOrder(actVo.id);
            if (voWarO.levelId >= pData.cfg.lv) {
                this.grey0.visible = false;
                if (voWarO.upgradeFlag) {
                    this.grey1.visible = false;
                }
                else {
                    this.grey1.visible = true;
                }
            }
            else {
                this.grey0.visible = true;
                this.grey1.visible = true;
            }
            this.itemList1.numItems = pData.rewardList1.length;
            this.itemList0.numItems = pData.rewardList0.length;
            if (pData.rewardList0.length > 0) {
                this.state0Ctrl.selectedIndex = pData.state0;
                t.lbNo0.visible = false;
            }
            else {
                this.state0Ctrl.selectedIndex = 0;
                t.lbNo0.visible = true;
            }
            if (pData.rewardList1[0]) {
                this.state1Ctrl.selectedIndex = pData.state1;
                t.lbNo1.visible = false;
            }
            else {
                this.state1Ctrl.selectedIndex = 0;
                t.lbNo1.visible = true;
            }
            this.registerEvent(true);
        }
        else {
        }
    };
    WarOrderRewItem.prototype.clean = function () {
        this.registerEvent(false);
        _super.prototype.clean.call(this);
    };
    //===================================== private method =====================================
    WarOrderRewItem.prototype.onItemRender0 = function (pIndex, pItem) {
        if (this._curData && this._curData.rewardList0) {
            var t_list = this._curData.rewardList0;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    WarOrderRewItem.prototype.onItemRender1 = function (pIndex, pItem) {
        if (this._curData && this._curData.rewardList1) {
            var t_list = this._curData.rewardList1;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    WarOrderRewItem.prototype.registerEvent = function (pFlag) {
        EventUtil.register(pFlag, this.btnGet0, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        EventUtil.register(pFlag, this.btnGet1, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    WarOrderRewItem.prototype.onBtnClick = function (e) {
        var m = GGlobal.modelWarOrder;
        if (!this._curData)
            return;
        switch (e.currentTarget) {
            case this.btnGet0:
                GGlobal.modelWarOrder.CG12251(0, this._curData.cfg.lv, 0, this._curAct.groupId);
                break;
            case this.btnGet1:
                GGlobal.modelWarOrder.CG12251(1, this._curData.cfg.lv, 0, this._curAct.groupId);
                break;
        }
    };
    WarOrderRewItem.pkg = "warOrder";
    //>>>>end
    WarOrderRewItem.URL = "ui://5xptxudgp5ib3";
    return WarOrderRewItem;
}(fairygui.GComponent));
__reflect(WarOrderRewItem.prototype, "WarOrderRewItem");
