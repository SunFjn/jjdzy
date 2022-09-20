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
var Magic = (function (_super) {
    __extends(Magic, _super);
    function Magic() {
        var _this = _super.call(this) || this;
        _this.totalTime = 800;
        _this.isFirst = true;
        return _this;
    }
    Magic.prototype.isMine = function () { return false; };
    Magic.prototype.onAdd = function () {
        if (this.effect) {
            EffectMgr.instance.removeEff(this.effect);
        }
        // this.effect = EffectMgr.addEff();
    };
    Magic.prototype.onRemove = function () { };
    Magic.prototype.update = function (ctx) { };
    Magic.prototype.onEvent = function (evt, any) { };
    Magic.prototype.show = function () {
        // var point = GameScene.mapLayer.globalToLocal(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
        // this.global_x = point.x;
        // this.global_y = point.y;
        // if (this.isFirst)
        // 	this.isFirst = false;
        // else {
        // 	super.show();
        // 	this.beginTime = egret.getTimer();
        // 	this.effect.beginTime = egret.getTimer();
        // 	this.visible = true;
        // }
    };
    Magic.CITY = 1; //主城
    Magic.FUBEN = 2; //副本
    Magic.pool = [];
    Magic.list = [];
    return Magic;
}(DepSprite));
__reflect(Magic.prototype, "Magic", ["ISceneObject"]);
