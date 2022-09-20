/**
 * 双12商品数据结构
 * @author: lujiahao 
 * @date: 2019-11-28 10:55:05 
 */
class VoShop12 {
    public id: number;

    /** 已购买数量 */
    public buyCount = 0;

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Is12sc_771 {
        return Config.s12sc_771[this.id];
    }

    public update(pData: { buyCount: number }): boolean {
        return ObjectUtils.modifyObject(this, pData);
    }

    /** 状态 0未售完 1已售罄 */
    public get state(): number {
        let t = this;
        if (t.buyCount >= t.cfg.cs)
            return 1;
        else
            return 0;
    }

    /** 剩余可购买数量 */
    public get remainCount(): number {
        let t = this;
        let t_remain = t.cfg.cs - t.buyCount;
        t_remain = t_remain < 0 ? 0 : t_remain;
        return t_remain;
    }

    private _priceSource: IGridImpl;
    public get priceSource(): IGridImpl {
        let t = this;
        if (t._priceSource === undefined) {
            let t_list = ConfigHelp.makeItemListArr(t.cfg.yj);
            t._priceSource = t_list[0];
        }
        return t._priceSource;
    }

    private _priceNow: IGridImpl;
    public get priceNow(): IGridImpl {
        let t = this;
        if (t._priceNow === undefined) {
            let t_list = ConfigHelp.makeItemListArr(t.cfg.xj);
            t._priceNow = t_list[0];
        }
        return t._priceNow;
    }

    private _itemList: IGridImpl[];
    public get itemList(): IGridImpl[] {
        if (this._itemList === undefined)
            this._itemList = ConfigHelp.makeItemListArr(this.cfg.dj);
        return this._itemList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}