/**
 * @author: lujiahao 
 * @date: 2019-10-30 16:20:34 
 */
class CfgRollXfyt {
    public id: number;

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Ixfyt_763 {
        return Config.xfyt_763[this.id];
    }

    /** 位置 从1开始 */
    public get pos(): number {
        return this.id % 100;
    }

    /** 圈数 从1开始 */
    public get round(): number {
        return ~~(this.id % 1000 / 100);
    }

    private _rewardItem: IGridImpl;
    public get rewardItem(): IGridImpl {
        if (this.pos == 1)
            return null;
        if (this._rewardItem === undefined) {
            let t_list = ConfigHelp.makeItemListArr(this.cfg.reward);
            if (t_list && t_list.length > 0) {
                this._rewardItem = t_list[0];
            }
            else
                this._rewardItem = null;
        }
        return this._rewardItem;
    }

    /** 是否已经获取了奖励 */
    public get hasGet(): boolean {
        let t = this;
        let t_model = GGlobal.modelXfyt;
        if (t_model.info.round == t.round) {
            //相同圈数
            if (t.id <= t_model.info.id)
                return true;
            else
                return false;
        }
        else {
            //不同圈数
            return false;
        }
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}