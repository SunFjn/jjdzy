var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CameraManager = (function () {
    function CameraManager() {
    }
    CameraManager.wacth = function (global_x, global_y) {
        //if(Global.isBattling) return;
        this.proxy.focusx = global_x;
        this.proxy.focusy = global_y;
        this._focusx = global_x;
        this._focusy = global_y;
    };
    CameraManager.wacthIm = function (x, y) {
        this._x = x;
        this._y = y;
        ArpgMap.getInstance().setXY(x, y);
        var portProxy = ArpgMap.getInstance()._portProxy;
        var p = portProxy._pointRest;
        CameraManager.sightX = Math.floor(p.x);
        CameraManager.sightY = Math.floor(p.y);
        CameraManager.ngx = Math.floor(CameraManager.sightX / ModelArpgMap.MAPBLOCKW / portProxy.scaleX);
        CameraManager.ngy = Math.floor(CameraManager.sightY / ModelArpgMap.MAPBLOCKH / portProxy.scaleY);
        if (CameraManager.ngx != CameraManager.gx || CameraManager.ngy != CameraManager.gy || CameraManager.invalidate) {
            CameraManager.gx = CameraManager.ngx;
            CameraManager.gy = CameraManager.ngy;
            ArpgMap.getInstance().rebuild();
        }
        ArpgMap.getInstance().setSight(-CameraManager.sightX, -CameraManager.sightY);
    };
    CameraManager.reSize = function (w, h) {
        CameraManager.wacthIm(CameraManager._x, CameraManager._y);
        ArpgMap.getInstance().rebuild();
    };
    //镜头移动
    CameraManager.cameraFromTo = function (sx, //开始点X
        sy, //开始点Y
        ex, //结束点X
        ey, //结束点Y
        time, //消耗时间
        endCallBack, fun, easing) {
        if (endCallBack === void 0) { endCallBack = null; }
        if (fun === void 0) { fun = null; }
        if (easing === void 0) { easing = "bee_line"; }
        var p = PP.instance;
        p._sx = sx;
        p._sy = sy;
        p._ex = ex;
        p._ey = ey;
        // to(p, time, {percent:[0, 1]},endCallBack,fun,easing);
        p.percent = 0;
        egret.Tween.get(p).to({ percent: 1 }, time, egret.Ease.sineIn);
    };
    CameraManager.stopCameraMove = function () {
        egret.Tween.removeTweens(PP.instance);
    };
    CameraManager.dispose = function () {
        CameraManager.gx = -1;
        CameraManager.gy = -1;
    };
    CameraManager.watchFocus = function () {
        CameraManager.wacth(GameUnitManager.hero.x, GameUnitManager.hero.y);
    };
    CameraManager.watchFocusIm = function () {
        CameraManager.wacthIm(GameUnitManager.hero.x, GameUnitManager.hero.y);
    };
    CameraManager.update = function (delta) {
        var matchCondition;
        if (!ModelArpgMap.sceneReady)
            return;
        CameraManager.proxy.update(delta);
        matchCondition = (CameraManager.invalidate || CameraManager.proxy.hasChange || ((CameraManager.proxy.currentx != CameraManager._x
            || CameraManager.proxy.currenty != CameraManager._y)));
        if (matchCondition) {
            CameraManager.wacthIm(CameraManager.proxy.currentx, CameraManager.proxy.currenty);
            CameraManager.invalidate = false;
        }
    };
    CameraManager.gx = -1;
    CameraManager.gy = -1;
    CameraManager.proxy = new EasePortCameraProxy();
    return CameraManager;
}());
__reflect(CameraManager.prototype, "CameraManager");
var PP = (function () {
    function PP() {
    }
    Object.defineProperty(PP, "instance", {
        get: function () {
            if (!PP._instance)
                PP._instance = new PP();
            return PP._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PP.prototype, "percent", {
        set: function (value) {
            var px = this._sx + (this._ex - this._sx) * value;
            var py = this._sy + (this._ey - this._sy) * value;
            CameraManager.wacth(px, py);
        },
        enumerable: true,
        configurable: true
    });
    return PP;
}());
__reflect(PP.prototype, "PP");
