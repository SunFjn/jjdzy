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
var Parts = (function (_super) {
    __extends(Parts, _super);
    function Parts() {
        var _this = _super.call(this) || this;
        _this.list = [];
        _this.dic = {};
        _this.len = 0;
        _this._needSort = false;
        _this.ptype = 0;
        _this._perc = 0;
        return _this;
    }
    Object.defineProperty(Parts.prototype, "perc", {
        get: function () {
            return this._perc;
        },
        set: function (v) {
            this._perc = v;
            var list = this.list;
            var len = list.length;
            if (this.ptype == Parts.DIS_REAPEAT) {
                if (v >= 1) {
                    v = v - (v >> 0);
                }
            }
            else {
                if (v >= 1) {
                    v = 0.999999;
                }
            }
            for (var i = 0; i < len; i++) {
                var p = list[i];
                p.setPec(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Parts.prototype.addPart = function (p) {
        if (p.parts != this) {
            p.parts = this;
            this.list.push(p);
            this._needSort = true;
            this.len++;
            this.dic[p.type] = p;
            this.addChild(p.mc);
        }
    };
    Parts.prototype.removePart = function (p) {
        var index = this.list.indexOf(p);
        if (index != -1) {
            this.list.splice(index, 1);
            delete this.dic[p.type];
            this.removeChild(p.mc);
            p.dispose();
        }
    };
    Parts.prototype.removePartByType = function (type) {
        var part = this.dic[type];
        if (part) {
            this.removePart(part);
        }
    };
    Parts.prototype.setPart = function (type, arg, body) {
        if (body === void 0) { body = null; }
        var p = this.dic[type];
        if (p) {
            p.setVal(arg, body);
        }
    };
    //移除除了身体之外的部件
    Parts.prototype.removePartExceptBody = function () {
        var temp = [];
        var list = this.list;
        var len;
        len = list.length;
        for (var i = 0; i < len; i++) {
            var p = list[i];
            if (p.type != 1) {
                temp.push(p);
            }
        }
        while (temp.length) {
            this.removePart(temp.shift());
        }
    };
    Parts.prototype.sort = function () {
        var list = this.list;
        var len = list.length;
        list.sort(this.dSortFunc);
        for (var i = 0; i < len; i++) {
            var p = list[i];
            var oldindex = this.getChildIndex(p.mc);
            if (oldindex != i) {
                this.setChildIndex(p.mc, i);
            }
        }
    };
    Parts.prototype.dSortFunc = function (a, b) {
        var ret = a.dep - b.dep;
        return ret;
    };
    Parts.prototype.setVal = function (v) {
        var list = this.list;
        for (var i = list.length - 1; i >= 0; i--) {
            var p = list[i];
            p.setAct(v);
        }
    };
    Parts.prototype.setPartScale = function (value) {
        var list = this.list;
        for (var i = list.length - 1; i >= 0; i--) {
            var p = list[i];
            p.mc.scaleX = p.mc.scaleY = value;
        }
    };
    /**动画类型 */
    Parts.T_BODY = 1;
    Parts.T_WEAPON = 2;
    Parts.T_SHOUHUN = 3;
    Parts.T_HORSE = 4;
    Parts.T_HORSE_WING = 5;
    /**动画层级 */
    Parts.P_SHADOW = 0;
    Parts.P_SHOUHUN = 5;
    Parts.P_BODY = 10;
    Parts.P_WEAPON = 20;
    Parts.P_HORSE = 30;
    Parts.D_WEAPON_DOWN = 9;
    Parts.D_HORSE_DOWN = 8;
    Parts.DIS_REAPEAT = 0;
    Parts.DIS_ONCE = 1;
    return Parts;
}(egret.Sprite));
__reflect(Parts.prototype, "Parts");
