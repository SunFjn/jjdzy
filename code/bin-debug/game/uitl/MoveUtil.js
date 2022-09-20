var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MoveUtil = (function () {
    function MoveUtil() {
    }
    /**返回的对象请勿持久使用*/
    MoveUtil.getNextPoint = function (sx, sy, dx, dy, speed, near) {
        if (near === void 0) { near = 0; }
        var subx = dx - sx;
        var suby = dy - sy;
        var nowfar = Math.sqrt(subx * subx + suby * suby);
        if (nowfar < near) {
            return null;
        }
        var angle = Math.atan2(suby, subx);
        if (near > nowfar - speed) {
            var retx = dx - Math.cos(angle) * near;
            var rety = dy - Math.sin(angle) * near;
        }
        else {
            var retx = sx + Math.cos(angle) * speed;
            var rety = sy + Math.sin(angle) * speed;
        }
        var ret = MoveUtil.nextPointRet;
        ret.x = retx;
        ret.y = rety;
        return ret;
    };
    MoveUtil.dist = function (sx, sy, dx, dy) {
        var subx = sx - dx;
        var suby = sy - dy;
        var ret = subx * subx + suby * suby;
        return ret;
    };
    MoveUtil.caculateWay = function (sx, sy, ex, ey) {
        var subx = ex - sx;
        var suby = ey - sy;
        var a = Math.atan2(suby, subx);
        var b = (a + Math.PI * (2.625)) % (Math.PI * 2);
        var d = Math.floor(b / (Math.PI / 4));
        return d;
    };
    MoveUtil.distSqrt = function (sx, sy, dx, dy) {
        var subx = sx - dx;
        var suby = sy - dy;
        var ret = Math.sqrt(subx * subx + suby * suby);
        return ret;
    };
    MoveUtil.getNext = function (cur, dist, speed) {
        speed = dist - cur > 0 ? speed : -speed;
        var next = cur + speed;
        if (speed > 0 && next > dist) {
            next = dist;
        }
        else if (speed < 0 && next < dist) {
            next = dist;
        }
        return next;
    };
    MoveUtil.caculateAngle = function (x2, y2, x1, y1) {
        var ret = Math.atan2((y2 - y1), (x2 - x1)) * 180 / Math.PI;
        return ret;
    };
    MoveUtil.nextPointRet = new egret.Point();
    return MoveUtil;
}());
__reflect(MoveUtil.prototype, "MoveUtil");
