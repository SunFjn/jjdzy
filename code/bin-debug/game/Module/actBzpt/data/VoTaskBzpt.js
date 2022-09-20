var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 宝藏拼图任务数据结构
 * @author: lujiahao
 * @date: 2019-11-26 15:49:23
 */
var VoTaskBzpt = (function () {
    function VoTaskBzpt() {
        /** 任务状态  */
        this.state = 0;
        this.count = 0;
    }
    Object.defineProperty(VoTaskBzpt.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.bzptrwb_333[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoTaskBzpt.prototype, "pos", {
        get: function () {
            return this.id % 1000;
        },
        enumerable: true,
        configurable: true
    });
    VoTaskBzpt.prototype.update = function (pData) {
        var t_change = false;
        if (ObjectUtils.modifyObject(this, pData))
            t_change = true;
        return t_change;
    };
    return VoTaskBzpt;
}());
__reflect(VoTaskBzpt.prototype, "VoTaskBzpt");
