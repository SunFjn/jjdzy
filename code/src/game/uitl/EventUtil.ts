/**
 * 方便注册和反注册事件
 * @author: lujiahao 
 * @date: 2018-03-29 16:03:06 
 */
class EventUtil {
    public constructor() {
    }

    static TOUCH = egret.TouchEvent.TOUCH_TAP;
    static LINK = egret.TextEvent.LINK;

    public static register(pFlag: boolean, pTarget: egret.EventDispatcher, pType: string, pHandler: Function, pThisObj: any, useCapture?: boolean, priority?: number) {
        if (!pTarget)
            return;
        if (pFlag) {
            pTarget.addEventListener(pType, pHandler, pThisObj, useCapture, priority);
        }
        else {
            pTarget.removeEventListener(pType, pHandler, pThisObj, useCapture);
        }
    }
}