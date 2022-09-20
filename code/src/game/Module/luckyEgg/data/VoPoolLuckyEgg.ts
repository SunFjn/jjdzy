/**
 * 奖池数据结构
 * @author: lujiahao 
 * @date: 2020-01-04 15:36:00 
 */
class VoPoolLuckyEgg {
    /** 奖池id */
    public id: number;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Iluckegg_295 {
        return Config.luckegg_295[this.id];
    }

    private _poolType: number;
    /** 奖池类型 */
    public get poolType(): number {
        let t = this;
        if (t._poolType === undefined) {
            t._poolType = t.id % 10;
        }
        return t._poolType;
    }

    private _rewardList: IGridImpl[];
    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.show);
        return this._rewardList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}