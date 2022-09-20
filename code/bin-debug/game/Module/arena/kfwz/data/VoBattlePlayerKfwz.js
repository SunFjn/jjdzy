var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跨服王者战斗中的玩家数据
 * @author: lujiahao
 * @date: 2019-12-12 11:46:52
 */
var VoBattlePlayerKfwz = (function () {
    function VoBattlePlayerKfwz() {
        this.roleId = 0;
        this.head = 0;
        this.headGrid = 0;
        this.name = "";
        this.power = 0;
        this.index = -1;
        /** 类型 0人 1电脑 */
        this.type = 0;
        /** 是否死亡 0存活 1死亡 */
        this.isDead = 0;
        /** 势力 1左边 2右边 */
        this.force = 0;
    }
    VoBattlePlayerKfwz.getFromPool = function () {
        return Pool.getItemByClass("VoBattlePlayerKfwz", VoBattlePlayerKfwz);
    };
    VoBattlePlayerKfwz.recycleToPool = function (pVo) {
        pVo.recycle();
        Pool.recover("VoBattlePlayerKfwz", pVo);
    };
    //=========================================== API ==========================================
    VoBattlePlayerKfwz.prototype.recycle = function () {
        var t = this;
        t.roleId = 0;
        t.head = 0;
        t.headGrid = 0;
        t.name = "";
        t.power = 0;
        t.type = 0;
        t.isDead = 0;
        t.index = -1;
        t.force = 0;
    };
    Object.defineProperty(VoBattlePlayerKfwz.prototype, "curHp", {
        get: function () {
            var t = this;
            var t_unit = GGlobal.mapscene.getUnit(t.roleId);
            if (t_unit) {
                return t_unit.curhp;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBattlePlayerKfwz.prototype, "maxHp", {
        get: function () {
            var t = this;
            var t_unit = GGlobal.mapscene.getUnit(t.roleId);
            if (t_unit) {
                return t_unit.maxhp;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBattlePlayerKfwz.prototype, "sortValue", {
        /** 排序权重 */
        get: function () {
            var t = this;
            var t_value = 0;
            if (t.isDead == 0) {
                t_value += 1000;
                t_value -= t.index;
            }
            else {
                t_value += 100;
                t_value += t.index;
            }
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoBattlePlayerKfwz;
}());
__reflect(VoBattlePlayerKfwz.prototype, "VoBattlePlayerKfwz");
