var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 刮刮乐抽奖的临时数据结构
 * @author: lujiahao
 * @date: 2020-02-17 19:11:32
 */
var VoGGLTemp = (function () {
    function VoGGLTemp() {
        /** 序号 从1开始 */
        this.indexId = 0;
        this.itemId = 0;
        this.itemType = 0;
        this.count = 0;
        /** 是否抽中的奖励 */
        this.isReward = false;
        this._change = false;
    }
    //========================================= 协议相关 ========================================
    VoGGLTemp.prototype.update = function (pData) {
        var t = this;
        if (ObjectUtils.modifyObject(t, pData)) {
            t._change = true;
        }
        return t._change;
    };
    Object.defineProperty(VoGGLTemp.prototype, "itemVo", {
        get: function () {
            var t = this;
            if (t._change) {
                t._change = false;
                if (t.itemId > 0 || t.itemType > 0)
                    t._itemVo = ConfigHelp.makeItem([t.itemType, t.itemId, t.count]);
            }
            return t._itemVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoGGLTemp.prototype, "cfg", {
        get: function () {
            var t = this;
            var t_key = StringUtil.combinKey([t.itemId, t.count]);
            return GGlobal.modelGGL.getVoCfgByKey(t_key);
        },
        enumerable: true,
        configurable: true
    });
    return VoGGLTemp;
}());
__reflect(VoGGLTemp.prototype, "VoGGLTemp");
