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
 * 桃园结义没加盟Item
 */
var TYJY_NoJoinItem = (function (_super) {
    __extends(TYJY_NoJoinItem, _super);
    function TYJY_NoJoinItem() {
        return _super.call(this) || this;
    }
    TYJY_NoJoinItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_NoJoinItem"));
    };
    TYJY_NoJoinItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    TYJY_NoJoinItem.prototype.clean = function () {
        var s = this;
        s.applyBtn.removeClickListener(s.onApply, s);
        s.cancelBtn.removeClickListener(s.onCancel, s);
    };
    TYJY_NoJoinItem.prototype.setdata = function (vo) {
        if (!vo)
            return;
        this._vo = vo;
        this.gangName.text = vo.gangName;
        this.gangNum.text = "(" + vo.gangNum + "/3)";
        this.playerName.text = vo.dage;
        this.powerLb.text = vo.power + "";
        if (vo.status == 4) {
            this.c1.selectedIndex = 1;
        }
        else if (vo.status == 3) {
            this.c1.selectedIndex = 0;
        }
        else if (vo.status == 2) {
            this.c1.selectedIndex = 2;
        }
        else {
            this.c1.selectedIndex = 3;
        }
        this.applyBtn.addClickListener(this.onApply, this);
        this.cancelBtn.addClickListener(this.onCancel, this);
    };
    /**
     * 申请加入事件
     */
    TYJY_NoJoinItem.prototype.onApply = function (e) {
        GGlobal.model_TYJY.CG_APPLY_JOIN(this._vo.gangId);
    };
    /**
     * 取消申请事件
     */
    TYJY_NoJoinItem.prototype.onCancel = function (e) {
        GGlobal.model_TYJY.CG_CANCEL_APPLY(this._vo.gangId);
    };
    TYJY_NoJoinItem.URL = "ui://m2fm2aiyihs7w";
    return TYJY_NoJoinItem;
}(fairygui.GComponent));
__reflect(TYJY_NoJoinItem.prototype, "TYJY_NoJoinItem");
