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
var fairygui;
(function (fairygui) {
    var GearXY = (function (_super) {
        __extends(GearXY, _super);
        function GearXY(owner) {
            return _super.call(this, owner) || this;
        }
        GearXY.prototype.init = function () {
            this._default = new egret.Point(this._owner.x, this._owner.y);
            this._storage = {};
        };
        GearXY.prototype.addStatus = function (pageId, buffer) {
            var gv;
            if (pageId == null)
                gv = this._default;
            else {
                gv = new egret.Point();
                this._storage[pageId] = gv;
            }
            gv.x = buffer.readInt();
            gv.y = buffer.readInt();
        };
        GearXY.prototype.apply = function () {
            var pt = this._storage[this._controller.selectedPageId];
            if (!pt)
                pt = this._default;
            if (this._tweenConfig && this._tweenConfig.tween && !fairygui.UIPackage._constructing && !fairygui.GearBase.disableAllTweenEffect) {
                if (this._tweenConfig._tweener != null) {
                    if (this._tweenConfig._tweener.endValue.x != pt.x || this._tweenConfig._tweener.endValue.y != pt.y) {
                        this._tweenConfig._tweener.kill(true);
                        this._tweenConfig._tweener = null;
                    }
                    else
                        return;
                }
                if (this._owner.x != pt.x || this._owner.y != pt.y) {
                    if (this._owner.checkGearController(0, this._controller))
                        this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
                    this._tweenConfig._tweener = fairygui.GTween.to2(this._owner.x, this._owner.y, pt.x, pt.y, this._tweenConfig.duration)
                        .setDelay(this._tweenConfig.delay)
                        .setEase(this._tweenConfig.easeType)
                        .setTarget(this)
                        .onUpdate(this.__tweenUpdate, this)
                        .onComplete(this.__tweenComplete, this);
                }
            }
            else {
                this._owner._gearLocked = true;
                this._owner.setXY(pt.x, pt.y);
                this._owner._gearLocked = false;
            }
        };
        GearXY.prototype.__tweenUpdate = function (tweener) {
            this._owner._gearLocked = true;
            this._owner.setXY(tweener.value.x, tweener.value.y);
            this._owner._gearLocked = false;
        };
        GearXY.prototype.__tweenComplete = function () {
            if (this._tweenConfig._displayLockToken != 0) {
                this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
                this._tweenConfig._displayLockToken = 0;
            }
            this._tweenConfig._tweener = null;
        };
        GearXY.prototype.updateState = function () {
            var pt = this._storage[this._controller.selectedPageId];
            if (!pt) {
                pt = new egret.Point();
                this._storage[this._controller.selectedPageId] = pt;
            }
            pt.x = this._owner.x;
            pt.y = this._owner.y;
        };
        GearXY.prototype.updateFromRelations = function (dx, dy) {
            if (this._controller == null || this._storage == null)
                return;
            for (var key in this._storage) {
                var pt = this._storage[key];
                pt.x += dx;
                pt.y += dy;
            }
            this._default.x += dx;
            this._default.y += dy;
            this.updateState();
        };
        return GearXY;
    }(fairygui.GearBase));
    fairygui.GearXY = GearXY;
    __reflect(GearXY.prototype, "fairygui.GearXY");
})(fairygui || (fairygui = {}));
