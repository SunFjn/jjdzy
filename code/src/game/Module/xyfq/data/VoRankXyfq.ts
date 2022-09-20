/**
 * @author: lujiahao 
 * @date: 2020-04-08 16:20:35 
 */
class VoRankXyfq {
    public id: number;

    public rank = 0;

    public name = "";
    public count = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Ixyfqrank_508 {
        return Config.xyfqrank_508[this.id];
    }

    public update(pData: { name: string, count: number }) {
        return ObjectUtils.modifyObject(this, pData);
    }

    public reset() {
        let t_obj = { name: "", count: 0 };
        return ObjectUtils.modifyObject(this, t_obj);
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