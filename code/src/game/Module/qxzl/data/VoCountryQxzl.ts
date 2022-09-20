/**
 * 国家的数据结构
 * @author: lujiahao 
 * @date: 2019-09-27 17:33:38 
 */
class VoCountryQxzl {
    /** 国家所属id 0无 1魏 2蜀 3吴 */
    public countryId: number = 0;

    /** 总积分 */
    public score = 0;
    /** 占领数量 */
    public count = 0;

    /** 排名 */
    public rank = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public update(pCount: number, pScore: number, pRank: number): boolean {
        let t_change = false;
        if (!(pCount === undefined) && pCount != this.count) {
            this.count = pCount;
            t_change = true;
        }
        if (!(pScore === undefined) && this.score != pScore) {
            this.score = pScore;
            t_change = true;
        }
        if (!(pRank === undefined) && this.rank != pRank) {
            this.rank = pRank;
            t_change = true;
        }
        return t_change;
    }

    public get rewardList(): IGridImpl[] {
        let t = this;
        if (t.rank >= 1) {
            let t_rankVoList = GGlobal.modelQxzl.getRankVoListByType(1);
            let t_rank = t_rankVoList[this.rank - 1];
            if (t_rank) {
                return t_rank.rewardList;
            }
        }
        return [];
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}