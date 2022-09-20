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
 * @date: 2019-10-24 18:22:12
 */
var QiceRewardItem = (function (_super) {
    __extends(QiceRewardItem, _super);
    function QiceRewardItem() {
        return _super.call(this) || this;
    }
    QiceRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("qice", "QiceRewardItem"));
    };
    QiceRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    QiceRewardItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            var t_color = Color.WHITESTR;
            t.tfScore.text = HtmlUtil.font(pData.cfg.pt + "次", t_color);
            t.item.vo = pData.rewardList[0];
            t.item.isShowEff = true;
            t.stateCtrl.selectedIndex = pData.state;
            t.tfRewardCount.text = pData.remain + "";
        }
        else {
            t.registerEvent(false);
        }
    };
    QiceRewardItem.prototype.recycle = function () {
        var t = this;
        t.setData(null);
    };
    //===================================== private method =====================================
    QiceRewardItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    };
    //======================================== handler =========================================
    QiceRewardItem.prototype.onClick = function (e) {
        var t = this;
        GGlobal.layerMgr.open(UIConst.QICE_LOTTERY_TARGET, t._curData);
    };
    //>>>>end
    QiceRewardItem.URL = "ui://cokk050npi6u18";
    return QiceRewardItem;
}(fairygui.GComponent));
__reflect(QiceRewardItem.prototype, "QiceRewardItem");
