/**
 * 限定武将活跃奖励
 * @author: lujiahao 
 * @date: 2019-09-12 14:51:50 
 */
class VoXiandingReward {
    public id: number;

    public state = 0;

    private _rewardList: IGridImpl[];

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Ixdwjhy_757 {
        return Config.xdwjhy_757[this.id];
    }

    public update(pState: number) {
        let t_change = false;
        if (pState != this.state) {
            this.state = pState;
            t_change = true;
        }
        return t_change;
    }

    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
        return this._rewardList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}