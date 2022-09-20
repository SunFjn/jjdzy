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
var DepSprite = (function (_super) {
    __extends(DepSprite, _super);
    function DepSprite() {
        var _this = _super.call(this) || this;
        _this.dep = 0;
        _this.list = [];
        _this.childIndex = -1;
        /**NULL计数器dirtyCount */
        _this.dc = 0;
        return _this;
    }
    DepSprite.prototype.depAddChild = function (sp) {
        var list = this.list;
        if (this.dc) {
            ArrayUitl.cleannull(list);
            this.dc = 0;
        }
        var rightindex = list.length - 1;
        var leftindex = 0;
        var minIndex = (leftindex + rightindex) / 2 >> 0;
        while (leftindex < rightindex) {
            var min = list[minIndex];
            if (sp.dep > min.dep) {
                leftindex = minIndex + 1;
            }
            else if (sp.dep < min.dep) {
                rightindex = minIndex - 1;
            }
            else {
                break;
            }
            minIndex = (leftindex + rightindex) / 2 >> 0;
        }
        _super.prototype.addChildAt.call(this, sp, minIndex);
        ArrayUitl.insert(list, sp, minIndex);
        sp.childIndex = minIndex;
    };
    DepSprite.prototype.depRemoveChild = function (sp) {
        _super.prototype.removeChild.call(this, sp);
        var index = this.list.indexOf(sp);
        this.list[index] = null;
        this.dc++;
        if (this.dc >= 5) {
            ArrayUitl.cleannull(this.list);
            this.dc = 0;
        }
    };
    DepSprite.prototype.sortChild = function () {
        var list = this.list;
        list.sort(this.sortFunc);
        var len = list.length;
        for (var i = 0; i < len;) {
            var sp = list[i];
            if (sp) {
                if (this.$children.indexOf(sp) != i) {
                    sp.childIndex = i;
                    this.setChildIndex(sp, i);
                }
                i++;
            }
            else {
                len--;
            }
        }
    };
    DepSprite.prototype.sortFunc = function (a, b) {
        if (!a) {
            return 1;
        }
        if (!b) {
            return -1;
        }
        return a.dep - b.dep;
    };
    return DepSprite;
}(egret.DisplayObjectContainer));
__reflect(DepSprite.prototype, "DepSprite");
