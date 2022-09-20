/**
 * 奖池物品数据结构
 * @author: lujiahao 
 * @date: 2019-09-07 14:32:22 
 */
class VoXffpReward {
    public id: number;

    /** 状态  0未领取 1已领取 */
    public state = 0;
    /** 翻牌位置 */
    public index = -1;

    public lastVo: VoXffpReward;
    public nextVo: VoXffpReward;

    // /** 阶段总值 */
    // public totalValue = 0;

    private _rewardList: IGridImpl[];

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Ixhdxffpxfb_318 {
        return Config.xhdxffpxfb_318[this.id];
    }

    public update(pIndex: number, pState: number): boolean {
        let t_change = false;

        if (pState != this.state) {
            this.state = pState;
            t_change = true;
        }

        if (pState == 0) {
            //如果状态是未领取，则index强制重置为-1
            pIndex = -1;
        }

        if (pIndex != this.index) {
            this.index = pIndex;
            t_change = true;
        }

        return t_change;
    }

    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.show);
        return this._rewardList;
    }

    private _ybValue: number;
    /** 当前阶段所需元宝值 */
    public get ybValue(): number {
        if (this._ybValue === undefined) {
            this._ybValue = ~~(JSON.parse(this.cfg.yb)[0][2]);
        }
        return this._ybValue;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}