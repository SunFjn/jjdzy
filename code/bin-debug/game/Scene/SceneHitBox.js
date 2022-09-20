var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneHitBox = (function () {
    function SceneHitBox() {
        this.objType = 0;
        this.force = 0;
        this.x = 0;
        this.y = 0;
        this.h = 0;
        this.shape = new egret.Shape();
        this.view = new DepSprite();
        this.id = SceneObject.COUNTER++;
        this.view.addChild(this.shape);
    }
    SceneHitBox.create = function (box3d, scene) {
        if (!GGlobal.mapscene.showHitBox) {
            return;
        }
        var ret = new SceneHitBox();
        ret.setBox(box3d);
        scene.addUnit(ret);
    };
    SceneHitBox.prototype.onAdd = function () {
        this.lifetime = 0;
        this.scene.unitLayer.depAddChild(this.view);
    };
    SceneHitBox.prototype.onRemove = function () {
        this.scene.unitLayer.depRemoveChild(this.view);
    };
    SceneHitBox.prototype.update = function (ctx) {
        this.lifetime += ctx.dt;
        this.view.alpha -= 0.04;
        if (this.lifetime >= 800) {
            ctx.d = 1;
            return;
        }
    };
    SceneHitBox.prototype.onEvent = function (evt, arg) {
    };
    SceneHitBox.prototype.setBox = function (box3d) {
        this.shape.graphics.beginFill(0x00ff00, 0.3);
        this.shape.graphics.lineStyle(1, 0);
        this.shape.graphics.moveTo(box3d.x1, box3d.y1);
        this.shape.graphics.lineTo(box3d.x2, box3d.y1);
        this.shape.graphics.lineTo(box3d.x2, box3d.y2);
        this.shape.graphics.lineTo(box3d.x1, box3d.y2);
        this.shape.graphics.lineTo(box3d.x1, box3d.y1);
    };
    return SceneHitBox;
}());
__reflect(SceneHitBox.prototype, "SceneHitBox", ["ISceneObject"]);
