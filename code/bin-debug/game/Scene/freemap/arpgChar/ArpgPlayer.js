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
var ArpgPlayer = (function (_super) {
    __extends(ArpgPlayer, _super);
    function ArpgPlayer() {
        var _this = _super.call(this) || this;
        _this.objType = UnitType.PLAYER;
        return _this;
    }
    ArpgPlayer.prototype.onAdd = function () {
        _super.prototype.onAdd.call(this);
        ArpgPlayer.list[this.id] = this;
    };
    ArpgPlayer.prototype.onRemove = function () {
        delete ArpgPlayer.list[this.id];
        _super.prototype.onRemove.call(this);
        Pool.recover("ArpgPlayer", this);
    };
    ArpgPlayer.prototype.setXY = function (xx, yy, force) {
        if (force === void 0) { force = false; }
        this.x = xx;
        this.y = yy;
        if (force) {
            this.view.x = this.x;
            this.view.y = this.y;
        }
    };
    ArpgPlayer.list = {};
    return ArpgPlayer;
}(ArpgRole));
__reflect(ArpgPlayer.prototype, "ArpgPlayer");
