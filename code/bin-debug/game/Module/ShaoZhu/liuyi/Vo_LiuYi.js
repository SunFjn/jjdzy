var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_LiuYi = (function () {
    function Vo_LiuYi() {
    }
    Vo_LiuYi.prototype.readMsg = function (data) {
        var s = this;
        s.szId = data.readInt();
        s.xtId = data.readByte();
        s.lyArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new Vo_LiuYi_LY();
            v.readMsg(data);
            s.lyArr.push(v);
        }
        s.initCfg();
    };
    Vo_LiuYi.prototype.initCfg = function () {
        var s = this;
        s.cfg = Config.sonsixschool_267[s.xtId];
        s._openSix = {};
        var six = JSON.parse(s.cfg.six)[0];
        for (var i = 0; i < six.length; i++) {
            s._openSix[six[i]] = true;
        }
    };
    Vo_LiuYi.prototype.initSt = function () {
        var s = this;
        for (var i = 0; i < s.lyArr.length; i++) {
            s.lyArr[i].st = 0;
        }
    };
    Object.defineProperty(Vo_LiuYi.prototype, "openSix", {
        get: function () {
            return this._openSix;
        },
        enumerable: true,
        configurable: true
    });
    return Vo_LiuYi;
}());
__reflect(Vo_LiuYi.prototype, "Vo_LiuYi");
