var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 队伍列表数据结构
 * @author: lujiahao
 * @date: 2019-12-13 18:04:06
 */
var VoTeamListKfwz = (function () {
    function VoTeamListKfwz() {
        this.teamId = 0;
        this.name = "";
        this.head = 0;
        this.headGrid = 0;
        /** 队伍人数 */
        this.count = 0;
    }
    VoTeamListKfwz.getFromPool = function () {
        return Pool.getItemByClass("VoTeamListKfwz", VoTeamListKfwz);
    };
    VoTeamListKfwz.recycleToPool = function (pVo) {
        pVo.recycle();
        Pool.recover("VoTeamListKfwz", pVo);
    };
    //=========================================== API ==========================================
    VoTeamListKfwz.prototype.recycle = function () {
        var t = this;
        t.teamId = 0;
        t.name = "";
        t.head = 0;
        t.headGrid = 0;
        t.count = 0;
    };
    return VoTeamListKfwz;
}());
__reflect(VoTeamListKfwz.prototype, "VoTeamListKfwz");
