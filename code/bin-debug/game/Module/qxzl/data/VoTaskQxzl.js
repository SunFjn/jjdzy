var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 群雄逐鹿任务数据结构
 * @author: lujiahao
 * @date: 2019-09-30 11:43:08
 */
var VoTaskQxzl = (function () {
    function VoTaskQxzl() {
        this.lastId = 0;
        this.state = 0;
        this.count = 0;
    }
    Object.defineProperty(VoTaskQxzl.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.qxzlrw_273[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoTaskQxzl.prototype.update = function (pState, pCount) {
        var t_change = false;
        if (this.state != pState) {
            this.state = pState;
            t_change = true;
        }
        if (this.count != pCount) {
            this.count = pCount;
            t_change = true;
        }
        if (this.lastVo) {
            //收到对应id，则前面任务链都必定做完
            //回溯上去
            this.lastVo.update(EnumQxzl.STATE_DONE, pCount);
        }
        return t_change;
    };
    Object.defineProperty(VoTaskQxzl.prototype, "tabType", {
        get: function () {
            if (this._tabType === undefined) {
                this._tabType = ~~((~~this.id) / 1000);
            }
            return this._tabType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoTaskQxzl.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoTaskQxzl.prototype, "sortValue", {
        /** 排序权值 */
        get: function () {
            var t_value = 0;
            switch (this.state) {
                case EnumQxzl.STATE_CAN_GET:
                    t_value += 100;
                    break;
                case EnumQxzl.STATE_NONE:
                    t_value += 10;
                    break;
                case EnumQxzl.STATE_DONE:
                    break;
            }
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoTaskQxzl;
}());
__reflect(VoTaskQxzl.prototype, "VoTaskQxzl");
