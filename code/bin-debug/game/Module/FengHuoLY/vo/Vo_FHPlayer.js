var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_FHPlayer = (function () {
    function Vo_FHPlayer() {
        this.speed = 200; //速度
        /**
         * 当前征收的城市ID
         * 9999为状态标识
         * */
        this.soakCity = 0;
    }
    Vo_FHPlayer.prototype.needShowAwatar = function () {
        var ret = this.soakCity == 0;
        return ret;
    };
    return Vo_FHPlayer;
}());
__reflect(Vo_FHPlayer.prototype, "Vo_FHPlayer");
