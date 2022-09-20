var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 限定武将任务数据结构
 * @author: lujiahao
 * @date: 2019-09-12 11:33:21
 */
var VoXiandingTask = (function () {
    function VoXiandingTask() {
        /** 是否已经开启 */
        this.isOpen = false;
        // public isOpen = true;
        /** 当前任务完成计数 */
        this.curCount = 0;
        /** 任务状态 0:未完成 1:可领取 2:已领取 */
        this.state = 0;
    }
    Object.defineProperty(VoXiandingTask.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.xdwj_757[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoXiandingTask.prototype.update = function (pIsOpen, pCount, pState) {
        var t_change = false;
        if (pIsOpen != this.isOpen) {
            this.isOpen = pIsOpen;
            t_change = true;
        }
        // pCount = pCount > this.cfg.cs ? this.cfg.cs : pCount;
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
    Object.defineProperty(VoXiandingTask.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoXiandingTask.prototype, "sortValue", {
        /** 排序权值 */
        get: function () {
            var t_value = 0;
            switch (this.state) {
                case Enum_Xianding.TASK_STATE_CAN_GET:
                    t_value += 100;
                    break;
                case Enum_Xianding.TASK_STATE_NONE:
                    t_value += 10;
                    break;
                case Enum_Xianding.TASK_STATE_DONE:
                    break;
            }
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoXiandingTask;
}());
__reflect(VoXiandingTask.prototype, "VoXiandingTask");
