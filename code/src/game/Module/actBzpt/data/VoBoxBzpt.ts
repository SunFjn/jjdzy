/**
 * 宝藏拼图宝箱奖励数据结构
 * @author: lujiahao 
 * @date: 2019-11-26 15:55:26 
 */
class VoBoxBzpt {
    public id: number;

    public state = 0;

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Ibzptjlb_333 {
        return Config.bzptjlb_333[this.id];
    }

    public get pos(): number {
        return this.id % 1000;
    }

    public update(pData: { state: number }): boolean {
        let t_change = false;
        if (ObjectUtils.modifyObject(this, pData))
            t_change = true;
        return t_change;
    }

    public get curCount(): number {
        let t = this;
        let t_model = GGlobal.modelBzpt;
        let t_count = 0;
        let t_list = t.taskIdList;
        for (let v of t_list) {
            let t_vo = t_model.getTaskVoById(v);
            if (t_vo && t_vo.state == 2) {
                t_count++;
            }
        }
        return t_count;
    }

    public get maxCount(): number {
        return this.taskIdList.length;
    }

    private _taskIdList: number[];
    public get taskIdList(): number[] {
        if (this._taskIdList === undefined) {
            let t_soure = JSON.parse(this.cfg.rw);
            this._taskIdList = [];
            for (let v of t_soure) {
                this._taskIdList.push(v[0]);
            }
        }
        return this._taskIdList;
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