var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家排行榜数据结构
 * @author: lujiahao
 * @date: 2019-10-08 17:03:54
 */
var VoRankPlayer = (function () {
    function VoRankPlayer() {
        //============== 静态管理 ===================
        this.countryId = 0;
        this.rank = 0;
        this.name = "";
        this.score = 0;
    }
    //============== 静态管理 ===================
    VoRankPlayer.create = function () {
        var t_vo = Pool.getItemByClass("VoRankPlayer", VoRankPlayer);
        return t_vo;
    };
    VoRankPlayer.release = function (pVo) {
        pVo.recycle();
        Pool.recover("VoRankPlayer", pVo);
    };
    //=========================================== API ==========================================
    VoRankPlayer.prototype.update = function (pCountry, pRank, pName, pScore) {
        var t = this;
        var t_change = false;
        if (t.countryId != pCountry) {
            t.countryId = pCountry;
            t_change = true;
        }
        if (t.rank != pRank) {
            t.rank = pRank;
            t_change = true;
        }
        if (t.name != pName) {
            t.name = pName;
            t_change = true;
        }
        if (t.score != pScore) {
            t.score = pScore;
            t_change = true;
        }
        return t_change;
    };
    VoRankPlayer.prototype.recycle = function () {
        this.countryId = 0;
        this.rank = 0;
        this.name = "";
        this.score = 0;
    };
    return VoRankPlayer;
}());
__reflect(VoRankPlayer.prototype, "VoRankPlayer");
