/**
 * @author: lujiahao 
 * @date: 2019-10-24 20:05:32 
 */
class VoTargetQice {
    public id: number

    /** 剩余可领奖次数 -1已领取 0未达条件 >0可领奖次数 */
    public remain = 0;

    private _rewardList: IGridImpl[];

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Icmhcmb_761 {
        return Config.cmhcmb_761[this.id];
    }

    public update(pRemain: number) {
        let t_change = false;
        if (this.remain != pRemain) {
            this.remain = pRemain;
            t_change = true;
        }
        return t_change;
    }

    /** 状态 0未达条件 1可领取 2已领取 */
    public get state(): number {
        if (this.remain > 0)
            return 1;
        else if (this.remain == 0)
            return 0;
        else
            return 2;
    }

    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.gj);
        return this._rewardList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}