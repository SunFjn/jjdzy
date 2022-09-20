var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoZhenYan = (function () {
    function VoZhenYan() {
    }
    Object.defineProperty(VoZhenYan.prototype, "lv", {
        //等级
        get: function () {
            return this.lvId % 10000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoZhenYan.prototype, "star", {
        //星级
        get: function () {
            return Math.floor(this.lvId % 10000 / 10);
        },
        enumerable: true,
        configurable: true
    });
    VoZhenYan.prototype.readMsg = function (data) {
        var s = this;
        s.id = data.readInt();
        s.lvId = data.readInt();
        s.cfg = Config.zy_766[s.id];
    };
    return VoZhenYan;
}());
__reflect(VoZhenYan.prototype, "VoZhenYan");
