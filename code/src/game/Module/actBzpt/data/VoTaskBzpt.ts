/**
 * 宝藏拼图任务数据结构
 * @author: lujiahao 
 * @date: 2019-11-26 15:49:23 
 */
class VoTaskBzpt {
    public id: number;

    /** 任务状态  */
    public state = 0;
    public count = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Ibzptrwb_333 {
        return Config.bzptrwb_333[this.id];
    }

    public get pos(): number {
        return this.id % 1000;
    }

    public update(pData: { state: number, count?: number }): boolean {
        let t_change = false;
        if (ObjectUtils.modifyObject(this, pData))
            t_change = true;
        return t_change;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}