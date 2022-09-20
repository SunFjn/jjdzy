/**
 * @author: lujiahao 
 * @date: 2019-10-21 10:50:52 
 */
class CfgLevelQice {
    public id: number;

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Iqcsj_760 {
        return Config.qcsj_760[this.id];
    }

    private _consumeList: IGridImpl[];
    /** 升级消耗 */
    public get consumeList(): IGridImpl[] {
        if (this._consumeList === undefined) {
            this._consumeList = ConfigHelp.makeItemListArr(this.cfg.xh);
        }
        return this._consumeList;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}