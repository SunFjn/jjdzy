/**
 * 限定武将任务数据结构
 * @author: lujiahao 
 * @date: 2019-09-12 11:33:21 
 */
class VoXiandingTask {
    public id: number;

    /** 是否已经开启 */
    public isOpen = false;
    // public isOpen = true;
    /** 当前任务完成计数 */
    public curCount = 0;
    /** 任务状态 0:未完成 1:可领取 2:已领取 */
    public state = 0;

    private _rewardList: IGridImpl[];

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Ixdwj_757 {
        return Config.xdwj_757[this.id];
    }

    public update(pIsOpen: boolean, pCount: number, pState: number): boolean {
        let t_change = false;
        if (pIsOpen != this.isOpen) {
            this.isOpen = pIsOpen;
            t_change = true;
        }

        // pCount = pCount > this.cfg.cs ? this.cfg.cs : pCount;
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

    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
        return this._rewardList;
    }

    /** 排序权值 */
    public get sortValue(): number {
        let t_value = 0;
        switch (this.state) {
            case Enum_Xianding.TASK_STATE_CAN_GET:
                t_value += 100;
                break;
            case Enum_Xianding.TASK_STATE_NONE:
                t_value += 10;
                break;
            case Enum_Xianding.TASK_STATE_DONE:
                break;
        }
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}