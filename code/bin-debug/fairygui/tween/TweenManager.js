var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var TweenManager = (function () {
        function TweenManager() {
        }
        TweenManager.createTween = function () {
            if (!TweenManager._inited) {
                egret.startTick(TweenManager.update, null);
                TweenManager._inited = true;
                TweenManager._lastTime = egret.getTimer();
            }
            var tweener;
            var cnt = TweenManager._tweenerPool.length;
            if (cnt > 0) {
                tweener = TweenManager._tweenerPool.pop();
            }
            else
                tweener = new fairygui.GTweener();
            tweener._init();
            TweenManager._activeTweens[TweenManager._totalActiveTweens++] = tweener;
            if (TweenManager._totalActiveTweens == TweenManager._activeTweens.length)
                TweenManager._activeTweens.length = TweenManager._activeTweens.length + Math.ceil(TweenManager._activeTweens.length * 0.5);
            return tweener;
        };
        TweenManager.isTweening = function (target, propType) {
            if (target == null)
                return false;
            var anyType = propType == null || propType == undefined;
            for (var i = 0; i < TweenManager._totalActiveTweens; i++) {
                var tweener = TweenManager._activeTweens[i];
                if (tweener != null && tweener.target == target && !tweener._killed
                    && (anyType || tweener._propType == propType))
                    return true;
            }
            return false;
        };
        TweenManager.killTweens = function (target, completed, propType) {
            if (target == null)
                return false;
            var flag = false;
            var cnt = TweenManager._totalActiveTweens;
            var anyType = propType == null || propType == undefined;
            for (var i = 0; i < cnt; i++) {
                var tweener = TweenManager._activeTweens[i];
                if (tweener != null && tweener.target == target && !tweener._killed
                    && (anyType || tweener._propType == propType)) {
                    tweener.kill(completed);
                    flag = true;
                }
            }
            return flag;
        };
        TweenManager.getTween = function (target, propType) {
            if (target == null)
                return null;
            var cnt = TweenManager._totalActiveTweens;
            var anyType = propType == null || propType == undefined;
            for (var i = 0; i < cnt; i++) {
                var tweener = TweenManager._activeTweens[i];
                if (tweener != null && tweener.target == target && !tweener._killed
                    && (anyType || tweener._propType == propType)) {
                    return tweener;
                }
            }
            return null;
        };
        TweenManager.update = function (timestamp) {
            var dt = timestamp - TweenManager._lastTime;
            TweenManager._lastTime = timestamp;
            dt /= 1000;
            var cnt = TweenManager._totalActiveTweens;
            var freePosStart = -1;
            var freePosCount = 0;
            for (var i = 0; i < cnt; i++) {
                var tweener = TweenManager._activeTweens[i];
                if (tweener == null) {
                    if (freePosStart == -1)
                        freePosStart = i;
                    freePosCount++;
                }
                else if (tweener._killed) {
                    tweener._reset();
                    TweenManager._tweenerPool.push(tweener);
                    TweenManager._activeTweens[i] = null;
                    if (freePosStart == -1)
                        freePosStart = i;
                    freePosCount++;
                }
                else {
                    if ((tweener._target instanceof fairygui.GObject) && (tweener._target).isDisposed)
                        tweener._killed = true;
                    else if (!tweener._paused)
                        tweener._update(dt);
                    if (freePosStart != -1) {
                        TweenManager._activeTweens[freePosStart] = tweener;
                        TweenManager._activeTweens[i] = null;
                        freePosStart++;
                    }
                }
            }
            if (freePosStart >= 0) {
                if (TweenManager._totalActiveTweens != cnt) {
                    var j = cnt;
                    cnt = TweenManager._totalActiveTweens - cnt;
                    for (i = 0; i < cnt; i++)
                        TweenManager._activeTweens[freePosStart++] = TweenManager._activeTweens[j++];
                }
                TweenManager._totalActiveTweens = freePosStart;
            }
            return false;
        };
        TweenManager._activeTweens = new Array(30);
        TweenManager._tweenerPool = new Array();
        TweenManager._totalActiveTweens = 0;
        TweenManager._lastTime = 0;
        TweenManager._inited = false;
        return TweenManager;
    }());
    fairygui.TweenManager = TweenManager;
    __reflect(TweenManager.prototype, "fairygui.TweenManager");
})(fairygui || (fairygui = {}));
