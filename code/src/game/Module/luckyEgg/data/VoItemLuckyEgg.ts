/**
 * 进入了奖池的物品数据结构
 * @author: lujiahao 
 * @date: 2020-01-04 17:02:34 
 */
class VoItemLuckyEgg {

    static create(): VoItemLuckyEgg {
        return Pool.getItemByClass("VoItemLuckyEgg", VoItemLuckyEgg);
    }

    static recycle(pVo: VoItemLuckyEgg) {
        pVo.recycle();
        Pool.recover("VoItemLuckyEgg", pVo);
    }

    /** 标识奖池物品的唯一键值 */
    public key = "";
    public index = -1;

    /** 所属奖池id */
    public poolId = 0;

    public itemId = 0;
    public count = 0;
    public itemType = 0;

    /** 是否抽中了 0还没抽中 1已抽中 */
    public hasGet = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public update(pData: { poolId: number, itemId: number, count: number, itemType: number, hasGet: number }): boolean {
        let t = this;
        let t_change = false;
        if (ObjectUtils.modifyObject(this, pData)) {
            t_change = true;
            t._itemVo = undefined;
        }
        return t_change;
    }

    public recycle() {
        let t = this;
        t.poolId = 0;
        t.itemId = 0;
        t.count = 0;
        t.itemType = 0;
        t.hasGet = 0;
        t.key = "";
        t.index = -1;
        t._itemVo = undefined;
    }

    /** 奖池类型 */
    public get poolType(): number {
        let t = this;
        return t.poolId % 10;
    }

    private _itemVo: IGridImpl;
    public get itemVo(): IGridImpl {
        let t = this;
        if (t._itemVo === undefined) {
            t._itemVo = ConfigHelp.makeItem([t.itemType, t.itemId, t.count]);
        }
        return t._itemVo;
    }

    public get sortValue(): number {
        let t_value = 0;
        let t = this;
        if (t.hasGet) {
        }
        else {
            t_value += 10000;
        }
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}