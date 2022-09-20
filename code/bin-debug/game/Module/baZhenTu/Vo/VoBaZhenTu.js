var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoBaZhenTu = (function () {
    function VoBaZhenTu() {
        this.pos = 0;
        this.id = 0;
        this.level = 0;
        this.starLv = 0;
        this.locked = 0;
        this.fenJ = 0; //0不分解  1分解
        this.cfg = null;
    }
    VoBaZhenTu.prototype.copy = function () {
        var v = new VoBaZhenTu();
        v.pos = this.pos;
        v.id = this.id;
        v.level = this.level;
        v.starLv = this.starLv;
        v.locked = this.locked;
        v.fenJ = this.fenJ;
        v.cfg = this.cfg;
        return v;
    };
    VoBaZhenTu.prototype.clear = function () {
        // this.pos = 0;
        this.id = 0;
        this.level = 0;
        this.starLv = 0;
        this.locked = 0;
        this.fenJ = 0;
        this.cfg = null;
    };
    VoBaZhenTu.prototype.readMsg = function (data) {
        this.pos = data.readByte(); //位置
        this.id = data.readInt(); //符文id
        this.level = data.readInt(); //符文等级
        this.starLv = data.readInt(); //符文星级
        this.initLib();
    };
    VoBaZhenTu.prototype.readMsgBag = function (data) {
        this.pos = data.readInt(); //位置
        this.id = data.readInt(); //符文id
        this.level = data.readInt(); //符文等级
        this.starLv = data.readInt(); //符文星级
        this.locked = data.readByte(); //锁
        this.initLib();
    };
    VoBaZhenTu.prototype.readMsgBuy = function (data) {
        this.pos = data.readInt(); //位置
        this.id = data.readInt(); //符文id
        this.starLv = data.readInt(); //符文星级
        this.level = data.readInt(); //符文等级
        this.locked = 0; //锁
        this.initLib();
    };
    VoBaZhenTu.prototype.initLib = function () {
        var s = this;
        s.cfg = Config.bztzf_261[s.id];
    };
    Object.defineProperty(VoBaZhenTu.prototype, "name", {
        get: function () {
            return this.cfg ? this.cfg.name : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "colorName", {
        get: function () {
            return ConfigHelp.createColorName(this.name, this.pz);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "pz", {
        get: function () {
            return this.cfg ? this.cfg.pz : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "icon", {
        get: function () {
            return this.cfg ? this.cfg.icon : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "type", {
        get: function () {
            return this.cfg ? this.cfg.type : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "maxStar", {
        get: function () {
            return this.cfg ? this.cfg.star : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "maxLv", {
        get: function () {
            return (this.starLv - 1) * this.cfg.lv + this.cfg.lv1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "maxmaxLv", {
        get: function () {
            return (this.maxStar - 1) * this.cfg.lv + this.cfg.lv1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "power", {
        get: function () {
            if (!this.cfg) {
                return 0;
            }
            var starCfg = this.getStarCfg();
            var starPower = starCfg ? starCfg.power : 0;
            return this.level * this.cfg.power1 + starPower;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "fjExp", {
        get: function () {
            var fj = Config.bztlv_261[this.level];
            return fj["fj" + this.pz] + this.starLv * this.cfg.fj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "fjGod", {
        get: function () {
            if (this.cfg.sp == 0)
                return 0;
            return this.starLv * (JSON.parse(this.cfg.sp)[0][2]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "tipDes", {
        get: function () {
            return "分解后可获得" + this.fjExp + "符文经验";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoBaZhenTu.prototype, "attr", {
        get: function () {
            if (this._attr1 == null) {
                this._attr1 = JSON.parse(this.cfg.arrt1);
            }
            //属性合并
            var arr = [];
            var starCfg = this.getStarCfg();
            var attr2 = starCfg ? JSON.parse(starCfg.attr) : [];
            for (var i = 0; i < this._attr1.length; i++) {
                var at = this._attr1[i];
                var ty = Number(at[0]);
                var val = Number(at[1]);
                arr[i] = [];
                arr[i][0] = ty;
                arr[i][1] = val * this.level;
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
    VoBaZhenTu.prototype.getStarCfg = function () {
        if (this.starLv > 0) {
            var tpId = this.starLv > 9 ? (this.starLv + "") : ("0" + this.starLv);
            var starid = this.id + tpId;
            return Config.runestar_261[starid];
        }
        return null;
    };
    return VoBaZhenTu;
}());
__reflect(VoBaZhenTu.prototype, "VoBaZhenTu");
