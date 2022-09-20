/**
 * 成就树任务数据结构
 * @author: lujiahao 
 * @date: 2019-11-21 11:00:21 
 */
class VoTaskCJS {
    public id: number;

    /** 状态 0未完成 1已完成 */
    public state = 0;
    /** 任务计数 */
    public count = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public get cfg(): Icjs_769 {
        return Config.cjs_769[this.id];
    }

    public update(pData: { state: number, count: number }): boolean {
        let t_change = false;
        if (ObjectUtils.modifyObject(this, pData)) {
            t_change = true;
        }
        return t_change;
    }

    public get sortValue(): number {
        let t = this;
        let t_value = 0;
        switch (t.state) {
            case 0:
                t_value += 1000;
                break;
            case 1:
                break;
        }
        t_value -= (t.id % 1000);
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}