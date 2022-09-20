var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 进入了奖池的物品数据结构
 * @author: lujiahao
 * @date: 2020-01-04 17:02:34
 */
var VoItemLuckyEgg = (function () {
    function VoItemLuckyEgg() {
        /** 标识奖池物品的唯一键值 */
        this.key = "";
        this.index = -1;
        /** 所属奖池id */
        this.poolId = 0;
        this.itemId = 0;
        this.count = 0;
        this.itemType = 0;
        /** 是否抽中了 0还没抽中 1已抽中 */
        this.hasGet = 0;
    }
    VoItemLuckyEgg.create = function () {
        return Pool.getItemByClass("VoItemLuckyEgg", VoItemLuckyEgg);
    };
    VoItemLuckyEgg.recycle = function (pVo) {
        pVo.recycle();
        Pool.recover("VoItemLuckyEgg", pVo);
    };
    //=========================================== API ==========================================
    VoItemLuckyEgg.prototype.update = function (pData) {
        var t = this;
        var t_change = false;
        if (ObjectUtils.modifyObject(this, pData)) {
            t_change = true;
            t._itemVo = undefined;
        }
        return t_change;
    };
    VoItemLuckyEgg.prototype.recycle = function () {
        var t = this;
        t.poolId = 0;
        t.itemId = 0;
        t.count = 0;
        t.itemType = 0;
        t.hasGet = 0;
        t.key = "";
        t.index = -1;
        t._itemVo = undefined;
    };
    Object.defineProperty(VoItemLuckyEgg.prototype, "poolType", {
        /** 奖池类型 */
        get: function () {
            var t = this;
            return t.poolId % 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoItemLuckyEgg.prototype, "itemVo", {
        get: function () {
            var t = this;
            if (t._itemVo === undefined) {
                t._itemVo = ConfigHelp.makeItem([t.itemType, t.itemId, t.count]);
            }
            return t._itemVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoItemLuckyEgg.prototype, "sortValue", {
        get: function () {
            var t_value = 0;
            var t = this;
            if (t.hasGet) {
            }
            else {
                t_value += 10000;
            }
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoItemLuckyEgg;
}());
__reflect(VoItemLuckyEgg.prototype, "VoItemLuckyEgg");
