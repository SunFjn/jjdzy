/**
 * 跨服王者目标奖励数据结构
 * @author: lujiahao 
 * @date: 2019-12-06 17:58:44 
 */
class VoTargetKfwz {
    public id: number;

    public state = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Ikfwzmb_770 {
        return Config.kfwzmb_770[this.id];
    }

    public update(pData: { state: number }): boolean {
        return ObjectUtils.modifyObject(this, pData);
    }

    private _rewardList: IGridImpl[];
    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
        return this._rewardList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}