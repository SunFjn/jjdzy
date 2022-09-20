/**
 * 群雄逐鹿商店数据结构
 * @author: lujiahao 
 * @date: 2019-09-30 18:04:22 
 */
class VoShopQxzl {
    public id: number;

    /** 已购买数量 */
    public buyCount = 0;

    private _itemList: IGridImpl[];

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Iqxzlstore_273 {
        return Config.qxzlstore_273[this.id];
    }

    public update(pBuyCount:number):boolean
    {
        let t_change = false;
        if(this.buyCount != pBuyCount)
        {
            this.buyCount = pBuyCount;
            t_change = true;
        }
        return t_change;
    }

    public get itemList(): IGridImpl[] {
        if (this._itemList === undefined)
            this._itemList = ConfigHelp.makeItemListArr(this.cfg.item);
        return this._itemList;
    }

    private _consumeItem: IGridImpl;
    /** 单次兑换消耗 */
    public get consumeItem(): IGridImpl {
        if (this._consumeItem === undefined) {
            this._consumeItem = ConfigHelp.makeItemListArr(this.cfg.money)[0];
        }
        return this._consumeItem;
    }

    /**
     * 剩余可购买次数 返回-1则表示不限购，除了不限购外，不可能为负数
     */
    public get remainCount(): number {
        if (this.cfg.xg == 0) {
            //不限购
            return -1;
        }
        else {
            //有限购
            let t_remain = this.cfg.xg - this.buyCount;
            t_remain = t_remain < 0 ? 0 : t_remain;
            return t_remain;
        }
    }

    /** 检查是否可购买 true则表示可购买 false则表示不能购买 */
    public checkCanBuy(): boolean {
        return this.remainCount != 0;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}