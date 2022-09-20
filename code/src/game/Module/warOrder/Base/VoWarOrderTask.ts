/**
 * 三国战令任务数据结构
 * @author: lujiahao 
 * @date: 2019-09-19 14:26:22 
 */
class VoWarOrderTask {
    public taskId: number;
    public get type() {
        // return Math.floor(this.taskId % 10000 / 100)
        return this.cfg.lx
    }


    public curCount = 0;
    public state = 0;

    private _rewardList: IGridImpl[];

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Ixslday1_338 | Ixslweek1_338 {
        return this._cfg;
    }

    private _cfg: Ixslday1_338 | Ixslweek1_338
    public set cfg(v: Ixslday1_338 | Ixslweek1_338) {
        this._cfg = v
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
            case Model_WarOrderAct.STATE_CAN_GET:
                t_value += 100;
                break;
            case Model_WarOrderAct.STATE_NONE:
                t_value += 10;
                break;
            case Model_WarOrderAct.SATTE_DONE:
                break;
        }
        return t_value;
    }

    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined) {
            // let it = VoItem.create(this.cfg.lx)
            let it = VoItem.create(this.cfg.jy)
            it.count = this.cfg.exp
            this._rewardList = [it]
        }
        // this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
        return this._rewardList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}