var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoLimitGift = (function () {
    function VoLimitGift() {
    }
    VoLimitGift.prototype.readMsg = function (data) {
        var s = this;
        s.type = data.readInt();
        s.endTime = data.readInt();
        var len = data.readShort();
        s.awaArr = [];
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var st = data.readByte();
            var cfg = Config.xslbb_331[id];
            s.awaArr.push({ id: id, st: st, cfg: cfg });
        }
    };
    return VoLimitGift;
}());
__reflect(VoLimitGift.prototype, "VoLimitGift");
