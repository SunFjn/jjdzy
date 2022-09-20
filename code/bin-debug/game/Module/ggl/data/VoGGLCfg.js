var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 配置的奖励数据
 * @author: lujiahao
 * @date: 2020-02-17 14:09:39
 */
var VoGGLCfg = (function () {
    function VoGGLCfg() {
    }
    Object.defineProperty(VoGGLCfg.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.ggl_336[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoGGLCfg.prototype, "itemVo", {
        get: function () {
            var t = this;
            if (t._itemVo === undefined) {
                t._itemVo = ConfigHelp.makeItemListArr(t.cfg.jl)[0];
            }
            return t._itemVo;
        },
        enumerable: true,
        configurable: true
    });
    return VoGGLCfg;
}());
__reflect(VoGGLCfg.prototype, "VoGGLCfg");
