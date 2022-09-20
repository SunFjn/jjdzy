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
 * @date: 2019-12-04 18:06:18
 */
var KfwzBoxItem = (function (_super) {
    __extends(KfwzBoxItem, _super);
    function KfwzBoxItem() {
        return _super.call(this) || this;
    }
    KfwzBoxItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "KfwzBoxItem"));
    };
    KfwzBoxItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    KfwzBoxItem.prototype.setData = function (pData) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.tfScore.text = pData.cfg.cs + "\u573A";
            t.stateCtrl.selectedIndex = pData.state;
        }
        else {
            t.registerEvent(false);
        }
    };
    KfwzBoxItem.prototype.recycle = function () {
        var t = this;
        t.setData(null);
    };
    //===================================== private method =====================================
    KfwzBoxItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    };
    //======================================== handler =========================================
    KfwzBoxItem.prototype.onClick = function (e) {
        //打开奖励界面
        var t = this;
        if (t._curData) {
            GGlobal.layerMgr.open(UIConst.KFWZ_REWARD_VIEW, t._curData);
        }
    };
    //>>>>end
    KfwzBoxItem.URL = "ui://me1skowln9yf70";
    return KfwzBoxItem;
}(fairygui.GComponent));
__reflect(KfwzBoxItem.prototype, "KfwzBoxItem");
