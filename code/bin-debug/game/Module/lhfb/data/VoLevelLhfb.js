var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 轮回副本关卡数据结构
 * @author: lujiahao
 * @date: 2020-02-26 17:19:37
 */
var VoLevelLhfb = (function () {
    function VoLevelLhfb() {
        /** 关卡id */
        this.levelId = 0;
        /** 轮回id */
        this.lunhuiId = 0;
        /** 星数 */
        this.star = 0;
    }
    Object.defineProperty(VoLevelLhfb.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.lhfb_337[this.levelId];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoLevelLhfb.prototype, "name", {
        /** 副本名称 */
        get: function () {
            var t = this;
            var t_model = GGlobal.modelLhfb;
            var t_copyVo = t_model.getCopyVoByLunhuiId(t.lunhuiId);
            if (t_copyVo) {
                return t_copyVo.name;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoLevelLhfb.prototype, "rewardList", {
        get: function () {
            if (this._rewardList === undefined)
                this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
            return this._rewardList;
        },
        enumerable: true,
        configurable: true
    });
    return VoLevelLhfb;
}());
__reflect(VoLevelLhfb.prototype, "VoLevelLhfb");
