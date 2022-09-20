var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoTianMing = (function () {
    function VoTianMing() {
    }
    VoTianMing.prototype.readMsg = function (data) {
        var s = this;
        s.id = data.readInt();
        s.lvId = data.readInt();
        s.pinId = data.readInt();
        s.cfg = Config.tm_292[s.id];
        s.init();
    };
    VoTianMing.prototype.init = function () {
        var s = this;
        s.cfgLv = Config.tmlv_292[s.lvId];
        s.cfgPin = Config.tmpin_292[s.pinId];
    };
    return VoTianMing;
}());
__reflect(VoTianMing.prototype, "VoTianMing");
