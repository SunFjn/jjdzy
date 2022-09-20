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
 * 双12商城面板
 * @author: lujiahao
 * @date: 2019-11-28 17:59:27
 */
var ChildShop12 = (function (_super) {
    __extends(ChildShop12, _super);
    function ChildShop12() {
        var _this = _super.call(this) || this;
        _this._dataList = [];
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ChildShop12.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ChildShop12.URL, ChildShop12);
        f(Shop12Item.URL, Shop12Item);
    };
    ChildShop12.createInstance = function () {
        return (fairygui.UIPackage.createObject("actShop12", "ChildShop12"));
    };
    ChildShop12.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
        t.list.scrollItemToViewOnClick = false;
        t.resCom0.setType(1);
        t.resComTotal.showBg(false);
        t.resComTotal.setType(1);
    };
    ChildShop12.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildShop12.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SHOP12);
        t.tfDate.text = "";
        t._curActVo = pData;
        if (t._curActVo) {
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }
        t.refreshData();
        t.list.scrollToView(0);
        t.refreshTotalPrice();
        t.refreshCoupon();
        IconUtil.setImg1(Enum_Path.BACK_URL + "shop12_bg.jpg", t.banner);
    };
    ChildShop12.prototype.closePanel = function (pData) {
        var t = this;
        var t_model = GGlobal.modelShop12;
        t.registerEvent(false);
        t.list.numItems = 0;
        t_model.clearShopCart(); //清空购物车
        Timer.instance.remove(t.onDateUpdate, t);
        IconUtil.setImg1(null, t.banner);
    };
    ChildShop12.prototype.dispose = function () {
        var t = this;
        _super.prototype.dispose.call(this);
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ChildShop12.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ChildShop12.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelShop12;
        var t_list = t_model.getShopVoList().concat();
        t._dataList = t_list;
        t.list.numItems = t_list.length;
    };
    ChildShop12.prototype.refreshTotalPrice = function () {
        var t = this;
        var t_model = GGlobal.modelShop12;
        var t_cartMap = t_model.shopCartMap;
        var t_total = 0;
        for (var k in t_cartMap) {
            var t_id = ~~k;
            var t_count = t_cartMap[k];
            var t_vo = t_model.getShopVoById(t_id);
            t_total += t_vo.priceNow.count * t_count;
        }
        t.resComTotal.setItemId(Enum_Attr.yuanBao);
        var t_hasCount = FastAPI.getItemCount(Enum_Attr.yuanBao);
        var t_color = Color.GREENSTR;
        if (t_hasCount < t_total)
            t_color = Color.REDSTR;
        t_color = Color.WHITESTR;
        t.resComTotal.setCount(HtmlUtil.font(t_total + "", t_color));
    };
    ChildShop12.prototype.refreshCoupon = function () {
        var t = this;
        var t_id = EnumShop12.COUPON_ID;
        t.resCom0.setItemId(t_id);
        var t_hasCount = FastAPI.getItemCount(t_id);
        t.resCom0.setCount(t_hasCount);
    };
    /** 刷新时间 */
    ChildShop12.prototype.onDateUpdate = function () {
        var t_dateStr = "";
        if (this._curActVo) {
            var t_end = this._curActVo.end; //s
            var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
            var t_remainS = t_end - servTime;
            if (t_remainS > 0) {
                if (t_remainS < 24 * 60 * 60) {
                    //小于24小时
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
                }
                else {
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
                }
            }
            else {
                t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
            }
        }
        this.tfDate.text = t_dateStr;
    };
    ChildShop12.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.SHOP12_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SHOP12_CART_CHANGE, t.onCartChange, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SHOP12_CART_CLEAR, t.onCartClear, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        EventUtil.register(pFlag, t.btnBuy, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnClear, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnMore, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ChildShop12.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ChildShop12.prototype.onCartChange = function () {
        var t = this;
        t.refreshTotalPrice();
    };
    ChildShop12.prototype.onCartClear = function () {
        var t = this;
        t.refreshTotalPrice();
    };
    ChildShop12.prototype.onBagUpdate = function () {
        var t = this;
        t.refreshCoupon();
        t.refreshTotalPrice();
    };
    ChildShop12.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelShop12;
        switch (e.currentTarget) {
            case t.btnBuy:
                var t_cartList = t_model.getShopCartList();
                if (t_cartList.length > 0) {
                    GGlobal.layerMgr.open(UIConst.ACTCOM_SHOP12_BUY);
                }
                else {
                    ViewCommonWarn.text("请先选择商品");
                }
                break;
            case t.btnClear://清空购物车
                t_model.clearShopCart();
                break;
            case t.btnMore:
                var t_qs = t_model.getCurQs();
                var t_ruleCfg = Config.s12gz_771[t_qs];
                if (t_ruleCfg) {
                    GGlobal.layerMgr.open(UIConst.WFSM_PANEL, { title: "优惠规则", content: t_ruleCfg.sm });
                }
                break;
        }
    };
    //>>>>end
    ChildShop12.URL = "ui://plzexlaflplo0";
    /** 设置包名（静态属性） */
    ChildShop12.pkg = "actShop12";
    return ChildShop12;
}(fairygui.GComponent));
__reflect(ChildShop12.prototype, "ChildShop12", ["IPanel"]);
