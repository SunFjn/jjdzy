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
var AreaBatch = (function (_super) {
    __extends(AreaBatch, _super);
    function AreaBatch() {
        var _this = _super.call(this) || this;
        _this.areas = [];
        _this.top = 0;
        _this.left = 0;
        _this.bottom = 0;
        _this.right = 0;
        return _this;
    }
    AreaBatch.prototype.addArea = function (area) {
        var areaBound = area.getBound();
        if (areaBound.left < this.left) {
            this.left = areaBound.left;
        }
        if (areaBound.right > this.right) {
            this.right = areaBound.right;
        }
        if (areaBound.top < this.top) {
            this.top = areaBound.top;
        }
        if (areaBound.bottom > this.bottom) {
            this.bottom = areaBound.bottom;
        }
        this.areas.push(area);
    };
    AreaBatch.prototype.reset = function () {
        this.left = this.top = Number.MAX_VALUE;
        this.right = this.bottom = Number.MIN_VALUE;
    };
    AreaBatch.prototype.checkXY = function (px, py) {
        var ret;
        if (px >= this.left && px < this.right && py >= this.top && py < this.bottom) {
            for (var i = 0; i < this.areas.length; i++) {
                var area = this.areas[i];
                if (area.checkXY(px, py) == true) {
                    ret = true;
                    break;
                }
            }
        }
        return ret;
    };
    /**
     * @param px
     * @param py
     * @return null不在区域内
     */
    AreaBatch.prototype.getZoneData = function (px, py) {
        var ret;
        if (px >= this.left && px < this.right && py >= this.top && py < this.bottom) {
            for (var i = 0; i < this.areas.length; i++) {
                var area = this.areas[i];
                if (area.checkXY(px, py) == true) {
                    ret = area.userData;
                    if (ret == null) {
                        ret = {};
                    }
                    break;
                }
            }
        }
        return ret;
    };
    AreaBatch.createWithTypeID = function (id) {
        var ret = AreaBatch.pool.length ? AreaBatch.pool.pop() : new AreaBatch();
        ret.reset();
        ret.areaid = id;
        return ret;
    };
    AreaBatch.prototype.dispose = function () {
        for (var i = 0; i < this.areas.length; i++) {
            var area = this.areas[i];
            area.dispose();
        }
        this.areas.length = 0;
        AreaBatch.pool.push(this);
    };
    AreaBatch.prototype.getCenter = function () {
        var ret;
        if (this.areas.length == 1) {
            ret = this.areas[0].getCenter();
        }
        return ret;
    };
    AreaBatch.pool = [];
    return AreaBatch;
}(AreaBase));
__reflect(AreaBatch.prototype, "AreaBatch");
