var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Horse = (function () {
    function Vo_Horse() {
        /** 幻化id */
        this.hhId = 0;
        this.isAct = false;
    }
    Vo_Horse.prototype.init = function (cfg) {
        var s = this;
        s.cfg = cfg;
        s.id = cfg.id;
        s.isAct = false;
        s.setStar(s.quality * 1000 + 0);
        s.setLv(s.quality * 100000 + 0);
        if (cfg.type == EnumHorse.TYPE_HH) {
            s.hhId = s.id * 1000; //初始化幻化id
        }
    };
    Object.defineProperty(Vo_Horse.prototype, "speed", {
        /** 移动速度 */
        get: function () {
            var t = this;
            var t_speed = 0;
            switch (t.cfg.type) {
                case EnumHorse.TYPE_COMMON:
                    t_speed = t.cfgStar.ydsd;
                    break;
                case EnumHorse.TYPE_HH:
                    t_speed = t.cfg.speed;
                    break;
            }
            return t_speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Horse.prototype, "cfgHH", {
        /** 幻化配置 */
        get: function () {
            return Config.horsepy_507[this.hhId];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Horse.prototype, "nextCfgHH", {
        /** 下一级幻化配置 */
        get: function () {
            return Config.horsepy_507[this.cfgHH.next];
        },
        enumerable: true,
        configurable: true
    });
    Vo_Horse.prototype.setLv = function (v) {
        var s = this;
        s._lv = v;
        s.cfgLv = Config.zqsj_773[v];
    };
    Object.defineProperty(Vo_Horse.prototype, "lv", {
        get: function () {
            return this._lv % 100000;
        },
        enumerable: true,
        configurable: true
    });
    Vo_Horse.prototype.setStar = function (v) {
        var s = this;
        s._star = v;
        s.cfgStar = Config.zqsx_773[v];
    };
    Object.defineProperty(Vo_Horse.prototype, "star", {
        get: function () {
            return this._star % 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Horse.prototype, "quality", {
        get: function () {
            return this.cfg.quality;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Horse.prototype, "name", {
        get: function () {
            return this.cfg.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Horse.prototype, "jie", {
        /** 幻化 阶 */
        get: function () {
            return ~~(this.hhId % 1000 / 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Horse.prototype, "ji", {
        /** 幻化 级 */
        get: function () {
            return this.hhId % 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Horse.prototype, "jiejiStr", {
        get: function () {
            var t = this;
            return t.jie + "阶" + t.ji + "级";
        },
        enumerable: true,
        configurable: true
    });
    /** 检查是否可骑乘 */
    Vo_Horse.prototype.checkCanRide = function () {
        var t = this;
        switch (t.cfg.type) {
            case EnumHorse.TYPE_COMMON:
                return t.star >= t.cfg.tiaojian;
            case EnumHorse.TYPE_HH:
                return t.hhId >= t.cfg.tiaojian;
            default:
                return false;
        }
    };
    Vo_Horse.prototype.checkCanAct = function (pShowAlert) {
        var t = this;
        var t_model = GGlobal.model_Horse;
        if (t.cfg.type == EnumHorse.TYPE_HH) {
            var t_ok = true;
            var t_list = JSON.parse(t.cfg.activation);
            for (var _i = 0, t_list_1 = t_list; _i < t_list_1.length; _i++) {
                var v = t_list_1[_i];
                var t_id = ~~v[0];
                var t_star = ~~v[1];
                var t_vo = t_model.getHorseVoById(t_id);
                if (!t_vo || t_vo.star < t_star) {
                    t_ok = false;
                    break;
                }
            }
            return t_ok;
        }
        else
            return false;
    };
    Object.defineProperty(Vo_Horse.prototype, "hhConditionList", {
        /** 幻化条件列表 */
        get: function () {
            var t = this;
            if (t.isAct) {
                if (t.cfgHH.up == "0" || t.cfgHH.up == 0) {
                    return [];
                }
                else {
                    return JSON.parse(t.cfgHH.up);
                }
            }
            else {
                return JSON.parse(t.cfg.activation);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Horse.prototype, "isMaxHH", {
        get: function () {
            var t = this;
            return t.nextCfgHH ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    Vo_Horse.prototype.checkUpConditionHH = function (pShowAlert) {
        var t = this;
        var t_model = GGlobal.model_Horse;
        var t_list = t.hhConditionList;
        var t_ok = true;
        if (t.isMaxHH)
            return false;
        for (var _i = 0, t_list_2 = t_list; _i < t_list_2.length; _i++) {
            var v = t_list_2[_i];
            var t_id = ~~v[0];
            var t_star = ~~v[1];
            var t_vo = t_model.getHorseVoById(t_id);
            if (!t_vo || t_vo.star < t_star) {
                t_ok = false;
                if (pShowAlert) {
                    if (t.isAct) {
                        if (t.cfgHH.next % 10 == 0) {
                            ViewCommonWarn.text("升阶条件不满足");
                        }
                        else {
                            ViewCommonWarn.text("升级条件不满足");
                        }
                    }
                    else {
                        ViewCommonWarn.text("激活条件不满足");
                    }
                }
                break;
            }
        }
        return t_ok;
    };
    Vo_Horse.prototype.checkConsumeHH = function (pShowAlert) {
        var t = this;
        if (!t.isAct)
            return true;
        var t_list = ConfigHelp.makeItemListArr(t.cfgHH.consume);
        var t_itemId = t_list[0].id;
        return FastAPI.checkItemEnough(t_itemId, t_list[0].count, pShowAlert);
    };
    return Vo_Horse;
}());
__reflect(Vo_Horse.prototype, "Vo_Horse");
