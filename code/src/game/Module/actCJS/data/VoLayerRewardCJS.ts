/**
 * @author: lujiahao 
 * @date: 2019-11-21 11:12:14 
 */
class VoLayerRewardCJS {
    public id: number;

    /** 状态 0未领取 1可领取 2已领取 */
    public state = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Icjsjl_769 {
        return Config.cjsjl_769[this.id];
    }

    public update(pData: { state: number }): boolean {
        let t_change = false;
        if (ObjectUtils.modifyObject(this, pData)) {
            t_change = true;
        }
        return t_change;
    }

    private _rewardList: IGridImpl[];
    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.jl);
        return this._rewardList;
    }

    public get sortValue(): number {
        let t = this;
        let t_value = 0;
        switch (t.state) {
            case 0:
                t_value += 500;
                break;
            case 1:
                t_value += 1000;
                break;
            case 2:
                break;
        }
        t_value -= t.cfg.cs;
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}