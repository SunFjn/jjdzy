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
 * @date: 2019-09-30 16:11:44
 */
var QxzlShopItem = (function (_super) {
    __extends(QxzlShopItem, _super);
    function QxzlShopItem() {
        return _super.call(this) || this;
    }
    QxzlShopItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "QxzlShopItem"));
    };
    QxzlShopItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    QxzlShopItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            var t_item = pData.itemList[0];
            t.item.isShowEff = true;
            t.item.tipEnabled = true;
            t.item.vo = t_item;
            t.tfItemName.text = HtmlUtil.font(t_item.name, t_item.qColor);
            var t_remain = pData.remainCount;
            var t_limitStr = "";
            if (t_remain == -1) {
                t_limitStr = "不限购";
                t.stateCtrl.selectedIndex = 0;
            }
            else {
                var t_color = Color.GREENSTR;
                if (t_remain == 0) {
                    t_color = Color.REDSTR;
                    t.stateCtrl.selectedIndex = 1;
                }
                else {
                    t.stateCtrl.selectedIndex = 0;
                }
                t_limitStr = ConfigHelp.reTxt(HtmlUtil.font("{0}/{1}", t_color), t_remain, pData.cfg.xg);
            }
            t.tfLimit.text = ConfigHelp.reTxt("限购：" + t_limitStr);
            var t_consume = pData.consumeItem;
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + t_consume.icon + ".png", t.imageIcon);
            if (ConfigHelp.checkEnough(pData.cfg.money, false)) {
                t.tfValue.text = t_consume.count + "";
            }
            else {
                t.tfValue.text = HtmlUtil.font(t_consume.count + "", Color.REDSTR);
            }
            t.registerEvent(true);
        }
        else {
            t.registerEvent(false);
        }
    };
    QxzlShopItem.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    QxzlShopItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    QxzlShopItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnBuy, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.imageIcon, egret.TouchEvent.TOUCH_TAP, t.onIconClick, t);
    };
    //======================================== handler =========================================
    QxzlShopItem.prototype.onIconClick = function (e) {
        var t = this;
        if (t._curData) {
            FastAPI.showItemTips(t._curData.consumeItem);
        }
    };
    QxzlShopItem.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnBuy:
                if (t._curData) {
                    GGlobal.modelQxzl.CG_QunXiongZhuLu_exchange_8961(t._curData.id);
                }
                break;
        }
    };
    //>>>>end
    QxzlShopItem.URL = "ui://6d8dzzdgrak315";
    return QxzlShopItem;
}(fairygui.GComponent));
__reflect(QxzlShopItem.prototype, "QxzlShopItem");
