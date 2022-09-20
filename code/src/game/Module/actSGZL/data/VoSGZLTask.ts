/**
 * 三国战令任务数据结构
 * @author: lujiahao 
 * @date: 2019-09-19 14:26:22 
 */
class VoSGZLTask {
    public taskId: number;

    public curCount = 0;
    public state = 0;

    private _rewardList: IGridImpl[];

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Isgzlrw_017 {
        return Config.sgzlrw_017[this.taskId];
    }

    public update(pCount: number, pState: number): boolean {
        let t_change = false;

        if (pCount != this.curCount) {
            this.curCount = pCount;
            t_change = true;
        }

        if (pState != this.state) {
            this.state = pState;
            t_change = true;
        }

        return t_change;
    }

    /** 排序权值 */
    public get sortValue(): number {
        let t_value = 0;
        switch (this.state) {
            case Enum_SGZL.STATE_CAN_GET:
                t_value += 100;
                break;
            case Enum_SGZL.STATE_NONE:
                t_value += 10;
                break;
            case Enum_SGZL.SATTE_DONE:
                break;
        }
        return t_value;
    }

    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.putong);
        return this._rewardList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}