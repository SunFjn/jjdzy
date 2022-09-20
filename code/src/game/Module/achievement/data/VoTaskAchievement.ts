/**
 * 成就任务数据结构
 * @author: lujiahao 
 * @date: 2019-11-06 15:51:34 
 */
class VoTaskAchievement {
    /** 任务id */
    public id: number;
    /** 链id */
    public chainId: number;

    public state = 0;
    public count = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Icj_746 {
        return Config.cj_746[this.id];
    }

    public update(pData: { state: number, count?: number }): boolean {
        let t_change = false;
        t_change = ObjectUtils.modifyObject(this, pData);
        return t_change;
    }

    public get isOpened(): boolean {
        let t = this;
        let t_id = t.cfg.xt;
        if (t_id > 0) {
            if (ModuleManager.isOpen(t_id))
                return true;
            else
                return false;
        }
        else {
            return true;
        }
    }

    /** 排序权值 */
    public get sortValue(): number {
        let t_value = 0;
        switch (this.state) {
            case EnumAchievement.STATE_CAN_GET:
                t_value += 100;
                break;
            case EnumAchievement.STATE_NONE:
                t_value += 10;
                break;
            case EnumAchievement.SATTE_DONE:
                break;
        }
        return t_value;
    }

    private _rewardList: IGridImpl[];
    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
        return this._rewardList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}