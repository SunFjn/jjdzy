var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 群雄逐鹿商店数据结构
 * @author: lujiahao
 * @date: 2019-09-30 18:04:22
 */
var VoShopQxzl = (function () {
    function VoShopQxzl() {
        /** 已购买数量 */
        this.buyCount = 0;
    }
    Object.defineProperty(VoShopQxzl.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.qxzlstore_273[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoShopQxzl.prototype.update = function (pBuyCount) {
        var t_change = false;
        if (this.buyCount != pBuyCount) {
            this.buyCount = pBuyCount;
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoShopQxzl.prototype, "itemList", {
        get: function () {
            if (this._itemList === undefined)
                this._itemList = ConfigHelp.makeItemListArr(this.cfg.item);
            return this._itemList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoShopQxzl.prototype, "consumeItem", {
        /** 单次兑换消耗 */
        get: function () {
            if (this._consumeItem === undefined) {
                this._consumeItem = ConfigHelp.makeItemListArr(this.cfg.money)[0];
            }
            return this._consumeItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoShopQxzl.prototype, "remainCount", {
        /**
         * 剩余可购买次数 返回-1则表示不限购，除了不限购外，不可能为负数
         */
        get: function () {
            if (this.cfg.xg == 0) {
                //不限购
                return -1;
            }
            else {
                //有限购
                var t_remain = this.cfg.xg - this.buyCount;
                t_remain = t_remain < 0 ? 0 : t_remain;
                return t_remain;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** 检查是否可购买 true则表示可购买 false则表示不能购买 */
    VoShopQxzl.prototype.checkCanBuy = function () {
        return this.remainCount != 0;
    };
    return VoShopQxzl;
}());
__reflect(VoShopQxzl.prototype, "VoShopQxzl");
