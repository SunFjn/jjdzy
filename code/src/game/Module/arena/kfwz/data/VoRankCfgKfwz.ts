/**
 * 跨服王者配置排行榜数据结构
 * @author: lujiahao 
 * @date: 2019-12-09 15:11:51 
 */
class VoRankCfgKfwz {
    public id: number;
    public rank = 0;

    /** 段位 */
    public grade = 1;
    /** 名字 */
    public name = "";
    /** 积分 */
    public score = 0;

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Ikfwzph_770 {
        return Config.kfwzph_770[this.id];
    }

    public update(pData: { grade: number, name: string, score: number }): boolean {
        let t_change = false;
        if (ObjectUtils.modifyObject(this, pData))
            t_change = true;
        return t_change;
    }

    public reset(): boolean {
        let t_obj = { grade: 1, name: "", score: 0 };
        return ObjectUtils.modifyObject(this, t_obj);
    }

    private _rewardList: IGridImpl[];
    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
        return this._rewardList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}