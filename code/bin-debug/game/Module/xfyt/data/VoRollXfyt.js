var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-30 16:26:55
 */
var VoRollXfyt = (function () {
    function VoRollXfyt() {
        this.id = 1101;
    }
    //=========================================== API ==========================================
    VoRollXfyt.prototype.update = function (pId) {
        var t = this;
        var t_change = false;
        if (t.id != pId) {
            t.lastId = t.id;
            t.id = pId;
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoRollXfyt.prototype, "pos", {
        /** 位置 从1开始 */
        get: function () {
            return this.id % 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoRollXfyt.prototype, "lastPos", {
        /** 上个位置 从1开始 */
        get: function () {
            return this.lastId % 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoRollXfyt.prototype, "round", {
        /** 圈数 从1开始 */
        get: function () {
            return ~~(this.id % 1000 / 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoRollXfyt.prototype, "lastRound", {
        /** 上次位置所在的圈数 从1开始 */
        get: function () {
            return ~~(this.lastId % 1000 / 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoRollXfyt.prototype, "qs", {
        /** 期数 从1开始 */
        get: function () {
            return ~~(this.id / 1000);
        },
        enumerable: true,
        configurable: true
    });
    return VoRollXfyt;
}());
__reflect(VoRollXfyt.prototype, "VoRollXfyt");
