var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跨服王者配置排行榜数据结构
 * @author: lujiahao
 * @date: 2019-12-09 15:11:51
 */
var VoRankCfgKfwz = (function () {
    function VoRankCfgKfwz() {
        this.rank = 0;
        /** 段位 */
        this.grade = 1;
        /** 名字 */
        this.name = "";
        /** 积分 */
        this.score = 0;
    }
    Object.defineProperty(VoRankCfgKfwz.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.kfwzph_770[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoRankCfgKfwz.prototype.update = function (pData) {
        var t_change = false;
        if (ObjectUtils.modifyObject(this, pData))
            t_change = true;
        return t_change;
    };
    VoRankCfgKfwz.prototype.reset = function () {
        var t_obj = { grade: 1, name: "", score: 0 };
        return ObjectUtils.modifyObject(this, t_obj);
    };
    Object.defineProperty(VoRankCfgKfwz.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoRankCfgKfwz;
}());
__reflect(VoRankCfgKfwz.prototype, "VoRankCfgKfwz");
