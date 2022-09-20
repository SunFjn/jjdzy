var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 奇策数据结构
 * @author: lujiahao
 * @date: 2019-10-19 10:53:18
 */
var VoQice = (function () {
    function VoQice() {
        /** 等级（初始为1级） */
        this.level = 1;
        /** 星级 */
        this.star = 0;
        /** 兵魂 */
        this.bHun = 0;
        /** 将魂 */
        this.jHun = 0;
    }
    Object.defineProperty(VoQice.prototype, "cfg", {
        //========================================= 协议相关 ========================================
        get: function () {
            return Config.qc_760[this.id];
        },
        enumerable: true,
        configurable: true
    });
    //=========================================== API ==========================================
    VoQice.prototype.update = function (pLevel, pStar, pBHun, pJHun) {
        var t = this;
        var t_change = false;
        if (t.level != pLevel) {
            t.level = pLevel;
            t_change = true;
        }
        if (t.star != pStar) {
            t.star = pStar;
            t_change = true;
        }
        if (t.bHun != pBHun) {
            t.bHun = pBHun;
            t_change = true;
        }
        if (t.jHun != pJHun) {
            t.jHun = pJHun;
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoQice.prototype, "nameWithColor", {
        get: function () {
            return HtmlUtil.font(this.cfg.name, Color.getColorStr(this.cfg.pz));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "consumeList", {
        /** 升星消耗 */
        get: function () {
            if (this._consumeList === undefined) {
                this._consumeList = ConfigHelp.makeItemListArr(this.cfg.sxxh);
            }
            return this._consumeList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "hasBh", {
        /** 是否拥有兵魂 */
        get: function () {
            return this.cfg.max1 > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "hasJh", {
        /** 是否拥有将魂 */
        get: function () {
            return this.cfg.max2 > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "bhMax", {
        /** 兵魂上限 */
        get: function () {
            return this.star * this.cfg.max1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "jhMax", {
        /** 将魂上限 */
        get: function () {
            return this.star * this.cfg.max2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "isActive", {
        /** 是否已经激活 */
        get: function () {
            return this.star > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "isStarMax", {
        /** 是否满星 */
        get: function () {
            if (this.star >= this.cfg.sx || !this.nextStarCfg)
                return true;
            else
                return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "isLevelMax", {
        /** 是否满级 */
        get: function () {
            if (!this.nextLevelCfg)
                return true;
            else
                return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "curStarId", {
        get: function () {
            return this.cfg.pz * 1000 + this.star;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "nextStarId", {
        get: function () {
            return this.curStarId + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "curStarCfg", {
        get: function () {
            return GGlobal.modelQice.getCfgStar(this.curStarId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "nextStarCfg", {
        get: function () {
            return GGlobal.modelQice.getCfgStar(this.nextStarId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "curLevelId", {
        get: function () {
            return this.cfg.pz * 10000 + this.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "nextLevelId", {
        get: function () {
            return this.curLevelId + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "curLevelCfg", {
        get: function () {
            return GGlobal.modelQice.getCfgLevel(this.curLevelId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "nextLevelCfg", {
        get: function () {
            return GGlobal.modelQice.getCfgLevel(this.nextLevelId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "levelJie", {
        /** 阶数 */
        get: function () {
            return ~~(this.level / 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "levelJi", {
        /** 级数 */
        get: function () {
            return this.level % 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoQice.prototype, "levelStr", {
        /** 阶级文字 */
        get: function () {
            return this.levelJie + "阶" + this.levelJi + "级";
        },
        enumerable: true,
        configurable: true
    });
    /** 检查是否可升星 */
    VoQice.prototype.checkCanStarUp = function (pShowAlert) {
        var t = this;
        var t_result = false;
        do {
            if (t.isStarMax) {
                pShowAlert && ViewCommonWarn.text("当前奇策已满星");
                continue;
            }
            if (!FastAPI.checkItemEnough(t.consumeList[0].id, t.consumeList[0].count, pShowAlert)) {
                continue;
            }
            t_result = true;
        } while (false);
        return t_result;
    };
    /** 检查是否可升级 */
    VoQice.prototype.checkCanLevelUp = function (pShowAlert) {
        var t = this;
        var t_result = false;
        do {
            if (t.isLevelMax) {
                pShowAlert && ViewCommonWarn.text("当前奇策已满级");
                continue;
            }
            if (!t.isActive) {
                pShowAlert && ViewCommonWarn.text("\u8BF7\u5148\u6FC0\u6D3B" + t.nameWithColor);
                continue;
            }
            if (t.star < t.curLevelCfg.cfg.tj) {
                pShowAlert && ViewCommonWarn.text("\u9700\u8981" + t.nameWithColor + "\u8FBE\u5230" + t.curLevelCfg.cfg.tj + "\u661F}");
                continue;
            }
            if (!FastAPI.checkItemEnough(t.curLevelCfg.consumeList[0].id, t.curLevelCfg.consumeList[0].count, pShowAlert)) {
                continue;
            }
            t_result = true;
        } while (false);
        return t_result;
    };
    /** 检查魂是否可吞噬 */
    VoQice.prototype.checkHunCanUp = function (pHunType, pShowAlert) {
        var t = this;
        var t_result = false;
        var t_hunCount = 0;
        var t_hunMax = 0;
        if (pHunType == EnumQice.HUN_TYPE_BH) {
            //兵魂
            t_hunCount = t.bHun;
            t_hunMax = t.bhMax;
        }
        else {
            //将魂
            t_hunCount = t.jHun;
            t_hunMax = t.jhMax;
        }
        do {
            if (!t.isActive) {
                pShowAlert && ViewCommonWarn.text("\u8BF7\u5148\u6FC0\u6D3B" + t.nameWithColor);
                continue;
            }
            if (t_hunCount >= t_hunMax) {
                pShowAlert && ViewCommonWarn.text("已超过可吞噬上限");
                continue;
            }
            var t_cfg = Config.qcts_760[pHunType];
            if (!t_cfg)
                continue;
            var t_itemCfg = Config.daoju_204[t_cfg.id];
            if (!t_itemCfg)
                continue;
            if (!FastAPI.checkItemEnough(t_itemCfg.id, 1, pShowAlert)) {
                continue;
            }
            t_result = true;
        } while (false);
        return t_result;
    };
    /**
     * 获取排序权值
     * @param pType 类型 0升星 1升级
     */
    VoQice.prototype.getSortVlaue = function (pType) {
        var t = this;
        var t_value = 0;
        var t_canOp = false;
        if (pType == 0) {
            //升星
            if (t.checkCanStarUp(false)
                || t.checkHunCanUp(EnumQice.HUN_TYPE_BH, false)
                || t.checkHunCanUp(EnumQice.HUN_TYPE_JH, false)) {
                t_value += 1000;
                if (!t.isActive) {
                    //可升级但未激活，就是需要激活操作，优先级要+
                    t_value += 10000;
                }
                t_canOp = true;
            }
        }
        else {
            //升级
            if (t.checkCanLevelUp(false)) {
                t_value += 1000;
                t_canOp = true;
            }
        }
        if (t_canOp) {
            t_value += (t.id % 100000);
        }
        else {
            if (t.isActive) {
                //已激活
                t_value += (t.id % 100000);
            }
            else {
                //未激活
                t_value -= (t.id % 100000);
            }
        }
        return t_value;
    };
    return VoQice;
}());
__reflect(VoQice.prototype, "VoQice");
