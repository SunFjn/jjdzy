module Utils {
    export class DisplayUtil {
        public static addPop(disObj: egret.DisplayObject) {
            if (disObj) {
                disObj["scaleBefore"] = { x: disObj.scaleX, y: disObj.scaleY };
                disObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            }
        }
        private static onBegin(evt: egret.TouchEvent) {
            const tar = evt.currentTarget as egret.DisplayObject;
            tar.scaleX = tar["scaleBefore"].x * 1.05;
            tar.scaleY = tar["scaleBefore"].y * 1.05;
            tar.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            tar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        }
        private static onEnd(evt: egret.TouchEvent) {
            const tar = evt.currentTarget as egret.DisplayObject;
            tar.scaleX = tar["scaleBefore"].x;
            tar.scaleY = tar["scaleBefore"].y;
            tar.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            tar.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        }
    }
}