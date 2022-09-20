/**
 * 跨服王者战报玩家信息
 * @author: lujiahao 
 * @date: 2019-12-11 20:30:03 
 */
class VoLogPlayerKfwz {

    static getFromPool(): VoLogPlayerKfwz {
        return Pool.getItemByClass("VoLogPlayerKfwz", VoLogPlayerKfwz);
    }

    static recycleToPool(pVo: VoLogPlayerKfwz) {
        pVo.recycle();
        Pool.recover("VoLogPlayerKfwz", pVo);
    }

    public roleId = 0;
    public isLeader = 0;
    public head = 0;
    public headGrid = 0;
    public name = "";

    constructor() {
    }

    //=========================================== API ==========================================
    public recycle() {
        let t = this;
        t.roleId = 0;
        t.isLeader = 0;
        t.head = 0;
        t.headGrid = 0;
        t.name = "";
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}