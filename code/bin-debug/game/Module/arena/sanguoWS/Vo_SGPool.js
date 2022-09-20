var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_SGPool = (function () {
    function Vo_SGPool() {
    }
    Vo_SGPool.prototype.init = function () {
        var lib = Config.doublereward_230[this.id];
        this.remaindCount = lib.num - this.count;
    };
    return Vo_SGPool;
}());
__reflect(Vo_SGPool.prototype, "Vo_SGPool");
