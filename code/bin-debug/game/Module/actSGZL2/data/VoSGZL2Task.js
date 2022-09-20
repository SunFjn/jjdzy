var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 三国战令任务数据结构
 * @author: lujiahao
 * @date: 2019-09-19 14:26:22
 */
var VoSGZL2Task = (function () {
    function VoSGZL2Task() {
        this.curCount = 0;
        this.state = 0;
    }
    Object.defineProperty(VoSGZL2Task.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.sgzlrw_332[this.taskId];
        },
        enumerable: true,
        configurable: true
    });
    VoSGZL2Task.prototype.update = function (pCount, pState) {
        var t_change = false;
        if (pCount != this.curCount) {
            this.curCount = pCount;
            t_change = true;
        }
        if (pState != this.state) {
            this.state = pState;
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoSGZL2Task.prototype, "sortValue", {
        /** 排序权值 */
        get: function () {
            var t_value = 0;
            switch (this.state) {
                case Enum_SGZL.STATE_CAN_GET:
                    t_value += 100;
                    break;
                case Enum_SGZL.STATE_NONE:
                    t_value += 10;
                    break;
                case Enum_SGZL.SATTE_DONE:
                    break;
            }
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSGZL2Task.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.putong);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoSGZL2Task;
}());
__reflect(VoSGZL2Task.prototype, "VoSGZL2Task");
