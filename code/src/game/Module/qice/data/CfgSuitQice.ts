/**
 * @author: lujiahao 
 * @date: 2019-10-23 20:05:49 
 */
class CfgSuitQice {
    public level: number;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Iqctz_760 {
        return Config.qctz_760[this.level];
    }

    /** 是否激活 */
    public get isActive(): boolean {
        return GGlobal.modelQice.suitLv >= this.level;
    }

    /** 当前满足条件的数量 */
    public get curCount(): number {
        let t_dataList = GGlobal.modelQice.getVoList();
        let t_count = 0;
        for (let v of t_dataList) {
            if (v.star >= this.requireStar)
                t_count++;
        }
        return t_count;
    }

    public get requireStar(): number {
        let t_lastCfg = GGlobal.modelQice.getCfgSuit(this.level - 1);
        if (t_lastCfg)
            return t_lastCfg.cfg.tj;
        return 0;
    }

    /** 当前条件需求总数 */
    public get maxCount(): number {
        return GGlobal.modelQice.getVoList().length;
    }

    /** 是否满足升级条件 */
    public checkCanUp(): boolean {
        if (this.curCount >= this.maxCount)
            return true;
        else
            return false;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}