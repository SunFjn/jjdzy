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
 * @date: 2019-11-28 17:54:04
 */
var Shop12Item = (function (_super) {
    __extends(Shop12Item, _super);
    function Shop12Item() {
        return _super.call(this) || this;
    }
    Shop12Item.createInstance = function () {
        return (fairygui.UIPackage.createObject("actShop12", "Shop12Item"));
    };
    Shop12Item.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.resComNow.showBg(false);
        t.resComNow.setType(1);
        t.resComSource.showBg(false);
        t.resComSource.setType(1);
    };
    //=========================================== API ==========================================
    Shop12Item.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        t.registerEvent(false);
        if (pData) {
            var t_model = GGlobal.modelShop12;
            t.stateCtrl.selectedIndex = pData.state;
            t.numberCom.maxValue = pData.remainCount;
            t.numberCom.setValue(~~t_model.shopCartMap[pData.id]);
            var t_item = pData.itemList[0];
            t.item.isShowEff = true;
            t.item.tipEnabled = true;
            t.item.vo = t_item;
            t.tfItemName.text = HtmlUtil.font(t_item.name, t_item.qColor);
            t.tfDiscount.text = ~~(pData.cfg.off) / 10 + "折";
            var t_color = Color.GREENSTR;
            if (pData.remainCount <= 0)
                t_color = Color.REDSTR;
            t.tfLimit.text = HtmlUtil.font("\u9650\u8D2D\uFF08" + pData.remainCount + "/" + pData.cfg.cs + "\uFF09", t_color);
            {
                var t_hasCount = FastAPI.getItemCount(pData.priceSource.id);
                var t_needCount = pData.priceSource.count;
                t.resComSource.setItemId(pData.priceSource.id);
                var t_str = HtmlUtil.font(ConfigHelp.getYiWanText(t_needCount), Color.GREYINT);
                t.resComSource.setCount(t_str);
            }
            {
                var t_hasCount = FastAPI.getItemCount(pData.priceNow.id);
                var t_needCount = pData.priceNow.count;
                var t_str = ConfigHelp.getYiWanText(t_needCount);
                t.resComNow.setItemId(pData.priceNow.id);
                t.resComNow.setCount(t_str);
            }
            t.registerEvent(true);
        }
        else {
            t.item.vo = null;
            t.registerEvent(false);
            t.numberCom.setValue(0); //清空组件的值
        }
    };
    Shop12Item.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    Shop12Item.prototype.dispose = function () {
        var t = this;
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    Shop12Item.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.SHOP12_CART_CLEAR, t.onCartClear, t);
        EventUtil.register(pFlag, t.numberCom, egret.Event.CHANGE, t.onValueChange, t);
        EventUtil.register(pFlag, t.numberCom.btnMax, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.numberCom.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    Shop12Item.prototype.onValueChange = function (e) {
        var t = this;
        var t_model = GGlobal.modelShop12;
        if (t._curData) {
            t_model.addToShopCart(t._curData.id, t.numberCom.value);
        }
    };
    Shop12Item.prototype.onCartClear = function () {
        var t = this;
        if (!t._curData)
            return;
        t.numberCom.setValue(0);
    };
    Shop12Item.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.numberCom.btnAdd:
            case t.numberCom.btnMax:
                if (t.numberCom.value >= t.numberCom.maxValue) {
                    ViewCommonWarn.text("已达到可购买数量上限");
                }
                break;
        }
    };
    //>>>>end
    Shop12Item.URL = "ui://plzexlaflplo5";
    return Shop12Item;
}(fairygui.GComponent));
__reflect(Shop12Item.prototype, "Shop12Item");
