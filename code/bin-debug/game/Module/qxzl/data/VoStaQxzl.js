var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-18 19:45:20
 */
var VoStaQxzl = (function () {
    function VoStaQxzl() {
    }
    Object.defineProperty(VoStaQxzl.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.qxzltl_273[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoStaQxzl.prototype, "consume", {
        get: function () {
            if (this._consume === undefined) {
                var t_list = ConfigHelp.makeItemListArr(this.cfg.conmuse);
                this._consume = t_list[0];
            }
            return this._consume;
        },
        enumerable: true,
        configurable: true
    });
    return VoStaQxzl;
}());
__reflect(VoStaQxzl.prototype, "VoStaQxzl");
