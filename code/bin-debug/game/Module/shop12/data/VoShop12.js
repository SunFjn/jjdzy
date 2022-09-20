var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 双12商品数据结构
 * @author: lujiahao
 * @date: 2019-11-28 10:55:05
 */
var VoShop12 = (function () {
    function VoShop12() {
        /** 已购买数量 */
        this.buyCount = 0;
    }
    Object.defineProperty(VoShop12.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.s12sc_771[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoShop12.prototype.update = function (pData) {
        return ObjectUtils.modifyObject(this, pData);
    };
    Object.defineProperty(VoShop12.prototype, "state", {
        /** 状态 0未售完 1已售罄 */
        get: function () {
            var t = this;
            if (t.buyCount >= t.cfg.cs)
                return 1;
            else
                return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoShop12.prototype, "remainCount", {
        /** 剩余可购买数量 */
        get: function () {
            var t = this;
            var t_remain = t.cfg.cs - t.buyCount;
            t_remain = t_remain < 0 ? 0 : t_remain;
            return t_remain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoShop12.prototype, "priceSource", {
        get: function () {
            var t = this;
            if (t._priceSource === undefined) {
                var t_list = ConfigHelp.makeItemListArr(t.cfg.yj);
                t._priceSource = t_list[0];
            }
            return t._priceSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoShop12.prototype, "priceNow", {
        get: function () {
            var t = this;
            if (t._priceNow === undefined) {
                var t_list = ConfigHelp.makeItemListArr(t.cfg.xj);
                t._priceNow = t_list[0];
            }
            return t._priceNow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoShop12.prototype, "itemList", {
        get: function () {
            if (this._itemList === undefined)
                this._itemList = ConfigHelp.makeItemListArr(this.cfg.dj);
            return this._itemList;
        },
        enumerable: true,
        configurable: true
    });
    return VoShop12;
}());
__reflect(VoShop12.prototype, "VoShop12");
