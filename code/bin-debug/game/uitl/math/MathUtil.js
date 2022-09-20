var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtil = (function () {
    function MathUtil() {
    }
    MathUtil.rndNum = function (min, max) {
        return min + Math.random() * (max - min);
    };
    MathUtil.rndLength = function (dir, length, min, max) {
        if (dir == 1) {
            var left = length - min;
            return left + min + Math.random() * (max - min);
        }
        else {
            var left = min - length;
            return left - min + Math.random() * (min - max);
        }
    };
    MathUtil.dist = function (x1, y1, x2, y2) {
        var ret;
        ret = Math.abs(((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
        ret = Math.ceil(ret);
        return ret;
    };
    /**
     * 随机抽出数组中的一个元素
     * @static
     * @param {any[]} pArray
     * @returns {*}
     * @memberof MathUtil
     */
    MathUtil.randomElement = function (pArray) {
        return pArray[Math.floor(Math.random() * pArray.length)];
    };
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
