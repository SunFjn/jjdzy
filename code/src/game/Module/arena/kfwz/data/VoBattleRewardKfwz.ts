/**
 * @author: lujiahao 
 * @date: 2019-12-17 17:54:39 
 */
class VoBattleRewardKfwz {
    public id: number;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Ikfwztz_770 {
        return Config.kfwztz_770[this.id];
    }

    private _rewardListWin: IGridImpl[];
    public get rewardListWin(): IGridImpl[] {
        if (this._rewardListWin === undefined)
            this._rewardListWin = ConfigHelp.makeItemListArr(this.cfg.sljl);
        return this._rewardListWin;
    }

    private _rewardListFail: IGridImpl[];
    public get rewardListFail(): IGridImpl[] {
        if (this._rewardListFail === undefined)
            this._rewardListFail = ConfigHelp.makeItemListArr(this.cfg.sbjl);
        return this._rewardListFail;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}