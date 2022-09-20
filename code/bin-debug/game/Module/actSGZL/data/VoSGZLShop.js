var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 三国战令商店数据结构
 * @author: lujiahao
 * @date: 2019-09-19 16:07:36
 */
var VoSGZLShop = (function () {
    function VoSGZLShop() {
        /** 已购买数量 */
        this.buyCount = 0;
    }
    Object.defineProperty(VoSGZLShop.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.sgzlshop_017[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoSGZLShop.prototype.update = function (pCount) {
        var t_change = false;
        if (this.buyCount != pCount) {
            this.buyCount = pCount;
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoSGZLShop.prototype, "itemList", {
        get: function () {
            if (this._itemList === undefined)
                this._itemList = ConfigHelp.makeItemListArr(this.cfg.item);
            return this._itemList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSGZLShop.prototype, "consumeItem", {
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
    Object.defineProperty(VoSGZLShop.prototype, "remainCount", {
        /**
         * 剩余可购买次数 返回-1则表示不限购，除了不限购外，不可能为负数
         */
        get: function () {
            if (this.cfg.time == 0) {
                //不限购
                return -1;
            }
            else {
                //有限购
                var t_remain = this.cfg.time - this.buyCount;
                t_remain = t_remain < 0 ? 0 : t_remain;
                return t_remain;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** 检查是否可购买 true则表示可购买 false则表示不能购买 */
    VoSGZLShop.prototype.checkCanBuy = function () {
        return this.remainCount != 0;
    };
    return VoSGZLShop;
}());
__reflect(VoSGZLShop.prototype, "VoSGZLShop");
