/**
 * @author: lujiahao 
 * @date: 2019-10-30 16:26:55 
 */
class VoRollXfyt {
    public id: number = 1101;
    public lastId: number;

    constructor() {
    }

    //=========================================== API ==========================================
    public update(pId: number): boolean {
        let t = this;
        let t_change = false;
        if (t.id != pId) {
            t.lastId = t.id;
            t.id = pId;
            t_change = true;
        }
        return t_change;
    }

    /** 位置 从1开始 */
    public get pos(): number {
        return this.id % 100;
    }

    /** 上个位置 从1开始 */
    public get lastPos(): number {
        return this.lastId % 100;
    }

    /** 圈数 从1开始 */
    public get round(): number {
        return ~~(this.id % 1000 / 100);
    }

    /** 上次位置所在的圈数 从1开始 */
    public get lastRound(): number {
        return ~~(this.lastId % 1000 / 100);
    }

    /** 期数 从1开始 */
    public get qs(): number {
        return ~~(this.id / 1000);
    }

    //===================================== private method =====================================
    //======================================== handler =========================================
}