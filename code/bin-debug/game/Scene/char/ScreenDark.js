var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ScreenDark = (function (_super) {
    __extends(ScreenDark, _super);
    function ScreenDark() {
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        _this.h = 0;
        /** 1:通常角色(主角 怪物等) 10:岩石 20:掉落货币*/
        _this.objType = 0;
        _this.id = 0;
        /**所在势力队伍 */
        _this.force = 0;
        _this.scale = 1;
        _this.remainLife = 0;
        _this.id = SceneObject.COUNTER++;
        _this.shp = new fairygui.GGraph();
        _this.shp.drawRect(0, 0, 0, 0, 0.7);
        _this.addChild(_this.shp.displayObject);
        return _this;
    }
    ScreenDark.ins = function () {
        if (!this._ins) {
            this._ins = new ScreenDark();
        }
        return this._ins;
    };
    ScreenDark.show = function (time) {
        if (time === void 0) { time = 1500; }
        var instance = ScreenDark.ins();
        if (instance.parent) {
            GGlobal.mapscene.removeUnit(instance);
        }
        instance.show(time);
    };
    ScreenDark.prototype.show = function (time) {
        egret.Tween.removeTweens(this);
        if (!this.parent) {
            GGlobal.mapscene.addUnit(this);
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1 }, 200);
        }
        if (time > this.remainLife) {
            this.remainLife = time;
        }
        var sc = 1 / LayerManager.getFullScreenSc();
        this.shp.setSize(App.stage.stageWidth + 4, App.stage.stageHeight + 4);
        this.shp.setScale(sc, sc);
        this.shp.setXY(-2, -2);
    };
    ScreenDark.prototype.onAdd = function () {
        this.map = GGlobal.mapscene.map;
        GGlobal.mapscene.unitLayer.depAddChild(this);
        this.x = this.map.focusx - App.stage.stageWidth / 2;
    };
    ScreenDark.prototype.onRemove = function () {
        GGlobal.mapscene.unitLayer.depRemoveChild(this);
    };
    ScreenDark.prototype.update = function (ctx) {
        var oldtime = this.remainLife;
        this.remainLife -= ctx.dt;
        this.x = this.map.focusx - App.stage.stageWidth / 2;
        if (this.remainLife <= 0) {
            ctx.d = 1;
        }
        else {
            if (oldtime >= 200 && this.remainLife < 200) {
                egret.Tween.get(this).to({ alpha: 0 }, 200);
            }
        }
    };
    ScreenDark.prototype.onEvent = function (evt, arg) {
    };
    ScreenDark.COUNTER = 0;
    return ScreenDark;
}(DepSprite));
__reflect(ScreenDark.prototype, "ScreenDark", ["ISceneObject"]);
