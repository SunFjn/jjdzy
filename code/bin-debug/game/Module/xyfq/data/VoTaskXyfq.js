var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 幸运福签目标任务数据结构
 * @author: lujiahao
 * @date: 2020-04-08 11:36:08
 */
var VoTaskXyfq = (function () {
    function VoTaskXyfq() {
        /** 类型 1总目标 2每日目标 */
        this.type = 0;
        /** 是否已经领取 */
        this.hasGet = false;
    }
    Object.defineProperty(VoTaskXyfq.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            var t = this;
            if (t.type == 1)
                return Config.xyfqhd_508[t.id];
            else
                return Config.xyfqmr_508[t.id];
        },
        enumerable: true,
        configurable: true
    });
    VoTaskXyfq.prototype.update = function (pData) {
        var t = this;
        var t_change = false;
        var t_hasGet = (pData.state == 2);
        if (t.hasGet != t_hasGet) {
            t.hasGet = t_hasGet;
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoTaskXyfq.prototype, "state", {
        /**
         * 任务状态 0未达成 1可领取 2已领取
         */
        get: function () {
            var t = this;
            if (t.hasGet) {
                return 2; //已领取
            }
            else {
                var t_model = GGlobal.modelXyfq;
                var t_count = 0;
                if (t.type == 1) {
                    t_count = t_model.countTotal;
                }
                else {
                    t_count = t_model.countDaily;
                }
                if (t_count >= t.cfg.time) {
                    return 1; //可领取
                }
                else
                    return 0; //未达成
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoTaskXyfq.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoTaskXyfq.prototype, "sortValue", {
        get: function () {
            var t = this;
            var t_value = 0;
            var t_state = t.state;
            switch (t_state) {
                case 1:
                    t_value += 10000000;
                    break;
                case 0:
                    break;
                case 2:
                    t_value -= 10000000;
                    break;
            }
            t_value -= t.id;
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoTaskXyfq;
}());
__reflect(VoTaskXyfq.prototype, "VoTaskXyfq");
