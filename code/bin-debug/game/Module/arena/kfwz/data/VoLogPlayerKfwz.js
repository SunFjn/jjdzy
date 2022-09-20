var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跨服王者战报玩家信息
 * @author: lujiahao
 * @date: 2019-12-11 20:30:03
 */
var VoLogPlayerKfwz = (function () {
    function VoLogPlayerKfwz() {
        this.roleId = 0;
        this.isLeader = 0;
        this.head = 0;
        this.headGrid = 0;
        this.name = "";
    }
    VoLogPlayerKfwz.getFromPool = function () {
        return Pool.getItemByClass("VoLogPlayerKfwz", VoLogPlayerKfwz);
    };
    VoLogPlayerKfwz.recycleToPool = function (pVo) {
        pVo.recycle();
        Pool.recover("VoLogPlayerKfwz", pVo);
    };
    //=========================================== API ==========================================
    VoLogPlayerKfwz.prototype.recycle = function () {
        var t = this;
        t.roleId = 0;
        t.isLeader = 0;
        t.head = 0;
        t.headGrid = 0;
        t.name = "";
    };
    return VoLogPlayerKfwz;
}());
__reflect(VoLogPlayerKfwz.prototype, "VoLogPlayerKfwz");
