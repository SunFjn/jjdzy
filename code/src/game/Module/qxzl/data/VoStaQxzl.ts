/**
 * @author: lujiahao 
 * @date: 2019-10-18 19:45:20 
 */
class VoStaQxzl {
    public id: number;

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Iqxzltl_273 {
        return Config.qxzltl_273[this.id];
    }

    private _consume: IGridImpl
    public get consume(): IGridImpl {
        if (this._consume === undefined) {
            let t_list = ConfigHelp.makeItemListArr(this.cfg.conmuse);
            this._consume = t_list[0];
        }
        return this._consume;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}