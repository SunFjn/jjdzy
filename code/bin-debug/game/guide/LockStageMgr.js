var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LockStageMgr = (function () {
    function LockStageMgr() {
    }
    LockStageMgr.startLockRect = function (tar, w, h) {
        if (w === void 0) { w = 100; }
        if (h === void 0) { h = 100; }
        LockStageMgr._w = w;
        LockStageMgr._h = h;
        LockStageMgr._tar = tar;
        var p = tar.parent.localToGlobal(tar.x, tar.y);
        LockStageMgr._x = p.x;
        LockStageMgr._y = p.y;
        if (LockStageMgr.rects.length) {
            LockStageMgr.onResze();
            return;
        }
        var sw = App.stage.stageWidth;
        var sh = App.stage.stageHeight;
        var iw = [1, sw, 1, sw];
        var ih = [sh, 1, sh, 1];
        var ix = [0, 0, sw, 0];
        var iy = [0, 0, 0, sh];
        var ew = LockStageMgr._ew;
        var eh = LockStageMgr._eh;
        var ex = LockStageMgr._ex;
        var ey = LockStageMgr._ey;
        if (LockStageMgr.container == null) {
            LockStageMgr.container = new fairygui.GComponent();
            LockStageMgr.container.x = -GGlobal.layerMgr.offx;
            var sc = 1 / LayerManager.getFullScreenSc();
            this.container.setScale(sc, sc);
            GGlobal.layerMgr.UI_Popup.addChild(LockStageMgr.container);
        }
        else {
            GGlobal.layerMgr.UI_Popup.setChildIndex(LockStageMgr.container, GGlobal.layerMgr.UI_Popup.numChildren - 1);
        }
        for (var i = 0; i < 4; i++) {
            var shape = LockStageMgr.drawrR(ix[i], iy[i], iw[i], ih[i]);
            LockStageMgr.rects.push(shape);
            egret.Tween.get(shape).to({ x: ex[i], y: ey[i], width: ew[i], height: eh[i] }, 300, egret.Ease.sineOut);
            LockStageMgr.container.addChild(shape);
        }
        // GGlobal.control.listen(Enum_MsgType.MSG_ENTERFRAME, LockStageMgr.onResze);
    };
    LockStageMgr.endLockRect = function () {
        if (LockStageMgr.rects.length == 0) {
            return;
        }
        while (LockStageMgr.rects.length) {
            var d = LockStageMgr.rects.shift();
            d.parent.removeChild(d);
        }
        if (LockStageMgr.container) {
            LockStageMgr.container.removeFromParent();
            LockStageMgr.container = null;
        }
        // GGlobal.control.remove(Enum_MsgType.MSG_ENTERFRAME, LockStageMgr.onResze);
    };
    LockStageMgr.drawrR = function (x, y, w, h) {
        var shap = new fairygui.GGraph();
        shap.setSize(w, h);
        shap.drawRect(0, 0, 0, 0x0, .7);
        // shap.touchable = false;
        shap.x = x;
        shap.y = y;
        return shap;
    };
    // private static lastTime: number = 0;
    LockStageMgr.onResze = function () {
        // var now: number = egret.getTimer();
        // if (now - LockStageMgr.lastTime < 100) {
        // 	return;
        // }
        // now = LockStageMgr.lastTime;
        if (LockStageMgr.rects.length) {
            var p = LockStageMgr._tar.parent.localToGlobal(LockStageMgr._tar.x, LockStageMgr._tar.y);
            LockStageMgr._x = p.x;
            LockStageMgr._y = p.y;
            for (var i = 0; i < LockStageMgr.rects.length; i++) {
                var spr = LockStageMgr.rects[i];
                egret.Tween.removeTweens(spr);
                spr.setSize(LockStageMgr._ew[i], LockStageMgr._eh[i]);
                spr.setXY(LockStageMgr._ex[i], LockStageMgr._ey[i]);
            }
        }
    };
    Object.defineProperty(LockStageMgr, "sh", {
        get: function () {
            return App.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LockStageMgr, "sw", {
        get: function () {
            return App.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LockStageMgr, "_ew", {
        get: function () {
            return [LockStageMgr._x, LockStageMgr._w, LockStageMgr.sw - LockStageMgr._x - LockStageMgr._w, LockStageMgr._w];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LockStageMgr, "_eh", {
        get: function () {
            return [LockStageMgr.sh, LockStageMgr._y, LockStageMgr.sh, LockStageMgr.sh - LockStageMgr._y - LockStageMgr._h];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LockStageMgr, "_ex", {
        get: function () {
            return [0, LockStageMgr._x, LockStageMgr._x + LockStageMgr._w, LockStageMgr._x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LockStageMgr, "_ey", {
        get: function () {
            return [0, 0, 0, LockStageMgr._y + LockStageMgr._h];
        },
        enumerable: true,
        configurable: true
    });
    LockStageMgr._w = 100;
    LockStageMgr._h = 100;
    LockStageMgr._x = 400;
    LockStageMgr._y = 400;
    LockStageMgr.rects = [];
    return LockStageMgr;
}());
__reflect(LockStageMgr.prototype, "LockStageMgr");
