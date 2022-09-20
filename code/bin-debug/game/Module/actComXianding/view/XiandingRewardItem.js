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
 * @date: 2019-09-12 11:13:52
 */
var XiandingRewardItem = (function (_super) {
    __extends(XiandingRewardItem, _super);
    function XiandingRewardItem() {
        return _super.call(this) || this;
    }
    XiandingRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComXianding", "XiandingRewardItem"));
    };
    XiandingRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    XiandingRewardItem.prototype.setData = function (pData) {
        this._curData = pData;
        if (pData) {
            this.registerEvent(true);
            var t_color = Color.WHITESTR;
            // let t_curValue = GGlobal.modelXianding.curScore;
            // if (t_curValue >= pData.cfg.hy)
            //     t_color = Color.YELLOWSTR;
            this.tfScore.text = HtmlUtil.font(pData.cfg.hy + "", t_color);
            this.item.vo = pData.rewardList[0];
            this.item.isShowEff = true;
            this.stateCtrl.selectedIndex = pData.state;
        }
        else {
            this.item.vo = null;
            this.registerEvent(false);
        }
    };
    XiandingRewardItem.prototype.recycle = function () {
        this.setData(null);
    };
    //===================================== private method =====================================
    XiandingRewardItem.prototype.registerEvent = function (pFlag) {
        EventUtil.register(pFlag, this, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    //======================================== handler =========================================
    XiandingRewardItem.prototype.onClick = function (e) {
        GGlobal.layerMgr.open(UIConst.ACTCOM_XIANDING_REWARD, this._curData);
    };
    //>>>>end
    XiandingRewardItem.URL = "ui://s98a5pruillc5";
    return XiandingRewardItem;
}(fairygui.GComponent));
__reflect(XiandingRewardItem.prototype, "XiandingRewardItem");
