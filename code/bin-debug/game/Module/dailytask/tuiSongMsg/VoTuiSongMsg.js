var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoTuiSongMsg = (function () {
    function VoTuiSongMsg() {
    }
    VoTuiSongMsg.create = function (tag, status, cfg) {
        var v = new VoTuiSongMsg();
        v.tag = tag;
        v.status = status;
        v.cfg = cfg;
        v.arr = [];
        return v;
    };
    return VoTuiSongMsg;
}());
__reflect(VoTuiSongMsg.prototype, "VoTuiSongMsg");
