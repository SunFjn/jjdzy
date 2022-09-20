/**
 * 轮回副本关卡数据结构
 * @author: lujiahao 
 * @date: 2020-02-26 17:19:37 
 */
class VoLevelLhfb {
    /** 关卡id */
    public levelId = 0;

    /** 轮回id */
    public lunhuiId = 0;
    /** 星数 */
    public star = 0;

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Ilhfb_337 {
        return Config.lhfb_337[this.levelId];
    }

    /** 副本名称 */
    public get name(): string {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        let t_copyVo = t_model.getCopyVoByLunhuiId(t.lunhuiId);
        if (t_copyVo) {
            return t_copyVo.name;
        }
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