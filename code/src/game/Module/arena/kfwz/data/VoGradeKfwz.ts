/**
 * 跨服王者段位数据结构
 * @author: lujiahao 
 * @date: 2019-12-07 14:48:59 
 */
class VoGradeKfwz {
    public id: number;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Ikfwzdw_770 {
        return Config.kfwzdw_770[this.id];
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