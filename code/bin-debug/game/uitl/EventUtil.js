var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 方便注册和反注册事件
 * @author: lujiahao
 * @date: 2018-03-29 16:03:06
 */
var EventUtil = (function () {
    function EventUtil() {
    }
    EventUtil.register = function (pFlag, pTarget, pType, pHandler, pThisObj, useCapture, priority) {
        if (!pTarget)
            return;
        if (pFlag) {
            pTarget.addEventListener(pType, pHandler, pThisObj, useCapture, priority);
        }
        else {
            pTarget.removeEventListener(pType, pHandler, pThisObj, useCapture);
        }
    };
    EventUtil.TOUCH = egret.TouchEvent.TOUCH_TAP;
    EventUtil.LINK = egret.TextEvent.LINK;
    return EventUtil;
}());
__reflect(EventUtil.prototype, "EventUtil");
