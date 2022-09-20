var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_battle = (function () {
    function Vo_battle() {
        this.buffData = {};
        this.mapID = 0;
        this.isDrop = false;
        this.dropArr = [];
        this.sysID = 0;
        this.backID = 0;
        this.battleRes = 0;
        this.bossId = 0;
        this.leftArr = [];
        this.rightArr = [];
        this.enemyArr = [];
    }
    Vo_battle.create = function (leftArr, rightArr, bossId) {
        var vo = new Vo_battle();
        vo.leftArr = leftArr;
        vo.rightArr = rightArr;
        vo.bossId = bossId;
        return vo;
    };
    return Vo_battle;
}());
__reflect(Vo_battle.prototype, "Vo_battle");
