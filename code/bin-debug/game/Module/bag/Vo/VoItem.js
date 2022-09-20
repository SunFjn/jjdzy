var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoItem = (function () {
    function VoItem() {
        this.count = 1;
        // tipEnable:boolean = true;
        this.showEffect = false;
        this.wayArr = [];
        this._tz = -1;
        this._tzPas = -1;
    }
    VoItem.prototype.initLib = function (id) {
        var a = this;
        a.cfg = Config.daoju_204[id];
        if (!a.cfg)
            return;
        a.id = a.cfg.id;
        a.icon = a.cfg.icon;
        a.quality = a.cfg.quality;
        a.name = a.cfg.name;
        a.type = a.cfg.leixing;
        a.useType = a.cfg.fangshi;
        a.level = a.cfg.level;
        a.paixu = a.cfg.paixu;
        if (a.cfg.get != "0") {
            a.wayArr = JSON.parse(a.cfg.get);
        }
        if (a.quality >= 5) {
            a.showEffect = true;
        }
    };
    Object.defineProperty(VoItem.prototype, "canUse", {
        get: function () {
            if (this.useType != 0) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoItem.prototype, "qColor", {
        get: function () {
            return Color.QUALITYCOLOR[this.quality];
        },
        enumerable: true,
        configurable: true
    });
    VoItem.create = function (id) {
        var vo = new VoItem();
        vo.initLib(id);
        vo.gType = Enum_Attr.ITEM;
        return vo;
    };
    Object.defineProperty(VoItem.prototype, "isGem", {
        //是否是宝石
        get: function () {
            if (this.type == 4 || this.type == 5 || this.type == 6 || this.type == 7) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoItem.prototype, "tz", {
        get: function () {
            if (this._tz == -1) {
                if (this.cfg.tiaozhuan == '0') {
                    this._tz = 0;
                }
                else {
                    this._tz = Number(JSON.parse(this.cfg.tiaozhuan)[0][0]);
                }
            }
            return this._tz;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoItem.prototype, "tzPas", {
        get: function () {
            if (this._tzPas == -1) {
                if (this.cfg.tiaozhuan == '0') {
                    this._tzPas = 0;
                }
                else {
                    this._tzPas = Number(JSON.parse(this.cfg.tiaozhuan)[0][1]);
                }
            }
            return this._tzPas;
        },
        enumerable: true,
        configurable: true
    });
    return VoItem;
}());
__reflect(VoItem.prototype, "VoItem", ["IGridImpl"]);
