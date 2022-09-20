var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 群雄逐鹿城池数据结构
 * @author: lujiahao
 * @date: 2019-09-25 15:39:43
 */
var VoCityQxzl = (function () {
    function VoCityQxzl() {
        /** 所属国家 */
        this.countryId = 0;
        /** 是否庆典双倍 */
        this.isDouble = 0;
        /** 驻守人数 */
        this.guardCount = 0;
        /** 最大页码 */
        this.maxPage = 1;
        this.playerList = [];
        this.playerList.length = EnumQxzl.PER_PAGE_COUNT;
    }
    Object.defineProperty(VoCityQxzl.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.qxzl_273[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoCityQxzl.prototype.update = function (pCountryId, pIsDouble, pGuardCount) {
        var t_change = false;
        if (this.countryId != pCountryId) {
            this.countryId = pCountryId;
            t_change = true;
        }
        if (!(pIsDouble === undefined)) {
            if (this.isDouble != pIsDouble) {
                this.isDouble = pIsDouble;
                t_change = true;
            }
        }
        if (!(pGuardCount === undefined)) {
            if (this.guardCount != pGuardCount) {
                this.guardCount = pGuardCount;
                t_change = true;
            }
        }
        return t_change;
    };
    Object.defineProperty(VoCityQxzl.prototype, "isEmpty", {
        /** 是否没人驻守 */
        get: function () {
            var t_isEmpty = true;
            for (var _i = 0, _a = this.playerList; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v) {
                    t_isEmpty = false;
                    break;
                }
            }
            return t_isEmpty;
        },
        enumerable: true,
        configurable: true
    });
    VoCityQxzl.prototype.getPlayerVoByIndex = function (pIndex) {
        return this.playerList[pIndex];
    };
    Object.defineProperty(VoCityQxzl.prototype, "isMainCity", {
        /** 是否国家主城 */
        get: function () {
            return this.cfg.type == 4 || this.cfg.type == 5 || this.cfg.type == 6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCityQxzl.prototype, "rewardLujiao", {
        /** 驻守的定时鹿角奖励 */
        get: function () {
            if (this._lujiao === undefined) {
                var t_list = JSON.parse(this.cfg.lu);
                this._lujiao = ~~t_list[0][2];
            }
            return this._lujiao;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCityQxzl.prototype, "rewardList", {
        /** 领地奖励 */
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCityQxzl.prototype, "isMyCountryCity", {
        /** 是否属于主角国家的城池 */
        get: function () {
            if (this.countryId > 0 && this.countryId == Model_player.voMine.country)
                return true;
            else
                return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCityQxzl.prototype, "isMyPosCity", {
        /** 是否主角身处的城池 */
        get: function () {
            return GGlobal.modelQxzl.curCityId == this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCityQxzl.prototype, "isMyDefendCity", {
        /** 是否主角正在驻守的城池 */
        get: function () {
            return this.isMyPosCity && GGlobal.modelQxzl.isInCity == 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCityQxzl.prototype, "nearCityList", {
        get: function () {
            if (this._nearCityList === undefined) {
                var t_list = JSON.parse(this.cfg.behind);
                this._nearCityList = t_list[0];
            }
            return this._nearCityList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCityQxzl.prototype, "isPosNear", {
        /** 是否邻近主角位置 */
        get: function () {
            var t_posCityVo = GGlobal.modelQxzl.getCityVoById(GGlobal.modelQxzl.curCityId);
            if (t_posCityVo) {
                if (t_posCityVo.nearCityList.indexOf(this.id) > -1)
                    return true;
                else
                    return false;
            }
            else
                return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCityQxzl.prototype, "isCountryNear", {
        /** 是否邻近所属国家 */
        get: function () {
            if (this.isMyCountryCity)
                return false;
            var t_myCountryCitys = GGlobal.modelQxzl.myCountryCityList;
            for (var _i = 0, t_myCountryCitys_1 = t_myCountryCitys; _i < t_myCountryCitys_1.length; _i++) {
                var v = t_myCountryCitys_1[_i];
                var t_nearList = v.nearCityList;
                if (t_nearList.indexOf(this.id) > -1) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return VoCityQxzl;
}());
__reflect(VoCityQxzl.prototype, "VoCityQxzl");
