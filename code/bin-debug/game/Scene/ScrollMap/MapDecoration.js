var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapDecoration = (function () {
    function MapDecoration() {
        this.isSleep = 1;
        this.x = 0;
        this.y = 0;
        this.offx = 0;
        this.cx = 0;
        this.speed = 0;
        this.rebornTime = 0;
    }
    MapDecoration.prototype.add = function (data, parent, i) {
        var s = this;
        s.sortIdx = i;
        s.dead = 0;
        if (!s.pic) {
            s.pic = new fairygui.GLoader();
        }
        s.parent = parent;
        parent.addChildAt(s.pic.displayObject, i);
        ImageLoader.instance.loader("resource/map/decoration/" + data.a + ".png", s.pic);
        s.x = data.x + GGlobal.layerMgr.offx;
        s.y = data.y;
        s.col = data.c;
        s.speed = data.t;
        s.rebornTime = egret.getTimer();
    };
    MapDecoration.prototype.canCreate = function (x) {
        var s = this;
        var mx = s.x;
        var ix = Math.abs(x) % 1600;
        if (mx >= ix && mx <= ix + 640) {
            return true;
        }
        return false;
    };
    MapDecoration.prototype.checkSleep = function () {
        var mx = this.pic.x;
        if (mx > GGlobal.layerMgr.offx - 200) {
            return false;
        }
        return true;
    };
    MapDecoration.prototype.move = function (x) {
        var s = this;
        if (s.dead)
            return;
        var now = egret.getTimer();
        if (s.isSleep) {
            if (s.canCreate(x)) {
                s.active();
                var offx = 640 + GGlobal.layerMgr.offx;
                if (x < offx && s.x < offx) {
                    s.pic.setXY(s.x, s.y);
                }
                else {
                    s.pic.setXY(offx, s.y);
                }
            }
        }
        else {
            if (s.checkSleep()) {
                s.sleep();
            }
            else {
                var x_1 = s.pic.x - s.speed * (now - s.rebornTime) / 1000;
                s.rebornTime = now;
                s.pic.setXY(x_1, s.y);
            }
        }
    };
    MapDecoration.prototype.active = function () {
        var s = this;
        s.isSleep = 0;
        if (!s.pic) {
            s.pic = new fairygui.GLoader();
        }
        s.rebornTime = egret.getTimer();
        s.parent.addChildAt(s.pic.displayObject, s.sortIdx);
    };
    MapDecoration.prototype.sleep = function () {
        var s = this;
        s.isSleep |= 1;
        if (this.pic && this.pic.displayObject && this.pic.displayObject.parent) {
            this.pic.displayObject.parent.removeChild(this.pic.displayObject);
        }
    };
    MapDecoration.prototype.dispose = function () {
        if (this.dead)
            return;
        this.dead = 1;
        this.col = -1;
        this.isSleep = 1;
        if (this.pic) {
            this.pic.removeFromParent();
        }
    };
    MapDecoration.prototype.getChild = function () {
        return this.pic.displayObject;
    };
    return MapDecoration;
}());
__reflect(MapDecoration.prototype, "MapDecoration");
