/**
 * 跨服王者战斗中的玩家数据
 * @author: lujiahao 
 * @date: 2019-12-12 11:46:52 
 */
class VoBattlePlayerKfwz {
    static getFromPool(): VoBattlePlayerKfwz {
        return Pool.getItemByClass("VoBattlePlayerKfwz", VoBattlePlayerKfwz);
    }
    static recycleToPool(pVo: VoBattlePlayerKfwz) {
        pVo.recycle();
        Pool.recover("VoBattlePlayerKfwz", pVo);
    }

    public roleId = 0;
    public head = 0;
    public headGrid = 0;
    public name = "";
    public power = 0;

    public index = -1;

    /** 类型 0人 1电脑 */
    public type = 0;

    /** 是否死亡 0存活 1死亡 */
    public isDead = 0;

    /** 势力 1左边 2右边 */
    public force = 0;

    constructor() {
    }
    //=========================================== API ==========================================
    public recycle() {
        let t = this;
        t.roleId = 0;
        t.head = 0;
        t.headGrid = 0;
        t.name = "";
        t.power = 0;
        t.type = 0;
        t.isDead = 0;
        t.index = -1;
        t.force = 0;
    }

    public get curHp(): number {
        let t = this;
        let t_unit = GGlobal.mapscene.getUnit(t.roleId);
        if (t_unit) {
            return t_unit.curhp;
        }
        return 0;
    }

    public get maxHp(): number {
        let t = this;
        let t_unit = GGlobal.mapscene.getUnit(t.roleId);
        if (t_unit) {
            return t_unit.maxhp;
        }
        return 0;
    }

    /** 排序权重 */
    public get sortValue(): number {
        let t = this;
        let t_value = 0;
        if (t.isDead == 0) {
            t_value += 1000;
            t_value -= t.index;
        }
        else {
            t_value += 100;
            t_value += t.index;
        }
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}