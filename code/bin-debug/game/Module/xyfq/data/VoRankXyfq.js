var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2020-04-08 16:20:35
 */
var VoRankXyfq = (function () {
    function VoRankXyfq() {
        this.rank = 0;
        this.name = "";
        this.count = 0;
    }
    Object.defineProperty(VoRankXyfq.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.xyfqrank_508[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoRankXyfq.prototype.update = function (pData) {
        return ObjectUtils.modifyObject(this, pData);
    };
    VoRankXyfq.prototype.reset = function () {
        var t_obj = { name: "", count: 0 };
        return ObjectUtils.modifyObject(this, t_obj);
    };
    Object.defineProperty(VoRankXyfq.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoRankXyfq;
}());
__reflect(VoRankXyfq.prototype, "VoRankXyfq");
