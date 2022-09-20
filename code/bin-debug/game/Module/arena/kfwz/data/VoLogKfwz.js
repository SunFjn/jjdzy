var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跨服王者日志数据结构
 * @author: lujiahao
 * @date: 2019-12-11 11:06:33
 */
var VoLogKfwz = (function () {
    function VoLogKfwz() {
        this.isFold = true;
        /** 胜负 1胜2负 */
        this.result = 0;
        /** 积分 */
        this.score = 0;
        this.myTeamList = [];
        this.enemyTeamList = [];
    }
    VoLogKfwz.getFromPool = function () {
        return Pool.getItemByClass("VoLogKfwz", VoLogKfwz);
    };
    VoLogKfwz.recycleToPool = function (pVo) {
        pVo.recycle();
        Pool.recover("VoLogKfwz", pVo);
    };
    //=========================================== API ==========================================
    VoLogKfwz.prototype.recycle = function () {
        var t = this;
        t.isFold = true;
        t.result = 0;
        t.score = 0;
        for (var i = t.myTeamList.length - 1; i >= 0; i--) {
            var t_vo = t.myTeamList[i];
            VoLogPlayerKfwz.recycleToPool(t_vo);
            t.myTeamList.splice(i, 1);
        }
        for (var i = t.enemyTeamList.length - 1; i >= 0; i--) {
            var t_vo = t.enemyTeamList[i];
            VoLogPlayerKfwz.recycleToPool(t_vo);
            t.enemyTeamList.splice(i, 1);
        }
    };
    Object.defineProperty(VoLogKfwz.prototype, "enemyLeaderName", {
        get: function () {
            var t = this;
            for (var _i = 0, _a = t.enemyTeamList; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.isLeader) {
                    return v.name;
                }
            }
            return "";
        },
        enumerable: true,
        configurable: true
    });
    return VoLogKfwz;
}());
__reflect(VoLogKfwz.prototype, "VoLogKfwz");
