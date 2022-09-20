/**
 * 跨服王者日志数据结构
 * @author: lujiahao 
 * @date: 2019-12-11 11:06:33 
 */
class VoLogKfwz {

    static getFromPool(): VoLogKfwz {
        return Pool.getItemByClass("VoLogKfwz", VoLogKfwz);
    }

    static recycleToPool(pVo: VoLogKfwz) {
        pVo.recycle();
        Pool.recover("VoLogKfwz", pVo);
    }

    public isFold = true;

    /** 胜负 1胜2负 */
    public result = 0;
    /** 积分 */
    public score = 0;

    public myTeamList: VoLogPlayerKfwz[] = [];
    public enemyTeamList: VoLogPlayerKfwz[] = [];

    constructor() {
    }

    //=========================================== API ==========================================
    public recycle() {
        let t = this;
        t.isFold = true;
        t.result = 0;
        t.score = 0;

        for (let i = t.myTeamList.length - 1; i >= 0; i--) {
            let t_vo = t.myTeamList[i];
            VoLogPlayerKfwz.recycleToPool(t_vo);
            t.myTeamList.splice(i, 1);
        }

        for (let i = t.enemyTeamList.length - 1; i >= 0; i--) {
            let t_vo = t.enemyTeamList[i];
            VoLogPlayerKfwz.recycleToPool(t_vo);
            t.enemyTeamList.splice(i, 1);
        }
    }

    public get enemyLeaderName(): string {
        let t = this;
        for (let v of t.enemyTeamList) {
            if (v.isLeader) {
                return v.name;
            }
        }
        return "";
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}
