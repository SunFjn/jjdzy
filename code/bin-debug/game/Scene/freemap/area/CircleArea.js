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
var CircleArea = (function (_super) {
    __extends(CircleArea, _super);
    function CircleArea() {
        return _super.call(this) || this;
    }
    CircleArea.prototype.checkXY = function (px, py) {
        var subx = this.x - px;
        var suby = this.y - py;
        var ret = (subx * subx + suby * suby) <= this.powerradius;
        return ret;
    };
    CircleArea.prototype.reset = function (px, py, r) {
        this.x = px;
        this.y = py;
        this.radius = r;
        this.powerradius = r * r;
    };
    CircleArea.create = function (iteminfo) {
        try {
            var jsoninfo = JSON.parse(iteminfo.userdata);
            if (jsoninfo.id) {
                var circle = CircleArea.pool.length ? CircleArea.pool.pop() : new CircleArea();
                circle.reset(iteminfo.x, iteminfo.y, iteminfo.radius);
                circle.areaid = jsoninfo.id;
            }
        }
        catch (e) {
        }
        return circle;
    };
    CircleArea.prototype.dispose = function () {
        CircleArea.pool.push(this);
    };
    CircleArea.prototype.getBound = function () {
        var ret = new egret.Rectangle();
        ret.x = this.x - this.radius;
        ret.y = this.y - this.radius;
        ret.width = this.radius * 2;
        ret.height = this.radius * 2;
        return ret;
    };
    CircleArea.prototype.getCenter = function () {
        var point = new egret.Point();
        point.x = this.x;
        point.y = this.y;
        return point;
    };
    CircleArea.pool = [];
    return CircleArea;
}(AreaBase));
__reflect(CircleArea.prototype, "CircleArea");
