var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 轮回副本的战斗数据
 * @author: lujiahao
 * @date: 2020-03-05 16:55:05
 */
var VoBattleLhfb = (function () {
    function VoBattleLhfb() {
        this.roleId = 0;
        this.curHp = 0;
    }
    VoBattleLhfb.getFromPool = function () {
        return Pool.getItemByClass("VoBattleLhfb", VoBattleLhfb);
    };
    VoBattleLhfb.recycleToPool = function (pVo) {
        pVo.recycle();
        Pool.recover("VoBattleLhfb", pVo);
    };
    //=========================================== API ==========================================
    VoBattleLhfb.prototype.recycle = function () {
        var t = this;
        t.roleId = 0;
        t.curHp = 0;
    };
    return VoBattleLhfb;
}());
__reflect(VoBattleLhfb.prototype, "VoBattleLhfb");
