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
var SGZLShopItem = (function (_super) {
    __extends(SGZLShopItem, _super);
    function SGZLShopItem() {
        return _super.call(this) || this;
    }
    SGZLShopItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "SGZLShopItem"));
    };
    SGZLShopItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    SGZLShopItem.prototype.setData = function (pData) {
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
    SGZLShopItem.prototype.dispose = function () {
        this.registerEvent(false);
        EventUtil.register(false, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    SGZLShopItem.prototype.registerEvent = function (pFlag) {
        EventUtil.register(pFlag, this.btnBuy, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    SGZLShopItem.prototype.onIconClick = function (e) {
        if (this._curData) {
            FastAPI.showItemTips(this._curData.consumeItem);
        }
    };
    SGZLShopItem.prototype.onBtnClick = function (e) {
        if (!this._curData)
            return;
        switch (e.currentTarget) {
            case this.btnBuy:
                GGlobal.modelSGZL.cmdSendBuy(this._curData.id);
                break;
        }
    };
    //>>>>end
    SGZLShopItem.URL = "ui://d5y9ngt6tvlr1v";
    return SGZLShopItem;
}(fairygui.GComponent));
__reflect(SGZLShopItem.prototype, "SGZLShopItem");
