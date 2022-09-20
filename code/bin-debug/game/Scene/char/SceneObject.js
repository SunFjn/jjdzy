var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneObject = (function () {
    function SceneObject() {
        this.x = 0;
        this.y = 0;
        this.h = 0;
        /** 1:通常角色(主角 怪物等) 10:岩石 20:掉落货币*/
        this.objType = 0;
        this.id = 0;
        /**所在势力队伍 */
        this.force = 0;
        /**左右权重 */
        this.forceRightWeight = 1;
        this.scale = 1;
        this.id = SceneObject.COUNTER++;
    }
    SceneObject.prototype.update = function (ctx) {
    };
    SceneObject.prototype.onAdd = function () {
    };
    SceneObject.prototype.onRemove = function () {
    };
    SceneObject.prototype.onEvent = function (evt, arg) {
        if (arg === void 0) { arg = null; }
    };
    SceneObject.COUNTER = 0;
    return SceneObject;
}());
__reflect(SceneObject.prototype, "SceneObject", ["ISceneObject"]);
