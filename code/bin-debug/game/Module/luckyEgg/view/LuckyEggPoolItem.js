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
 * @date: 2020-01-07 17:46:30
 */
var LuckyEggPoolItem = (function (_super) {
    __extends(LuckyEggPoolItem, _super);
    function LuckyEggPoolItem() {
        var _this = _super.call(this) || this;
        _this._poolType = 0;
        return _this;
    }
    LuckyEggPoolItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("luckyEgg", "LuckyEggPoolItem"));
    };
    LuckyEggPoolItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.effectShake = t.getTransition("effectShake");
    };
    //=========================================== API ==========================================
    LuckyEggPoolItem.prototype.setData = function (pPoolType) {
        var t = this;
        t._poolType = pPoolType;
        t.typeLoader.url = CommonManager.getUrl("luckyEgg", "levelImg_" + pPoolType);
        t.registerEvent(true);
    };
    LuckyEggPoolItem.prototype.dispose = function () {
        var t = this;
        t.registerEvent(false);
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    LuckyEggPoolItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btn, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    LuckyEggPoolItem.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btn:
                //打开查看奖池奖励
                GGlobal.layerMgr.open(UIConst.ACTCOM_LUCKY_EGG_PREVIEW, { poolType: t._poolType });
                break;
        }
    };
    //>>>>end
    LuckyEggPoolItem.URL = "ui://wx4kos8uosj39";
    return LuckyEggPoolItem;
}(fairygui.GButton));
__reflect(LuckyEggPoolItem.prototype, "LuckyEggPoolItem");
