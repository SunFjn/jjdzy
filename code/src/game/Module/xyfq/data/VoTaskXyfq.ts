/**
 * 幸运福签目标任务数据结构
 * @author: lujiahao 
 * @date: 2020-04-08 11:36:08 
 */
class VoTaskXyfq {
    public id: number;
    /** 类型 1总目标 2每日目标 */
    public type = 0;

    public key: string;

    /** 是否已经领取 */
    public hasGet = false;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Ixyfqmr_508 | Ixyfqhd_508 {
        let t = this;
        if (t.type == 1)
            return Config.xyfqhd_508[t.id];
        else
            return Config.xyfqmr_508[t.id];
    }

    public update(pData: { state: number }): boolean {
        let t = this;
        let t_change = false;
        let t_hasGet = (pData.state == 2);
        if (t.hasGet != t_hasGet) {
            t.hasGet = t_hasGet;
            t_change = true;
        }
        return t_change;
    }

    /**
     * 任务状态 0未达成 1可领取 2已领取
     */
    public get state(): number {
        let t = this;
        if (t.hasGet) {
            return 2; //已领取
        }
        else {
            let t_model = GGlobal.modelXyfq;
            let t_count = 0;
            if (t.type == 1) {
                t_count = t_model.countTotal;
            }
            else {
                t_count = t_model.countDaily;
            }
            if (t_count >= t.cfg.time) {
                return 1; //可领取
            }
            else
                return 0; //未达成
        }
    }

    private _rewardList: IGridImpl[];
    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
        return this._rewardList;
    }

    public get sortValue() {
        let t = this;
        let t_value = 0;
        let t_state = t.state;
        switch (t_state) {
            case 1:
                t_value += 10000000;
                break;
            case 0:
                break;
            case 2:
                t_value -= 10000000;
                break;
        }
        t_value -= t.id;
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}