/**
 * 成就大师数据结构
 * @author: lujiahao 
 * @date: 2019-11-08 14:43:20 
 */
class VoMasterAchievement {
    public id: number;

    public state = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Icjds_746 {
        return Config.cjds_746[this.id];
    }

    public update(pData: { state: number }): boolean {
        let t_change = false;
        t_change = ObjectUtils.modifyObject(this, pData);
        return t_change;
    }

    /** 是否激活 */
    public get isActive(): boolean {
        let t = this;
        let t_model = GGlobal.modelAchievement;
        if (t_model.level >= t.id)
            return true;
        else
            return false;
    }

    /** 是否满足升级条件 */
    public checkCanUp(): boolean {
        let t = this;
        let t_model = GGlobal.modelAchievement;
        return t_model.score >= t.cfg.cjd;
    }

    private _rewardList: IGridImpl[];
    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            try {
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
            } catch (error) {
                this._rewardList = null;
            }
        return this._rewardList;
    }

    /** 排序权值 */
    public get sortValue(): number {
        let t = this;
        let t_value = 0;
        switch (t.state) {
            case EnumAchievement.STATE_CAN_GET:
                t_value += 10000;
                break;
            case EnumAchievement.STATE_NONE:
                t_value += 1000;
                break;
            case EnumAchievement.SATTE_DONE:
                break;
        }
        t_value -= t.id;
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}