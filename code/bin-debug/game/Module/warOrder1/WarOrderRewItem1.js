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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var WarOrderRewItem1 = (function (_super) {
    __extends(WarOrderRewItem1, _super);
    function WarOrderRewItem1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WarOrderRewItem1.createInstance = function () {
        return (fairygui.UIPackage.createObject("warOrder1", "WarOrderRewItem1"));
    };
    WarOrderRewItem1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    WarOrderRewItem1.prototype.setData = function (pData, curActVo) {
        this._curData = pData;
        this._actVo = curActVo;
        if (pData) {
            var m = GGlobal.modelWarOrder;
            var voWarO = m.getWarOrder(curActVo.id);
            this.tfIndex.text = ConfigHelp.reTxt("第{0}级", pData.cfg.lv);
            if (voWarO.levelId >= pData.cfg.lv) {
                this.grey0.visible = false;
                // this.lock0.visible = false;
                if (voWarO.upgradeFlag) {
                    this.grey1.visible = false;
                    // this.lock1.visible = false;
                }
                else {
                    this.grey1.visible = true;
                    // this.lock1.visible = true;
                }
            }
            else {
                this.grey0.visible = true;
                // this.lock0.visible = true;
                this.grey1.visible = true;
                // this.lock1.visible = true;
            }
            if (pData.rewardList0[0]) {
                this.item0.tipEnabled = true;
                this.item0.isShowEff = true;
                this.item0.vo = pData.rewardList0[0];
                this.item0.visible = true;
                this.lbNo0.visible = false;
                this.state0Ctrl.selectedIndex = pData.state0;
            }
            else {
                this.item0.visible = false;
                this.lbNo0.visible = true;
                this.state0Ctrl.selectedIndex = 0;
            }
            if (pData.rewardList1[0]) {
                this.item1.tipEnabled = true;
                this.item1.isShowEff = true;
                this.item1.vo = pData.rewardList1[0];
                this.item1.visible = true;
                this.lbNo1.visible = false;
                this.state1Ctrl.selectedIndex = pData.state1;
            }
            else {
                this.item1.visible = false;
                this.lbNo1.visible = true;
                this.state1Ctrl.selectedIndex = 0;
            }
            this.registerEvent(true);
        }
        else {
        }
    };
    WarOrderRewItem1.prototype.clean = function () {
        this.registerEvent(false);
        _super.prototype.clean.call(this);
        this.item0.clean();
        this.item1.clean();
    };
    WarOrderRewItem1.prototype.registerEvent = function (pFlag) {
        EventUtil.register(pFlag, this.btnGet0, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        EventUtil.register(pFlag, this.btnGet1, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    WarOrderRewItem1.prototype.onBtnClick = function (e) {
        var m = GGlobal.modelWarOrder;
        if (!this._curData)
            return;
        switch (e.currentTarget) {
            case this.btnGet0:
                GGlobal.modelWarOrder.CG12251(0, this._curData.cfg.lv, 0, this._actVo.groupId);
                break;
            case this.btnGet1:
                GGlobal.modelWarOrder.CG12251(1, this._curData.cfg.lv, 0, this._actVo.groupId);
                break;
        }
    };
    //>>>>end
    WarOrderRewItem1.URL = "ui://89er3bo3e7lc2";
    return WarOrderRewItem1;
}(fairygui.GComponent));
__reflect(WarOrderRewItem1.prototype, "WarOrderRewItem1");
