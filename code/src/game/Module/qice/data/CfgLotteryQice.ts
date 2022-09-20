/**
 * 出谋划策配置
 * @author: lujiahao 
 * @date: 2019-10-25 10:11:08 
 */
class CfgLotteryQice {

    private _rewardList: IGridImpl[];

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Icmhc_761 {
        return Config.cmhc_761[1];
    }

    private _consume1: IGridImpl;
    public get consume1(): IGridImpl {
        if (this._consume1 === undefined) {
            this._consume1 = ConfigHelp.makeItemListArr(this.cfg.cj1)[0];
        }
        return this._consume1;
    }

    private _consume10: IGridImpl;
    public get consume10(): IGridImpl {
        if (this._consume10 === undefined) {
            this._consume10 = ConfigHelp.makeItemListArr(this.cfg.cj2)[0];
        }
        return this._consume10;
    }

    private _consumeItem1: IGridImpl;
    public get consumeItem1(): IGridImpl {
        if (this._consumeItem1 === undefined) {
            this._consumeItem1 = ConfigHelp.makeItemListArr(this.cfg.dj1)[0];
        }
        return this._consumeItem1;
    }

    private _consumeItem10: IGridImpl;
    public get consumeItem10(): IGridImpl {
        if (this._consumeItem10 === undefined) {
            this._consumeItem10 = ConfigHelp.makeItemListArr(this.cfg.dj2)[0];
        }
        return this._consumeItem10;
    }

    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.zs);
        return this._rewardList;
    }

    /**
     * 检查抽奖道具是否足够（非元宝）
     * @param pType 1抽一次 2抽10次
     */
    public checkItemEnough(pType: number): boolean {
        let t = this;
        if (pType == 1) {
            //抽一次
            return FastAPI.checkItemEnough(t.consumeItem1.id, t.consumeItem1.count, false);
        }
        else {
            //抽10次
            return FastAPI.checkItemEnough(t.consumeItem10.id, t.consumeItem10.count, false);
        }
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}