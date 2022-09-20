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
var RectArea = (function (_super) {
    __extends(RectArea, _super);
    function RectArea() {
        return _super.call(this) || this;
    }
    RectArea.prototype.checkXY = function (px, py) {
        var ret = px >= this.x && py >= this.y && px <= this.right && py <= this.bottom;
        return ret;
    };
    RectArea.prototype.reset = function (px, py, w, h) {
        this.x = px;
        this.y = py;
        this.width = w;
        this.height = h;
        this.right = this.x + w;
        this.bottom = this.y + h;
    };
    RectArea.create = function (iteminfo) {
        try {
            var jsoninfo = JSON.parse(iteminfo.userdata);
            if (jsoninfo.id != undefined) {
                var rect = RectArea.pool.length ? RectArea.pool.pop() : new RectArea();
                rect.reset(iteminfo.x, iteminfo.y, iteminfo.width, iteminfo.height);
                rect.areaid = jsoninfo.id;
            }
        }
        catch (e) {
        }
        return rect;
    };
    RectArea.prototype.dispose = function () {
        RectArea.pool.push(this);
    };
    RectArea.prototype.getBound = function () {
        var ret = new egret.Rectangle();
        ret.x = this.x;
        ret.y = this.y;
        ret.width = this.width;
        ret.height = this.height;
        return ret;
    };
    RectArea.prototype.getRandomPoint = function () {
        var ret = new egret.Point();
        ret.x = this.x + Math.random() * this.width;
        ret.y = this.y + Math.random() * this.height;
        return ret;
    };
    RectArea.pool = [];
    return RectArea;
}(AreaBase));
__reflect(RectArea.prototype, "RectArea");
