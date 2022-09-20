/**
 * 刮刮乐抽奖的临时数据结构
 * @author: lujiahao 
 * @date: 2020-02-17 19:11:32 
 */
class VoGGLTemp {
    /** 序号 从1开始 */
    public indexId = 0;

    public itemId = 0;
    public itemType = 0;
    public count = 0;

    /** 是否抽中的奖励 */
    public isReward = false;

    private _change = false;

    constructor() {
    }
    //========================================= 协议相关 ========================================
    public update(pData: { indexId: number, itemType: number, itemId: number, count: number }): boolean {
        let t = this;
        if (ObjectUtils.modifyObject(t, pData)) {
            t._change = true;
        }
        return t._change;
    }

    private _itemVo: IGridImpl;
    public get itemVo(): IGridImpl {
        let t = this;
        if (t._change) {
            t._change = false;
            if (t.itemId > 0 || t.itemType > 0)
                t._itemVo = ConfigHelp.makeItem([t.itemType, t.itemId, t.count]);
        }
        return t._itemVo;
    }

    public get cfg(): VoGGLCfg {
        let t = this;
        let t_key = StringUtil.combinKey([t.itemId, t.count]);
        return GGlobal.modelGGL.getVoCfgByKey(t_key);
    }
    //=========================================== API ==========================================
    //===================================== private method =====================================
    //======================================== handler =========================================
}