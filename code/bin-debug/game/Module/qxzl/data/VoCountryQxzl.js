var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 国家的数据结构
 * @author: lujiahao
 * @date: 2019-09-27 17:33:38
 */
var VoCountryQxzl = (function () {
    function VoCountryQxzl() {
        /** 国家所属id 0无 1魏 2蜀 3吴 */
        this.countryId = 0;
        /** 总积分 */
        this.score = 0;
        /** 占领数量 */
        this.count = 0;
        /** 排名 */
        this.rank = 0;
    }
    //=========================================== API ==========================================
    VoCountryQxzl.prototype.update = function (pCount, pScore, pRank) {
        var t_change = false;
        if (!(pCount === undefined) && pCount != this.count) {
            this.count = pCount;
            t_change = true;
        }
        if (!(pScore === undefined) && this.score != pScore) {
            this.score = pScore;
            t_change = true;
        }
        if (!(pRank === undefined) && this.rank != pRank) {
            this.rank = pRank;
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoCountryQxzl.prototype, "rewardList", {
        get: function () {
            var t = this;
            if (t.rank >= 1) {
                var t_rankVoList = GGlobal.modelQxzl.getRankVoListByType(1);
                var t_rank = t_rankVoList[this.rank - 1];
                if (t_rank) {
                    return t_rank.rewardList;
                }
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    return VoCountryQxzl;
}());
__reflect(VoCountryQxzl.prototype, "VoCountryQxzl");
