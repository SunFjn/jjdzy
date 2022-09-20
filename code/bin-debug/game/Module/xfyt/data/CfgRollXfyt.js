var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-30 16:20:34
 */
var CfgRollXfyt = (function () {
    function CfgRollXfyt() {
    }
    Object.defineProperty(CfgRollXfyt.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.xfyt_763[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgRollXfyt.prototype, "pos", {
        /** 位置 从1开始 */
        get: function () {
            return this.id % 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgRollXfyt.prototype, "round", {
        /** 圈数 从1开始 */
        get: function () {
            return ~~(this.id % 1000 / 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgRollXfyt.prototype, "rewardItem", {
        get: function () {
            if (this.pos == 1)
                return null;
            if (this._rewardItem === undefined) {
                var t_list = ConfigHelp.makeItemListArr(this.cfg.reward);
                if (t_list && t_list.length > 0) {
                    this._rewardItem = t_list[0];
                }
                else
                    this._rewardItem = null;
            }
            return this._rewardItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CfgRollXfyt.prototype, "hasGet", {
        /** 是否已经获取了奖励 */
        get: function () {
            var t = this;
            var t_model = GGlobal.modelXfyt;
            if (t_model.info.round == t.round) {
                //相同圈数
                if (t.id <= t_model.info.id)
                    return true;
                else
                    return false;
            }
            else {
                //不同圈数
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    return CfgRollXfyt;
}());
__reflect(CfgRollXfyt.prototype, "CfgRollXfyt");
