/**
 * 队伍列表数据结构
 * @author: lujiahao 
 * @date: 2019-12-13 18:04:06 
 */
class VoTeamListKfwz {
    static getFromPool(): VoTeamListKfwz {
        return Pool.getItemByClass("VoTeamListKfwz", VoTeamListKfwz);
    }

    static recycleToPool(pVo: VoTeamListKfwz) {
        pVo.recycle();
        Pool.recover("VoTeamListKfwz", pVo);
    }

    public teamId = 0;
    public name = "";
    public head = 0;
    public headGrid = 0;
    /** 队伍人数 */
    public count = 0;

    constructor() {
    }
    //=========================================== API ==========================================
    public recycle() {
        let t = this;
        t.teamId = 0;
        t.name = "";
        t.head = 0;
        t.headGrid = 0;
        t.count = 0;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}