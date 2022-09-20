/**
 * 群雄逐鹿任务数据结构
 * @author: lujiahao 
 * @date: 2019-09-30 11:43:08 
 */
class VoTaskQxzl {
    public id: number;

    public lastId: number = 0;
    public lastVo: VoTaskQxzl;
    public nextVo: VoTaskQxzl;

    public state = 0;
    public count = 0;

    private _rewardList: IGridImpl[];

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Iqxzlrw_273 {
        return Config.qxzlrw_273[this.id];
    }

    public update(pState: number, pCount: number): boolean {
        let t_change = false;
        if (this.state != pState) {
            this.state = pState;
            t_change = true;
        }
        if (this.count != pCount) {
            this.count = pCount;
            t_change = true;
        }
        if (this.lastVo) {
            //收到对应id，则前面任务链都必定做完
            //回溯上去
            this.lastVo.update(EnumQxzl.STATE_DONE, pCount);
        }
        return t_change;
    }

    private _tabType: number
    public get tabType(): number {
        if (this._tabType === undefined) {
            this._tabType = ~~((~~this.id) / 1000);
        }
        return this._tabType;
    }

    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
        return this._rewardList;
    }

    /** 排序权值 */
    public get sortValue(): number {
        let t_value = 0;
        switch (this.state) {
            case EnumQxzl.STATE_CAN_GET:
                t_value += 100;
                break;
            case EnumQxzl.STATE_NONE:
                t_value += 10;
                break;
            case EnumQxzl.STATE_DONE:
                break;
        }
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}