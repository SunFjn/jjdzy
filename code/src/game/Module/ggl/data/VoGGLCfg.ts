/**
 * 配置的奖励数据
 * @author: lujiahao 
 * @date: 2020-02-17 14:09:39 
 */
class VoGGLCfg {
    public id: number;

    constructor() {
    }
    //=========================================== API ==========================================
    public get cfg(): Iggl_336 {
        return Config.ggl_336[this.id];
    }

    private _itemVo: IGridImpl;
    public get itemVo(): IGridImpl {
        let t = this;
        if (t._itemVo === undefined) {
            t._itemVo = ConfigHelp.makeItemListArr(t.cfg.jl)[0];
        }
        return t._itemVo;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}