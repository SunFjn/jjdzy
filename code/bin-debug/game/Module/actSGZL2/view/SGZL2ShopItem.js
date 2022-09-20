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
 * @date: 2019-11-15 10:45:53
 */
var SGZL2ShopItem = (function (_super) {
    __extends(SGZL2ShopItem, _super);
    function SGZL2ShopItem() {
        return _super.call(this) || this;
    }
    SGZL2ShopItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComSgzl2", "SGZL2ShopItem"));
    };
    SGZL2ShopItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    SGZL2ShopItem.prototype.setData = function (pData) {
        this._curData = pData;
        if (pData) {
            var t_item = pData.itemList[0];
            this.item.isShowEff = true;
            this.item.tipEnabled = true;
            this.item.vo = t_item;
            this.tfItemName.text = HtmlUtil.font(t_item.name, t_item.qColor);
            var t_remain = pData.remainCount;
            var t_limitStr = "";
            if (t_remain == -1) {
                t_limitStr = "不限购";
                this.stateCtrl.selectedIndex = 0;
            }
            else {
                var t_color = Color.GREENSTR;
                if (t_remain == 0) {
                    t_color = Color.REDSTR;
                    this.stateCtrl.selectedIndex = 1;
                }
                else {
                    this.stateCtrl.selectedIndex = 0;
                }
                t_limitStr = ConfigHelp.reTxt(HtmlUtil.font("{0}/{1}", t_color), t_remain, pData.cfg.time);
            }
            this.tfLimit.text = ConfigHelp.reTxt("限购：" + t_limitStr);
            var t_consume = pData.consumeItem;
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + t_consume.icon + ".png", this.imageIcon);
            EventUtil.register(true, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
            if (ConfigHelp.checkEnough(pData.cfg.money, false)) {
                this.tfValue.text = t_consume.count + "";
            }
            else {
                this.tfValue.text = HtmlUtil.font(t_consume.count + "", Color.REDSTR);
            }
            this.registerEvent(true);
        }
        else {
            this.item.vo = null;
            this.registerEvent(false);
        }
    };
    SGZL2ShopItem.prototype.dispose = function () {
        this.registerEvent(false);
        EventUtil.register(false, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    SGZL2ShopItem.prototype.registerEvent = function (pFlag) {
        EventUtil.register(pFlag, this.btnBuy, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    SGZL2ShopItem.prototype.onIconClick = function (e) {
        if (this._curData) {
            FastAPI.showItemTips(this._curData.consumeItem);
        }
    };
    SGZL2ShopItem.prototype.onBtnClick = function (e) {
        if (!this._curData)
            return;
        switch (e.currentTarget) {
            case this.btnBuy:
                GGlobal.modelSGZL2.cmdSendBuy(this._curData.id);
                break;
        }
    };
    //>>>>end
    SGZL2ShopItem.URL = "ui://ggwi8wepqhocg";
    return SGZL2ShopItem;
}(fairygui.GComponent));
__reflect(SGZL2ShopItem.prototype, "SGZL2ShopItem");
