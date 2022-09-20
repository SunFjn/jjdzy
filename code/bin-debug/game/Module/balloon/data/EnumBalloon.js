var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-31 21:26:06
 */
var EnumBalloon = (function () {
    function EnumBalloon() {
    }
    /** 气球总数 */
    EnumBalloon.BALL_COUNT = 12;
    return EnumBalloon;
}());
__reflect(EnumBalloon.prototype, "EnumBalloon");
