var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_City = (function () {
    function Vo_City() {
    }
    Vo_City.create = function (id) {
        var vo = new Vo_City();
        vo.id = id;
        vo.cfg = Config.fhly_254[id];
        vo.maxTakeCount = vo.cfg.num;
        return vo;
    };
    Object.defineProperty(Vo_City.prototype, "owerID", {
        get: function () {
            return this._owerID;
        },
        set: function (val) {
            var m = GGlobal.modelFengHuoLY;
            m.cityOwners[this._owerID] = 0;
            if (val != this._owerID) {
                m.sceneUpdateMark = 1;
            }
            m.cityOwners[val] = 1;
            this._owerID = val;
        },
        enumerable: true,
        configurable: true
    });
    Vo_City.prototype.inBattle = function () {
        return this.state == 1;
    };
    return Vo_City;
}());
__reflect(Vo_City.prototype, "Vo_City");
