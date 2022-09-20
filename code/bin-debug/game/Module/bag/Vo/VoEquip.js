var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoEquip = (function () {
    function VoEquip() {
        this.sid = 0;
        this.count = 1;
        this.showEffect = false;
        this.qh = 0; //当前等级对应的编号
        this.bs = [0, 0, 0, 0];
        this.basePower = 0;
        this.starLv = 0;
        this.zhuHunLv = 0;
        this.zhuHunExp = 0;
        /**装备升星战力 */
        this.upstarPower = 0;
        //神装洗练
        /**气血洗练 */
        this.xlhp = 0;
        /**攻击洗练*/
        this.xlatk = 0;
        /**防御洗练 */
        this.xldef = 0;
        /**装备穿戴等级 */
        this._lev = -1;
        /**装备转生 */
        this._zs = -1;
    }
    Object.defineProperty(VoEquip.prototype, "qColor", {
        get: function () {
            return Color.QUALITYCOLOR[this.quality];
        },
        enumerable: true,
        configurable: true
    });
    VoEquip.prototype.initLib = function (id) {
        this.id = id;
        this.cfg = Config.zhuangbei_204[id];
        this.name = this.cfg.n;
        this.basePower = this.cfg.zhanli;
        this.quality = this.cfg.q;
        this.icon = this.cfg.icon;
        this.paixu = this.cfg.paixu;
        this.tips = this.cfg.tips;
        if (this.quality >= 5) {
            this.showEffect = true;
        }
        this._baseAttr = null;
    };
    Object.defineProperty(VoEquip.prototype, "level", {
        get: function () {
            if (this._lev == -1) {
                var lv = JSON.parse(this.cfg.lv);
                this._lev = Number(lv[0][1]);
                this._zs = Number(lv[0][0]);
            }
            return this._lev;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoEquip.prototype, "zs", {
        get: function () {
            if (this._zs == -1) {
                var lv = JSON.parse(this.cfg.lv);
                this._lev = Number(lv[0][1]);
                this._zs = Number(lv[0][0]);
            }
            return this._zs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoEquip.prototype, "cmpzsLv", {
        /**虚拟等级 用来比较的 */
        get: function () {
            return (this.zs + 1) * 1000 + this.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoEquip.prototype, "gridName", {
        /**外部显示的名称 */
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoEquip.prototype, "condition", {
        get: function () {
            var _name;
            if (this.zs > 0) {
                _name = Math.floor(this.zs / 1000) + "转";
            }
            else {
                _name = "Lv." + this.level;
            }
            return _name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoEquip.prototype, "type", {
        /**装备部件类型 */
        get: function () {
            return this.cfg.part;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoEquip.prototype, "jie", {
        get: function () {
            return this.cfg.jie;
        },
        enumerable: true,
        configurable: true
    });
    /**战斗力 只包过基础属性和额外属性 */
    VoEquip.prototype.getPower = function () {
        var self = this;
        var power = ConfigHelp.powerFormulaArr([[102, self.xlhp], [103, self.xlatk], [104, self.xldef]]);
        power += this.basePower;
        return power;
    };
    Object.defineProperty(VoEquip.prototype, "baseAttr", {
        get: function () {
            if (this._baseAttr == null) {
                this._baseAttr = JSON.parse(this.cfg.attr);
            }
            return this._baseAttr;
        },
        enumerable: true,
        configurable: true
    });
    VoEquip.create = function (id) {
        var vo = new VoEquip();
        vo.initLib(id);
        vo.gType = Enum_Attr.EQUIP;
        return vo;
    };
    Object.defineProperty(VoEquip.prototype, "gemLv", {
        get: function () {
            var level = 0;
            for (var i = 0; i < this.bs.length; i++) {
                var gemcfg = Config.dzgem_209[this.bs[i]];
                if (gemcfg) {
                    level += gemcfg.lv;
                }
            }
            return level;
        },
        enumerable: true,
        configurable: true
    });
    return VoEquip;
}());
__reflect(VoEquip.prototype, "VoEquip", ["IGridImpl"]);
