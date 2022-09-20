var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2020-03-03 16:06:57
 */
var VoCopyLhfb = (function () {
    function VoCopyLhfb() {
        /** 轮回id */
        this.lunhuiId = 0;
        /** 已挑战次数 */
        this.hasPass = 0;
        /** 副本星数 */
        this.star = 1;
    }
    //=========================================== API ==========================================
    VoCopyLhfb.prototype.update = function (pData) {
        return ObjectUtils.modifyObject(this, pData);
    };
    Object.defineProperty(VoCopyLhfb.prototype, "remainCount", {
        /** 剩余挑战次数 */
        get: function () {
            var t = this;
            var t_model = GGlobal.modelLhfb;
            var t_remain = t_model.maxChallenge - t.hasPass;
            return t_remain < 0 ? 0 : t_remain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCopyLhfb.prototype, "name", {
        /** 副本名称 */
        get: function () {
            var t = this;
            return ConfigHelp.NumberToChinese(t.lunhuiId) + "\u4E16\u8F6E\u56DE\u526F\u672C";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCopyLhfb.prototype, "mapId", {
        /** 战斗地图id */
        get: function () {
            return 391000 + this.lunhuiId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoCopyLhfb.prototype, "levelVo", {
        /** 当前的关卡数据 */
        get: function () {
            var t = this;
            var t_model = GGlobal.modelLhfb;
            return t_model.getLevelVoByLunhuiIdAndStar(t.lunhuiId, t.star);
        },
        enumerable: true,
        configurable: true
    });
    /** 是否可进入 */
    VoCopyLhfb.prototype.canEnter = function (pShowTips) {
        var t = this;
        var t_myLunhuiId = Model_player.voMine.reincarnationLevel;
        if (t.lunhuiId > t_myLunhuiId) {
            if (pShowTips) {
                ViewCommonWarn.text("\u9700\u8981\u8FBE\u5230" + ConfigHelp.NumberToChinese(t.lunhuiId) + "\u4E16\u8F6E\u56DE");
            }
            return false;
        }
        return true;
    };
    return VoCopyLhfb;
}());
__reflect(VoCopyLhfb.prototype, "VoCopyLhfb");
