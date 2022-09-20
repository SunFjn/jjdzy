/**
 * @author: lujiahao 
 * @date: 2019-10-31 21:27:41 
 */
class VoBalloon {
    public id: number;

    public itemType: number = 0;
    public itemId: number = 0;
    public count: number = 0;

    private _changeFlag = false;

    constructor() {
    }
    //=========================================== API ==========================================
    public update(pItemType: number, pItemId: number, pCount: number): boolean {
        let t = this;
        let t_change = false;
        if (t.itemType != pItemType) {
            t.itemType = pItemType;
            t_change = true;
        }
        if (t.itemId != pItemId) {
            t.itemId = pItemId;
            t_change = true;
        }
        if (t.count != pCount) {
            t.count = pCount;
            t_change = true;
        }

        if (t_change) {
            t._changeFlag = t_change;
        }
        return t_change;
    }

    private _rewardItem: IGridImpl;
    /** 奖励物品数据 */
    public get rewardItem(): IGridImpl {
        let t = this;
        if (t._changeFlag) {
            t._rewardItem = undefined;
            t._changeFlag = false;
        }
        if (t._rewardItem === undefined) {
            if (t.itemType == 0)
                t._rewardItem = null;
            else
                t._rewardItem = ConfigHelp.makeItem([t.itemType, t.itemId, t.count]);
        }
        return t._rewardItem;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}