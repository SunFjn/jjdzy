var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Door = (function () {
    function Door() {
        this.objType = UnitType.PORTAL;
        this.view = new DepSprite();
        this.view.touchEnabled = this.view.touchChildren = false;
    }
    Door.prototype.onEvent = function (evt, any) { };
    Door.prototype.onAdd = function () {
        var self = this;
        if (self.effect) {
            EffectMgr.instance.removeEff(self.effect);
        }
        self.effect = EffectMgr.addEff("uieff/transpoint", self.view, 0, 0, 1000);
        self.effect.touchEnabled = false;
        self.effect.getMC().touchEnabled = false;
        ArpgMap.getInstance().mainLayer.depAddChild(self.view);
    };
    Door.prototype.update = function (ctx) {
    };
    Door.prototype.onRemove = function () {
        var self = this;
        if (self.effect) {
            EffectMgr.instance.removeEff(self.effect);
        }
        self.effect = null;
        ArpgMap.getInstance().mainLayer.depRemoveChild(self.view);
        var idx = Door.list.indexOf(self);
        if (idx > -1)
            Door.list.splice(idx, 1);
        Pool.recover("Door", self);
    };
    Door.create = function (x, y, mapid) {
        var ret = Pool.getItemByClass("Door", Door);
        ret.x = ret.view.x = x;
        ret.y = ret.view.y = y;
        ret.mapid = mapid;
        if (Door.list.indexOf(ret) == -1)
            Door.list.push(ret);
        return ret;
    };
    Door.pool = [];
    Door.list = [];
    return Door;
}());
__reflect(Door.prototype, "Door", ["ISceneObject"]);
