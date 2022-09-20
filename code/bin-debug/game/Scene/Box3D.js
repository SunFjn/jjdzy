var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Box3D = (function () {
    function Box3D() {
        this.x1 = 0; //left
        this.y1 = 0; //front
        this.h1 = 0; //bottom
        this.x2 = 0; //right
        this.y2 = 0; //behine
        this.h2 = 0; //top
    }
    Box3D.getIns = function () {
        var ret = Box3D._ins;
        if (!ret) {
            ret = Box3D._ins = new Box3D();
        }
        return ret;
    };
    Box3D.create = function () {
        var ret = new Box3D();
        return ret;
    };
    Box3D.prototype.setDCXY = function (dir, cx, cy, ch, x1, y1, h1, x2, y2, h2) {
        var ret = this;
        if (dir == 1) {
            ret.x1 = cx + x1;
            ret.y1 = cy + y1;
            ret.h1 = ch + h1;
            ret.x2 = cx + x2;
            ret.y2 = cy + y2;
            ret.h2 = ch + h2;
        }
        else {
            ret.x1 = cx - x2;
            ret.y1 = cy + y1;
            ret.h1 = ch + h1;
            ret.x2 = cx - x1;
            ret.y2 = cy + y2;
            ret.h2 = ch + h2;
        }
    };
    Box3D.prototype.hitTest = function (box3d) {
        if (this.containsXYZ(box3d.x1, box3d.y1, box3d.h1) ||
            this.containsXYZ(box3d.x2, box3d.y2, box3d.h2)) {
            return true;
        }
        return false;
    };
    Box3D.prototype.containsXYZ = function (x, y, z) {
        //lefttop
        //leftbottom
        //leftbehine
        //righttop
        //rightbottom
        //rightbehine
        if (this.x1 <= x && this.x2 >= x && this.y1 <= y && this.y2 >= y && this.h1 <= z && this.h2 >= z) {
            return true;
        }
        return false;
    };
    Box3D.prototype.move = function (x, y, z) {
        this.x1 += x;
        this.x2 += x;
        this.y1 += y;
        this.y2 += y;
        this.h1 += z;
        this.h2 += z;
    };
    Box3D.prototype.normalization = function () {
    };
    Box3D.ROLE3DTESTEnemy = function (role, self, box) {
        if (role.objType == 1 && role.force && self.force != role.force) {
            return box.containsXYZ(role.x, role.y, role.h);
        }
        return null;
    };
    return Box3D;
}());
__reflect(Box3D.prototype, "Box3D");
