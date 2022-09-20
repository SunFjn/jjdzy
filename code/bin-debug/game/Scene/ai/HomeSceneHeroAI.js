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
var HomeSceneHeroAI = (function (_super) {
    __extends(HomeSceneHeroAI, _super);
    function HomeSceneHeroAI() {
        return _super.call(this) || this;
    }
    HomeSceneHeroAI.prototype.aithink = function (ctx) {
    };
    HomeSceneHeroAI.prototype.update = function (ctx) {
        _super.prototype.update.call(this, ctx);
    };
    HomeSceneHeroAI.prototype.onAdd = function () {
        this.role.scene.map.touchEnabled = true;
        this.role.scene.map.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSceneTouch, this);
    };
    HomeSceneHeroAI.prototype.onRemove = function () {
        this.role.scene.map.touchEnabled = false;
        this.role.scene.map.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSceneTouch, this);
    };
    HomeSceneHeroAI.prototype.onEvent = function (evt, arg) {
    };
    HomeSceneHeroAI.prototype.onSceneTouch = function (e) {
        var view = e.currentTarget;
        this.moveTo(e.localX, e.localY);
    };
    return HomeSceneHeroAI;
}(HomeScenePlayerAI));
__reflect(HomeSceneHeroAI.prototype, "HomeSceneHeroAI");
