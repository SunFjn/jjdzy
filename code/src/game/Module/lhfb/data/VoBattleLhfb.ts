/**
 * 轮回副本的战斗数据
 * @author: lujiahao 
 * @date: 2020-03-05 16:55:05 
 */
class VoBattleLhfb {
    public roleId = 0;
    public curHp = 0;

    static getFromPool(): VoBattleLhfb {
        return Pool.getItemByClass("VoBattleLhfb", VoBattleLhfb);
    }
    static recycleToPool(pVo: VoBattleLhfb) {
        pVo.recycle();
        Pool.recover("VoBattleLhfb", pVo);
    }

    constructor() {
    }

    //=========================================== API ==========================================
    public recycle() {
        let t = this;
        t.roleId = 0;
        t.curHp = 0;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}