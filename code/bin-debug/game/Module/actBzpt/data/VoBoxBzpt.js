var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 宝藏拼图宝箱奖励数据结构
 * @author: lujiahao
 * @date: 2019-11-26 15:55:26
 */
var VoBoxBzpt = (function () {
    function VoBoxBzpt() {
        this.state = 0;
    }
    Object.defineProperty(VoBoxBzpt.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.bzptjlb_333[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBoxBzpt.prototype, "pos", {
        get: function () {
            return this.id % 1000;
        },
        enumerable: true,
        configurable: true
    });
    VoBoxBzpt.prototype.update = function (pData) {
        var t_change = false;
        if (ObjectUtils.modifyObject(this, pData))
            t_change = true;
        return t_change;
    };
    Object.defineProperty(VoBoxBzpt.prototype, "curCount", {
        get: function () {
            var t = this;
            var t_model = GGlobal.modelBzpt;
            var t_count = 0;
            var t_list = t.taskIdList;
            for (var _i = 0, t_list_1 = t_list; _i < t_list_1.length; _i++) {
                var v = t_list_1[_i];
                var t_vo = t_model.getTaskVoById(v);
                if (t_vo && t_vo.state == 2) {
                    t_count++;
                }
            }
            return t_count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBoxBzpt.prototype, "maxCount", {
        get: function () {
            return this.taskIdList.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBoxBzpt.prototype, "taskIdList", {
        get: function () {
            if (this._taskIdList === undefined) {
                var t_soure = JSON.parse(this.cfg.rw);
                this._taskIdList = [];
                for (var _i = 0, t_soure_1 = t_soure; _i < t_soure_1.length; _i++) {
                    var v = t_soure_1[_i];
                    this._taskIdList.push(v[0]);
                }
            }
            return this._taskIdList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBoxBzpt.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoBoxBzpt;
}());
__reflect(VoBoxBzpt.prototype, "VoBoxBzpt");
