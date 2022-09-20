var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 三国战令任务数据结构
 * @author: lujiahao
 * @date: 2019-09-19 14:26:22
 */
var VoWarOrderTask = (function () {
    function VoWarOrderTask() {
        this.curCount = 0;
        this.state = 0;
    }
    Object.defineProperty(VoWarOrderTask.prototype, "type", {
        get: function () {
            // return Math.floor(this.taskId % 10000 / 100)
            return this.cfg.lx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoWarOrderTask.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return this._cfg;
        },
        set: function (v) {
            this._cfg = v;
        },
        enumerable: true,
        configurable: true
    });
    VoWarOrderTask.prototype.update = function (pCount, pState) {
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
    Object.defineProperty(VoWarOrderTask.prototype, "sortValue", {
        /** 排序权值 */
        get: function () {
            var t_value = 0;
            switch (this.state) {
                case Model_WarOrderAct.STATE_CAN_GET:
                    t_value += 100;
                    break;
                case Model_WarOrderAct.STATE_NONE:
                    t_value += 10;
                    break;
                case Model_WarOrderAct.SATTE_DONE:
                    break;
            }
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoWarOrderTask.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined) {
                // let it = VoItem.create(this.cfg.lx)
                var it = VoItem.create(this.cfg.jy);
                it.count = this.cfg.exp;
                this._rewardList = [it];
            }
            // this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoWarOrderTask;
}());
__reflect(VoWarOrderTask.prototype, "VoWarOrderTask");
