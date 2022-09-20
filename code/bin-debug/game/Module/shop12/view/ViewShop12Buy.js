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
 * 双12商城购买确认界面
 * @author: lujiahao
 * @date: 2019-11-29 20:41:24
 */
var ViewShop12Buy = (function (_super) {
    __extends(ViewShop12Buy, _super);
    function ViewShop12Buy() {
        var _this = _super.call(this) || this;
        //===================================== private method =====================================
        _this._resultValue = 0;
        _this.loadRes("actShop12", "");
        return _this;
    }
    ViewShop12Buy.createInstance = function () {
        return (fairygui.UIPackage.createObject("actShop12", "ViewShop12Buy"));
    };
    ViewShop12Buy.prototype.childrenCreated = function () {
        GGlobal.createPack("actShop12");
        this.view = fairygui.UIPackage.createObject("actShop12", "ViewShop12Buy").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewShop12Buy.prototype.initView = function () {
        var t = this;
        t.resComTotal.setType(1);
        t.resComTotal.showBg(false);
        t.resComDis.setType(1);
        t.resComDis.showBg(false);
        t.resComCoupon.setType(1);
        t.resComCoupon.showBg(false);
        t.resComPrice.setType(1);
        t.resComPrice.showBg(false);
        t.tfTips.wordWrap = true;
    };
    //=========================================== API ==========================================
    ViewShop12Buy.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
    };
    ViewShop12Buy.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
    };
    ViewShop12Buy.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelShop12;
        var t_map = t_model.shopCartMap;
        var t_total = 0;
        for (var k in t_map) {
            var t_id = ~~k;
            var t_value = ~~t_map[k];
            var t_vo = t_model.getShopVoById(t_id);
            if (t_vo) {
                t_total += t_vo.priceNow.count * t_value;
            }
        }
        var t_targetDis;
        var t_nextDis; //下个优惠
        var t_disCfgList = t_model.getDiscountCfgList();
        for (var i = t_disCfgList.length - 1; i >= 0; i--) {
            var t_dis = t_disCfgList[i];
            if (t_total >= t_dis.ed) {
                t_targetDis = t_dis;
                break;
            }
            t_nextDis = t_dis;
        }
        if (t_nextDis) {
            t.groupTips.visible = true;
            var t_diff = t_nextDis.ed - t_total;
            t.tfTips.text = "\u8FD8\u5DEE<font color='#ffff00'>" + ConfigHelp.getYiWanText(t_diff) + "\u5143\u5B9D</font>\u53EF\u4F18\u60E0\u51CF\u514D<font color='#ffff00'>" + ConfigHelp.getYiWanText(t_nextDis.jm) + "\u5143\u5B9D</font>";
        }
        else {
            t.groupTips.visible = false;
        }
        var t_disValue = t_targetDis ? ~~t_targetDis.jm : 0;
        var t_couponValue = FastAPI.getItemCount(EnumShop12.COUPON_ID);
        if (t_couponValue > t_total - t_disValue) {
            t_couponValue = t_total - t_disValue;
        }
        var t_result = t_total - t_disValue - t_couponValue;
        var t_hasYuanbao = FastAPI.getItemCount(Enum_Attr.yuanBao);
        var t_color = Color.GREENSTR;
        if (t_hasYuanbao < t_result)
            t_color = Color.REDSTR;
        if (t_disValue || t_couponValue)
            t.lineImg.visible = true;
        else
            t.lineImg.visible = false;
        t._resultValue = t_result;
        t.resComTotal.setItemId(Enum_Attr.yuanBao);
        t.resComDis.setItemId(Enum_Attr.yuanBao);
        t.resComCoupon.setItemId(EnumShop12.COUPON_ID);
        t.resComPrice.setItemId(Enum_Attr.yuanBao);
        t.resComTotal.setCount(HtmlUtil.font(t_total + "", Color.GREYINT));
        t.resComDis.setCount(t_disValue);
        t.resComCoupon.setCount(t_couponValue);
        t.resComPrice.setCount(HtmlUtil.font(t_result + "", t_color));
    };
    ViewShop12Buy.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnBuy, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewShop12Buy.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelShop12;
        switch (e.currentTarget) {
            case t.btnBuy:
                if (FastAPI.checkItemEnough(Enum_Attr.yuanBao, t._resultValue, true))
                    t_model.CG_DoubleTwelveShop_buyItems_10701();
                t.closeView();
                break;
        }
    };
    //>>>>end
    ViewShop12Buy.URL = "ui://plzexlafoyk16";
    return ViewShop12Buy;
}(UIModalPanel));
__reflect(ViewShop12Buy.prototype, "ViewShop12Buy");
