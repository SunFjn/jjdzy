/**
 * @author: lujiahao 
 * @date: 2019-10-08 20:52:11 
 */
class VoRankQxzl {
    public id: number;

    constructor() {
    }

    private _rewardList: IGridImpl[];

    //=========================================== API ==========================================
    public get cfg(): Iqxzlrank_273 {
        return Config.qxzlrank_273[this.id];
    }

    private _type: number;
    public get type(): number {
        if (this._type === undefined) {
            this._type = ~~(this.id / 100);
        }
        return this._type;
    }

    private _rank: number;
    public get rank(): number {
        if (this._rank === undefined) {
            this._rank = this.id % 100;
        }
        return this._rank;
    }

    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
        return this._rewardList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}