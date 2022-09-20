var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_QianNeng = (function () {
    function Vo_QianNeng() {
        this.act = true;
    }
    Vo_QianNeng.prototype.readMsg = function (data) {
        var s = this;
        s.szId = data.readInt();
        s.qianNId = data.readInt();
        s.danArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var ty = data.readInt();
            var ct = data.readInt();
            var danCfg = Config.drug_200[ty];
            s.danArr.push({ ty: ty, cfg: danCfg, ct: ct });
        }
        s.initCfg();
    };
    Vo_QianNeng.prototype.initCfg = function () {
        var s = this;
        s.cfg = Config.sonqn_267[s.qianNId];
    };
    return Vo_QianNeng;
}());
__reflect(Vo_QianNeng.prototype, "Vo_QianNeng");
