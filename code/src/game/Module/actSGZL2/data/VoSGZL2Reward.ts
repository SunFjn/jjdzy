/**
 * 三国战令奖励数据结构
 * @author: lujiahao 
 * @date: 2019-09-19 16:06:03 
 */
class VoSGZL2Reward {
    public id: number;

    /** 普通状态 */
    public state0: number = 0;
    /** 升级状态 */
    public state1: number = 1;

    private _rewardList0: IGridImpl[];
    private _rewardList1: IGridImpl[];

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Isgzljl_332 {
        return Config.sgzljl_332[this.id];
    }

    public updateState(pType: number, pState: number): boolean {
        let t_change = false;
        switch (pType) {
            case 0:
                if (pState != this.state0) {
                    this.state0 = pState;
                    t_change = true;
                }
                break;
            case 1:
                if (pState != this.state1) {
                    this.state1 = pState;
                    t_change = true;
                }
                break;
        }
        return t_change;
    }

    public get rewardList0(): IGridImpl[] {
        if (this._rewardList0 === undefined)
            try {
                this._rewardList0 = ConfigHelp.makeItemListArr(this.cfg.putong);
            } catch (error) {
                this._rewardList0 = [];
            }
        return this._rewardList0;
    }

    public get rewardList1(): IGridImpl[] {
        if (this._rewardList1 === undefined)
            try {
                this._rewardList1 = ConfigHelp.makeItemListArr(this.cfg.jinjie);
            } catch (error) {
                this._rewardList1 = [];
            }
        return this._rewardList1;
    }

    /** 排序权值 */
    public get sortValue(): number {
        let t_value = 0;
        if (this.state0 == Enum_SGZL.STATE_CAN_GET || this.state1 == Enum_SGZL.STATE_CAN_GET) {
            t_value += 100;
        }
        else if (this.state0 == Enum_SGZL.STATE_NONE && this.state1 == Enum_SGZL.STATE_NONE) {
            t_value += 10;
        }
        else {
        }
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}