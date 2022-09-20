var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoSixWay = (function () {
    function VoSixWay() {
        this._fenJ = 0; //0不分解  1分解
        this.pos = 0; //装备位置
        this.id = 0; //装备印记id
        this.lv = 0; //等级
        this.star = 0; //星级
        // public bagPos:number = 0;//背包位置索引
        this.isLock = 0; //是否被锁住 0没有1有
        this.cfg = null;
    }
    Object.defineProperty(VoSixWay.prototype, "fenJ", {
        get: function () {
            return this._fenJ;
        },
        set: function (num) {
            this._fenJ = num;
        },
        enumerable: true,
        configurable: true
    });
    VoSixWay.prototype.readEquipMsg = function (data) {
        var s = this;
        s.pos = data.readInt();
        s.id = data.readInt();
        s.lv = data.readInt();
        s.star = data.readInt();
        s.initLib();
    };
    VoSixWay.prototype.readBagMsg = function (data) {
        var s = this;
        s.pos = data.readInt();
        s.id = data.readInt();
        s.lv = data.readInt();
        s.star = data.readInt();
        s.isLock = data.readInt();
        s.initLib();
    };
    VoSixWay.prototype.readMsgBuy = function (data) {
        var s = this;
        s.pos = data.readInt(); //位置
        s.id = data.readInt(); //id
        s.lv = data.readInt(); //星级
        s.star = data.readInt(); //等级
        s.initLib();
    };
    VoSixWay.prototype.copy = function () {
        var v = new VoSixWay();
        v.id = this.id;
        v.pos = this.pos;
        v.lv = this.lv;
        v.star = this.star;
        v.fenJ = this.fenJ;
        v.cfg = this.cfg;
        return v;
    };
    VoSixWay.prototype.clear = function () {
        var s = this;
        s.id = 0;
        s.lv = 0;
        s.star = 0;
        s.cfg = null;
        s.fenJ = 0;
    };
    VoSixWay.prototype.initLib = function () {
        var s = this;
        s.cfg = Config.sixdaoyj_505[s.id];
    };
    Object.defineProperty(VoSixWay.prototype, "name", {
        get: function () {
            return this.cfg ? this.cfg.name : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSixWay.prototype, "colorName", {
        get: function () {
            return ConfigHelp.createColorName(this.name, this.pz);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSixWay.prototype, "pz", {
        get: function () {
            return this.cfg ? this.cfg.pz : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSixWay.prototype, "icon", {
        get: function () {
            return this.cfg ? this.cfg.icon : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSixWay.prototype, "type", {
        get: function () {
            return this.cfg ? this.cfg.type : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSixWay.prototype, "power", {
        get: function () {
            var total = 0;
            var power = this.cfg ? this.cfg.power1 : 0;
            var lvPower = power * this.lv;
            var id = this.id * 100 + this.star;
            var cfg = Config.sixdaostar_505[id];
            var starPower = cfg ? cfg.power : 0;
            total = lvPower + starPower;
            return total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSixWay.prototype, "maxLv", {
        get: function () {
            return this.cfg ? this.cfg.lv + (this.star - 1) * this.cfg.lvup : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSixWay.prototype, "maxStar", {
        get: function () {
            return this.cfg ? this.cfg.star : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSixWay.prototype, "fjNum", {
        get: function () {
            var s = this;
            var num = 0;
            var cfg = Config.sixdaolv_505[s.lv];
            if (s.cfg.pz == 2) {
                num = cfg.fj2;
            }
            else if (s.cfg.pz == 3) {
                num = cfg.fj3;
            }
            else if (s.cfg.pz == 4) {
                num = cfg.fj4;
            }
            else if (s.cfg.pz == 5) {
                num = cfg.fj5;
            }
            else if (s.cfg.pz == 6) {
                num = cfg.fj6;
            }
            else {
                num = cfg.fj8;
            }
            return s.star * s.cfg.fj + num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoSixWay.prototype, "attr", {
        get: function () {
            var s = this;
            if (s._attr1 == null) {
                s._attr1 = JSON.parse(s.cfg.arrt1);
            }
            //属性合并
            var arr = [];
            var starCfg = s.getStarCfg();
            var attr2 = starCfg ? JSON.parse(starCfg.attr) : [];
            for (var i = 0; i < s._attr1.length; i++) {
                var at = s._attr1[i];
                var ty = Number(at[0]);
                var val = Number(at[1]);
                arr[i] = [];
                arr[i][0] = ty;
                arr[i][1] = val * s.lv;
                for (var k = 0; k < attr2.length; k++) {
                    var at2 = attr2[k];
                    var ty2 = Number(at2[0]);
                    var val2 = Number(at2[1]);
                    if (ty2 == ty) {
                        arr[i][1] += val2;
                        break;
                    }
                }
            }
            //有新属性
            var newArr = [];
            for (var k = 0; k < attr2.length; k++) {
                var at2 = attr2[k];
                var ty2 = Number(at2[0]);
                var val2 = Number(at2[1]);
                var hasNew = true;
                for (var i = 0; i < this._attr1.length; i++) {
                    var at = this._attr1[i];
                    var ty = Number(at[0]);
                    var val = Number(at[1]);
                    if (ty2 == ty) {
                        hasNew = false;
                        break;
                    }
                }
                if (hasNew) {
                    newArr.push([ty2, val2]);
                }
            }
            arr = arr.concat(newArr);
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    VoSixWay.prototype.getStarCfg = function () {
        var s = this;
        if (s.star > 0) {
            var tpId = s.star > 9 ? (s.star + "") : ("0" + s.star);
            var starid = s.id + tpId;
            return Config.sixdaostar_505[starid];
        }
        return null;
    };
    return VoSixWay;
}());
__reflect(VoSixWay.prototype, "VoSixWay");
