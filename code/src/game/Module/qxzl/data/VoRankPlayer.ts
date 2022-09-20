/**
 * 玩家排行榜数据结构
 * @author: lujiahao 
 * @date: 2019-10-08 17:03:54 
 */
class VoRankPlayer {

    //============== 静态管理 ===================
    static create(): VoRankPlayer {
        let t_vo = Pool.getItemByClass("VoRankPlayer", VoRankPlayer);
        return t_vo;
    }

    static release(pVo: VoRankPlayer) {
        pVo.recycle();
        Pool.recover("VoRankPlayer", pVo);
    }
    //============== 静态管理 ===================


    public countryId = 0;
    public rank = 0;
    public name = "";
    public score = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public update(pCountry: number, pRank: number, pName: string, pScore: number): boolean {
        let t = this;
        let t_change = false;

        if (t.countryId != pCountry) {
            t.countryId = pCountry;
            t_change = true;
        }
        if (t.rank != pRank) {
            t.rank = pRank;
            t_change = true;
        }
        if (t.name != pName) {
            t.name = pName;
            t_change = true;
        }
        if (t.score != pScore) {
            t.score = pScore;
            t_change = true;
        }
        return t_change;
    }

    public recycle() {
        this.countryId = 0;
        this.rank = 0;
        this.name = "";
        this.score = 0;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}