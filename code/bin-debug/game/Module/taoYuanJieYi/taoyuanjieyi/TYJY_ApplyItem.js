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
 * 桃园结义申请列表Item
 */
var TYJY_ApplyItem = (function (_super) {
    __extends(TYJY_ApplyItem, _super);
    function TYJY_ApplyItem() {
        return _super.call(this) || this;
    }
    TYJY_ApplyItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_ApplyItem"));
    };
    TYJY_ApplyItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    TYJY_ApplyItem.prototype.clean = function () {
        var s = this;
        s.okBtn.removeClickListener(s.onOk, s);
        s.cancelBtn.removeClickListener(s.onCancel, s);
    };
    TYJY_ApplyItem.prototype.setdata = function (vo) {
        if (!vo)
            return;
        var s = this;
        s._vo = vo;
        s.viewHead.setdata(vo.headId, -1, "", -1, false, vo.frameId, 0);
        s.nameLb.text = vo.playerName;
        s.powerLb.text = vo.playerPower + "";
        s.okBtn.addClickListener(s.onOk, s);
        s.cancelBtn.addClickListener(s.onCancel, s);
    };
    /**
     * 申请加入
     */
    TYJY_ApplyItem.prototype.onOk = function (e) {
        GGlobal.model_TYJY.CG_APPROVAL_APPLY(1, this._vo.playerId);
    };
    /**
     * 拒绝
     */
    TYJY_ApplyItem.prototype.onCancel = function (e) {
        GGlobal.model_TYJY.CG_APPROVAL_APPLY(2, this._vo.playerId);
    };
    TYJY_ApplyItem.URL = "ui://m2fm2aiyvfmx19";
    return TYJY_ApplyItem;
}(fairygui.GComponent));
__reflect(TYJY_ApplyItem.prototype, "TYJY_ApplyItem");
