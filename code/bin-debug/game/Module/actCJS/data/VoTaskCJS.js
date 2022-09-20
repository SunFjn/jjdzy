var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 成就树任务数据结构
 * @author: lujiahao
 * @date: 2019-11-21 11:00:21
 */
var VoTaskCJS = (function () {
    function VoTaskCJS() {
        /** 状态 0未完成 1已完成 */
        this.state = 0;
        /** 任务计数 */
        this.count = 0;
    }
    Object.defineProperty(VoTaskCJS.prototype, "cfg", {
        //=========================================== API ==========================================
        get: function () {
            return Config.cjs_769[this.id];
        },
        enumerable: true,
        configurable: true
    });
    VoTaskCJS.prototype.update = function (pData) {
        var t_change = false;
        if (ObjectUtils.modifyObject(this, pData)) {
            t_change = true;
        }
        return t_change;
    };
    Object.defineProperty(VoTaskCJS.prototype, "sortValue", {
        get: function () {
            var t = this;
            var t_value = 0;
            switch (t.state) {
                case 0:
                    t_value += 1000;
                    break;
                case 1:
                    break;
            }
            t_value -= (t.id % 1000);
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoTaskCJS;
}());
__reflect(VoTaskCJS.prototype, "VoTaskCJS");
