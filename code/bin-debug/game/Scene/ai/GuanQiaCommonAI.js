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
var GuanQiaCommonAI = (function (_super) {
    __extends(GuanQiaCommonAI, _super);
    function GuanQiaCommonAI() {
        return _super.call(this) || this;
    }
    GuanQiaCommonAI.create = function () {
        var pool = GuanQiaCommonAI.P;
        return pool.length ? pool.pop() : new GuanQiaCommonAI();
    };
    GuanQiaCommonAI.prototype.onEvent = function (evt, arg) {
        if (evt == EVT_SC.EVT_THROW) {
            if (this.role.curhp <= 0) {
                this.drop();
            }
        }
        _super.prototype.onEvent.call(this, evt, arg);
    };
    GuanQiaCommonAI.prototype.drop = function () {
        var item = SceneMoney.create();
        item.scene = this.role.scene;
        item.x = this.role.x;
        item.y = this.role.y;
        item.dep = -1;
        item.setType();
        this.role.scene.addUnit(item);
    };
    GuanQiaCommonAI.prototype.onRemove = function () {
        //千万不要 super.onRemove()! 因为GUANQIAAI也有对象池
        GuanQiaCommonAI.P.push(this);
    };
    GuanQiaCommonAI.P = [];
    return GuanQiaCommonAI;
}(CommonAICtrl));
__reflect(GuanQiaCommonAI.prototype, "GuanQiaCommonAI");
