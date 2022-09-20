/**
 * 福签数据结构
 * @author: lujiahao 
 * @date: 2020-04-09 10:32:10 
 */
class VoQianXyfq {
    /** 福签id 跟物品id为相同id */
    public id: number;

    constructor() {
    }

    //=========================================== API ==========================================
    /** 位置id */
    public get posId() {
        return this.id % 10;
    }

    /** 背包中的数量 */
    public get count() {
        return FastAPI.getItemCount(this.id);
    }

    /** 奖励配置 */
    public get rewardCfg(): Ixyfq_508 {
        let t = this;
        return Config.xyfq_508[t.rewardId];
    }

    /** 奖励id */
    public get rewardId() {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        let t_qs = t_model.curQs;
        let t_rewardId = t_qs * 10 + t.posId;
        return t_rewardId;
    }

    private _rewardList: IGridImpl[];
    private _tempRewardId = 0;
    public get rewardList(): IGridImpl[] {
        let t = this;
        let t_rewardId = t.rewardId;
        if (t._tempRewardId != t_rewardId) {
            t._tempRewardId = t_rewardId;
            t._rewardList = undefined;
        }
        if (t._rewardList === undefined)
            t._rewardList = ConfigHelp.makeItemListArr(t.rewardCfg.show);
        return t._rewardList;
    }

    /** 合成配置 */
    public get compCfg() {
        return Config.xyfqhc_508[this.id];
    }

    private _needQainItem: IGridImpl;
    /** 合成所需的签数据 */
    public get needQainItem(): IGridImpl {
        let t = this;
        let t_compCfg = t.compCfg;
        if (t_compCfg) {
            if (t._needQainItem === undefined) {
                let t_list = ConfigHelp.makeItemListArr(t_compCfg.q);
                t._needQainItem = t_list[0];
            }
        }
        return t._needQainItem;
    }

    private _compConsume: IGridImpl;
    /** 合成所需消耗 */
    public get compConsume() {
        let t = this;
        let t_compCfg = t.compCfg;
        if (t_compCfg) {
            if (t._compConsume === undefined) {
                let t_list = ConfigHelp.makeItemListArr(t_compCfg.consume);
                t._compConsume = t_list[0];
            }
        }
        return t._compConsume;
    }

    /**
     * 是否可开启福签
     * @param pShowAlert 
     */
    public checkCanOpen(pShowAlert: boolean) {
        let t = this;
        if (t.count <= 0) {
            if (pShowAlert) {
                ViewCommonWarn.text("福签不足");
            }
            return false;
        }
        return true;
    }

    /**
     * 是否可合成
     * @param pShowAlert 
     */
    public checkCanComp(pShowAlert: boolean, pCount: number = 1) {
        let t = this;
        if (!t.compCfg) {
            if (pShowAlert)
                ViewCommonWarn.text("该福签不能被合成");
            return false;
        }
        let t_needQian = t.needQainItem;
        if (!FastAPI.checkItemEnough(t_needQian.id, t_needQian.count * pCount, pShowAlert))
            return false;
        let t_needConsume = t.compConsume;
        if (!FastAPI.checkItemEnough(t_needConsume.id, t_needConsume.count * pCount, pShowAlert))
            return false;
        return true;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}